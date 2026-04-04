# Publications

Official BPS statistical publications.

## Usage

```typescript
import { usePublications, DataLanguage } from 'stadata-js'

const { fetchPublicationList, fetchPublicationDetail } = usePublications()

const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.EN,
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
**Parameters:** keyword, year, month — optional filters

## fetchPublicationDetail

```typescript
const result = await fetchPublicationDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
