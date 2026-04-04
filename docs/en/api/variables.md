# Variables

BPS statistical variables.

## Usage

```typescript
import { useVariables, DataLanguage } from 'stadata-js'

const { fetchVariableList, fetchVariableDetail } = useVariables()

const result = await fetchVariableList({
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
**Parameters:** subjectId — optional filter

## fetchVariableDetail

```typescript
const result = await fetchVariableDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
