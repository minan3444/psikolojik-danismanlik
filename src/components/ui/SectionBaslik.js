import { Box, Typography } from "@mui/material";

export default function SectionBaslik({ baslik, altBaslik, merkez = true }) {
  return (
    <Box sx={{ mb: 3, textAlign: merkez ? "center" : "left" }}>
      {altBaslik && (
        <Typography
          variant="caption"
          sx={{
            color: "primary.main",
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
          fontWeight: 600,
          color: "text.primary",
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
          mt: 1,
          mx: merkez ? "auto" : 0,
        }}
      />
    </Box>
  );
}
