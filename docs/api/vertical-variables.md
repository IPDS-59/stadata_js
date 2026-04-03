# Vertical Variables

Variabel vertikal BPS — klasifikasi vertikal dari variabel statistik.

## List Vertical Variables

```typescript
const result = await stadata.list.verticalVariables({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
});
```

## Tipe Data

```typescript
class VerticalVariable {
  id: number;
  title: string;
  itemId: number | null;
  groupId: number | null;
  name: string | null;
  notes: string | null;
  type: string | null;
  unit: string | null;
  graphIndicator: boolean;
  subjectId: number;
  subjectName: string;
}
```
