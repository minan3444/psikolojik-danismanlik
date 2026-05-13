"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dayjs from "dayjs";
import { createAppointment } from "@/app/actions/appointment";

const ulkeKodlari = [
  { kod: "+90", label: "TR", mask: "5xx xxx xxxx", minLen: 10 },
  { kod: "+1", label: "US", mask: "xxx xxx xxxx", minLen: 10 },
  { kod: "+44", label: "UK", mask: "xxxx xxxxxx", minLen: 10 },
  { kod: "+49", label: "DE", mask: "xxx xxxxxxx", minLen: 10 },
];

export default function BilgiAdimi({
  secimler,
  onBack,
  onSuccess,
  legalDocs = [],
}) {
  const [loading, setLoading] = useState(false);

  const getLegalUrl = (keyword) => {
    const doc = legalDocs?.find((d) => d.slug.includes(keyword));
    return doc ? `/yasal/${doc.slug}` : `/yasal/${keyword}`;
  };

  const handleLinkClick = (e) => e.stopPropagation();

  const [formData, setFormData] = useState({
    adSoyad: "",
    email: "",
    ulkeKodu: "+90",
    telefon: "",
    notlar: "",
  });

  const [errors, setErrors] = useState({ email: false, telefon: false });
  const [onaylar, setOnaylar] = useState({
    aydinlatmaVeCerez: false,
    onamVeSozlesme: false,
    acikRiza: false,
    ticariIleti: false,
  });

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (phone, kod) => {
    const pure = phone.replace(/\D/g, "");
    const config = ulkeKodlari.find((u) => u.kod === kod);
    return pure.length >= (config?.minLen || 7) && pure.length <= 15;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefon") {
      const onlyNums = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, telefon: onlyNums }));
      setErrors((prev) => ({
        ...prev,
        telefon: onlyNums !== "" && !validatePhone(onlyNums, formData.ulkeKodu),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: value !== "" && !validateEmail(value),
      }));
    }
  };

  const handleOnayChange = (e) =>
    setOnaylar({ ...onaylar, [e.target.name]: e.target.checked });

  const canSubmit =
    formData.adSoyad.length > 2 &&
    validateEmail(formData.email) &&
    validatePhone(formData.telefon, formData.ulkeKodu) &&
    onaylar.aydinlatmaVeCerez &&
    onaylar.onamVeSozlesme &&
    onaylar.acikRiza &&
    !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    const result = await createAppointment({
      adSoyad: formData.adSoyad,
      email: formData.email,
      ulkeKodu: formData.ulkeKodu,
      telefon: formData.telefon,
      notlar: formData.notlar,
      service_type: secimler.hizmet?.baslik,
      appointment_date: dayjs(secimler.tarih).format("YYYY-MM-DD"),
      appointment_time: secimler.saat,
    });
    if (result.success) {
      onSuccess();
    } else {
      alert(result.error || "Bir hata oluştu, lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  const currentMask =
    ulkeKodlari.find((u) => u.kod === formData.ulkeKodu)?.mask ||
    "Numaranızı giriniz";

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          textAlign: "center",
        }}
      >
        Randevuyu Onayla
      </Typography>

      <Grid container spacing={2.5}>
        {/* Sol: Özet */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "custom.beige",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "custom.taupe",
              height: "100%",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 1.5, color: "primary.dark" }}
            >
              Seçimleriniz
            </Typography>
            <Box sx={{ mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Görüşme Türü
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {secimler.hizmet?.baslik}
              </Typography>
            </Box>
            <Divider sx={{ my: 1, opacity: 0.5 }} />
            <Box sx={{ mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Tarih ve Saat
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {dayjs(secimler.tarih).format("DD MMMM YYYY")} | {secimler.saat}
              </Typography>
            </Box>
            <Divider sx={{ my: 1, opacity: 0.5 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Ücret / Süre
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {secimler.hizmet?.ucret} | {secimler.hizmet?.sure} Dakika
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Sağ: Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="form" noValidate>
            <TextField
              fullWidth
              size="small"
              label="Adınız Soyadınız *"
              name="adSoyad"
              value={formData.adSoyad}
              onChange={handleChange}
              required
              sx={{ mb: 1.5 }}
            />
            <TextField
              fullWidth
              size="small"
              label="E-posta *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
              sx={{ mb: 1.5 }}
              helperText={
                errors.email ? "Lütfen geçerli bir e-posta giriniz" : ""
              }
            />
            <TextField
              fullWidth
              size="small"
              label="Cep Telefonu *"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              required
              placeholder={currentMask}
              error={errors.telefon}
              sx={{ mb: 1.5 }}
              helperText={errors.telefon ? `Format: ${currentMask}` : ""}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        name="ulkeKodu"
                        value={formData.ulkeKodu}
                        onChange={handleChange}
                        variant="standard"
                        disableUnderline
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          "& .MuiSelect-select": { py: 0, minWidth: "45px" },
                        }}
                      >
                        {ulkeKodlari.map((u) => (
                          <MenuItem key={u.kod} value={u.kod}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {u.label} {u.kod}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Notlarınız"
              name="notlar"
              value={formData.notlar}
              onChange={handleChange}
              multiline
              rows={1}
              sx={{ mb: 1.5 }}
            />

            {/* Yasal onaylar */}
            <FormGroup sx={{ mb: 1.5 }}>
              {[
                {
                  name: "aydinlatmaVeCerez",
                  keyword: "aydinlatma",
                  label: "Aydınlatma Metni",
                },
                {
                  name: "onamVeSozlesme",
                  keyword: "onam",
                  label: "Onam Formu",
                },
                {
                  name: "acikRiza",
                  keyword: "acik-riza",
                  label: "Açık Rıza Metni",
                },
              ].map(({ name, keyword, label }) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      size="small"
                      name={name}
                      checked={onaylar[name]}
                      onChange={handleOnayChange}
                    />
                  }
                  label={
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", lineHeight: 1.1 }}
                    >
                      <Link
                        href={getLegalUrl(keyword)}
                        target="_blank"
                        onClick={handleLinkClick}
                        style={{ color: "inherit", fontWeight: 700 }}
                      >
                        {label}
                      </Link>
                      'ni okudum ve kabul ediyorum. *
                    </Typography>
                  }
                  sx={{ alignItems: "flex-start", mb: 0.2 }}
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
              <Button
                onClick={onBack}
                startIcon={<ArrowBackIcon />}
                sx={{ color: "text.secondary", textTransform: "none" }}
              >
                Geri
              </Button>
              <Button
                variant="contained"
                disabled={!canSubmit}
                onClick={handleSubmit}
                endIcon={<CheckCircleIcon />}
                sx={{
                  borderRadius: "50px",
                  px: 3,
                  py: 1.2,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(124,158,135,0.2)",
                }}
              >
                {loading ? "İşleniyor..." : "Randevuyu Onayla"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
