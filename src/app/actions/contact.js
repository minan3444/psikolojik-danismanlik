'use server';
import { Resend } from 'resend';
import { contactEmailTemplate } from '@/lib/email-templates';
import { emailTexts } from '@/data/texts';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData) {
  const texts = emailTexts.tr.contact;
  try {
    const { data, error } = await resend.emails.send({
      from: 'Şeyma İnan Web <iletisim@seymainan.com>',
      to: ['pdseymainan@gmail.com'],
      reply_to: formData.email,
      subject: `${texts.subject}: ${formData.adSoyad}`,
      html: contactEmailTemplate(formData, texts)
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "Sistem hatası" };
  }
}