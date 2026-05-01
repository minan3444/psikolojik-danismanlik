import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Box from "@mui/material/Box";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
          {/* Navbar → tüm sayfalarda görünür */}
          <Navbar />
          {/* Sayfa içeriği */}
          <Box component="main" sx={{ minHeight: "100vh" }}>
            {children}
          </Box>
          {/* Footer → tüm sayfalarda görünür */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
