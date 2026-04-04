# Derived Variables

BPS derived variables — variables calculated from other variables.

## List Derived Variables

```typescript
const result = await stadata.list.derivedVariables({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  subjectId: 1,
  variableId: 100,
});
```

## Data Type

```typescript
class DerivedVariable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  unit: string | null;
}
```
