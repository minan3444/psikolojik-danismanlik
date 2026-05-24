"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import CustomButton from "@/app/shared/customButton";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

function MaddeListesi({ maddeler }) {
  return maddeler.map((madde, index) => (
    <Typography
      key={index}
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
  ));
}

export default function HeroContent({ maddeler }) {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      <AnimatedFrame from="left">
        <Typography variant="h6" sx={{ mb: 1, color: "custom.unvan" }}>
          ✦ PSİKOLOJİK DANIŞMAN
        </Typography>
        <Typography variant="h2" sx={{ mb: 2 }}>
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
