"use server"; // Next.js sunucu tarafı kodu olduğunu belirtir
import { supabase } from "@/lib/supabase"; // Supabase veritabanı bağlantısı
import { Resend } from "resend"; // E-posta göndermek için Resend kütüphanesi
import { revalidatePath } from "next/cache"; // Next.js cache'i yenilemek için

const resend = new Resend(process.env.RESEND_API_KEY); // Resend API anahtarı ile nesne oluştur
const DANIŞMAN_EMAIL = "pdseymainan@gmail.com"; // Danışmana gidecek e-posta adresi

// Tüm randevuları tarih ve saate göre sıralı olarak getirir
export async function getAllAppointments() {
  try {
    const { data, error } = await supabase
      .from("appointments") // appointments tablosundan
      .select("*") // tüm alanları seç
      .order("appointment_date", { ascending: true }) // tarihe göre sırala
      .order("appointment_time", { ascending: true }); // saate göre sırala
    return error ? [] : data; // Hata varsa boş dizi, yoksa veriyi döndür
  } catch {
    return []; // Hata olursa boş dizi döndür
  }
}

// Randevunun durumunu günceller (ör: onaylandı, iptal)
export async function updateAppointmentStatus(appointment, newStatus) {
  try {
    const { error } = await supabase
      .from("appointments") // appointments tablosunda
      .update({ status: newStatus }) // status alanını güncelle
      .eq("id", appointment.id); // id'si eşleşen kaydı bul

    if (error) throw error; // Hata varsa fırlat

    // Eğer durum onaylandı veya iptal ise e-posta gönder
    if (newStatus === "onaylandı" || newStatus === "iptal") {
      const isApproved = newStatus === "onaylandı"; // Onay mı iptal mi?
      await resend.emails
        .send({
          from: "Şeyma İnan Danışmanlık <onboarding@resend.dev>", // Kimden
          to: [appointment.email, DANIŞMAN_EMAIL], // Kime
          subject: isApproved
            ? "Randevu Talebiniz Onaylandı 🌿" // Konu
            : "Randevu Talebiniz Hakkında",
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;"><h2 style="color: ${isApproved ? "#7C9E87" : "#d32f2f"};">Randevu Talebi Güncellemesi</h2><p>Merhaba <b>${appointment.full_name}</b>,</p><p>${appointment.appointment_date} tarihindeki randevunuzun durumu <b>${newStatus.toUpperCase()}</b> olarak güncellenmiştir.</p><p>Sevgiler.</p></div>`, // Mail içeriği
        })
        .catch((e) => console.error("Email gönderilemedi: ", e)); // Hata logla
    }

    revalidatePath("/yonetim-paneli"); // Next.js cache yenile
    return { success: true }; // Başarılıysa true döndür
  } catch (err) {
    return { success: false, error: err.message }; // Hata varsa mesaj döndür
  }
}

// Randevunun tarih ve saatini günceller
export async function updateAppointmentDateTime(
  id, // Randevu id'si
  newDate, // Yeni tarih
  newTime, // Yeni saat
  email, // Kullanıcı e-posta
  fullName, // Kullanıcı adı
) {
  try {
    // Aynı tarih ve saatte başka randevu var mı kontrol et
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

    // Randevuyu güncelle
    const { error } = await supabase
      .from("appointments")
      .update({
        appointment_date: newDate, // Yeni tarih
        appointment_time: newTime, // Yeni saat
        status: "onaylandı", // Durumu onaylandı yap
      })
      .eq("id", id); // id'ye göre bul

    if (error) throw error; // Hata varsa fırlat

    // Kullanıcıya ve danışmana e-posta gönder
    await resend.emails
      .send({
        from: "Şeyma İnan Danışmanlık <onboarding@resend.dev>",
        to: [email, DANIŞMAN_EMAIL],
        subject: "Randevu Tarihiniz Güncellendi 🌿",
        html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;"><h2 style="color: #7C9E87;">Randevu Bilgileri Güncellendi</h2><p>Merhaba <b>${fullName}</b>,</p><p>Yeni Tarih: <b>${newDate}</b> | Yeni Saat: <b>${newTime}</b></p></div>`,
      })
      .catch(() => console.error("Güncelleme maili gönderilemedi"));

    revalidatePath("/yonetim-paneli"); // Panel sayfası cache yenile
    revalidatePath("/randevu"); // Randevu sayfası cache yenile
    return { success: true }; // Başarılıysa true döndür
  } catch (err) {
    return { success: false, error: err.message }; // Hata varsa mesaj döndür
  }
}

// Bir günün bloke saatlerini topluca kaydeder
export async function saveBatchBlocks(date, selectedTimes) {
  try {
    // Önce o tarihteki TÜM 'bloke' kayıtlarını SİL
    const { error: deleteError } = await supabase
      .from("appointments") // appointments tablosunda
      .delete() // sil
      .eq("appointment_date", date) // bu tarihteki
      .eq("status", "bloke"); // ve status'ü bloke olanları

    // Silme işlemi hata verdiyse dur ve hatayı bildir.
    if (deleteError) throw deleteError;

    // Sadece seçili saatler varsa bunları EKLE
    if (selectedTimes?.length > 0) {
      const newBlocks = selectedTimes.map((time) => ({
        full_name: "--- SİSTEM BLOKESİ ---", // Sistem tarafından bloke
        email: "admin@seymainan.com", // Sistem e-posta
        phone: "0000", // Sistem telefon
        service_type: "Müsait Değil", // Hizmet tipi
        appointment_date: date, // Tarih
        appointment_time: time, // Saat
        status: "bloke", // Bloke olarak işaretle
      }));

      const { error: insertError } = await supabase
        .from("appointments") // appointments tablosuna
        .insert(newBlocks); // yeni blokları ekle

      if (insertError) throw insertError; // Hata varsa fırlat
    }

    revalidatePath("/yonetim-paneli"); // Panel sayfası cache yenile
    revalidatePath("/randevu"); // Randevu sayfası cache yenile
    return { success: true }; // Başarılıysa true döndür
  } catch (err) {
    console.error("Blok hatası:", err); // Hata logla
    return { success: false, error: err.message }; // Hata varsa mesaj döndür
  }
}
