"use client";

import { Box, Card, Container, Grid, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import uzmanlikAlanlari from "@/data/uzmanlik-alanlari";
import theme from "@/theme/theme";
import AnimatedFrame from "@/app/shared/AnimatedFrame";
import UzmanlikCard from "./UzmanlikCard";
const { sectionPadding } = theme;

export default function UzmanlikAlanlari() {
  return (
    <Box
      sx={{
        py: { xs: sectionPadding.xs, md: sectionPadding.md },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Arka plan fotoğrafı */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          //backgroundImage: `url('/images/kitaplik1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.3) 100%)",
          },
        }}
      />

      {/* Dekoratif arka plan elementi */}
      <Box
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,158,135,0.06) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* BAŞLIK KISMI - AnimatedFrame ile aşağıdan gelsin */}
        <AnimatedFrame>
          <SectionBaslik
            altBaslik="Uzmanlık Alanlarım"
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
