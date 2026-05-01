'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import * as Icons from '@mui/icons-material';
import SectionBaslik from '@/components/ui/SectionBaslik';
import terapiSureci from '@/data/terapi-sureci';
import theme from "@/theme/theme";
const { sectionPadding } = theme; // Tema'dan sectionPadding'i çekiyoruz
const MotionBox = motion.create(Box);

const scrollAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

export default function TerapiSureci() {
  return (
    <Box
      sx={{
        py: { xs: sectionPadding.xs, md: sectionPadding.md },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Arka plan fotoğrafı → Unsplash */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          //backgroundImage: `url('_https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          // Overlay → yazıların okunabilirliği için
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: "linear-gradient(135deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0) 50%, rgba(124,158,135,0.75) 100%)",
          },
        }}
      />

      {/* Dekoratif alt gradient */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(0deg, rgba(124,158,135,0.08) 0%, transparent 100%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        <MotionBox
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionBaslik
            altBaslik="Nasıl Çalışıyoruz?"
            baslik="Terapi Süreci"
          />
        </MotionBox>

        {/* Adımlar → yatay timeline */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-start' },
            gap: { xs: 4, md: 0 },
            position: 'relative',
          }}
        >
          {terapiSureci.map((adim, index) => {
            const Ikon = Icons[adim.ikon];
            const sonAdim = index === terapiSureci.length - 1;

            return (
              <MotionBox
                key={adim.id}
                variants={scrollAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.2}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  px: { xs: 0, md: 3 },
                }}
              >
                {/* Bağlantı çizgisi → adımlar arası */}
                {!sonAdim && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      top: 40,
                      left: '60%',
                      width: '80%',
                      height: 2,
                      background: 'linear-gradient(90deg, #7C9E87 0%, #A8C5B0 100%)',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Adım numarası + İkon */}
                <MotionBox
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0px 8px 25px rgba(124,158,135,0.35)',
                    cursor: 'default',
                  }}
                >
                  {Ikon && <Ikon sx={{ color: 'white', fontSize: 36 }} />}

                  {/* Adım numarası */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.75rem' }}
                    >
                      {adim.id}
                    </Typography>
                  </Box>
                </MotionBox>

                {/* İçerik kutusu */}
                <MotionBox
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.06)',
                    border: '1px solid',
                    borderColor: 'custom.taupe',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0px 12px 40px rgba(124,158,135,0.2)',
                      borderColor: 'primary.light',
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      mb: 1,
                    }}
                  >
                    {adim.altBaslik}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    {adim.baslik}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {adim.aciklama}
                  </Typography>
                </MotionBox>

              </MotionBox>
            );
          })}
        </Box>

      </Container>
    </Box>
  );
}