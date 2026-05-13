"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import CustomButton from "@/app/shared/customButton";

const MotionBox = motion.create(Box);

const DONGU_SAYISI = 3;

const FASE_METIN = {
  hazir: { metin: "Başlamaya hazır mısın?", renk: "text.primary" },
  nefesAl: { metin: "Nefes Al...", renk: "primary.main" },
  tut: { metin: "Tut...", renk: "secondary.main" },
  birak: { metin: "Yavaşça Bırak...", renk: "text.secondary" },
  bitti: {
    metin: "🌿 Harika! Kendini nasıl hissediyorsun?",
    renk: "primary.main",
  },
};

export default function NefesEgzersizi({ onBitir }) {
  const [fase, setFase] = useState("hazir");
  const [dongu, setDongu] = useState(0);

  const baslat = () => {
    setFase("nefesAl");

    setTimeout(() => {
      setFase("tut");

      setTimeout(() => {
        setFase("birak");

        setTimeout(() => {
          setDongu((prev) => {
            const yeni = prev + 1;
            if (yeni >= DONGU_SAYISI) {
              setFase("bitti");
            } else {
              setFase("nefesAl");
              baslat();
            }
            return yeni;
          });
        }, 8000);
      }, 7000);
    }, 4000);
  };

  const sifirla = () => {
    setFase("hazir");
    setDongu(0);
  };

  const daireAnimasyon =
    fase === "nefesAl"
      ? { scale: 1.4, backgroundColor: "#A8C5B0" }
      : fase === "tut"
        ? { scale: 1.4, backgroundColor: "#8FA8C8" }
        : fase === "birak"
          ? { scale: 1, backgroundColor: "#C4B5A5" }
          : { scale: 1, backgroundColor: "#7C9E87" };

  const daireTransition = {
    duration: fase === "nefesAl" ? 4 : fase === "tut" ? 0.3 : 8,
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        4 • 7 • 8 Nefes Tekniği
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        4 saniye nefes al → 7 saniye tut → 8 saniye bırak
      </Typography>

      <MotionBox
        animate={daireAnimasyon}
        transition={daireTransition}
        sx={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 4,
          boxShadow: "0px 8px 30px rgba(124,158,135,0.3)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", fontWeight: 700, px: 2, textAlign: "center" }}
        >
          {FASE_METIN[fase]?.metin}
        </Typography>
      </MotionBox>

      {fase !== "hazir" && fase !== "bitti" && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {dongu + 1}. döngü / {DONGU_SAYISI}
        </Typography>
      )}

      {fase === "hazir" && (
        <Button
          variant="contained"
          color="primary"
          onClick={baslat}
          sx={{ borderRadius: "50px", px: 4, py: 1.5, fontWeight: 600 }}
        >
          Başlat
        </Button>
      )}

      {fase === "bitti" && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={sifirla}
            sx={{ borderRadius: "50px", px: 3, fontWeight: 600 }}
          >
            Tekrar Yap
          </Button>
          <CustomButton href="/randevu">
            {" "}
            Benimle Konuşmak İster misin?
          </CustomButton>
        </Box>
      )}
    </Box>
  );
}
