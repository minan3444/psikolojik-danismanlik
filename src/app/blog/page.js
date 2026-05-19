import { Box, Container } from "@mui/material";
import BlogSection from "@/components/sections/blog-section/blog";
import AppBreadcrumb from "../shared/Appbreadcrumb";
// SANITY
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
        pt: { xs: 10, md: 10 },
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="lg">
        <AppBreadcrumb
          items={[{ label: "Anasayfa", href: "/" }, { label: "Blog" }]}
        />
      </Container>
      <BlogSection isFullPage={true} initialData={yazilar} />
    </Box>
  );
}
