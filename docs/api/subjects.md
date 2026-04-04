# Subjects

## Penggunaan

```typescript
import { useSubjects, DataLanguage } from 'stadata-js'

const { fetchSubjectList, fetchSubjectDetail } = useSubjects()

const result = await fetchSubjectList({
  domain: '7200',
  lang: DataLanguage.ID,
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

**Parameter tambahan:**
- `subjectCategoryId?: number`

## Detail — SubjectDetail

```typescript
const result = await fetchSubjectDetail({
  id: 'item-id',
  domain: '7200',
  lang: DataLanguage.ID,
})

result.match(
  (item) => console.log(item),
  (err) => console.error(err.message)
)
```

## Tipe Data

```typescript
class Subject {
  id: number;
  name: string;
  nTable: number;
}
```
