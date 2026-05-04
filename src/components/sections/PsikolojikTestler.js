"use client";

import { Box, Container, Grid, Typography, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionBaslik from "@/components/ui/SectionBaslik";
import { tumTestler } from "@/data/testler-data";
import CustomButton from "@/app/shared/customButton";

const MotionBox = motion.create(Box);

const scrollAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

// isFullPage prop'u sayesinde anasayfada 3 tane, /testler sayfasında hepsini gösteriyoruz
export default function PsikolojikTestler({ isFullPage = false }) {
  // Eğer tam sayfadaysak hepsini, değilsek sadece ilk 3'ünü göster
  const goruntulenecekTestler = isFullPage
    ? tumTestler
    : tumTestler.slice(0, 3);

  return (
    <Box
      sx={{
        p: 3,
        position: "relative",
        overflow: "hidden",
        // Arka plan rengini moda göre hafifçe değiştirebiliriz
        bgcolor: isFullPage ? "transparent" : "background.default",
      }}
    >
      {/* Arka plan overlay (Sadece anasayfa modunda şık durur) */}
      {!isFullPage && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionBaslik
            altBaslik="PSİKOLOJİK TESTLER"
            baslik={
              isFullPage
                ? "Tüm Değerlendirme Testleri"
                : "Kendini Daha İyi Tanı"
            }
          />
        </MotionBox>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {goruntulenecekTestler.map((test, index) => (
            <Grid key={test.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionBox
                variants={scrollAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1}
                whileHover={{ y: -8 }}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
                  border: "1px solid",
                  borderColor: "custom.taupe",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 20px 50px rgba(124,158,135,0.2)",
                    borderColor: "primary.light",
                  },
                }}
              >
                {/* Üst renkli şerit (Testin kendi rengi veya default) */}
                <Box
                  sx={{
                    height: 6,
                    backgroundColor: test.renk || "primary.main",
                  }}
                />

                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  {/* Başlık */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 2,
                    }}
                  >
                    {test.baslik}
                  </Typography>

                  {/* Açıklama */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {test.aciklama}
                  </Typography>

                  {/* Info Chip'leri */}
                  <Box
                    sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={`${test.sorular.length} Soru`}
                      size="small"
                      sx={{
                        backgroundColor: "custom.beige",
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    />
                    <Chip
                      label="Ücretsiz"
                      size="small"
                      sx={{
                        backgroundColor: "primary.light",
                        color: "primary.dark",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <CustomButton
                    variant="outlined"
                    href={`/testler/${test.slug}`}
                  >
                    Testi Başlat
                  </CustomButton>
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        {/* "TÜM TESTLERİ GÖR" BUTONU: Sadece anasayfadaysak (isFullPage false ise) göster */}
        {!isFullPage && (
          <MotionBox
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            sx={{ textAlign: "center" }}
          >
            <CustomButton href="/testler"> Tüm Testleri Gör →</CustomButton>
          </MotionBox>
        )}
      </Container>
    </Box>
  );
}
