# Units

BPS measurement units.

## List Units

```typescript
const result = await stadata.list.units({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  variableId: 100,
});
```

## View Unit

```typescript
const result = await stadata.view.unit({
  id: 1,
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class Unit {
  id: number;
  name: string;
}
```
