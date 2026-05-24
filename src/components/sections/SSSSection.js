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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionBaslik from "@/components/ui/SectionBaslik";
import sss from "@/data/sss";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sss.map((item) => ({
    "@type": "Question",
    name: item.soru,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.cevap,
    },
  })),
};

export default function SSSSection() {
  const [acik, setAcik] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setAcik(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 3, position: "relative", overflow: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik="MERAK EDİLENLER"
          baslik="Aklındaki Soruların Cevapları"
        />

        {sss.map((item, index) => {
          const panelId = `panel${index}`;
          const isExpanded = acik === panelId;

          return (
            <Accordion
              key={item.id}
              expanded={isExpanded}
              onChange={handleChange(panelId)}
              slotProps={{ transition: { unmountOnExit: true } }}
              sx={{
                mb: 2,
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: isExpanded ? "primary.main" : "text.secondary",
                    }}
                  />
                }
              >
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{ color: isExpanded ? "primary.main" : "text.primary" }}
                >
                  {item.soru}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pb: 2 }}>
                <Typography variant="body2">{item.cevap}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </Box>
  );
}
