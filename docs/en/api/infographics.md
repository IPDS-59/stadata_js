# Infographics

BPS infographics — statistical data visualizations.

## List Infographics

```typescript
import { useInfographics, DataLanguage } from 'stadata-js'

const { fetchInfographicList } = useInfographics()

const result = await fetchInfographicList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'inflation',
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number (default: 1) |
| `perPage` | `number` | ❌ | Items per page |
| `keyword` | `string` | ❌ | Search keyword |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## Data Type

```typescript
class Infographic {
  id: string;
  title: string;
  image: string;   // Image URL
}
```
