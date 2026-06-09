import HeroSection from "@/components/sections/hero-section/hero";
import UzmanlikAlanlari from "@/components/sections/uzmanlik-section/uzmanlik";
import VizyonMisyon from "@/components/sections/VizyonMisyon";
import VakaAnalizleri from "@/components/sections/VakaAnalizleri";
import TerapiSureci from "@/components/sections/TerapiSureci";
import NedenBirlikte from "@/components/sections/NedenBirlikte";
import PsikolojikTestler from "@/components/sections/PsikolojikTestler";
import { Suspense } from "react";
import KendineBirMola from "@/components/sections/kendineBirMola/KendineBirMola";
import Box from "@mui/material/Box";
import BlogSection from "@/components/sections/blog-section/blog";
import SSSSection from "@/components/sections/SSSSection";
import Iletisim from "@/components/sections/iletisim-section/Iletisim";

import { client } from "@/sanity/lib/client";
import {
  BLOG_QUERY,
  VAKALAR_ANA_SAYFA_QUERY,
  HAKKIMDA_QUERY,
  LEGAL_SLUGS_QUERY,
} from "@/sanity/lib/queries";

// SEO Metadata
export const metadata = {
  title: "Online Psikolojik Danışmanlık | EMDR ",
  description:
    "Online psikolojik danışmanlık ve EMDR. Stres/Uyku, Depresif Ruh Hali,Tükenmişlik, Kaygı, Travma, Tekrarlayıcı Düşünceler konularında profesyonel destek",
  keywords: [
    // Ana Hizmetler
    "online psikolojik danışmanlık",
    "online terapi",
    "online psikolog",
    "EMDR terapisi",

    // Uzmanlık Alanları
    "stres bozukluğu",
    "zorlu yaşam olayları",
    "kaygı terapisi",
    "kaygı ve panik duygusu",
    "motivasyon kaybı",
    "panik atak tedavisi",
    "panik bozukluğu",
    "depresyon terapisi",
    "motivasyon kaybı",
    "tekrarlayan düşünceler",
    "OKB nedir",
    "takıntılı düşünceler",
    "kaçınma davranışı",
    "ilişki terapisi",
    "bağlanma terapisi",
    "ilişki dinamikleri",
    "öz değer terapisi",
    "öz saygı gelişimi",
    "öz güven terapisi",
    "stres yönetimi",
    "uyku düzeni",
    "uyku sorunları",
    "öz şefkat",
    "kendine nezaket",

    "Türk psikolog",
    "yurtdışı psikolog",
    "Almanya psikolog",
    "İngiltere psikolog",
    "Hollanda psikolog",
    "online danışmanlık",
    "video terapi",
  ],

  openGraph: {
    title: "Online Psikolojik Danışmanlık | EMDR Terapisi",
    description:
      "Online psikolojik danışmanlık ve EMDR terapisi. Travma, kaygı, depresyon ve ilişki sorunlarında profesyonel destek. Dünyanın her yerinden Türk danışanlara online terapi.",
    url: "/",
    type: "website",
  },
};

// JSON-LD Yapısal Verisi
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: "Şeyma İnan",
  description:
    "Online Psikolojik Danışman ve EMDR Terapisti | Travma, Kaygı, Depresyon, İlişki Sorunları, Stres Yönetimi, Öz Değer ve Öz Şefkat Çalışmaları Uzmanı",
  url: "https://www.seymainan.com",
  image: "https://www.seymainan.com/profile.jpg",
  sameAs: [
    "https://www.instagram.com/pd.seymainan",
    "https://www.linkedin.com/in/%C5%9Feyma-inan-2481651a4",
    "https://www.doktortakvimi.com/seyma-inan/psikolojik-danisma-ve-rehberlik/maltepe",
  ],
  address: {
    "@type": "PostalAddress",
    postalCode: "34876",
    addressLocality: "Kartal",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  availableService: [
    {
      "@type": "TherapeuticProcedure",
      name: "Stres Yönetimi ve Uyku Terapisi",
    },
    {
      "@type": "TherapeuticProcedure",
      name: "Depresyon ve Motivasyon Kaybı Tedavisi",
    },
    { "@type": "TherapeuticProcedure", name: "Kaygı ve Panik Tedavisi" },
    {
      "@type": "TherapeuticProcedure",
      name: "Travma ve Zorlu Yaşam Olayları Terapisi",
    },
    { "@type": "TherapeuticProcedure", name: "EMDR Terapisi" },
    { "@type": "TherapeuticProcedure", name: "İlişki ve Bağlanma Terapisi" },
    {
      "@type": "TherapeuticProcedure",
      name: "Öz Değer ve Öz Saygı Çalışmaları",
    },
    {
      "@type": "TherapeuticProcedure",
      name: "OKB ve Tekrarlayıcı Düşünceler Tedavisi",
    },
    {
      "@type": "TherapeuticProcedure",
      name: "Fobi ve Kaçınma Davranışları Tedavisi",
    },
    {
      "@type": "TherapeuticProcedure",
      name: "Öz Şefkat ve Farkındalık Çalışmaları",
    },
    { "@type": "TherapeuticProcedure", name: "Online Psikolojik Danışmanlık" },
  ],
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  availableLanguage: ["Turkish"],
  priceRange: "$$",
};

export const revalidate = 3600; // Her saat başı yeniden doğrula (performans için 0 yerine 3600)

export default async function Home() {
  const [yazilar, vakalar, hakkimda, legalDocs] = await Promise.all([
    client.fetch(BLOG_QUERY),
    client.fetch(VAKALAR_ANA_SAYFA_QUERY),
    client.fetch(HAKKIMDA_QUERY),
    client.fetch(LEGAL_SLUGS_QUERY),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Online terapi ne kadar sürer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seanslar genellikle 45‑60 dk arasında sürer ve ihtiyaca göre haftada bir ya da iki kez yapılabilir.",
                },
              },
              {
                "@type": "Question",
                name: "EMDR terapi nasıl çalışır?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "EMDR, anımsanan travmatik anıların göz hareketleriyle işlenmesini sağlayarak duygusal yeniden işlenmesine yardımcı olur.",
                },
              },
              {
                "@type": "Question",
                name: "Online danışmanlık ücretleri nedir?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ücretler seans süresi ve terapistin uzmanlık alanına göre değişir; detaylar iletişim sayfasında mevcuttur.",
                },
              },
            ],
          }),
        }}
      />
      <HeroSection maddeler={hakkimda?.heroMaddeler} />
      <UzmanlikAlanlari />
      <VizyonMisyon />
      <VakaAnalizleri initialData={vakalar} />
      <TerapiSureci />
      <NedenBirlikte />
      <PsikolojikTestler />
      <Suspense fallback={<Box sx={{ minHeight: "400px" }} />}>
        <KendineBirMola />
      </Suspense>
      <BlogSection initialData={yazilar} />
      <SSSSection />
      <Iletisim legalDocs={legalDocs} />
    </>
  );
}
