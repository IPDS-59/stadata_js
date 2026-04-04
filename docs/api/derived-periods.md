# Derived Periods

## Penggunaan

```typescript
import { useDerivedPeriods, DataLanguage } from 'stadata-js'

const { fetchDerivedPeriodList } = useDerivedPeriods()

const result = await fetchDerivedPeriodList({
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
class DerivedPeriod {
  id: string;
  name: string;
}
```
