# Static Tables

BPS static tables.

## Usage

```typescript
import { useStaticTables, DataLanguage } from 'stadata-js'

const { fetchStaticTableList, fetchStaticTableDetail } = useStaticTables()

const result = await fetchStaticTableList({
  domain: '7200',
  lang: DataLanguage.EN,
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
**Parameters:** keyword, year — optional filters

## fetchStaticTableDetail

```typescript
const result = await fetchStaticTableDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
