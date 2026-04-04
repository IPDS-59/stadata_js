# Konfigurasi

## Opsi Konfigurasi

```typescript
const stadata = createStadataClient({
  apiKey: string;         // Wajib — API key dari BPS WebAPI
  baseURL?: string;       // Opsional — custom base URL (default: BPS API)
  timeout?: number;       // Opsional — timeout ms (default: 30000)
  interceptors?: NetworkInterceptor[];  // Opsional — custom interceptors
  debug?: boolean;        // Opsional — aktifkan debug logging (default: false)
  logLevel?: LogLevel;    // Opsional — minimum log level
})
```

## Contoh Konfigurasi Lengkap

```typescript
import { createStadataClient } from 'stadata-js'

const stadata = createStadataClient({
  apiKey: process.env.BPS_API_KEY!,
  timeout: 15000,   // 15 detik
  debug: process.env.NODE_ENV === 'development',
})
```

## Custom Interceptors

```typescript
import { createStadataClient, NetworkInterceptor } from 'stadata-js'

const loggingInterceptor: NetworkInterceptor = {
  onRequest: (config) => {
    console.log('Request:', config.url)
    return config
  },
  onResponse: (response) => {
    console.log('Response status:', response.status)
    return response
  },
}

const stadata = createStadataClient({
  apiKey: 'your-api-key',
  interceptors: [loggingInterceptor],
})
```

## Environment Variables (Rekomendasi)

Jangan hardcode API key di kode. Gunakan environment variable:

```bash
# .env
BPS_API_KEY=your-actual-api-key
```

```typescript
import 'dotenv/config'
import { createStadataClient } from 'stadata-js'

const stadata = createStadataClient({
  apiKey: process.env.BPS_API_KEY!,
})
```

## Pola Penggunaan di Aplikasi

```typescript
// lib/stadata.ts — buat sekali, re-use di seluruh app
import { createStadataClient } from 'stadata-js'

export const stadata = createStadataClient({
  apiKey: process.env.BPS_API_KEY!,
})

// Di mana saja di aplikasi
import { stadata } from '@/lib/stadata'

const { fetchPublicationList } = stadata.usePublications()
const result = await fetchPublicationList({ domain: '7200' })
```
