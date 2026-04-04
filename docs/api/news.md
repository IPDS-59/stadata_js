# News

Berita terbaru dari BPS — pengumuman, rilis data, dan informasi statistik.

## List News

```typescript
import { useNews, DataLanguage } from 'stadata-js'

const { fetchNewsList } = useNews()

const result = await fetchNewsList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'sensus',
  newsCategoryId: '1',
  year: 2024,
  month: 1,
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
| `newsCategoryId` | `string` | ❌ | Filter berdasarkan ID kategori berita |
| `month` | `number` | ❌ | Filter bulan (1-12) |
| `year` | `number` | ❌ | Filter tahun |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View News

```typescript
const { fetchNewsDetail } = useNews()

const result = await fetchNewsDetail({
  id: 'news-id',
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID berita |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class News {
  id: string;
  title: string;
  content: string;
  category: string | null;
  categoryId: string | null;
  picture: string | null;
  releaseDate: Date | null;
}
```
