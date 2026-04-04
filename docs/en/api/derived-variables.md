# Derived Variables

BPS derived variables.

## Usage

```typescript
import { useDerivedVariables, DataLanguage } from 'stadata-js'

const { fetchDerivedVariableList } = useDerivedVariables()

const result = await fetchDerivedVariableList({
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
**Parameters:** subjectId, variableId — optional
