# Subjects

Subjek statistik BPS — kategori utama pengumpulan data BPS.

## List Subjects

```typescript
import { useSubjects, DataLanguage } from 'stadata-js'

const { fetchSubjectList } = useSubjects()

const result = await fetchSubjectList({
  domain: '7200',
  lang: DataLanguage.ID,
  page: 1,
  perPage: 10,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `subjectCategoryId` | `number` | ❌ | Filter berdasarkan ID kategori subjek (`subcat`) |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

## View Subject

```typescript
const { fetchSubjectDetail } = useSubjects()

const result = await fetchSubjectDetail({
  id: 1,
  domain: '7200',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID subjek |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class Subject {
  id: number;
  name: string;
  nTable: number;       // Jumlah tabel terkait
  subjectCategoryId: number;
}
```
