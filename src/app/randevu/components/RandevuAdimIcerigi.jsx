"use client";

import HizmetSecimi from "@/app/randevu/components/HizmetSecimi";
import TakvimAdimi from "@/app/randevu/components/TakvimAdimi";
import SaatAdimi from "@/app/randevu/components/SaatAdimi";
import BilgiAdimi from "@/app/randevu/components/BilgiAdimi";
import BasariEkrani from "./BasariEkrani";

/**
 * Aktif adıma göre doğru bileşeni render eder.
 */
export default function RandevuAdimIcerigi({
  activeStep,
  secimler,
  legalDocs,
  updateSecim,
  handleNext,
  handleBack,
}) {
  switch (activeStep) {
    case 0:
      return (
        <HizmetSecimi
          onSelect={(hizmet) => {
            updateSecim("hizmet", hizmet);
            handleNext();
          }}
        />
      );
    case 1:
      return (
        <TakvimAdimi
          onBack={handleBack}
          onSelect={(date) => {
            updateSecim("tarih", date);
            handleNext();
          }}
        />
      );
    case 2:
      return (
        <SaatAdimi
          seciliTarih={secimler.tarih}
          onBack={handleBack}
          onSelect={(saat) => {
            updateSecim("saat", saat);
            handleNext();
          }}
        />
      );
    case 3:
      return (
        <BilgiAdimi
          secimler={secimler}
          onBack={handleBack}
          onSuccess={handleNext}
          legalDocs={legalDocs}
        />
      );
    case 4:
      return <BasariEkrani secimler={secimler} />;

    default:
      return null;
  }
}
