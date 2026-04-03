# Subjects

Subjek statistik BPS — kategori utama pengumpulan data BPS.

## List Subjects

```typescript
const result = await stadata.list.subjects({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  subjectCategoryId: 1,  // opsional
});
```

## View Subject

```typescript
const result = await stadata.view.subject({
  id: 1,
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class Subject {
  id: number;
  name: string;
  nTable: number;       // Jumlah tabel terkait
  subjectCategoryId: number;
}
```

## Contoh

```typescript
const result = await stadata.list.subjects({
  domain: '0000',       // nasional
  lang: DataLanguage.ID,
});

result.match(
  ({ data }) => data.forEach(s => console.log(s.id, s.name, `(${s.nTable} tabel)`)),
  (err) => console.error(err.message)
);
```
