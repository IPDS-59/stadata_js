# Dynamic Tables

BPS dynamic tables — data that can be customized and queried dynamically.

## List Dynamic Tables

```typescript
const result = await stadata.list.dynamicTables({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'GDP',
});
```

## View Dynamic Table

```typescript
const result = await stadata.view.dynamicTable({
  id: 'table-id',
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class DynamicTable {
  id: string;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
}
```
