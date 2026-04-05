<template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
.wrap { padding: 1rem 0; font-family: var(--font-sans); }
.two-col { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 16px; margin-bottom: 20px; }
.panel { background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 14px; }
.panel-label { font-size: 11px; font-weight: 500; color: var(--color-text-tertiary); letter-spacing: 0.06em; margin-bottom: 10px; }
pre { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-secondary); line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
.k-vervar { color: #185FA5; font-weight: 500; }
.k-var    { color: #993556; font-weight: 500; }
.k-turvar { color: #854F0B; font-weight: 500; }
.k-tahun  { color: #0F6E56; font-weight: 500; }
.k-turtahun { color: #534AB7; font-weight: 500; }
.k-data   { color: var(--color-text-primary); font-weight: 500; }
.divider  { border: none; border-top: 0.5px solid var(--color-border-tertiary); margin: 16px 0; }
.case-label { font-size: 12px; color: var(--color-text-secondary); margin-bottom: 10px; font-weight: 500; }
.tbl-wrap { overflow-x: auto; border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); margin-bottom: 16px; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th { background: var(--color-background-secondary); color: var(--color-text-secondary); font-weight: 500; padding: 7px 12px; text-align: center; border-bottom: 0.5px solid var(--color-border-tertiary); border-right: 0.5px solid var(--color-border-tertiary); white-space: nowrap; }
th.left { text-align: left; }
th.vervar-h { background: #E6F1FB; color: #0C447C; }
th.turvar-h { background: #FAEEDA; color: #633806; }
th.tahun-h  { background: #E1F5EE; color: #085041; }
td { padding: 6px 12px; border-bottom: 0.5px solid var(--color-border-tertiary); border-right: 0.5px solid var(--color-border-tertiary); color: var(--color-text-primary); text-align: right; font-variant-numeric: tabular-nums; font-size: 12px; white-space: nowrap; }
td.left { text-align: left; }
tr:last-child td { border-bottom: none; }
th:last-child, td:last-child { border-right: none; }
.seg { display: inline-block; padding: 1px 5px; border-radius: 3px; font-family: var(--font-mono); font-size: 11px; }
.seg-vv { background: #E6F1FB; color: #0C447C; }
.seg-v  { background: #FBEAF0; color: #72243E; }
.seg-tv { background: #FAEEDA; color: #633806; }
.seg-th { background: #E1F5EE; color: #085041; }
.seg-tt { background: #EEEDFE; color: #3C3489; }
.key-decode { font-size: 12px; color: var(--color-text-secondary); margin-bottom: 12px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
@media (prefers-color-scheme: dark) {
  .th.vervar-h { background: #0C447C; color: #B5D4F4; }
  .th.turvar-h { background: #633806; color: #FAC775; }
  .th.tahun-h  { background: #085041; color: #9FE1CB; }
  .seg-vv { background: #0C447C; color: #B5D4F4; }
  .seg-v  { background: #72243E; color: #F4C0D1; }
  .seg-tv { background: #633806; color: #FAC775; }
  .seg-th { background: #085041; color: #9FE1CB; }
  .seg-tt { background: #3C3489; color: #CECBF6; }
}
</style>

<div class="wrap">

<div class="two-col">
  <!-- LEFT: JSON -->
  <div class="panel">
    <div class="panel-label">RESPONS JSON</div>
    <pre><span class="k-vervar">"vervar"</span>: [
  { "val": <span class="k-vervar">7315</span>, "label": "Pinrang" }
],
<span class="k-var">"var"</span>: [
  { "val": <span class="k-var">31</span>, "label": "Jumlah Penduduk",
    "unit": "Jiwa" }
],
<span class="k-turvar">"turvar"</span>: [
  { "val": <span class="k-turvar">1</span>, "label": "Kec A" },
  { "val": <span class="k-turvar">2</span>, "label": "Kec B" }
],
<span class="k-tahun">"tahun"</span>: [
  { "val": <span class="k-tahun">99</span>,  "label": "1999" },
  { "val": <span class="k-tahun">100</span>, "label": "2000" }
],
<span class="k-turtahun">"turtahun"</span>: [
  { "val": <span class="k-turtahun">0</span>, "label": "Tahun" }
],
<span class="k-data">"datacontent"</span>: {
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">1</span><span class="seg-th">99</span><span class="seg-tt">0</span>":  308669,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">2</span><span class="seg-th">99</span><span class="seg-tt">0</span>":  295421,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">1</span><span class="seg-th">100</span><span class="seg-tt">0</span>": 311595,
  "<span class="seg-vv">7315</span><span class="seg-v">31</span><span class="seg-tv">2</span><span class="seg-th">100</span><span class="seg-tt">0</span>": 300112
}</pre>
  </div>

  <!-- RIGHT: key decode -->
  <div class="panel">
    <div class="panel-label">ANATOMI KUNCI</div>
    <div style="font-size:12px; color:var(--color-text-secondary); margin-bottom:12px;">Setiap key pada <code>datacontent</code> adalah gabungan dari field <code>val</code>:</div>

    <div class="key-decode">
      <span class="seg seg-vv">vervar.val</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-v">var.val</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tv">turvar.val</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-th">tahun.val</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tt">turtahun.val</span>
    </div>

    <div style="font-size:12px; color:var(--color-text-secondary); margin-bottom:8px;">Contoh — Pinrang / Kec A / 1999:</div>
    <div class="key-decode">
      <span class="seg seg-vv">7315</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-v">31</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tv">1</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-th">99</span>
      <span style="color:var(--color-text-tertiary)">+</span>
      <span class="seg seg-tt">0</span>
      <span style="color:var(--color-text-tertiary);">=</span>
      <span style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-primary); font-weight:500;">731531199​0</span>
    </div>

    <hr class="divider">
    <div style="font-size:12px; color:var(--color-text-secondary); margin-bottom:8px;">⚠ Panjang key bersifat variabel — setiap segmen bisa punya jumlah digit berbeda. Bangun key lewat lookup, jangan split fixed-width.</div>
    <div style="font-size:12px; color:var(--color-text-secondary);">Loop: <code>vervar × var × turvar × tahun × turtahun</code> → bangun key → lookup ke datacontent.</div>
  </div>
</div>

<!-- Case A -->
<div class="case-label">Kasus A — turvar tunggal (atau "Tidak Ada"): satu baris header</div>
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th class="left vervar-h">Wilayah</th>
        <th class="tahun-h">1999</th>
        <th class="tahun-h">2000</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="left">Pinrang</td><td>308,669</td><td>311,595</td></tr>
    </tbody>
  </table>
</div>

<!-- Case B -->
<div class="case-label">Kasus B — turvar lebih dari satu (mis. level kecamatan): header dua baris, colspan tahun = jumlah turvar</div>
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th class="left vervar-h" rowspan="2">Wilayah</th>
        <th class="tahun-h" colspan="2">1999</th>
        <th class="tahun-h" colspan="2">2000</th>
      </tr>
      <tr>
        <th class="turvar-h">Kec A</th>
        <th class="turvar-h">Kec B</th>
        <th class="turvar-h">Kec A</th>
        <th class="turvar-h">Kec B</th>
      </tr>
    </thead>
    <tbody>
      <tr><td class="left">Pinrang</td><td>308,669</td><td>295,421</td><td>311,595</td><td>300,112</td></tr>
    </tbody>
  </table>
</div>

<!-- Legenda -->
<div style="display:flex; flex-wrap:wrap; gap:8px; font-size:11px; color:var(--color-text-secondary); margin-top:4px;">
  <span><span class="seg seg-vv">vervar</span> wilayah</span>
  <span><span class="seg seg-v">var</span> indikator</span>
  <span><span class="seg seg-tv">turvar</span> sub-dimensi</span>
  <span><span class="seg seg-th">tahun</span> tahun</span>
  <span><span class="seg seg-tt">turtahun</span> turunan tahun</span>
</div>

</div>

</template>
