# Press Releases

Official BPS press releases — economic, demographic, and statistical announcements.

## List Press Releases

```typescript
import { usePressReleases, DataLanguage } from 'stadata-js'

const { fetchPressReleaseList } = usePressReleases()

const result = await fetchPressReleaseList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'inflation',
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
| `month` | `number` | ❌ | Month filter (1-12) |
| `year` | `number` | ❌ | Year filter |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## View Press Release

```typescript
const { fetchPressReleaseDetail } = usePressReleases()

const result = await fetchPressReleaseDetail({
  id: 'release-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Press release ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class PressRelease {
  id: string;
  title: string;
  cover: string;
  pdf: string;
  size: string;
  abstract: string | null;
  releaseDate: Date | null;
  updateDate: Date | null;
  category: string | null;
}
```
