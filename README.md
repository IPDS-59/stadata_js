# Stadata JS SDK

Official TypeScript/JavaScript SDK for BPS (Badan Pusat Statistik) Stadata API - A comprehensive client library for accessing Indonesia's Central Bureau of Statistics data.

## Features

- **Full TypeScript Support** - Complete type definitions for all API endpoints
- **Clean Architecture** - Follows Clean Architecture principles with separation of concerns
- **Result Pattern** - Uses neverthrow library for elegant error handling
- **Dependency Injection** - Built-in DI container for flexible architecture
- **Request Cancellation** - Support for cancelling ongoing requests
- **Interceptors** - Extensible request/response interceptor system
- **Logging** - Configurable logging system with multiple log levels
- **Immutable Entities** - All domain entities are immutable for predictable behavior
- **Pagination Support** - Built-in pagination handling for list endpoints

## Installation

```bash
npm install @stadata/js
```

or

```bash
yarn add @stadata/js
```

## Quick Start

```typescript
import { StadataJS, DataLanguage } from '@stadata/js';

// Initialize the SDK
await StadataJS.init({
  apiKey: 'your-api-key-here',
  debug: false,
});

// Get the SDK instance
const stadata = StadataJS.instance;

// Fetch all domains
const domainsResult = await stadata.list.domains({
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
});

// Handle the result
domainsResult.match(
  (listResult) => {
    console.log('Domains:', listResult.data);
    console.log('Total:', listResult.pagination.total);
  },
  (error) => {
    console.error('Error:', error.message);
  }
);
```

## Documentation

See the [full documentation](./docs) for detailed usage examples and API reference.

## Current Implementation Status

### ✅ Implemented
- Core infrastructure (base classes, DI, network client, logging)
- Shared domain layer (pagination, API response, enums)
- Domain feature (complete example implementation)
- Main SDK class and initialization

### 🚧 Pending
18 additional features need to be implemented following the Domain feature pattern.

## License

MIT
