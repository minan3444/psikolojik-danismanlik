"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";
import AnimasyonluSayac from "@/components/ui/AnimasyonluSayac";
import vizyonMisyon from "@/data/vizyon-misyon";
import rakamlar from "@/data/rakamlar";
import Image from "next/image";
import { useState, useEffect } from "react"; // 1. Hook'ları ekledik
import { scrollAnimation } from "@/app/shared/scrollAnimation";

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

export default function VizyonMisyon() {
  // 2. Yaprakları state'e taşıdık (Başlangıçta boş dizi)
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // 3. Rastgele sayı üretimini sadece İstemci (Client) tarafına hapsediyoruz
    const randomNum = (min, max) => Math.random() * (max - min) + min;

    const generatedLeaves = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: randomNum(-40, 40),
      top: randomNum(0, 95),
      size: randomNum(30, 65),
    }));

    setLeaves(generatedLeaves);
  }, []);

  const ikonlar = {
    Vizyon: LightbulbOutlinedIcon,
    Misyon: NatureOutlinedIcon,
  };

  return (
    <Box
      sx={{
        py: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
          {/* 4. Sadece istemcide yapraklar oluştuktan sonra render et */}
          {leaves.map((leaf, index) => (
            <MotionBox
              key={leaf.id}
              custom={index}
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

        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionBox
              variants={scrollAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{ mb: 4 }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                ✦ Vizyon & Misyon
              </Typography>
              <Typography variant="h2">
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
                }}
              />
            </MotionBox>

            <Box sx={{ position: "relative", zIndex: 10 }}>
              {Object.values(vizyonMisyon).map((item, index) => {
                const Ikon = ikonlar[item.baslik];
                return (
                  <MotionBox
                    key={index}
                    variants={scrollAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index * 0.2}
                    sx={{
                      display: "flex",
                      gap: { xs: 2, md: 3 },
                      mb: 4,
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(5px)",
                      border: "1px solid",
                      borderColor: "custom.taupe",
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
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                        }}
                      >
                        {item.baslik}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: "italic",
                        }}
                      >
                        {item.icerik}
                      </Typography>
                    </Box>
                  </MotionBox>
                );
              })}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {rakamlar.map((rakam, index) => (
                <MotionBox
                  key={rakam.id}
                  variants={scrollAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index * 0.2}
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "white",
                    border: "1px solid",
                    borderColor: "custom.taupe",
                  }}
                >
                  <AnimasyonluSayac hedef={rakam.sayi} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {rakam.etiket}
                  </Typography>
                </MotionBox>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
