# Mapping Dynamic Table Data into a Table

This page explains how a BPS dynamic table response is transformed into a renderable table in the UI, including the case where **`turtahun`** is present.

## Visual 1 — Table Structure Mapping

This diagram helps show how response dimensions are mapped into **rows**, **columns**, and **cell values**.

![Dynamic table mapping diagram](/dynamic-table-mapping-diagram.svg)

### Core Mapping

- **Rows** come from `vervar`
- **Main columns** come from `tahun`
- **Sub-columns** can come from `turvar`
- **A deeper sub-column level** can come from `turtahun`
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

## Visual 2 — Full Mapping including `turtahun`

The visual below shows four important header structure cases:

- **Case A**: single turvar + single turtahun
- **Case B**: multiple turvar + single turtahun
- **Case C**: single turvar + multiple turtahun
- **Case D**: multiple turvar + multiple turtahun

<DynamicTableFullMappingEn />

## Mental Model Rules

### 1. Rows
Always start with `vervar`.

```text
each item in vervar = one main row
```

### 2. Columns
- if `turvar` only has one meaningful value or is effectively absent → columns can just be `tahun`
- if `turvar` has multiple meaningful values → columns become `turvar × tahun`

### 3. Extra `turtahun` hierarchy
If there is more than one `turtahun`, the column header needs one more level.

Practical rule:

- `tahun` is always the top level
- `turtahun` becomes the middle level when count > 1
- `turvar` becomes the lower level when count > 1

So the header structure can become:

```text
tahun
```

or:

```text
tahun -> turvar
```

or:

```text
tahun -> turtahun
```

or in the full case:

```text
tahun -> turtahun -> turvar
```

## In `stadata-js`

### Option 1 — `toStructuredData()`
Use this when you want full control over rendering the table.

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

## See Also

- [Dynamic Table Helpers](/en/guide/dynamic-table-helper)
- [Dynamic Tables API](/en/api/dynamic-tables)
