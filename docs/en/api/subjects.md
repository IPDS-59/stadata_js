# Subjects

BPS statistical subjects — main data collection categories.

## List Subjects

```typescript
const result = await stadata.list.subjects({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  subjectCategoryId: 1,
});
```

## View Subject

```typescript
const result = await stadata.view.subject({
  id: 1,
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class Subject {
  id: number;
  name: string;
  nTable: number;
  subjectCategoryId: number;
}
```
