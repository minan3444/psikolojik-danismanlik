"use client";

import { useState, useCallback, memo } from "react";
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

// 1. ADIM: Her bir Accordion'u ayrı bir bileşen yap ve memo ile sarmala
const SSSItem = memo(({ item, index, acikPanel, onChange }) => {
  const panelId = `panel${index}`;
  const isExpanded = acikPanel === panelId;

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onChange(panelId)}
      // 3. ADIM: Kapalıyken içeriği DOM'dan silerek bellek tasarrufu sağlar
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{
        mb: 2,
        borderRadius: "12px !important",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: isExpanded ? "primary.light" : "custom.taupe",
        boxShadow: "none",
        "&:before": { display: "none" }, // MUI varsayılan çizgiyi kaldırır
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: isExpanded ? "primary.main" : "text.secondary" }}
          />
        }
      >
        <Typography
          variant="subtitle1" // h7 yerine standart subtitle kullanmak daha güvenlidir
          sx={{
            color: isExpanded ? "primary.main" : "text.primary",
            fontWeight: isExpanded ? 400 : 600,
          }}
        >
          {item.soru}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pb: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          {item.cevap}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
});

// Memo bileşenine isim veriyoruz (Geliştirici araçları için)
SSSItem.displayName = "SSSItem";

export default function SSSSection() {
  const [acik, setAcik] = useState(false);

  // 2. ADIM: Fonksiyonu belleğe sabitle
  const handleChange = useCallback(
    (panel) => (event, isExpanded) => {
      setAcik(isExpanded ? panel : false);
    },
    [],
  );

  return (
    <Box sx={{ py: 3, position: "relative" }}>
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik="MERAK EDİLENLER"
          baslik="Aklındaki Soruların Cevapları"
        />

        {sss.map((item, index) => (
          <SSSItem
            key={item.id}
            item={item}
            index={index}
            acikPanel={acik}
            onChange={handleChange}
          />
        ))}
      </Container>
    </Box>
  );
}
