# Mapping Dynamic Table ke Bentuk Tabel

Halaman ini menjelaskan bagaimana response dynamic table BPS dipetakan menjadi tabel yang bisa dirender di UI.

## Visual 1 — Mapping dari Struktur Tabel

Diagram ini membantu melihat bagaimana dimensi response dipetakan menjadi **baris**, **kolom**, dan **nilai sel**.

![Diagram mapping dynamic table](/dynamic-table-mapping-diagram.svg)

### Inti Mapping

- **Baris** berasal dari `vervar`
- **Kolom utama** berasal dari `tahun`
- **Sub-kolom** bisa berasal dari `turvar`
- **Nilai sel** diambil dari `datacontent`
- Setiap nilai dicari lewat **kunci komposit**:

```text
{vervar}{var}{turvar}{tahun}{turtahun}
```

Contoh:

```text
7315 + 31 + 0 + 99 + 0 = 7315310990
```

Lalu lookup:

```text
datacontent[7315310990] = 308669
```

## Visual 2 — Mapping dari JSON Response ke Tabel

Visual berikut menunjukkan hubungan langsung antara JSON response dan hasil tabel render.

<DynamicTableJsonMapping />

## Aturan Mental Model

### 1. Baris
Selalu mulai dari `vervar`.

```text
setiap item di vervar = satu baris utama
```

### 2. Kolom
- kalau `turvar` hanya satu / tidak ada dimensi turunan yang bermakna → kolom cukup `tahun`
- kalau `turvar` lebih dari satu → kolom menjadi `turvar × tahun`

### 3. Level tambahan
Kalau ada `turtahun`, maka level kolom bisa bertambah lagi.

```text
vervar -> turvar -> tahun -> turtahun
```

## Dalam `stadata-js`

### Opsi 1 — `toStructuredData()`
Kalau mau render tabel sendiri dengan kontrol penuh:

```typescript
const structured = table.toStructuredData()
```

### Opsi 2 — `DynamicTableHtmlGenerator`
Kalau mau cepat jadi HTML table:

```typescript
import { DynamicTableHtmlGenerator } from 'stadata-js'

const html = DynamicTableHtmlGenerator.generate(table)
```

## Kapan Perlu Parse Manual?

Manual parsing biasanya cuma perlu kalau:
- mau bikin visualisasi yang sangat custom
- mau export ke format sendiri
- mau membuat pivot logic yang beda dari helper bawaan

Kalau tidak, pakai helper bawaan lebih aman.

## Lihat Juga

- [Dynamic Table Helpers](/guide/dynamic-table-helper)
- [Dynamic Tables API](/api/dynamic-tables)
