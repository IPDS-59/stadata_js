# Derived Variables

Variabel turunan BPS — variabel yang diturunkan atau dikalkulasi dari variabel lain.

## List Derived Variables

```typescript
const result = await stadata.list.derivedVariables({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  subjectId: 1,      // opsional
  variableId: 100,   // opsional
});
```

## Tipe Data

```typescript
class DerivedVariable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  csa: string | null;
  graphName: string | null;
  notes: string | null;
  unit: string | null;
}
```
