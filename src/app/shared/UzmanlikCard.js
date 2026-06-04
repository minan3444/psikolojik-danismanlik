"use client";

import { Box, Card, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

export default function UzmanlikCard({ ikon, baslik, aciklama }) {
  const Ikon = Icons[ikon];

  return (
    <Card
      sx={{
        // Sadece bu iki satır değişti: Sabit vh yerine esnek minHeight ve height verdik
        minHeight: "320px",
        height: "100%",
        borderRadius: 3,
        p: 3,
        backgroundColor: "white",
      }}
    >
      <Box
        className="ikon-kutu"
        sx={{
          width: 55,
          height: 55,
          borderRadius: 3,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {Ikon && <Ikon sx={{ fontSize: 30, color: "primary.main" }} />}
      </Box>

      <Typography
        variant="h4"
        sx={{
          mb: 1,
        }}
      >
        {baslik}
      </Typography>

      <Typography className="alan-aciklama" variant="body2" sx={{ mb: 1 }}>
        {aciklama}
      </Typography>
    </Card>
  );
}
