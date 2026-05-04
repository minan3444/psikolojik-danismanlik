"use client";

import { Box, Card, Container, Grid, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import uzmanlikAlanlari from "@/data/uzmanlik-alanlari";
import AnimatedFrame from "@/app/shared/AnimatedFrame";
import UzmanlikCard from "../../../app/shared/CardAlani";

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

        <Grid container spacing={2}>
          {uzmanlikAlanlari.map((alan) => {
            const Ikon = Icons[alan.ikon];

            return (
              <Grid key={alan.id} size={{ xs: 12, md: 3 }}>
                <AnimatedFrame>
                  <UzmanlikCard
                    ikon={alan.ikon}
                    baslik={alan.baslik}
                    aciklama={alan.aciklama}
                  />
                </AnimatedFrame>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
