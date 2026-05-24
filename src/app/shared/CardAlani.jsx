"use client";

import { Box, Card, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

export default function CardAlani({ ikon, baslik, aciklama }) {
  const Ikon = Icons[ikon];

  return (
    <Card
      sx={{
        height: "vh", //kart yüksekliği
        borderRadius: 3,
        p: 2,
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
        }}
      >
        {Ikon && <Ikon sx={{ fontSize: 30, color: "inherit" }} />}
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
