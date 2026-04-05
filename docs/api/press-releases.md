# Press Releases

Siaran pers resmi BPS — pengumuman data ekonomi, demografi, dan statistik terbaru.

## List Press Releases

```typescript
import { usePressReleases, DataLanguage } from 'stadata-js'

const { fetchPressReleaseList } = usePressReleases()

const result = await fetchPressReleaseList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'inflasi',
  year: 2024,
  month: 1,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `keyword` | `string` | ❌ | Kata kunci pencarian |
| `month` | `number` | ❌ | Filter bulan (1-12) |
| `year` | `number` | ❌ | Filter tahun |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Press Release

```typescript
const { fetchPressReleaseDetail } = usePressReleases()

const result = await fetchPressReleaseDetail({
  id: 'release-id',
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID siaran pers |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class PressRelease {
  id: string;
  title: string;
  cover: string;
  pdf: string;
  size: string;
  abstract: string | null;
  releaseDate: Date | null;
  updateDate: Date | null;
  category: string | null;
}
```
