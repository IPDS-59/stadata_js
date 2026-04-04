# Static Tables

BPS static tables — published tabular data.

## List Static Tables

```typescript
import { useStaticTables, DataLanguage } from 'stadata-js'

const { fetchStaticTableList } = useStaticTables()

const result = await fetchStaticTableList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'poverty',
  year: 2023,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ❌ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number (default: 1) |
| `perPage` | `number` | ❌ | Items per page |
| `keyword` | `string` | ❌ | Search keyword |
| `month` | `number` | ❌ | Month filter (1-12) |
| `year` | `number` | ❌ | Year filter |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

## View Static Table

```typescript
const { fetchStaticTableDetail } = useStaticTables()

const result = await fetchStaticTableDetail({
  id: 1234,
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Table ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class StaticTable {
  id: number;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
  excel: string;   // Excel file URL
}
```
