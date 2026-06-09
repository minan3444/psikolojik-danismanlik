// app/randevu/page.js
import RandevuPage from "./RandevuPage";

export const metadata = {
  title: "Online Randevu Al",
  description:
    "Şeyma İnan ile online psikolojik danışmanlık randevusu alın. Ücretsiz ön görüşme imkânı. Travma, kaygı, depresyon ve ilişki sorunlarında profesyonel destek.",
  keywords: [
    "online randevu psikolog",
    "psikolojik danışmanlık randevu",
    "online terapi randevu",
    "EMDR randevu",
    "ücretsiz ön görüşme psikolog",
    "online seans randevu",
  ],
  openGraph: {
    title: "Online Randevu Al | Şeyma İnan",
    description:
      "Online psikolojik danışmanlık randevusu alın. Ücretsiz ön görüşme imkânı mevcuttur.",
    url: "/randevu",
    type: "website",
  },
  alternates: {
    canonical: "/randevu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <RandevuPage />;
}
