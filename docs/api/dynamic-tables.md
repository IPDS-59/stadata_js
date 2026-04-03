# Dynamic Tables

Tabel dinamis BPS — data yang dapat dikustomisasi dan di-query secara dinamis.

## List Dynamic Tables

```typescript
const result = await stadata.list.dynamicTables({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'PDRB',       // opsional
});
```

## View Dynamic Table

```typescript
const result = await stadata.view.dynamicTable({
  id: 'table-id',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class DynamicTable {
  id: string;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
}
```

## Contoh

```typescript
const result = await stadata.list.dynamicTables({
  domain: '0000',
  lang: DataLanguage.ID,
  keyword: 'ekspor',
});

result.match(
  ({ data }) => data.forEach(t => console.log(t.id, t.title)),
  (err) => console.error(err.message)
);
```
