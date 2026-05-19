import { Box, Container, Typography, Divider, Avatar } from "@mui/material";
import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import AppBreadcrumb from "@/app/shared/Appbreadcrumb";
import Image from "next/image";
import VakaBlogIletisimeGecme from "@/app/shared/VakaBlogIletisimeGecme";

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
    <Box sx={{ pt: 10, pb: 10, bgcolor: "white", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container maxWidth="md">
        <AppBreadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: yazi.kategori },
          ]}
        />

        <Typography
          variant="h2"
          sx={{
            mb: 3,
            fontSize: "min(8vw, 3.2rem)",
            wordBreak: "break-word",
          }}
        >
          {yazi.baslik}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>Şİ</Avatar>
          <Box>
            <Typography variant="body1">Şeyma İnan</Typography>
            <Typography variant="caption" color="text.secondary">
              {yazi.tarih} • {yazi.okumaSuresi} okuma
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            mb: 4,
            position: "relative",
            height: { xs: 250, md: 450 },
          }}
        >
          <Image
            src={urlFor(yazi.gorsel).url()}
            alt={yazi.baslik}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            color: "text.secondary",
            "& p": { mb: 3 },
          }}
        >
          <PortableText value={yazi.icerik} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <VakaBlogIletisimeGecme
          baslik="Bu yazı size nasıl hissettirdi?"
          altMetin="Duygusal sağlığınızla ilgili profesyonel bir yolculuğa başlamak
            isterseniz buradayım."
          butonMetni="SÜREÇ HAKKINDA BİLGİ AL"
          href="/randevu"
        />
      </Container>
    </Box>
  );
}
