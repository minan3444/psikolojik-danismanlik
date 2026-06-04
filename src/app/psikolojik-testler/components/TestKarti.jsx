"use client";

import { Box, Typography, Chip } from "@mui/material";

import AnimatedFrame from "@/app/shared/AnimatedFrame";
import * as Icons from "@mui/icons-material";

export default function TestKarti({ test, index }) {
  const Ikon = Icons[test.ikon];
  return (
    <AnimatedFrame sx={{ backgroundColor: "white" }}>
      {/* Renk şeridi */}
      <Box sx={{ height: 6, backgroundColor: "primary.main" }} />
      {Ikon && <Ikon sx={{ color: "primary.main", fontSize: 32, m: 1 }} />}
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {test.baslik}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
          {test.aciklama}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}>
          <Chip
            label={`${test.sorular.length} Soru`}
            size="small"
            sx={{ bgcolor: "background.paper" }}
          />
        </Box>
      </Box>
    </AnimatedFrame>
  );
}
