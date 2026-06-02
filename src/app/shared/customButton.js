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
    fontWeight: 700,
    color: "white",
    backgroundColor: backgroundColor || "#7c9e87",
    whiteSpace: "nowrap", // Metni alt satıra geçirme
    display: "inline-flex", //İçeriği yan yana hizala
    alignItems: "center", // Dikey ortala
    gap: 0.5, //Metin ile ok arasında boşluk
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
        onClick={onClick}
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
