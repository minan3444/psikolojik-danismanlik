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
    fontWeight: 600,
    backgroundColor: backgroundColor || "#7c9e87",
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
