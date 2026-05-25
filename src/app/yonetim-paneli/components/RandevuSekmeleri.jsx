// ─────────────────────────────────────────────────────────────
//  components/RandevuSekmeleri.jsx
//  Bekleyen / Aktif / Geçmiş sekmelerini gösterir.
//  Her sekmede kaç kayıt olduğunu badge ile belirtir.
// ─────────────────────────────────────────────────────────────

import { Tabs, Tab, Badge, useMediaQuery, useTheme } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HistoryIcon from "@mui/icons-material/History";

export default function RandevuSekmeleri({
  aktifSekme,
  onChange,
  bekleyenSayisi,
  aktifSayisi,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Tabs
      value={aktifSekme}
      onChange={(_, yeniDeger) => onChange(yeniDeger)}
      variant={isMobile ? "fullWidth" : "standard"}
      sx={{ mb: 3 }}
    >
      <Tab
        label="Bekleyen"
        iconPosition="start"
        icon={
          <Badge badgeContent={bekleyenSayisi} color="error">
            <NotificationsActiveIcon />
          </Badge>
        }
      />
      <Tab
        label="Aktif"
        iconPosition="start"
        icon={
          <Badge badgeContent={aktifSayisi} color="primary">
            <EventAvailableIcon />
          </Badge>
        }
      />
      <Tab label="Geçmiş" iconPosition="start" icon={<HistoryIcon />} />
    </Tabs>
  );
}
