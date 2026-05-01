import BlogSection from '@/components/sections/BlogSection';
import { Box, Container, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// SANITY İTHALATLARI
import { client } from '@/sanity/lib/client';
import { BLOG_QUERY } from '@/sanity/lib/queries';

export const revalidate = 0; // Sayfa her açıldığında veriyi kontrol et (En güncel hali garanti eder)


export const metadata = {
  title: 'Blog | Psikolojik Danışman Şeyma İnan',
  description: 'Psikolojik sağlık, terapi yaklaşımları ve öz farkındalık üzerine uzman yazıları.',
};

// Fonksiyonu 'async' yaparak sunucu tarafında veri çekebilir hale getirdik
export default async function BlogPage() {
  
  // VERİYİ CANLI OLARAK SANITY'DEN ÇEKİYORUZ
  // revalidate: 60 -> Yazılarını güncellediğinde 60 saniye içinde sitede görünmesini sağlar
  const yazilar = await client.fetch(BLOG_QUERY, {}, { next: { revalidate: 60 } });

  return (
    <Box sx={{ pt: { xs: 10, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* anlamlı: pt demek padding-top demek, yani üstten boşluk bırakmak için kullanılır. 
      // xs: 10 demek, küçük ekranlarda 10 birim boşluk bırakılacak anlamına gelir. md: 10 demek,
      // orta ve büyük ekranlarda da aynı şekilde 10 birim boşluk bırakılacak anlamına gelir. bgcolor: 
      // '#FDFCFB' ise arka plan rengini belirler. minHeight: '100vh' ise sayfanın minimum yüksekliğini belirler, 
      // yani ekranın tamamını kaplamasını sağlar. */}
      <Container maxWidth="lg">
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ mb: 1, color: 'text.secondary'}}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Anasayfa</Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>Blog</Typography>
        </Breadcrumbs>
      </Container>
      
      {/* İŞTE SİHİRLİ DEĞNEK: Veriyi (yazilar) bileşene gönderiyoruz */}
      <BlogSection isFullPage={true} initialData={yazilar} />
    </Box>
  );
}