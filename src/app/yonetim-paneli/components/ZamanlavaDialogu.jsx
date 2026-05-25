// ─────────────────────────────────────────────────────────────
//  components/ZamanlavaDialogu.jsx
//  İki amaç için kullanılır:
//    1. Manuel blok: belirli saatleri bloke et / aç
//    2. Randevu taşı: mevcut randevuyu yeni tarih/saate al
//
//  Hangi mod olduğunu `seciliApt.id === "manual-block"` belirler.
// ─────────────────────────────────────────────────────────────

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAvailableHours } from "../constants";

// Tek bir saat butonu
function SaatButonu({ saat, durum, onClick }) {
  // durum: "bloke" | "rezerve" | "bos" | "secili"
  const rezerveMi = durum === "rezerve";
  const vurgulanmisMi = durum === "bloke" || durum === "secili";

  return (
    <Grid size={{ xs: 3 }}>
      <Button
        fullWidth
        size="small"
        variant={vurgulanmisMi ? "contained" : "outlined"}
        color={durum === "bloke" ? "error" : "primary"}
        disabled={rezerveMi}
        onClick={onClick}
        sx={{
          fontSize: "0.7rem",
          py: 0.5,
          ...(rezerveMi && { textDecoration: "line-through", opacity: 0.4 }),
        }}
      >
        {saat}
      </Button>
    </Grid>
  );
}

export default function ZamanlavaDialogu({
  acik,
  onKapat,
  seciliApt,
  yeniTarih,
  yeniSaat,
  rezerveSaatler,
  selectedBlocks,
  yukleniyor,
  onTarihDegistir,
  onSaatSec,
  onSaatiToggle,
  onKaydet,
}) {
  const manuelBlokMu = seciliApt?.id === "manual-block";
  const tarihStr = yeniTarih.format("YYYY-MM-DD");
  const gunBlokSaatler = selectedBlocks[tarihStr] ?? [];
  const musaitSaatler = getAvailableHours(yeniTarih);

  // Bir saatin görsel durumunu belirler
  const saatDurumu = (saat) => {
    const slot = rezerveSaatler.find((s) => s.time === saat);
    if (slot?.status === "onaylandı" || slot?.status === "beklemede")
      return "rezerve";
    if (manuelBlokMu && gunBlokSaatler.includes(saat)) return "bloke";
    if (!manuelBlokMu && yeniSaat === saat) return "secili";
    return "bos";
  };

  return (
    <Dialog open={acik} onClose={onKapat} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
        {manuelBlokMu ? "Müsaitlik Yönetimi" : "Randevuyu Yeniden Zamanla"}
      </DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {/* Takvim */}
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={yeniTarih}
              onChange={(tarih) => {
                onTarihDegistir(tarih);
                onSaatSec(""); // tarih değişince saat sıfırlanır
              }}
              slotProps={{
                actionBar: { sx: { display: "none" } },
                toolbar: { sx: { display: "none" } },
              }}
            />

            {/* Açıklama */}
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {manuelBlokMu
                ? "🟥 Kırmızı = Kapalı  |  Tıkla aç/kapat  |  Kaydet'e bas"
                : "Yeni saat seçin"}
            </Typography>

            {/* Saat ızgarası */}
            <Grid container spacing={1}>
              {musaitSaatler.map((saat) => (
                <SaatButonu
                  key={saat}
                  saat={saat}
                  durum={saatDurumu(saat)}
                  onClick={() =>
                    manuelBlokMu ? onSaatiToggle(saat) : onSaatSec(saat)
                  }
                />
              ))}
            </Grid>
          </Box>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onKapat}>İptal</Button>
        <Button
          variant="contained"
          disabled={yukleniyor}
          onClick={onKaydet}
          sx={{ borderRadius: "50px", px: 3 }}
        >
          {yukleniyor ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
