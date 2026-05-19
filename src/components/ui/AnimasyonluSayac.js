"use client";

// Vizyon Misyon section'ında kullanılan animasyonlu sayaç
// 0'dan hedef sayıya kadar sayar

import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";

export default function AnimasyonluSayac({ hedef, sure = 2000 }) {
  const [sayi, setSayi] = useState(0);
  const [basladı, setBasladi] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Kullanıcı o bölüme scroll edince animasyon başlar
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !basladı) {
          setBasladi(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [basladı]);

  useEffect(() => {
    if (!basladı) return;

    // Sadece sayısal kısmı al → "50+" → 50
    const sayisalHedef = parseInt(hedef);
    const adim = sayisalHedef / (sure / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += adim;
      if (current >= sayisalHedef) {
        setSayi(sayisalHedef);
        clearInterval(timer);
      } else {
        setSayi(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [basladı, hedef, sure]);

  // "+" veya diğer karakterleri koru → "50+" → "50" + "+"
  const suffix = hedef.replace(/[0-9]/g, "");

  return (
    <Typography
      ref={ref}
      variant="h3"
      sx={{
        color: "primary.main",
        fontSize: { xs: "2rem", md: "2.5rem" },
      }}
    >
      {sayi}
      {suffix}
    </Typography>
  );
}
