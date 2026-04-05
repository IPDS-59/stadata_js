# News

Latest BPS news — announcements, data releases, and statistical information.

## List News

```typescript
import { useNews, DataLanguage } from 'stadata-js'

const { fetchNewsList } = useNews()

const result = await fetchNewsList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'census',
  newsCategoryId: '1',
  year: 2024,
  month: 1,
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
| `newsCategoryId` | `string` | ❌ | Filter by news category ID |
| `month` | `number` | ❌ | Month filter (1-12) |
| `year` | `number` | ❌ | Year filter |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## View News

```typescript
const { fetchNewsDetail } = useNews()

const result = await fetchNewsDetail({
  id: 'news-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | News ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class News {
  id: string;
  title: string;
  content: string;
  category: string | null;
  categoryId: string | null;
  picture: string | null;
  releaseDate: Date | null;
}
```
