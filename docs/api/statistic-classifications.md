# Statistic Classifications

## Penggunaan

```typescript
import { useStatisticClassifications, DataLanguage } from 'stadata-js'

const { fetchStatisticClassificationList, fetchStatisticClassificationDetail } = useStatisticClassifications()

const result = await fetchStatisticClassificationList({
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
- `type?: ClassificationType`
- `keyword?: string`

## Detail — StatisticClassificationDetail

```typescript
const result = await fetchStatisticClassificationDetail({
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
class StatisticClassification {
  id: string;
  title: string;
  description: string | null;
  type: ClassificationType;
}
```
