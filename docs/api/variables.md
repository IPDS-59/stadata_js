# Variables

Variabel statistik BPS — indikator yang digunakan dalam pengumpulan data.

## List Variables

```typescript
import { useVariables, DataLanguage } from 'stadata-js'

const { fetchVariableList } = useVariables()

const result = await fetchVariableList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  subjectId: 3,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ❌ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `subjectId` | `number` | ❌ | Filter berdasarkan ID subjek |
| `showDeleted` | `boolean` | ❌ | Tampilkan item yang dihapus |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Variable

```typescript
const { fetchVariableDetail } = useVariables()

const result = await fetchVariableDetail({
  id: 1234,
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID variabel |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class Variable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  verticalVariableId: number;
  unit: string | null;
  notes: string | null;
  graphName: string | null;
  csa: string | null;
}
```
