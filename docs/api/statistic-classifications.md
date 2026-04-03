# Statistic Classifications

Klasifikasi statistik BPS — sistem klasifikasi yang digunakan dalam sensus dan survei.

## List Statistic Classifications

```typescript
const result = await stadata.list.statisticClassifications({
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  type: ClassificationType.KBLI2020,  // opsional
  keyword: 'pertanian',               // opsional
});
```

## View Statistic Classification

```typescript
const result = await stadata.view.statisticClassification({
  id: 'class-id',
  lang: DataLanguage.ID,
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

## Tipe Data

```typescript
class StatisticClassification {
  id: string;
  title: string;
  description: string | null;
  previous: string | null;
  flag: string | null;
  type: ClassificationType;
}
```
