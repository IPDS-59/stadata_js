# News Categories

BPS news categories.

## List News Categories

```typescript
import { useNewsCategories, DataLanguage } from 'stadata-js'

const { fetchNewsCategoryList } = useNewsCategories()

const result = await fetchNewsCategoryList({
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
class NewsCategory {
  id: string;
  name: string;
}
```
