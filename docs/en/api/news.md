# News

Latest news from BPS — announcements, data releases, and statistical information.

## List News

```typescript
const result = await stadata.list.news({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'census',       // optional
  newsCategoryId: '1',     // optional
  month: 1,                // optional
  year: 2024,              // optional
});
```

## View News

```typescript
const result = await stadata.view.news({
  id: 'news-id',
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class News {
  id: string;
  title: string;
  content: string;
  category: string | null;
  picture: string | null;
  releaseDate: Date | null;
}
```
