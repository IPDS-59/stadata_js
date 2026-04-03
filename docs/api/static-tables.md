# Static Tables

Tabel statis BPS — data tabular yang sudah dipublikasikan dalam format tabel.

## List Static Tables

```typescript
const result = await stadata.list.staticTables({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'penduduk',   // opsional
  month: 1,              // opsional
  year: 2023,            // opsional
});
```

## View Static Table

```typescript
const result = await stadata.view.staticTable({
  id: 'table-id',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class StaticTable {
  id: number;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
  excel: string;         // URL file Excel
}
```

## Contoh

```typescript
const result = await stadata.list.staticTables({
  domain: '7200',
  lang: DataLanguage.ID,
  keyword: 'kemiskinan',
});

result.match(
  ({ data, pagination }) => {
    console.log(`Ditemukan ${pagination.total} tabel`);
    data.forEach(t => console.log(t.title, t.excel));
  },
  (err) => console.error(err.message)
);
```
