"use client";
import { Box, Container } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import BlogGrid from "./components/BlogGrid";
import BlogFilteredContent from "./components/BlogFilteredContent";
import CustomButton from "@/app/shared/customButton";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

export default function BlogSection({ isFullPage = false, initialData = [] }) {
  const previewPosts = initialData.slice(0, 3);

  return (
    <Box
      sx={{
        position: "relative",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik={isFullPage ? null : "BLOG"}
          baslik={isFullPage ? "Psikolojik Danışma Rehberi" : "Güncel Yazılar"}
        />

        {isFullPage ? (
          <BlogFilteredContent posts={initialData} />
        ) : (
          <BlogGrid posts={previewPosts} />
        )}
        {!isFullPage && initialData.length > 3 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CustomButton href="/blog">Tüm Yazıları Gör ➜</CustomButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}
