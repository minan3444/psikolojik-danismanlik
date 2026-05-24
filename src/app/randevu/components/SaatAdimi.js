"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";

import { calismaSaatleri } from "@/data/randevu-ayarlari";
import { getReservedSlots } from "@/app/actions/appointment";
import dayjs from "dayjs";
import CustomButton from "@/app/shared/customButton";

export default function SaatAdimi({ seciliTarih, onSelect, onBack }) {
  const [loading, setLoading] = useState(true);
  const [doluSaatler, setDoluSaatler] = useState([]);
  const [seciliSaat, setSeciliSaat] = useState("");

  const tarihKey = dayjs(seciliTarih).format("YYYY-MM-DD");

  useEffect(() => {
    async function fetchAvailability() {
      const reserved = await getReservedSlots(tarihKey);
      setDoluSaatler(reserved);
      setLoading(false);
    }
    fetchAvailability();
  }, [tarihKey]);

  const gunIndex = dayjs(seciliTarih).day();
  const temelSaatler =
    gunIndex === 6 ? calismaSaatleri.cumartesi : calismaSaatleri.haftaIci;

  if (loading)
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress size={36} sx={{ mb: 1.5, color: "primary.main" }} />
        <Typography variant="body2" color="text.secondary">
          Müsait saatler kontrol ediliyor...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Görüşme Saatini Seçin
      </Typography>

      <Grid container spacing={1.5} sx={{ justifyContent: "center" }}>
        {temelSaatler.map((saat) => {
          const isFull = (doluSaatler || []).some((s) => s.time === saat);
          return (
            <Grid key={saat} size={{ xs: 4, sm: 3, md: 2.4 }}>
              <Button
                fullWidth
                disabled={isFull}
                variant={seciliSaat === saat ? "contained" : "outlined"}
                onClick={() => setSeciliSaat(saat)}
                sx={{
                  borderRadius: "10px",
                  py: 1,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  fontWeight: 600,
                  transition: "0.2s",
                  color: isFull
                    ? "text.disabled"
                    : seciliSaat === saat
                      ? "white"
                      : "text.primary",
                  borderColor: isFull
                    ? "text.disabled"
                    : seciliSaat === saat
                      ? "primary.main"
                      : "custom.taupe",
                  ...(isFull && {
                    textDecoration: "line-through",
                  }),
                }}
              >
                {saat}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <CustomButton
          variant="outlined"
          onClick={onBack}
          sx={{ border: "none" }}
        >
          🡨 Geri
        </CustomButton>

        <CustomButton
          variant="contained"
          disabled={!seciliSaat}
          onClick={() => onSelect(seciliSaat)}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          Devam Et ➜
        </CustomButton>
      </Box>
    </Box>
  );
}
