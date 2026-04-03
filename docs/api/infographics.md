# Infographics

Infografis BPS — visualisasi data statistik dalam format gambar.

## List Infographics

```typescript
const result = await stadata.list.infographics({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'inflasi',    // opsional
});
```

## Tipe Data

```typescript
class Infographic {
  id: string;
  title: string;
  image: string;         // URL gambar infografis
  description: string | null;
  category: string | null;
}
```

## Contoh

```typescript
const result = await stadata.list.infographics({
  domain: '7200',
  lang: DataLanguage.ID,
});

result.match(
  ({ data }) => data.forEach(i => console.log(i.title, i.image)),
  (err) => console.error(err.message)
);
```
