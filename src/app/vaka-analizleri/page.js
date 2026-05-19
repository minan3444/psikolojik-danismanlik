import VakaAnalizleri from "@/components/sections/VakaAnalizleri";
import { Box, Container, Breadcrumbs, Typography } from "@mui/material";

// SANITY BAĞLANTILARI
import { client } from "@/sanity/lib/client";
import { VAKALAR_QUERY } from "@/sanity/lib/queries";
import AppBreadcrumb from "../shared/Appbreadcrumb";

export const metadata = {
  title: "Vaka Analizleri | Psikolog Şeyma İnan",
  description:
    "Gerçek danışan hikayeleri ve terapi süreçleri. Tüm vakalar gizlilik ilkesi kapsamında anonim olarak paylaşılmaktadır.",
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
