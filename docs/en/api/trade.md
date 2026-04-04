# Trade

BPS export/import trade data.

## Fetch Trade Data

```typescript
import { useTrade, TradeSource, TradePeriod, HSCodeType } from 'stadata-js'

const { fetchTradeData } = useTrade()

const result = await fetchTradeData({
  source: TradeSource.Export,
  period: TradePeriod.Monthly,
  hsCode: '01',
  hsType: HSCodeType.TwoDigit,
  year: '2023',
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source` | `TradeSource` | ✅ | Data source |
| `period` | `TradePeriod` | ✅ | Data period |
| `hsCode` | `string` | ✅ | HS Code. Use `;` for multiple codes |
| `hsType` | `HSCodeType` | ✅ | HS Code type |
| `year` | `string` | ✅ | Data year |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

### Enums

```typescript
enum TradeSource {
  Export = 1,
  Import = 2,
}

enum TradePeriod {
  Monthly = 1,
  Annually = 2,
}

enum HSCodeType {
  TwoDigit = 1,  // 2-digit HS code
  Full = 2,      // Full HS code
}
```

### Multiple HS Codes

```typescript
const result = await fetchTradeData({
  source: TradeSource.Import,
  period: TradePeriod.Annually,
  hsCode: '01;02;03',        // Semicolon-separated
  hsType: HSCodeType.TwoDigit,
  year: '2023',
})
```
