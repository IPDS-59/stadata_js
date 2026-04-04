# Subject Categories

BPS statistical subject categories.

## List Subject Categories

```typescript
import { useSubjectCategories, DataLanguage } from 'stadata-js'

const { fetchSubjectCategoryList } = useSubjectCategories()

const result = await fetchSubjectCategoryList({
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ❌ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number |
| `perPage` | `number` | ❌ | Items per page |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## Data Type

```typescript
class SubjectCategory {
  id: number;
  name: string;
}
```
