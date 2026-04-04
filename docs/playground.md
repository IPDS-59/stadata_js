# Playground

Coba BPS WebAPI secara langsung dari browser. Masukkan API key kamu dan pilih endpoint yang ingin di-test.

::: info Dapatkan API Key
Daftar dan dapatkan API key gratis di **[webapi.bps.go.id](https://webapi.bps.go.id)**.
:::

<BpsPlayground />

## Cara Menggunakan SDK

Setelah menemukan endpoint yang sesuai, integrasikan ke aplikasi kamu:

```typescript
import { initStadata, usePublications, DataLanguage } from 'stadata-js'

// Init sekali di entry point
initStadata({ apiKey: 'your-api-key' })

// Pakai composable di mana saja
const { fetchPublicationList } = usePublications()

const result = await fetchPublicationList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(p => console.log(p.title))
  },
  (err) => console.error(err.message)
)
```

## Endpoint yang Tersedia di Playground

| Endpoint | SDK Method |
|----------|------------|
| List Domains | `stadata.list.domains()` |
| List Publications | `stadata.list.publications()` |
| List News | `stadata.list.news()` |
| List Press Releases | `stadata.list.pressReleases()` |
| List Static Tables | `stadata.list.staticTables()` |
| List Variables | `stadata.list.variables()` |
| List Subjects | `stadata.list.subjects()` |
| View Publication | `stadata.view.publication()` |
