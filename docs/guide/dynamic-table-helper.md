# Dynamic Table Helpers

Selain mengambil data tabel dinamis mentah, `stadata-js` juga menyediakan helper untuk mengubah hasilnya menjadi format yang lebih mudah dipakai di UI atau export.

## 1. `toStructuredData()`

Method ini tersedia di entity `DynamicTable`.

```typescript
import { useDynamicTables, DataLanguage } from 'stadata-js'

const { fetchDynamicTableList } = useDynamicTables()

const result = await fetchDynamicTableList({
  domain: '7200',
  variableId: 529,
  periodId: '117:120',
  lang: DataLanguage.ID,
})

result.match(
  ({ data }) => {
    const table = data[0]
    const structured = table.toStructuredData()

    console.log(structured)
  },
  (err) => console.error(err.message)
)
```

### Kegunaan

`toStructuredData()` cocok kalau kamu ingin:
- render nested table sendiri di frontend
- ubah data ke chart series
- export ke CSV / Excel
- konsumsi data tanpa parsing composite key manual

## 2. `DynamicTableHtmlGenerator`

Kalau kamu butuh HTML table siap render, gunakan helper ini.

```typescript
import {
  useDynamicTables,
  DynamicTableHtmlGenerator,
  DataLanguage,
} from 'stadata-js'

const { fetchDynamicTableList } = useDynamicTables()

const result = await fetchDynamicTableList({
  domain: '7200',
  variableId: 529,
  periodId: '117:120',
  lang: DataLanguage.ID,
})

result.match(
  ({ data }) => {
    const table = data[0]
    const html = DynamicTableHtmlGenerator.generate(table)

    console.log(html)
  },
  (err) => console.error(err.message)
)
```

### Output

Helper ini menghasilkan string HTML `<table>` berdasarkan struktur:
- row: vertical variables
- column: derived variables × periods
- value: `datacontent`

## Catatan

- helper ini mengikuti pendekatan yang sama dengan Flutter SDK
- HTML generator cocok untuk quick rendering / export, bukan untuk styling kompleks
- untuk kontrol penuh, lebih aman gunakan `toStructuredData()` lalu render sendiri di UI framework kamu
