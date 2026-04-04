# News Categories

BPS news categories.

## Usage

```typescript
import { useNewsCategories, DataLanguage } from 'stadata-js'

const { fetchNewsCategoryList } = useNewsCategories()

const result = await fetchNewsCategoryList({
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

