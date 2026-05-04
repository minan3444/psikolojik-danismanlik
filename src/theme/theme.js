import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7C9E87", // Ana renk → Soft Sage Green (butonlar, linkler, vurgular)
      light: "#A8C5B0", // Açık tonu → hover efektleri
      dark: "#5A7A63", // Koyu tonu → active/pressed durumlar
    },
    secondary: {
      main: "#8FA8C8", // İkincil renk → Soft Dusty Blue (ikincil butonlar, ikonlar)
      light: "#B8CCE0", // Açık tonu
      dark: "#6B8AAD", // Koyu tonu
    },
    background: {
      default: "#FAF8F5", // Sayfa arka planı → Warm White (göz yormayan krem beyaz)
      paper: "#F5F0EA", // Kart arka planı → biraz daha koyu krem
    },
    background1: {
      default: "#9e7c93", // Sayfa arka planı → Warm White (göz yormayan krem beyaz)
      paper: "#F5F0EA", // Kart arka planı → biraz daha koyu krem
    },
    text: {
      primary: "#3D3530", // Ana yazı rengi → Koyu kahve (siyah yerine daha sıcak)
      secondary: "#7A6E68", // İkincil yazı → açıklamalar, alt başlıklar
    },
    custom: {
      taupe: "#C4B5A5", // Dekoratif elementler → çizgiler, ayraçlar
      beige: "#EDE8E0", // Section arka planları → alternating sections
    },
  },
  typography: {
    fontFamily: '"Inter", "Lato", sans-serif', // Tüm site varsayılan yazı tipi
    h1: {
      fontFamily: '"Playfair Display", serif', // Ana başlıklar → şık ve sıcak
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif', // Section başlıkları
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif', // Alt başlıklar
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif', // Kart başlıkları
      fontWeight: 500,
    },

    body1: {
      fontFamily: '"Inter", sans-serif', // Ana paragraf yazısı
      lineHeight: 1.8, // Satır aralığı → okunabilirlik için geniş
    },
    body2: {
      fontFamily: '"Inter", sans-serif', // İkincil paragraf yazısı
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12, // Tüm componentlerin köşe yuvarlaklığı → butonlar, kartlar
  },
  shadows: [
    "none",
    "0px 2px 8px rgba(124, 158, 135, 0.08)", // Hafif gölge → kartlar
    "0px 4px 16px rgba(124, 158, 135, 0.12)", // Orta gölge → hover efekti
    "0px 8px 24px rgba(124, 158, 135, 0.16)", // Belirgin gölge → modal, drawer
    ...Array(21).fill("none"),
  ],
  sectionPadding: {
    xs: 5,
    md: 10, // Örneğin mobilde 6, masaüstünde 10 olsun istersen
  },
});

export default theme;
