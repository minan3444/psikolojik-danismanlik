"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Button,
  Tooltip,
  CircularProgress,
  Stack,
  Tabs,
  Tab,
  Badge,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calismaSaatleri } from "@/data/randevu-ayarlari";
import {
  getAllAppointments,
  updateAppointmentStatus,
  updateAppointmentDateTime,
  saveBatchBlocks,
} from "@/app/actions/admin";
import { getReservedSlots } from "@/app/actions/appointment";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HistoryIcon from "@mui/icons-material/History";
import RefreshIcon from "@mui/icons-material/Refresh";
import BlockIcon from "@mui/icons-material/Block";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";

// ─── Sabitler ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  beklemede: { color: "warning", label: "Bekleyen" },
  onaylandı: { color: "success", label: "Aktif" },
  iptal: { color: "error", label: "Reddedildi" },
  silindi: { color: "default", label: "Silindi" },
  bloke: { color: "default", label: "Bloke", variant: "outlined" },
};

// ─── Yardımcılar ─────────────────────────────────────────────────────────────

const getStatusChip = (status) => {
  const s = status?.toLowerCase().trim();
  const config = STATUS_CONFIG[s] || STATUS_CONFIG.beklemede;
  return (
    <Chip
      size="small"
      label={config.label}
      color={config.color}
      variant={config.variant || "filled"}
      sx={{ fontWeight: 700, fontSize: "0.65rem" }}
    />
  );
};

const getAvailableHours = (date) => {
  const day = date.day();
  if (day === 0) return [];
  return day === 6 ? calismaSaatleri.cumartesi : calismaSaatleri.haftaIci;
};

// ─── Alt bileşen: Randevu tablosu ────────────────────────────────────────────

function RandevuTablosu({ data, onAction }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid",
        borderColor: "custom.taupe",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {[
              "Danışan",
              "Tarih / Saat",
              "Durum",
              "Mesaj",
              "İletişim",
              "İşlemler",
            ].map((h) => (
              <TableCell
                key={h}
                align={h === "İşlemler" ? "right" : "left"}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((apt) => (
              <TableRow key={apt.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {apt.full_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {apt.service_type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {dayjs(apt.appointment_date).format("DD MMM YYYY")}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "primary.main", fontWeight: 700 }}
                  >
                    {apt.appointment_time}
                  </Typography>
                </TableCell>
                <TableCell>{getStatusChip(apt.status)}</TableCell>
                <TableCell sx={{ maxWidth: 150 }}>
                  {apt.notes ? (
                    <Tooltip title={apt.notes} arrow>
                      <ChatBubbleOutlinedIcon
                        sx={{
                          fontSize: 18,
                          color: "primary.main",
                          cursor: "help",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", fontWeight: 600 }}
                  >
                    {apt.phone}
                  </Typography>
                  <Typography variant="caption">{apt.email}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => onAction(e, apt)}>
                    <EventAvailableIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                Bu kategoride kayıt bulunamadı.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ─── Ana bileşen ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // — Randevu state —
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [actionId, setActionId] = useState(null);

  // — Menü state —
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApt, setSelectedApt] = useState(null);

  // — Dialog state —
  const [openReschedule, setOpenReschedule] = useState(false);
  const [newDate, setNewDate] = useState(dayjs());
  const [newTime, setNewTime] = useState("");
  const [reservedSlots, setReservedSlots] = useState([]);

  /**
   * selectedBlocks  : { [dateStr]: string[] }
   *   Her gün için KAYDEDILECEK bloke saatleri.
   *   Boş array → o günün tüm blokları kaldır.
   *
   * userModifiedDates: Set<string>
   *   Kullanıcının bu oturumda MANUEL DEĞİŞTİRDİĞİ günler.
   *   Bu günler useEffect tarafından DB verisiyle EZİLMEZ.
   *   Race condition'ı önler.
   */
  const [selectedBlocks, setSelectedBlocks] = useState({});
  const [userModifiedDates, setUserModifiedDates] = useState(new Set());

  // ── Veri yükleme ────────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllAppointments();
      setAppointments(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {}, []);
  /**
   * Gün değiştiğinde veya dialog açıldığında o günün slotlarını çek.
   * Kullanıcı o günü zaten değiştirdiyse (userModifiedDates'te varsa)
   * selectedBlocks'a dokunma — sadece reservedSlots'u güncelle (görsel için).
   */
  useEffect(() => {
    if (!openReschedule) return;

    const dateStr = newDate.format("YYYY-MM-DD");

    const fetchSlots = async () => {
      const slots = await getReservedSlots(dateStr);
      setReservedSlots(slots);

      // Kullanıcı bu günü değiştirmediyse DB'deki blokları yükle
      setSelectedBlocks((prev) => {
        if (userModifiedDates.has(dateStr)) return prev;
        const dbBlocked = slots
          .filter((s) => s.status === "bloke")
          .map((s) => s.time);
        return { ...prev, [dateStr]: dbBlocked };
      });
    };

    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDate, openReschedule]);

  // ── Filtreli listeler ────────────────────────────────────────────────────────

  const pendingApts = useMemo(
    () =>
      appointments.filter(
        (a) => a.status?.toLowerCase().trim() === "beklemede",
      ),
    [appointments],
  );
  const activeApts = useMemo(
    () =>
      appointments.filter(
        (a) => a.status?.toLowerCase().trim() === "onaylandı",
      ),
    [appointments],
  );
  const historyApts = useMemo(
    () =>
      appointments.filter((a) =>
        ["iptal", "silindi", "bloke"].includes(a.status?.toLowerCase().trim()),
      ),
    [appointments],
  );

  // ── Handler'lar ──────────────────────────────────────────────────────────────

  const handleStatusChange = async (apt, status) => {
    setAnchorEl(null);
    if (!apt) return;
    if (status === "silindi" && !confirm("Arşive taşınacak. Emin misiniz?"))
      return;

    setActionId(apt.id);
    const res = await updateAppointmentStatus(apt, status);
    if (res.success) {
      setAppointments((prev) =>
        prev.map((item) => (item.id === apt.id ? { ...item, status } : item)),
      );
      refreshData();
    }
    setActionId(null);
    setSelectedApt(null);
  };

  /**
   * Saat toggle:
   * - Seçiliyse → kaldır (bloke aç)
   * - Değilse   → ekle  (bloke kapat)
   * Her iki durumda da bu günü userModifiedDates'e ekle
   * böylece useEffect bu günü DB'den yeniden yüklemez.
   */
  const handleHourToggle = (saat) => {
    const dateStr = newDate.format("YYYY-MM-DD");

    // Bu günü "kullanıcı değiştirdi" olarak işaretle
    setUserModifiedDates((prev) => new Set([...prev, dateStr]));

    setSelectedBlocks((prev) => {
      const current = prev[dateStr] ?? [];
      const updated = current.includes(saat)
        ? current.filter((s) => s !== saat) // bloke kaldır (aç)
        : [...current, saat]; // bloke ekle (kapat)
      return { ...prev, [dateStr]: updated };
    });
  };

  const handleDialogClose = () => {
    setOpenReschedule(false);
    setNewTime("");
    setSelectedBlocks({});
    setUserModifiedDates(new Set()); // oturum bitti, sıfırla
  };

  /**
   * Kaydet:
   * - Manuel blok: selectedBlocks'taki TÜM günleri DB'ye yaz
   *   (boş array → o günün blokları silinir = açılır)
   * - Randevu yeniden zamanlama: sadece yeni tarih/saat yaz
   */
  const handleRescheduleSubmit = async () => {
    setActionId("loading");
    let allSuccess = true;

    if (selectedApt?.id === "manual-block") {
      for (const [date, times] of Object.entries(selectedBlocks)) {
        const res = await saveBatchBlocks(date, times);
        if (!res.success) allSuccess = false;
      }
    } else {
      if (!newTime) {
        alert("Lütfen saat seçin");
        setActionId(null);
        return;
      }
      const res = await updateAppointmentDateTime(
        selectedApt.id,
        newDate.format("YYYY-MM-DD"),
        newTime,
        selectedApt.email,
        selectedApt.full_name,
      );
      if (!res.success) {
        alert(res.error);
        allSuccess = false;
      }
    }

    if (allSuccess) {
      handleDialogClose();
      refreshData();
    }
    setActionId(null);
  };

  // ── Render yardımcıları ──────────────────────────────────────────────────────

  const renderMenuItems = () => {
    if (!selectedApt) return null;
    const s = selectedApt.status?.toLowerCase().trim();
    return (
      <>
        {s !== "onaylandı" && (
          <MenuItem
            onClick={() => handleStatusChange(selectedApt, "onaylandı")}
          >
            ✅ Onayla
          </MenuItem>
        )}
        {s !== "beklemede" && (
          <MenuItem
            onClick={() => handleStatusChange(selectedApt, "beklemede")}
          >
            🔄 Beklemeye Al
          </MenuItem>
        )}
        {s !== "iptal" && (
          <MenuItem onClick={() => handleStatusChange(selectedApt, "iptal")}>
            ❌ Reddet
          </MenuItem>
        )}
        <MenuItem onClick={() => handleStatusChange(selectedApt, "silindi")}>
          🗑️ Sil{" "}
        </MenuItem>
      </>
    );
  };

  const currentDateStr = newDate.format("YYYY-MM-DD");
  const currentDayBlocks = selectedBlocks[currentDateStr] ?? [];
  const availableHours = getAvailableHours(newDate);
  const isManualBlock = selectedApt?.id === "manual-block";
  const activeTab =
    tabValue === 0 ? pendingApts : tabValue === 1 ? activeApts : historyApts;

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
        {/* Başlık */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 4 }}
        >
          <Typography variant="h4">Yönetici Paneli</Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={<BlockIcon />}
              onClick={() => {
                setSelectedApt({ id: "manual-block" });
                setOpenReschedule(true);
              }}
              sx={{
                borderRadius: "50px",
                textTransform: "none",
                px: 3,
                display: { xs: "none", sm: "flex" },
              }}
            >
              Müsaitlik Yönet
            </Button>
            {/* <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refreshData}
              disabled={loading}
              sx={{ borderRadius: "50px" }}
            >
              Yenile
            </Button> */}
          </Stack>
        </Stack>

        {/* Sekmeler */}
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{ mb: 3 }}
        >
          <Tab
            icon={
              <Badge badgeContent={pendingApts.length} color="error">
                <NotificationsActiveIcon />
              </Badge>
            }
            iconPosition="start"
            label="Bekleyen"
          />
          <Tab
            icon={
              <Badge badgeContent={activeApts.length} color="primary">
                <EventAvailableIcon />
              </Badge>
            }
            iconPosition="start"
            label="Aktif"
          />
          <Tab icon={<HistoryIcon />} iconPosition="start" label="Geçmiş" />
        </Tabs>

        {/* Tablo */}
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <RandevuTablosu
              data={activeTab}
              onAction={(e, apt) => {
                setAnchorEl(e.currentTarget);
                setSelectedApt(apt);
              }}
            />
          )}
        </Box>

        {/* İşlem menüsü */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          disableScrollLock
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {renderMenuItems()}
        </Menu>

        {/* Blok / Yeniden zamanlama dialog */}
        <Dialog
          open={openReschedule}
          onClose={handleDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
          >
            {isManualBlock ? "Müsaitlik Yönetimi" : "Randevuyu Yeniden Zamanla"}
          </DialogTitle>

          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
              >
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={newDate}
                  onChange={(d) => {
                    setNewDate(d);
                    setNewTime("");
                  }}
                  slotProps={{
                    actionBar: { sx: { display: "none" } },
                    toolbar: { sx: { display: "none" } },
                  }}
                />

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  {isManualBlock
                    ? "🟥 Kırmızı = Kapalı  |  Tıkla aç/kapat  |  Kaydet'e bas"
                    : "Yeni saat seçin"}
                </Typography>

                <Grid container spacing={1}>
                  {availableHours.map((saat) => {
                    const slot = reservedSlots.find((s) => s.time === saat);
                    const isBooked =
                      slot?.status === "onaylandı" ||
                      slot?.status === "beklemede";
                    const isBlocked = isManualBlock
                      ? currentDayBlocks.includes(saat)
                      : newTime === saat;

                    return (
                      <Grid size={{ xs: 3 }} key={saat}>
                        <Button
                          fullWidth
                          size="small"
                          variant={isBlocked ? "contained" : "outlined"}
                          color={
                            isManualBlock && isBlocked ? "error" : "primary"
                          }
                          disabled={isBooked}
                          onClick={() =>
                            isManualBlock
                              ? handleHourToggle(saat)
                              : setNewTime(saat)
                          }
                          sx={{
                            fontSize: "0.7rem",
                            py: 0.5,
                            ...(isBooked && {
                              textDecoration: "line-through",
                              opacity: 0.4,
                            }),
                          }}
                        >
                          {saat}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </LocalizationProvider>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleDialogClose}>İptal</Button>
            <Button
              variant="contained"
              disabled={actionId === "loading"}
              onClick={handleRescheduleSubmit}
              sx={{ borderRadius: "50px", px: 3 }}
            >
              {actionId === "loading"
                ? "Kaydediliyor..."
                : "Değişiklikleri Kaydet"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
