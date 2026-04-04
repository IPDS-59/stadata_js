# Publications

## Penggunaan

```typescript
import { usePublications, DataLanguage } from 'stadata-js'

const { fetchPublicationList, fetchPublicationDetail } = usePublications()

const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(item => console.log(item))
  },
  (err) => console.error(err.message)
)
```

**Parameter tambahan:**
- `keyword?: string — pencarian`
- `month?: number — filter bulan`
- `year?: number — filter tahun`

## Detail — PublicationDetail

```typescript
const result = await fetchPublicationDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.ID,
})

result.match(
  (item) => console.log(item),
  (err) => console.error(err.message)
)
```

## Tipe Data

```typescript
class Publication {
  id: string;
  title: string;
  issn: string;
  cover: string;
  pdf: string;
  size: string;
  releaseDate: Date | null;
  abstract: string | null;
}
```
