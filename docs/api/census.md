# Census

Data sensus BPS — hasil sensus penduduk, pertanian, dan ekonomi.

## List Census

```typescript
const result = await stadata.list.census({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'sensus penduduk',   // opsional
  dataAvailability: DataAvailability.AVAILABLE,  // opsional
});
```

### DataAvailability

```typescript
enum DataAvailability {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not-available',
}
```

## Tipe Data

```typescript
class Census {
  id: string;
  title: string;
  subjectId: number;
  size: string;
  updatedAt: Date | null;
}
```
