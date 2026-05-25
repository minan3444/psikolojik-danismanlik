"use client";

import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import CustomButton from "@/app/shared/customButton";

export default function TakvimAdimi({ onSelect, onBack }) {
  const [value, setValue] = useState(dayjs().add(1, "day"));

  const shouldDisableDate = (date) => date.day() === 0;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Görüşme Gününü Belirleyin
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "transparent",
            // Takvim iç boşluklarını küçült
            "& .MuiDateCalendar-root": { height: "auto" },
            "& .MuiPickersCalendarHeader-root": { mt: 0.5, mb: 0 },
            "& .MuiDayCalendar-slideTransition": { minHeight: "200px" },
            "& .MuiPickersDay-root": {
              width: 34,
              height: 34,
              fontSize: "0.8rem",
            },
          }}
        >
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            shouldDisableDate={shouldDisableDate}
            disablePast
            slotProps={{
              actionBar: { sx: { display: "none" } },
              toolbar: { sx: { display: "none" } },
              // 🔧 EKLENEN KISIM: Header'daki ay yazısını küçültüp oklara yer açıyoruz
              calendarHeader: {
                sx: {
                  "& .MuiTypography-root": {
                    fontSize: { xs: "0.9rem", sm: "1rem" }, // Mobilde fontu küçülttük
                    flexShrink: 1, // Gerekirse metin sığışsın
                  },
                },
              },
            }}
          />
        </Paper>
      </LocalizationProvider>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <CustomButton
          variant="outlined"
          onClick={onBack}
          sx={{ border: "none" }}
        >
          🡨 Geri
        </CustomButton>

        <CustomButton
          onClick={() => onSelect(value.toDate())}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          Saat Seçimine Geç ➜
        </CustomButton>
      </Box>
    </Box>
  );
}
