"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionBaslik from "@/components/ui/SectionBaslik";
import sss from "@/data/sss";
import theme from "@/theme/theme";
const { sectionPadding } = theme; // Tema'dan sectionPadding'i çekiyoruz

const MotionBox = motion.create(Box);

const scrollAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function SSSSection() {
  const [acik, setAcik] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setAcik(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        py: { xs: sectionPadding.xs, md: sectionPadding.md },
        position: "relative",
        overflow: "hidden",
        bgcolor: "custom.beige",
      }}
    >
      {/* Dekoratif arka plan */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.3) 100%)",

          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionBaslik
            altBaslik="MERAK EDİLENLER"
            baslik="Aklındaki Soruların Cevapları"
          />
        </MotionBox>

        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          {sss.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={acik === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                borderRadius: "12px !important",
                bgcolor: "background.paper",
                boxShadow: 1,
                border: "1px solid",
                borderColor:
                  acik === `panel${index}` ? "primary.light" : "custom.taupe",
                // Açık accordion'da border rengi değişir
                transition: "all 0.3s ease",
                "&:before": { display: "none" }, // MUI default divider'ı kaldır
                "&:hover": {
                  boxShadow: 2,
                  borderColor: "primary.light",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color:
                        acik === `panel${index}`
                          ? "primary.main"
                          : "text.secondary",
                      transition: "color 0.3s ease",
                    }}
                  />
                }
                sx={{
                  py: 1,
                  "& .MuiAccordionSummary-content": { my: 1.5 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 600,
                    color:
                      acik === `panel${index}`
                        ? "primary.main"
                        : "text.primary",
                    fontSize: "1rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.soru}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.9 }}
                >
                  {item.cevap}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </MotionBox>
      </Container>
    </Box>
  );
}
