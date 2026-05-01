"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CustomButton from "@/app/shared/customButton";

const MotionBox = motion.create(Box);

export default function DusunceBirakma({ onBitir }) {
  const [dusunce, setDusunce] = useState("");
  const [birakildi, setBirakildi] = useState(false);

  const birak = () => {
    if (!dusunce.trim()) return;
    setBirakildi(true);
  };

  const sifirla = () => {
    setDusunce("");
    setBirakildi(false);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "var(--font-playfair)", mb: 1 }}
      >
        Düşünce Bırakma
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Seni zorlayan düşünceyi yaz ve bırak gitsin
      </Typography>

      <AnimatePresence mode="wait">
        {!birakildi ? (
          <MotionBox
            key="yaz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Box
              component="textarea"
              value={dusunce}
              onChange={(e) => setDusunce(e.target.value)}
              placeholder="Aklını zorlayan düşünceyi buraya yaz..."
              rows={4}
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
              onClick={birak}
              sx={{ borderRadius: "50px", px: 4, py: 1.5, fontWeight: 600 }}
            >
              Bırak Gitsin 🍃
            </Button>
          </MotionBox>
        ) : (
          <MotionBox
            key="bitti"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MotionBox
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              sx={{ mb: 4 }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                {dusunce}
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "var(--font-playfair)",
                  color: "primary.main",
                  mb: 2,
                }}
              >
                🌿 Bu düşünce artık geride kaldı.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Her düşünce geçicidir. Sen bu andasın.
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
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
