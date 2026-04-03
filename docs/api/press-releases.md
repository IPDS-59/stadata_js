# Press Releases

Siaran pers resmi BPS — pengumuman data ekonomi, demografi, dan statistik terbaru.

## List Press Releases

```typescript
const result = await stadata.list.pressReleases({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'inflasi',  // opsional
  month: 3,            // opsional
  year: 2024,          // opsional
});
```

## View Press Release

```typescript
const result = await stadata.view.pressRelease({
  id: 'release-id',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class PressRelease {
  id: string;
  title: string;
  cover: string;          // URL cover image
  pdf: string;            // URL PDF
  size: string;
  abstract: string | null;
  releaseDate: Date | null;
  updateDate: Date | null;
  category: string | null;
}
```

## Contoh

```typescript
const result = await stadata.list.pressReleases({
  domain: '0000',        // domain nasional
  lang: DataLanguage.ID,
  month: 1,
  year: 2024,
});

result.match(
  ({ data }) => data.forEach(r => console.log(r.title, r.releaseDate)),
  (err) => console.error(err.message)
);
```
