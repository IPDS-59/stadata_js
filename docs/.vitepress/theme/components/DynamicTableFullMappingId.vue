<template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
.wrap { padding: 1rem 0; font-family: var(--font-sans); }
.two-col { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 16px; margin-bottom: 20px; }
.panel { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px; }
.panel-label { font-size: 11px; font-weight: 500; color: var(--color-text-tertiary); letter-spacing: 0.06em; margin-bottom: 10px; }
pre { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
.divider { border: none; border-top: 0.5px solid var(--color-border-tertiary); margin: 12px 0; }
.case-label { font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px; font-weight: 500; }
.tbl-wrap { overflow-x: auto; border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); margin-bottom: 20px; }
table { border-collapse: collapse; font-size: 12px; width: 100%; }
th { background: var(--color-background-secondary); color: var(--color-text-secondary); font-weight: 500; padding: 7px 10px; text-align: center; border: 0.5px solid var(--color-border-tertiary); white-space: nowrap; }
th.left { text-align: left; }
th.h-tahun   { background: #E1F5EE; color: #085041; }
th.h-turtahun{ background: #EEEDFE; color: #3C3489; }
th.h-turvar  { background: #FAEEDA; color: #633806; }
th.h-vervar  { background: #E6F1FB; color: #0C447C; }
td { padding: 6px 10px; border: 0.5px solid var(--color-border-tertiary); color: var(--color-text-primary); text-align: right; font-variant-numeric: tabular-nums; font-size: 12px; white-space: nowrap; }
td.left { text-align: left; }
.seg { display: inline-block; padding: 1px 5px; border-radius: 3px; font-family: var(--font-mono); font-size: 11px; }
.seg-vv { background: #E6F1FB; color: #0C447C; }
.seg-v  { background: #FBEAF0; color: #72243E; }
.seg-tv { background: #FAEEDA; color: #633806; }
.seg-th { background: #E1F5EE; color: #085041; }
.seg-tt { background: #EEEDFE; color: #3C3489; }
.key-decode { font-size: 12px; color: var(--color-text-secondary); margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
.rule { font-size: 11px; color: var(--color-text-tertiary); margin-top: 6px; }
</style>

<div class="wrap">

<div class="two-col">
  <div class="panel">
    <div class="panel-label">RESPONS JSON (kasus lengkap)</div>
    <pre><span class="seg-vv">vervar</span>: [{ val: 7315, label: "Pinrang" }]

<span class="seg-v">var</span>: [{ val: 31, label: "Jumlah Penduduk",
         unit: "Jiwa" }]

<span class="seg-tv">turvar</span>: [
  { val: 1, label: "Kec A" },
  { val: 2, label: "Kec B" }
]

<span class="seg-th">tahun</span>: [
  { val: 99,  label: "1999" },
  { val: 100, label: "2000" }
]

<span class="seg-tt">turtahun</span>: [
  { val: 2, label: "Februari" },
  { val: 3, label: "Maret" }
]

datacontent: {
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">1</span><span class="seg-th">99</span><span class="seg-tt">2</span>":  101234,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">2</span><span class="seg-th">99</span><span class="seg-tt">2</span>":  98441,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">1</span><span class="seg-th">99</span><span class="seg-tt">3</span>":  102887,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">2</span><span class="seg-th">99</span><span class="seg-tt">3</span>":  99103,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">1</span><span class="seg-th">100</span><span class="seg-tt">2</span>": 103991,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">2</span><span class="seg-th">100</span><span class="seg-tt">2</span>": 100234,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">1</span><span class="seg-th">100</span><span class="seg-tt">3</span>": 105112,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">2</span><span class="seg-th">100</span><span class="seg-tt">3</span>": 101876
}</pre>
  </div>

  <div class="panel">
    <div class="panel-label">ANATOMI KUNCI</div>
    <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:10px;">Key = gabungan semua field <code>val</code> dengan urutan tetap:</div>
    <div class="key-decode">
      <span class="seg seg-vv">vervar</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-v">var</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tv">turvar</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-th">tahun</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tt">turtahun</span>
    </div>

    <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:6px;">Contoh — Pinrang / Kec A / 1999 / Feb:</div>
    <div class="key-decode">
      <span class="seg seg-vv">7315</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-v">31</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tv">1</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-th">99</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tt">2</span>
      <span style="color:var(--color-text-tertiary)">=</span>
      <span style="font-family:var(--font-mono);font-size:12px;color:var(--color-text-primary);font-weight:500;">7315311992</span>
    </div>

    <hr class="divider">

    <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:8px;">Aturan header tabel:</div>
    <div style="font-size:12px;color:var(--color-text-secondary);line-height:1.8;">
      Baris 1 <span class="seg seg-th">tahun</span> — selalu ditampilkan<br>
      &nbsp;&nbsp;colspan = jumlah(turtahun) × jumlah(turvar)<br>
      Baris 2 <span class="seg seg-tt">turtahun</span> — lewati jika hanya 1 nilai<br>
      &nbsp;&nbsp;colspan = jumlah(turvar)<br>
      Baris 3 <span class="seg seg-tv">turvar</span> — lewati jika hanya 1 nilai<br>
      &nbsp;&nbsp;colspan = 1 (leaf)
    </div>

    <hr class="divider">
    <div style="font-size:11px;color:var(--color-text-tertiary);">Loop: vervar × var × tahun × turtahun × turvar → bangun key → lookup ke datacontent</div>
  </div>
</div>

<!-- Case A -->
<div class="case-label">Kasus A — satu turvar + satu turtahun: hanya satu baris header</div>
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th class="left h-vervar">Wilayah</th>
        <th class="h-tahun">1999</th>
        <th class="h-tahun">2000</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="left">Pinrang</td><td>308,669</td><td>311,595</td></tr>
    </tbody>
  </table>
</div>

<!-- Case B -->
<div class="case-label">Kasus B — banyak turvar, satu turtahun: dua baris header (tahun → turvar)</div>
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th class="left h-vervar" rowspan="2">Wilayah</th>
        <th class="h-tahun" colspan="2">1999</th>
        <th class="h-tahun" colspan="2">2000</th>
      </tr>
      <tr>
        <th class="h-turvar">Kec A</th>
        <th class="h-turvar">Kec B</th>
        <th class="h-turvar">Kec A</th>
        <th class="h-turvar">Kec B</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="left">Pinrang</td><td>308,669</td><td>295,421</td><td>311,595</td><td>300,112</td></tr>
    </tbody>
  </table>
</div>

<!-- Case C -->
<div class="case-label">Kasus C — satu turvar, banyak turtahun: dua baris header (tahun → turtahun)</div>
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th class="left h-vervar" rowspan="2">Wilayah</th>
        <th class="h-tahun" colspan="2">1999</th>
        <th class="h-tahun" colspan="2">2000</th>
      </tr>
      <tr>
        <th class="h-turtahun">Februari</th>
        <th class="h-turtahun">Maret</th>
        <th class="h-turtahun">Februari</th>
        <th class="h-turtahun">Maret</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="left">Pinrang</td><td>101,234</td><td>102,887</td><td>103,991</td><td>105,112</td></tr>
    </tbody>
  </table>
</div>

<!-- Case D -->
<div class="case-label">Kasus D — banyak turvar + banyak turtahun: tiga baris header (tahun → turtahun → turvar)</div>
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th class="left h-vervar" rowspan="3">Wilayah</th>
        <th class="h-tahun" colspan="4">1999</th>
        <th class="h-tahun" colspan="4">2000</th>
      </tr>
      <tr>
        <th class="h-turtahun" colspan="2">Februari</th>
        <th class="h-turtahun" colspan="2">Maret</th>
        <th class="h-turtahun" colspan="2">Februari</th>
        <th class="h-turtahun" colspan="2">Maret</th>
      </tr>
      <tr>
        <th class="h-turvar">Kec A</th>
        <th class="h-turvar">Kec B</th>
        <th class="h-turvar">Kec A</th>
        <th class="h-turvar">Kec B</th>
        <th class="h-turvar">Kec A</th>
        <th class="h-turvar">Kec B</th>
        <th class="h-turvar">Kec A</th>
        <th class="h-turvar">Kec B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="left">Pinrang</td>
        <td>101,234</td><td>98,441</td>
        <td>102,887</td><td>99,103</td>
        <td>103,991</td><td>100,234</td>
        <td>105,112</td><td>101,876</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Legend -->
<div style="display:flex;flex-wrap:wrap;gap:8px;font-size:11px;color:var(--color-text-secondary);">
  <span><span class="seg seg-vv">vervar</span> wilayah</span>
  <span><span class="seg seg-v">var</span> indikator</span>
  <span><span class="seg seg-tv">turvar</span> sub-dimensi</span>
  <span><span class="seg seg-th">tahun</span> tahun</span>
  <span><span class="seg seg-tt">turtahun</span> sub-periodee</span>
</div>

</div>

</template>
