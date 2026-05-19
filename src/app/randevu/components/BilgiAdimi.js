"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MuiTelInput } from "mui-tel-input";
import dayjs from "dayjs";
import { createAppointment } from "@/app/actions/appointment";
import CustomButton from "@/app/shared/customButton";

const ONAYLAR = [
  {
    name: "aydinlatmaVeCerez",
    slug: "aydinlatma",
    text: "Aydınlatma Metni",
    suffix: "'ni okudum ve kabul ediyorum. *",
  },
  {
    name: "onamVeSozlesme",
    slug: "onam",
    text: "Onam Formu",
    suffix: "'nu okudum ve kabul ediyorum. *",
  },
  {
    name: "acikRiza",
    slug: "acik-riza",
    text: "Açık Rıza Metni",
    prefix: "Verilerimin işlenmesine dair ",
    suffix: "'ni onaylıyorum. *",
  },
];

export default function BilgiAdimi({
  secimler,
  onBack,
  onSuccess,
  legalDocs = [],
}) {
  const [loading, setLoading] = useState(false);

  const getLegalUrl = (slug) => {
    const doc = legalDocs?.find((d) => d.slug.includes(slug));
    return doc ? `/yasal/${doc.slug}` : `/yasal/${slug}`;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      adSoyad: "",
      email: "",
      telefon: "",
      notlar: "",
      aydinlatmaVeCerez: false,
      onamVeSozlesme: false,
      acikRiza: false,
    },
  });

  const onSubmit = async ({ adSoyad, email, telefon, notlar }) => {
    setLoading(true);
    const result = await createAppointment({
      adSoyad,
      email,
      telefon,
      notlar,
      service_type: secimler.hizmet?.baslik,
      appointment_date: dayjs(secimler.tarih).format("YYYY-MM-DD"),
      appointment_time: secimler.saat,
    });
    result.success
      ? onSuccess()
      : alert(result.error || "Bir hata oluştu, lütfen tekrar deneyin.");
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Randevuyu Onayla
      </Typography>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 3,
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Randevu Özeti
            </Typography>
            {[
              { label: "Görüşme Türü", value: secimler.hizmet?.baslik },
              {
                label: "Tarih ve Saat",
                value: `${dayjs(secimler.tarih).format("DD MMMM YYYY")} | ${secimler.saat}`,
              },
              {
                label: "Ücret / Süre",
                value: `${secimler.hizmet?.ucret} | ${secimler.hizmet?.sure} Dakika`,
              },
            ].map(({ label, value }, i) => (
              <Box key={label}>
                {i > 0 && <Divider sx={{ my: 1, opacity: 0.5 }} />}
                <Typography variant="caption">{label}</Typography>
                <Typography variant="body2">{value}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              size="small"
              label="Adınız Soyadınız *"
              sx={{ mb: 1.5 }}
              error={!!errors.adSoyad}
              helperText={errors.adSoyad ? "En az 3 karakter giriniz" : ""}
              {...register("adSoyad", { required: true, minLength: 3 })}
            />

            <TextField
              fullWidth
              size="small"
              label="E-posta *"
              sx={{ mb: 1.5 }}
              error={!!errors.email}
              helperText={errors.email ? "Geçerli bir e-posta giriniz" : ""}
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />

            <Controller
              name="telefon"
              control={control}
              rules={{
                required: true,
                validate: (v) => v.replace(/\D/g, "").length >= 10,
              }}
              render={({ field }) => (
                <MuiTelInput
                  fullWidth
                  size="small"
                  label="Cep Telefonu *"
                  defaultCountry="TR"
                  forceCallingCode
                  error={!!errors.telefon}
                  helperText={
                    errors.telefon ? "Geçerli bir telefon numarası giriniz" : ""
                  }
                  sx={{
                    mb: 1.5,
                    "& .MuiOutlinedInput-root": { paddingLeft: 1 },
                  }}
                  {...field}
                />
              )}
            />

            <TextField
              fullWidth
              size="small"
              label="Notlarınız"
              multiline
              rows={1}
              sx={{ mb: 1.5 }}
              {...register("notlar")}
            />

            <FormGroup sx={{ mb: 1.5, gap: 0.5 }}>
              {ONAYLAR.map(({ name, slug, text, prefix, suffix }) => (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControlLabel
                      sx={{ alignItems: "flex-start" }}
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value}
                          onChange={field.onChange}
                          sx={{
                            color: errors[name] ? "error.main" : "primary.main",
                            pt: "2px",
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="caption"
                          sx={{
                            color: errors[name]
                              ? "error.main"
                              : "text.secondary",
                          }}
                        >
                          {prefix}
                          <Link
                            href={getLegalUrl(slug)}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: "inherit", fontWeight: 700 }}
                          >
                            {text}
                          </Link>
                          {suffix}
                        </Typography>
                      }
                    />
                  )}
                />
              ))}
            </FormGroup>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomButton
                variant="outlined"
                onClick={onBack}
                startIcon={<ArrowBackIcon />}
                sx={{ border: "none" }}
              >
                Geri
              </CustomButton>
              <CustomButton
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={loading ? null : <CheckCircleIcon />}
                sx={{
                  color: "white",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Randevuyu Onayla"
                )}
              </CustomButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
