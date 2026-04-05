<template>
  <div class="mapping-wrap">
    <div class="mapping-grid">
      <section class="panel">
        <div class="panel-label">DIMENSI RESPONSE</div>
        <div class="chips">
          <span class="chip vv">vervar</span>
          <span class="chip v">var</span>
          <span class="chip tv">turvar</span>
          <span class="chip th">tahun</span>
          <span class="chip tt">turtahun</span>
          <span class="chip dc">datacontent</span>
        </div>
        <p class="muted">Setiap nilai tabel dibentuk dari kombinasi dimensi di atas.</p>
      </section>

      <section class="panel">
        <div class="panel-label">KUNCI KOMPOSIT</div>
        <div class="formula">
          <span class="chip vv">7315</span>
          <span>+</span>
          <span class="chip v">31</span>
          <span>+</span>
          <span class="chip tv">0</span>
          <span>+</span>
          <span class="chip th">99</span>
          <span>+</span>
          <span class="chip tt">0</span>
          <span>=</span>
          <strong>7315310990</strong>
        </div>
        <p class="muted">Contoh: <strong>Pinrang × Jumlah Penduduk × 1999</strong></p>
      </section>
    </div>

    <section class="panel table-panel">
      <div class="panel-label">BENTUK TABEL HASIL RENDER</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="left h-vv">Wilayah</th>
              <th class="h-th">1999</th>
              <th class="h-th">2000</th>
              <th class="h-th">2001</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="left">Pinrang</td>
              <td class="highlight">308.669</td>
              <td>311.595</td>
              <td>312.473</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mapping-notes">
        <div><span class="chip vv">vervar</span> → baris</div>
        <div><span class="chip th">tahun</span> → kolom</div>
        <div><span class="chip dc">datacontent</span> → nilai sel</div>
      </div>

      <div class="callout">
        <strong>Sel yang di-highlight:</strong> Pinrang × Jumlah Penduduk × 1999 = <code>308669</code><br>
        diambil dari <code>datacontent[7315310990]</code>
      </div>
    </section>
  </div>
</template>

<style scoped>
.mapping-wrap { padding: 1rem 0; }
.mapping-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; margin-bottom:16px; }
.panel { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 16px; padding: 16px; }
.panel-label { font-size: 11px; font-weight: 700; color: var(--vp-c-text-2); letter-spacing: .08em; margin-bottom: 12px; }
.chips { display:flex; flex-wrap:wrap; gap:8px; }
.chip { display:inline-block; padding:4px 8px; border-radius:999px; font-family: var(--vp-font-family-mono); font-size:12px; font-weight:600; }
.vv { background:#E6F1FB; color:#0C447C; }
.v { background:#FBEAF0; color:#72243E; }
.tv { background:#FAEEDA; color:#633806; }
.th { background:#E1F5EE; color:#085041; }
.tt { background:#EEEDFE; color:#3C3489; }
.dc { background:#EEECE6; color:#4B4944; }
.muted { margin-top:12px; color: var(--vp-c-text-2); font-size:13px; }
.formula { display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:14px; color: var(--vp-c-text-1); }
.table-wrap { overflow:auto; border:1px solid var(--vp-c-divider); border-radius: 14px; }
table { width:100%; border-collapse:collapse; font-size:13px; }
th, td { border:1px solid var(--vp-c-divider); padding:10px 12px; text-align:right; white-space:nowrap; }
th.left, td.left { text-align:left; }
.h-vv { background:#E6F1FB; color:#0C447C; }
.h-th { background:#E1F5EE; color:#085041; }
.highlight { background:#FFF4CC; font-weight:700; color:#7A5300; }
.mapping-notes { display:flex; flex-wrap:wrap; gap:12px; margin-top:12px; color: var(--vp-c-text-2); font-size:13px; }
.callout { margin-top:12px; padding:12px; border-radius:12px; background: var(--vp-c-default-soft); color: var(--vp-c-text-1); font-size:13px; }
@media (max-width: 700px) { .mapping-grid { grid-template-columns:1fr; } }
</style>
