# Publications

Publikasi BPS — laporan statistik, buletin, dan dokumen resmi.

## List Publications

```typescript
const result = await stadata.list.publications({
  domain: '7200',          // Kode domain BPS
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'inflasi',      // Kata kunci pencarian (opsional)
  month: 1,                // Filter bulan (opsional)
  year: 2023,              // Filter tahun (opsional)
});
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ✅ | Bahasa respons |
| `page` | `number` | ❌ | Halaman |
| `perPage` | `number` | ❌ | Item per halaman |
| `keyword` | `string` | ❌ | Kata kunci pencarian |
| `month` | `number` | ❌ | Filter bulan (1-12) |
| `year` | `number` | ❌ | Filter tahun |

## View Publication

```typescript
const result = await stadata.view.publication({
  id: 'publication-id',
  domain: '7200',
  lang: DataLanguage.ID,
});
```

## Tipe Data

```typescript
class Publication {
  id: string;
  title: string;
  issn: string;
  cover: string;                // URL cover image
  pdf: string;                  // URL file PDF
  size: string;                 // Ukuran file
  scheduledDate: Date | null;
  releaseDate: Date | null;
  updateDate: Date | null;
  abstract: string | null;
  catalogueNumber: string | null;
  publicationNumber: string | null;
  relatedPublications: RelatedPublication[];
}
```

## Contoh

```typescript
// List dengan filter
const result = await stadata.list.publications({
  domain: '7200',
  lang: DataLanguage.ID,
  keyword: 'PDRB',
  year: 2023,
});

// Detail publikasi
const detail = await stadata.view.publication({
  id: 'pub-123',
  domain: '7200',
  lang: DataLanguage.ID,
});

detail.match(
  (pub) => console.log(pub.title, pub.pdf),
  (err) => console.error(err.message)
);
```
