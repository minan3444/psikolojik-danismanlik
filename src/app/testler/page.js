"use client";

import { Box, Container, Grid, Typography, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Merkezi veriyi import ediyoruz
import { tumTestler } from "@/data/testler-data";
import AppBreadcrumb from "../shared/Appbreadcrumb";
import CustomButton from "../shared/customButton";

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
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Navigasyon Yolu */}
        <AppBreadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Psikolojik Testler" },
          ]}
        />

        {/* Başlık Alanı */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
            }}
          >
            Kendini Daha İyi Tanı
          </Typography>
          <Typography variant="body1">
            Kendi iç dünyanıza yapacağınız bir yolculuk, iyileşmenin ilk
            adımıdır. Aşağıdaki testlerle farkındalığınızı artırın.
          </Typography>
        </Box>

        {/* Test Listesi Grid Yapısı */}
        <Grid container spacing={4}>
          {tumTestler.map((test, index) => (
            <Grid
              key={test.slug}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{ height: "100%" }}
            >
              <MotionBox
                variants={itemAnimation}
                initial="hidden"
                animate="visible"
                custom={index * 0.1}
                whileHover={{ y: -8 }}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Test Rengi Şeridi /testler */}
                <Box
                  sx={{
                    height: 6,
                    backgroundColor: test.renk || "primary.main",
                  }}
                />

                <Box
                  sx={{
                    p: 3,
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
                    sx={{
                      mb: 3,
                    }}
                  >
                    {test.aciklama}
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={`${test.sorular.length} Soru`}
                      size="small"
                      sx={{ bgcolor: "background.paper" }}
                    />
                  </Box>

                  <CustomButton
                    href={`/testler/${test.slug}`}
                    endIcon={<ArrowForwardIcon />}
                    fullWidth
                  >
                    Testi Başlat
                  </CustomButton>
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
