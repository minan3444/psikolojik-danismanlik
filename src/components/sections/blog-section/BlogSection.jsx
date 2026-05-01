//server component (SEO için kritik)

import { Box, Container } from "@mui/material";
import SectionBaslik          from "@/components/ui/SectionBaslik";
import BlogGrid               from "./components/BlogGrid";
import BlogFilteredContent    from "./components/BlogFilteredContent";
import BlogTumunuGorButonu    from "./components/BlogTumunuGorButonu";

/**
 * BlogSection — Server Component.
 *
 * "use client" YOKTUR — sayfa ilk yüklendiğinde Google bot
 * içeriği doğrudan HTML olarak görür; SEO için kritik.
 *
 * İki mod:
 *  - isFullPage=false → ana sayfa: ilk 3 yazı + "Tüm Yazıları Gör" butonu
 *  - isFullPage=true  → /blog sayfası: tüm yazılar + kategori filtresi
 *
 * @param {boolean}  isFullPage   - /blog sayfasında mı kullanılıyor?
 * @param {Array}    initialData  - Dışarıdan gelen yazı listesi (CMS / API)
 */
export default function BlogSection({ isFullPage = false, initialData = [] }) {
  const posts      = initialData.length > 0 ? initialData : [];
  const previewPosts = posts.slice(0, 3);

  return (
    <Box
      component="section"
      aria-label={isFullPage ? "Blog yazıları" : "Güncel blog yazıları"}
      sx={{
        position: "relative",
        pt: { xs: 4, md: 3 },
        pb: { xs: 8, md: 10 },
        background:
          "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.75) 100%)",
      }}
    >
      <Container maxWidth="lg">

        {/* Bölüm başlığı — h2 olarak render edilir, SEO için önemli */}
        <SectionBaslik
          altBaslik="Blog"
          baslik={isFullPage ? "Psikolojik Danışma Rehberi" : "Güncel Yazılar"}
        />

        {/*
          isFullPage → filtreli içerik (client)
          Ana sayfa  → ilk 3 yazı, saf server render (JS yok, bot görür)
        */}
        {isFullPage ? (
          <BlogFilteredContent posts={posts} />
        ) : (
          <BlogGrid posts={previewPosts} />
        )}

        {/* Ana sayfada, 3'ten fazla yazı varsa CTA butonu göster */}
        {!isFullPage && posts.length > 3 && <BlogTumunuGorButonu />}

      </Container>
    </Box>
  );
}