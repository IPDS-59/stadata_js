# Vertical Variables

BPS vertical classification of statistical variables.

## List Vertical Variables

```typescript
const result = await stadata.list.verticalVariables({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
});
```

## Data Type

```typescript
class VerticalVariable {
  id: number;
  title: string;
  unit: string | null;
  subjectId: number;
  subjectName: string;
}
```
