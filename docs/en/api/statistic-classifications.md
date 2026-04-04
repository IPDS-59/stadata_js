# Statistic Classifications

BPS statistic classifications (KBLI, KBKI).

## Usage

```typescript
import { useStatisticClassifications, DataLanguage } from 'stadata-js'

const { fetchStatisticClassificationList, fetchStatisticClassificationDetail } = useStatisticClassifications()

const result = await fetchStatisticClassificationList({
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
**Parameters:** type (ClassificationType), keyword — optional

## fetchStatisticClassificationDetail

```typescript
const result = await fetchStatisticClassificationDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
