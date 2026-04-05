# Units

BPS measurement units.

## List Units

```typescript
import { useUnits, DataLanguage } from 'stadata-js'

const { fetchUnitList } = useUnits()

const result = await fetchUnitList({
  domain: '7200',
  lang: DataLanguage.EN,
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

## View Unit

```typescript
const { fetchUnitDetail } = useUnits()

const result = await fetchUnitDetail({
  id: 1,
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Unit ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class Unit {
  id: number;
  name: string;
}
```
