//← "use client" (onClick)
"use client";

import { Box, Chip } from "@mui/material";

/**
 * BlogFilter — Kategori filtre çipleri.
 * "use client" sadece burada: interaktif kısım yalnızca bu bileşen.
 */
export default function BlogFilter({
  kategoriler,
  activeKategori,
  onKategoriChange,
}) {
  return (
    <Box
      component="nav"
      aria-label="Blog kategorileri"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mb: 6,
        justifyContent: "center",
      }}
    >
      {kategoriler.map((k) => (
        <Chip
          key={k}
          label={k}
          component="button"
          aria-pressed={activeKategori === k}
          onClick={() => onKategoriChange(k)}
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            bgcolor: activeKategori === k ? "primary.main" : "white",
            color: activeKategori === k ? "white" : "text.secondary",
            border: "1px solid",
            borderColor: activeKategori === k ? "primary.main" : "custom.taupe",
            transition: "0.3s all ease",
            "&:hover": {
              bgcolor: activeKategori === k ? "primary.dark" : "custom.taupe",
            },
          }}
        />
      ))}
    </Box>
  );
}
