"use client";

import { useState, use } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { tumTestler } from "@/data/testler-data";
import CustomButton from "@/app/shared/customButton";

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

  // --- MERKEZİ HESAPLAMA SİSTEMİ ---
  const sonucHesapla = () => {
    if (test.tip === "puanli") {
      const puan = test.sorular.reduce((toplam, soru, index) => {
        const cevap = parseInt(cevaplar[index] ?? 0);
        // Seçeneklerdeki en yüksek değeri bul (Ters sorular için dinamik hesaplama)
        const maxSecenekDegeri = Math.max(
          ...test.secenekler.map((s) => s.deger),
        );
        return toplam + (soru.ters ? maxSecenekDegeri - cevap : cevap);
      }, 0);
      const yorum = test.yorumlar.find((y) => puan >= y.min && puan <= y.max);
      return {
        ...yorum,
        puan,
        maxPuan:
          test.sorular.length *
          Math.max(...test.secenekler.map((s) => s.deger)),
      };
    } else {
      // Kategorili hesaplama (Sevgi dili, Bağlanma vb.)
      const skorlar = {};
      Object.entries(cevaplar).forEach(([index, deger]) => {
        const kategori = test.sorular[index].kategori ?? deger; // arketipte deger zaten kategori
        skorlar[kategori] = (skorlar[kategori] || 0) + 1;
      });
      const kazananKategori = Object.keys(skorlar).reduce((a, b) =>
        skorlar[a] > skorlar[b] ? a : b,
      );
      return { ...test.sonuclar[kazananKategori], isKategorili: true };
    }
  };

  const handleCevap = (deger) => {
    // Arketip testinde seçeneğin kategorisini bul
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

  const sonuc = bitti ? sonucHesapla() : null;

  return (
    <Box
      sx={{ pt: 14, pb: 10, bgcolor: "background.default", minHeight: "100vh" }}
    >
      {/* buradaki renk testin arka plan rengi */}
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/testler"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
        >
          Tüm Testler
        </Button>

        <Typography variant="h4">{test.baslik}</Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {test.aciklama}
        </Typography>

        {!bitti ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "custom.taupe",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Soru {mevcutSoruIndex + 1} / {toplamSoru}
                </Typography>
                <Typography variant="caption" color="primary.main">
                  %{Math.round(ilerleme)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={ilerleme}
                sx={{ height: 6, borderRadius: 3, bgcolor: "background.paper" }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                minHeight: "40px",
              }}
            >
              {test.sorular[mevcutSoruIndex].metin}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={
                  test.tip === "arketip"
                    ? (test.sorular[mevcutSoruIndex].secenekler?.find(
                        (s) => s.kategori === cevaplar[mevcutSoruIndex],
                      )?.metin ?? "")
                    : (cevaplar[mevcutSoruIndex] ?? "")
                }
                onChange={(e) => handleCevap(e.target.value)}
              >
                {(
                  test.sorular[mevcutSoruIndex].secenekler ?? test.secenekler
                ).map((secenek) => (
                  <FormControlLabel
                    key={secenek.deger ?? secenek.metin}
                    value={String(secenek.deger ?? secenek.metin)}
                    control={
                      <Radio
                        sx={{ "&.Mui-checked": { color: "primary.main" } }}
                      />
                    }
                    label={secenek.etiket ?? secenek.metin}
                    sx={{
                      mb: 1,
                      p: 1.5,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor:
                        cevaplar[mevcutSoruIndex] ===
                        (secenek.kategori ?? String(secenek.deger))
                          ? "primary.main"
                          : "custom.taupe",
                      bgcolor:
                        cevaplar[mevcutSoruIndex] ===
                        (secenek.kategori ?? String(secenek.deger))
                          ? "rgba(124,158,135,0.08)"
                          : "transparent",
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                onClick={() => setMevcutSoruIndex((i) => i - 1)}
                disabled={mevcutSoruIndex === 0}
                startIcon={<ArrowBackIcon />}
              >
                Geri
              </Button>
              <Button
                onClick={() =>
                  mevcutSoruIndex + 1 >= toplamSoru
                    ? setBitti(true)
                    : setMevcutSoruIndex((i) => i + 1)
                }
                disabled={cevaplar[mevcutSoruIndex] === undefined}
                variant="contained"
                color="primary"
                sx={{ borderRadius: "50px", px: 4 }}
              >
                {mevcutSoruIndex + 1 >= toplamSoru ? "Sonucu Gör" : "Devam Et"}
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "custom.taupe",
              textAlign: "center",
            }}
          >
            {sonuc.puan !== undefined && (
              <Typography
                variant="h3"
                sx={{
                  color: "primary.main",
                  mb: 1,
                }}
              >
                {sonuc.puan} / {sonuc.maxPuan}
              </Typography>
            )}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
              }}
            >
              {sonuc.baslik}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
            >
              {sonuc.aciklama}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <CustomButton
                onClick={() => {
                  setBitti(false);
                  setMevcutSoruIndex(0);
                  setCevaplar({});
                }}
                variant="outlined"
                sx={{ px: 4 }}
              >
                Testi Tekrarla
              </CustomButton>
              <CustomButton href="/randevu">
                Süreç Hakkında Bilgi Al →
              </CustomButton>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
