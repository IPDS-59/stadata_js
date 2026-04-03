# Subject Categories

BPS statistical subject categories.

## List Subject Categories

```typescript
const result = await stadata.list.subjectCategories({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
});
```

## Data Type

```typescript
class SubjectCategory {
  id: number;
  name: string;
}
```
