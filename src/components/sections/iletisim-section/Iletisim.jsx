"use client";
import { Container, Grid } from "@mui/material";
import SectionBaslik from "@/components/ui/SectionBaslik";
import IletisimProfile from "./components/iletisimProfile";
import IletisimForm from "./components/iletisimForm";
import IletisimBackground from "./components/iletisimBackground";

export default function IletisimSection({ legalDocs = [] }) {
  return (
    <IletisimBackground>
      <Container maxWidth="lg">
        {/* 🚨 BURAYA component="h1" EKLENDİ 🚨 */}
        <SectionBaslik
          altBaslik="İLETİŞİM"
          baslik="İletişime Geçin"
          component="h1"
        />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <IletisimProfile />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <IletisimForm legalDocs={legalDocs} />
          </Grid>
        </Grid>
      </Container>
    </IletisimBackground>
  );
}
