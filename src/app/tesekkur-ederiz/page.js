"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import Link from "next/link";

// GA4 event'ini tetikleyen ve URL parametrelerinden randevu bilgilerini okuyan bileşen
function TesekkurIcerik() {
  const searchParams = useSearchParams();
  const hizmet = searchParams.get("hizmet") || "";
  const tarih = searchParams.get("tarih") || "";
  const saat = searchParams.get("saat") || "";

  useEffect(() => {
    // GA4 conversion event — Google Ads bu sayfayı "dönüşüm" olarak sayar
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXX", // ← Google Ads Conversion ID'nizi buraya yazın
        event_category: "randevu",
        event_label: hizmet,
      });
    }
  }, [hizmet]);

  const whatsappMesaj = encodeURIComponent(
    `Merhaba Şeyma Hanım, ${tarih} tarihinde saat ${saat} için bir ${hizmet} randevusu oluşturdum. Onayınızı bekliyorum.`
  );

  return (
    <Box sx={{ pt: { xs: 10, md: 14 }, pb: 10, minHeight: "80vh" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {/* Başlık */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              Talebiniz Alındı
            </Typography>
            <SpaOutlinedIcon sx={{ color: "primary.main", fontSize: 32 }} />
          </Box>

          {/* Randevu özeti */}
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            {tarih && saat ? (
              <>
                <b>{tarih}</b> tarihinde saat <b>{saat}</b> için{" "}
                <b>{hizmet}</b> talebiniz iletildi.{" "}
              </>
            ) : (
              "Randevu talebiniz başarıyla iletildi. "
            )}
            Bilgiler e-posta adresinize gönderilmiştir.
          </Typography>

          {/* Butonlar */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/905312574578?text=${whatsappMesaj}`}
              target="_blank"
              sx={{
                borderRadius: "50px",
                bgcolor: "#25D366",
                px: 3,
                py: 1.2,
                fontWeight: 700,
              }}
            >
              WhatsApp Onayı Gönder
            </Button>

            <Button
              component={Link}
              href="/"
              variant="outlined"
              sx={{ borderRadius: "50px", px: 3 }}
            >
              Anasayfaya Dön
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// Sayfa metadata
export default function TesekkurSayfasi() {
  return (
    <Suspense fallback={<Box sx={{ minHeight: "80vh" }} />}>
      <TesekkurIcerik />
    </Suspense>
  );
}
