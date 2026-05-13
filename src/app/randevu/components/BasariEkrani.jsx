"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

/**
 * BasariEkrani — Randevu talebi iletildikten sonra gösterilen ekran.
 * secimler: { tarih, saat, hizmet }
 */
export default function BasariEkrani({ secimler }) {
  const { tarih, saat, hizmet } = secimler;

  const whatsappMesaj = encodeURIComponent(
    `Merhaba Şeyma Hanım, ${tarih?.toLocaleDateString("tr-TR")} tarihinde saat ${saat} için bir ${hizmet?.baslik} randevusu oluşturdum. Onayınızı bekliyorum.`,
  );

  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h4" sx={{ color: "primary.main", mb: 2 }}>
        Talebiniz Alındı 🌿
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {tarih?.toLocaleDateString("tr-TR")} tarihinde saat {saat} için
        <b> {hizmet?.baslik}</b> talebiniz iletildi. Bilgiler e-posta adresinize
        gönderilmiştir.
      </Typography>

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
    </Box>
  );
}
