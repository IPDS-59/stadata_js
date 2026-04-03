# Konfigurasi

## Opsi Konfigurasi

```typescript
interface StadataJSConfig {
  apiKey: string;         // Wajib — API key dari BPS WebAPI
  baseURL?: string;       // Opsional — custom base URL (default: BPS API)
  timeout?: number;       // Opsional — timeout ms (default: 30000)
  interceptors?: NetworkInterceptor[];  // Opsional — custom interceptors
  debug?: boolean;        // Opsional — aktifkan debug logging (default: false)
}
```

## Contoh Konfigurasi Lengkap

```typescript
import { StadataJS } from 'stadata-js';

await StadataJS.init({
  apiKey: process.env.BPS_API_KEY!,
  timeout: 15000,   // 15 detik
  debug: process.env.NODE_ENV === 'development',
});
```

## Custom Interceptors

Tambahkan interceptor untuk memodifikasi request/response:

```typescript
import { StadataJS, NetworkInterceptor } from 'stadata-js';

const loggingInterceptor: NetworkInterceptor = {
  onRequest: (config) => {
    console.log('Request:', config.url);
    return config;
  },
  onResponse: (response) => {
    console.log('Response status:', response.status);
    return response;
  },
};

await StadataJS.init({
  apiKey: 'your-api-key',
  interceptors: [loggingInterceptor],
});
```

## Debug Mode

Aktifkan `debug: true` untuk melihat detail request/response di console — berguna saat development:

```typescript
await StadataJS.init({
  apiKey: 'your-api-key',
  debug: true,
});
```

## Environment Variables (Rekomendasi)

Jangan hardcode API key di kode. Gunakan environment variable:

```bash
# .env
BPS_API_KEY=your-actual-api-key
```

```typescript
import 'dotenv/config';

await StadataJS.init({
  apiKey: process.env.BPS_API_KEY!,
});
```
