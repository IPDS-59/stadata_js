# Strategic Indicators

BPS strategic indicators — key national development indicators.

## List Strategic Indicators

```typescript
import { useStrategicIndicators, DataLanguage } from 'stadata-js'

const { fetchStrategicIndicatorList } = useStrategicIndicators()

const result = await fetchStrategicIndicatorList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number |
| `perPage` | `number` | ❌ | Items per page |
| `variableId` | `number` | ❌ | Filter by variable ID |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## View Strategic Indicator

```typescript
const { fetchStrategicIndicatorDetail } = useStrategicIndicators()

const result = await fetchStrategicIndicatorDetail({
  id: 'indicator-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Indicator ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class StrategicIndicator {
  id: string;
  name: string;
  variableId: number;
  periode: string;
  value: number | null;
  unit: string | null;
}
```
