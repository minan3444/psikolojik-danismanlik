// src/data/randevu-ayarlari.js

export const hizmetler = [
  {
    id: "on-gorusme",
    baslik: "Süreç Hakkında Bilgi",
    sure: 15, // dakika
    ucret: "Bilgi Amaçlı",
    aciklama: "Tanışma ve süreç hakkında kısa bilgilendirme görüşmesi (15 dk).",
  },
  {
    id: "bireysel-terapi",
    baslik: "Bireysel Terapi Seansı",
    sure: 50, // dakika
    //ucret: "Ücretli",
    aciklama:
      "Yetişkinlere yönelik online psikolojik danışmanlık seansı (50 dk).",
  },
];

export const calismaSaatleri = {
  haftaIci: [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ],
  cumartesi: ["10:00", "11:00", "12:00", "13:00", "14:00"],
  pazar: [], // Boş ise o gün kapalıdır
};
