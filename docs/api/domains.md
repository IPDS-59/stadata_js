# Domains

Domain merepresentasikan wilayah/kantor BPS (provinsi, kabupaten/kota, atau nasional).

## Penggunaan

```typescript
import { useDomains, DataLanguage, DomainType } from 'stadata-js'

const { fetchDomainList } = useDomains()

const result = await fetchDomainList({
  type: DomainType.ALL,
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data }) => data.forEach(d => console.log(d.id, d.name)),
  (err) => console.error(err.message)
)
```

## Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `type` | `DomainType` | ✅ | Tipe domain |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |

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
