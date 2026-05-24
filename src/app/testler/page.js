"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { tumTestler } from "@/data/testler-data";
import AppBreadcrumb from "../shared/Appbreadcrumb";
import TestKarti from "./components/TestKarti";
import CustomButton from "../shared/customButton";

export default function TestlerPage() {
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 10 },
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <AppBreadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Psikolojik Testler" },
          ]}
        />

        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Kendini Daha İyi Tanı
          </Typography>
          <Typography variant="body1">
            Kendi iç dünyanıza yapacağınız bir yolculuk, iyileşmenin ilk
            adımıdır. Aşağıdaki testlerle farkındalığınızı artırın.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
          {tumTestler.map((test, index) => (
            <Grid
              key={test.slug}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{ height: "100%" }}
            >
              <TestKarti test={test} index={index} />
              <CustomButton
                href={`/testler/${test.slug}`}
                fullWidth
                color="white"
              >
                Testi Başlat ➜
              </CustomButton>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
