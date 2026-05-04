"use client";

import { useState } from "react";
import { Box, Container, Grid, Button, Chip, Typography } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import VakaKarti from "@/components/ui/VakaKarti";
import CustomButton from "@/app/shared/customButton";

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
          altBaslik="VAKA ANALİZLERİ"
          baslik={
            isFullPage
              ? "Gerçek Hikayeler, Gerçek Dönüşümler"
              : "Vaka Analizleri"
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

        <Grid container spacing={3}>
          {goruntulenecekVakalar.map((vaka) => (
            <Grid key={vaka._id || vaka.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <VakaKarti vaka={vaka} />
            </Grid>
          ))}
        </Grid>
        {!isFullPage && dataSource.length >= 3 && (
          <Box sx={{ mt: 8, textAlign: "center" }}>
            <CustomButton href="/vaka-analizleri">
              Tüm Vaka Analizlerini Gör →
            </CustomButton>
          </Box>
        )}
        <Box
          sx={{
            mt: 8,
            p: 3,
            borderRadius: 3,
            bgcolor: "custom.beige",
            border: "1px solid",
            borderColor: "custom.taupe",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            🔒 Tüm vaka analizleri danışan gizliliği korunarak anonim olarak
            paylaşılmaktadır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
