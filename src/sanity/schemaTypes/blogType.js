// src/sanity/schemaTypes/blogType.js
export const blogType = {
  name: "blog",
  title: "Blog Yazıları",
  type: "document",
  fields: [
    {
      name: "baslik",
      title: "Yazı Başlığı",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL (Slug)",
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
          "Kaygı",
          "Terapi",
          "Kişisel Gelişim",
          "İlişkiler",
          "Bilimsel Araştırma",
          "EMDR",
          "Stres ve Uyku",
        ],
      },
    },
    {
      name: "gorsel",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
    },
    { name: "tarih", title: "Yayın Tarihi", type: "date" },
    { name: "okumaSuresi", title: "Okuma Süresi", type: "string" },
    { name: "ozet", title: "Kısa Özet", type: "text", rows: 3 },
    {
      name: "icerik",
      title: "Makale İçeriği",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
  ],
};
