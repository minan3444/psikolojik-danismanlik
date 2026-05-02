import { Box, Container } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import BlogGrid from "./components/BlogGrid";
import BlogFilteredContent from "./components/BlogFilteredContent";
import BlogTumunuGorButonu from "./components/BlogTumunuGorButonu";

export default function BlogSection({ isFullPage = false, initialData = [] }) {
  const previewPosts = initialData.slice(0, 3);

  return (
    <Box
      component="section"
      aria-label={isFullPage ? "Blog yazıları" : "Güncel blog yazıları"} //Kullanırsan: Web siten daha kapsayıcı olur ve engelli kullanıcılar siteni rahatça kullanabilir. Modern web standartlarında (WCAG) bu tür alanlara isim verilmesi şiddetle önerilir.
      sx={{
        position: "relative",
        p: 3,
        background:
          "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.3) 100%)",
      }}
    >
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik="Blog"
          baslik={isFullPage ? "Psikolojik Danışma Rehberi" : "Güncel Yazılar"}
        />
        {isFullPage ? (
          <BlogFilteredContent posts={initialData} />
        ) : (
          <BlogGrid posts={previewPosts} />
        )}
        {!isFullPage && initialData.length > 3 && <BlogTumunuGorButonu />}
      </Container>
    </Box>
  );
}
