import { Box, Typography } from "@mui/material";

// component prop'unu ekledik, varsayılan değeri "h2"
export default function SectionBaslik({
  baslik,
  altBaslik,
  merkez = true,
  component = "h2",
}) {
  return (
    <Box sx={{ mb: 3, textAlign: merkez ? "center" : "left" }}>
      {altBaslik && (
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
          }}
        >
          {altBaslik}
        </Typography>
      )}

      {/* component prop'u ile HTML etiketini, variant ile görsel boyutu belirliyoruz */}
      <Typography component={component} variant="h2">
        {baslik}
      </Typography>

      {/* Dekoratif çizgi */}
      <Box
        sx={{
          width: 60,
          height: 3,
          backgroundColor: "primary.main",
          mt: 1,
          mx: merkez ? "auto" : 0,
        }}
      />
    </Box>
  );
}
