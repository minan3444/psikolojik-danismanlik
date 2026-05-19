# Renk Yönetimi Denetimi - Psikolojik Danışmanlık Projesi

## 📊 Özet

- **Tema Kapsamında Tanımlı Renkler:** 8 renk
- **Hardcoded Renkler:** 3 renk
- **Dinamik Renkler (rgba/white/transparent):** 30+
- **Veri Dosyalarındaki Renkler:** 2 renk

---

## 1️⃣ THEME.JS'DE TANIMLI RENKLER

### Primary Palette (Sage Green) - #7C9E87, #A8C5B0, #5A7A63

**Ne için?** Ana yeşil renk - butonlar, başlıklar, aktif durumlar

```javascript
primary: {
  main: "#7C9E87",    // Ana yeşil - KOYU
  light: "#A8C5B0",   // Açık yeşil - HAFIF
  dark: "#5A7A63",    // Koyu yeşil - ÇOK KOYU
}
```

#### 💡 Kullanım Örnekleri:

**1. Buton - Yeşil Renk:**

```jsx
<Button sx={{ color: "primary.main" }}>Testi Başlat</Button>
```

👉 Sonuç: Buton yeşil renkte gösterilir

**2. Arka Plan - Yeşil Renk:**

```jsx
<Box sx={{ backgroundColor: "primary.main" }}>
  İçerik burası yeşil arka planda görülür
</Box>
```

👉 Sonuç: Kutunun arka planı yeşil olur

**3. Border/Çizgi - Yeşil Renk:**

👉 Sonuç: Çevrede yeşil çizgi oluşur

**Nerede Kullanılıyor:**

- `src/app/vaka-analizleri/[slug]/page.js` - Başlık butonları (çizgi=yeşil)
- `src/components/layout/Navbar.js` - Link hover (hover=yeşil arka plan)
- `src/components/sections/PsikolojikTestler.js` - Test kartı başlıkları
- `src/components/ui/BlogKarti.js` - Avatar (resim=yeşil çember)
- `src/components/sections/blog-section/BlogFilter.jsx` - Aktif kategori (seçili=yeşil)

---

### Secondary Palette (Dusty Blue) - #8FA8C8, #B8CCE0, #6B8AAD

**Ne için?** İkincil mavi renk - shadow, gradients (nadiren doğrudan kullanılır)

```javascript
secondary: {
  main: "#8FA8C8",    // Yumuşak mavi - KOYU
  light: "#B8CCE0",   // Açık mavi - HAFIF
  dark: "#6B8AAD",    // Koyu mavi - ÇOK KOYU
}
```

#### 💡 Kullanım Örnekleri:

**Shadow (Gölge) - Mavi Tonu:**

```jsx
<Box sx={{ boxShadow: "0px 4px 16px rgba(143, 168, 200, 0.12)" }}>
  Bu kutunun altında hafif mavi gölge vardır
</Box>
```

👉 Sonuç: Kutunun altında yumuşak mavi gölge oluşur

**Nadir Kullanım:**

```jsx
<Button color="secondary">Buton (nadiren kullanılır)</Button>
```

👉 Sonuç: Çoğunlukla burada kullanılmaz, fallback'tir

---

### Background Palette - #FAF8F5, #F5F0EA

**Ne için?** Sayfa ve kart arka planları - krem tonları

```javascript
background: {
  default: "#FAF8F5",   // SAYFA arka planı - Çok açık krem
  paper: "#F5F0EA",     // KART arka planı - Açık kahverengi
}
```

#### 💡 Kullanım Örnekleri:

**1. Sayfa Tamamı - Arka Plan:**

```jsx
<Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
  Tüm sayfa bu renkle boyanır
</Box>
```

👉 Sonuç: Tüm sayfa krem beyaz (#FAF8F5) olur

**2. Kartlar/Paneller - Arka Plan:**

```jsx
<Card sx={{ backgroundColor: "background.paper" }}>
  Kartın arka planı açık kahvedir
</Card>
```

👉 Sonuç: Kart açık kahverengi (#F5F0EA) olur

**3. Navbar/Footer - Arka Plan:**

```jsx
<AppBar sx={{ backgroundColor: "background.paper" }}>
  Navbar'ın arka planı açık kahverengi
</AppBar>
```

👉 Sonuç: Navbar açık kahverengi arka plana sahip olur

**Nerede Kullanılıyor:**

- `src/app/blog/page.js` - Blog sayfası (tüm sayfa)
- `src/app/vaka-analizleri/[slug]/page.js` - Vaka sayfası (tüm sayfa)
- `src/components/layout/Navbar.js` - Navbar arka planı
- `src/components/layout/Footer.js` - Footer arka planı

---

### Text Palette - #3D3530, #7A6E68

**Ne için?** Yazı renkleri - başlıklar (primary), açıklamalar (secondary)

```javascript
text: {
  primary: "#3D3530",    // ANA YAZI - Koyu kahve (BELİRGİN)
  secondary: "#7A6E68",  // İKİNCİL YAZI - Açık kahve (HAFIF)
}
```

#### 💡 Kullanım Örnekleri:

**1. Ana Başlık - Primary Yazı:**

```jsx
<Typography variant="h1" sx={{ color: "text.primary" }}>
  Kendini Daha İyi Tanı
</Typography>
```

👉 Sonuç: Başlık koyu kahvede görünür (belirgin)

**2. Açıklamalar - Secondary Yazı:**

```jsx
<Typography variant="body2" sx={{ color: "text.secondary" }}>
  Bu açıklamalar daha açık renkte gösterilir
</Typography>
```

👉 Sonuç: Yazı açık kahvede görünür (hafif, ikincil)

**3. Buton İçinde:**

```jsx
<Button sx={{ color: "text.primary" }}>Tıkla</Button>
```

👉 Sonuç: Buton yazısı koyu kahvede

**Nerede Kullanılıyor:**

- Tüm başlıklar - `color: "text.primary"`
- Açıklamalar, descriptions - `color: "text.secondary"`
- Tarih, saatler - `color: "text.secondary"`

---

### Custom Palette - #C4B5A5 (Taupe),

**Ne için?** Özel renkler - border/çizgiler ve hafif arka planlar

```javascript
custom: {
  taupe: "#C4B5A5",   // BORDER/ÇİZGİ - Koyu bej
}
```

#### 💡 Kullanım Örnekleri:

**1. Border/Çizgi - Taupe:**

👉 Sonuç: Kutunun etrafında koyu bej çizgi oluşur

👉 Sonuç: Alan açık bej renkte boyanır

**3. Chip/Tag Arka Planı:**

```jsx
<Chip label="10 Soru" sx={{ bgcolor: "background.paper" }} />
```

👉 Sonuç: Tag/etiket açık bej renkte görünür

**Nerede Kullanılıyor:**

- Navbar, Footer - border/çizgi (taupe)

---

## 2️⃣ HARDCODED RENKLER (Theme.js dışında tanımlı - ❌ KÖTÜ)

### #9E7C93 - Lila/Mor (Konusunda Açık Olmayan Mor Yeşili)

**⚠️ Problem:** Theme.js'de tanımlı değil, her dosyada farklı yazılmış

**Ne için?** Alt başlıklar, özel butonlar, decorative ikonlar

#### 💡 Kullanım Örnekleri:

**1. Yazı Rengi - Lila:**

```jsx
// src/components/sections/hero-section/components/HeroContent.jsx
<Typography sx={{ color: "#9e7c93" }}>Uzman Psikolojik Danışman</Typography>
```

👉 Sonuç: Yazı lila renkte gösterilir

**2. Buton Rengi - Lila:**

```jsx
// src/components/sections/hero-section/components/HeroContent.jsx
<CustomButton href="/hakkimda" backgroundColor="#9e7c93">
  Hakkımda
</CustomButton>
```

👉 Sonuç: Buton lila renkte boyanır

**3. Arka Plan - Lila (Bilgi Kutusu):**

```jsx
// src/components/sections/iletisim-section/components/iletisimForm.js
<Box sx={{ bgcolor: "#9e7c93", p: 1 }}>
  <Typography sx={{ color: "white" }}>Konum: Online</Typography>
</Box>
```

👉 Sonuç: Kutunun arka planı lila, yazı beyaz

**4. İkon Rengi - Lila:**

```jsx
// src/components/sections/VakaAnalizleri.js
<EastIcon sx={{ color: "#9e7c93", fontSize: "1.2em" }} />
```

👉 Sonuç: Ok ikonu lila renkte

**Nerede Kullanılıyor:**

- ❌ `src/components/sections/hero-section/components/HeroContent.jsx` - Yazı ve buton
- ❌ `src/components/layout/Navbar.js` - Logo bağlantısı
- ❌ `src/components/layout/Footer.js` - Footer bağlantısı
- ❌ `src/components/sections/iletisim-section/components/iletisimForm.js` - Bilgi kutusu
- ❌ `src/components/sections/VakaAnalizleri.js` - İkonlar

**✅ ÖNERİ:** Theme.js'e ekle:

```javascript
accent: {
  main: "#9E7C93";
}
```

Sonra kullan:

```jsx
<Box sx={{ color: "accent.main" }}>
```

---

### #C4A882 - Kahverengi/Krem

**Ne için?** Özel egzersizlerin renklendirilmesi, vurgular

#### 💡 Kullanım Örnekleri:

**1. Veri Dosyasında Renk:**

```javascript
// src/data/kendine-bir-mola.js
{
  id: 3,
  duygu: "duyduğun",
  renk: "#C4A882",  // Bu egzersiz kartının rengi
}
```

👉 Sonuç: Egzersiz kartının üst şeridi bu renkle boyanır

**2. Egzersiz Başlığında:**

```jsx
// src/components/sections/kendineBirMola/components/FarkindalikEgzersizi.js
<Box sx={{ backgroundColor: "#C4A882", color: "white", p: 2 }}>
  3. Duygu: Duyduğun
</Box>
```

👉 Sonuç: Egzersiz başlığı kahverengi arka planda beyaz yazı

**Nerede Kullanılıyor:**

- ❌ `src/data/kendine-bir-mola.js` - Egzersiz rengi
- ❌ `src/components/sections/kendineBirMola/components/FarkindalikEgzersizi.js` - Kullanılıyor

**✅ ÖNERİ:** Theme.js'e ekle:

```javascript
highlight: {
  warm: "#C4A882";
}
```

---

### #FFFFFF - Beyaz

**Ne için?** Yazı (siyah arka planda), arka planlar, kontrastlar

#### 💡 Kullanım Örnekleri:

**1. Beyaz Yazı - Karanlık Arka Planda:**

```jsx
// src/app/vaka-analizleri/[slug]/page.js
<Box sx={{ bgcolor: "primary.main", py: 3 }}>
  <Typography sx={{ color: "white" }}>Seçilen Terapist: Şeyma İnan</Typography>
</Box>
```

👉 Sonuç: Yeşil arka planda beyaz yazı (okunur)

**2. Beyaz Arka Plan - Kontrastlı Bölüm:**

```jsx
// src/app/blog/[slug]/page.js
<Box sx={{ bgcolor: "white", p: 4 }}>Blog içeriği beyaz arka planda</Box>
```

👉 Sonuç: Kutunun arka planı beyaz

**3. Buton İçinde Beyaz:**

```jsx
<Button sx={{ color: "white", bgcolor: "primary.main" }}>Tıkla</Button>
```

👉 Sonuç: Yeşil buton, beyaz yazı

**Nerede Kullanılıyor:**

- ✅ `src/app/vaka-analizleri/[slug]/page.js` - Yazı
- ✅ `src/app/blog/[slug]/page.js` - Arka plan
- ✅ Buton yazıları

---

## 3️⃣ DINAMIK RENKLER (rgba - Saydam Renkler)

**Ne için?** Transparent (saydam) efektler - gölgeler, soft arka planlar, hover efektleri

**Opacity nedir?** 0 = tamamen saydam (görmez), 1 = tamamen opak (görünür)

---

### rgba(255, 255, 255, X) - Beyaz Transparanlık

**Ne için?** Beyaz renkli gölgeler, soft beyaz arka planlar, frosted glass efekti

#### 💡 Kullanım Örnekleri:

**1. Card Arka Planı - Hafif Beyaz (0.9 = %90 opak):**

```jsx
<Card sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
  Bu kart neredeyse tamamen beyaz, biraz saydam
</Card>
```

👉 Sonuç: Kart %90 beyaz, %10 arka plan görünür (frosted glass efekti)

**2. Çok Saydam Beyaz (0.5 = %50 opak):**

```jsx
<Box sx={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
  Bu alan yarı saydam beyaz
</Box>
```

👉 Sonuç: Arka plan yarı görünür

**3. Neredeyse Saydam (0.3 = %30 opak):**

```jsx
<Box sx={{ border: "1px solid rgba(255,255,255,0.3)" }}>
  Çizgi çok hafif beyaz
</Box>
```

👉 Sonuç: Çizgi çok ince, neredeyse görünmez

---

### rgba(0, 0, 0, X) - Siyah Transparanlık

**Ne için?** Gölgeler, karartma efektleri, disable durumları

#### 💡 Kullanım Örnekleri:

**1. Kütü Gölgesi (0.1 = %10 opak):**

```jsx
<Box
  sx={{
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  }}
>
  Hafif gölge (az belirgin)
</Box>
```

👉 Sonuç: Kutunun altında çok hafif gölge

**2. Daha Kalın Gölge (0.2 = %20 opak):**

```jsx
<Box
  sx={{
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  }}
>
  Daha belirgin gölge
</Box>
```

👉 Sonuç: Kutunun altında belirgin gölge

**3. Disabled/Pasif Durumu (0.5 = %50 opak):**

```jsx
<Button disabled sx={{ opacity: 0.5 }}>
  Tıklanamayan Buton
</Button>
```

👉 Sonuç: Buton soluk, pasif görünür

---

### rgba(124, 158, 135, X) - Yeşil Transparanlık

**Ne için?** Yeşil tabanlı gölgeler, hover efektleri, dekoratif gradients

#### 💡 Kullanım Örnekleri:

**1. Yeşil Gölge (0.15 = %15 opak):**

```jsx
<Box
  sx={{
    boxShadow: "0px 20px 50px rgba(124,158,135,0.15)",
  }}
>
  Yeşilimsi gölge
</Box>
```

👉 Sonuç: Kutunun altında yeşilimsi hafif gölge

**2. Hover Efekti (0.2 = %20 opak):**

```jsx
<Box
  sx={{
    "&:hover": {
      boxShadow: "0px 20px 50px rgba(124,158,135,0.2)",
    },
  }}
>
  Mouse gelince yeşilimsi gölge artar
</Box>
```

👉 Sonuç: Hover durumunda daha belirgin gölge

**3. Gradient (Renk Geçişi):**

```jsx
<Box
  sx={{
    background:
      "radial-gradient(circle, #7C9E87 0%, rgba(124,158,135,0.3) 100%)",
  }}
>
  Merkez yeşil, kenarlar saydam
</Box>
```

👉 Sonuç: Daire şeklinde yeşil gradyan

---

### Özel Kombinasyonlar:

**Linear Gradient - Renk Geçişi:**

```jsx
<Box
  sx={{
    background:
      "linear-gradient(135deg, rgba(250,248,245,0.97) 0%, rgba(245,240,234,0.92) 50%, rgba(168,197,176,0.3) 100%)",
  }}
>
  Soldan sağa renk geçişi: krem → açık kahve → yeşil
</Box>
```

👉 Sonuç: Köşegen renk geçişi

**Transparent - Tamamen Saydam:**

```jsx
<Button
  sx={{
    backgroundColor: "transparent",
    border: "2px solid primary.main",
  }}
>
  Boş buton (çerçevesi yeşil)
</Button>
```

👉 Sonuç: Buton arka planı tamamen saydam, sadece yeşil çerçeve görünür

**Nerede Kullanılıyor:**

- Tüm kartlar - `rgba(255,255,255,0.9)` arka planı
- Butonlar - `rgba(0,0,0,0.08)` border
- Gölgeler - `rgba(124,158,135,0.15)` şekilde
- Form alanları - `rgba(0,0,0,0.05)` arka planı

---

---

## 4️⃣ VERİ DOSYALARINDAKI RENKLER

### src/data/kendine-bir-mola.js

**Ne için?** Egzersizlerin kendine özgü renkleri - her egzersiz farklı renkle kodlanır

#### 💡 Kod Örneği:

```javascript
// src/data/kendine-bir-mola.js
export const egzersizler = [
  {
    id: 1,
    duygu: "hissettiğin",
    renk: "#7C9E87", // Birinci egzersiz - YEŞIL
    // ... diğer özellikler
  },
  {
    id: 2,
    duygu: "işittiğin",
    renk: "#8FA8C8", // İkinci egzersiz - MAVİ
    // ... diğer özellikler
  },
  {
    id: 3,
    duygu: "duyduğun",
    renk: "#C4A882", // Üçüncü egzersiz - KAHVE
    // ... diğer özellikler
  },
];
```

#### 💡 Nasıl Kullanılıyor?

```jsx
// src/components/sections/kendineBirMola/components/FarkindalikEgzersizi.js
{
  egzersizler.map((egzersiz) => (
    <Box key={egzersiz.id}>
      {/* Başlık - Egzersizin rengine göre boyanır */}
      <Box
        sx={{
          backgroundColor: egzersiz.renk, // ✅ Veri dosyasından renk alınır
          color: "white",
          p: 2,
        }}
      >
        {egzersiz.duygu}
      </Box>
    </Box>
  ));
}
```

👉 Sonuç: Her egzersiz kartının üst şeridi kendi rengine boyanır

---

## 5️⃣ EMAIL ŞABLONLARINDAKI RENKLER

### src/lib/email-templates.js - İnline CSS (HTML içi renk)

**Ne için?** E-posta tasarımı - HTML ile yazılı direkt renkler

#### 💡 Kod Örneği:

```html
<!-- src/lib/email-templates.js içinde -->
<div style="background-color: #7C9E87; padding: 30px;">
  <h2 style="color: #ffffff;">Randevu Onaylandı</h2>
</div>

<div style="background-color: #FDFCFB; border: 1px solid #EDE8E0;">
  <p style="color: #3D3530;">Randevu tarihi: 15 Mayıs 2026</p>
  <p style="color: #7A6E68;">Başlangıç saati: 14:00</p>
</div>
```

👉 Sonuç: E-posta alıcı şu renkleri görür:

- Başlık alanı: Yeşil arka plan (#7C9E87), beyaz yazı
- İçerik: Açık krem arka plan (#FDFCFB), koyu yazı

#### Kullanılan Renkler:

| Renk    | Kullanım                       |
| ------- | ------------------------------ |
| #7C9E87 | Header arka planı (YEŞIL)      |
| #FFFFFF | Header yazısı (BEYAZ)          |
| #3D3530 | Ana yazı (KOYU KAHVE)          |
| #7A6E68 | İkincil yazı (AÇIK KAHVE)      |
| #FAF8F5 | Sayfa arka planı (KREM)        |
| #FDFCFB | İçerik kutusu (ÇOOK AÇIK KREM) |

---

### src/app/actions/admin.js - Dinamik Renk

**Ne için?** Admin e-postalarında randevu durumuna göre renk

#### 💡 Kod Örneği:

```javascript
// src/app/actions/admin.js
const approveColor = isApproved ? "#7C9E87" : "#d32f2f";
// isApproved = true → YEŞIL (#7C9E87)
// isApproved = false → KIRMIZI (#d32f2f)

const html = `
  <h2 style="color: ${approveColor};">
    ${isApproved ? "Randevu Onaylandı" : "Randevu Reddedildi"}
  </h2>
`;
```

👉 Sonuç:

- Onaylandıysa: Yeşil başlık
- Reddedildiyse: Kırmızı başlık

---

## 6️⃣ CSS DOSYALARI (Global Stiller)

### src/app/globals.css - CSS Değişkenleri

**Ne için?** Tüm sayfanın genel görünümü (light/dark mode)

#### 💡 Kod Örneği:

```css
/* src/app/globals.css */

/* Light Mode (Varsayılan) */
:root {
  --background: #ffffff; /* Sayfa arka planı - BEYAZ */
  --foreground: #171717; /* Yazı rengi - ÇOK KOYU SIYAH */
}

/* Dark Mode (Tercih edilirse) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a; /* Sayfa arka planı - KOYU */
    --foreground: #ededed; /* Yazı rengi - AÇIK GRİ */
  }
}
```

Kullanım:

```css
body {
  background: var(--background);
  color: var(--foreground);
}
```

👉 Sonuç: Kullanıcı dark mode açarsa, sayfa oto'matik koyu olur

---

## 📝 ÖZET - RENKLERİ NEREDEN ALIYORUM?

```
┌─────────────────────────────────────────┐
│ RENK NEREDEN GELİR?                     │
├─────────────────────────────────────────┤
│ 1. src/theme/theme.js                   │
│    ↓                                     │
│    theme.palette içinde tanımlanmış      │
│    ↓                                     │
│    JSX'te color="primary.main" yazılır   │
│                                          │
│ 2. Veri dosyalarından (data/*.js)        │
│    ↓                                     │
│    renk: "#7C9E87" şeklinde yazılır      │
│    ↓                                     │
│    {item.renk} olarak kullanılır         │
│                                          │
│ 3. Direkt yazılır (❌ KÖTÜ)              │
│    ↓                                     │
│    sx={{ color: "#9e7c93" }}             │
│    ↓                                     │
│    Her dosyada farklı yazılır            │
│    ↓                                     │
│    Değiştirmek zor olur                  │
│                                          │
│ 4. CSS Değişkenleri (globals.css)        │
│    ↓                                     │
│    var(--background)                     │
│    ↓                                     │
│    Global stil uygulanır                 │
│                                          │
│ 5. E-posta Şablonları (inline HTML)      │
│    ↓                                     │
│    style="color: #7C9E87"                │
│    ↓                                     │
│    E-posta görüntüsü düzenlenir          │
└─────────────────────────────────────────┘
```

---

## ✅ DOĞRU YOL - RENK KULLANMAK

### ✅ İyi Örnek (Theme'den):

```jsx
<Button sx={{ color: "primary.main" }}>Tıkla</Button>
```

✅ Avantajlar:

- Kolay değiştirilir (theme.js'de bir kez değiştir, heryerde değişir)
- Tutarlı görünüm
- Tema desteği kolay

### ❌ Kötü Örnek (Hardcoded):

```jsx
<Button sx={{ color: "#9e7c93" }}>Tıkla</Button>
```

❌ Sorunlar:

- Her yerde yazman gerekir
- Renk değişsin mi? Tüm dosyaları düzenle
- Yönetmesi zor

---

## 🎨 RENK PALETİ ÖZETI

### Tema Renkleri (THEME.JS)

```
PRIMARY (Yeşil)
  main:   #7C9E87 ← Ana renk
  light:  #A8C5B0 ← Açık versiyon
  dark:   #5A7A63 ← Koyu versiyon

SECONDARY (Mavi) - Nadir kullanım
  main:   #8FA8C8
  light:  #B8CCE0
  dark:   #6B8AAD

BACKGROUND (Arka Planlar)
  default: #FAF8F5 ← Sayfa arka planı
  paper:   #F5F0EA ← Kart arka planı

TEXT (Yazılar)
  primary:   #3D3530 ← Ana yazı (KOYU)
  secondary: #7A6E68 ← İkincil yazı (AÇIK)

CUSTOM
  taupe: #C4B5A5 ← Border/çizgi

```

### Hardcoded Renkler (KÖTÜ ❌)

```
#9E7C93  ← Lila (Navbar, Footer, ikonlar)
#C4A882  ← Kahve (Egzersiz kartları)
#FFFFFF  ← Beyaz (Kontrast, yazı)
```

### Dinamik Renkler (RGBA)

```
rgba(255,255,255,0.9)    ← Beyaz kartlar
rgba(0,0,0,0.1)          ← Hafif gölgeler
rgba(124,158,135,0.15)   ← Yeşil gölgeler
rgba(0,0,0,0.5)          ← Karartma
```

---

## 🚀 RENK YÖNETİMİ İYİLEŞTİRME PLANI

### Adım 1: Theme.js'i Genişlet ✅

```javascript
// src/theme/theme.js
const theme = createTheme({
  palette: {
    // Mevcut renkler...

    // YENİ RENKLER:
    accent: {
      main: "#9E7C93", // Lila
      light: "#B8A3C1",
      dark: "#6B5570",
    },
    highlight: {
      warm: "#C4A882", // Kahve
    },
  },
});
```

### Adım 2: Hardcoded Renkleri Değiştir ✅

**Önce:**

```jsx
<Typography sx={{ color: "#9e7c93" }}>Hakkımda</Typography>
```

**Sonra:**

```jsx
<Typography sx={{ color: "accent.main" }}>Hakkımda</Typography>
```

### Adım 3: Veri Dosyalarını Düzenle ✅

```javascript
// src/data/kendine-bir-mola.js
export const egzersizler = [
  { renk: "accent.main" }, // String yerine
  { renk: "#C4A882" }, // Direkt renk yazma
];
```

### Adım 4: E-posta Şablonlarını Güncelle ✅

```javascript
// src/lib/email-templates.js
const PRIMARY_COLOR = "#7C9E87";
const TEXT_DARK = "#3D3530";

const html = `<div style="background-color: ${PRIMARY_COLOR};">
  Şeyma İnan
</div>`;
```

---

## 📊 DOSYA BAŞINA RENK SAYISI

| Dosya                   | Renk Sayısı | Tür       |
| ----------------------- | ----------- | --------- |
| theme.js                | 8+          | Theme     |
| HeroContent.jsx         | 2           | Hardcoded |
| Navbar.js               | 1           | Hardcoded |
| Footer.js               | 1           | Hardcoded |
| iletisimForm.js         | 1           | Hardcoded |
| VakaAnalizleri.js       | 2           | Hardcoded |
| email-templates.js      | 8+          | Inline    |
| kendine-bir-mola.js     | 3           | Veri      |
| FarkindalikEgzersizi.js | 1           | Veri      |

---

## 🎯 HIZLI REFERANS - RENK KÖD PALETİ

Yazılımda yeni olduğun için, işte en sık kullandığın renkler:

```
YEŞIL (Ana Renk)
color: "primary.main"      ← Butonlar, bağlantılar
bgcolor: "primary.main"    ← Arka planlar, başlıklar

YAZILER
color: "text.primary"      ← Başlıklar, ana yazı
color: "text.secondary"    ← Açıklamalar, tarihler

ARKA PLANLAR
bgcolor: "background.default"  ← Sayfa tamamı
bgcolor: "background.paper"    ← Kartlar





BEYAZ
color: "white"             ← Yeşil arka planda yazı

GÖLGELER
boxShadow: "0 4px 8px rgba(0,0,0,0.1)"  ← Hafif gölge
```

---

## ❓ SORULAR & CEVAPLAR

**S: Renk değiştirmek istiyorum, nerede değiştirim?**
A: `src/theme/theme.js` içinde `palette` bölümünde. Bir renk değişirse, tüm proje otomatik güncellenir.

**S: #9E7C93 nerden geliyor?**
A: Direkt kod içinde yazılmış. Theme.js'e eklenmesi lazım, sonra her yerde `color: "accent.main"` yazabilirsin.

**S: rgba(255,255,255,0.9) ne demek?**
A: 0.9 = %90 opaklık. Yani %90 beyaz, %10 arka plan görünür. Frosted glass efekti yaratır.

**S: Renkler sayfada görünmüyor?**
A: 1. Theme export edilerek gerekir, 2. `sx={{}}` prop'u kullanmalısın, 3. renk adı doğru olmalı.

**S: E-postada renk farklı göründü?**
A: E-posta istemcileri CSS desteklemiyor, inline `style=""` kullanmalısın.
