"use client";

import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SectionBaslik from "@/components/ui/SectionBaslik";
import theme from "@/theme/theme";
import CustomButton from "@/app/shared/customButton";
const { sectionPadding } = theme; // Tema'dan sectionPadding'i çekiyoruz

const MotionBox = motion.create(Box);

const scrollAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

// İçerik → data dosyasına taşınabilir ama az değişeceği için burada tutuyoruz
const maddeler = [
  {
    id: 1,
    ikon: PsychologyOutlinedIcon,
    baslik: "Güvenli ve Yargısız Bir Alan",
    aciklama:
      "Kelimelerini seçerken tartmak zorunda kalmadığın, her duygunun olduğu gibi kabul edildiği, şefkatli bir dinleme alanı sunuyorum.",
  },
  {
    id: 2,
    ikon: VerifiedOutlinedIcon,
    baslik: "Bilimsel Temel, İnsani Dokunuş",
    aciklama:
      "Profesyonel teknikleri, senin biricik hayat hikayene modern ve duyarlı bir bakış açısıyla uyarlıyoruz.",
  },
  {
    id: 3,
    ikon: AutoAwesomeOutlinedIcon,
    baslik: "Kendi Doğal Dengeni Keşfet",
    aciklama:
      "Karmaşanın içinde kaybolan iç sesini duyman ve hayatındaki o dengeli ritmi yeniden yakalaman için sana eşlik ediyorum.",
  },
  {
    id: 4,
    ikon: FavoriteOutlinedIcon,
    baslik: "Sürdürülebilir Bir İyilik Hali",
    aciklama:
      "Sadece seans süresince değil, hayatın geneline yayılacak farkındalıklar ve pratik araçlarla güçlenmeni hedefliyoruz.",
  },
  {
    id: 5,
    ikon: AccessTimeOutlinedIcon,
    baslik: "Sana Özel, Senin Hızında",
    aciklama:
      "Değişim zorlayıcı olabilir; bu yüzden sürecimizi senin hazır olduğun tempoda, tamamen senin ihtiyaçlarına odaklanarak şekillendiriyoruz.",
  },
  {
    id: 6,
    ikon: PeopleOutlinedIcon,
    baslik: "Yalnız Değilsin",
    aciklama:
      "Karmaşık hissetmek veya çıkmaza girmek insan olmanın bir parçası. Bu yolda seninle yan yana, omuz omuza yürümek için buradayım.",
  },
];

export default function NedenBirlikte() {
  return (
    <Box
      sx={{
        py: { xs: sectionPadding.xs, md: sectionPadding.md },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      {/* Arka plan fotoğrafı */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          //backgroundImage: `url('_https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.3) 100%)",
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionBaslik
            altBaslik="Neden Birlikte Çalışmalıyız?"
            baslik="Yolculuğuna Eşlik Etmek İçin Buradayım"
          />
        </MotionBox>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {maddeler.map((madde, index) => {
            const Ikon = madde.ikon;
            return (
              <Grid key={madde.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <MotionBox
                  variants={scrollAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.1}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: "100%",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "custom.taupe",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.light",
                    },
                  }}
                >
                  {/* İkon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      backgroundColor: "custom.beige",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Ikon sx={{ color: "primary.main", fontSize: 30 }} />
                  </Box>

                  {/* Başlık */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    {madde.baslik}
                  </Typography>

                  {/* Açıklama */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {madde.aciklama}
                  </Typography>
                </MotionBox>
              </Grid>
            );
          })}
        </Grid>

        {/* Kapanış cümlesi ve buton */}
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{
            textAlign: "center",
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: "custom.taupe",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 600,
              color: "text.primary",
              mb: 2,
              fontStyle: "italic",
              fontSize: { xs: "1.1rem", md: "1.4rem" },
            }}
          >
            {" "}
            Değişim, küçük bir adım ve nazik bir kararla başlar. Kendine
            ayıracağın bu zamanın hayatında neler dönüştürebileceğini görmek
            için ilk adımı birlikte atabiliriz.
          </Typography>

          <CustomButton href="/randevu"> İlk Adımı At →</CustomButton>
        </MotionBox>
      </Container>
    </Box>
  );
}
