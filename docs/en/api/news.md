# News

Latest BPS news.

## Usage

```typescript
import { useNews, DataLanguage } from 'stadata-js'

const { fetchNewsList, fetchNewsDetail } = useNews()

const result = await fetchNewsList({
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
**Parameters:** keyword, newsCategoryId, month, year — optional

## fetchNewsDetail

```typescript
const result = await fetchNewsDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
