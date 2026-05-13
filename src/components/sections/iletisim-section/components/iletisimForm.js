"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { MuiTelInput } from "mui-tel-input";
import { sendContactEmail } from "@/app/actions/contact";
import { scrollAnimation } from "@/app/shared/scrollAnimation";

// ─── Sabitler ────────────────────────────────────────────────────────────────

const MotionBox = motion.create(Box);

const inputSx = {
  mb: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
    bgcolor: "background.paper",
    fontSize: "0.85rem",
    "& fieldset": { borderColor: "rgba(0,0,0,0.08)" },
  },
  "& .MuiInputLabel-root": { fontSize: "0.85rem" },
};

const ILETISIM_SECENEKLERI = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telefon", label: "Telefon" },
  { value: "email", label: "E-posta" },
];

const BILGI_KUTULARI = [
  { ikon: LocationOnOutlinedIcon, t: "Konum", d: "Online" },
  { ikon: EmailOutlinedIcon, t: "E-posta", d: "pdseymainan@gmail.com" },
  { ikon: AccessTimeOutlinedIcon, t: "Saat", d: "09:00 - 20:00" },
];

// ─── Alt Bileşenler ───────────────────────────────────────────────────────────

function BasariBilgisi({ onReset }) {
  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Mesajınız İletildi 🌿
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        En kısa sürede size dönüş yapacağım.
      </Typography>
      <Button onClick={onReset} variant="outlined">
        Yeni Mesaj Gönder
      </Button>
    </Box>
  );
}

function BilgiKutusu({ ikon: Ikon, t, d }) {
  return (
    <Grid size={{ xs: 4 }}>
      <Box
        sx={{
          textAlign: "center",
          p: 0.8,
          borderRadius: 2,
          bgcolor: "#9e7c93",
        }}
      >
        <Ikon sx={{ color: "white", fontSize: 18, mb: 0.2 }} />
        <Typography
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: "0.65rem",
            display: "block",
          }}
        >
          {t}
        </Typography>
        <Typography sx={{ color: "white", fontSize: "0.7rem", opacity: 0.8 }}>
          {d}
        </Typography>
      </Box>
    </Grid>
  );
}

// ─── Ana Bileşen ──────────────────────────────────────────────────────────────

export default function IletisimForm({ legalDocs = [] }) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getLegalUrl = (keyword) => {
    const doc = legalDocs?.find((d) => d.slug.includes(keyword));
    return doc ? `/yasal/${doc.slug}` : `/yasal/${keyword}-metni`;
  };

  // Linke tıklayınca checkbox'ın işaretlenmesini önleyen fonksiyon
  const stopProp = (e) => e.stopPropagation();

  const legalLink = (slug, text) => (
    <Link
      href={getLegalUrl(slug)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stopProp}
      onMouseDown={stopProp}
      style={{ color: "inherit", fontWeight: 700 }}
    >
      {text}
    </Link>
  );

  // react-hook-form: handleChange, errors state ve validateEmail'in yerini alır
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      adSoyad: "",
      email: "",
      telefon: "",
      iletisimTercihi: "",
      mesaj: "",
      aydinlatmaVeCerez: false,
      onamVeSozlesme: false,
      acikRiza: false,
      ticariIleti: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { adSoyad, email, telefon, iletisimTercihi, mesaj } = data;
    const result = await sendContactEmail({
      adSoyad,
      email,
      telefon,
      iletisimTercihi,
      mesaj,
    });
    if (result.success) {
      setIsSuccess(true);
      reset();
    } else alert(result.error);
    setLoading(false);
  };

  // Onay checkbox listesi — label'lar legalLink'e bağımlı
  const onayListesi = [
    {
      name: "aydinlatmaVeCerez",
      required: true,
      label: (
        <>
          {legalLink("aydinlatma", "Aydınlatma Metni")}
          {"'ni ve "}
          {legalLink("cerez", "Çerez Politikası")}
          {"'nı okudum. *"}
        </>
      ),
    },
    {
      name: "onamVeSozlesme",
      required: true,
      label: (
        <>
          {legalLink("kullanim", "Kullanım Koşulları")}
          {" ve "}
          {legalLink("onam", "Onam Formu")}
          {"'nu kabul ediyorum. *"}
        </>
      ),
    },
    {
      name: "acikRiza",
      required: true,
      label: (
        <>
          Verilerimin işlenmesine dair{" "}
          {legalLink("acik-riza", "Açık Rıza Metni")}
          {"'ni onaylıyorum. *"}
        </>
      ),
    },
    {
      name: "ticariIleti",
      required: false,
      label: (
        <>
          Bilgilendirme içerikleri için {legalLink("ticari", "İleti Onayı")}{" "}
          veriyorum. *
        </>
      ),
    },
  ];

  return (
    <>
      {/* ── Form Kartı ── */}
      <MotionBox
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          mb: 1,
        }}
      >
        {isSuccess ? (
          <BasariBilgisi onReset={() => setIsSuccess(false)} />
        ) : (
          <Grid
            container
            spacing={1.5}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Ad Soyad */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Ad Soyad *"
                sx={inputSx}
                {...register("adSoyad", { required: true, minLength: 3 })}
                error={!!errors.adSoyad}
              />
            </Grid>

            {/* E-posta */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="E-posta *"
                sx={inputSx}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                error={!!errors.email}
                helperText={errors.email ? "Hatalı e-posta" : ""}
              />
            </Grid>

            {/* Telefon — Controller gerekli çünkü MuiTelInput uncontrolled değil */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="telefon"
                control={control}
                rules={{ required: true, minLength: 9 }}
                render={({ field }) => (
                  <MuiTelInput
                    fullWidth
                    size="small"
                    label="Telefon *"
                    defaultCountry="TR"
                    forceCallingCode
                    error={!!errors.telefon}
                    sx={{
                      ...inputSx,
                      "& .MuiOutlinedInput-root": {
                        ...inputSx["& .MuiOutlinedInput-root"],
                        paddingLeft: 1,
                      },
                    }}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* İletişim Tercihi */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small" sx={inputSx}>
                <InputLabel id="iletisim-tercihi-label">
                  İletişim Tercihi
                </InputLabel>
                <Select
                  labelId="iletisim-tercihi-label"
                  label="İletişim Tercihi"
                  defaultValue=""
                  {...register("iletisimTercihi")}
                  MenuProps={{
                    disableScrollLock: true,
                    slotProps: {
                      paper: {
                        sx: {
                          borderRadius: 2,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        },
                      },
                    },
                  }}
                >
                  {ILETISIM_SECENEKLERI.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Mesaj */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Mesajınız *"
                multiline
                rows={2}
                sx={inputSx}
                {...register("mesaj")}
              />
            </Grid>

            {/* Onay Checkbox'ları */}
            <Grid size={{ xs: 12 }}>
              <FormGroup sx={{ gap: 0.5 }}>
                {onayListesi.map(({ name, required, label }) => (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={{ required }}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            sx={{ color: "primary.main" }}
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                          >
                            {label}
                          </Typography>
                        }
                      />
                    )}
                  />
                ))}
              </FormGroup>
            </Grid>

            {/* Gönder Butonu */}
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ borderRadius: "50px", fontWeight: 700 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "MESAJI GÖNDER"
                )}
              </Button>
            </Grid>
          </Grid>
        )}
      </MotionBox>

      {/* ── Bilgi Kutuları (Konum / E-posta / Saat) ── */}
      <Grid container spacing={1}>
        {BILGI_KUTULARI.map((item, i) => (
          <BilgiKutusu key={i} {...item} />
        ))}
      </Grid>
    </>
  );
}
