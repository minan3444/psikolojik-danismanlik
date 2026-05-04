// Tüm section'larda kullanılan başlık componenti
// Tekrar kullanılabilir ve modüler yapı

import { Box, Typography } from "@mui/material";

export default function SectionBaslik({ baslik, altBaslik, merkez = true }) {
  return (
    <Box sx={{ mb: 6, textAlign: merkez ? "center" : "left" }}>
      {altBaslik && (
        <Typography
          variant="caption"
          sx={{
            color: "primary.main", //sectionlardaki alt başlıkların rengi.
            fontWeight: 600,
          }}
        >
          {altBaslik}
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-playfair)",
          fontWeight: 700,
          color: "text.primary", //sectionlardaki ana başlıkların rengi.
          fontSize: { xs: "1.8rem", md: "2.5rem" },
        }}
      >
        {baslik}
      </Typography>
      {/* Dekoratif çizgi */}
      <Box
        sx={{
          width: 60,
          height: 3,
          backgroundColor: "primary.main",
          borderRadius: 2,
          mt: 2,
          mx: merkez ? "auto" : 0,
        }}
      />
    </Box>
  );
}
