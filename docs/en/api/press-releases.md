# Press Releases

Official BPS press releases.

## Usage

```typescript
import { usePressReleases, DataLanguage } from 'stadata-js'

const { fetchPressReleaseList, fetchPressReleaseDetail } = usePressReleases()

const result = await fetchPressReleaseList({
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

## fetchPressReleaseDetail

```typescript
const result = await fetchPressReleaseDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
