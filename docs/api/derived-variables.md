# Derived Variables

## Penggunaan

```typescript
import { useDerivedVariables, DataLanguage } from 'stadata-js'

const { fetchDerivedVariableList } = useDerivedVariables()

const result = await fetchDerivedVariableList({
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
- `variableId?: number`

## Tipe Data

```typescript
class DerivedVariable {
  id: number;
  name: string;
  subjectId: number;
  unit: string | null;
}
```
