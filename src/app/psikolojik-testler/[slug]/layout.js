export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // Test verisini import et
  const { tumTestler } = await import("@/data/testler-data");
  const test = tumTestler.find((t) => t.slug === decodedSlug);

  if (!test) {
    return {
      title: "Test Bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: test.baslik,
    description: test.aciklama || `${test.baslik} - Online psikolojik test`,
    keywords: [
      test.baslik,
      "psikolojik test",
      "online test",
      test.kategori || "psikoloji",
      "Şeyma İnan testleri",
    ],
    openGraph: {
      title: test.baslik,
      description: test.aciklama || `${test.baslik} - Ücretsiz psikolojik test`,
      url: `/psikolojik-testler/${decodedSlug}`,
      type: "website",
    },
    alternates: {
      canonical: `/psikolojik-testler/${decodedSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TestDetayLayout({ children }) {
  return <>{children}</>;
}
