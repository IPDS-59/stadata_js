# Subjects

BPS statistical subjects — main data collection categories.

## List Subjects

```typescript
import { useSubjects, DataLanguage } from 'stadata-js'

const { fetchSubjectList } = useSubjects()

const result = await fetchSubjectList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
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

## View Subject

```typescript
const { fetchSubjectDetail } = useSubjects()

const result = await fetchSubjectDetail({
  id: 1,
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Subject ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class Subject {
  id: number;
  name: string;
  nTable: number;       // Number of related tables
  subjectCategoryId: number;
}
```
