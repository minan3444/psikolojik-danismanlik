"use client";

import { Box, Container, Grid } from "@mui/material";
import HeroBackground from "./components/HeroBackground";
import HeroProfile from "./components/HeroProfile";
import HeroContent from "./components/HeroContent";
export default function HeroSection({ maddeler }) {
  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <HeroBackground />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <HeroProfile />
          <HeroContent maddeler={maddeler} />
        </Grid>
      </Container>
    </Box>
  );
}
