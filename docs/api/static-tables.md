# Static Tables

Tabel statis BPS — data tabular yang sudah dipublikasikan.

## List Static Tables

```typescript
import { useStaticTables, DataLanguage } from 'stadata-js'

const { fetchStaticTableList } = useStaticTables()

const result = await fetchStaticTableList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'kemiskinan',
  year: 2023,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ❌ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `keyword` | `string` | ❌ | Kata kunci pencarian |
| `month` | `number` | ❌ | Filter bulan (1-12) |
| `year` | `number` | ❌ | Filter tahun |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Static Table

```typescript
const { fetchStaticTableDetail } = useStaticTables()

const result = await fetchStaticTableDetail({
  id: 1234,
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID tabel |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class StaticTable {
  id: number;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
  excel: string;   // URL file Excel
}
```
