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
import Link from "next/link";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { MuiTelInput } from "mui-tel-input";
import { sendContactEmail } from "@/app/actions/contact";
import CustomButton from "@/app/shared/customButton";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";

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
  {
    ikon: EmailOutlinedIcon,
    t: "E-posta",
    d: "pdseymainan@gmail.com",
    href: "mailto:pdseymainan@gmail.com",
  },
  { ikon: AccessTimeOutlinedIcon, t: "Saat", d: "09:00 - 20:00" },
];

const BasariBilgisi = ({ onReset }) => (
  <Box sx={{ textAlign: "center", py: 5 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        Mesajınız İletildi
      </Typography>
      <SpaOutlinedIcon sx={{ color: "primary.main", fontSize: 32 }} />
    </Box>
    <Typography color="text.secondary" sx={{ mb: 4 }}>
      En kısa sürede size dönüş yapacağım.
    </Typography>
    <Button onClick={onReset} variant="outlined">
      Yeni Mesaj Gönder
    </Button>
  </Box>
);

const BilgiKutusu = ({ ikon: I, t, d, href }) => (
  <Grid size={{ xs: 4 }}>
    <Box
      sx={{
        textAlign: "center",
        p: 1,
        borderRadius: 3,
        bgcolor: "#9e7c93",
        height: "100%",
      }}
    >
      <I sx={{ color: "white", fontSize: 18 }} aria-hidden="true" />

      {/* Başlığı h3 olarak işaretliyoruz (Başlık Hiyerarşisi için) */}
      <Typography
        variant="caption"
        sx={{ color: "white", display: "block", fontWeight: "bold" }}
        component="h3"
      >
        {t}
      </Typography>

      {/* Eğer href varsa link yap, yoksa düz metin bas */}
      {href ? (
        <Typography
          variant="caption"
          component="a"
          href={href}
          sx={{
            color: "white",
            overflowWrap: "break-word",
            minWidth: 0,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {d}
        </Typography>
      ) : (
        <Typography
          variant="caption"
          sx={{ color: "white", overflowWrap: "break-word", minWidth: 0 }}
        >
          {d}
        </Typography>
      )}
    </Box>
  </Grid>
);
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

  const onayListesi = [
    {
      name: "aydinlatmaVeCerez",
      req: true,
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
      req: true,
      label: (
        <>
          {legalLink("kullanim", "Kullanım Koşulları")} ve{" "}
          {legalLink("onam", "Onam Formu")}
          {"'nu kabul ediyorum. *"}
        </>
      ),
    },
    {
      name: "acikRiza",
      req: true,
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
      req: false,
      label: (
        <>
          Bilgilendirme içerikleri için {legalLink("ticari", "İleti Onayı")}
          {" veriyorum. *"}
        </>
      ),
    },
  ];

  return (
    <>
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

          <Grid size={{ xs: 12 }}>
            <FormGroup>
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
            <CustomButton
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mb: 2,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "MESAJI GÖNDER"
              )}
            </CustomButton>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={1}>
        {BILGI_KUTULARI.map((item, i) => (
          <BilgiKutusu key={i} {...item} />
        ))}
      </Grid>
    </>
  );
}
