# Variables

Variabel statistik BPS — indikator dan variabel yang digunakan dalam pengumpulan data.

## List Variables

```typescript
const result = await stadata.list.variables({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  subjectId: 1,          // opsional — filter berdasarkan subjek
});
```

## View Variable

```typescript
const result = await stadata.view.variable({
  id: 1234,
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class Variable {
  id: number;
  name: string;
  subjectId: number;
  subjectName: string;
  verticalVariableId: number;
  csa: string | null;
  graphName: string | null;
  notes: string | null;
  unit: string | null;
}
```

## Contoh

```typescript
const result = await stadata.list.variables({
  domain: '7200',
  lang: DataLanguage.ID,
  subjectId: 3,          // subjek: kependudukan
});

result.match(
  ({ data }) => data.forEach(v => console.log(v.name, v.unit)),
  (err) => console.error(err.message)
);
```
