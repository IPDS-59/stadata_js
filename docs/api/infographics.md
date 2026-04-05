# Infographics

Infografis BPS — visualisasi data statistik dalam format gambar.

## List Infographics

```typescript
import { useInfographics, DataLanguage } from 'stadata-js'

const { fetchInfographicList } = useInfographics()

const result = await fetchInfographicList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
  keyword: 'inflasi',
})

result.match(
  ({ data }) => data.forEach(i => console.log(i.title, i.image)),
  (err) => console.error(err.message)
)
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `keyword` | `string` | ❌ | Kata kunci pencarian |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## Tipe Data

```typescript
class Infographic {
  id: string;
  title: string;
  image: string;   // URL gambar
}
```
