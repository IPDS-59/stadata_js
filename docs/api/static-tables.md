# Static Tables

## Penggunaan

```typescript
import { useStaticTables, DataLanguage } from 'stadata-js'

const { fetchStaticTableList, fetchStaticTableDetail } = useStaticTables()

const result = await fetchStaticTableList({
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

## Detail — StaticTableDetail

```typescript
const result = await fetchStaticTableDetail({
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
class StaticTable {
  id: number;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
  excel: string; // URL Excel
}
```
