"use client";

import { Box, Container, Grid, Typography, Button, Chip } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import { tumTestler } from "@/data/testler-data";
import CustomButton from "@/app/shared/customButton";
import TestKarti from "@/app/testler/components/TestKarti";

export default function PsikolojikTestler({ isFullPage = false }) {
  const goruntulenecekTestler = isFullPage
    ? tumTestler
    : tumTestler.slice(0, 3);

  return (
    <Box
      sx={{
        py: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!isFullPage && (
        <Box
          sx={{
            position: "absolute",
          }}
        />
      )}
      <Container maxWidth="lg">
        <SectionBaslik
          altBaslik="PSİKOLOJİK TESTLER"
          baslik="Kendini Daha İyi Tanı"
        />

        <Grid container spacing={4} sx={{ mb: 6, alignItems: "stretch" }}>
          {goruntulenecekTestler.map((test, index) => (
            <Grid key={test.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <TestKarti test={test} index={index} />
              <CustomButton fullWidth href={`/testler/${test.slug}`}>
                Testi Başlat ➜
              </CustomButton>
            </Grid>
          ))}
        </Grid>
        {!isFullPage && (
          <Box sx={{ mt: 10, textAlign: "center" }}>
            <CustomButton href="/testler">Tüm Testleri Gör ➜</CustomButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}
