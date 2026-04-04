# Getting Started

## Requirements

- Node.js >= 16.0.0
- API key from [BPS WebAPI Platform](https://webapi.bps.go.id/)

## Installation

```bash
pnpm add stadata-js
# or npm install stadata-js / yarn add stadata-js
```

## Initialization

Call `initStadata()` **once** at your app entry point:

```typescript
// main.ts / app entry point
import { initStadata } from 'stadata-js'

initStadata({ apiKey: 'your-api-key-here' })
```

## Usage

After `initStadata()`, use composables **anywhere** — no client reference needed:

```typescript
import { usePublications, useDomains, DataLanguage } from 'stadata-js'

const { fetchPublicationList, fetchPublicationDetail } = usePublications()
const { fetchDomainList } = useDomains()

const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(pub => console.log(pub.title))
  },
  (err) => console.error('Error:', err.message)
)
```

## Migration from v1

```typescript
// v1 (deprecated)
await StadataJS.init({ apiKey: 'key' })
const stadata = StadataJS.instance
const result = await stadata.list.publications({ domain: '7200', lang: DataLanguage.EN })

// v2
initStadata({ apiKey: 'key' })
const { fetchPublicationList } = usePublications()
const result = await fetchPublicationList({ domain: '7200', lang: DataLanguage.EN })
```

## Advanced: Multiple Clients

```typescript
import { createStadataClient, usePublications } from 'stadata-js'

const client = createStadataClient({ apiKey: 'other-key' })
const { fetchPublicationList } = usePublications(client)
```

## Next Steps

- [Configuration →](./configuration)
- [Error Handling →](./error-handling)
- [API Reference →](../api/domains)
