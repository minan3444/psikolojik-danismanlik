import { Box, Container, Breadcrumbs, Typography } from "@mui/material";
import BlogSection from "@/components/sections/blog-section/BlogSection";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// SANITY İTHALATLARI
import { client } from "@/sanity/lib/client";
import { BLOG_QUERY } from "@/sanity/lib/queries";

export const revalidate = 0;

export const metadata = {
  title: "Blog | Psikolojik Danışman Şeyma İnan",
  description:
    "Psikolojik sağlık, terapi yaklaşımları ve öz farkındalık üzerine uzman yazıları.",
};

export default async function BlogPage() {
  const yazilar = await client.fetch(
    BLOG_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <Box
      sx={{
        p: 6,
        bgcolor: "background.default",
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="lg">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 1, color: "text.secondary" }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Anasayfa
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            Blog
          </Typography>
        </Breadcrumbs>
      </Container>

      <BlogSection isFullPage={true} initialData={yazilar} />
    </Box>
  );
}
