# Statistic Classifications

BPS classification systems (KBLI, KBKI) used in censuses and surveys.

## List Statistic Classifications

```typescript
const result = await stadata.list.statisticClassifications({
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  type: ClassificationType.KBLI2020,
  keyword: 'agriculture',
});
```

## View Statistic Classification

```typescript
const result = await stadata.view.statisticClassification({
  id: 'class-id',
  lang: DataLanguage.EN,
  type: ClassificationType.KBLI2020,
});
```

### ClassificationType

```typescript
enum ClassificationType {
  KBLI2009 = 'kbli2009',
  KBLI2015 = 'kbli2015',
  KBLI2017 = 'kbli2017',
  KBLI2020 = 'kbli2020',
  KBKI2015 = 'kbki2015',
}
```
