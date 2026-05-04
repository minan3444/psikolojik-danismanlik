"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function CustomButton({
  children,
  href = "/",
  backgroundColor,
  ...props
}) {
  return (
    <Button
      component={Link}
      href={href}
      variant="contained"
      size="medium"
      color="primary"
      sx={{
        borderRadius: "50px",
        color: "white",
        fontWeight: 600,
        backgroundColor: backgroundColor || "#7c9e87",
        "&:hover": {
          transform: "translateY(-2px)",
          // Hover durumunda rengi biraz koyulaştırabiliriz
          backgroundColor: backgroundColor ? backgroundColor : "#6b8a75",
        },
        ...props.sx,
      }}
      {...props} // Diğer tüm MUI buton özelliklerini dışarıdan alabilmeni sağlar
    >
      {children}
    </Button>
  );
}
