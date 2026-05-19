//ana component (temizlenmiş)

"use client";

import { useState } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SectionBaslik from "@/components/ui/SectionBaslik";
import { egzersizler } from "@/data/kendine-bir-mola";
import { scrollAnimation } from "./animations";
import NefesEgzersizi from "./components/NefesEgzersizi";
import FarkindalikEgzersizi from "./components/FarkindalikEgzersizi";
import DusunceBirakma from "./components/DusunceBirakma";

const MotionBox = motion.create(Box);

// Egzersiz id → bileşen eşlemesi
const EGZERSIZ_BILESENLERI = {
  nefes: NefesEgzersizi,
  farkindalik: FarkindalikEgzersizi,
  dusunce: DusunceBirakma,
};

// ─── Egzersiz seçim kartı ────────────────────────────────────────────────────

function EgzersizKarti({ egzersiz, index, onSec }) {
  const Ikon = egzersiz.ikon;

  return (
    <MotionBox
      variants={scrollAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.15}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={() => onSec(egzersiz.id)}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
        border: "2px solid",
        borderColor: "custom.taupe",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: egzersiz.renk,
          boxShadow: `0px 20px 50px ${egzersiz.renk}30`,
        },
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: `${egzersiz.renk}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <Ikon sx={{ fontSize: 36, color: egzersiz.renk }} />
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>
        {egzersiz.baslik}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: egzersiz.renk, fontWeight: 600, display: "block", mb: 2 }}
      >
        {egzersiz.altBaslik}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {egzersiz.aciklama}
      </Typography>
    </MotionBox>
  );
}

// ─── Ana sayfa ───────────────────────────────────────────────────────────────

export default function KendineBirMola() {
  const [seciliEgzersiz, setSeciliEgzersiz] = useState(null);

  const AktifBileseni = seciliEgzersiz
    ? EGZERSIZ_BILESENLERI[seciliEgzersiz]
    : null;

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Arka plan */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.3) 100%)",
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionBaslik
            altBaslik="Kendine Bir Mola"
            baslik='"Sadece birkaç dakika durup nefes almaya ne dersin?"'
          />
        </MotionBox>

        <AnimatePresence mode="wait">
          {!seciliEgzersiz ? (
            // Egzersiz seçim ekranı
            <MotionBox
              key="secim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Grid container spacing={4}>
                {egzersizler.map((egzersiz, index) => (
                  <Grid key={egzersiz.id} size={{ xs: 12, md: 4 }}>
                    <EgzersizKarti
                      egzersiz={egzersiz}
                      index={index}
                      onSec={setSeciliEgzersiz}
                    />
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          ) : (
            // Aktif egzersiz ekranı
            <MotionBox
              key="egzersiz"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: "0px 4px 24px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "custom.taupe",
              }}
            >
              <Button
                onClick={() => setSeciliEgzersiz(null)}
                sx={{ mb: 4, color: "text.secondary", fontWeight: 500 }}
              >
                ← Geri Dön
              </Button>

              {AktifBileseni && (
                <AktifBileseni onBitir={() => setSeciliEgzersiz(null)} />
              )}
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
