import { client } from "@/sanity/lib/client";
import { LEGAL_DOC_QUERY, LEGAL_SLUGS_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { notFound } from "next/navigation";

export const revalidate = 0; // Her zaman canlı veri

export async function generateMetadata({ params }) {
  const { slug } = await params; // Next.js 15 zorunluluğu
  const belge = await client.fetch(LEGAL_DOC_QUERY, { slug });
  return { title: belge ? `${belge.baslik} | Şeyma İnan` : "Yasal Metin" };
}

export async function generateStaticParams() {
  const belgeler = await client.fetch(LEGAL_SLUGS_QUERY);
  return belgeler.map((b) => ({ slug: b.slug }));
}

export default async function LegalPage({ params }) {
  // 1. Params'ı asenkron çözüyoruz
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // 2. Veriyi çekiyoruz
  const belge = await client.fetch(LEGAL_DOC_QUERY, { slug: decodedSlug });

  // --- DEBUG: Eğer 404 alıyorsan terminale bak ---
  if (!belge) {
    console.error(
      `HATA: Sanity'de "${decodedSlug}" slug'ına sahip belge bulunamadı!`,
    );
    notFound();
  }

  return (
    <Box
      sx={{ pt: 16, pb: 10, bgcolor: "background.default", minHeight: "100vh" }}
    >
      <Container maxWidth="md">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 4, color: "text.secondary" }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Anasayfa
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            {belge.baslik}
          </Typography>
        </Breadcrumbs>

        <Typography variant="h3" sx={{ mb: 2 }}>
          {belge.baslik}
        </Typography>
        <Box
          sx={{
            width: 60,
            height: 4,
            bgcolor: "primary.main",
            borderRadius: 3,
            mb: 6,
          }}
        />

        <Box
          sx={{
            lineHeight: 2,
            color: "text.secondary",
            fontSize: "1.1rem",
            "& strong, & b": { color: "text.primary", fontWeight: 700 },
            "& p": { mb: 3 },
            "& ul": { mb: 3, pl: 3 },
            "& li": { mb: 1.5 },
          }}
        >
          <PortableText value={belge.icerik} />
        </Box>
        <Divider sx={{ mt: 8, mb: 4, opacity: 0.5 }} />
      </Container>
    </Box>
  );
}
