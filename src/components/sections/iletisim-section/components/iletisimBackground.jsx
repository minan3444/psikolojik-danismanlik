"use client";

import { Box } from "@mui/material";

export default function IletisimBackground({ children }) {
  return (
    <Box
      id="iletisim"
      sx={{
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}
