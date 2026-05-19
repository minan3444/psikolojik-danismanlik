import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7C9E87", // Soft Sage Green
      light: "#A8C5B0",
      dark: "#5A7A63",
    },
    secondary: {
      main: "#8FA8C8", // Soft Dusty Blue
      light: "#B8CCE0",
      dark: "#6B8AAD",
    },
    background: {
      default: "#FAF8F5", //#214821 #FAF8F5 //Arka plan rengidir. eğer burayı değitirdiğinde arka plan rengi değişmiyorsa ilgili sectionda başka bir renkle rengi eziyor olabiliriz.
      paper: "#F5F0EA",
    },
    text: {
      primary: "#3D3530", // Koyu kahve
      secondary: "#7A6E68",
    },
    custom: {
      taupe: "#C4B5A5", //sx> borderColor rengi
      unvan: "#9e7c93",
    },
  },
  typography: {
    // Tüm sitenin varsayılan yazı tipi Inter değişkenine bağlanıyor
    fontFamily: '"Inter", "Lato", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    // ✅ H1: Ana sayfa başlıkları
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: { xs: "2rem", md: "3rem" }, // 32px - 48px
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      color: "text.primary",
    },
    // ✅ H2: Sayfa başlıkları
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700, // 800 → 700
      fontSize: { xs: "1.75rem", md: "2.5rem" }, // 28px - 40px
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      color: "text.primary",
    },
    // ✅ H3: Bölüm başlıkları
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600, // 700 → 600 (daha zarif)
      fontSize: { xs: "1.5rem", md: "2rem" }, // 24px - 32px
      lineHeight: 1.4,
      color: "text.primary",
    },
    // ✅ H4: Kart başlıkları
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: { xs: "1.25rem", md: "1.5rem" }, // 20px - 24px
      lineHeight: 1.4,
      color: "text.primary",
    },
    // ✅ H5: Alt başlıklar
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1.125rem", // 18px
      lineHeight: 1.5,
      color: "text.primary",
    },
    // ✅ H6: Küçük başlıklar
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1rem", // 16px
      lineHeight: 1.5,
      color: "text.primary",
    },
    // ✅ BODY1: Ana metin (blog, açıklama)
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1rem", // 16px
      lineHeight: 1.8, // 1.7 → 1.8 (daha okunabilir)
      fontWeight: 400,
      letterSpacing: "0.01em",
      color: "text.primary",
    },
    // ✅ BODY2: İkincil metin
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "0.875rem", // 14px
      lineHeight: 1.6,
      fontWeight: 400, // 600 → 400 (daha hafif)
      color: "text.secondary",
    },
    // ✅ CAPTION: Küçük açıklamalar
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "0.75rem", // 12px
      fontWeight: 400, // 700 → 400
      lineHeight: 1.5,
      color: "text.secondary",
    },

    // ✅ SUBTITLE: Ara başlıklar
    subtitle1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
      color: "text.primary",
    },
    // ✅ BUTTON: Butonlar
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 8px rgba(124, 158, 135, 0.08)",
    "0px 4px 16px rgba(124, 158, 135, 0.12)",
    "0px 8px 24px rgba(124, 158, 135, 0.16)",
    ...Array(21).fill("none"),
  ],
  // ✅ EKLE: Bileşen bazlı varsayılanlar
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          padding: "10px 24px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: 16,
        },
      },
    },
  },
});

export default theme;
