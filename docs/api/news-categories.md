# News Categories

Kategori berita BPS.

## List News Categories

```typescript
const result = await stadata.list.newsCategories({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
});
```

## Tipe Data

```typescript
class NewsCategory {
  id: string;
  name: string;
}
```

## Contoh

```typescript
const result = await stadata.list.newsCategories({
  domain: '7200',
  lang: DataLanguage.ID,
});

result.match(
  ({ data }) => data.forEach(c => console.log(c.id, c.name)),
  (err) => console.error(err.message)
);
```
