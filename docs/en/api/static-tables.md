# Static Tables

BPS static tables — published tabular data in table format.

## List Static Tables

```typescript
const result = await stadata.list.staticTables({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'population',
  year: 2023,
});
```

## View Static Table

```typescript
const result = await stadata.view.staticTable({
  id: 'table-id',
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class StaticTable {
  id: number;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
  excel: string;   // Excel file URL
}
```
