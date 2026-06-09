// ─────────────────────────────────────────────────────────────
//  components/RandevuTablosu.jsx
//  Randevuları liste halinde gösterir.
//  Veri ve tıklama aksiyonu dışarıdan prop olarak gelir.
// ─────────────────────────────────────────────────────────────

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import dayjs from "dayjs";
import { STATUS_CONFIG } from "../constants";

// Tablo sütun başlıkları
const SUTUNLAR = [
  "Danışan",
  "Tarih / Saat",
  "Durum",
  "Mesaj",
  "İletişim",
  "İşlemler",
];

// Duruma göre renkli etiket
function StatusChip({ status }) {
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
}

// Tek bir randevu satırı
function RandevuSatiri({ apt, onIslemTiklandi }) {
  return (
    <TableRow hover>
      {/* Danışan adı + hizmet türü */}
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {apt.full_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {apt.service_type}
        </Typography>
      </TableCell>

      {/* Tarih + saat */}
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

      {/* Durum etiketi */}
      <TableCell>
        <StatusChip status={apt.status} />
      </TableCell>

      {/* Mesaj varsa ikon, yoksa tire */}
      <TableCell sx={{ maxWidth: 150 }}>
        {apt.notes ? (
          <Tooltip title={apt.notes} arrow>
            <ChatBubbleOutlinedIcon
              sx={{ fontSize: 18, color: "primary.main", cursor: "help" }}
            />
          </Tooltip>
        ) : (
          "-"
        )}
      </TableCell>

      {/* Telefon + e-posta */}
      <TableCell>
        <Typography
          variant="caption"
          sx={{ display: "block", fontWeight: 600 }}
        >
          {apt.phone}
        </Typography>
        <Typography variant="caption">{apt.email}</Typography>
      </TableCell>

      {/* İşlem butonu */}
      <TableCell align="right">
        <IconButton onClick={(e) => onIslemTiklandi(e, apt)}>
          <EventAvailableIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// Ana tablo bileşeni
export default function RandevuTablosu({ data, onIslemTiklandi }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid",
        borderColor: "custom.taupe",
        borderRadius: 3,
        overflow: "auto",
      }}
    >
      <Table size="small" sx={{ minWidth: 650 }}>
        {/* Başlık satırı */}
        <TableHead>
          <TableRow>
            {SUTUNLAR.map((baslik) => (
              <TableCell
                key={baslik}
                align={baslik === "İşlemler" ? "right" : "left"}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {baslik}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Veri satırları */}
        <TableBody>
          {data.length > 0 ? (
            data.map((apt) => (
              <RandevuSatiri
                key={apt.id}
                apt={apt}
                onIslemTiklandi={onIslemTiklandi}
              />
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
