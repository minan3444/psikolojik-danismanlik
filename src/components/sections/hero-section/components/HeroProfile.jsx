"use client";

import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "../animations";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

const MotionBox = motion.create(Box);

export default function HeroProfile() {
  return (
    <Grid size={{ xs: 20, md: 5 }}>
      <AnimatedFrame>
        {/* Profil fotoğrafı */}
        <Box sx={{ position: "relative", width: "75%" }}>
          <Box
            sx={{
              position: "absolute",
              top: "5%",
              left: "5%",
              width: "100%",
              height: "100%",
              borderRadius: "40% 60% 40% 60%",
              border: "2px solid",
              borderColor: "primary.light",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "60% 40% 60% 40%",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0px 20px 60px rgba(124, 158, 135, 0.25)",
              backgroundColor: "custom.beige",
              zIndex: 1,
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
