# Domains

Domains represent BPS regions — provinces, regencies, or national.

## List Domains

```typescript
import { useDomains, DataLanguage, DomainType } from 'stadata-js'

const { fetchDomainList } = useDomains()

const result = await fetchDomainList({
  type: DomainType.ALL,
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data }) => data.forEach(d => console.log(d.id, d.name)),
  (err) => console.error(err.message)
)
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `DomainType` | ✅ | Domain type |
| `lang` | `DataLanguage` | ❌ | Response language |
| `page` | `number` | ❌ | Page number (default: 1) |
| `perPage` | `number` | ❌ | Items per page |
| `provinceCode` | `string` | ❌ | Province code (required when `type` is `REGENCY_BY_PROVINCE`) |
| `keyword` | `string` | ❌ | Search keyword |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

### DomainType

```typescript
enum DomainType {
  ALL = 'all',
  PROVINCE = 'prov',
  REGENCY = 'kab',
}
```

## Data Type

```typescript
class Domain {
  id: string;    // BPS domain code (e.g. '7200' for Central Sulawesi)
  name: string;  // Region name
  url: string;   // BPS regional portal URL
}
```
