# Units

## Penggunaan

```typescript
import { useUnits, DataLanguage } from 'stadata-js'

const { fetchUnitList, fetchUnitDetail } = useUnits()

const result = await fetchUnitList({
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

## Detail — UnitDetail

```typescript
const result = await fetchUnitDetail({
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
class Unit {
  id: number;
  name: string;
}
```
