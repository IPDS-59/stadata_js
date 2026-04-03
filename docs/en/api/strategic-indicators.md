# Strategic Indicators

BPS strategic indicators — key national development indicators.

## List Strategic Indicators

```typescript
const result = await stadata.list.strategicIndicators({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  keyword: 'poverty',
  year: 2023,
});
```

## View Strategic Indicator

```typescript
const result = await stadata.view.strategicIndicator({
  id: 'indicator-id',
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class StrategicIndicator {
  id: string;
  name: string;
  variableId: number;
  periode: string;
  value: number | null;
  unit: string | null;
}
```
