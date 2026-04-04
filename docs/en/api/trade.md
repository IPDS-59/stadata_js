# Trade

BPS export/import trade data.

## Usage

```typescript
import { useTrade, DataLanguage } from 'stadata-js'

const { fetchTradeData } = useTrade()

const result = await fetchTradeData({
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
**Parameters:** type: 'export'|'import', year — required; month, hs2 — optional
