# Census

BPS census data — population, agriculture, and economic census results.

## List Census

```typescript
const result = await stadata.list.census({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'population census',
});
```

## Data Type

```typescript
class Census {
  id: string;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
}
```
