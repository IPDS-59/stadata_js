# Infographics

BPS infographics — statistical data visualizations in image format.

## List Infographics

```typescript
const result = await stadata.list.infographics({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'inflation',
});
```

## Data Type

```typescript
class Infographic {
  id: string;
  title: string;
  image: string;
  description: string | null;
  category: string | null;
}
```
