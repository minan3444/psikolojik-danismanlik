"use client";

import { useState } from "react";
import {
  Box,
  Container,
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
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SectionBaslik from "@/components/ui/SectionBaslik";
import { MuiTelInput } from "mui-tel-input"; // Import edildiğinden emin ol
import { sendContactEmail } from "@/app/actions/contact"; // Yeni action

const MotionBox = motion.create(Box);

const scrollAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

// 'legalDocs' prop'u eklendi
export default function IletisimSection({ legalDocs = [] }) {
  
  // Sanity slug'larını eşleştiren yardımcı fonksiyon
  const getLegalUrl = (keyword) => {
    // Sanity'den gelen veriler içinde anahtar kelimeyi ara
    const doc = legalDocs?.find((d) => d.slug.includes(keyword));
    // Bulursa tam slug'ı döner, bulamazsa senin fallback yapını korur
    return doc ? `/yasal/${doc.slug}` : `/yasal/${keyword}-metni`;
  };

  // Linke tıklayınca checkbox'ın işaretlenmesini önleyen fonksiyon
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const [form, setForm] = useState({
    adSoyad: "",
    email: "",
    telefon: "",
    iletisimTercihi: "",
    mesaj: "",
  });
  const [onaylar, setOnaylar] = useState({
    aydinlatmaVeCerez: false,
    onamVeSozlesme: false,
    acikRiza: false,
    ticariIleti: false,
  });
  const [errors, setErrors] = useState({ email: false, telefon: false });

  // Yükleme ve Başarı durumları
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email")
      setErrors((prev) => ({
        ...prev,
        email: value !== "" && !validateEmail(value),
      }));
  };

  // Telefon değişimi için özel fonksiyon
  const handlePhoneChange = (newValue) => {
    setForm((prev) => ({ ...prev, telefon: newValue }));
    setErrors((prev) => ({ ...prev, telefon: newValue.length < 10 }));
  };

  const handleOnayChange = (e) => {
    setOnaylar({ ...onaylar, [e.target.name]: e.target.checked });
  };

  const canSubmit =
    form.adSoyad.length > 2 &&
    validateEmail(form.email) &&
    form.telefon.length > 8 &&
    onaylar.aydinlatmaVeCerez &&
    onaylar.onamVeSozlesme &&
    onaylar.acikRiza &&
    !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);

    const result = await sendContactEmail(form);

    if (result.success) {
      setIsSuccess(true);
      setForm({
        adSoyad: "",
        email: "",
        telefon: "",
        iletisimTercihi: "",
        mesaj: "",
      });
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

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

  return (
    <Box
      id="iletisim"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 8, md: 4 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#FAF8F5",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.75) 100%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ mb: 3 }}
        >
          <SectionBaslik altBaslik="İletişim" baslik="İletişime Geçin" />
        </MotionBox>

        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              variants={scrollAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                position: "relative",
                height: { xs: "250px", md: "480px" },// Esnek yükseklik.yani ekran küçüldüğünde de görselin tamamı gözükür
                maxHeight: "90vh",// Yüksekliği sınırlamak için maxHeight ekledik
                borderRadius: 6,// Görselin köşelerini yuvarlamak için borderRadius ekledik
                overflow: "hidden",// Görselin taşmasını önlemek için overflow: hidden ekledik
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src="/images/iletisim.jpg"
                alt="İletişim"
                fill
                priority 
                sizes="(max-width: 768px) 100vw, 500px" 
                style={{ objectFit: "cover" }}
              />
            </MotionBox>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <MotionBox
              variants={scrollAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 5,
                bgcolor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                border: "1px solid rgba(255,255,255,0.3)",
                mb: 1,
              }}
            >
              {isSuccess ? (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    Mesajınız İletildi 🌿
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 4 }}>
                    En kısa sürede size dönüş yapacağım.
                  </Typography>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outlined"
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Ad Soyad *"
                      name="adSoyad"
                      value={form.adSoyad}
                      onChange={handleChange}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="E-posta *"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email ? "Hatalı e-posta" : ""}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MuiTelInput
                      fullWidth
                      size="small"
                      label="Telefon *"
                      value={form.telefon}
                      onChange={handlePhoneChange}
                      error={errors.telefon}
                      defaultCountry="TR"
                      forceCallingCode
                      sx={{
                        ...inputSx,
                        "& .MuiOutlinedInput-root": {
                          ...inputSx["& .MuiOutlinedInput-root"],
                          paddingLeft: 1,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth size="small" sx={inputSx}>
                      <InputLabel id="iletisim-tercihi-label">
                        İletişim Tercihi
                      </InputLabel>
                      <Select
                        labelId="iletisim-tercihi-label"
                        label="İletişim Tercihi"
                        name="iletisimTercihi"
                        value={form.iletisimTercihi}
                        onChange={handleChange}
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
                        <MenuItem value="whatsapp">WhatsApp</MenuItem>
                        <MenuItem value="telefon">Telefon</MenuItem>
                        <MenuItem value="email">E-posta</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Mesajınız *"
                      name="mesaj"
                      value={form.mesaj}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      sx={inputSx}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <FormGroup
                      sx={{
                        gap: 0,
                        "& .MuiFormControlLabel-root": { mb: -1.8 },
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="aydinlatmaVeCerez"
                            checked={onaylar.aydinlatmaVeCerez}
                            onChange={handleOnayChange}
                            sx={{ color: "primary.main" }}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                          >
                            <Link
                              href={getLegalUrl('aydinlatma')}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              onMouseDown={handleLinkClick}
                              style={{ color: "inherit", fontWeight: 700 }}
                            >
                              Aydınlatma Metni
                            </Link>
                            'ni ve{" "}
                            <Link
                              href={getLegalUrl('cerez')}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              onMouseDown={handleLinkClick}
                              style={{ color: "inherit", fontWeight: 700 }}
                            >
                              Çerez Politikası
                            </Link>
                            'nı okudum. *
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="onamVeSozlesme"
                            checked={onaylar.onamVeSozlesme}
                            onChange={handleOnayChange}
                            sx={{ color: "primary.main" }}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                          >
                            <Link
                              href={getLegalUrl('kullanim')}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              onMouseDown={handleLinkClick}
                              style={{ color: "inherit", fontWeight: 700 }}
                            >
                              Kullanım Koşulları
                            </Link>{" "}
                            ve{" "}
                            <Link
                              href={getLegalUrl('onam')}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              onMouseDown={handleLinkClick}
                              style={{ color: "inherit", fontWeight: 700 }}
                            >
                              Onam Formu
                            </Link>
                            'nu kabul ediyorum. *
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="acikRiza"
                            checked={onaylar.acikRiza}
                            onChange={handleOnayChange}
                            sx={{ color: "primary.main" }}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                          >
                            Verilerimin işlenmesine dair{" "}
                            <Link
                              href={getLegalUrl('acik-riza')}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              onMouseDown={handleLinkClick}
                              style={{ color: "inherit", fontWeight: 700 }}
                            >
                              Açık Rıza Metni
                            </Link>
                            'ni onaylıyorum. *
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="ticariIleti"
                            checked={onaylar.ticariIleti}
                            onChange={handleOnayChange}
                            sx={{ color: "primary.main" }}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                          >
                            Bilgilendirme içerikleri için{" "}
                            <Link
                              href={getLegalUrl('ticari')}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                              onMouseDown={handleLinkClick}
                              style={{ color: "inherit", fontWeight: 700 }}
                            >
                              İleti Onayı
                            </Link>{" "}
                            veriyorum.
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={!canSubmit}
                      onClick={handleSubmit}
                      sx={{
                        borderRadius: "50px",
                        py: 1.1,
                        fontWeight: 700,
                        mt: 0.5,
                      }}
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

            <Grid container spacing={1}>
              {[
                { ikon: LocationOnOutlinedIcon, t: "Konum", d: "Online" },
                {
                  ikon: EmailOutlinedIcon,
                  t: "E-posta",
                  d: "pdseymainan@gmail.com",
                },
                { ikon: AccessTimeOutlinedIcon, t: "Saat", d: "09:00 - 20:00" },
              ].map((item, i) => (
                <Grid size={{ xs: 4 }} key={i}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 0.8,
                      borderRadius: 2,
                      bgcolor: "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <item.ikon
                      sx={{ color: "primary.main", fontSize: 18, mb: 0.2 }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        display: "block",
                      }}
                    >
                      {item.t}
                    </Typography>
                    <Typography sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
                      {item.d}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}