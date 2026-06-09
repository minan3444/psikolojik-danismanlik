"use server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { appointmentEmailTemplate } from "@/lib/email-templates";
import { emailTexts } from "@/data/texts";

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
  try {
    const reserved = await getReservedSlots(data.appointment_date);
    if (reserved.some((s) => s.time === data.appointment_time))
      return { success: false, error: "Bu saat az önce doldu." };

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
      },
    ]);
    if (dbError) throw dbError;

    const emailPromises = [
      resend.emails.send({
        from: "Şeyma İnan <randevu@seymainan.com>",
        to: [data.email],
        subject: texts.userSubject,
        html: appointmentEmailTemplate(data, texts, false),
      }),
      resend.emails.send({
        from: "Sistem <randevu@seymainan.com>",
        to: [DANIŞMAN_EMAIL],
        subject: `${texts.adminSubject}: ${data.adSoyad}`,
        html: appointmentEmailTemplate(data, texts, true),
      }),
    ];
    await Promise.all(emailPromises).catch(() =>
      console.warn("Bildirim mailleri gönderilemedi"),
    );

    return { success: true };
  } catch {
    return { success: false, error: "Sistem hatası oluştu." };
  }
}
