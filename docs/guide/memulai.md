# Mulai Cepat

## Persyaratan

- Node.js >= 16.0.0
- API key dari [BPS WebAPI Platform](https://webapi.bps.go.id/)

## Instalasi

::: code-group

```bash [pnpm]
pnpm add stadata-js
```

```bash [npm]
npm install stadata-js
```

```bash [yarn]
yarn add stadata-js
```

:::

## Inisialisasi

Buat client **sekali** di entry point aplikasi kamu:

```typescript
import { createStadataClient } from 'stadata-js'

const stadata = createStadataClient({
  apiKey: 'your-api-key-here',
  debug: false, // aktifkan untuk logging detail
})
```

Client yang dibuat akan menyimpan konfigurasi dan menyediakan semua composables.

## Cara Penggunaan

Setelah membuat client, gunakan composables via `stadata.use*()`:

```typescript
import { createStadataClient, DataLanguage } from 'stadata-js'

const stadata = createStadataClient({ apiKey: 'your-api-key' })

// Destructure fungsi yang dibutuhkan dari composable
const { fetchPublicationList, fetchPublicationDetail } = stadata.usePublications()
const { fetchDomainList } = stadata.useDomains()
const { fetchNewsList } = stadata.useNews()

// Panggil fungsinya
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
  (err) => console.error('Error:', err.message)
)
```

::: tip
Client dibuat **sekali**, lalu semua composable bisa dipakai tanpa harus pass client lagi.
:::

## Composables yang Tersedia

| Composable | Fungsi |
|-----------|--------|
| `stadata.useDomains()` | `fetchDomainList` |
| `stadata.usePublications()` | `fetchPublicationList`, `fetchPublicationDetail` |
| `stadata.usePressReleases()` | `fetchPressReleaseList`, `fetchPressReleaseDetail` |
| `stadata.useStaticTables()` | `fetchStaticTableList`, `fetchStaticTableDetail` |
| `stadata.useDynamicTables()` | `fetchDynamicTableList` |
| `stadata.useInfographics()` | `fetchInfographicList` |
| `stadata.useNews()` | `fetchNewsList`, `fetchNewsDetail` |
| `stadata.useNewsCategories()` | `fetchNewsCategoryList` |
| `stadata.useVariables()` | `fetchVariableList`, `fetchVariableDetail` |
| `stadata.useVerticalVariables()` | `fetchVerticalVariableList` |
| `stadata.useDerivedVariables()` | `fetchDerivedVariableList` |
| `stadata.useSubjects()` | `fetchSubjectList`, `fetchSubjectDetail` |
| `stadata.useSubjectCategories()` | `fetchSubjectCategoryList` |
| `stadata.useUnits()` | `fetchUnitList`, `fetchUnitDetail` |
| `stadata.usePeriods()` | `fetchPeriodList` |
| `stadata.useDerivedPeriods()` | `fetchDerivedPeriodList` |
| `stadata.useStrategicIndicators()` | `fetchStrategicIndicatorList`, `fetchStrategicIndicatorDetail` |
| `stadata.useStatisticClassifications()` | `fetchStatisticClassificationList`, `fetchStatisticClassificationDetail` |
| `stadata.useCensus()` | `fetchCensusList` |
| `stadata.useTrade()` | `fetchTradeData` |

## Langkah Selanjutnya

- [Konfigurasi Lengkap →](./konfigurasi)
- [Penanganan Error →](./error-handling)
- [API Reference →](../api/domains)
