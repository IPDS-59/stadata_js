# Mulai Cepat

## Persyaratan

- Node.js >= 16.0.0
- API key dari [BPS WebAPI Platform](https://webapi.bps.go.id/)

## Instalasi

::: code-group

```bash [npm]
npm install stadata-js
```

```bash [pnpm]
pnpm add stadata-js
```

```bash [yarn]
yarn add stadata-js
```

:::

## Inisialisasi

Sebelum menggunakan SDK, inisialisasi dengan API key kamu:

```typescript
import { StadataJS } from 'stadata-js';

await StadataJS.init({
  apiKey: 'your-api-key-here',
  debug: false, // aktifkan untuk logging detail
});

// Akses instance singleton
const stadata = StadataJS.instance;
```

::: warning
`StadataJS.init()` harus dipanggil sekali sebelum menggunakan `StadataJS.instance`. Biasanya di entry point aplikasi kamu.
:::

## Contoh Pertama: Ambil Daftar Domain

```typescript
import { StadataJS, DataLanguage } from 'stadata-js';

await StadataJS.init({ apiKey: 'your-api-key' });
const stadata = StadataJS.instance;

const result = await stadata.list.domains({
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
});

result.match(
  ({ data, pagination }) => {
    console.log(`Total domain: ${pagination.total}`);
    data.forEach(domain => {
      console.log(`${domain.id} - ${domain.name}`);
    });
  },
  (error) => console.error('Error:', error.message)
);
```

## Dua Tipe Operasi

SDK menyediakan dua kategori operasi utama:

| Operasi | Akses | Keterangan |
|---------|-------|------------|
| `stadata.list.*` | List banyak item | Mendukung pagination & filter |
| `stadata.view.*` | Detail satu item | Berdasarkan ID |

```typescript
// List — banyak item dengan pagination
const listResult = await stadata.list.publications({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 5,
});

// View — detail satu item
const viewResult = await stadata.view.publication({
  id: 'pub-id-here',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Language / Bahasa

Gunakan enum `DataLanguage` untuk memilih bahasa respons:

```typescript
import { DataLanguage } from 'stadata-js';

DataLanguage.ID  // Bahasa Indonesia
DataLanguage.EN  // English
```

## Langkah Selanjutnya

- [Konfigurasi Lengkap →](./konfigurasi)
- [Penanganan Error →](./error-handling)
- [API Reference →](../api/domains)
