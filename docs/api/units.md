# Units

Satuan pengukuran BPS.

## List Units

```typescript
const result = await stadata.list.units({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  variableId: 100,   // opsional
});
```

## View Unit

```typescript
const result = await stadata.view.unit({
  id: 1,
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class Unit {
  id: number;
  name: string;
}
```
