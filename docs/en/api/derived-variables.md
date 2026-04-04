# Derived Variables

BPS derived variables — variables calculated from other variables.

## List Derived Variables

```typescript
import { useDerivedVariables, DataLanguage } from 'stadata-js'

const { fetchDerivedVariableList } = useDerivedVariables()

const result = await fetchDerivedVariableList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
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
| `variableId` | `number` | ❌ | Filter by parent variable ID |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## Data Type

```typescript
class DerivedVariable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  unit: string | null;
}
```
