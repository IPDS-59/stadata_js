# Periods

BPS data collection periods.

## Usage

```typescript
import { usePeriods, DataLanguage } from 'stadata-js'

const { fetchPeriodList } = usePeriods()

const result = await fetchPeriodList({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
})

result.match(
  ({ data, pagination }) => {
    console.log(`Total: ${pagination.total}`)
    data.forEach(item => console.log(item))
  },
  (err) => console.error(err.message)
)
```
**Parameters:** variableId — optional
