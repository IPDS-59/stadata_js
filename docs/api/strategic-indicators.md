# Strategic Indicators

Indikator strategis BPS — indikator kunci pembangunan nasional.

## List Strategic Indicators

```typescript
import { useStrategicIndicators, DataLanguage } from 'stadata-js'

const { fetchStrategicIndicatorList } = useStrategicIndicators()

const result = await fetchStrategicIndicatorList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `variableId` | `number` | ❌ | Filter berdasarkan ID variabel |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Strategic Indicator

```typescript
const { fetchStrategicIndicatorDetail } = useStrategicIndicators()

const result = await fetchStrategicIndicatorDetail({
  id: 'indicator-id',
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID indikator |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class StrategicIndicator {
  id: string;
  name: string;
  variableId: number;
  periode: string;
  value: number | null;
  unit: string | null;
  category: string | null;
}
```
