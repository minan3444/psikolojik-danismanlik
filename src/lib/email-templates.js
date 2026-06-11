// src/lib/email-templates.js

// Tarih formatlama helper fonksiyonu
function formatGoogleCalendarDate(dateStr, timeStr, addMinutes = 0) {
  const [yil, ay, gun] = dateStr.includes("-")
    ? dateStr.split("-")
    : dateStr.split(".").reverse();
  const [saat, dakika] = timeStr.split(":");

  const date = new Date(`${yil}-${ay}-${gun}T${saat}:${dakika}:00+03:00`);
  date.setMinutes(date.getMinutes() + addMinutes);

  // Google Calendar formatı: YYYYMMDDTHHMMSSZ
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export const contactEmailTemplate = (data, texts) => `
  <div style="font-family: sans-serif; background-color: #FAF8F5; padding: 40px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; border: 1px solid #EDE8E0;">
      <!-- Header: Emoji yerine profesyonel bir görsel kullanabilirsin -->
      <div style="background-color: #7C9E87; padding: 30px; text-align: center;">
        <img src="https://seymainan.com/images/mail-header-icon.png" width="50" alt="icon" />
        <h2 style="color: #ffffff; margin: 10px 0 0 0;">${texts.title}</h2>
      </div>
      <div style="padding: 40px;">
        <p><b>${data.adSoyad}</b> ${texts.subTitle}</p>
        <div style="background: #FDFCFB; padding: 20px; border-radius: 12px;">
          <p><b>${texts.labelEmail}:</b> ${data.email}</p>
          <p><b>${texts.labelPhone}:</b> ${data.telefon}</p>
          <p><b>${texts.labelMessage}:</b></p>
          <p style="font-style: italic;">${data.mesaj}</p>
        </div>
      </div>
    </div>
  </div>
`;

// src/lib/email-templates.js içindeki appointmentEmailTemplate fonksiyonunu güncelleyin:
export const appointmentEmailTemplate = (
  data,
  texts,
  isForAdmin = false,
  meetLink = null,
) => {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; padding: 40px 10px; color: #3D3530;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #EDE8E0; box-shadow: 0 10px 30px rgba(0,0,0,0.02);">
        
        <!-- Header -->
        <div style="background-color: #7C9E87; padding: 40px 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 20px;">
            ${isForAdmin ? texts.adminTitle : texts.userTitle}
          </h2>
        </div>

        <div style="padding: 40px 35px;">
          <p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px;">
           Merhaba <b>${isForAdmin ? "Şeyma Hanım" : data.adSoyad}</b>,
          </p>
          <p style="font-size: 15px; line-height: 1.7; color: #7A6E68; margin-bottom: 30px;">
            ${isForAdmin ? `<b>${data.adSoyad}</b> tarafından Web siteniz üzerinden yeni bir randevu talebi oluşturuldu.` : texts.userIntro}
          </p>
          
          <!-- Randevu Bilgileri Kartı -->
          <div style="background-color: #FDFCFB; padding: 25px; border-radius: 12px; border: 1px solid #f0f0f0; margin-bottom: 30px;">
            <h4 style="margin: 0 0 15px 0; color: #7C9E87; font-size: 16px;">📅 Randevu Bilgileri</h4>
            <p style="margin: 8px 0; font-size: 14px;"><strong>${texts.labels.service}:</strong> ${data.service_type}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong>${texts.labels.date}:</strong> ${data.appointment_date}</p>
            <p style="margin: 8px 0; font-size: 14px;"><strong>${texts.labels.time}:</strong> ${data.appointment_time}</p>
${
  meetLink && !isForAdmin
    ? `
  <div style="margin-top: 20px; padding: 15px; background-color: #EBF5EE; border-radius: 10px; text-align: center;">
    <p style="margin: 0 0 10px 0; font-size: 14px; color: #3D3530;">
      🎥 Seans bağlantınız hazır:
    </p>
    <a href="${meetLink}" 
       style="display: inline-block; background-color: #7C9E87; color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 15px;">
      🎥 Online Görüşmeye Katıl
    </a>
    
    <p style="margin: 15px 0 10px 0; font-size: 14px; color: #3D3530;">
      📅 Takviminize eklemek için:
    </p>
    <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Seans - ${data.adSoyad}`)}&dates=${encodeURIComponent(formatGoogleCalendarDate(data.appointment_date, data.appointment_time))}/${encodeURIComponent(formatGoogleCalendarDate(data.appointment_date, data.appointment_time, 60))}&details=${encodeURIComponent(`Hizmet: ${data.service_type}\nNot: ${data.notlar || "-"}\n\nOnline Görüşme: ${meetLink}`)}&location=${encodeURIComponent(meetLink)}" 
       style="display: inline-block; background-color: #4285F4; color: white; padding: 10px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px;">
      📆 Google Takvim'e Ekle
    </a>
  </div>
`
    : ""
}
            ${
              isForAdmin
                ? `
              <p style="margin: 15px 0 5px 0; border-top: 1px solid #eee; padding-top: 15px;"><strong>${texts.labels.phone}:</strong> ${data.ulkeKodu}${data.telefon}</p>
              <p style="margin: 0;"><strong>${texts.labels.notes}:</strong> <i>${data.notlar || "-"}</i></p>
            `
                : ""
            }
          </div>

          ${
            !isForAdmin
              ? `
            <!-- Küçük Hatırlatma -->
            <div style="margin-bottom: 25px;">
              <h4 style="margin: 0 0 8px 0; font-size: 15px;">🌿 ${texts.reminderTitle}</h4>
              <p style="margin: 0; font-size: 14px; color: #7A6E68; line-height: 1.6;">${texts.reminderText}</p>
            </div>
            <!-- İptal Bilgisi -->
            <div>
              <h4 style="margin: 0 0 8px 0; font-size: 15px;">📞 ${texts.cancelTitle}</h4>
              <p style="margin: 0; font-size: 14px; color: #7A6E68; line-height: 1.6;">${texts.cancelText}</p>
            </div>
          `
              : ""
          }

          <div style="margin-top: 40px; border-top: 1px solid #f0f0f0; padding-top: 20px;">
            <p style="margin: 0; font-size: 15px; font-weight: 700;">Sevgiler,</p>
            <p style="margin: 5px 0 0 0; color: #7C9E87; font-weight: 600;">Şeyma İnan</p>
            <p style="margin: 0; font-size: 13px; color: #C4B5A5;">Uzman Psikolojik Danışman</p>
          </div>
        </div>

        <div style="background-color: #F5F0EA; padding: 20px; text-align: center; font-size: 11px; color: #C4B5A5; letter-spacing: 1px;">
          © ${new Date().getFullYear()} SEVGI VE FARKINDALIKLA
        </div>
      </div>
    </div>
  `;
};
