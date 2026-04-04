# Derived Periods

Periode turunan BPS — periode untuk variabel turunan.

## List Derived Periods

```typescript
import { useDerivedPeriods, DataLanguage } from 'stadata-js'

const { fetchDerivedPeriodList } = useDerivedPeriods()

const result = await fetchDerivedPeriodList({
  domain: '7200',
  lang: DataLanguage.ID,
  variableId: 529,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ❌ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `variableId` | `number` | ❌ | Filter berdasarkan ID variabel turunan |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## Tipe Data

```typescript
class DerivedPeriod {
  id: string;
  name: string;
}
```
