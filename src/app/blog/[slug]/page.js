import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// SANITY İTHALATLARI
import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import CustomButton from "@/app/shared/customButton";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // SEO için metadata verisini Sanity'den çekiyoruz
  const yazi = await client.fetch(BLOG_POST_QUERY, { slug });

  return { title: `${yazi?.baslik} | Blog` };
}

export default async function BlogDetayPage({ params }) {
  const { slug } = await params;

  // URL'deki türkçe karakter kaymalarını decode edip Sanity'den veriyi çekiyoruz
  const decodedSlug = decodeURIComponent(slug);
  const yazi = await client.fetch(BLOG_POST_QUERY, { slug: decodedSlug });

  if (!yazi)
    return (
      <Typography sx={{ mt: 20, textAlign: "center" }}>
        Yazı bulunamadı.
      </Typography>
    );

  // SEO için Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: yazi.baslik,
    image: yazi.gorsel ? urlFor(yazi.gorsel).url() : "",
    datePublished: yazi.tarih,
    author: { "@type": "Person", name: "Şeyma İnan" },
  };

  return (
    <Box sx={{ pt: 16, pb: 10, bgcolor: "white", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container maxWidth="md">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 4 }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Anasayfa
          </Link>
          <Link
            href="/blog"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Blog
          </Link>
          <Typography color="text.primary">{yazi.kategori}</Typography>
        </Breadcrumbs>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 800,
            mb: 3,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          {yazi.baslik}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>Şİ</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Şeyma İnan
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {yazi.tarih} • {yazi.okumaSuresi} okuma
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            mb: 6,
            height: { xs: 250, md: 450 },
          }}
        >
          {/* Sanity Görsel Motoru Entegre Edildi */}
          <img
            src={urlFor(yazi.gorsel).url()}
            alt={yazi.baslik}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            color: "text.secondary",
            lineHeight: 2,
            fontSize: "1.15rem",
            "& h3": {
              color: "text.primary",
              mt: 4,
              mb: 2,
              fontFamily: "var(--font-playfair)",
            },
            "& p": { mb: 3 },
          }}
        >
          {/* dangerouslySetInnerHTML kaldırıldı, Sanity'nin PortableText bileşeni eklendi */}
          <PortableText value={yazi.icerik} />
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box
          sx={{
            textAlign: "center",
            p: 6,
            bgcolor: "custom.beige",
            borderRadius: 6,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "var(--font-playfair)", mb: 2, fontWeight: 700 }}
          >
            Bu yazı size nasıl hissettirdi?
          </Typography>
          <Typography sx={{ mb: 4, color: "text.secondary" }}>
            Duygusal sağlığınızla ilgili profesyonel bir yolculuğa başlamak
            isterseniz buradayım.
          </Typography>
          <Link href="/randevu" style={{ textDecoration: "none" }}>
            <CustomButton href="/randevu">ÜCRETSİZ ÖN GÖRÜŞME AL</CustomButton>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
