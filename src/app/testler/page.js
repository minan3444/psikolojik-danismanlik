"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Breadcrumbs,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// Merkezi veriyi import ediyoruz
import { tumTestler } from "@/data/testler-data";

const MotionBox = motion.create(Box);

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function TestlerPage() {
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 10 },
        pb: 10,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Navigasyon Yolu */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 4, color: "text.secondary" }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Anasayfa
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            Psikolojik Testler
          </Typography>
        </Breadcrumbs>

        {/* Başlık Alanı */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Kendini Daha İyi Tanı
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700, lineHeight: 1.8 }}
          >
            Kendi iç dünyanıza yapacağınız bir yolculuk, iyileşmenin ilk
            adımıdır. Aşağıdaki testlerle farkındalığınızı artırın.
          </Typography>
        </Box>

        {/* Test Listesi Grid Yapısı */}
        <Grid container spacing={4}>
          {tumTestler.map((test, index) => (
            <Grid key={test.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionBox
                variants={itemAnimation}
                initial="hidden"
                animate="visible"
                custom={index * 0.1}
                whileHover={{ y: -8 }}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid",
                  borderColor: "custom.taupe",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 20px 50px rgba(124,158,135,0.15)",
                    borderColor: "primary.light",
                  },
                }}
              >
                {/* Test Rengi Şeridi */}
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
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                    }}
                  >
                    {test.baslik}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, flexGrow: 1, lineHeight: 1.8 }}
                  >
                    {test.aciklama}
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={`${test.sorular.length} Soru`}
                      size="small"
                      sx={{ bgcolor: "custom.beige" }}
                    />
                  </Box>

                  <Button
                    component={Link}
                    href={`/testler/${test.slug}`} // Dinamik slug yönlendirmesi
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    fullWidth
                    sx={{
                      borderRadius: "50px",
                      py: 1.2,
                      fontWeight: 700,
                      borderWidth: 2,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Testi Başlat
                  </Button>
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
