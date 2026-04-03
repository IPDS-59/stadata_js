# News

Berita terbaru dari BPS — pengumuman, rilis data, dan informasi statistik.

## List News

```typescript
const result = await stadata.list.news({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'sensus',     // opsional
  newsCategoryId: '1',   // opsional — filter kategori
  month: 1,              // opsional
  year: 2024,            // opsional
});
```

## View News

```typescript
const result = await stadata.view.news({
  id: 'news-id',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class News {
  id: string;
  title: string;
  content: string;
  category: string | null;
  categoryId: string | null;
  picture: string | null;    // URL gambar
  releaseDate: Date | null;
}
```

## Contoh

```typescript
const result = await stadata.list.news({
  domain: '7200',
  lang: DataLanguage.ID,
  year: 2024,
  month: 1,
});

result.match(
  ({ data }) => data.forEach(n => console.log(n.title, n.releaseDate)),
  (err) => console.error(err.message)
);
```
