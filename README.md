# STADATA JS SDK

[![npm version](https://img.shields.io/npm/v/stadata-js.svg)](https://www.npmjs.com/package/stadata-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official TypeScript/JavaScript SDK for BPS (Badan Pusat Statistik) WebAPI - Seamlessly access Indonesia's Central Bureau of Statistics data through a comprehensive, type-safe client library.

## Overview

The STADATA JS SDK provides TypeScript/JavaScript developers with streamlined access to Indonesia's statistical data through the official BPS WebAPI. Create data-driven applications featuring demographic, economic, and socio-economic information from Indonesia's most authoritative statistical source.

This toolkit facilitates seamless integration with BPS data sources, eliminating the need for manual downloads from the BPS website. Access publications, press releases, static/dynamic tables, infographics, census datasets, and much more through a clean, modern API.

## Features

- **Full TypeScript Support** - Complete type definitions for all API endpoints with IntelliSense support
- **Clean Architecture** - Follows Clean Architecture principles with clear separation of concerns
- **Result Pattern** - Uses neverthrow library for elegant, functional error handling
- **Dependency Injection** - Built-in DI container for flexible, testable architecture
- **Request Cancellation** - Support for cancelling ongoing requests to optimize performance
- **Interceptors** - Extensible request/response interceptor system for custom middleware
- **Logging** - Configurable logging system with multiple log levels for debugging
- **Immutable Entities** - All domain entities are immutable for predictable behavior
- **Pagination Support** - Built-in pagination handling for all list endpoints
- **Modern JavaScript** - Built for modern ES6+ environments with CommonJS and ESM support

## Requirements

- Node.js >= 16.0.0
- Valid API key from BPS WebAPI platform

## Installation

```bash
npm install stadata-js
```

or using yarn:

```bash
yarn add stadata-js
```

or using pnpm:

```bash
pnpm add stadata-js
```

## Quick Start

```typescript
import { StadataJS, DataLanguage } from 'stadata-js';

// Initialize the SDK with your API key
await StadataJS.init({
  apiKey: 'your-api-key-here',
  debug: false, // Enable debug logging if needed
});

// Get the SDK instance
const stadata = StadataJS.instance;

// Fetch all domains with pagination
const domainsResult = await stadata.list.domains({
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
});

// Handle the result using pattern matching
domainsResult.match(
  (listResult) => {
    console.log('Domains:', listResult.data);
    console.log('Total:', listResult.pagination.total);
    console.log('Current Page:', listResult.pagination.page);
  },
  (error) => {
    console.error('Error:', error.message);
  }
);

// Fetch a specific domain by ID
const domainResult = await stadata.view.domain({
  id: '7315',
  lang: DataLanguage.ID,
});

domainResult.match(
  (domain) => {
    console.log('Domain Name:', domain.name);
    console.log('Domain URL:', domain.url);
  },
  (error) => {
    console.error('Error:', error.message);
  }
);
```

## Available Features

### ✅ Fully Implemented

The SDK currently supports the following BPS data categories:

1. **Domains** - Statistical domain information
2. **Publications** - Statistical publications and reports
3. **Infographics** - Visual statistical representations
4. **News** - Latest statistical news
5. **News Categories** - News categorization
6. **Press Releases** - Official press releases
7. **Static Tables** - Pre-formatted statistical tables
8. **Subjects** - Statistical subjects
9. **Subject Categories** - Subject categorization
10. **Strategic Indicators** - Key economic indicators
11. **Variables** - Statistical variables
12. **Units** - Measurement units
13. **Periods** - Time periods
14. **Derived Variables** - Calculated statistical variables
15. **Derived Periods** - Calculated time periods
16. **Statistic Classifications** - Statistical classification systems
17. **Census** - Census data
18. **Dynamic Tables** - Interactive statistical tables
19. **Foreign Trade** - International trade statistics

### 🚧 Under Development

The following features are planned for future releases:

- **Glossary** - Statistical terminology
- **SDG Indicators** - Sustainable Development Goals indicators
- **Inflation** - Consumer price index data
- **Exchange Rates** - Foreign currency exchange rates

## Usage Examples

### Fetching Publications

```typescript
// Get all publications
const publicationsResult = await stadata.list.publications({
  lang: DataLanguage.ID,
  domain: '7315',
  page: 1,
  perPage: 20,
});

publicationsResult.match(
  (result) => {
    result.data.forEach((publication) => {
      console.log(publication.title);
      console.log(publication.issn);
      console.log(publication.cover);
    });
  },
  (error) => console.error(error.message)
);
```

### Fetching Static Tables

```typescript
// Get static tables with filters
const tablesResult = await stadata.list.staticTables({
  lang: DataLanguage.EN,
  domain: '7315',
  page: 1,
  perPage: 15,
});

tablesResult.match(
  (result) => {
    result.data.forEach((table) => {
      console.log(table.title);
      console.log(table.subjectId);
      console.log(table.table);
    });
  },
  (error) => console.error(error.message)
);
```

### Fetching Foreign Trade Data

```typescript
// Get trade data
const tradeResult = await stadata.list.trades({
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
});

tradeResult.match(
  (result) => {
    result.data.forEach((trade) => {
      console.log(trade.title);
      console.log(trade.period);
      console.log(trade.hsLevel);
    });
  },
  (error) => console.error(error.message)
);
```

### Error Handling

The SDK uses the Result pattern from the `neverthrow` library for elegant error handling:

```typescript
const result = await stadata.list.domains({
  lang: DataLanguage.EN,
});

// Pattern matching approach
result.match(
  (success) => {
    // Handle success case
    console.log('Data:', success.data);
  },
  (error) => {
    // Handle error case
    console.error('Error occurred:', error.message);
  }
);

// isOk/isErr approach
if (result.isOk()) {
  const data = result.value;
  console.log('Success:', data);
} else {
  const error = result.error;
  console.error('Failed:', error);
}
```

## API Reference

### StadataJS

Main SDK class for initialization and access to all features.

#### Methods

- `StadataJS.init(config: ApiConfig): Promise<void>` - Initialize the SDK with configuration
- `StadataJS.instance: StadataJS` - Get the singleton SDK instance

### Configuration

```typescript
interface ApiConfig {
  apiKey: string;        // Your BPS WebAPI key (required)
  debug?: boolean;       // Enable debug logging (default: false)
  baseUrl?: string;      // Custom API base URL (optional)
}
```

### Data Language

```typescript
enum DataLanguage {
  ID = 'ind',  // Indonesian
  EN = 'eng',  // English
}
```

## Architecture

The SDK follows Clean Architecture principles with clear separation between:

- **Domain Layer** - Business entities and use cases
- **Data Layer** - Repository implementations and data sources
- **Core Layer** - Base classes, utilities, and infrastructure
- **API Layer** - Public-facing SDK interface

This architecture ensures:
- High testability
- Loose coupling between components
- Easy maintenance and extensibility
- Clear separation of concerns

## Contributing

We welcome contributions! Whether you're fixing bugs, improving documentation, adding tests, or implementing new features, your help is appreciated.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request to the `develop` branch

### Contribution Areas

- **Bug Reports** - Report issues you encounter
- **Feature Requests** - Suggest new capabilities
- **Documentation** - Improve guides and examples
- **Testing** - Add or improve test coverage
- **Code** - Implement new features or fix bugs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [npm Package](https://www.npmjs.com/package/stadata-js)
- [GitHub Repository](https://github.com/ryanaidilp/stadata-js)
- [Issue Tracker](https://github.com/ryanaidilp/stadata-js/issues)
- [BPS Website](https://www.bps.go.id)

## Acknowledgments

This SDK is an unofficial community project and is not affiliated with or endorsed by BPS (Badan Pusat Statistik). All data accessed through this SDK is provided by BPS through their official WebAPI.

---

Made with ❤️ for the Indonesian developer community
