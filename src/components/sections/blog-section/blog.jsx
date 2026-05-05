"use client";
import { Box, Container } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import BlogGrid from "./components/BlogGrid";
import BlogFilteredContent from "./components/BlogFilteredContent";
import CustomButton from "@/app/shared/customButton";
import { motion } from "framer-motion";
import { scrollAnimation } from "@/app/shared/scrollAnimation";

const MotionBox = motion.create(Box);
export default function BlogSection({ isFullPage = false, initialData = [] }) {
  const previewPosts = initialData.slice(0, 3);

  return (
    <Box
      component="section"
      aria-label={isFullPage ? "Blog yazıları" : "Güncel blog yazıları"}
      sx={{
        position: "relative",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionBaslik
            altBaslik="BLOG"
            baslik={
              isFullPage ? "Psikolojik Danışma Rehberi" : "Güncel Yazılar"
            }
          />
        </MotionBox>
        {isFullPage ? (
          <BlogFilteredContent posts={initialData} />
        ) : (
          <BlogGrid posts={previewPosts} />
        )}
        {!isFullPage && initialData.length > 3 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CustomButton href="/blog">Tüm Yazıları Gör →</CustomButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}
