# Strategic Indicators

BPS strategic indicators.

## Usage

```typescript
import { useStrategicIndicators, DataLanguage } from 'stadata-js'

const { fetchStrategicIndicatorList, fetchStrategicIndicatorDetail } = useStrategicIndicators()

const result = await fetchStrategicIndicatorList({
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
**Parameters:** keyword, year — optional

## fetchStrategicIndicatorDetail

```typescript
const result = await fetchStrategicIndicatorDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
