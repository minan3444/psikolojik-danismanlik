import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── IP BAZLI RATE LIMITER ────────────────────────────────────────────────────
// Sunucu bellekte tutulur; serverless restart olursa sıfırlanır (ücretsiz çözüm)
const ipRequestMap = new Map(); // { ip: { count, resetAt } }

const RATE_LIMIT = {
  MAX_REQUESTS: 15,          // Bir IP'nin sorgulayabileceği maksimum mesaj sayısı
  WINDOW_MS: 60 * 60 * 1000, // Zaman penceresi: 1 saat (ms cinsinden)
  MAX_MSG_LENGTH: 500,        // Kullanıcının gönderebileceği maksimum karakter
};

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  // Zaman penceresi geçmişse sıfırla
  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT.WINDOW_MS });
    return { allowed: true };
  }

  // Limit aşıldı mı?
  if (entry.count >= RATE_LIMIT.MAX_REQUESTS) {
    const remainingMs = entry.resetAt - now;
    const remainingMin = Math.ceil(remainingMs / 60000);
    return { allowed: false, remainingMin };
  }

  // Sayacı artır
  entry.count += 1;
  ipRequestMap.set(ip, entry);
  return { allowed: true };
}

// Bellek sızıntısını önlemek için eski girişleri temizle (her 10 dakikada bir)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRequestMap.entries()) {
    if (now > entry.resetAt) ipRequestMap.delete(ip);
  }
}, 10 * 60 * 1000);
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      console.error("Chat error: GOOGLE_AI_API_KEY is not set");
      return NextResponse.json(
        { error: "API anahtarı yapılandırılmamış" },
        { status: 500 },
      );
    }

    // ── IP tespiti ──────────────────────────────────────────────────────────
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // ── Rate limit kontrolü ─────────────────────────────────────────────────
    const { allowed, remainingMin } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error: `Saatlik mesaj limitine ulaştınız. ${remainingMin} dakika sonra tekrar deneyebilir ya da doğrudan 0531 257 4578 numaralı WhatsApp hattımızdan bize ulaşabilirsiniz.`,
        },
        { status: 429 },
      );
    }

    // ── Mesaj validasyonu ───────────────────────────────────────────────────
    const { message, history } = await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Geçersiz mesaj" }, { status: 400 });
    }

    if (message.length > RATE_LIMIT.MAX_MSG_LENGTH) {
      return NextResponse.json(
        { error: `Mesajınız çok uzun. Lütfen ${RATE_LIMIT.MAX_MSG_LENGTH} karakterin altında yazın.` },
        { status: 400 },
      );
    }

    // ── AI Modeli ───────────────────────────────────────────────────────────
    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `Sen Şeyma İnan'ın psikolojik danışmanlık ofisinde çalışan dijital ve profesyonel bir asistansın.
Görevlerin şunlardır:
1. Ziyaretçileri sıcak, empatik ve yargılamayan bir dille karşılamak.
2. Ziyaretçileri web sitesindeki doğru hizmetlere (Bireysel Terapi, EMDR, Çift Terapisi vb.) veya randevu alma sayfasına yönlendirmek.
3. Seans süreleri gibi temel ofis bilgilerini vermek.

KESİN KURALLAR (BUNLARI ASLA İHLAL ETME):
- MAKSİMUM 1-2 CÜMLE KULLAN: Kullanıcıyı yorma, çok kısa, net ve öz cevaplar ver. Asla uzun paragraflar yazma. Jeton (token) tasarrufu yapmalısın.
- ASLA TAVSİYE VERME: Sen bir terapist veya psikolog değilsin. Ziyaretçilere psikolojik tavsiye veremezsin, teşhis koyamazsın.
- ACİL DURUM YÖNETİMİ: Eğer kullanıcı kendine zarar verme, intihar, şiddet veya kriz durumundan bahsederse, terapi önermeyi bırak ve ŞU MESAJI VER: "Şu an çok zor bir süreçten geçtiğinizi görüyorum. Lütfen hemen 112 Acil Çağrı Merkezi'ni arayın veya size en yakın sağlık kuruluşunun acil servisine başvurun. Yalnız değilsiniz."
- SINIRLARINI BİL: Cevabını bilmediğin durumlarda iletişim sayfasına yönlendir.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 150,
      },
    });

    const chat = model.startChat({
      history: (history || []).slice(-10), // Son 10 mesajı gönder, daha eskisini kesip token tasarrufu sağla
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
        {
          error: "Şu an asistanımız çok yoğun. Beklemek istemezseniz doğrudan 0531 257 4578 numaralı WhatsApp hattımızdan bize ulaşabilirsiniz.",
        },
        { status: 429 },
      );
    }

    if (error?.status === 400) {
      return NextResponse.json(
        { error: "Geçersiz istek formatı" },
        { status: 400 },
      );
    }

    if (error?.status === 403 || error?.status === 401) {
      return NextResponse.json(
        { error: "API anahtarı geçersiz veya yetkisiz" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
