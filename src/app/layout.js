import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Box from "@mui/material/Box";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyRandevuButonu from "@/components/ui/StickyRandevuButonu";
import StickyWhatsAppButonu from "@/components/ui/StickyWhatsAppButonu";
import ChatBot from "@/components/ui/ChatBot";
import { Analytics } from "@vercel/analytics/react";

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
  metadataBase: new URL("https://www.seymainan.com"),

  title: {
    default: "Şeyma İnan | Psikolojik Danışman",
    template: "%s | Şeyma İnan Psikolojik Danışmanlık",
  },

  description:
    "Online psikolojik danışmanlık ve EMDR terapisi hizmetleri. Travma, kaygı, depresyon ve ilişki sorunlarında profesyonel destek.",

  authors: [{ name: "Şeyma İnan" }],
  creator: "Şeyma İnan",
  publisher: "Şeyma İnan Psikolojik Danışmanlık",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    siteName: "Şeyma İnan Psikolojik Danışmanlık",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Şeyma İnan - Online Psikolojik Danışmanlık",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "./",
  },

  category: "Sağlık ve Wellness",
  language: "Turkish",
  distribution: "global",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="canonical" href="https://www.seymainan.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Şeyma İnan" />
        <link rel="alternate" hrefLang="tr" href="https://www.seymainan.com/" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <Box component="main" sx={{ minHeight: "100vh" }}>
            {children}
          </Box>
          <Footer />
          <StickyRandevuButonu />
          <StickyWhatsAppButonu />
          <ChatBot />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
