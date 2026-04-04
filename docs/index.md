---
layout: home

hero:
  name: "Stadata JS"
  text: "SDK untuk BPS WebAPI"
  tagline: Akses data statistik resmi Indonesia dengan TypeScript/JavaScript — type-safe, modern, dan mudah digunakan.
  image:
    src: /logo.svg
    alt: Stadata JS
  actions:
    - theme: brand
      text: Mulai Sekarang
      link: /guide/memulai
    - theme: alt
      text: API Reference
      link: /api/domains
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/stadata-js

features:
  - icon: 🔷
    title: Full TypeScript Support
    details: Definisi tipe lengkap untuk semua endpoint API dengan dukungan IntelliSense. Tulis kode lebih cepat dengan autocomplete.

  - icon: 🏗️
    title: Clean Architecture
    details: Mengikuti prinsip Clean Architecture dengan pemisahan concern yang jelas — domain, data, dan presentation layer terpisah.

  - icon: ✅
    title: Result Pattern
    details: Menggunakan neverthrow untuk error handling yang elegan dan fungsional. Tidak ada lagi try-catch yang berantakan.

  - icon: 💉
    title: Dependency Injection
    details: DI container bawaan untuk arsitektur yang fleksibel dan mudah di-test.

  - icon: ⚡
    title: Request Cancellation
    details: Dukungan untuk membatalkan request yang sedang berjalan — optimalkan performa aplikasi kamu.

  - icon: 📄
    title: Pagination Support
    details: Penanganan pagination bawaan untuk semua list endpoint. Navigasi data besar dengan mudah.

  - icon: 🛡️
    title: Immutable Entities
    details: Semua domain entity bersifat immutable untuk perilaku yang predictable dan aman.

  - icon: 🌐
    title: ESM + CommonJS
    details: Mendukung ES Modules dan CommonJS. Bisa digunakan di Node.js, browser, maupun bundler modern.
---

## Instalasi Cepat

```bash
# npm
npm install stadata-js

# pnpm
pnpm add stadata-js

# yarn
yarn add stadata-js
```

## Contoh Penggunaan

```typescript
import { initStadata, usePublications, useDomains, DataLanguage, DomainType } from 'stadata-js'

// 1. Inisialisasi sekali di entry point
initStadata({ apiKey: 'your-api-key-here' })

// 2. Gunakan composables di mana saja — tidak perlu import client
const { fetchDomainList } = useDomains()
const { fetchPublicationList } = usePublications()

// 3. Fetch data
const result = await fetchDomainList({
  type: DomainType.ALL,
  lang: DataLanguage.ID,
})

result.match(
  ({ data, pagination }) => {
    console.log('Domains:', data)
    console.log('Total:', pagination.total)
  },
  (error) => console.error('Error:', error.message)
)
```

> **API Key**: Dapatkan API key kamu di [BPS WebAPI Platform](https://webapi.bps.go.id/).
