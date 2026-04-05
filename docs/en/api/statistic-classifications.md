# Statistic Classifications

BPS classification systems — KBLI (Indonesian Standard Industrial Classification) and KBKI.

## List Statistic Classifications

```typescript
import { useStatisticClassifications, DataLanguage, ClassificationType } from 'stadata-js'

const { fetchStatisticClassificationList } = useStatisticClassifications()

const result = await fetchStatisticClassificationList({
  lang: DataLanguage.EN,
  type: ClassificationType.KBLI2020,
  keyword: 'agriculture',
  page: 1,
  perPage: 10,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `lang` | `DataLanguage` | ❌ | Response language |
| `type` | `ClassificationType` | ❌ | Classification type (default: KBLI2020) |
| `level` | `ClassificationLevel` | ❌ | Classification level filter |
| `keyword` | `string` | ❌ | Search keyword |
| `page` | `number` | ❌ | Page number |
| `perPage` | `number` | ❌ | Items per page |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

### ClassificationType

```typescript
enum ClassificationType {
  KBLI2009 = 'kbli2009',
  KBLI2015 = 'kbli2015',
  KBLI2017 = 'kbli2017',
  KBLI2020 = 'kbli2020',
  KBKI2015 = 'kbki2015',
}
```

## View Statistic Classification

```typescript
const { fetchStatisticClassificationDetail } = useStatisticClassifications()

const result = await fetchStatisticClassificationDetail({
  id: 'A',
  domain: '7200',
  lang: DataLanguage.EN,
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string \| number` | ✅ | Classification ID |
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ❌ | Response language |

## Data Type

```typescript
class StatisticClassification {
  id: string;
  title: string;
  description: string | null;
  previous: string | null;
  flag: string | null;
  type: ClassificationType;
}
```
