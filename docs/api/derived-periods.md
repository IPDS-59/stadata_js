# Derived Periods

Periode turunan BPS — periode yang diturunkan dari variabel turunan.

## List Derived Periods

```typescript
const result = await stadata.list.derivedPeriods({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  variableId: 100,   // opsional
});
```

## Tipe Data

```typescript
class DerivedPeriod {
  id: string;
  name: string;
}
```
