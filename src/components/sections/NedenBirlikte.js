"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import CustomButton from "@/app/shared/customButton";
import maddeler from "@/data/NedenBirlikte-data";
import AnimatedFrame from "@/app/shared/AnimatedFrame";
import CardAlani from "../../app/shared/CardAlani";

export default function NedenBirlikte() {
  return (
    <Box
      sx={{
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik="NEDEN BİRLİKTE ÇALIŞMALIYIZ ?"
          baslik="Yolculuğuna Eşlik Etmek İçin Buradayım"
        />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {maddeler.map((madde) => {
            return (
              <Grid key={madde.id} size={{ xs: 12, md: 4 }}>
                <AnimatedFrame>
                  <CardAlani
                    ikon={madde.ikon}
                    baslik={madde.baslik}
                    aciklama={madde.aciklama}
                  />
                </AnimatedFrame>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "custom.taupe",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              mb: 2,
              fontStyle: "italic",
            }}
          >
            Değişim, küçük bir adım ve nazik bir kararla başlar. Kendine
            ayıracağın bu zamanın hayatında neler dönüştürebileceğini görmek
            için ilk adımı birlikte atabiliriz.
          </Typography>
          <CustomButton href="/randevu">İlk Adımı At →</CustomButton>
        </Box>
      </Container>
    </Box>
  );
}
