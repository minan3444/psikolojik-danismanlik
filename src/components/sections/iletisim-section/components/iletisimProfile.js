"use client";

import { Box } from "@mui/material";
import Image from "next/image";

export default function IletisimProfile() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "250px", md: "480px" },
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      <Image
        src="/images/iletisim.jpg"
        alt="İletişim"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 500px"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
}
