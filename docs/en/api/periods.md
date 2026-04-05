# Periods

BPS data collection periods — annual, quarterly, monthly, etc.

## List Periods

```typescript
import { usePeriods, DataLanguage } from 'stadata-js'

const { fetchPeriodList } = usePeriods()

const result = await fetchPeriodList({
  domain: '7200',
  lang: DataLanguage.EN,
  variableId: 529,
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

::: tip
Use `variableId` when querying periods to use with `useDynamicTables()`.
:::

## Data Type

```typescript
class Period {
  id: string;
  name: string;
}
```
