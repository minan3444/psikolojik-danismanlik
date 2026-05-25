// ─────────────────────────────────────────────────────────────
//  page.js  —  Yönetici Paneli
//
//  Bu dosyanın tek görevi parçaları bir araya getirmek.
//  İş mantığı hook'larda, görsel detaylar bileşenlerde.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { Box, Container, CircularProgress } from "@mui/material";

// — Hook'lar (iş mantığı) —
import { useAppointments } from "./hooks/useAppointments";
import { useRescheduleDialog } from "./hooks/useRescheduleDialog";

// — Bileşenler (görünüm) —
import PanelBaslik from "./components/PanelBaslik";
import RandevuSekmeleri from "./components/RandevuSekmeleri";
import RandevuTablosu from "./components/RandevuTablosu";
import IslemMenusu from "./components/IslemMenusu";
import ZamanlavaDialogu from "./components/ZamanlavaDialogu";

export default function AdminPage() {
  // ── Randevu verisi ve durum değiştirme ──────────────────────
  const {
    loading,
    bekleyenler,
    aktifler,
    gecmis,
    changeStatus,
    fetchAppointments,
  } = useAppointments();

  // ── İşlem menüsü (sağ tık / ikonla açılan) ──────────────────
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuApt, setMenuApt] = useState(null);

  const menuAc = (event, apt) => {
    setMenuAnchor(event.currentTarget);
    setMenuApt(apt);
  };
  const menuKapat = () => {
    setMenuAnchor(null);
    setMenuApt(null);
  };

  const durumDegistir = async (apt, yeniDurum) => {
    menuKapat();
    await changeStatus(apt, yeniDurum);
  };

  // ── Yeniden zamanlama / blok dialog'u ───────────────────────
  const dialog = useRescheduleDialog({ onSuccess: fetchAppointments });

  // ── Aktif sekme ──────────────────────────────────────────────
  const [aktifSekme, setAktifSekme] = useState(0);
  const sekmeVerisi = [bekleyenler, aktifler, gecmis][aktifSekme];

  // ── Render ───────────────────────────────────────────────────
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 12 },
        pb: 10,
        bgcolor: "#FAF8F5",
        minHeight: "100vh",
      }}
    >
      <Container>
        {/* Başlık + "Müsaitlik Yönet" butonu */}
        <PanelBaslik
          onMusaitlikYonet={() => dialog.dialoguAc({ id: "manual-block" })}
        />

        {/* Bekleyen / Aktif / Geçmiş sekmeleri */}
        <RandevuSekmeleri
          aktifSekme={aktifSekme}
          onChange={setAktifSekme}
          bekleyenSayisi={bekleyenler.length}
          aktifSayisi={aktifler.length}
        />

        {/* Randevu tablosu veya yükleniyor göstergesi */}
        {loading ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <RandevuTablosu data={sekmeVerisi} onIslemTiklandi={menuAc} />
        )}

        {/* Satır işlem menüsü (onayla / reddet / sil vb.) */}
        <IslemMenusu
          anchorEl={menuAnchor}
          seciliApt={menuApt}
          onDurumDegistir={durumDegistir}
          onKapat={menuKapat}
        />

        {/* Blok / yeniden zamanlama dialog'u */}
        <ZamanlavaDialogu
          acik={dialog.acik}
          seciliApt={dialog.seciliApt}
          yeniTarih={dialog.yeniTarih}
          yeniSaat={dialog.yeniSaat}
          rezerveSaatler={dialog.rezerveSaatler}
          selectedBlocks={dialog.selectedBlocks}
          yukleniyor={dialog.yukleniyor}
          onKapat={dialog.dialoguKapat}
          onTarihDegistir={dialog.setYeniTarih}
          onSaatSec={dialog.setYeniSaat}
          onSaatiToggle={dialog.saatiToggle}
          onKaydet={dialog.kaydet}
        />
      </Container>
    </Box>
  );
}
