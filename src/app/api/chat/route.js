import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── IP BAZLI RATE LIMITER ────────────────────────────────────────────────────
const ipRequestMap = new Map();

const RATE_LIMIT = {
  MAX_REQUESTS: 15,
  WINDOW_MS: 60 * 60 * 1000,
  MAX_MSG_LENGTH: 500,
};

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT.WINDOW_MS });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT.MAX_REQUESTS) {
    const remainingMin = Math.ceil((entry.resetAt - now) / 60000);
    return { allowed: false, remainingMin };
  }
  entry.count += 1;
  ipRequestMap.set(ip, entry);
  return { allowed: true };
}

setInterval(
  () => {
    const now = Date.now();
    for (const [ip, entry] of ipRequestMap.entries()) {
      if (now > entry.resetAt) ipRequestMap.delete(ip);
    }
  },
  10 * 60 * 1000,
);

// ─── SİTE İÇERİĞİ → Token tasarrufu için özet tutuldu ───────────────────────
// Değiştirmek istediğinde buradan düzenle
const SITE_BILGISI = `
DANIŞMAN: Şeyma İnan | Psikolojik Danışman
EĞİTİM: Yıldız Teknik Üniversitesi Psikolojik Danışmanlık ve Rehberlik (Yüksek Onur) + Yüksek Lisans
UZMANLIK: EMDR
ÇALIŞMA: Yalnızca online (Dünya geneli)
SAAT: Pazartesi-Cumartesi 09:00-20:00
EMAIL: pdseymainan@gmail.com
WHATSAPP: 0531 257 4578

HİZMETLER:
- EMDR: Travma, PTSD, geçmiş yaşantılar
- Bireysel Danışmanlık: Kişiye özel, güvenli alan
- Online Seans: Güvenli video platformu, Dünya geneli

UZMANLIK ALANLARI:
Travma, kaygı ve panik, depresif ruh hali, tekrarlayıcı düşünce ve davranışlar, korkular ve kaçınma tepkileri, ilişki dinamikleri, öz değer ve öz saygı, stres ve uyku sorunları, öz şefkat ve kişisel gelişim

PSİKOLOJİK TESTLER (Ücretsiz):
- Algılanan Stres Testi (PSS-10): 10 soru, 5 dk → /psikolojik-testler/algilanan-stres-testi
- Uyku Kalitesi Testi: 7 soru, 5 dk → /psikolojik-testler/uyku-kalitesi-testi
- Benlik Saygısı Testi: 10 soru, 3 dk → /psikolojik-testler/benlik-saygisi-testi

SAYFALAR:
- Hakkımda: /hakkimda
- Testler: /psikolojik-testler
- Vaka Analizleri: /vaka-analizleri
- Blog: /blog
- İletişim: /iletisim
- Randevu: /randevu

RANDEVU: /randevu sayfasından online alınır. Ücretsiz ön görüşme mevcuttur.
`;

// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API anahtarı yapılandırılmamış" },
        { status: 500 },
      );
    }

    // IP tespiti ve rate limit
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    const { allowed, remainingMin } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          error: `Saatlik mesaj limitine ulaştınız. ${remainingMin} dakika sonra tekrar deneyin veya WhatsApp: 0531 257 4578`,
        },
        { status: 429 },
      );
    }

    // Mesaj validasyonu
    const { message, history } = await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Geçersiz mesaj" }, { status: 400 });
    }

    if (message.length > RATE_LIMIT.MAX_MSG_LENGTH) {
      return NextResponse.json(
        {
          error: `Mesajınız çok uzun. Lütfen ${RATE_LIMIT.MAX_MSG_LENGTH} karakterin altında yazın.`,
        },
        { status: 400 },
      );
    }

    // AI Modeli
    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `Sen Şeyma İnan'ın psikolojik danışmanlık ofisinin dijital asistanısın.

SİTE BİLGİSİ:
${SITE_BILGISI}

GÖREVLER:
1. Ziyaretçileri sıcak ve empatik karşıla
2. Sadece yukarıdaki site bilgisine dayanarak cevap ver
3. Doğru sayfaya veya randevuya yönlendir

KESİN KURALLAR:
- MAX 2 CÜMLE: Kısa, net, öz cevap ver. Uzun paragraf yazma.
- TAVSİYE VERME: Terapist değilsin, teşhis/tavsiye koyamazsın.
- BİLMİYORSAN: "Bu konuda size daha iyi yardımcı olabilmek için /iletisim sayfasından ulaşabilirsiniz." de.
- ACİL DURUM: Kendine zarar verme/intihar söz konusuysa → "Lütfen hemen 182 (ALO Psikiyatri Hattı) veya 112'yi arayın. Yalnız değilsiniz."
- FORMAT: - FORMAT: Markdown kullan. Her satıra emoji koy (📅🔗💡). Linkleri **kalın** yaz. Satırlar arası boşluk bırak. Örnek:

📅 **Randevu**
Seanslar ücretlidir.
🔗 **[Randevu Al](https://www.seymainan.com/randevu)**
💡 *Ücretsiz ön görüşme* mevcuttur.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction,
      generationConfig: {
        temperature: 0.2, // Daha tutarlı cevaplar için düşürdük
        topK: 30,
        topP: 0.7,
        maxOutputTokens: 120, // Token tasarrufu
      },
    });

    const chat = model.startChat({
      history: (history || []).slice(-6), // Token tasarrufu
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    return NextResponse.json({
      response: response.text(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error?.message || error);

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Asistanımız şu an çok yoğun. WhatsApp: 0531 257 4578" },
        { status: 429 },
      );
    }

    if (error?.status === 403 || error?.status === 401) {
      return NextResponse.json(
        { error: "API anahtarı geçersiz" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
