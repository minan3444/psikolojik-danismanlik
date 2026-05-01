"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function CustomButton({ children, href = "/", ...props }) {
  return (
    <Button
      component={Link}
      href={href}
      variant="contained"
      size="medium"
      color="warning"
      sx={{
        borderRadius: "50px",
        fontWeight: 600,
        "&:hover": { transform: "translateY(-2px)" },
      }}
      {...props} // Diğer tüm MUI buton özelliklerini dışarıdan alabilmeni sağlar
    >
      {children}
    </Button>
  );
}
