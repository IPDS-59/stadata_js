# Examples

This directory contains example code demonstrating how to use the Stadata JS SDK.

## Running Examples

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Set your API key:
```bash
export BPS_API_KEY="your-api-key-here"
```

### Available Examples

#### basic-usage.ts

Comprehensive example demonstrating all SDK features:

```bash
npx ts-node examples/basic-usage.ts
```

Topics covered:
- SDK initialization
- Basic list queries
- Parameterized queries
- View single items
- Error handling
- Request cancellation
- Result chaining
- Pagination
- Debug logging
- Parallel requests

## Creating Your Own Examples

You can create new example files in this directory following the same pattern:

```typescript
import { StadataJS, DataLanguage } from '../src';

async function main() {
  await StadataJS.init({
    apiKey: process.env.BPS_API_KEY!,
  });

  const stadata = StadataJS.instance;

  // Your code here
  const result = await stadata.list.domains();

  result.match(
    (data) => console.log('Success:', data),
    (error) => console.error('Error:', error)
  );

  StadataJS.destroy();
}

main();
```

Run with:
```bash
npx ts-node examples/your-example.ts
```

## Notes

- All examples use TypeScript and can be run with ts-node
- Make sure to set the `BPS_API_KEY` environment variable
- Examples demonstrate best practices for error handling and resource cleanup
- Each example is self-contained and can be run independently
