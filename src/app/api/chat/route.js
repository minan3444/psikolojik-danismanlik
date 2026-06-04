import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const genAI = new GoogleGenerativeAI(apiKey);
    const { message, history } = await req.json();

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Geçersiz mesaj" }, { status: 400 });
    }

    const systemInstruction = `Sen Şeyma İnan'ın psikolojik danışmanlık ofisinde çalışan dijital ve profesyonel bir asistansın.
Görevlerin şunlardır:
1. Ziyaretçileri sıcak, empatik ve yargılamayan bir dille karşılamak.
2. Ziyaretçileri web sitesindeki doğru hizmetlere (Bireysel Terapi, EMDR, Çift Terapisi vb.) veya randevu alma / iletişim sayfasına yönlendirmek.
3. Seans süreleri, online/yüz yüze çalışma durumları gibi temel ofis bilgilerini vermek.

KESİN KURALLAR (BUNLARI ASLA İHLAL ETME):
- ASLA TAVSİYE VERME: Sen bir terapist veya psikolog değilsin. Ziyaretçilere psikolojik tavsiye veremezsin, teşhis koyamazsın.
- ACİL DURUM YÖNETİMİ: Eğer kullanıcı kendine zarar verme, intihar, şiddet veya kriz durumundan bahsederse, terapi önermeyi bırak ve ŞU MESAJI VER: "Şu an çok zor bir süreçten geçtiğinizi görüyorum. Ben yapay zeka tabanlı bir asistanım ve size bu konuda yeterli desteği sağlayamam. Lütfen hemen 112 Acil Çağrı Merkezi'ni arayın veya size en yakın sağlık kuruluşunun acil servisine başvurun. Yalnız değilsiniz."
- KISA VE ÖZ OL: Yanıtlarını çok uzun tutma, okunması kolay paragraflar kullan. Ziyaretçiyi yorma.
- SINIRLARINI BİL: Cevabını bilmediğin durumlarda "Bu konuda sizi doğrudan ofisimizle iletişime geçmeniz için iletişim sayfamıza yönlendirebilirim" diyerek kibarca yönlendirme yap.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.3, // Daha tutarlı ve profesyonel yanıtlar için düşük sıcaklık
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 500, // Çok uzun ve sıkıcı cevapları önlemek için
      },
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    return NextResponse.json({
      response: response.text(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error?.message || error);
    console.error("Chat error status:", error?.status);
    console.error("Chat error details:", JSON.stringify(error, null, 2));

    // Gemini API hata durumlarını kontrol et
    if (error?.status === 429) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderildi, lütfen bekleyin." },
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
