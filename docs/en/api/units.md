# Units

BPS measurement units.

## Usage

```typescript
import { useUnits, DataLanguage } from 'stadata-js'

const { fetchUnitList, fetchUnitDetail } = useUnits()

const result = await fetchUnitList({
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
**Parameters:** variableId — optional

## fetchUnitDetail

```typescript
const result = await fetchUnitDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
