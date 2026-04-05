# News Categories

Kategori berita BPS.

## List News Categories

```typescript
import { useNewsCategories, DataLanguage } from 'stadata-js'

const { fetchNewsCategoryList } = useNewsCategories()

const result = await fetchNewsCategoryList({
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
class NewsCategory {
  id: string;
  name: string;
}
```
