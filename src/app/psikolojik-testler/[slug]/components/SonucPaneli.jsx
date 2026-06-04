"use client";

import { Box, Typography, Paper } from "@mui/material";
import CustomButton from "@/app/shared/customButton";

export default function SonucPaneli({ sonuc, onTekrarla }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "custom.taupe",
        textAlign: "center",
      }}
    >
      {sonuc.puan !== undefined && (
        <Typography variant="h3" sx={{ color: "primary.main", mb: 1 }}>
          {sonuc.puan} / {sonuc.maxPuan}
        </Typography>
      )}

      <Typography variant="h5" sx={{ mb: 2 }}>
        {sonuc.baslik}
      </Typography>

      <Typography variant="body1" sx={{ mb: 6, maxWidth: 600, mx: "auto" }}>
        {sonuc.aciklama}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CustomButton onClick={onTekrarla} variant="outlined" sx={{ px: 4 }}>
          Testi Tekrarla
        </CustomButton>
        <CustomButton href="/randevu">Süreç Hakkında Bilgi Al ➜</CustomButton>
      </Box>
    </Paper>
  );
}
