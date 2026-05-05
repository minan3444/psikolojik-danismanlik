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
      default: "#FAF8F5",
      paper: "#F5F0EA",
    },
    text: {
      primary: "#3D3530", // Koyu kahve
      secondary: "#7A6E68",
    },
    custom: {
      taupe: "#C4B5A5",
      beige: "#EDE8E0",
    },
  },
  typography: {
    // Tüm sitenin varsayılan yazı tipi Inter değişkenine bağlanıyor
    fontFamily: 'var(--font-inter), "Lato", sans-serif',

    h1: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 600,
    },
    h7: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "var(--font-inter), sans-serif",
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: "var(--font-inter), sans-serif",
      lineHeight: 1.6,
    },
    // Eğer Montserrat veya Lora'yı belirli yerlerde kullanmak istersen buraya ekleyebilirsin:
    subtitle1: {
      fontFamily: "var(--font-inter), serif",
      fontWeight: 600,
    },
    button: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: 600,
      textTransform: "none", // Butonların hepsinin büyük harf olmasını engeller
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
});

export default theme;
