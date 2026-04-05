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

### Contoh Output `toStructuredData()`

Berdasarkan contoh response yang kita pakai di dokumentasi mapping:

```json
{
  "subject_id": 0,
  "subject_label": "",
  "variable_id": 31,
  "variable_label": "Jumlah Penduduk",
  "variable_unit": "Jiwa",
  "vertical_variable_label": "Wilayah",
  "last_update": null,
  "data": [
    {
      "id": 7315,
      "label": "Pinrang",
      "data": [
        {
          "id": 99,
          "label": "1999",
          "data": [
            {
              "id": 2,
              "label": "Februari",
              "data": [
                { "id": 1, "label": "Kec A", "value": 101234 },
                { "id": 2, "label": "Kec B", "value": 98441 }
              ]
            },
            {
              "id": 3,
              "label": "Maret",
              "data": [
                { "id": 1, "label": "Kec A", "value": 102887 },
                { "id": 2, "label": "Kec B", "value": 99103 }
              ]
            }
          ]
        },
        {
          "id": 100,
          "label": "2000",
          "data": [
            {
              "id": 2,
              "label": "Februari",
              "data": [
                { "id": 1, "label": "Kec A", "value": 103991 },
                { "id": 2, "label": "Kec B", "value": 100234 }
              ]
            },
            {
              "id": 3,
              "label": "Maret",
              "data": [
                { "id": 1, "label": "Kec A", "value": 105112 },
                { "id": 2, "label": "Kec B", "value": 101876 }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Struktur ini enak dipakai kalau kamu mau render tabel nested sendiri di frontend.

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

### Contoh Hasil Render HTML

Untuk contoh response `turvar + turtahun`, bentuk tabel yang dihasilkan secara visual akan seperti ini:

```html
<table>
  <thead>
    <tr>
      <th rowspan="3">Wilayah</th>
      <th colspan="4">1999</th>
      <th colspan="4">2000</th>
    </tr>
    <tr>
      <th colspan="2">Februari</th>
      <th colspan="2">Maret</th>
      <th colspan="2">Februari</th>
      <th colspan="2">Maret</th>
    </tr>
    <tr>
      <th>Kec A</th>
      <th>Kec B</th>
      <th>Kec A</th>
      <th>Kec B</th>
      <th>Kec A</th>
      <th>Kec B</th>
      <th>Kec A</th>
      <th>Kec B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Pinrang</td>
      <td>101234</td>
      <td>98441</td>
      <td>102887</td>
      <td>99103</td>
      <td>103991</td>
      <td>100234</td>
      <td>105112</td>
      <td>101876</td>
    </tr>
  </tbody>
</table>
```

Kalau mau lihat bentuk visual finalnya, lihat halaman [Dynamic Table Mapping](/guide/dynamic-table-mapping).

## Catatan

- helper ini mengikuti pendekatan yang sama dengan Flutter SDK
- HTML generator cocok untuk quick rendering / export, bukan untuk styling kompleks
- untuk kontrol penuh, lebih aman gunakan `toStructuredData()` lalu render sendiri di UI framework kamu
- kalau kamu ingin memahami bagaimana composite key `datacontent` dipetakan ke row/column tabel, lihat [Dynamic Table Mapping](/guide/dynamic-table-mapping)
