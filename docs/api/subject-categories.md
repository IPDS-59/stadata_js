# Subject Categories

Kategori subjek statistik BPS.

## List Subject Categories

```typescript
import { useSubjectCategories, DataLanguage } from 'stadata-js'

const { fetchSubjectCategoryList } = useSubjectCategories()

const result = await fetchSubjectCategoryList({
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
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## Tipe Data

```typescript
class SubjectCategory {
  id: number;
  name: string;
}
```
