"use client";
import { useState } from "react";
import { Box, Container, Grid, Button, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SectionBaslik from "@/components/ui/SectionBaslik";
import Link from "next/link";
import BlogKarti from "@/components/ui/BlogKarti";

const MotionBox = motion.create(Box);//bunun anlamı şu: motion kütüphanesinden Box bileşenini MotionBox olarak yeniden tanımlıyoruz. Böylece MotionBox bileşenini kullanarak animasyon özelliklerini Box bileşenine uygulayabiliriz.

// --- ALT BİLEŞEN 1: KATEGORİ FİLTRELERİ ---
// Sadece UI ve onClick event'i ile ilgilenir.
function BlogFilter({ kategoriler, activeKategori, onKategoriChange }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 6, justifyContent: "center" }}>
      {kategoriler.map((k) => (
        <Chip
          key={k}
          label={k}
          onClick={() => onKategoriChange(k)}
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            bgcolor: activeKategori === k ? "primary.main" : "white",
            color: activeKategori === k ? "white" : "text.secondary",
            border: "1px solid",
            borderColor: activeKategori === k ? "primary.main" : "custom.taupe",
            transition: "0.3s all ease",
            '&:hover': { bgcolor: activeKategori === k ? "primary.dark" : "custom.beige" }
          }}
        />
      ))}
    </Box>
  );
}

// --- ALT BİLEŞEN 2: BLOG LİSTESİ ---
// Sadece veriyi döner ve animasyonları yönetir.
function BlogGrid({ posts }) {
  return (
    <Grid container spacing={4}>
      <AnimatePresence mode="popLayout">
        {posts.map((yazi) => (
          <Grid key={yazi._id || yazi.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <MotionBox
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              sx={{ height: "100%" }}
            >
              <BlogKarti yazi={yazi} />
            </MotionBox>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}

// --- ANA BİLEŞEN ---
export default function BlogSection({ isFullPage = false, initialData }) {
  const currentData = (initialData && initialData.length > 0) ? initialData : blogYazilari;
  const [activeKategori, setActiveKategori] = useState("Tümü");

  // Mantıksal Hesaplamalar
  const kategoriler = ["Tümü", ...new Set(currentData.map((y) => y.kategori))];
  const filteredPosts = activeKategori === "Tümü" 
    ? currentData 
    : currentData.filter((y) => y.kategori === activeKategori);
  const displayPosts = isFullPage ? filteredPosts : currentData.slice(0, 3);

  return (
    <Box sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "background.default",
        pt: { xs: 4, md: 3 },
        pb: { xs: 8, md: 10 },
        position: 'relative',
        background: "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.75) 100%)",
      }}>
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik="Blog"
          baslik={isFullPage ? "Psikolojik Danışma Rehberi" : "Güncel Yazılar"}
        />

        {/* Bölüm 1: Filtreleme */}
        {isFullPage && (
          <BlogFilter 
            kategoriler={kategoriler} 
            activeKategori={activeKategori} 
            onKategoriChange={setActiveKategori} 
          />
        )}

        {/* Bölüm 2: Liste */}
        <BlogGrid posts={displayPosts} />

        {/* Bölüm 3: Aksiyon Butonu */}
        {!isFullPage && currentData.length > 3 && (
          <Box sx={{ mt: 8, textAlign: "center" }}>
            <Button
              component={Link}
              href="/blog"
              variant="contained"
              sx={{ 
                borderRadius: "50px", px: 5, py: 1.5,
                boxShadow: '0 10px 20px rgba(124,158,135,0.2)',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 15px 30px rgba(124,158,135,0.3)' }
              }}
            >
              Tüm Yazıları Gör →
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}