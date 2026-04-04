# Variables

## Penggunaan

```typescript
import { useVariables, DataLanguage } from 'stadata-js'

const { fetchVariableList, fetchVariableDetail } = useVariables()

const result = await fetchVariableList({
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
- `subjectId?: number`

## Detail — VariableDetail

```typescript
const result = await fetchVariableDetail({
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
class Variable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  unit: string | null;
}
```
