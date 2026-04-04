# Vertical Variables

## Penggunaan

```typescript
import { useVerticalVariables, DataLanguage } from 'stadata-js'

const { fetchVerticalVariableList } = useVerticalVariables()

const result = await fetchVerticalVariableList({
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

## Tipe Data

```typescript
class VerticalVariable {
  id: number;
  title: string;
  unit: string | null;
  subjectId: number;
}
```
