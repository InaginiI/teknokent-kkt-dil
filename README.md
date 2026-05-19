# Kütahya Tasarım Teknokent - Kurumsal Web Sitesi

Kütahya Dumlupınar Tasarım Teknokent'in çok dilli (Türkçe / İngilizce) kurumsal web sitesi.

## 🚀 Teknolojiler

- **Next.js 15** — React tabanlı full-stack framework
- **TypeScript**
- **next-intl** — i18n (çoklu dil desteği)
- **Mantine UI** — Bileşen kütüphanesi
- **Tailwind CSS 4**
- **Radix UI** — Erişilebilir UI bileşenleri

## 📁 Proje Yapısı

```
├── app/[locale]/           # Dil bazlı sayfa routing
│   ├── components/         # Ortak bileşenler (Header, Footer, vb.)
│   ├── About/              # Hakkımızda sayfası
│   ├── Fiyatlandirma/      # Fiyatlandırma sayfası
│   ├── TeknokentYonetim/   # Teknokent Yönetimi sayfası
│   ├── YonetimKurulu/      # Yönetim Kurulu sayfası
│   └── isilanlari/         # İş ilanları sayfası
├── i18n/                   # i18n yapılandırması (routing, navigation)
├── messages/               # Çeviri dosyaları (tr.json, en.json)
├── public/                 # Statik dosyalar ve görseller
└── styles/                 # Global stiller
```

## 🌐 Dil Desteği

| Dil | Kod | Varsayılan |
|-----|-----|------------|
| Türkçe | `tr` | ✅ |
| İngilizce | `en` | |

Çeviri dosyaları `messages/` klasöründe bulunur. Yeni bir dil eklemek için:
1. `messages/` altına yeni JSON dosyası ekleyin (ör. `de.json`)
2. `i18n/routing.ts` içindeki `locales` dizisine yeni dil kodunu ekleyin

## ⚙️ Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Prodüksiyon build
npm run build
npm start
```

Geliştirme sunucusu varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışır.

## 📄 Sayfalar

- **Ana Sayfa** — Hero, kurumsal bilgiler, firmalar, başvuru süreci, haberler, hizmetler
- **Hakkımızda** — Teknokent tanıtımı, misyon ve vizyon
- **Yönetim Kurulu** — Kurul üyeleri ve kurumsal bilgiler
- **Teknokent Yönetimi** — Departmanlar ve yönetim kadrosu
- **Fiyatlandırma** — Ofis ve proje ücretleri
- **İş İlanları** — Açık pozisyonlar
