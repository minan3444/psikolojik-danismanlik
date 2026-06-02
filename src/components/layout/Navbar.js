"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  useScrollTrigger,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Framer Motion eklendi
import CustomButton from "@/app/shared/customButton";

// MUI AppBar'ı motion ile sarmalıyoruz
const MotionAppBar = motion.create(AppBar);

const navLinks = [
  // { label: 'Terapiler', href: '/terapiler' },
  { label: "Psikolojik Testler", href: "/testler" },
  { label: "Vaka Analizleri", href: "/vaka-analizleri" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <>
      <MotionAppBar
        position="fixed"
        elevation={trigger ? 2 : 0} //anlamı: scroll yapıldığında gölge ekle, yapılmadığında gölge yok
        // ANIMASYON AYARLARI
        initial={{ y: -100, opacity: 0 }} // Başlangıçta 100px yukarıda ve görünmez
        animate={{ y: 0, opacity: 1 }} // Sayfa açılınca yerine oturur ve görünür olur
        transition={{ duration: 0.8, ease: "easeOut" }} // 0.8 saniyede yumuşak geçiş
        sx={{
          backgroundColor: "background.paper",
          backdropFilter: trigger ? "blur(10px)" : "none",
          transition:
            "background-color 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease",
          borderBottom: trigger ? "1px solid" : "none",
          borderColor: "custom.taupe", //anlamı: scroll yapıldığında altına ince bir çizgi ekle, yapılmadığında çizgi yok
          zIndex: 1100, //anlamı: diğer içeriklerin üstünde kalması için yüksek bir z-index değeri veriyoruz
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              py: 0, // Padding'i tamamen sıfırladık.anlamı: toolbar'ın yüksekliğini azaltarak daha ince bir görünüm sağlıyoruz
              minHeight: { xs: "60px", md: "65px" }, // Kurumsal ve ince yükseklik
            }}
          >
            {/* Sol taraf → Logo ve İsim Grubu */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, md: 2 },
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 40, md: 55 },
                  height: { xs: 40, md: 55 },
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/logo.JPG"
                  alt="Şeyma İnan Logo"
                  fill
                  priority
                  // Add the sizes prop here:
                  sizes="(max-width: 768px) 150px, 250px"
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box sx={{ display: "block" }}>
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  Şeyma İnan
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9e7c93",
                    letterSpacing: { xs: "0.02em", md: "0.05em" },
                    fontWeight: 700,
                    fontSize: { xs: "0.55rem", md: "0.65rem" },
                    display: "block",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Güvenli • Ve • Yargısız • Bir Alan
                </Typography>
              </Box>
            </Box>

            {/* Masaüstü menü */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 2, // ← Bu satırı ekle → butonlar arası mesafe dengeli olur
                    fontSize: "0.95rem",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              <CustomButton
                href="/randevu"
                onClick={() => setDrawerOpen(false)}
              >
                Online Randevu Al
              </CustomButton>
            </Box>

            {/* Mobil menü ikonu */}
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: "text.primary",
              }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </MotionAppBar>

      {/* Mobil Drawer ( Drawer animasyonu zaten MUI tarafından otomatik yapılıyor ) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        // PaperProps yerine slotProps kullanıyoruz
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "background.paper",
              p: 3,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Menü
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List disablePadding>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding sx={{ mb: 1 }}>
              <Button
                component={Link}
                href={link.href}
                fullWidth
                onClick={() => setDrawerOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  color: "text.primary",
                  py: 1.5,
                  px: 2,
                  borderRadius: 3,
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "background.paper",
                    color: "primary.main",
                  },
                }}
              >
                {link.label}
              </Button>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 3 }}>
            <CustomButton href="/randevu" onClick={() => setDrawerOpen(false)}>
              Online Randevu Al
            </CustomButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
