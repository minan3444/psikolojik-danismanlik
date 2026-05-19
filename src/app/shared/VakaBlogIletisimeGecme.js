import { Box, Typography } from "@mui/material";
import CustomButton from "./customButton";

export default function IletisimKarti({
  baslik,
  altMetin,
  butonMetni,
  href = "/randevu",
  sx,
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        m: 3,
        bgcolor: "background.paper",
        borderRadius: 3,
        ...sx, // Dışarıdan gelen stil (margin vb.) buraya eklenir
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          fontSize: "min(8vw, 3.2rem)",
          whiteSpace: "pre-wrap",
          wordBreak: "keep-all",
          color: "text.primary",
        }}
      >
        {baslik}
      </Typography>
      <Typography sx={{ mb: 2, color: "text.secondary" }}>
        {altMetin}
      </Typography>
      <CustomButton href={href}>{butonMetni}</CustomButton>
    </Box>
  );
}
