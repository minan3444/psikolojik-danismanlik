"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

// 🎯 Yön bazlı animasyon üretici
const getVariants = (from) => {
  const distance = 50;

  const map = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...map[from],
    },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut",
      },
    }),
  };
};

/**
 * AnimatedFrame Bileşeni
 * @param {Object} props
 * @param {React.ReactNode} props.children - Sarmalanacak içerik
 * @param {"up" | "down" | "left" | "right" | "none"} props.from - Giriş yönü
 * @param {number} props.delay - Gecikme süresi (saniye)
 * @param {boolean} props.hover - Hover animasyonu aktif mi?
 * @param {boolean} props.once - Animasyon sadece bir kez mi çalışsın?
 * @param {Object} props.sx - MUI stil objesi
 */
const AnimatedFrame = ({
  children,
  from = "up",
  delay = 0.3,
  hover = true,
  once = true,
  sx = {},
  ...props
}) => {
  return (
    <MotionBox
      variants={getVariants(from)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-20px" }}
      custom={delay}
      whileHover={hover ? { y: -6, transition: { duration: 0.25 } } : undefined}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex", // içeriği dikeyde hizalayalım.
        flexDirection: "column",
        justifyContent: "center", //yatayda hizala
        borderRadius: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};
export default AnimatedFrame;
