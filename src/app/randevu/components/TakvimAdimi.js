"use client";

import { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
            border: "1px solid",
            borderColor: "custom.taupe",
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
            }}
          />
        </Paper>
      </LocalizationProvider>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>
        <CustomButton
          variant="outlined"
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          sx={{ color: "text.secondary", border: "none" }}
        >
          Geri
        </CustomButton>

        <CustomButton
          variant="contained"
          onClick={() => onSelect(value.toDate())}
          sx={{
            color: "white",
          }}
        >
          Saat Seçimine Geç →
        </CustomButton>
      </Box>
    </Box>
  );
}
