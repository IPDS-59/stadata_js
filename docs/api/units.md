# Units

Satuan pengukuran BPS.

## List Units

```typescript
import { useUnits, DataLanguage } from 'stadata-js'

const { fetchUnitList } = useUnits()

const result = await fetchUnitList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `variableId` | `number` | ❌ | Filter berdasarkan ID variabel |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Unit

```typescript
const { fetchUnitDetail } = useUnits()

const result = await fetchUnitDetail({
  id: 1,
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID satuan |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class Unit {
  id: number;
  name: string;
}
```
