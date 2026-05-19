"use client";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// SANITY GÖRSEL MOTORUNU EKLEDİK
import { urlFor } from "@/sanity/lib/image";

const MotionBox = motion.create(Box);

export default function BlogKarti({ yazi }) {
  // GÖRSEL KONTROLÜ: Eğer görsel Sanity'den geliyorsa URL'ye çevir, yoksa (eskisiyse) olduğu gibi bırak
  const imageUrl = yazi.gorsel?.asset ? urlFor(yazi.gorsel).url() : yazi.gorsel;

  return (
    <Link href={`/blog/${yazi.slug}`} style={{ textDecoration: "none" }}>
      <MotionBox
        whileHover={{ y: -8 }}
        sx={{
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "custom.taupe",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0px 15px 40px rgba(0,0,0,0.05)",
            borderColor: "primary.light",
          },
        }}
      >
        {/* URL BURADA GÜNCELLENDİ */}
        <Box
          sx={{
            height: 200,
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Chip
            label={yazi.kategori}
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
          <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              {yazi.tarih}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              • {yazi.okumaSuresi}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            {yazi.baslik}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, flexGrow: 1, lineHeight: 1.7 }}
          >
            {yazi.ozet}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            DEVAMINI OKU <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </MotionBox>
    </Link>
  );
}
