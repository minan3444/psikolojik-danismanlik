import VakaAnalizleri from '@/components/sections/VakaAnalizleri';
import { Box, Container, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// SANITY BAĞLANTILARI
import { client } from '@/sanity/lib/client';
import { VAKALAR_QUERY } from '@/sanity/lib/queries';

export const metadata = {
  title: 'Vaka Analizleri | Psikolog Şeyma İnan',
  description: 'Gerçek danışan hikayeleri ve terapi süreçleri. Tüm vakalar gizlilik ilkesi kapsamında anonim olarak paylaşılmaktadır.',
};
// Sayfanın her zaman taze kalması için (Sanity'de bir şey yayınladığında anında yansır)
export const revalidate = 0;

export default async function VakaAnalizleriPage() {
  // VERİYİ SUNUCU TARAFINDA ÇEKİYORUZ (Performans ve SEO için en iyi yol)
  const vakaVerileri = await client.fetch(VAKALAR_QUERY);

  return (
    <Box sx={{ pt: { xs: 10, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* LİSTE SAYFASI BREADCRUMBS */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ mb: 1, color: 'text.secondary' }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Anasayfa</Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>Vaka Analizleri</Typography>
        </Breadcrumbs>
      </Container>

      {/* Sanity'den gelen veriyi (vakaVerileri) bileşene gönderiyoruz */}
      <VakaAnalizleri isFullPage={true} initialData={vakaVerileri} />
    </Box>
  );
}