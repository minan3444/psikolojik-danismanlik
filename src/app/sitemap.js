import { sanityClient } from "@/sanity/lib/client";

export default async function sitemap() {
  const baseUrl = "https://www.seymainan.com";

  // ✅ BUILD ZAMANINI AL (Her deploy'da otomatik güncellenir)
  const statikSayfaTarihi = new Date(process.env.buildTime);

  // Dinamik sayfalar (Sanity'den)
  const blogYazilari = await sanityClient.fetch(
    `*[_type == "blog"] { "slug": slug.current, _updatedAt }`,
  );
  const vakalar = await sanityClient.fetch(
    `*[_type == "vaka"] { "slug": slug.current, _updatedAt }`,
  );

  const statikSayfalar = [
    {
      url: baseUrl,
      lastModified: statikSayfaTarihi,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hakkimda`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/randevu`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/psikolojik-testler`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/psikolojik-testler/algilanan-stres-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/anksiyete-bozuklugu-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/baglanma-stilleri-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/benlik-saygisi-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/bes-sevgi-dili-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/duygusal-zeka-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/icsel-motivasyon-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/kendini-tanima-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/oz-sefkat-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/sosyal-kaygi-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/uyku-kalitesi-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/yasam-doyumu-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/psikolojik-testler/zaman-yonetimi-testi`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vaka-analizleri`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: statikSayfaTarihi,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dinamik blog sayfaları
  const blogSayfalar = blogYazilari.map((yazi) => ({
    url: `${baseUrl}/blog/${yazi.slug}`,
    lastModified: new Date(yazi._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dinamik vaka sayfaları
  const vakaSayfalar = vakalar.map((vaka) => ({
    url: `${baseUrl}/vaka-analizleri/${vaka.slug}`,
    lastModified: new Date(vaka._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...statikSayfalar, ...blogSayfalar, ...vakaSayfalar];
}
