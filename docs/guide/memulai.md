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

Panggil `initStadata()` **sekali** di entry point aplikasi kamu:

```typescript
// main.ts / app.ts / index.ts
import { initStadata } from 'stadata-js'

initStadata({
  apiKey: 'your-api-key-here',
  debug: false, // optional
})
```

## Cara Penggunaan

Setelah `initStadata()` dipanggil, gunakan composables **di mana saja** tanpa perlu meneruskan client:

```typescript
import { usePublications, useDomains, useNews, DataLanguage } from 'stadata-js'

// Langsung pakai — tidak perlu import client atau instance apapun
const { fetchPublicationList, fetchPublicationDetail } = usePublications()
const { fetchDomainList } = useDomains()
const { fetchNewsList } = useNews()

// Fetch data
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
Cukup panggil `initStadata()` **sekali** di entry point. Setelah itu semua composable bisa dipakai di file manapun tanpa import client.
:::

::: warning
Jika menggunakan composable sebelum `initStadata()` dipanggil, akan muncul error:
`[stadata-js] Client not initialized. Call initStadata({ apiKey: "..." }) first.`
:::

## Multiple Client (Advanced)

Jika perlu multiple client dengan API key berbeda, pass client secara explicit:

```typescript
import { createStadataClient, usePublications } from 'stadata-js'

const otherClient = createStadataClient({ apiKey: 'other-key' })
const { fetchPublicationList } = usePublications(otherClient) // explicit
```

## Composables yang Tersedia

| Composable | Fungsi |
|-----------|--------|
| `usePublications()` | `fetchPublicationList`, `fetchPublicationDetail` |
| `useDomains()` | `fetchDomainList` |
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

## Langkah Selanjutnya

- [Konfigurasi Lengkap →](./konfigurasi)
- [Penanganan Error →](./error-handling)
- [API Reference →](../api/domains)
