"use client";

import { Box, Card, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

export default function UzmanlikCard({ ikon, baslik, aciklama }) {
  const Ikon = Icons[ikon];

  return (
    <Card
      sx={{
        height: "40vh",
        borderRadius: 4,
        p: 3,
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "custom.taupe",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          backgroundColor: "primary.main",
          boxShadow: "0px 20px 50px rgba(124, 158, 135, 0.3)",
          borderColor: "primary.main",
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
          backgroundColor: "custom.beige",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        {Ikon && <Ikon sx={{ fontSize: 30, color: "inherit" }} />}
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontFamily: "var(--font-playfair)",
          fontWeight: 700,
          color: "inherit",
        }}
      >
        {baslik}
      </Typography>

      <Typography
        className="alan-aciklama"
        variant="body2"
        sx={{ color: "inherit" }}
      >
        {aciklama}
      </Typography>
    </Card>
  );
}
