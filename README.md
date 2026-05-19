# Kütahya Tasarım Teknokent - i18n (Çoklu Dil Desteği)

Next.js 15 ve **next-intl** kullanılarak Türkçe / İngilizce çoklu dil desteği eklenmiş kurumsal web sitesi.

## 🌐 i18n Yapısı

### Desteklenen Diller

| Dil | Kod | Varsayılan |
|-----|-----|------------|
| Türkçe | `tr` | ✅ |
| İngilizce | `en` | |

### Dosya Yapısı

```
├── i18n/
│   ├── routing.ts          # Dil routing yapılandırması (locales, defaultLocale)
│   ├── request.ts          # Sunucu tarafı i18n isteği
│   └── navigation.ts       # Link, useRouter gibi i18n navigasyon araçları
├── messages/
│   ├── tr.json             # Türkçe çeviriler
│   └── en.json             # İngilizce çeviriler
├── middleware.ts            # Locale algılama ve yönlendirme
└── app/[locale]/            # Dil bazlı dinamik routing
```

### Nasıl Çalışır

- URL'ler `/tr/...` ve `/en/...` şeklinde dil prefixi alır
- Varsayılan dil Türkçe (`tr`) olarak ayarlanmıştır
- `middleware.ts` gelen istekleri uygun locale'e yönlendirir
- Bileşenlerde `useTranslations('Namespace')` hook'u ile çeviriler kullanılır

### Yeni Dil Ekleme

1. `messages/` altına yeni çeviri dosyası oluşturun (ör. `de.json`)
2. `i18n/routing.ts` dosyasındaki `locales` dizisine yeni dil kodunu ekleyin:
   ```ts
   locales: ['tr', 'en', 'de']
   ```

### Kullanım Örneği

```tsx
import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('Header')
  return <h1>{t('title')}</h1>
}
```

## ⚙️ Kurulum

```bash
npm install
npm run dev
```
