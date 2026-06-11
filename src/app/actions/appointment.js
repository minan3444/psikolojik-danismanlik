"use server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { appointmentEmailTemplate } from "@/lib/email-templates";
import { emailTexts } from "@/data/texts";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);
const DANIŞMAN_EMAIL = "pdseymainan@gmail.com";

export async function getReservedSlots(date) {
  try {
    const { data } = await supabase
      .from("appointments")
      .select("appointment_time, status")
      .eq("appointment_date", date)
      .in("status", ["beklemede", "onaylandı", "bloke"]);
    return (
      data?.map((r) => ({ time: r.appointment_time, status: r.status })) || []
    );
  } catch {
    return [];
  }
}

export async function createAppointment(data) {
  const texts = emailTexts.tr.appointment;
  // src/app/actions/appointment.js içindeki createMeetLink fonksiyonunu bununla değiştirin:

  async function createCalendarEvent(data) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/calendar"],
      });

      const calendar = google.calendar({ version: "v3", auth });

      // Randevu tarih ve saatini ayarla
      const [yil, ay, gun] = data.appointment_date.includes("-")
        ? data.appointment_date.split("-")
        : data.appointment_date.split(".").reverse();
      const baslangic = new Date(
        `${yil}-${ay}-${gun}T${data.appointment_time}:00+03:00`,
      );
      const bitis = new Date(baslangic.getTime() + 60 * 60 * 1000); // 1 saat

      // Jitsi Meet linki oluştur
      const jitsiRoomId = `seans-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const meetLink = `https://meet.jit.si/${jitsiRoomId}`;

      const event = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID || DANIŞMAN_EMAIL,
        requestBody: {
          summary: `Seans - ${data.adSoyad}`,
          description: `Hizmet: ${data.service_type}\nNot: ${data.notlar || "-"}\n\n🎥 Online Görüşme Linki:\n${meetLink}`,
          location: meetLink,
          start: {
            dateTime: baslangic.toISOString(),
            timeZone: "Europe/Istanbul",
          },
          end: { dateTime: bitis.toISOString(), timeZone: "Europe/Istanbul" },
        },
      });

      console.log("✅ Takvim etkinliği oluşturuldu:", event.data.htmlLink);
      return meetLink; // Jitsi linkini döndür
    } catch (err) {
      console.error("Takvim etkinliği oluşturulamadı:", err);
      return null;
    }
  }
  try {
    const reserved = await getReservedSlots(data.appointment_date);
    if (reserved.some((s) => s.time === data.appointment_time))
      return { success: false, error: "Bu saat az önce doldu." };
    const meetLink = await createCalendarEvent(data);
    const { error: dbError } = await supabase.from("appointments").insert([
      {
        full_name: data.adSoyad,
        email: data.email,
        phone: `${data.ulkeKodu || ""}${data.telefon || ""}`.replace(/\s/g, ""),
        service_type: data.service_type,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        notes: data.notlar || "",
        status: "beklemede",
        meet_link: meetLink || null,
      },
    ]);
    if (dbError) throw dbError;

    const emailPromises = [
      resend.emails.send({
        from: "Şeyma İnan <randevu@seymainan.com>",
        to: [data.email],
        subject: texts.userSubject,
        html: appointmentEmailTemplate(data, texts, false, meetLink),
      }),
      resend.emails.send({
        from: "Sistem <randevu@seymainan.com>",
        to: [DANIŞMAN_EMAIL],
        subject: `${texts.adminSubject}: ${data.adSoyad}`,
        html: appointmentEmailTemplate(data, texts, true, meetLink),
      }),
    ];
    await Promise.all(emailPromises).catch(() =>
      console.warn("Bildirim mailleri gönderilemedi"),
    );

    return { success: true };
  } catch (err) {
    console.error("createAppointment hatası:", err);
    return { success: false, error: err.message || "Sistem hatası oluştu." };
  }
}
