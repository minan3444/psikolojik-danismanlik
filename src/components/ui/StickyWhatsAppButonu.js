"use client";

import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function StickyWhatsAppButonu() {
  return (
    <Box
      component="a"
      href="https://wa.me/905312574578"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 24, md: 30 },
        zIndex: 1200,
        bgcolor: "#25D366",
        color: "white",
        width: { xs: 52, md: 56 },
        height: { xs: 52, md: 56 },
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
          bgcolor: "#128C7E",
        },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
    </Box>
  );
}
