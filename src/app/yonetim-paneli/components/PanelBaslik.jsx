// ─────────────────────────────────────────────────────────────
//  components/PanelBaslik.jsx
//  Sayfanın üst kısmı: başlık + "Müsaitlik Yönet" butonu.
// ─────────────────────────────────────────────────────────────

import { Stack, Typography, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

export default function PanelBaslik({ onMusaitlikYonet }) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 4 }}
    >
      <Typography variant="h4">Yönetici Paneli</Typography>

      <Button
        variant="contained"
        color="error"
        startIcon={<BlockIcon />}
        onClick={onMusaitlikYonet}
        sx={{
          borderRadius: "50px",
          textTransform: "none",
          px: 3,
          display: { xs: "none", sm: "flex" },
        }}
      >
        Müsaitlik Yönet
      </Button>
    </Stack>
  );
}
