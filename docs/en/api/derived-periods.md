# Derived Periods

BPS derived periods — periods for derived variables.

## List Derived Periods

```typescript
const result = await stadata.list.derivedPeriods({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  variableId: 100,
});
```

## Data Type

```typescript
class DerivedPeriod {
  id: string;
  name: string;
}
```
