# Mapping Dynamic Table ke Bentuk Tabel

Halaman ini menjelaskan bagaimana response dynamic table BPS dipetakan menjadi tabel yang bisa dirender di UI, termasuk kondisi ketika ada **`turtahun`**.

## Visual 1 — Mapping dari Struktur Tabel

Visual ini membantu melihat bagaimana dimensi response dipetakan menjadi **baris**, **kolom**, dan **nilai sel** — tanpa bergantung ke asset SVG terpisah.

<DynamicTableStructureMappingId />

### Inti Mapping

- **Baris** berasal dari `vervar`
- **Kolom utama** berasal dari `tahun`
- **Sub-kolom** bisa berasal dari `turvar`
- **Sub-kolom level berikutnya** bisa berasal dari `turtahun`
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

## Visual 2 — Mapping Lengkap termasuk `turtahun`

Visual berikut menunjukkan empat kondisi penting struktur header tabel:

- **Kasus A**: 1 turvar + 1 turtahun
- **Kasus B**: banyak turvar + 1 turtahun
- **Kasus C**: 1 turvar + banyak turtahun
- **Kasus D**: banyak turvar + banyak turtahun

<DynamicTableProvidedMappingId />

## Aturan Mental Model

### 1. Baris
Selalu mulai dari `vervar`.

```text
setiap item di vervar = satu baris utama
```

### 2. Kolom
- kalau `turvar` hanya satu / tidak ada dimensi turunan yang bermakna → kolom cukup `tahun`
- kalau `turvar` lebih dari satu → kolom menjadi `turvar × tahun`

### 3. Level tambahan `turtahun`
Kalau ada lebih dari satu `turtahun`, maka header kolom perlu satu level lagi.

Rule praktisnya:

- `tahun` selalu jadi level atas
- `turtahun` jadi level tengah kalau jumlahnya > 1
- `turvar` jadi level bawah kalau jumlahnya > 1

Sehingga susunan header bisa menjadi:

```text
tahun
```

atau:

```text
tahun -> turvar
```

atau:

```text
tahun -> turtahun
```

atau kondisi penuh:

```text
tahun -> turtahun -> turvar
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
