# Domains

Domain merepresentasikan wilayah/kantor BPS (provinsi, kabupaten/kota, atau nasional).

## List Domains

```typescript
const result = await stadata.list.domains({
  lang: DataLanguage.ID,    // Bahasa respons
  page: 1,                  // Halaman (default: 1)
  perPage: 10,              // Item per halaman (default: 10)
  type: DomainType.ALL,     // Tipe domain (opsional)
});
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `lang` | `DataLanguage` | ✅ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `type` | `DomainType` | ❌ | Filter tipe domain |

### DomainType

```typescript
enum DomainType {
  ALL = 'all',
  PROVINCE = 'prov',
  REGENCY = 'kab',
}
```

## Tipe Data

```typescript
class Domain {
  id: string;    // Kode domain BPS (misal: '7200' untuk Sulteng)
  name: string;  // Nama wilayah
  url: string;   // URL portal BPS wilayah
}
```

## Contoh

```typescript
import { StadataJS, DataLanguage, DomainType } from 'stadata-js';

const stadata = StadataJS.instance;

// Semua domain
const all = await stadata.list.domains({ lang: DataLanguage.ID });

// Hanya provinsi
const provinces = await stadata.list.domains({
  lang: DataLanguage.ID,
  type: DomainType.PROVINCE,
});

all.match(
  ({ data }) => data.forEach(d => console.log(d.id, d.name)),
  (err) => console.error(err.message)
);
```
