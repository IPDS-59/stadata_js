# Domains

Domains represent BPS regions (provinces, regencies, or national).

## List Domains

```typescript
const result = await stadata.list.domains({
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  type: DomainType.ALL,    // optional
});
```

## Domain Type

```typescript
enum DomainType {
  ALL = 'all',
  PROVINCE = 'prov',
  REGENCY = 'kab',
}
```

## Data Type

```typescript
class Domain {
  id: string;    // BPS domain code (e.g. '7200' for Central Sulawesi)
  name: string;  // Region name
  url: string;   // BPS regional portal URL
}
```
