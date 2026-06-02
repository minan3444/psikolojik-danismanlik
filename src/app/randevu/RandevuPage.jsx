"use client";

import { useState } from "react";
import { Box, Container, Paper, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import { useLegalDocs } from "./hooks/useLegalDocs";
import RandevuStepper from "./components/RandevuStepper";
import RandevuAdimIcerigi from "./components/RandevuAdimIcerigi";
import CustomButton from "../shared/customButton";

const BOSLUK_ANIMASYONU = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.4 },
};

const BOSLUK_BASLANGIC = {
  hizmet: null,
  tarih: null,
  saat: "",
  kullanici: {},
};

export default function RandevuPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [secimler, setSecimler] = useState(BOSLUK_BASLANGIC);

  const legalDocs = useLegalDocs();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const updateSecim = (key, value) =>
    setSecimler((prev) => ({ ...prev, [key]: value }));

  return (
    <Box
      sx={{
        pt: { xs: 7, md: 10 },
        pb: 10,
      }}
    >
      <Container maxWidth="sm">
        {/* Geri butonu */}
        <Box sx={{ mb: 1, textAlign: "center" }}>
          <CustomButton
            variant="outlined"
            href="/"
            sx={{ border: "none", color: "text.secondary" }}
          >
            🡨 Anasayfaya Dön
          </CustomButton>
        </Box>

        {/* Adım göstergesi */}
        <RandevuStepper activeStep={activeStep} />

        {/* Adım içeriği */}
        <Paper
          elevation={0}
          sx={{
            p: 1,
            borderRadius: 3,
            backgroundColor: "white",
            backdropFilter: "blur(10px)",
            minHeight: "400px",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} {...BOSLUK_ANIMASYONU}>
              <RandevuAdimIcerigi
                activeStep={activeStep}
                secimler={secimler}
                legalDocs={legalDocs}
                updateSecim={updateSecim}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            </motion.div>
          </AnimatePresence>
        </Paper>
      </Container>
    </Box>
  );
}
