# Trade

Data perdagangan ekspor/impor BPS.

## Fetch Trade Data

```typescript
import { useTrade, TradeSource, TradePeriod, HSCodeType } from 'stadata-js'

const { fetchTradeData } = useTrade()

// Data ekspor bulanan
const result = await fetchTradeData({
  source: TradeSource.Export,
  period: TradePeriod.Monthly,
  hsCode: '01',
  hsType: HSCodeType.TwoDigit,
  year: '2023',
})

result.match(
  (data) => console.log(data),
  (err) => console.error(err.message)
)
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `source` | `TradeSource` | ✅ | Sumber data |
| `period` | `TradePeriod` | ✅ | Periode data |
| `hsCode` | `string` | ✅ | Kode HS. Gunakan `;` untuk multiple kode |
| `hsType` | `HSCodeType` | ✅ | Tipe kode HS |
| `year` | `string` | ✅ | Tahun data |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

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

### Contoh Multiple HS Code

```typescript
// Data ekspor untuk beberapa HS code
const result = await fetchTradeData({
  source: TradeSource.Export,
  period: TradePeriod.Monthly,
  hsCode: '01;02;03',        // Multiple dengan separator ;
  hsType: HSCodeType.TwoDigit,
  year: '2023',
})
```
