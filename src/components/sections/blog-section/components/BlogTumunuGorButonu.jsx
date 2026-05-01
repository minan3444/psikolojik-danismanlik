//← server component (düz <Link>)import { Box, Button } from "@mui/material";
"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function BlogTumunuGorButonu() {
  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      <Button
        component={Link}
        href="/blog"
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "50px",
          px: 6,
          py: 1.5,
          fontWeight: 600,
          boxShadow: "0px 8px 25px rgba(124,158,135,0.35)",
        }}
      >
        Tüm Yazıları Gör →
      </Button>
    </Box>
  );
}