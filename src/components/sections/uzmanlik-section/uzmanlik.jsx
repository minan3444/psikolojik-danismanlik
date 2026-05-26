"use client";

import { Box, Container, Grid } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import uzmanlikAlanlari from "@/data/uzmanlik-alanlari";
import AnimatedFrame from "@/app/shared/AnimatedFrame";
import UzmanlikCard from "../../../app/shared/UzmanlikCard";

export default function UzmanlikAlanlari() {
  return (
    <Box
      sx={{
        py: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <AnimatedFrame>
          <SectionBaslik
            altBaslik="UZMANLIK ALANLARIM"
            baslik="Sana Nasıl Yardımcı Olabilirim?"
          />
        </AnimatedFrame>

        <Grid container spacing={4}>
          {uzmanlikAlanlari.map((alan) => {
            return (
              <Grid key={alan.id} size={{ xs: 12, md: 3 }}>
                <UzmanlikCard
                  ikon={alan.ikon}
                  baslik={alan.baslik}
                  aciklama={alan.aciklama}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
