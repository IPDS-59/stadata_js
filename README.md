# STADATA JS SDK

[![npm version](https://img.shields.io/npm/v/stadata-js.svg)](https://www.npmjs.com/package/stadata-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-ipds--59.github.io-blue)](https://ipds-59.github.io/stadata_js/)

Official TypeScript/JavaScript SDK for BPS (Badan Pusat Statistik) WebAPI — Seamlessly access Indonesia's Central Bureau of Statistics data through a comprehensive, type-safe client library.

## Overview

The STADATA JS SDK provides TypeScript/JavaScript developers with streamlined access to Indonesia's statistical data through the official BPS WebAPI. Create data-driven applications featuring demographic, economic, and socio-economic information from Indonesia's most authoritative statistical source.

## Features

- **Functional Composable API** — `initStadata()` + `use*()` composables by default, with optional explicit clients for advanced use cases
- **Full TypeScript Support** — Complete type definitions with IntelliSense support
- **Result Pattern** — Uses `neverthrow` for elegant, type-safe error handling
- **Tree-shakeable** — Only bundle what you use
- **Pagination Support** — Built-in pagination handling for all list endpoints
- **Request Cancellation** — Cancel ongoing requests to optimize performance
- **Immutable Entities** — Predictable, safe domain entities

## Requirements

- Node.js >= 16.0.0
- Valid API key from [BPS WebAPI platform](https://webapi.bps.go.id/)

## Installation

```bash
# npm
npm install stadata-js

# pnpm
pnpm add stadata-js

# yarn
yarn add stadata-js
```

## Quick Start

```typescript
import { initStadata, usePublications, useDomains, DataLanguage, DomainType } from 'stadata-js'

// 1. Initialize once at app entry point
initStadata({ apiKey: 'your-api-key-here' })

// 2. Use composables anywhere — no client reference needed
const { fetchPublicationList, fetchPublicationDetail } = usePublications()
const { fetchDomainList } = useDomains()

// 3. Fetch data
const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(pub => console.log(pub.title))
  },
  (error) => console.error('Error:', error.message)
)
```

## API Reference

Full documentation: **[ipds-59.github.io/stadata_js](https://ipds-59.github.io/stadata_js/)**

### Available Composables

| Composable | Functions |
|-----------|-----------|
| `useDomains()` | `fetchDomainList` |
| `usePublications()` | `fetchPublicationList`, `fetchPublicationDetail` |
| `usePressReleases()` | `fetchPressReleaseList`, `fetchPressReleaseDetail` |
| `useStaticTables()` | `fetchStaticTableList`, `fetchStaticTableDetail` |
| `useDynamicTables()` | `fetchDynamicTableList` |
| `useInfographics()` | `fetchInfographicList` |
| `useNews()` | `fetchNewsList`, `fetchNewsDetail` |
| `useNewsCategories()` | `fetchNewsCategoryList` |
| `useVariables()` | `fetchVariableList`, `fetchVariableDetail` |
| `useVerticalVariables()` | `fetchVerticalVariableList` |
| `useDerivedVariables()` | `fetchDerivedVariableList` |
| `useSubjects()` | `fetchSubjectList`, `fetchSubjectDetail` |
| `useSubjectCategories()` | `fetchSubjectCategoryList` |
| `useUnits()` | `fetchUnitList`, `fetchUnitDetail` |
| `usePeriods()` | `fetchPeriodList` |
| `useDerivedPeriods()` | `fetchDerivedPeriodList` |
| `useStrategicIndicators()` | `fetchStrategicIndicatorList`, `fetchStrategicIndicatorDetail` |
| `useStatisticClassifications()` | `fetchStatisticClassificationList`, `fetchStatisticClassificationDetail` |
| `useCensus()` | `fetchCensusList` |
| `useTrade()` | `fetchTradeData` |

### Error Handling

All functions return `Result<T, ApiFailure>` from [neverthrow](https://github.com/supermacro/neverthrow):

```typescript
const result = await fetchPublicationList({ domain: '7200', lang: DataLanguage.ID })

// Option 1: match
result.match(
  ({ data, pagination }) => console.log(data),
  (error) => console.error(error.message)
)

// Option 2: guard check
if (result.isOk()) {
  const { data, pagination } = result.value
}

if (result.isErr()) {
  console.error(result.error.message)
}
```

## Configuration

```typescript
const stadata = createStadataClient({
  apiKey: 'your-api-key',       // required
  timeout: 15000,                // optional, ms (default: 30000)
  debug: true,                   // optional, enable debug logging
  baseURL: 'https://...',        // optional, custom base URL
})
```

## Migration from v1

**v1 (deprecated):**
```typescript
await StadataJS.init({ apiKey: 'key' })
const stadata = StadataJS.instance
const result = await stadata.list.publications({ domain: '7200', lang: DataLanguage.ID })
```

**v2:**
```typescript
// Entry point
initStadata({ apiKey: 'key' })

// Anywhere in app
const { fetchPublicationList } = usePublications()
const result = await fetchPublicationList({ domain: '7200', lang: DataLanguage.ID })
```

> `StadataJS` class is kept as `@deprecated` in v2 and will be removed in v3.

## Advanced: Multiple Clients

If you need multiple clients (e.g. different API keys), use `createStadataClient` directly:

```typescript
import { createStadataClient, usePublications } from 'stadata-js'

const client = createStadataClient({ apiKey: 'other-key' })
const { fetchPublicationList } = usePublications(client) // explicit client
```

## License

MIT © [IPDS-59](https://github.com/IPDS-59)
