"use client";

import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
} from "@mui/material";
import CustomButton from "@/app/shared/customButton";

export default function SoruPaneli({
  test,
  mevcutSoruIndex,
  toplamSoru,
  ilerleme,
  cevaplar,
  onCevap,
  onGeri,
  onIleri,
}) {
  const mevcutSoru = test.sorular[mevcutSoruIndex];
  const aktifSecenekler = mevcutSoru.secenekler ?? test.secenekler;

  const radioValue =
    test.tip === "arketip"
      ? (mevcutSoru.secenekler?.find(
          (s) => s.kategori === cevaplar[mevcutSoruIndex],
        )?.metin ?? "")
      : (cevaplar[mevcutSoruIndex] ?? "");

  const isSecili = (secenek) =>
    cevaplar[mevcutSoruIndex] === (secenek.kategori ?? String(secenek.deger));

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      {/* İlerleme */}
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="caption">
            Soru {mevcutSoruIndex + 1} / {toplamSoru}
          </Typography>
          <Typography variant="caption">%{Math.round(ilerleme)}</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={ilerleme}
          sx={{
            height: 6,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "custom.taupe",
            bgcolor: "background.paper",
          }}
        />
      </Box>

      {/* Soru metni */}
      <Typography variant="h2" sx={{ minHeight: "40px", mb: 2 }}>
        {mevcutSoru.metin}
      </Typography>

      {/* Seçenekler */}
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={radioValue}
          onChange={(e) => onCevap(e.target.value)}
        >
          {aktifSecenekler.map((secenek) => (
            <FormControlLabel
              key={secenek.deger ?? secenek.metin}
              value={String(secenek.deger ?? secenek.metin)}
              control={
                <Radio sx={{ "&.Mui-checked": { color: "primary.main" } }} />
              }
              label={secenek.etiket ?? secenek.metin}
              sx={{
                mb: 1.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: isSecili(secenek)
                  ? "primary.main"
                  : "custom.taupe",
                bgcolor: isSecili(secenek)
                  ? "rgba(124,158,135,0.08)"
                  : "transparent",
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Navigasyon butonları */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <CustomButton
          variant="outlined"
          onClick={onGeri}
          disabled={mevcutSoruIndex === 0}
          sx={{ border: "none" }}
        >
          🡨 Geri
        </CustomButton>

        <CustomButton
          disabled={cevaplar[mevcutSoruIndex] === undefined}
          onClick={onIleri}
        >
          {mevcutSoruIndex + 1 >= toplamSoru ? "Sonucu Gör" : "Devam Et"}
        </CustomButton>
      </Box>
    </Paper>
  );
}
