# Periods

BPS data collection periods (annual, quarterly, monthly, etc.).

## List Periods

```typescript
const result = await stadata.list.periods({
  domain: '7200',
  lang: DataLanguage.EN,
  page: 1,
  perPage: 10,
  variableId: 100,
});
```

## Data Type

```typescript
class Period {
  id: string;
  name: string;
}
```
