# Census

## Penggunaan

```typescript
import { useCensus, DataLanguage } from 'stadata-js'

const { fetchCensusList } = useCensus()

const result = await fetchCensusList({
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

## Tipe Data

```typescript
// Census returns union of types based on query
type CensusResult = CensusEvent | CensusTopic | CensusArea | CensusDataset | CensusData
```
