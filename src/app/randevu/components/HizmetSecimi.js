"use client";

import { Box, Typography, Stack, Paper } from "@mui/material";
import { hizmetler } from "@/data/randevu-ayarlari";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SelfImprovementOutlinedIcon from "@mui/icons-material/SelfImprovementOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

const ikonlar = {
  "on-gorusme": ChatOutlinedIcon,
  "bireysel-terapi": SelfImprovementOutlinedIcon,
};

export default function HizmetSecimi({ onSelect }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      {/* Başlık */}
      <Typography
        variant="h5"
        sx={{
          fontFamily: "var(--font-playfair)",
          fontWeight: 700,
          mb: 0.5,
          color: "text.primary",
        }}
      >
        Lütfen Randevu Türünü Seçiniz
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2.5, maxWidth: "500px", mx: "auto" }}
      >
        İhtiyacınıza en uygun görüşme türünü seçerek takvimi görüntüleyebilirsiniz.
      </Typography>

      {/* Hizmet kartları */}
      <Stack spacing={2}>
        {hizmetler.map((hizmet) => {
          const Ikon = ikonlar[hizmet.id];
          return (
            <Paper
              key={hizmet.id}
              elevation={0}
              onClick={() => onSelect(hizmet)}
              sx={{
                p: { xs: 2, md: 2.5 },
                borderRadius: 4,
                border: "2px solid",
                borderColor: "custom.taupe",
                backgroundColor: "background.paper",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: "0 8px 20px rgba(124,158,135,0.12)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              {/* İkon */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  backgroundColor: "custom.beige",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                  flexShrink: 0,
                }}
              >
                {Ikon && <Ikon sx={{ fontSize: 26 }} />}
              </Box>

              {/* İçerik */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, mb: 0.25, color: "text.primary" }}
                >
                  {hizmet.baslik}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, lineHeight: 1.5, fontSize: "0.8rem" }}
                >
                  {hizmet.aciklama}
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 14, color: "primary.main" }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {hizmet.sure} Dakika
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PaymentsOutlinedIcon sx={{ fontSize: 14, color: "primary.main" }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {hizmet.ucret}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Seç butonu */}
              <Box
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "50px",
                  px: 2.5,
                  py: 0.8,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  flexShrink: 0,
                  transition: "0.2s",
                }}
              >
                Seç →
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}