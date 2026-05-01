export const legalType = {
  name: 'legal',
  title: 'Yasal Metinler',
  type: 'document',
  fields: [
    { 
      name: 'baslik', 
      title: 'Belge Başlığı', 
      type: 'string', 
      validation: Rule => Rule.required() 
    },
    { 
      name: 'slug', 
      title: 'URL (Slug)', 
      type: 'slug', 
      options: { source: 'baslik' }, 
      validation: Rule => Rule.required() 
    },
    { 
      name: 'icerik', 
      title: 'Belge İçeriği', 
      type: 'array', 
      of: [{ type: 'block' }] // Zengin metin editörü (Kalın, liste vb. destekler)
    }
  ]
}