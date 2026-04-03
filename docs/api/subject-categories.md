# Subject Categories

Kategori subjek statistik BPS.

## List Subject Categories

```typescript
const result = await stadata.list.subjectCategories({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
});
```

## Tipe Data

```typescript
class SubjectCategory {
  id: number;
  name: string;
}
```
