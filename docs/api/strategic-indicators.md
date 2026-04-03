# Strategic Indicators

Indikator strategis BPS — indikator kunci pembangunan nasional.

## List Strategic Indicators

```typescript
const result = await stadata.list.strategicIndicators({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'kemiskinan',   // opsional
  year: 2023,              // opsional
});
```

## View Strategic Indicator

```typescript
const result = await stadata.view.strategicIndicator({
  id: 'indicator-id',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class StrategicIndicator {
  id: string;
  name: string;
  variableId: number;
  periode: string;
  value: number | null;
  unit: string | null;
  category: string | null;
}
```
