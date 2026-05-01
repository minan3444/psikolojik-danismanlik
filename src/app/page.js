// src/app/page.js
import HeroSection from "@/components/sections/hero-section/HeroSection";
import UzmanlikAlanlari from "@/components/sections/UzmanlikAlanlari/UzmanlikAlanlari";
import VizyonMisyon from "@/components/sections/VizyonMisyon";
import VakaAnalizleri from "@/components/sections/VakaAnalizleri";
import TerapiSureci from "@/components/sections/TerapiSureci";
import NedenBirlikte from "@/components/sections/NedenBirlikte";
import PsikolojikTestler from "@/components/sections/PsikolojikTestler";
import KendineBirMola from "@/components/sections/kendineBirMola/KendineBirMola";
import BlogSection from "@/components/sections/blog-section/BlogSection";
import SSSSection from "@/components/sections/SSSSection";
import IletisimSection from "@/components/sections/IletisimSection";

// --- SANITY BAĞLANTILARI ---
import { client } from "@/sanity/lib/client"; // HATANIN ÇÖZÜMÜ OLAN SATIR
import {
  BLOG_QUERY,
  VAKALAR_ANA_SAYFA_QUERY,
  HAKKIMDA_QUERY,
  LEGAL_SLUGS_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 0;

export default async function Home() {
  const [yazilar, vakalar, hakkimda, legalDocs] = await Promise.all([
    client.fetch(BLOG_QUERY),
    client.fetch(VAKALAR_ANA_SAYFA_QUERY),
    client.fetch(HAKKIMDA_QUERY),
    client.fetch(LEGAL_SLUGS_QUERY),
  ]);

  return (
    <>
      <HeroSection maddeler={hakkimda?.heroMaddeler} />
      <UzmanlikAlanlari />
      <VizyonMisyon />
      <VakaAnalizleri initialData={vakalar} />
      <TerapiSureci />
      <NedenBirlikte />
      <PsikolojikTestler />
      <KendineBirMola />
      <BlogSection initialData={yazilar} />
      <SSSSection />
      {/* legalDocs verisini buraya paslıyoruz */}
      <IletisimSection legalDocs={legalDocs} />
    </>
  );
}
