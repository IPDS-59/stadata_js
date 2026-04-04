# Strategic Indicators

## Penggunaan

```typescript
import { useStrategicIndicators, DataLanguage } from 'stadata-js'

const { fetchStrategicIndicatorList, fetchStrategicIndicatorDetail } = useStrategicIndicators()

const result = await fetchStrategicIndicatorList({
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
- `year?: number`

## Detail — StrategicIndicatorDetail

```typescript
const result = await fetchStrategicIndicatorDetail({
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
class StrategicIndicator {
  id: string;
  name: string;
  variableId: number;
  periode: string;
  value: number | null;
  unit: string | null;
}
```
