# Census

Data sensus BPS — sensus penduduk, pertanian, dan ekonomi.

## List Census

```typescript
import { useCensus } from 'stadata-js'

const { fetchCensusList } = useCensus()

// Ambil daftar event sensus
const events = await fetchCensusList({ type: 'events' })

// Ambil topik berdasarkan ID sensus
const topics = await fetchCensusList({
  type: 'topics',
  censusId: 'census-id',
})

// Ambil dataset berdasarkan topik
const datasets = await fetchCensusList({
  type: 'datasets',
  censusId: 'census-id',
  topicId: 1,
})

// Ambil data aktual
const data = await fetchCensusList({
  type: 'data',
  censusId: 'census-id',
  censusAreaId: 'area-id',
  datasetId: 'dataset-id',
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `type` | `'events' \| 'topics' \| 'areas' \| 'datasets' \| 'data'` | ❌ | Tipe data sensus (default: `'events'`) |
| `censusId` | `string` | ❌* | ID sensus. Wajib untuk `topics`, `areas`, `datasets`, `data` |
| `topicId` | `number` | ❌* | ID topik. Wajib untuk `datasets` |
| `censusAreaId` | `string` | ❌* | ID area sensus. Wajib untuk `data` |
| `datasetId` | `string` | ❌* | ID dataset. Wajib untuk `data` |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

::: info Alur Query Census
1. `type: 'events'` → dapatkan `censusId`
2. `type: 'topics', censusId` → dapatkan `topicId`
3. `type: 'areas', censusId` → dapatkan `censusAreaId`
4. `type: 'datasets', censusId, topicId` → dapatkan `datasetId`
5. `type: 'data', censusId, censusAreaId, datasetId` → data aktual
:::

## Tipe Data

```typescript
// Tipe return bergantung pada parameter 'type'
type CensusResult =
  | CensusEvent    // type: 'events'
  | CensusTopic    // type: 'topics'
  | CensusArea     // type: 'areas'
  | CensusDataset  // type: 'datasets'
  | CensusData     // type: 'data'
```
