"use client";

import { Box, Typography, Stack, Paper } from "@mui/material";
import { hizmetler } from "@/data/randevu-ayarlari";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SelfImprovementOutlinedIcon from "@mui/icons-material/SelfImprovementOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CustomButton from "@/app/shared/customButton";

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
          mb: 2,
        }}
      >
        Lütfen Randevu Türünü Seçiniz 🌿
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
                p: 3,
                borderRadius: 3,
                backgroundColor: "background.paper",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
              }}
            >
              {/* İkon */}
              <Box
                sx={{
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                  flexShrink: 0,
                  py: 1,
                  px: 2,
                }}
              >
                {Ikon && <Ikon sx={{ fontSize: 20 }} />}
              </Box>

              {/* İçerik */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {hizmet.baslik}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {hizmet.aciklama}
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTimeIcon
                      sx={{ fontSize: 14, color: "primary.main" }}
                    />
                    <Typography variant="caption">
                      {hizmet.sure} Dakika
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PaymentsOutlinedIcon
                      sx={{ fontSize: 14, color: "primary.main" }}
                    />
                    <Typography variant="caption">{hizmet.ucret}</Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Seç butonu */}

              <CustomButton
                sx={{
                  color: "white",
                  p: 1,
                  display: { xs: "none", sm: "inline-flex" },
                }}
              >
                Seç →
              </CustomButton>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
