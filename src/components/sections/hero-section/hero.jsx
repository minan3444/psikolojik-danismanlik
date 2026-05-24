"use client";

import { Box, Container, Grid } from "@mui/material";
import HeroProfile from "./components/HeroProfile";
import HeroContent from "./components/HeroContent";
export default function HeroSection({ maddeler }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 8, md: 10 },
        px: { xs: 1, md: 10 },
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <HeroProfile />
          <HeroContent maddeler={maddeler} />
        </Grid>
      </Container>
    </Box>
  );
}
