# Getting Started

## Requirements

- Node.js >= 16.0.0
- API key from [BPS WebAPI Platform](https://webapi.bps.go.id/)

## Installation

```bash
pnpm add stadata-js
# or npm install stadata-js
# or yarn add stadata-js
```

## Initialization

Create the client **once** at your app entry point:

```typescript
import { createStadataClient } from 'stadata-js'

const stadata = createStadataClient({
  apiKey: 'your-api-key-here',
})
```

## Usage

Use composables via `stadata.use*()` — no need to pass client manually:

```typescript
import { createStadataClient, DataLanguage } from 'stadata-js'

const stadata = createStadataClient({ apiKey: 'your-api-key' })

const { fetchPublicationList, fetchPublicationDetail } = stadata.usePublications()
const { fetchDomainList } = stadata.useDomains()

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
const stadata = createStadataClient({ apiKey: 'key' })
const { fetchPublicationList } = stadata.usePublications()
const result = await fetchPublicationList({ domain: '7200', lang: DataLanguage.EN })
```

## Next Steps

- [Configuration →](./configuration)
- [Error Handling →](./error-handling)
- [API Reference →](../api/domains)
