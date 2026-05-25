// ─────────────────────────────────────────────────────────────
//  components/IslemMenusu.jsx
//  Randevu satırındaki işlem ikonuna tıklanınca açılan menü.
//  Mevcut duruma göre gereksiz seçenekleri gizler.
// ─────────────────────────────────────────────────────────────

import { Menu, MenuItem } from "@mui/material";

// Her menü seçeneğinin tanımı
const MENU_SECENEKLERI = [
  { durum: "onaylandı", emoji: "✅", label: "Onayla" },
  { durum: "beklemede", emoji: "🔄", label: "Beklemeye Al" },
  { durum: "iptal", emoji: "❌", label: "Reddet" },
  { durum: "silindi", emoji: "🗑️", label: "Sil" },
];

export default function IslemMenusu({
  anchorEl,
  seciliApt,
  onDurumDegistir,
  onKapat,
}) {
  const mevcutDurum = seciliApt?.status?.toLowerCase().trim();

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onKapat}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {MENU_SECENEKLERI.map(({ durum, emoji, label }) => {
        // Randevu zaten bu durumdaysa seçeneği gösterme
        const zatenBuDurumda = mevcutDurum === durum;
        if (zatenBuDurumda) return null;

        return (
          <MenuItem
            key={durum}
            onClick={() => onDurumDegistir(seciliApt, durum)}
          >
            {emoji} {label}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
