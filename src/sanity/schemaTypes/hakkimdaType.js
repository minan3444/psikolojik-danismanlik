export const hakkimdaType = {
  name: 'hakkimda',
  title: 'Hakkımda Bilgileri',
  type: 'document',
  fields: [
    { name: 'unvan', title: 'Unvan (Örn: Psikolojik Danışman)', type: 'string' },
    { name: 'isim', title: 'İsim Soyisim', type: 'string' },
    { name: 'ozgecmis', title: 'Özgeçmiş Paragrafları', type: 'array', of: [{ type: 'text' }] },
    {
      name: 'heroMaddeler',
      title: 'Hero Bölümü Maddeleri (Ana Sayfadaki Tikler)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'vurgu', title: 'Vurgulanan Kısım (Kalın)', type: 'string' },
            { name: 'normal', title: 'Devam Eden Metin', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'egitimler',
      title: 'Eğitim & Uzmanlıklar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'baslik', title: 'Okul/Eğitim Adı', type: 'string' },
            { name: 'detay', title: 'Bölüm/Derece Detayı', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'tecrubeler',
      title: 'Tecrübe Alanları / Çalışılan Yerler (Sadece İsimler)',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}