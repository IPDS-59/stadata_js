# Variables

BPS statistical variables — indicators used in data collection.

## List Variables

```typescript
const result = await stadata.list.variables({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  subjectId: 1,   // optional
});
```

## View Variable

```typescript
const result = await stadata.view.variable({
  id: 1234,
  domain: '7200',
  lang: DataLanguage.EN,
});
```

## Data Type

```typescript
class Variable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  unit: string | null;
  notes: string | null;
}
```
