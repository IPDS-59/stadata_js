# Trade

BPS export/import trade data.

## Get Trade Data

```typescript
const result = await stadata.view.trade({
  domain: '0000',
  lang: DataLanguage.EN,
  type: 'export',
  year: 2023,
  month: 6,
  hs2: '01',
});
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | `string` | ✅ | BPS domain code |
| `lang` | `DataLanguage` | ✅ | Response language |
| `type` | `string` | ✅ | `'export'` or `'import'` |
| `year` | `number` | ✅ | Data year |
| `month` | `number` | ❌ | Data month (1-12) |
| `hs2` | `string` | ❌ | HS 2-digit code |
