# Subjects

BPS statistical subjects.

## Usage

```typescript
import { useSubjects, DataLanguage } from 'stadata-js'

const { fetchSubjectList, fetchSubjectDetail } = useSubjects()

const result = await fetchSubjectList({
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
**Parameters:** subjectCategoryId — optional

## fetchSubjectDetail

```typescript
const result = await fetchSubjectDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.EN,
})
```
