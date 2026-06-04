export const metadata = {
  title: "Psikolojik Testler",
  description:
    "Ücretsiz online psikolojik testler ile kendinizi daha iyi tanıyın. Anksiyete, depresyon, stres, bağlanma stilleri, öz şefkat ve daha fazlası için bilimsel temelli testler.",
  keywords: [
    "psikolojik testler",
    "online psikoloji testleri",
    "anksiyete testi",
    "depresyon testi",
    "stres testi",
    "bağlanma stilleri testi",
    "öz şefkat testi",
    "benlik saygısı testi",
    "duygusal zeka testi",
    "sosyal kaygı testi",
    "uyku kalitesi testi",
    "yaşam doyumu testi",
    "zaman yönetimi testi",
    "içsel motivasyon testi",
    "algılanan stres testi",
    "5 sevgi dili testi",
    "kendini tanıma testi",
    "ücretsiz psikolojik test",
  ],
  openGraph: {
    title: "Psikolojik Testler | Kendini Daha İyi Tanı",
    description:
      "Bilimsel temelli ücretsiz psikolojik testler ile iç dünyanızı keşfedin.",
    url: "/psikolojik-testler",
    type: "website",
  },
  alternates: {
    canonical: "/psikolojik-testler",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TestlerLayout({ children }) {
  return <>{children}</>;
}
