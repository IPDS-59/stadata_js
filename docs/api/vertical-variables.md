# Vertical Variables

Variabel vertikal BPS — klasifikasi vertikal dari variabel statistik.

## List Vertical Variables

```typescript
import { useVerticalVariables, DataLanguage } from 'stadata-js'

const { fetchVerticalVariableList } = useVerticalVariables()

const result = await fetchVerticalVariableList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
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
| `variableId` | `number` | ❌ | Filter berdasarkan ID variabel |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## Tipe Data

```typescript
class VerticalVariable {
  id: number;
  title: string;
  itemId: number | null;
  groupId: number | null;
  name: string | null;
  notes: string | null;
  type: string | null;
  unit: string | null;
  graphIndicator: boolean;
  subjectId: number;
  subjectName: string;
}
```
