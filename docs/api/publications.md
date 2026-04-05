# Publications

Publikasi resmi BPS — laporan statistik, buletin, dan dokumen resmi.

## List Publications

```typescript
import { usePublications, DataLanguage } from 'stadata-js'

const { fetchPublicationList } = usePublications()

const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'inflasi',
  year: 2023,
  month: 6,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(pub => console.log(pub.title))
  },
  (err) => console.error(err.message)
)
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS (misal: `'7200'`) |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `keyword` | `string` | ❌ | Kata kunci pencarian |
| `month` | `number` | ❌ | Filter bulan (1-12) |
| `year` | `number` | ❌ | Filter tahun |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Publication

```typescript
const { fetchPublicationDetail } = usePublications()

const result = await fetchPublicationDetail({
  id: 'publication-id',
  domain: '7200',
  lang: DataLanguage.ID,
})

result.match(
  (pub) => console.log(pub.title, pub.pdf),
  (err) => console.error(err.message)
)
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID publikasi |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## Tipe Data

```typescript
class Publication {
  id: string;
  title: string;
  issn: string;
  cover: string;              // URL cover image
  pdf: string;                // URL file PDF
  size: string;
  scheduledDate: Date | null;
  releaseDate: Date | null;
  updateDate: Date | null;
  abstract: string | null;
  catalogueNumber: string | null;
  publicationNumber: string | null;
  relatedPublications: RelatedPublication[];
}
```
