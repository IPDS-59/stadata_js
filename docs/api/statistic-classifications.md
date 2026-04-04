# Statistic Classifications

Klasifikasi statistik BPS — KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) dan KBKI.

## List Statistic Classifications

```typescript
import { useStatisticClassifications, DataLanguage, ClassificationType } from 'stadata-js'

const { fetchStatisticClassificationList } = useStatisticClassifications()

const result = await fetchStatisticClassificationList({
  lang: DataLanguage.ID,
  type: ClassificationType.KBLI2020,
  keyword: 'pertanian',
  page: 1,
  perPage: 10,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `lang` | `DataLanguage` | ❌ | Bahasa respons |
| `type` | `ClassificationType` | ❌ | Tipe klasifikasi (default: KBLI2020) |
| `level` | `ClassificationLevel` | ❌ | Level klasifikasi |
| `keyword` | `string` | ❌ | Kata kunci pencarian |
| `page` | `number` | ❌ | Halaman (default: 1) |
| `perPage` | `number` | ❌ | Item per halaman |
| `cancelToken` | `CancelToken` | ❌ | Token untuk membatalkan request |

### ClassificationType

```typescript
enum ClassificationType {
  KBLI2009 = 'kbli2009',
  KBLI2015 = 'kbli2015',
  KBLI2017 = 'kbli2017',
  KBLI2020 = 'kbli2020',
  KBKI2015 = 'kbki2015',
}
```

## View Statistic Classification

```typescript
const { fetchStatisticClassificationDetail } = useStatisticClassifications()

const result = await fetchStatisticClassificationDetail({
  id: 'A',
  lang: DataLanguage.ID,
})
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|-----------|------|-------|------------|
| `id` | `string \| number` | ✅ | ID klasifikasi |
| `domain` | `string` | ✅ | Kode domain BPS |
| `lang` | `DataLanguage` | ❌ | Bahasa respons |

## Tipe Data

```typescript
class StatisticClassification {
  id: string;
  title: string;
  description: string | null;
  previous: string | null;
  flag: string | null;
  type: ClassificationType;
}
```
