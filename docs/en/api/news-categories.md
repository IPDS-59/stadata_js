# News Categories

BPS news categories.

## List News Categories

```typescript
const result = await stadata.list.newsCategories({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
});
```

## Data Type

```typescript
class NewsCategory {
  id: string;
  name: string;
}
```
