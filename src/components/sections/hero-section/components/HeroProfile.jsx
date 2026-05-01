"use client";

import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInLeft, fadeInUp } from "../animations";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

const MotionBox = motion.create(Box);

export default function HeroProfile() {
  return (
    <Grid size={{ xs: 12, md: 5 }}>
      <AnimatedFrame>
        {/* Profil fotoğrafı */}
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              width: { xs: 200, md: 300 },
              height: { xs: 260, md: 390 },
              borderRadius: "40% 60% 40% 60%",
              border: "2px solid",
              borderColor: "primary.light",
            }}
          />
          <Box
            sx={{
              width: { xs: 200, md: 300 },
              height: { xs: 260, md: 390 },
              borderRadius: "60% 40% 60% 40%",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0px 20px 60px rgba(124, 158, 135, 0.25)",
              backgroundColor: "custom.beige",
            }}
          >
            <Image
              src="/images/kopru.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority
              style={{ objectFit: "cover" }}
              alt="Profil Fotoğrafı"
            />
          </Box>
        </Box>

        <MotionBox
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          sx={{ mt: { xs: 4, md: 3 } }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "var(--font-playfair)",
              fontSize: { xs: "1.6rem", md: "1.7rem", lg: "2rem" },
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Kendine Giden Yolda{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                display: "block",
                fontStyle: "italic",
              }}
            >
              Güvenli Bir Liman
            </Box>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontStyle: "italic",
            }}
          >
            Hayat bazen bize ağır gelen valizlerle yola devam etmemizi bekler.
            Bu yükleri sizinle birlikte açıp, geride bırakmanız için buradayım
          </Typography>
        </MotionBox>
      </AnimatedFrame>
    </Grid>
  );
}
