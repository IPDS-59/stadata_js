# Trade

## Penggunaan

```typescript
import { useTrade, DataLanguage } from 'stadata-js'

const { fetchTradeData } = useTrade()

const result = await fetchTradeData({
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
- `type: string — 'ekspor' | 'impor'`
- `year: number`
- `month?: number`
- `hs2?: string`

## Tipe Data

```typescript
interface TradeParams {
  domain: string;
  lang: DataLanguage;
  type: string; // 'ekspor' | 'impor'
  year: number;
  month?: number;
  hs2?: string;
}
```
