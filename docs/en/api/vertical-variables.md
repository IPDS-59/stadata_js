# Vertical Variables

BPS vertical classification of statistical variables.

## List Vertical Variables

```typescript
import { useVerticalVariables, DataLanguage } from 'stadata-js'

const { fetchVerticalVariableList } = useVerticalVariables()

const result = await fetchVerticalVariableList({
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
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number |
| `perPage` | `number` | ❌ | Items per page |
| `variableId` | `number` | ❌ | Filter by variable ID |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## Data Type

```typescript
class VerticalVariable {
  id: number;
  title: string;
  unit: string | null;
  subjectId: number;
  subjectName: string;
}
```
