# Census

BPS census data — population, agriculture, and economic census.

## List Census

```typescript
import { useCensus } from 'stadata-js'

const { fetchCensusList } = useCensus()

// Get census events
const events = await fetchCensusList({ type: 'events' })

// Get topics for a census
const topics = await fetchCensusList({
  type: 'topics',
  censusId: 'census-id',
})

// Get datasets for a topic
const datasets = await fetchCensusList({
  type: 'datasets',
  censusId: 'census-id',
  topicId: 1,
})

// Get actual data
const data = await fetchCensusList({
  type: 'data',
  censusId: 'census-id',
  censusAreaId: 'area-id',
  datasetId: 'dataset-id',
})
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | `'events' \| 'topics' \| 'areas' \| 'datasets' \| 'data'` | ❌ | Type of census data (default: `'events'`) |
| `censusId` | `string` | ❌* | Census ID. Required for `topics`, `areas`, `datasets`, `data` |
| `topicId` | `number` | ❌* | Topic ID. Required for `datasets` |
| `censusAreaId` | `string` | ❌* | Census area ID. Required for `data` |
| `datasetId` | `string` | ❌* | Dataset ID. Required for `data` |
| `cancelToken` | `CancelToken` | ❌ | Request cancellation token |

::: info Census Query Flow
1. `type: 'events'` → get `censusId`
2. `type: 'topics', censusId` → get `topicId`
3. `type: 'areas', censusId` → get `censusAreaId`
4. `type: 'datasets', censusId, topicId` → get `datasetId`
5. `type: 'data', censusId, censusAreaId, datasetId` → actual data
:::

## Data Types

```typescript
type CensusResult =
  | CensusEvent    // type: 'events'
  | CensusTopic    // type: 'topics'
  | CensusArea     // type: 'areas'
  | CensusDataset  // type: 'datasets'
  | CensusData     // type: 'data'
```
