# Dynamic Tables

BPS dynamic tables — customizable data based on variables and periods.

## Fetch Dynamic Table

```typescript
import { useDynamicTables, DataLanguage } from 'stadata-js'

const { fetchDynamicTableList } = useDynamicTables()

const result = await fetchDynamicTableList({
  domain: '7200',
  lang: DataLanguage.EN,
  variableId: 529,
  periodId: '117',
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `variableId` | `number` | ✅ | Variable ID |
| `periodId` | `string` | ✅ | Period ID. Single (`"117"`), range (`"117:123"`), or multiple (`"117;123"`) |
| `derivedVariableId` | `number` | ❌ | Derived variable ID |
| `verticalVariableId` | `number` | ❌ | Vertical variable ID |
| `derivedPeriodId` | `string` | ❌ | Derived period ID. Same format as `periodId` |
| `page` | `number` | ❌ | Page number |
| `perPage` | `number` | ❌ | Items per page |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

::: tip
Use `usePeriods()` and `useVariables()` to get valid IDs for querying dynamic tables.
:::

## Data Type

```typescript
class DynamicTable {
  id: string;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
}
```
