"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { scrollAnimation } from "../animations";

const MotionBox = motion.create(Box);

export default function IletisimProfile() {
  return (
    <MotionBox
      variants={scrollAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      sx={{
        position: "relative",
        height: { xs: "250px", md: "480px" }, // Esnek yükseklik.yani ekran küçüldüğünde de görselin tamamı gözükür
        borderRadius: 4, // Görselin köşelerini yuvarlamak için borderRadius ekledik
        overflow: "hidden", // Görselin taşmasını önlemek için overflow: hidden ekledik
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
    </MotionBox>
  );
}
