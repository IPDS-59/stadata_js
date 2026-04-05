# Mapping Dynamic Table Data into a Table

This page explains how `datacontent` in a BPS dynamic table can be read and transformed into a renderable table.

## Basic Response Structure

A dynamic table response usually contains these important parts:

- `var` → main variable
- `vervar` → row dimension (vertical variable)
- `turvar` → additional derived dimension
- `tahun` / `th` → main period
- `turtahun` → additional derived period
- `datacontent` → actual values stored as a **composite key**

## Composite Key

Each key inside `datacontent` is built in this order:

```text
{vervar}{var}{turvar}{tahun}{turtahun}
```

Example:

```text
7315 31 0 99 0
```

can be read as:

| Part | Value | Meaning |
|---|---:|---|
| `vervar` | `7315` | row key, for example `Pinrang` |
| `var` | `31` | main variable, for example `Population` |
| `turvar` | `0` | no derived variable |
| `tahun` | `99` | main period, for example `1999` |
| `turtahun` | `0` | no derived period |

So:

```text
7315310990 -> value for Pinrang × Population × 1999
```

## How to Turn It into a Table

### Simple case
If:
- `vervar` = region / row category
- `tahun` = year columns
- `turvar = 0`
- `turtahun = 0`

then the table becomes:

| District | 1999 | 2000 | 2001 |
|---|---:|---:|---:|
| Pinrang | 308669 | 311595 | 312473 |

## Mapping Rules

### 1. Main rows
Always start with `vervar`.

```text
each item in vervar = one main row
```

### 2. Main columns
If `turvar` contains meaningful values, then columns usually become:

```text
turvar × tahun
```

If there is no meaningful `turvar`, columns are simply:

```text
tahun
```

### 3. Extra sub-columns
If `turtahun` contains meaningful values, then the column hierarchy gets one more level.

Typical order:

```text
vervar -> turvar -> tahun -> turtahun
```

or in the simplest case:

```text
vervar -> tahun
```

## In `stadata-js`

### Option 1 — use `toStructuredData()`
This is the safest option if you want to render your own table.

```typescript
const structured = table.toStructuredData()
```

This already converts the response into a nested structure, so you do not need to manually parse the composite key.

### Option 2 — use `DynamicTableHtmlGenerator`
If you want a quick HTML table:

```typescript
import { DynamicTableHtmlGenerator } from 'stadata-js'

const html = DynamicTableHtmlGenerator.generate(table)
```

## When do you need manual parsing?
Manual parsing is usually only needed when:
- you want a very custom visualization
- you want to export into your own format
- you want pivot logic that differs from the built-in helpers

Otherwise, prefer the built-in helpers.

## Mental Model Summary

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
