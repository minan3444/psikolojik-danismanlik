//psikolojik-danismanlik\src\components\ui\VakaKarti.js
"use client";

import { Box, Typography, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
// Sanity görsel motoru eklendi
import { urlFor } from "@/sanity/lib/image";
import CustomButton from "@/app/shared/customButton";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

const MotionBox = motion.create(Box);

export default function VakaKarti({ vaka }) {
  // GÖRSEL KONTROLÜ: Eğer görsel Sanity'den geliyorsa URL'ye çevir, yoksa statik linki kullan
  const imageUrl = vaka.gorsel?.asset
    ? urlFor(vaka.gorsel).width(600).url()
    : vaka.gorsel;

  return (
    // Link bileşeni kartın tamamını sarmalı

    <AnimatedFrame sx={{ borderRadius: 3, overflow: "hidden" }}>
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
            top: 15,
            left: 15,
            bgcolor: "primary.main",
            color: "white",
          }}
        />
      </Box>

      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
          }}
        >
          {vaka.baslik}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 4,
          }}
        >
          {vaka.ozet}
        </Typography>

        <Box>
          <CustomButton href={`/vaka-analizleri/${vaka.slug}`}>
            Detayları Oku →
          </CustomButton>
        </Box>
      </Box>
    </AnimatedFrame>
  );
}
