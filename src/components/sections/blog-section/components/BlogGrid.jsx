"use client";

import { Grid } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import BlogKarti from "@/components/ui/BlogKarti";
import AnimatedFrame from "@/app/shared/AnimatedFrame";

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
            <BlogKarti yazi={yazi} />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
