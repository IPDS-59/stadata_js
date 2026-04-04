# Press Releases

## Penggunaan

```typescript
import { usePressReleases, DataLanguage } from 'stadata-js'

const { fetchPressReleaseList, fetchPressReleaseDetail } = usePressReleases()

const result = await fetchPressReleaseList({
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
- `keyword?: string`
- `month?: number`
- `year?: number`

## Detail — PressReleaseDetail

```typescript
const result = await fetchPressReleaseDetail({
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
class PressRelease {
  id: string;
  title: string;
  cover: string;
  pdf: string;
  size: string;
  releaseDate: Date | null;
  abstract: string | null;
}
```
