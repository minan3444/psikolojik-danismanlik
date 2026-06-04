export function sonucHesapla(test, cevaplar) {
  if (test.tip === "puanli") {
    const maxSecenekDegeri = Math.max(...test.secenekler.map((s) => s.deger));

    const puan = test.sorular.reduce((toplam, soru, index) => {
      const cevap = parseInt(cevaplar[index] ?? 0);
      return toplam + (soru.ters ? maxSecenekDegeri - cevap : cevap);
    }, 0);

    const yorum = test.yorumlar.find((y) => puan >= y.min && puan <= y.max);

    return {
      ...yorum,
      puan,
      maxPuan: test.sorular.length * maxSecenekDegeri,
    };
  } else {
    // Kategorili hesaplama (Sevgi dili, Bağlanma, Arketip vb.)
    const skorlar = {};
    Object.entries(cevaplar).forEach(([index, deger]) => {
      const kategori = test.sorular[index].kategori ?? deger;
      skorlar[kategori] = (skorlar[kategori] || 0) + 1;
    });

    const kazananKategori = Object.keys(skorlar).reduce((a, b) =>
      skorlar[a] > skorlar[b] ? a : b,
    );

    return { ...test.sonuclar[kazananKategori], isKategorili: true };
  }
}
