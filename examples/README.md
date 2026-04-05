# Examples

This directory contains example code for the v2 Stadata JS API.

## Prerequisites

```bash
npm install
export BPS_API_KEY="your-api-key-here"
```

## Available Examples

### `basic-usage.ts`

Shows the recommended v2 pattern:
- `initStadata()` once
- use composables anywhere
- handle `Result` responses cleanly

```bash
npx tsx examples/basic-usage.ts
```

### `test-api.ts`

Runs a quick smoke test against several real endpoints.

```bash
npx tsx examples/test-api.ts
```

## Recommended Pattern

```typescript
import {
  initStadata,
  useDomains,
  usePublications,
  DataLanguage,
  DomainType,
} from '../src'

async function main() {
  initStadata({ apiKey: process.env.BPS_API_KEY! })

  const { fetchDomainList } = useDomains()
  const { fetchPublicationList } = usePublications()

  const domains = await fetchDomainList({
    type: DomainType.ALL,
    lang: DataLanguage.ID,
  })

  const publications = await fetchPublicationList({
    domain: '0000',
    lang: DataLanguage.ID,
  })

  console.log(domains, publications)
}

main()
```

## Legacy API

`StadataJS` class is still available for backward compatibility, but the examples in this folder prefer the v2 composable API.
