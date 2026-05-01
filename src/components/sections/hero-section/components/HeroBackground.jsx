//← animasyonlu arka plan daireleri
"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

export default function HeroBackground() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          background: `linear-gradient(135deg, rgba(250, 248, 245, 0.97) 0%, rgba(245, 240, 234, 0.92) 50%, rgba(168, 197, 176, 0.3) 100%)`,
        }}
      />

      {/* Sağ üst yeşil daire */}
      <MotionBox
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: { xs: "350px", md: "600px" },
          height: { xs: "350px", md: "600px" },
          borderRadius: "50%",
          background: "radial-gradient(circle, #7C9E87 0%, transparent 70%)"
        }}
      />

      {/* Sol alt mavi daire */}
      <MotionBox
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          borderRadius: "50%",
          background: "radial-gradient(circle, #8FA8C8 0%, transparent 70%)",
        }}
      />
    </>
  );
}