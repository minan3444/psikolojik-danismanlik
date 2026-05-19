"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CustomButton from "@/app/shared/customButton";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

function MaddeListesi({ maddeler }) {
  return maddeler.map((madde, index) => (
    <AnimatedFrame key={index}>
      <Typography
        variant="body1"
        sx={{
          display: "list-item",
          ml: 3,
          listStyleType: "disc",
        }}
      >
        <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
          {madde.vurgu}
        </Box>{" "}
        {madde.normal}
      </Typography>
    </AnimatedFrame>
  ));
}

export default function HeroContent({ maddeler }) {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      <AnimatedFrame from="left">
        {/* Üst etiket */}
        <Typography variant="h6" sx={{ mb: 1, color: "custom.unvan" }}>
          ✦ PSİKOLOJİK DANIŞMAN
        </Typography>
        <Typography variant="h2">
          Kıyıya Birlikte
          <Box
            component="span"
            sx={{
              color: "primary.main",
              display: "block",
              fontStyle: "italic",
            }}
          >
            Yol Alalım
          </Box>
        </Typography>
        {/* Madde listesi */}
        <MaddeListesi maddeler={maddeler} />
        {/* Butonları responsive sıraladık.temiz çözüm */}
        <Stack
          spacing={2}
          sx={{ mt: 2 }}
          direction={{ xs: "column", md: "row" }}
        >
          <CustomButton href="/randevu">Online Randevu Al</CustomButton>
          <CustomButton href="/hakkimda" backgroundColor="#9e7c93">
            Daha Fazla Tanı
          </CustomButton>
        </Stack>
      </AnimatedFrame>
    </Grid>
  );
}
