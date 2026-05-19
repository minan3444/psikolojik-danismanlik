"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function CustomButton({
  children,
  href,
  backgroundColor,
  onClick,
  ...props
}) {
  const isLink = href !== undefined && href !== null;

  const buttonStyles = {
    borderRadius: "50px",
    color: "white",
    fontWeight: 700,
    backgroundColor: backgroundColor || "#7c9e87",
    whiteSpace: "nowrap", // Metni alt satıra geçirme
    display: "inline-flex", //İçeriği yan yana hizala
    alignItems: "center", // Dikey ortala
    gap: 0.5, //Metin ile ok arasında boşluk
    // 📱 Kısa responsive syntax
    px: { xs: 2, md: 3 }, // padding-left/right: 16px → 24px
    py: { xs: 1, md: 1.5 }, // padding-top/bottom: 8px → 12px
    fontSize: { xs: "0.75rem", md: "0.875rem" },
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: backgroundColor ? backgroundColor : "#6b8a75",
    },
    ...props.sx,
  };

  if (isLink) {
    return (
      <Button
        component={Link}
        href={href}
        variant="contained"
        size="medium"
        color="primary"
        sx={buttonStyles}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      size="medium"
      color="primary"
      onClick={onClick}
      sx={buttonStyles}
      {...props}
    >
      {children}
    </Button>
  );
}
