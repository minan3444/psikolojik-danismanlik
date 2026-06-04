import Iletisim from "@/components/sections/iletisim-section/Iletisim";

export const metadata = {
  title: "İletişim | Psikolojik Danışman Şeyma İnan - Online Danışmanlık",
  description:
    "Psikolojik Danışman Şeyma İnan ile iletişime geçin. Online psikolojik danışmanlık, terapi süreci ve randevu talepleriniz için formu doldurun veya e-posta gönderin.",
  alternates: {
    canonical: "https://www.seymainan.com/iletisim",
  },
  openGraph: {
    title: "İletişim | Psikolojik Danışman Şeyma İnan",
    description:
      "Online psikolojik danışmanlık için randevu oluşturun, iletişime geçin.",
    url: "https://www.seymainan.com/iletisim",
    siteName: "Şeyma İnan | Psikolojik Danışmanlık",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://www.seymainan.com/images/iletisim.jpg",
        width: 1200,
        height: 630,
        alt: "Psikolojik Danışman Şeyma İnan İletişim",
      },
    ],
  },
};

// JSON-LD Yapısal Veri (Schema.org)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Psikolojik Danışman Şeyma İnan",
  description: "Online psikolojik danışmanlık hizmetleri",
  url: "https://www.seymainan.com",
  email: "pdseymainan@gmail.com",
  areaServed: {
    "@type": "Country",
    name: "TR",
  },
  serviceType: [
    "Bireysel Psikolojik Danışmanlık",
    "Online Psikolojik Destek",
    "Anksiyete ve Stres Danışmanlığı",
    "İlişki Danışmanlığı",
  ],
  provider: {
    "@type": "Person",
    name: "Şeyma İnan",
    jobTitle: "Psikolojik Danışman",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "pdseymainan@gmail.com",
    contactType: "customer service",
    availableLanguage: ["Turkish"],
  },
};

export default function IletisimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Iletisim />
    </>
  );
}
