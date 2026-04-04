# Infographics

## Penggunaan

```typescript
import { useInfographics, DataLanguage } from 'stadata-js'

const { fetchInfographicList } = useInfographics()

const result = await fetchInfographicList({
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

## Tipe Data

```typescript
class Infographic {
  id: string;
  title: string;
  image: string;
}
```
