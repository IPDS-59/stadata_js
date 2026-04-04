# Publications

Official BPS statistical publications — reports, bulletins, and documents.

## List Publications

```typescript
import { usePublications, DataLanguage } from 'stadata-js'

const { fetchPublicationList } = usePublications()

const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'inflation',
  year: 2023,
  month: 6,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ❌ | BPS domain code (e.g. `'7200'`) |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number (default: 1) |
| `perPage` | `number` | ❌ | Items per page |
| `keyword` | `string` | ❌ | Search keyword |
| `month` | `number` | ❌ | Month filter (1-12) |
| `year` | `number` | ❌ | Year filter |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## View Publication

```typescript
const { fetchPublicationDetail } = usePublications()

const result = await fetchPublicationDetail({
  id: 'publication-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Publication ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class Publication {
  id: string;
  title: string;
  issn: string;
  cover: string;              // Cover image URL
  pdf: string;                // PDF file URL
  size: string;
  scheduledDate: Date | null;
  releaseDate: Date | null;
  updateDate: Date | null;
  abstract: string | null;
  catalogueNumber: string | null;
  publicationNumber: string | null;
  relatedPublications: RelatedPublication[];
}
```
