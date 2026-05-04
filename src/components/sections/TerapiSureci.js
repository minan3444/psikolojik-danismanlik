"use client";

import { Box, Container, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import terapiSureci from "@/data/terapi-sureci";

export default function TerapiSureci() {
  return (
    <Box sx={{ py: 6, position: "relative" }}>
      <Container maxWidth="lg">
        <SectionBaslik altBaslik="NASIL ÇALIŞIYORUM ?" baslik="Terapi Süreci" />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 0 },
            position: "relative",
            mt: 4,
          }}
        >
          {terapiSureci.map((adim, index) => {
            const Ikon = Icons[adim.ikon];
            const isLast = index === terapiSureci.length - 1;

            return (
              <Box
                key={adim.id}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  px: { md: 2 },
                }}
              >
                {/* Yatay Bağlantı Çizgisi (Sadece Masaüstü) */}
                {!isLast && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      position: "absolute",
                      top: 40,
                      left: "50%",
                      width: "100%",
                      height: "2px",
                      bgcolor: "primary.light",
                      opacity: 0.3,
                      zIndex: 0,
                    }}
                  />
                )}

                {/* İkon ve Numara Grubu */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    minWidth: 80,
                    minHeight: 80,
                    flexShrink: 0,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {Ikon && <Ikon sx={{ fontSize: 32 }} />}

                  {/* Adım Numarası (Sağ Üst Köşe) */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "white",
                      border: "2px solid",
                      borderColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "translate(25%, -25%)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        fontSize: 10,
                      }}
                    >
                      {adim.id}
                    </Typography>
                  </Box>
                </Box>

                {/* İçerik Kartı */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "custom.taupe",
                    bgcolor: "background.paper",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    {adim.altBaslik}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    {adim.baslik}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {adim.aciklama}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
