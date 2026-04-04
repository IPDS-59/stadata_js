# Derived Periods

BPS derived periods — periods for derived variables.

## List Derived Periods

```typescript
import { useDerivedPeriods, DataLanguage } from 'stadata-js'

const { fetchDerivedPeriodList } = useDerivedPeriods()

const result = await fetchDerivedPeriodList({
  domain: '7200',
  lang: DataLanguage.EN,
  variableId: 529,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ❌ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number |
| `perPage` | `number` | ❌ | Items per page |
| `variableId` | `number` | ❌ | Filter by derived variable ID |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## Data Type

```typescript
class DerivedPeriod {
  id: string;
  name: string;
}
```
