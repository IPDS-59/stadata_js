# News

## Penggunaan

```typescript
import { useNews, DataLanguage } from 'stadata-js'

const { fetchNewsList, fetchNewsDetail } = useNews()

const result = await fetchNewsList({
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
- `newsCategoryId?: string`
- `month?: number`
- `year?: number`

## Detail — NewsDetail

```typescript
const result = await fetchNewsDetail({
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
class News {
  id: string;
  title: string;
  content: string;
  picture: string | null;
  releaseDate: Date | null;
}
```
