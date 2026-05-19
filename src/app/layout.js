import { Inter, Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import Box from "@mui/material/Box";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* 📚 FONTLAR - Google Fonts'tan import edildi */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Playfair Display = Başlıklar için (serif font) */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Şeyma İnan | Psikolojik Danışman",
    template: "%s | Şeyma İnan",
  },
  description:
    "Online psikolojik danışmanlık hizmeti. EMDR yöntemi ile güvenli ve yargısız bir alan.",
  keywords: [
    "psikolojik danışmanlık",
    "online psikolojik danışma",
    "online terapi",
    "EMDR",
    "kaygı",
    "stres",
    "travma",
  ],
  authors: [{ name: "Şeyma İnan" }],
  creator: "Şeyma İnan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>
          <Navbar />
          <Box component="main" sx={{ p: 1 }}>
            {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
