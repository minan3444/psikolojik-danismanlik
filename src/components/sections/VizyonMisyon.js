"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";
import AnimasyonluSayac from "@/components/ui/AnimasyonluSayac";
import AnimatedFrame from "@/app/shared/AnimatedFrame";
import vizyonMisyon from "@/data/vizyon-misyon";
import rakamlar from "@/data/rakamlar";
import Image from "next/image";
import { useState, useEffect } from "react";

const MotionBox = motion.create(Box);

const leafVariants = {
  hidden: { y: -300, opacity: 0, rotate: 0 },
  visible: (i) => ({
    y: [-300, -100, 0],
    opacity: [0, 1, 1],
    rotate: [0, 20, -20, i * 8],
    transition: {
      y: { duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 },
      rotate: { duration: 4, ease: "easeInOut", delay: i * 0.15 },
      opacity: { duration: 0.8, delay: i * 0.15 },
    },
  }),
};

const ikonlar = { Vizyon: LightbulbOutlinedIcon, Misyon: NatureOutlinedIcon };

export default function VizyonMisyon() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const r = (min, max) => Math.random() * (max - min) + min;
    setLeaves(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: r(-40, 40),
        top: r(0, 95),
        size: r(30, 65),
      })),
    );
  }, []);

  return (
    <Box sx={{ py: 3, position: "relative", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Yaprak animasyonu */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "-30px", md: "-80px", lg: "-120px" },
            top: 0,
            width: "1px",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {leaves.map((leaf, i) => (
            <MotionBox
              key={leaf.id}
              custom={i}
              variants={leafVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              sx={{
                position: "absolute",
                left: `${leaf.left}px`,
                top: `${leaf.top}%`,
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
              }}
            >
              <Image
                src="/images/leaf.webp"
                alt=""
                width={leaf.size}
                height={leaf.size}
                style={{
                  objectFit: "contain",
                  filter: "sepia(0.1) saturate(0.9) hue-rotate(10deg)",
                }}
              />
            </MotionBox>
          ))}
        </Box>

        {/*Sol grid*/}
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, display: "block" }}
            >
              ✦ VİZYON & MİSYON
            </Typography>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Neden{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontStyle: "italic" }}
              >
                Buradayım?
              </Box>
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                backgroundColor: "primary.main",
                borderRadius: 3,
                mb: 3,
              }}
            />

            {Object.values(vizyonMisyon).map((item, index) => {
              const Ikon = ikonlar[item.baslik];
              return (
                <AnimatedFrame
                  key={index}
                  delay={index * 0.2}
                  hover={false}
                  sx={{
                    flexDirection: "row", // ikon ve metin yan yana
                    // alignItems: "flex-start", // üstten hizala
                    mb: 2,
                    p: 2, // ↓ Kart yüksekliği vizyon misyon
                    backgroundColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      backgroundColor: "primary.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {Ikon && (
                      <Ikon sx={{ color: "primary.dark", fontSize: 30 }} />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ p: 1 }}>
                      {item.baslik}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ p: 0.5, fontStyle: "italic" }}
                    >
                      {item.icerik}
                    </Typography>
                  </Box>
                </AnimatedFrame>
              );
            })}
          </Grid>
          {/*sağ grid*/}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {rakamlar.map((rakam, index) => (
                <AnimatedFrame
                  key={rakam.id}
                  sx={{
                    textAlign: "center",
                    backgroundColor: "white",
                    p: 1,
                  }}
                >
                  <AnimasyonluSayac hedef={rakam.sayi} />
                  <Typography variant="h6">{rakam.etiket}</Typography>
                </AnimatedFrame>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
