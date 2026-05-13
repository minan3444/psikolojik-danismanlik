import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import Image from "next/image";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

// SANITY BAĞLANTILARI
import { client } from "@/sanity/lib/client";
import { HAKKIMDA_QUERY } from "@/sanity/lib/queries";

export const metadata = {
  title: "Hakkımda | Psikolojik Danışman Şeyma İnan",
  description:
    "Yıldız Teknik Üniversitesi mezunu, EMDR ve BDT uzmanı Şeyma İnan hakkında detaylı biyografi, eğitim ve iş tecrübesi.",
  alternates: { canonical: "/hakkimda" },
};
// Canlı veri tazeleme
export const revalidate = 0;

export default async function HakkimdaPage() {
  // 1. VERİYİ SANITY'DEN ÇEKİYORUZ
  const data = await client.fetch(HAKKIMDA_QUERY);

  // Eğer veri henüz Sanity'den girilmemişse hata vermemesi için kontrol
  if (!data)
    return (
      <Box sx={{ py: 20, textAlign: "center" }}>İçerik hazırlanıyor...</Box>
    );

  // SEO için Person Schema (Dinamik hale getirildi)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.isim,
    jobTitle: data.unvan,
    alumniOf: "Yıldız Teknik Üniversitesi",
    description: data.ozgecmis?.[0] || "",
    image: "/images/profile.jpg",
  };

  return (
    <Box
      component="main"
      sx={{ pt: { xs: 12, md: 18 }, pb: 10, bgcolor: "background.default" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 10 }}>
          {/* SOL TARAF: Görsel ve Tecrübe Alanları */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: 120 }}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  position: "relative",
                  mb: 4,
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  style={{ objectFit: "cover" }}
                  alt={`${data.isim} - ${data.unvan}`}
                />
              </Box>

              {/* Sanity'den gelen 'tecrubeler' listesi */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "custom.taupe",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    mb: 2.5,
                  }}
                >
                  Tecrübe Alanları
                </Typography>
                <Stack spacing={2}>
                  {data.tecrubeler?.map((yer, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      <LocalHospitalOutlinedIcon
                        sx={{ color: "primary.main", fontSize: 22 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        {yer}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* SAĞ TARAF: Biyografi ve Eğitim */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box component="section">
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  mb: 1,
                  display: "block",
                }}
              >
                {data.unvan}
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 800,
                  color: "text.primary",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  mb: 3,
                }}
              >
                {data.isim}
              </Typography>

              <Divider
                sx={{
                  width: 80,
                  height: 4,
                  bgcolor: "primary.main",
                  border: "none",
                  borderRadius: 2,
                  mb: 5,
                }}
              />

              <Box sx={{ mb: 6 }}>
                {/* Sanity'den gelen 'ozgecmis' paragrafları */}
                {data.ozgecmis?.map((paragraf, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      mb: 3,
                      color: "text.secondary",
                      fontSize: "1.1rem",
                    }}
                  >
                    {paragraf}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box
              component="section"
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 6,
                bgcolor: "custom.beige",
                border: "1px solid",
                borderColor: "custom.taupe",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                }}
              >
                Eğitim & Uzmanlıklar
              </Typography>

              <Grid container spacing={3}>
                {/* Sanity'den gelen 'egitimler' listesi */}
                {data.egitimler?.map((item, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            lineHeight: 1.2,
                            mb: 0.5,
                          }}
                        >
                          {item.baslik}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.detay}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
