# Variables

BPS statistical variables — indicators used in data collection.

## List Variables

```typescript
import { useVariables, DataLanguage } from 'stadata-js'

const { fetchVariableList } = useVariables()

const result = await fetchVariableList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  subjectId: 3,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number (default: 1) |
| `perPage` | `number` | ❌ | Items per page |
| `subjectId` | `number` | ❌ | Filter by subject ID |
| `year` | `number` | ❌ | Filter by year |
| `showExistingVariables` | `boolean` | ❌ | Only include variables that have data in the selected domain |
| `showDeleted` | `boolean` | ❌ | Deprecated alias for `showExistingVariables` for backward compatibility |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## View Variable

```typescript
const { fetchVariableDetail } = useVariables()

const result = await fetchVariableDetail({
  id: 1234,
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Variable ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class Variable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  verticalVariableId: number;
  unit: string | null;
  notes: string | null;
}
```
