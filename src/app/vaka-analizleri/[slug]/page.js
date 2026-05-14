import {
  Box,
  Container,
  Typography,
  Divider,
  Chip,
  Button,
  Breadcrumbs,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// SANITY BAĞLANTILARI
import { client } from "@/sanity/lib/client";
import { VAKA_DETAY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

  // 3. Vaka bulunamazsa hata ekranı
  if (!vaka) {
    return (
      <Container sx={{ py: 20, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontFamily: "var(--font-playfair)", mb: 3 }}
        >
          Vaka bulunamadı.
        </Typography>
        <Link
          href="/vaka-analizleri"
          passHref
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "50px" }}
          >
            TÜM VAKALARA DÖN
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Box sx={{ pt: 16, pb: 10, bgcolor: "#FDFCFB", minHeight: "100vh" }}>
      <Container maxWidth="md">
        {/* BREADCRUMBS */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 4, color: "text.secondary" }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Anasayfa
          </Link>
          <Link
            href="/vaka-analizleri"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Vaka Analizleri
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            {vaka.baslik}
          </Typography>
        </Breadcrumbs>

        <Link
          href="/vaka-analizleri"
          passHref
          style={{ textDecoration: "none" }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 4,
              color: "text.secondary",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Tüm Analizlere Dön
          </Button>
        </Link>

        {/* Başlık Grubu */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label={vaka.kategori}
            color="primary"
            sx={{ mb: 2, fontWeight: 700 }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: "2rem", md: "3.2rem" },
              lineHeight: 1.2,
            }}
          >
            {vaka.baslik}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              {vaka.sure} Terapi Süreci
            </Typography>
          </Box>
        </Box>

        {/* Ana Görsel - Sanity urlFor Entegrasyonu */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 8,
            height: { xs: 250, md: 450 },
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          {vaka.gorsel && (
            <img
              src={urlFor(vaka.gorsel).url()}
              alt={vaka.baslik}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            {vaka.problem}
          </Typography>

          <Divider sx={{ mb: 6 }} />

          <Typography variant="h5" sx={{ mb: 2 }}>
            Süreç
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            {vaka.surec}
          </Typography>

          <Box
            sx={{
              bgcolor: "custom.beige",
              p: 4,
              borderRadius: 3,
              borderLeft: "5px solid",
              borderColor: "primary.main",
              mb: 6,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.dark",
              }}
            >
              <CheckCircleIcon color="primary" /> Sonuç ve Kazanım
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {vaka.sonuc}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              color: "text.secondary",
              textAlign: "center",
              mt: 8,
              lineHeight: 1.6,
            }}
          >
            {vaka.uzmanNotu}
          </Typography>
        </Box>

        {/* Alt Aksiyon Butonu */}
        <Box
          sx={{
            mt: 10,
            p: { xs: 4, md: 8 },
            borderRadius: 3,
            bgcolor: "primary.main",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Benzer bir süreç mi yaşıyorsunuz?
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, opacity: 0.9 }}>
            Hikayenizi birlikte dönüştürebiliriz.
          </Typography>
          <Link href="/randevu" passHref style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                borderRadius: "50px",
                px: 6,
                py: 1.5,
                fontWeight: 800,
              }}
            >
              ÜCRETSİZ ÖN GÖRÜŞME AL
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
