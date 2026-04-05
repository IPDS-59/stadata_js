# Periods

Periode data statistik BPS — tahunan, triwulan, bulanan, dll.

## List Periods

```typescript
import { usePeriods, DataLanguage } from 'stadata-js'

const { fetchPeriodList } = usePeriods()

const result = await fetchPeriodList({
  domain: '7200',
  lang: DataLanguage.ID,
  variableId: 529,
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

::: tip
`variableId` diperlukan saat menggunakan hasil period untuk query `useDynamicTables()`.
:::

## Tipe Data

```typescript
class Period {
  id: string;
  name: string;
}
```
