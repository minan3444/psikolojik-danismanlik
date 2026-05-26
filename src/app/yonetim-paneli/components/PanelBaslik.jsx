// ─────────────────────────────────────────────────────────────
//  components/PanelBaslik.jsx
//  Sayfanın üst kısmı: başlık + "Müsaitlik Yönet" butonu.
// ─────────────────────────────────────────────────────────────

import { Stack, Typography, Button, Box } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function PanelBaslik({ onMusaitlikYonet }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/yonetim-paneli/login");
    router.refresh();
  };
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 4 }}
    >
      <Typography variant="h4">Yönetici Paneli</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
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
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: "50px",
            textTransform: "none",
            px: 3,
            borderColor: "text.primary",
            color: "text.primary",
          }}
        >
          Çıkış Yap
        </Button>
      </Box>
    </Stack>
  );
}
