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

## Notes

- this helper follows the same approach as the Flutter SDK
- the HTML generator is great for quick rendering / export, but not ideal for advanced styling
- for full control, prefer `toStructuredData()` and render it yourself in your UI framework
