# Periods

Periode data statistik BPS — waktu pengumpulan data (tahunan, triwulan, bulanan, dll).

## List Periods

```typescript
const result = await stadata.list.periods({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  variableId: 100,   // opsional
});
```

## Tipe Data

```typescript
class Period {
  id: string;
  name: string;
}
```
