"use client";

import { Box } from "@mui/material";

export default function IletisimBackground({ children }) {
  return (
    <Box
      id="iletisim"
      sx={{
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}
