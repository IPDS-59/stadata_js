# Derived Variables

Variabel turunan BPS — variabel yang diturunkan dari variabel lain.

## List Derived Variables

```typescript
import { useDerivedVariables, DataLanguage } from 'stadata-js'

const { fetchDerivedVariableList } = useDerivedVariables()

const result = await fetchDerivedVariableList({
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
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `variableId` | `number` | ❌ | Filter berdasarkan ID variabel induk |
| `verticalGroup` | `number` | ❌ | Filter berdasarkan ID grup variabel vertikal |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## Tipe Data

```typescript
class DerivedVariable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  unit: string | null;
  notes: string | null;
  csa: string | null;
  graphName: string | null;
}
```
