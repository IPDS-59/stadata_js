# Publications

Official BPS statistical publications — reports, bulletins, and documents.

## List Publications

```typescript
const result = await stadata.list.publications({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'inflation',  // optional
  year: 2023,            // optional
});
```

## View Publication

```typescript
const result = await stadata.view.publication({
  id: 'pub-id',
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class Publication {
  id: string;
  title: string;
  issn: string;
  cover: string;
  pdf: string;
  size: string;
  releaseDate: Date | null;
  abstract: string | null;
}
```
