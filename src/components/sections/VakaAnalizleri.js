"use client";

import { useState } from "react";
import { Box, Container, Grid, Button, Chip, Typography } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import VakaKarti from "@/components/ui/VakaKarti";
import CustomButton from "@/app/shared/customButton";
import EastIcon from "@mui/icons-material/East";

export default function VakaAnalizleri({
  isFullPage = false,
  initialData = [],
}) {
  const [aktifKategori, setAktifKategori] = useState("Tümü");
  const dataSource = initialData || [];

  const kategoriler = ["Tümü", ...new Set(dataSource.map((v) => v.kategori))];

  const filtreliVakalar =
    aktifKategori === "Tümü"
      ? dataSource
      : dataSource.filter((v) => v.kategori === aktifKategori);

  const goruntulenecekVakalar = isFullPage
    ? filtreliVakalar
    : filtreliVakalar.slice(0, 3);

  return (
    <Box
      sx={{
        py: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik={isFullPage ? null : "VAKA ANALİZLERİ"}
          baslik={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Yatayda ortalar
                gap: { xs: 1, md: 2 }, // Mobilde dar, masaüstünde geniş boşluk
                width: "100%", // Tüm genişliği kapla ki merkezleyebilsin
                flexWrap: "wrap", // Mobilde sığmazsa aşağı kaysın (bozulmasın)
              }}
            >
              <span>Vaka</span>
              <EastIcon sx={{ color: "#9e7c93", fontSize: "1.2em" }} />
              <span>Süreç</span>
              <EastIcon sx={{ color: "#9e7c93", fontSize: "1.2em" }} />
              <span>Kazanım</span>
            </Box>
          }
        />
        {isFullPage && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 6,
              justifyContent: "center",
            }}
          >
            {kategoriler.map((k) => (
              <Chip
                key={k}
                label={k}
                onClick={() => setAktifKategori(k)}
                sx={{
                  fontWeight: 600,
                  bgcolor: aktifKategori === k ? "primary.main" : "white",
                  color: aktifKategori === k ? "white" : "text.secondary",
                  border: "1px solid",
                  borderColor:
                    aktifKategori === k ? "primary.main" : "custom.taupe",
                }}
              />
            ))}
          </Box>
        )}

        <Grid container spacing={4}>
          {goruntulenecekVakalar.map((vaka) => (
            <Grid key={vaka._id || vaka.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <VakaKarti vaka={vaka} />
            </Grid>
          ))}
        </Grid>
        {!isFullPage && dataSource.length >= 3 && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <CustomButton href="/vaka-analizleri">
              Tüm Vaka Analizlerini Gör ➜
            </CustomButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}
