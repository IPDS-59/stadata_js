# Getting Started

## Requirements

- Node.js >= 16.0.0
- API key from [BPS WebAPI Platform](https://webapi.bps.go.id/)

## Installation

```bash
npm install stadata-js
# or
pnpm add stadata-js
# or
yarn add stadata-js
```

## Initialization

```typescript
import { StadataJS } from 'stadata-js';

await StadataJS.init({
  apiKey: 'your-api-key-here',
  debug: false,
});

const stadata = StadataJS.instance;
```

## First Example

```typescript
import { StadataJS, DataLanguage } from 'stadata-js';

await StadataJS.init({ apiKey: 'your-api-key' });
const stadata = StadataJS.instance;

const result = await stadata.list.domains({
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
});

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`);
    data.forEach(d => console.log(d.id, d.name));
  },
  (error) => console.error('Error:', error.message)
);
```

## Two Operation Types

| Operation | Access | Description |
|-----------|--------|-------------|
| `stadata.list.*` | Multiple items | With pagination & filters |
| `stadata.view.*` | Single item | By ID |

## Next Steps

- [Configuration →](./configuration)
- [Error Handling →](./error-handling)
- [API Reference →](../api/domains)
