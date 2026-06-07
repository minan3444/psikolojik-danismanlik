export const vakaType = {
  name: "vaka",
  title: "Vaka Analizleri",
  type: "document",
  fields: [
    {
      name: "baslik",
      title: "Vaka Başlığı",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Uzantısı (Slug)",
      type: "slug",
      options: { source: "baslik" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          "Travma ve EMDR",
          "Kaygı ve Panik Bozukluğu",
          "Depresyon",
          "OKB",
          "Fobi ve Korkular",
          "İlişki ve Bağlanma",
          "Özgüven ve Öz Saygı",
          "Uyku ve Stres",
        ],
      },
    },
    {
      name: "gorsel",
      title: "Vaka Görseli",
      type: "image",
      options: { hotspot: true },
    },
    { name: "sure", title: "Terapi Süresi (Örn: 12 Seans)", type: "string" },
    {
      name: "ozet",
      title: "Kısa Özet (Liste sayfasında görünür)",
      type: "text",
      rows: 3,
    },
    { name: "problem", title: "Vaka Tanımı ve Problem", type: "text" },
    { name: "surec", title: "Terapi Süreci", type: "text" },
    { name: "sonuc", title: "Sonuç ve Kazanım", type: "text" },
    { name: "uzmanNotu", title: "Uzman Notu", type: "text", rows: 2 },
  ],
};
