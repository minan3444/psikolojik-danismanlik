"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyRandevuButonu() {
  const pathname = usePathname();

  // Randevu sayfasındaysa butonu gizle
  if (pathname === "/randevu") return null;

  return (
    <Box
      component={Link}
      href="/randevu"
      sx={{
        position: "fixed",
        right: "-75px",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        zIndex: 1200,
        bgcolor: "primary.main",
        color: "white",
        px: 2,
        py: 0.5,
        borderRadius: "8px 8px 0 0",
        fontWeight: 700,
        fontSize: "0.8rem",
        letterSpacing: "0.12em",
        textDecoration: "none",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        boxShadow: "-2px 0px 16px rgba(124,158,135,0.45)",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "primary.dark",
          right: "-30px",
        },
      }}
    >
      Online Randevu Al
    </Box>
  );
}
