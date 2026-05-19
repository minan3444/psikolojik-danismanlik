"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import sosyalMedya from "@/data/sosyal-medya";

// Footer linkleri
const footerLinks = [
  //{ label: 'Terapiler', href: '/terapiler' },
  { label: "Psikolojik Testler", href: "/testler" },
  { label: "Vaka Analizleri", href: "/vaka-analizleri" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

// Yasal Belgeler
const legalLinks = [
  { label: "Aydınlatma Metni", href: "/yasal/aydinlatma-metni" },
  { label: "Kullanım Sözleşmesi", href: "/yasal/kullanim-ve-satis-sozlesmesi" },
  { label: "Onam Formu", href: "/yasal/danisan-onam-formu" },
  { label: "Çerez Politikası", href: "/yasal/cerez-politikasi" },
];

const ikonlar = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "custom.taupe",
        pt: 8,
        pb: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sol taraf → İsim ve slogan */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
              }}
            >
              Şeyma İnan
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#9e7c93",
                letterSpacing: "0.1em",
                display: "block",
                fontWeight: 700,
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              Güvenli • Ve • Yargısız • Bir Alan
            </Typography>
          </Grid>

          {/* Orta → Hızlı linkler */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Hızlı Bağlantılar
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Sağ taraf → Sosyal medya */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Sosyal Medyada Takip Edin
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {sosyalMedya.map((item) => {
                const Ikon = ikonlar[item.ikon];
                return (
                  <IconButton
                    key={item.id}
                    component="a"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: item.renk,
                      transition: "all 0.3s ease",
                      backgroundColor: "rgba(0,0,0,0.02)",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        backgroundColor: "rgba(0,0,0,0.05)",
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Ikon />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: "custom.taupe", opacity: 0.6 }} />

        {/* Alt kısım → Telif ve Dinamik Yasal Linkler */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            © {new Date().getFullYear()} Şeyma İnan. Tüm hakları saklıdır.
          </Typography>

          {/* Hata Düzelten Bölüm: flexWrap sx içine alındı */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {legalLinks.map((legal) => (
              <MuiLink
                key={legal.href}
                component={Link}
                href={legal.href}
                underline="none"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                }}
              >
                {legal.label}
              </MuiLink>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
