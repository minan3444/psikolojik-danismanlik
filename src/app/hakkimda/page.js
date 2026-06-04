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

// SEO Metadata
// SEO Metadata
export const metadata = {
  title: "Hakkımda",

  description:
    "Yıldız Teknik Üniversitesi PDR mezunu, EMDR ve BDT sertifikalı psikolojik danışman Şeyma İnan. Çocukluk travmaları, kaygı, depresyon ve ilişki sorunlarında online terapi. Yüksek lisans uzmanlığı ile profesyonel destek.",

  keywords: [
    // Ana Meslek ve Hizmet (Yüksek Aranma Hacmi)
    "psikolojik danışman",
    "online psikolog",
    "psikolojik danışmanlık",
    "online terapi",
    "online psikolojik danışmanlık",

    // Uzmanlık Yöntemleri (Orta-Yüksek Hacim)
    "EMDR terapisi",
    "EMDR sertifikalı psikolog",
    "BDT terapisi",
    "bilişsel davranışçı terapi",
    "travma terapisi",
    "kaygı terapisi",
    "depresyon terapisi",
    "ilişki terapisi",
    "bağlanma terapisi",
    "öz güven terapisi",
    "stres yönetimi",

    // Eğitim ve Kurum (Güven Oluşturucu)
    "Yıldız Teknik Üniversitesi psikoloji",
    "YTÜ PDR mezunu",
    "psikolojik danışmanlık yüksek lisans",
    "akademik psikolog",

    // Çalışma Alanları (Spesifik Aramalar)
    "çocukluk travması terapisi",
    "travma uzmanı psikolog",
    "kaygı terapisti",
    "depresyon tedavisi",
    "ilişki sorunları terapisi",
    "yetişkin terapisi",
    "öz şefkat terapisi",

    "İstanbul psikolog",
    "Kartal psikolog",
    "Bakırköy psikolog",
    "online psikolog Türkiye",
    "yurtdışı Türk psikolog",

    // Kalite Göstergeleri
    "yüksek onur derecesi psikolog",
    "deneyimli psikolojik danışman",
    "uzman psikolog",
  ],

  openGraph: {
    title: "Hakkımda | Şeyma İnan",
    description:
      "Yıldız Teknik Üniversitesi PDR mezunu, EMDR ve BDT sertifikalı psikolojik danışman. Çocukluk travmaları ve kaygı uzmanı.",
    url: "/hakkimda",
    type: "profile",
    images: [
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 1000,
        alt: "Şeyma İnan - Psikolojik Danışman ve EMDR Terapisti",
      },
    ],
  },

  alternates: {
    canonical: "/hakkimda",
  },

  robots: {
    index: true,
    follow: true,
  },

  authors: [{ name: "Şeyma İnan" }],
  creator: "Şeyma İnan",
  publisher: "Şeyma İnan Psikolojik Danışmanlık",
};
// Canlı veri tazeleme
export const revalidate = 0;

export default async function HakkimdaPage() {
  const data = await client.fetch(HAKKIMDA_QUERY);

  // Zenginleştirilmiş Person Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.isim || "Şeyma İnan",
    jobTitle: data.unvan || "Psikolojik Danışman",
    description:
      data.ozgecmis?.[0] || "Online psikolojik danışman ve EMDR terapisti",
    image: "https://www.seymainan.com/images/profile.jpg",
    url: "https://www.seymainan.com/hakkimda",

    sameAs: [
      "https://www.instagram.com/pd.seymainan",
      "https://www.linkedin.com/in/%C5%9Feyma-inan-2481651a4",
      "https://www.doktortakvimi.com/seyma-inan/psikolojik-danisma-ve-rehberlik/maltepe",
    ],

    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Yıldız Teknik Üniversitesi",
    },

    worksFor: {
      "@type": "Organization",
      name: "Şeyma İnan Psikolojik Danışmanlık",
      url: "https://www.seymainan.com",
    },

    address: {
      "@type": "PostalAddress",
      postalCode: "34876",
      addressLocality: "Maltepe",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },

    knowsAbout: [
      "EMDR Terapisi",
      "Travma Sonrası Stres Bozukluğu",
      "Kaygı Bozuklukları",
      "Panik Atak",
      "Depresyon",
      "OKB",
      "İlişki Sorunları",
      "Bağlanma Sorunları",
      "Öz Güven",
      "Stres Yönetimi",
    ],

    hasCredential:
      data.egitimler?.map((egitim) => ({
        "@type": "EducationalOccupationalCredential",
        name: egitim.baslik,
        description: egitim.detay,
      })) || [],
  };

  return (
    <Box component="main" sx={{ pt: { xs: 12, md: 14 }, pb: 10 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 10 }}>
          {/* SOL TARAF: Görsel */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: 120 }}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: 4,
                  overflow: "hidden",
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
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Çalıştığım Kurumlar
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
                      <Typography variant="body1">{yer}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* SAĞ TARAF: Biyografi ve Eğitim */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box component="section">
              <Typography variant="h6" sx={{ color: "custom.unvan" }}>
                {data.unvan}
              </Typography>
              <Typography variant="h2" sx={{ mb: 3 }}>
                {data.isim}
              </Typography>
              <Divider
                sx={{
                  width: 80,
                  height: 4,
                  bgcolor: "primary.main",
                  border: "none",
                  borderRadius: 3,
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
                      mb: 3,
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
                borderRadius: 3,
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h4" sx={{ mb: 4 }}>
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
                          variant="h6"
                          sx={{
                            mb: 1,
                          }}
                        >
                          {item.baslik}
                        </Typography>
                        <Typography variant="body1">{item.detay}</Typography>
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
