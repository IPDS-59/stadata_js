# Configuration

## Config Options

```typescript
await StadataJS.init({
  apiKey: 'your-api-key',        // Required
  timeout: 15000,                 // Optional — ms (default: 30000)
  debug: true,                    // Optional — enable debug logging
  interceptors: [],               // Optional — custom interceptors
});
```

## Environment Variables

```bash
# .env
BPS_API_KEY=your-actual-api-key
```

```typescript
await StadataJS.init({ apiKey: process.env.BPS_API_KEY! });
```
