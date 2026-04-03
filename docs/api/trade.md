# Trade

Data perdagangan ekspor/impor BPS.

## Get Trade Data

```typescript
const result = await stadata.view.trade({
  domain: '0000',
  lang: DataLanguage.ID,
  type: 'ekspor',      // 'ekspor' | 'impor'
  year: 2023,
  month: 1,
  hs2: '01',           // Kode HS 2 digit (opsional)
});
```

## Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ✅ | Bahasa respons |
| `type` | `string` | ✅ | Tipe: `'ekspor'` atau `'impor'` |
| `year` | `number` | ✅ | Tahun data |
| `month` | `number` | ❌ | Bulan data (1-12) |
| `hs2` | `string` | ❌ | Kode HS 2 digit |

## Tipe Data

```typescript
interface TradeParams {
  domain: string;
  lang: DataLanguage;
  type: string;
  year: number;
  month?: number;
  hs2?: string;
}
```

## Contoh

```typescript
const result = await stadata.view.trade({
  domain: '0000',
  lang: DataLanguage.ID,
  type: 'ekspor',
  year: 2023,
  month: 6,
});

result.match(
  (data) => console.log(data),
  (err) => console.error(err.message)
);
```
