"use server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);
const DANIŞMAN_EMAIL = "pdseymainan@gmail.com";

export async function getAllAppointments() {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });
    return error ? [] : data;
  } catch {
    return [];
  }
}

export async function updateAppointmentStatus(appointment, newStatus) {
  try {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", appointment.id);
    if (error) throw error;

    if (newStatus === "onaylandı" || newStatus === "iptal") {
      const isApproved = newStatus === "onaylandı";
      await resend.emails
        .send({
          from: "Şeyma İnan Danışmanlık <onboarding@resend.dev>",
          to: [appointment.email, DANIŞMAN_EMAIL],
          subject: isApproved
            ? "Randevu Talebiniz Onaylandı 🌿"
            : "Randevu Talebiniz Hakkında",
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;"><h2 style="color: ${isApproved ? "#7C9E87" : "#d32f2f"};">Randevu Talebi Güncellemesi</h2><p>Merhaba <b>${appointment.full_name}</b>,</p><p>${appointment.appointment_date} tarihindeki randevunuzun durumu <b>${newStatus.toUpperCase()}</b> olarak güncellenmiştir.</p><p>Sevgiler.</p></div>`,
        })
        .catch((e) => console.error("Email gönderilemedi:", e));
    }
    revalidatePath("/yonetim-paneli");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function updateAppointmentDateTime(
  id,
  newDate,
  newTime,
  email,
  fullName,
) {
  try {
    const { conflict } = await supabase
      .from("appointments")
      .select("id")
      .eq("appointment_date", newDate)
      .eq("appointment_time", newTime)
      .in("status", ["beklemede", "onaylandı"])
      .neq("id", id)
      .maybeSingle();
    if (conflict)
      return {
        success: false,
        error: "Seçtiğiniz tarih ve saatte başka bir randevu bulunmaktadır.",
      };

    const { error } = await supabase
      .from("appointments")
      .update({
        appointment_date: newDate,
        appointment_time: newTime,
        status: "onaylandı",
      })
      .eq("id", id);
    if (error) throw error;

    await resend.emails
      .send({
        from: "Şeyma İnan Danışmanlık <onboarding@resend.dev>",
        to: [email, DANIŞMAN_EMAIL],
        subject: "Randevu Tarihiniz Güncellendi 🌿",
        html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;"><h2 style="color: #7C9E87;">Randevu Bilgileri Güncellendi</h2><p>Merhaba <b>${fullName}</b>,</p><p>Yeni Tarih: <b>${newDate}</b> | Yeni Saat: <b>${newTime}</b></p></div>`,
      })
      .catch(() => console.error("Güncelleme maili gönderilemedi"));

    revalidatePath("/yonetim-paneli");
    revalidatePath("/randevu");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function saveBatchBlocks(date, selectedTimes) {
  try {
    await supabase
      .from("appointments")
      .delete()
      .eq("appointment_date", date)
      .eq("status", "bloke");
    if (selectedTimes?.length) {
      const newBlocks = selectedTimes.map((time) => ({
        full_name: "--- SİSTEM BLOKESİ ---",
        email: "admin@seymainan.com",
        phone: "0000",
        service_type: "Müsait Değil",
        appointment_date: date,
        appointment_time: time,
        status: "bloke",
      }));
      const { error } = await supabase.from("appointments").insert(newBlocks);
      if (error) throw error;
    }
    revalidatePath("/yonetim-paneli");
    revalidatePath("/randevu");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
