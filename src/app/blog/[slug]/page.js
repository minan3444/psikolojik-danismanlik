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
  const decodedSlug = decodeURIComponent(slug);
  const yazi = await client.fetch(BLOG_POST_QUERY, { slug: decodedSlug });

  if (!yazi) {
    return {
      title: "Blog Yazısı Bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const yaziUrl = `/blog/${decodedSlug}`;
  const gorselUrl = yazi.gorsel ? urlFor(yazi.gorsel).url() : undefined;

  return {
    title: `${yazi.baslik} | Şeyma İnan`,
    description:
      yazi.ozet ||
      `${yazi.baslik} - Şeyma İnan ile psikoloji, terapi ve kişisel gelişim üzerine detaylı blog yazısı.`,
    keywords: [
      yazi.kategori,
      yazi.baslik,
      "psikoloji blog",
      "terapi yazıları",
      "ruhsal sağlık",
      "kişisel gelişim",
      "Şeyma İnan blog",
      "online psikolojik danışmanlık",
      "EMDR terapisi",
      `${yazi.kategori.toLowerCase()} terapisi`,
    ],
    authors: [{ name: "Şeyma İnan", url: "https://www.seymainan.com" }],
    creator: "Şeyma İnan",
    publisher: "Şeyma İnan Psikolojik Danışmanlık",

    openGraph: {
      title: yazi.baslik,
      description:
        yazi.ozet ||
        `${yazi.baslik} - Psikoloji ve ruh sağlığı üzerine uzman yazısı.`,
      url: yaziUrl,
      type: "article",
      publishedTime: yazi.tarih,
      modifiedTime: yazi._updatedAt,
      authors: ["Şeyma İnan"],
      section: yazi.kategori,
      tags: [yazi.kategori, "psikoloji", "terapi", "ruh sağlığı"],
      images: gorselUrl
        ? [
            {
              url: gorselUrl,
              width: 1200,
              height: 630,
              alt: yazi.baslik,
            },
          ]
        : [],
    },

    alternates: {
      canonical: yaziUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    category: yazi.kategori,
  };
}

export const revalidate = 3600;

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

  // SEO için Article Schema (Zenginleştirildi)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: yazi.baslik,
    description:
      yazi.ozet ||
      `${yazi.baslik} - Psikoloji ve ruh sağlığı üzerine uzman blog yazısı.`,
    image: yazi.gorsel ? urlFor(yazi.gorsel).url() : "",
    datePublished: yazi.tarih,
    dateModified: yazi._updatedAt || yazi.tarih,
    author: {
      "@type": "Person",
      name: "Şeyma İnan",
      url: "https://www.seymainan.com/hakkimda",
      jobTitle: "Psikolojik Danışman & EMDR Terapisti",
      sameAs: [
        "https://www.instagram.com/pd.seymainan",
        "https://www.linkedin.com/in/%C5%9Feyma-inan-2481651a4",
        "https://www.doktortakvimi.com/seyma-inan/psikolojik-danisma-ve-rehberlik/maltepe",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Şeyma İnan Psikolojik Danışmanlık",
      url: "https://www.seymainan.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.seymainan.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.seymainan.com/blog/${decodedSlug}`,
    },
    articleSection: yazi.kategori,
    keywords: [
      yazi.kategori,
      "psikoloji",
      "terapi",
      "ruh sağlığı",
      "EMDR",
    ].join(", "),
    inLanguage: "tr-TR",
    isAccessibleForFree: "True",
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
          variant="h1"
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
