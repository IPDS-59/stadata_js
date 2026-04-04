# Dynamic Tables

Tabel dinamis BPS — data yang bisa dikustomisasi berdasarkan variabel dan periode.

## Fetch Dynamic Table

```typescript
import { useDynamicTables, DataLanguage } from 'stadata-js'

const { fetchDynamicTableList } = useDynamicTables()

const result = await fetchDynamicTableList({
  domain: '7200',
  lang: DataLanguage.ID,
  variableId: 529,
  periodId: '117',
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ❌ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `variableId` | `number` | ✅ | ID variabel |
| `periodId` | `string` | ✅ | ID periode. Bisa single (`"117"`), range (`"117:123"`), atau multiple (`"117;123"`) |
| `derivedVariableId` | `number` | ❌ | ID variabel turunan |
| `verticalVariableId` | `number` | ❌ | ID variabel vertikal |
| `derivedPeriodId` | `string` | ❌ | ID periode turunan. Format sama dengan `periodId` |
| `page` | `number` | ❌ | Halaman |
| `perPage` | `number` | ❌ | Item per halaman |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

::: tip
Gunakan composable `usePeriods()` dan `useVariables()` untuk mendapatkan ID yang valid.
:::

## Tipe Data

```typescript
class DynamicTable {
  id: string;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
}
```
