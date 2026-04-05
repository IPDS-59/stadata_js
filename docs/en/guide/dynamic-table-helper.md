# Dynamic Table Helpers

In addition to fetching raw dynamic table data, `stadata-js` provides helpers to transform the result into formats that are easier to use in UI rendering or exports.

## 1. `toStructuredData()`

This method is available on the `DynamicTable` entity.

```typescript
import { useDynamicTables, DataLanguage } from 'stadata-js'

const { fetchDynamicTableList } = useDynamicTables()

const result = await fetchDynamicTableList({
  domain: '7200',
  variableId: 529,
  periodId: '117:120',
  lang: DataLanguage.EN,
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

### Use cases

`toStructuredData()` is useful when you want to:
- render your own nested table in the frontend
- convert the data into chart series
- export to CSV / Excel
- consume the data without manually parsing composite keys

### Example `toStructuredData()` Output

Based on the example response used in the mapping docs:

```json
{
  "subject_id": 0,
  "subject_label": "",
  "variable_id": 31,
  "variable_label": "Population",
  "variable_unit": "Person",
  "vertical_variable_label": "Region",
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
              "label": "February",
              "data": [
                { "id": 1, "label": "District A", "value": 101234 },
                { "id": 2, "label": "District B", "value": 98441 }
              ]
            },
            {
              "id": 3,
              "label": "March",
              "data": [
                { "id": 1, "label": "District A", "value": 102887 },
                { "id": 2, "label": "District B", "value": 99103 }
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
              "label": "February",
              "data": [
                { "id": 1, "label": "District A", "value": 103991 },
                { "id": 2, "label": "District B", "value": 100234 }
              ]
            },
            {
              "id": 3,
              "label": "March",
              "data": [
                { "id": 1, "label": "District A", "value": 105112 },
                { "id": 2, "label": "District B", "value": 101876 }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

This structure is useful when you want full control over custom table rendering in the frontend.

## 2. `DynamicTableHtmlGenerator`

If you need a ready-to-render HTML table, use this helper.

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
  lang: DataLanguage.EN,
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

This helper returns an HTML `<table>` string based on:
- rows: vertical variables
- columns: derived variables × periods
- values: `datacontent`

### Example Rendered HTML Output

For the `turvar + turtahun` example response, the rendered table structure will look like this:

```html
<table>
  <thead>
    <tr>
      <th rowspan="3">Region</th>
      <th colspan="4">1999</th>
      <th colspan="4">2000</th>
    </tr>
    <tr>
      <th colspan="2">February</th>
      <th colspan="2">March</th>
      <th colspan="2">February</th>
      <th colspan="2">March</th>
    </tr>
    <tr>
      <th>District A</th>
      <th>District B</th>
      <th>District A</th>
      <th>District B</th>
      <th>District A</th>
      <th>District B</th>
      <th>District A</th>
      <th>District B</th>
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

If you want to see the final visual layout, see [Dynamic Table Mapping](/en/guide/dynamic-table-mapping).

## Notes

- this helper follows the same approach as the Flutter SDK
- the HTML generator is great for quick rendering / export, but not ideal for advanced styling
- for full control, prefer `toStructuredData()` and render it yourself in your UI framework
- if you want to understand how the `datacontent` composite key maps into rows/columns, see [Dynamic Table Mapping](/en/guide/dynamic-table-mapping)
