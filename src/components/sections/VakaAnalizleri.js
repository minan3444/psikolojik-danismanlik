"use client";

import { useState } from "react";
import { Box, Container, Grid, Button, Chip, Typography } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import Link from "next/link";
// Statik veri importu kaldırıldı, artık sadece Sanity'den gelen prop kullanılıyor.
import VakaKarti from "@/components/ui/VakaKarti";
import theme from "@/theme/theme";
import CustomButton from "@/app/shared/customButton";
const { sectionPadding } = theme; // Tema'dan sectionPadding'i çekiyoruz

// initialData prop'unu kullanıyoruz (Sanity verisi buraya akar)
export default function VakaAnalizleri({
  isFullPage = false,
  initialData = [],
}) {
  // Sadece kategori filtresi için state bırakıyoruz
  const [aktifKategori, setAktifKategori] = useState("Tümü");

  // KRİTİK MANTIK: Artık sadece Sanity'den gelen (initialData) veriyi kullanıyoruz.
  const dataSource = initialData || [];

  // Kategorileri güncel veriden al
  const kategoriler = ["Tümü", ...new Set(dataSource.map((v) => v.kategori))];

  // Filtreleme mantığı
  const filtreliVakalar =
    aktifKategori === "Tümü"
      ? dataSource
      : dataSource.filter((v) => v.kategori === aktifKategori);

  // Anasayfada ilk 3, tam sayfada hepsi
  const goruntulenecekVakalar = isFullPage
    ? filtreliVakalar
    : filtreliVakalar.slice(0, 3);

  return (
    <Box
      sx={{
        //pt: { xs: 4, md: 6 }, // Üstten boşluğu azalttık (10'dan 4'e, 14'ten 6'ya)
        //pb: { xs: 8, md: 10 }, // Alttan boşluk kalsın ki içerik sıkışmasın
        py: { xs: sectionPadding.xs, md: sectionPadding.md },
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      {/* Arka plan görsel katmanı */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.3) 100%)",
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionBaslik
          altBaslik="Vaka Analizleri"
          baslik={
            isFullPage
              ? "Gerçek Hikayeler, Gerçek Dönüşümler"
              : "Vaka Analizleri"
          }
        />

        {/* Kategoriler: Sadece tam sayfa modunda göster */}
        {isFullPage && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
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
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  bgcolor: aktifKategori === k ? "primary.main" : "white",
                  color: aktifKategori === k ? "white" : "text.secondary",
                  border: "1px solid",
                  borderColor:
                    aktifKategori === k ? "primary.main" : "custom.taupe",
                  "&:hover": {
                    bgcolor:
                      aktifKategori === k ? "primary.dark" : "custom.beige",
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Vaka Kartları Grid'i */}
        <Grid container spacing={4}>
          {goruntulenecekVakalar.map((vaka) => (
            <Grid key={vaka._id || vaka.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <VakaKarti vaka={vaka} />
            </Grid>
          ))}
        </Grid>

        {/* Veri yoksa kullanıcıya bilgi mesajı */}
        {dataSource.length === 0 && (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
          >
            Henüz vaka analizi eklenmemiş.
          </Typography>
        )}

        {/* Buton: Sadece anasayfada göster */}
        {!isFullPage && dataSource.length >= 3 && (
          <Box sx={{ mt: 8, textAlign: "center" }}>
            <CustomButton href="/vaka-analizleri">
              Tüm Vaka Analizlerini Gör →
            </CustomButton>
          </Box>
        )}

        {/* Anonimlik Notu */}
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
