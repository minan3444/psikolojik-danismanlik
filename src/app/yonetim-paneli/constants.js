// ─────────────────────────────────────────────────────────────
//  constants.js
//  Sabit veriler ve saf (state'siz) yardımcı fonksiyonlar.
//  Hiçbir React importu yoktur — sadece data ve logic.
// ─────────────────────────────────────────────────────────────

import { calismaSaatleri } from "@/data/randevu-ayarlari";

// Her randevu durumunun görsel karşılığı
export const STATUS_CONFIG = {
  beklemede: { color: "warning", label: "Bekleyen" },
  onaylandı: { color: "success", label: "Aktif" },
  iptal: { color: "error", label: "Reddedildi" },
  silindi: { color: "default", label: "Silindi" },
  bloke: { color: "default", label: "Bloke", variant: "outlined" },
};

// Seçilen tarihe göre çalışılabilir saatleri döndürür
// 0 = Pazar → boş,  6 = Cumartesi → cumartesi saatleri,  diğer → hafta içi
export const getAvailableHours = (date) => {
  const gun = date.day();
  if (gun === 0) return [];
  return gun === 6 ? calismaSaatleri.cumartesi : calismaSaatleri.haftaIci;
};

// Randevuları durumlarına göre filtreler
export const filterByStatus = (appointments, statusList) =>
  appointments.filter((a) =>
    statusList.includes(a.status?.toLowerCase().trim()),
  );
