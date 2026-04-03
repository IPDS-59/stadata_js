# Press Releases

Official BPS press releases — economic, demographic, and statistical announcements.

## List Press Releases

```typescript
const result = await stadata.list.pressReleases({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'inflation',
  year: 2024,
});
```

## View Press Release

```typescript
const result = await stadata.view.pressRelease({
  id: 'release-id',
  domain: '7200',
  lang: DataLanguage.EN,
});
```
