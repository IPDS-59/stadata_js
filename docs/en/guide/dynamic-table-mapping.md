# Mapping Dynamic Table Data into a Table

This page explains how a BPS dynamic table response is transformed into a renderable table in the UI.

## Visual 1 — Table Structure Mapping

This diagram helps show how response dimensions are mapped into **rows**, **columns**, and **cell values**.

![Dynamic table mapping diagram](/dynamic-table-mapping-diagram.svg)

### Core Mapping

- **Rows** come from `vervar`
- **Main columns** come from `tahun`
- **Sub-columns** can come from `turvar`
- **Cell values** are read from `datacontent`
- Every value is looked up using a **composite key**:

```text
{vervar}{var}{turvar}{tahun}{turtahun}
```

Example:

```text
7315 + 31 + 0 + 99 + 0 = 7315310990
```

Then lookup:

```text
datacontent[7315310990] = 308669
```

## Visual 2 — JSON Response to Table Mapping

The visual below shows the direct relationship between the JSON response and the rendered table result.

<DynamicTableJsonMapping />

## Mental Model Rules

### 1. Rows
Always start with `vervar`.

```text
each item in vervar = one main row
```

### 2. Columns
- if `turvar` only has one meaningful value or is effectively absent → columns can just be `tahun`
- if `turvar` has multiple meaningful values → columns become `turvar × tahun`

### 3. Extra hierarchy
If `turtahun` exists, the column hierarchy can gain another level.

```text
vervar -> turvar -> tahun -> turtahun
```

## In `stadata-js`

### Option 1 — `toStructuredData()`
Use this when you want full control over table rendering.

```typescript
const structured = table.toStructuredData()
```

### Option 2 — `DynamicTableHtmlGenerator`
Use this when you want a quick HTML table.

```typescript
import { DynamicTableHtmlGenerator } from 'stadata-js'

const html = DynamicTableHtmlGenerator.generate(table)
```

## When do you need manual parsing?
Manual parsing is usually only needed when:
- you want a highly custom visualization
- you want to export to your own custom format
- you want pivot logic different from the built-in helpers

Otherwise, prefer the built-in helpers.

## Summary

```text
vervar   = row key
var      = selected metric
turvar   = optional extra column dimension
tahun    = main period column
turtahun = optional sub-period column
```

And the actual value is always read from:

```text
datacontent[{vervar}{var}{turvar}{tahun}{turtahun}]
```

## See Also

- [Dynamic Table Helpers](/en/guide/dynamic-table-helper)
- [Dynamic Tables API](/en/api/dynamic-tables)
