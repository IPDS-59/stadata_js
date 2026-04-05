# Mapping Dynamic Table ke Bentuk Tabel

Halaman ini menjelaskan bagaimana `datacontent` pada dynamic table dibaca dan diubah menjadi tabel yang bisa dirender.

## Struktur Dasar Response

Dynamic table BPS biasanya punya bagian penting berikut:

- `var` → variabel utama
- `vervar` → dimensi baris (vertical variable)
- `turvar` → dimensi turunan tambahan
- `tahun` / `th` → periode utama
- `turtahun` → periode turunan tambahan
- `datacontent` → nilai aktual dengan **composite key**

## Composite Key

Setiap key di `datacontent` dibentuk dengan urutan:

```text
{vervar}{var}{turvar}{tahun}{turtahun}
```

Contoh:

```text
7315 31 0 99 0
```

bisa dibaca sebagai:

| Bagian | Nilai | Arti |
|---|---:|---|
| `vervar` | `7315` | row / baris, misalnya `Pinrang` |
| `var` | `31` | variabel utama, misalnya `Jumlah Penduduk` |
| `turvar` | `0` | tidak ada derived variable |
| `tahun` | `99` | periode utama, misalnya `1999` |
| `turtahun` | `0` | tidak ada derived period |

Sehingga:

```text
7315310990 -> nilai untuk Pinrang × Jumlah Penduduk × 1999
```

## Cara Membaca Menjadi Tabel

### Kasus sederhana
Kalau:
- `vervar` = wilayah / kategori baris
- `tahun` = kolom tahun
- `turvar = 0`
- `turtahun = 0`

maka bentuk tabelnya menjadi:

| Kecamatan | 1999 | 2000 | 2001 |
|---|---:|---:|---:|
| Pinrang | 308669 | 311595 | 312473 |

## Rule Mapping

### 1. Baris utama
Selalu mulai dari `vervar`.

```text
setiap item di vervar = satu baris utama
```

### 2. Kolom utama
Kalau ada `turvar` yang bermakna, maka kolom biasanya jadi:

```text
turvar × tahun
```

Kalau tidak ada `turvar`, maka kolom langsung:

```text
tahun
```

### 3. Sub-kolom tambahan
Kalau ada `turtahun` yang bermakna, maka level kolom bertambah lagi.

Urutan tipikal:

```text
vervar -> turvar -> tahun -> turtahun
```

atau pada bentuk paling sederhana:

```text
vervar -> tahun
```

## Dalam `stadata-js`

### Opsi 1 — pakai `toStructuredData()`
Ini opsi paling aman kalau mau render tabel sendiri.

```typescript
const structured = table.toStructuredData()
```

Output ini sudah dipecah ke struktur bertingkat, jadi kamu tidak perlu parse composite key manual.

### Opsi 2 — pakai `DynamicTableHtmlGenerator`
Kalau mau cepat jadi HTML table:

```typescript
import { DynamicTableHtmlGenerator } from 'stadata-js'

const html = DynamicTableHtmlGenerator.generate(table)
```

## Kapan perlu parse manual?
Manual parsing biasanya cuma perlu kalau:
- mau bikin visualisasi custom banget
- mau export ke format sendiri
- mau membangun pivot logic yang berbeda dari helper bawaan

Kalau tidak ada kebutuhan khusus, gunakan helper bawaan saja.

## Ringkasan Mental Model

```text
vervar   = row key
var      = selected metric
turvar   = optional extra column dimension
tahun    = main period column
turtahun = optional sub-period column
```

Dan nilai aktual selalu diambil dari:

```text
datacontent[{vervar}{var}{turvar}{tahun}{turtahun}]
```

## Lihat Juga

- [Dynamic Table Helpers](/guide/dynamic-table-helper)
- [Dynamic Tables API](/api/dynamic-tables)
