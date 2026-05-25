// ─────────────────────────────────────────────────────────────
//  hooks/useRescheduleDialog.js
//  "Müsaitlik Yönet" ve "Yeniden Zamanla" dialog'unun
//  tüm state ve logic'i burada toplanmıştır.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getReservedSlots } from "@/app/actions/appointment";
import {
  updateAppointmentDateTime,
  saveBatchBlocks,
} from "@/app/actions/admin";

export function useRescheduleDialog({ onSuccess }) {
  const [acik, setAcik] = useState(false);
  const [seciliApt, setSeciliApt] = useState(null); // hangi randevu işleniyor
  const [yeniTarih, setYeniTarih] = useState(dayjs());
  const [yeniSaat, setYeniSaat] = useState("");
  const [rezerveSaatler, setRezerveSaatler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);

  /**
   * selectedBlocks: { [tarihStr]: string[] }
   *   Her gün için kaydedilecek bloke saatler.
   *   Boş array = o günün tüm blokları kaldır (günü aç).
   *
   * kullanicininDegistirdigiGunler: Set<string>
   *   Kullanıcının bu oturumda elle değiştirdiği günler.
   *   Bu günler useEffect tarafından DB verisiyle ezilmez (race condition önlemi).
   */
  const [selectedBlocks, setSelectedBlocks] = useState({});
  const [kullanicininDegistirdigiGunler, setKullanicininDegistirdigiGunler] =
    useState(new Set());

  // Dialog kapalıysa hiçbir şey çekme
  useEffect(() => {
    if (!acik) return;

    const tarihStr = yeniTarih.format("YYYY-MM-DD");

    const slotlarıCek = async () => {
      const slotlar = await getReservedSlots(tarihStr);
      setRezerveSaatler(slotlar);

      // Kullanıcı bu günü elle değiştirmediyse DB'deki blokları yükle
      setSelectedBlocks((prev) => {
        if (kullanicininDegistirdigiGunler.has(tarihStr)) return prev;
        const dbBloklar = slotlar
          .filter((s) => s.status === "bloke")
          .map((s) => s.time);
        return { ...prev, [tarihStr]: dbBloklar };
      });
    };

    slotlarıCek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yeniTarih, acik]);

  // ── Dialog açma ──────────────────────────────────────────────
  const dialoguAc = (apt) => {
    setSeciliApt(apt);
    setAcik(true);
  };

  // ── Dialog kapama + sıfırlama ────────────────────────────────
  const dialoguKapat = () => {
    setAcik(false);
    setYeniSaat("");
    setSelectedBlocks({});
    setKullanicininDegistirdigiGunler(new Set());
  };

  // ── Saat toggle (blok aç/kapat) ──────────────────────────────
  const saatiToggle = (saat) => {
    const tarihStr = yeniTarih.format("YYYY-MM-DD");

    // Bu günü "kullanıcı değiştirdi" olarak işaretle
    setKullanicininDegistirdigiGunler((prev) => new Set([...prev, tarihStr]));

    setSelectedBlocks((prev) => {
      const mevcutlar = prev[tarihStr] ?? [];
      const guncellenmis = mevcutlar.includes(saat)
        ? mevcutlar.filter((s) => s !== saat) // varsa kaldır → saati aç
        : [...mevcutlar, saat]; // yoksa ekle  → saati bloke et
      return { ...prev, [tarihStr]: guncellenmis };
    });
  };

  // ── Kaydet ───────────────────────────────────────────────────
  const kaydet = async () => {
    setYukleniyor(true);
    let basarili = true;

    const manuelBlokMu = seciliApt?.id === "manual-block";

    if (manuelBlokMu) {
      // Tüm değiştirilmiş günleri DB'ye yaz
      for (const [tarih, saatler] of Object.entries(selectedBlocks)) {
        const sonuc = await saveBatchBlocks(tarih, saatler);
        if (!sonuc.success) basarili = false;
      }
    } else {
      // Randevuyu yeni tarih/saate taşı
      if (!yeniSaat) {
        alert("Lütfen saat seçin");
        setYukleniyor(false);
        return;
      }
      const sonuc = await updateAppointmentDateTime(
        seciliApt.id,
        yeniTarih.format("YYYY-MM-DD"),
        yeniSaat,
        seciliApt.email,
        seciliApt.full_name,
      );
      if (!sonuc.success) {
        alert(sonuc.error);
        basarili = false;
      }
    }

    if (basarili) {
      dialoguKapat();
      onSuccess(); // üst bileşene "veriyi yenile" sinyali gönder
    }

    setYukleniyor(false);
  };

  return {
    // state
    acik,
    seciliApt,
    yeniTarih,
    yeniSaat,
    rezerveSaatler,
    yukleniyor,
    selectedBlocks,
    // aksiyonlar
    dialoguAc,
    dialoguKapat,
    setYeniTarih,
    setYeniSaat,
    saatiToggle,
    kaydet,
  };
}
