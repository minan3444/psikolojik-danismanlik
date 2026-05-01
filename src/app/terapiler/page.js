import { Box, Container, Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SectionBaslik from '@/components/ui/SectionBaslik';

export const metadata = {
  title: 'Terapiler',
  description: 'Şeyma İnan - EMDR, Bilişsel Davranışçı Terapi ve daha fazlası. Online psikolojik danışmanlık hizmetleri.',
};

// Terapi türleri → değiştirmek istediğinde buradan düzenle
const terapiler = [
  {
    id: 1,
    ikon: PsychologyOutlinedIcon,
    baslik: 'EMDR Terapisi',
    aciklama: 'Göz Hareketleriyle Duyarsızlaştırma ve Yeniden İşleme (EMDR), travma ve zorlu yaşam deneyimlerinin işlenmesinde kullanılan, bilimsel temelli bir terapi yöntemidir.',
    detaylar: [
      'Travma ve PTSD tedavisinde etkili',
      'Kaygı ve fobi tedavisinde kullanılır',
      'Geçmiş yaşantıların etkisini azaltır',
      'Hızlı ve kalıcı sonuçlar sağlar',
    ],
  },
  {
    id: 2,
    ikon: FavoriteOutlinedIcon,
    baslik: 'Bilişsel Davranışçı Terapi',
    aciklama: 'BDT, düşünce, duygu ve davranışlar arasındaki ilişkiyi ele alan, kanıta dayalı bir psikoterapi yöntemidir. Olumsuz düşünce kalıplarını fark etmeye ve değiştirmeye odaklanır.',
    detaylar: [
      'Depresyon ve kaygı tedavisinde etkili',
      'Pratik ve hedef odaklı bir yaklaşım',
      'Günlük yaşama uygulanabilir teknikler',
      'Kalıcı değişim için beceri geliştirme',
    ],
  },
  {
    id: 3,
    ikon: SelfImprovementOutlinedIcon,
    baslik: 'Bireysel Danışmanlık',
    aciklama: 'Kişiye özel, güvenli ve yargısız bir ortamda yürütülen bireysel danışmanlık seansları. Her danışanın ihtiyacına göre özelleştirilmiş terapi planı.',
    detaylar: [
      'Tamamen kişiye özel süreç',
      'Güvenli ve gizli ortam',
      'Esnek seans programı',
      'Online veya yüz yüze seçeneği',
    ],
  },
  {
    id: 4,
    ikon: GroupsOutlinedIcon,
    baslik: 'Online Danışmanlık',
    aciklama: 'Türkiye\'nin her yerinden erişilebilir, güvenli video platformu üzerinden gerçekleştirilen online psikolojik danışmanlık hizmeti.',
    detaylar: [
      'Türkiye genelinde erişilebilir',
      'Güvenli ve şifreli görüşme',
      'Evden çıkmadan destek alma',
      'Esnek randevu saatleri',
    ],
  },
];

export default function TerapilerPage() {
  return (
    <Box sx={{ pt: 14, pb: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">

        <SectionBaslik
          altBaslik="Hizmetlerim"
          baslik="Terapi Yöntemleri"
        />

        <Grid container spacing={4}>
          {terapiler.map((terapi, index) => {
            const Ikon = terapi.ikon;
            return (
              <Grid key={terapi.id} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    height: '100%',
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    border: '1px solid',
                    borderColor: 'custom.taupe',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 3,
                      borderColor: 'primary.light',
                    },
                  }}
                >
                  {/* İkon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      bgcolor: 'custom.beige',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Ikon sx={{ color: 'primary.main', fontSize: 32 }} />
                  </Box>

                  {/* Başlık */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 2,
                      fontSize: '1.5rem',
                    }}
                  >
                    {terapi.baslik}
                  </Typography>

                  {/* Açıklama */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.9, mb: 3 }}
                  >
                    {terapi.aciklama}
                  </Typography>

                  {/* Detaylar */}
                  <Box sx={{ mb: 3 }}>
                    {terapi.detaylar.map((detay, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {detay}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* CTA */}
        <Box
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: 'primary.main',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              color: 'white',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Hangi terapi yöntemi size uygun?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, lineHeight: 1.8 }}
          >
            Ücretsiz ön görüşmede birlikte değerlendirelim.
          </Typography>
          <Button
            component={Link}
            href="/iletisim"
            variant="outlined"
            size="large"
            sx={{
              borderRadius: '50px',
              px: 5,
              py: 1.8,
              fontWeight: 600,
              fontSize: '1rem',
              color: 'white',
              borderColor: 'white',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Ücretsiz Ön Görüşme Al →
          </Button>
        </Box>

      </Container>
    </Box>
  );
}