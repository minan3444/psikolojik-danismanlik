//ana component (temizlenmiş)

"use client";

import { useState } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SectionBaslik from "@/components/ui/SectionBaslik";
import { egzersizler } from "@/data/kendine-bir-mola";
import NefesEgzersizi from "./components/NefesEgzersizi";
import FarkindalikEgzersizi from "./components/FarkindalikEgzersizi";
import DusunceBirakma from "./components/DusunceBirakma";
import AnimatedFrame from "@/app/shared/AnimatedFrame";
import CustomButton from "@/app/shared/customButton";

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
    <AnimatedFrame
      onClick={() => onSec(egzersiz.id)}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          backgroundColor: `${egzersiz.renk}20`,
          mx: "auto",
          mb: 3,
        }}
      >
        <Ikon sx={{ fontSize: 75, color: egzersiz.renk }} />
      </Box>

      <Typography variant="h4" sx={{ mb: 1 }}>
        {egzersiz.baslik}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: egzersiz.renk, fontWeight: 500, display: "block", mb: 2 }}
      >
        {egzersiz.altBaslik}
      </Typography>
      <Typography variant="body2">{egzersiz.aciklama}</Typography>
    </AnimatedFrame>
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
        py: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <AnimatedFrame>
          <SectionBaslik
            altBaslik="KENDİNE BİR MOLA"
            baslik='"Sadece birkaç dakika durup nefes almaya ne dersin?"'
          />
        </AnimatedFrame>
        <AnimatePresence mode="wait">
          {!seciliEgzersiz ? (
            // Egzersiz seçim ekranı
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
          ) : (
            // Aktif egzersiz ekranı
            <Box
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid",
                borderColor: "custom.taupe",
              }}
            >
              <CustomButton
                onClick={() => setSeciliEgzersiz(null)}
                variant="outlined"
                sx={{ mb: 4, border: "none" }}
              >
                🡨 Geri Dön
              </CustomButton>

              {AktifBileseni && (
                <AktifBileseni onBitir={() => setSeciliEgzersiz(null)} />
              )}
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
