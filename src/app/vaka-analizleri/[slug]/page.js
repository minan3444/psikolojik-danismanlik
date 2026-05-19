import { Box, Container, Typography, Divider, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// SANITY BAĞLANTILARI
import { client } from "@/sanity/lib/client";
import { VAKA_DETAY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import AppBreadcrumb from "@/app/shared/Appbreadcrumb";
import Image from "next/image";
import VakaBlogIletisimeGecme from "@/app/shared/VakaBlogIletisimeGecme";

// SEO Meta Verileri - Sanity'den Dinamik Çekilir
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vaka = await client.fetch(VAKA_DETAY_QUERY, { slug });

  return {
    title: vaka ? `${vaka.baslik} | Vaka Analizi` : "Vaka Bulunamadı",
  };
}

export default async function VakaDetayPage({ params }) {
  // 1. Next.js 15+ için params await edilir
  const { slug } = await params;

  // 2. URL'den gelen slug decode edilerek Sanity'den veri çekilir
  const decodedSlug = decodeURIComponent(slug);
  const vaka = await client.fetch(VAKA_DETAY_QUERY, { slug: decodedSlug });

  return (
    <Box sx={{ pt: 10, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <AppBreadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Vaka Analizleri", href: "/vaka-analizleri" },
            { label: vaka.kategori },
          ]}
        />

        {/* Başlık Grubu */}
        <Box sx={{ mb: 3 }}>
          <Chip
            label={vaka.kategori}
            color="primary"
            sx={{ mb: 3, color: "white" }}
          />
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontSize: "min(8vw, 3.2rem)",
              wordBreak: "break-word",
            }}
          >
            {vaka.baslik}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="caption">{vaka.sure} Terapi Süreci</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 4,
            height: { xs: 250, md: 450 },
            position: "relative",
          }}
        >
          {vaka.gorsel && (
            <Image
              src={urlFor(vaka.gorsel).url()}
              alt={vaka.baslik}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>

        {/* İçerik Alanı */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Vaka Tanımı
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
            }}
          >
            {vaka.problem}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h5" sx={{ mb: 2 }}>
            Süreç
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
            }}
          >
            {vaka.surec}
          </Typography>

          <Box
            sx={{
              bgcolor: "background.paper",
              p: 3,
              borderRadius: 3,
              borderLeft: "5px solid",
              borderColor: "primary.main",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CheckCircleIcon color="primary" /> Sonuç ve Kazanım
            </Typography>
            <Typography variant="body1">{vaka.sonuc}</Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              color: "text.secondary",
              textAlign: "center",
              mt: 4,
            }}
          >
            {vaka.uzmanNotu}
          </Typography>
        </Box>

        <VakaBlogIletisimeGecme
          baslik="Benzer bir süreç mi yaşıyorsunuz?"
          altMetin="Hikayenizi birlikte dönüştürelim"
          butonMetni="SÜREÇ HAKKINDA BİLGİ AL"
          href="/randevu"
        />
      </Container>
    </Box>
  );
}
