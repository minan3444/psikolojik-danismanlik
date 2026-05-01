"use client";

import { useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CustomButton from "@/app/shared/customButton";

const MotionBox = motion.create(Box);

const ADIMLAR = [
  { sayi: 5, duygu: "gördüğün", renk: "#7C9E87" },
  { sayi: 4, duygu: "dokunduğun", renk: "#8FA8C8" },
  { sayi: 3, duygu: "duyduğun", renk: "#C4A882" },
  { sayi: 2, duygu: "kokladığın", renk: "#7C9E87" },
  { sayi: 1, duygu: "tattığın", renk: "#8FA8C8" },
];

export default function FarkindalikEgzersizi({ onBitir }) {
  const [adim, setAdim] = useState(0);
  const [cevaplar, setCevaplar] = useState([]);
  const [input, setInput] = useState("");
  const [bitti, setBitti] = useState(false);

  const mevcutAdim = ADIMLAR[adim];

  const devamEt = () => {
    if (!input.trim()) return;
    setCevaplar([...cevaplar, input]);
    setInput("");
    if (adim + 1 >= ADIMLAR.length) {
      setBitti(true);
    } else {
      setAdim(adim + 1);
    }
  };

  const sifirla = () => {
    setAdim(0);
    setCevaplar([]);
    setBitti(false);
  };

  if (bitti) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "var(--font-playfair)",
            mb: 2,
            color: "primary.main",
          }}
        >
          🌿 Harika! Şu ana döndün.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Bu egzersizi düzenli yaparak zihnini şu ana sabitlemeyi
          öğrenebilirsin.
        </Typography>
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
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "var(--font-playfair)", mb: 1 }}
      >
        5 • 4 • 3 • 2 • 1 Tekniği
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
        Duyularını kullanarak şu ana odaklan
      </Typography>

      <LinearProgress
        variant="determinate"
        value={(adim / ADIMLAR.length) * 100}
        sx={{
          mb: 4,
          borderRadius: 2,
          height: 6,
          backgroundColor: "custom.beige",
          "& .MuiLinearProgress-bar": { backgroundColor: mevcutAdim.renk },
        }}
      />

      <AnimatePresence mode="wait">
        <MotionBox
          key={adim}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: mevcutAdim.renk, mb: 0 }}
          >
            {mevcutAdim.sayi}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-playfair)",
              color: "text.primary",
              mb: 0,
            }}
          >
            Şu an {mevcutAdim.duygu} {mevcutAdim.sayi} şeyi yaz
          </Typography>

          <Box
            component="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Buraya yaz..."
            rows={3}
            sx={{
              width: "100%",
              p: 2,
              borderRadius: 2,
              border: "2px solid",
              borderColor: "custom.taupe",
              fontFamily: "inherit",
              fontSize: "1rem",
              resize: "none",
              outline: "none",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "text.primary",
              mb: 3,
              "&:focus": { borderColor: "primary.main" },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={devamEt}
            sx={{ borderRadius: "50px", px: 4, py: 1.5, fontWeight: 600 }}
          >
            {adim + 1 >= ADIMLAR.length ? "Tamamla" : "Devam Et →"}
          </Button>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
}
