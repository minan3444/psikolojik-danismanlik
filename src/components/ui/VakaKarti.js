//psikolojik-danismanlik\src\components\ui\VakaKarti.js
"use client";

import { Box, Typography, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
// Sanity görsel motoru eklendi
import { urlFor } from "@/sanity/lib/image";

const MotionBox = motion.create(Box);

export default function VakaKarti({ vaka }) {
  // GÖRSEL KONTROLÜ: Eğer görsel Sanity'den geliyorsa URL'ye çevir, yoksa statik linki kullan
  const imageUrl = vaka.gorsel?.asset
    ? urlFor(vaka.gorsel).width(600).url()
    : vaka.gorsel;

  return (
    // Link bileşeni kartın tamamını sarmalı
    <Link
      href={`/vaka-analizleri/${vaka.slug}`}
      style={{ textDecoration: "none" }}
    >
      <MotionBox
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "custom.taupe",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            borderColor: "primary.light",
          },
        }}
      >
        {/* Görsel */}
        <Box
          sx={{
            height: 200,
            // imageUrl değişkeni buraya bağlandı
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Chip
            label={vaka.kategori}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>

        <Box
          sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              color: "text.primary",
              mb: 1.5,
              fontSize: "1.1rem",
            }}
          >
            {vaka.baslik}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {vaka.ozet}
          </Typography>

          <Box sx={{ mt: "auto" }}>
            <Button
              variant="text"
              color="primary"
              sx={{ p: 0, fontWeight: 700, fontSize: "0.8rem" }}
            >
              DETAYLARI OKU →
            </Button>
          </Box>
        </Box>
      </MotionBox>
    </Link>
  );
}
