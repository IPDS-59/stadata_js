# Domains

Domains represent BPS regions.

## Usage

```typescript
import { useDomains, DataLanguage } from 'stadata-js'

const { fetchDomainList } = useDomains()

const result = await fetchDomainList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(item => console.log(item))
  },
  (err) => console.error(err.message)
)
```
**Parameters:** DomainType.ALL — all
DomainType.PROVINCE — provinces
DomainType.REGENCY — regencies
