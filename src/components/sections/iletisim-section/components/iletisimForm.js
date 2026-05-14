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

// Sabitler
const MotionBox = motion.create(Box);

const INPUT_SX = {
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

// Alt Bileşenler
const BasariBilgisi = ({ onReset }) => (
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

const BilgiKutusu = ({ ikon: I, t, d }) => (
  <Grid size={{ xs: 4 }}>
    <Box
      sx={{ textAlign: "center", p: 0.8, borderRadius: 3, bgcolor: "#9e7c93" }}
    >
      <I sx={{ color: "white", fontSize: 18, mb: 0.2 }} />
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

// Ana Bileşen
export default function IletisimForm({ legalDocs = [] }) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getLegalUrl = (keyword) => {
    const doc = legalDocs?.find((d) => d.slug.includes(keyword));
    return doc ? `/yasal/${doc.slug}` : `/yasal/${keyword}-metni`;
  };

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

  // Form
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
    const result = await sendContactEmail(data);
    if (result.success) {
      setIsSuccess(true);
      reset();
    } else alert(result.error);
    setLoading(false);
  };

  // Onay checkbox listesi
  const onayListesi = [
    {
      name: "aydinlatmaVeCerez",
      req: true,
      label: (
        <>
          {legalLink("aydinlatma", "Aydınlatma Metni")}'ni ve{" "}
          {legalLink("cerez", "Çerez Politikası")}'nı okudum. *
        </>
      ),
    },
    {
      name: "onamVeSozlesme",
      req: true,
      label: (
        <>
          {legalLink("kullanim", "Kullanım Koşulları")} ve{" "}
          {legalLink("onam", "Onam Formu")}'nu kabul ediyorum. *
        </>
      ),
    },
    {
      name: "acikRiza",
      req: true,
      label: (
        <>
          Verilerimin işlenmesine dair{" "}
          {legalLink("acik-riza", "Açık Rıza Metni")}'ni onaylıyorum. *
        </>
      ),
    },
    {
      name: "ticariIleti",
      req: false,
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
      {/* Form Kartı */}
      <MotionBox
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Ad Soyad *"
                sx={INPUT_SX}
                {...register("adSoyad", { required: true, minLength: 3 })}
                error={!!errors.adSoyad}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="E-posta *"
                sx={INPUT_SX}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                error={!!errors.email}
                helperText={errors.email ? "Hatalı e-posta" : ""}
              />
            </Grid>

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
                      ...INPUT_SX,
                      "& .MuiOutlinedInput-root": {
                        ...INPUT_SX["& .MuiOutlinedInput-root"],
                        paddingLeft: 1,
                      },
                    }}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small" sx={INPUT_SX}>
                <InputLabel>İletişim Tercihi</InputLabel>
                <Select
                  label="İletişim Tercihi"
                  defaultValue=""
                  {...register("iletisimTercihi")}
                  MenuProps={{
                    disableScrollLock: true,
                    slotProps: {
                      paper: {
                        sx: {
                          borderRadius: 3,
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

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Mesajınız *"
                multiline
                rows={2}
                sx={INPUT_SX}
                {...register("mesaj")}
              />
            </Grid>

            {/* Onay Checkbox'ları */}
            <Grid size={{ xs: 12 }}>
              <FormGroup sx={{ gap: 0.5 }}>
                {onayListesi.map(({ name, req, label }) => (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={{ required: req }}
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

      {/* Bilgi Kutuları */}
      <Grid container spacing={1}>
        {BILGI_KUTULARI.map((item, i) => (
          <BilgiKutusu key={i} {...item} />
        ))}
      </Grid>
    </>
  );
}
