"use client";

import { useState, use } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

import { tumTestler } from "@/data/testler-data";
import { sonucHesapla } from "./utils/sonucHesapla";
import SoruPaneli from "./components/SoruPaneli";
import SonucPaneli from "./components/SonucPaneli";

export default function EvrenselTestMotoru({ params }) {
  const resolvedParams = use(params);
  const test = tumTestler.find((t) => t.slug === resolvedParams.slug);

  const [mevcutSoruIndex, setMevcutSoruIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState({});
  const [bitti, setBitti] = useState(false);

  if (!test)
    return (
      <Typography sx={{ mt: 20, textAlign: "center" }}>
        Test bulunamadı.
      </Typography>
    );

  const toplamSoru = test.sorular.length;
  const ilerleme = (mevcutSoruIndex / toplamSoru) * 100;

  const handleCevap = (deger) => {
    if (test.tip === "arketip") {
      const aktifSecenekler = test.sorular[mevcutSoruIndex].secenekler;
      const secenek = aktifSecenekler.find((s) => s.metin === deger);
      setCevaplar({
        ...cevaplar,
        [mevcutSoruIndex]: secenek?.kategori ?? deger,
      });
    } else {
      setCevaplar({ ...cevaplar, [mevcutSoruIndex]: deger });
    }
  };

  const handleTekrarla = () => {
    setBitti(false);
    setMevcutSoruIndex(0);
    setCevaplar({});
  };

  const sonuc = bitti ? sonucHesapla(test, cevaplar) : null;

  return (
    <Box
      sx={{
        pt: { xs: 8, md: 10 },
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/testler"
          sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
        >
          🡨 Tüm Testler
        </Button>

        <Typography variant="h4">{test.baslik}</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {test.aciklama}
        </Typography>

        {!bitti ? (
          <SoruPaneli
            test={test}
            mevcutSoruIndex={mevcutSoruIndex}
            toplamSoru={toplamSoru}
            ilerleme={ilerleme}
            cevaplar={cevaplar}
            onCevap={handleCevap}
            onGeri={() => setMevcutSoruIndex((i) => i - 1)}
            onIleri={() =>
              mevcutSoruIndex + 1 >= toplamSoru
                ? setBitti(true)
                : setMevcutSoruIndex((i) => i + 1)
            }
          />
        ) : (
          <SonucPaneli sonuc={sonuc} onTekrarla={handleTekrarla} />
        )}
      </Container>
    </Box>
  );
}
