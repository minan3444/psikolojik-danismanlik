import VakaAnalizleri from "@/components/sections/VakaAnalizleri";
import { Box, Container, Breadcrumbs, Typography } from "@mui/material";

// SANITY BAĞLANTILARI
import { client } from "@/sanity/lib/client";
import { VAKALAR_QUERY } from "@/sanity/lib/queries";
import AppBreadcrumb from "../shared/Appbreadcrumb";

export const metadata = {
  title: "Vaka Analizleri | Psikolojik Danışman Şeyma İnan",
  description:
    "Gerçek terapi süreçleri ve dönüşüm hikayeleri. Travma, kaygı, depresyon, OKB ve ilişki sorunlarında EMDR ile yaşanan değişimler. Tüm vakalar gizlilik ilkesi kapsamında anonimdir.",
  keywords: [
    "terapi vaka analizi",
    "EMDR vaka örneği",
    "travma terapisi hikayesi",
    "kaygı terapisi sonuçları",
    "depresyon iyileşme hikayesi",
    "OKB tedavisi",
    "psikolojik danışmanlık örnek vakalar",
    "online terapi başarı hikayesi",
    "ilişki terapisi vaka",
    "bağlanma sorunları terapi",
  ],
  openGraph: {
    title: "Vaka Analizleri | Şeyma İnan Psikolojik Danışmanlık",
    description:
      "Travma, kaygı, depresyon ve ilişki sorunlarında gerçek terapi süreçleri ve dönüşüm hikayeleri.",
    url: "/vaka-analizleri",
    type: "website",
  },
  alternates: {
    canonical: "/vaka-analizleri",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function VakaAnalizleriPage() {
  // VERİYİ SUNUCU TARAFINDA ÇEKİYORUZ (Performans ve SEO için en iyi yol)
  const vakaVerileri = await client.fetch(VAKALAR_QUERY);

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 10 },
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* LİSTE SAYFASI BREADCRUMBS */}
        <Container maxWidth="lg">
          <AppBreadcrumb
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Vaka Analizleri" },
            ]}
          />
        </Container>
      </Container>

      {/* Sanity'den gelen veriyi (vakaVerileri) bileşene gönderiyoruz */}
      <VakaAnalizleri isFullPage={true} initialData={vakaVerileri} />
    </Box>
  );
}
