# Periods

## Penggunaan

```typescript
import { usePeriods, DataLanguage } from 'stadata-js'

const { fetchPeriodList } = usePeriods()

const result = await fetchPeriodList({
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
- `variableId?: number`

## Tipe Data

```typescript
class Period {
  id: string;
  name: string;
}
```
