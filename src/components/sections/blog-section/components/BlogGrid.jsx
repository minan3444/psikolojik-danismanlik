//← "use client" (framer-motion)
"use client";

import { Box, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import BlogKarti from "@/components/ui/BlogKarti";

const MotionBox = motion.create(Box);

export default function BlogGrid({ posts }) {
  return (
    <Grid
      component="ul"
      container
      spacing={3}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      <AnimatePresence mode="popLayout">
        {posts.map((yazi) => (
          <Grid
            key={yazi._id || yazi.id}
            component="li"
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <MotionBox
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              sx={{ height: "100%" }}
            >
              <BlogKarti yazi={yazi} />
            </MotionBox>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
