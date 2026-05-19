"use client";

import { Box, Card, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

export default function CardAlani({ ikon, baslik, aciklama }) {
  const Ikon = Icons[ikon];

  return (
    <Card
      sx={{
        height: "45vh",
        borderRadius: 3,
        p: 3,
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "white",
          "& .ikon-kutu": { backgroundColor: "rgba(255,255,255,0.2)" },
          "& .alan-aciklama": { opacity: 0.8 },
        },
      }}
    >
      <Box
        className="ikon-kutu"
        sx={{
          width: 64,
          height: 64,
          borderRadius: 3,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Ikon && <Ikon sx={{ fontSize: 30, color: "inherit" }} />}
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          mb: 1,
        }}
      >
        {baslik}
      </Typography>

      <Typography className="alan-aciklama" variant="body1" sx={{ mb: 1 }}>
        {aciklama}
      </Typography>
    </Card>
  );
}
