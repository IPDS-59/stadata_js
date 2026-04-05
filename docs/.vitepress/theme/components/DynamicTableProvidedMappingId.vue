<template>
<div class="provided-mapping">
<div class="page-title">BPS API — Mapping respons JSON → tabel</div>
<div class="page-sub">Cara membaca key <code style="font-family:'JetBrains Mono',monospace;color:var(--teal-tx);font-size:12px;">datacontent</code> dan merender tabel dengan header bertingkat</div>

<!-- KEY ANATOMY -->
<div class="section">
  <div class="section-label">Anatomi Kunci</div>
  <div class="key-row">
    <span class="pill pill-lg pill-blue">vervar</span>
    <span class="key-op">+</span>
    <span class="pill pill-lg pill-pink">var</span>
    <span class="key-op">+</span>
    <span class="pill pill-lg pill-amber">turvar</span>
    <span class="key-op">+</span>
    <span class="pill pill-lg pill-teal">tahun</span>
    <span class="key-op">+</span>
    <span class="pill pill-lg pill-purple">turtahun</span>
    <span class="key-op" style="margin:0 8px;">→</span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--sub);">gabungan field <code style="color:var(--text)">val</code></span>
  </div>

  <div class="key-row">
    <span style="font-size:13px;color:var(--sub);margin-right:8px;">Contoh (Pinrang / Kec A / 1999 / Feb):</span>
    <span class="pill pill-blue">7315</span>
    <span class="key-op">+</span>
    <span class="pill pill-pink">31</span>
    <span class="key-op">+</span>
    <span class="pill pill-amber">1</span>
    <span class="key-op">+</span>
    <span class="pill pill-teal">99</span>
    <span class="key-op">+</span>
    <span class="pill pill-purple">2</span>
    <span class="key-eq">=</span>
    <span class="key-result">"7315311992"</span>
  </div>
  <div class="key-note">⚠ Panjang key bersifat variabel — selalu bangun lewat lookup, jangan split fixed-width.</div>
</div>

<hr/>

<!-- TWO PANELS -->
<div class="two-panel">

  <!-- JSON panel -->
  <div class="panel">
    <div class="panel-title">Respons JSON (Kasus D — semua dimensi)</div>

    <div class="json-line"><span class="json-key-blue">"vervar"</span><span class="json-punct">: [ {</span><span class="json-punct">"val":</span> <span class="pill pill-blue">7315</span><span class="json-punct">,</span> <span class="json-punct">"label":</span> <span class="json-str">"Pinrang"</span> <span class="json-punct">} ]</span></div>

    <div class="json-line"><span class="json-key-pink">"var"</span><span class="json-punct">: [ {</span> <span class="json-punct">"val":</span> <span class="pill pill-pink">31</span><span class="json-punct">,</span> <span class="json-punct">"label":</span> <span class="json-str">"Jumlah Penduduk"</span><span class="json-punct">,</span> <span class="json-punct">"unit":</span> <span class="json-str">"Jiwa"</span> <span class="json-punct">} ]</span></div>

    <div class="json-line" style="margin-top:8px;"><span class="json-key-amber">"turvar"</span><span class="json-punct">: [</span></div>
    <div class="json-line json-indent"><span class="json-punct">{ "val":</span> <span class="pill pill-amber">1</span><span class="json-punct">, "label":</span> <span class="json-str">"Kec A"</span> <span class="json-punct">},</span></div>
    <div class="json-line json-indent"><span class="json-punct">{ "val":</span> <span class="pill pill-amber">2</span><span class="json-punct">, "label":</span> <span class="json-str">"Kec B"</span> <span class="json-punct">}</span></div>
    <div class="json-line"><span class="json-punct">]</span></div>

    <div class="json-line" style="margin-top:8px;"><span class="json-key-teal">"tahun"</span><span class="json-punct">: [</span></div>
    <div class="json-line json-indent"><span class="json-punct">{ "val":</span> <span class="pill pill-teal">99</span><span class="json-punct">, "label":</span> <span class="json-str">"1999"</span> <span class="json-punct">},</span></div>
    <div class="json-line json-indent"><span class="json-punct">{ "val":</span> <span class="pill pill-teal">100</span><span class="json-punct">, "label":</span> <span class="json-str">"2000"</span> <span class="json-punct">}</span></div>
    <div class="json-line"><span class="json-punct">]</span></div>

    <div class="json-line" style="margin-top:8px;"><span class="json-key-purple">"turtahun"</span><span class="json-punct">: [</span></div>
    <div class="json-line json-indent"><span class="json-punct">{ "val":</span> <span class="pill pill-purple">2</span><span class="json-punct">, "label":</span> <span class="json-str">"Februari"</span> <span class="json-punct">},</span></div>
    <div class="json-line json-indent"><span class="json-punct">{ "val":</span> <span class="pill pill-purple">3</span><span class="json-punct">, "label":</span> <span class="json-str">"Maret"</span> <span class="json-punct">}</span></div>
    <div class="json-line"><span class="json-punct">]</span></div>

    <div class="json-line" style="margin-top:12px;"><span class="json-key-gray">"datacontent"</span><span class="json-punct">: {</span></div>

    <div class="json-indent" style="margin-top:4px;">
      <div class="dc-entry">
        <span class="dc-quote">"</span><span class="pill pill-blue">7315</span><span class="pill pill-pink">31</span><span class="pill pill-amber">1</span><span class="pill pill-teal">99</span><span class="pill pill-purple">2</span><span class="dc-quote">"</span>
        <span class="dc-colon">:</span><span class="dc-val">101,234</span><span class="json-punct">,</span>
      </div>
      <div class="dc-entry">
        <span class="dc-quote">"</span><span class="pill pill-blue">7315</span><span class="pill pill-pink">31</span><span class="pill pill-amber">2</span><span class="pill pill-teal">99</span><span class="pill pill-purple">2</span><span class="dc-quote">"</span>
        <span class="dc-colon">:</span><span class="dc-val">98,441</span><span class="json-punct">,</span>
      </div>
      <div class="dc-entry">
        <span class="dc-quote">"</span><span class="pill pill-blue">7315</span><span class="pill pill-pink">31</span><span class="pill pill-amber">1</span><span class="pill pill-teal">99</span><span class="pill pill-purple">3</span><span class="dc-quote">"</span>
        <span class="dc-colon">:</span><span class="dc-val">102,887</span><span class="json-punct">,</span>
      </div>
      <div class="dc-entry">
        <span class="dc-quote">"</span><span class="pill pill-blue">7315</span><span class="pill pill-pink">31</span><span class="pill pill-amber">2</span><span class="pill pill-teal">99</span><span class="pill pill-purple">3</span><span class="dc-quote">"</span>
        <span class="dc-colon">:</span><span class="dc-val">99,103</span><span class="json-punct">,  ... 8 keys total</span>
      </div>
    </div>
    <div class="json-line"><span class="json-punct">}</span></div>
  </div>

  <!-- Rules panel -->
  <div class="panel">
    <div class="panel-title">Aturan Baris Header</div>

    <div class="rule-row">
      <div class="rule-num">Baris 1</div>
      <div class="rule-body">
        <span class="pill pill-teal">tahun</span>&nbsp; <span style="color:var(--sub);font-size:12px;">— selalu ditampilkan</span>
        <div class="rule-desc">colspan = count(turtahun) × count(turvar)</div>
      </div>
    </div>
    <div class="rule-row">
      <div class="rule-num">Baris 2</div>
      <div class="rule-body">
        <span class="pill pill-purple">turtahun</span>&nbsp; <span style="color:var(--sub);font-size:12px;">— lewati jika hanya 1 nilai</span>
        <div class="rule-desc">colspan = count(turvar)</div>
      </div>
    </div>
    <div class="rule-row">
      <div class="rule-num">Baris 3</div>
      <div class="rule-body">
        <span class="pill pill-amber">turvar</span>&nbsp; <span style="color:var(--sub);font-size:12px;">— lewati jika hanya 1 nilai</span>
        <div class="rule-desc">colspan = 1 &nbsp;(kolom leaf)</div>
      </div>
    </div>
    <div class="rule-row">
      <div class="rule-num">Wilayah</div>
      <div class="rule-body">
        <span class="pill pill-blue">rowspan</span>
        <div class="rule-desc">= total baris header yang dirender (1, 2, atau 3)</div>
      </div>
    </div>

    <div style="margin-top:24px;">
      <div class="panel-title">Ringkasan Kasus</div>
      <div class="case-table">
        <div class="case-table-row">
          <span class="case-id">A</span>
          <span class="case-cond">satu turvar + satu turtahun</span>
          <span class="case-result">1 baris header</span>
        </div>
        <div class="case-table-row">
          <span class="case-id">B</span>
          <span class="case-cond">banyak turvar, satu turtahun</span>
          <span class="case-result">2 baris: tahun → turvar</span>
        </div>
        <div class="case-table-row">
          <span class="case-id">C</span>
          <span class="case-cond">satu turvar, banyak turtahun</span>
          <span class="case-result">2 baris: tahun → turtahun</span>
        </div>
        <div class="case-table-row">
          <span class="case-id">D</span>
          <span class="case-cond">banyak turvar + banyak turtahun</span>
          <span class="case-result">3 baris: tahun → turtahun → turvar</span>
        </div>
      </div>
    </div>
    <div style="margin-top:16px;font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;line-height:1.8;">
      Loop: vervar × var × tahun × turtahun × turvar<br/>
      → bangun key → lookup datacontent → nilai sel
    </div>
  </div>
</div>

<!-- CASE A -->
<div class="case-block">
  <div class="case-heading">
    <span class="case-badge">CASE A</span>
    <span class="case-desc">Single turvar + single turtahun — 1 baris header</span>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th class="h-wilayah left">Wilayah</th>
          <th class="h-tahun">1999</th>
          <th class="h-tahun">2000</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="left">Pinrang</td><td>308,669</td><td>311,595</td></tr>
      </tbody>
    </table>
  </div>
  <div class="key-annot">
    <span class="arrow">↑ key sel 1999:</span>
    <span class="pill pill-blue">7315</span>
    <span class="pill pill-pink">31</span>
    <span class="pill pill-amber">0</span>
    <span class="pill pill-teal">99</span>
    <span class="pill pill-purple">0</span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--sub);">= "7315310990"</span>
  </div>
</div>

<!-- CASE B -->
<div class="case-block">
  <div class="case-heading">
    <span class="case-badge">CASE B</span>
    <span class="case-desc">Banyak turvar, satu turtahun — 2 baris header (tahun → turvar)</span>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th class="h-wilayah left" rowspan="2">Wilayah</th>
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
  <div class="key-annot">
    <span class="arrow">↑ colspan tahun =</span>
    <code style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber-tx);">count(turvar)</code>
    <span style="color:var(--muted)">=</span>
    <span style="color:var(--text);font-family:'JetBrains Mono',monospace;font-size:12px;">2</span>
  </div>
</div>

<!-- CASE C -->
<div class="case-block">
  <div class="case-heading">
    <span class="case-badge">CASE C</span>
    <span class="case-desc">Satu turvar, banyak turtahun — 2 baris header (tahun → turtahun)</span>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th class="h-wilayah left" rowspan="2">Wilayah</th>
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
  <div class="key-annot">
    <span class="arrow">↑ colspan tahun =</span>
    <code style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--purple-tx);">count(turtahun)</code>
    <span style="color:var(--muted)">=</span>
    <span style="color:var(--text);font-family:'JetBrains Mono',monospace;font-size:12px;">2</span>
  </div>
</div>

<!-- CASE D -->
<div class="case-block">
  <div class="case-heading">
    <span class="case-badge">CASE D</span>
    <span class="case-desc">Banyak turvar + banyak turtahun — 3 baris header (tahun → turtahun → turvar)</span>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th class="h-wilayah left" rowspan="3">Wilayah</th>
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
          <th class="h-turvar">Kec A</th><th class="h-turvar">Kec B</th>
          <th class="h-turvar">Kec A</th><th class="h-turvar">Kec B</th>
          <th class="h-turvar">Kec A</th><th class="h-turvar">Kec B</th>
          <th class="h-turvar">Kec A</th><th class="h-turvar">Kec B</th>
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
  <div class="key-annot" style="flex-direction:column;align-items:flex-start;gap:6px;">
    <div style="display:flex;align-items:center;gap:6px;">
      <span class="arrow">↑ colspan tahun =</span>
      <code style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--purple-tx);">count(turtahun)</code>
      <span style="color:var(--muted)">×</span>
      <code style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber-tx);">count(turvar)</code>
      <span style="color:var(--muted)">=</span>
      <span style="color:var(--text);font-family:'JetBrains Mono',monospace;font-size:12px;">2 × 2 = 4</span>
    </div>
    <div style="display:flex;align-items:center;gap:6px;">
      <span class="arrow">↑ colspan turtahun =</span>
      <code style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber-tx);">count(turvar)</code>
      <span style="color:var(--muted)">=</span>
      <span style="color:var(--text);font-family:'JetBrains Mono',monospace;font-size:12px;">2</span>
    </div>
    <div style="display:flex;align-items:center;gap:6px;">
      <span class="arrow">↑ turvar colspan = 1</span>
      <span style="color:var(--muted);font-size:12px;">(leaf)</span>
    </div>
  </div>
</div>

<!-- LEGEND -->
<div class="legend">
  <div class="legend-item"><div class="legend-dot" style="background:var(--blue-bg);border-color:var(--blue-bd)"></div>vervar</div>
  <div class="legend-item"><div class="legend-dot" style="background:var(--pink-bg);border-color:var(--pink-bd)"></div>var</div>
  <div class="legend-item"><div class="legend-dot" style="background:var(--amber-bg);border-color:var(--amber-bd)"></div>turvar</div>
  <div class="legend-item"><div class="legend-dot" style="background:var(--teal-bg);border-color:var(--teal-bd)"></div>tahun</div>
  <div class="legend-item"><div class="legend-dot" style="background:var(--purple-bg);border-color:var(--purple-bd)"></div>turtahun</div>
</div>
</div>
</template>

<style scoped>

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .provided-mapping {
    --bg:       #faf8f2;
    --bg2:      #ffffff;
    --bg3:      #f3efe6;
    --border:   #ddd8ca;
    --muted:    #7b766b;
    --sub:      #5e594f;
    --text:     #292723;
    --bright:   #111111;

    --blue-bg:  #e6f1fb; --blue-bd:  #7bb3e8; --blue-tx:  #0c3d6e;
    --pink-bg:  #f7e3ea; --pink-bd:  #d58aa6; --pink-tx:  #7d2847;
    --amber-bg: #faedd9; --amber-bd: #d89a39; --amber-tx: #6c4306;
    --teal-bg:  #e3f5ee; --teal-bd:  #6bbf9f; --teal-tx:  #0d5c49;
    --purple-bg:#ece9ff; --purple-bd:#9f96e8; --purple-tx:#4539a6;
    --gray-bg:  #efede7; --gray-bd:  #c7c1b5; --gray-tx:  #5f5b53;

    font-family: 'Sora', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text);
    background: transparent;
  }

  :global(html.dark) .provided-mapping {
    --bg:       #0f0f0e;
    --bg2:      #161614;
    --bg3:      #1d1d1a;
    --border:   #2a2a27;
    --muted:    #4a4a46;
    --sub:      #7a7a74;
    --text:     #d8d6cc;
    --bright:   #f0ede4;

    --blue-bg:  #0c3d6e; --blue-bd:  #2d7abf; --blue-tx:  #93c5f5;
    --pink-bg:  #5c1a32; --pink-bd:  #c45a82; --pink-tx:  #f0a8c4;
    --amber-bg: #4a2800; --amber-bd: #c47f1a; --amber-tx: #f5b84a;
    --teal-bg:  #053a2e; --teal-bd:  #1e9070; --teal-tx:  #72dbb8;
    --purple-bg:#2a1f6e; --purple-bd:#7a6fd4; --purple-tx:#c4bef5;
    --gray-bg:  #222220; --gray-bd:  #555550; --gray-tx:  #aaa89e;
  }

  /* HEADER */
  .page-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--bright);
    margin-bottom: 4px;
    letter-spacing: -0.3px;
  }
  .page-sub {
    font-size: 13px;
    color: var(--sub);
    margin-bottom: 40px;
  }

  /* SECTION */
  .section { margin-bottom: 48px; }
  .section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  hr { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

  /* PILLS */
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid;
    line-height: 1.8;
  }
  .pill-blue   { background: var(--blue-bg);   border-color: var(--blue-bd);   color: var(--blue-tx); }
  .pill-pink   { background: var(--pink-bg);   border-color: var(--pink-bd);   color: var(--pink-tx); }
  .pill-amber  { background: var(--amber-bg);  border-color: var(--amber-bd);  color: var(--amber-tx); }
  .pill-teal   { background: var(--teal-bg);   border-color: var(--teal-bd);   color: var(--teal-tx); }
  .pill-purple { background: var(--purple-bg); border-color: var(--purple-bd); color: var(--purple-tx); }
  .pill-lg {
    padding: 6px 16px;
    font-size: 13px;
    border-radius: 7px;
  }

  /* KEY ANATOMY */
  .key-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .key-op { color: var(--muted); font-size: 13px; }
  .key-eq { color: var(--sub); font-size: 13px; margin: 0 4px; }
  .key-result {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--bright);
    background: var(--bg3);
    border: 1px solid var(--border);
    padding: 4px 10px;
    border-radius: 5px;
  }
  .key-note {
    font-size: 12px;
    color: var(--muted);
    background: var(--bg2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--amber-bd);
    padding: 8px 14px;
    border-radius: 4px;
    margin-top: 10px;
  }

  /* TWO PANELS */
  .two-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 48px;
  }
  @media (max-width: 900px) { .two-panel { grid-template-columns: 1fr; } }

  .panel {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
  }
  .panel-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  /* JSON */
  .json-line {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    line-height: 2;
  }
  .json-key-blue   { color: var(--blue-tx);   font-weight: 500; }
  .json-key-pink   { color: var(--pink-tx);   font-weight: 500; }
  .json-key-amber  { color: var(--amber-tx);  font-weight: 500; }
  .json-key-teal   { color: var(--teal-tx);   font-weight: 500; }
  .json-key-purple { color: var(--purple-tx); font-weight: 500; }
  .json-key-gray   { color: var(--bright);    font-weight: 500; }
  .json-punct { color: var(--muted); }
  .json-str   { color: #7ec98a; }
  .json-num   { color: #e09458; }
  .json-indent { padding-left: 16px; }

  .dc-entry {
    display: flex;
    align-items: center;
    gap: 3px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    line-height: 1;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .dc-quote { color: var(--muted); }
  .dc-colon { color: var(--muted); margin: 0 6px; }
  .dc-val   { color: var(--teal-tx); }

  /* RULES */
  .rule-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .rule-row:last-child { border-bottom: none; }
  .rule-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    min-width: 42px;
    padding-top: 2px;
  }
  .rule-body { flex: 1; }
  .rule-desc {
    font-size: 12px;
    color: var(--sub);
    margin-top: 4px;
    font-family: 'JetBrains Mono', monospace;
  }

  .case-table { margin-bottom: 12px; }
  .case-table-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 4px;
    font-size: 12px;
  }
  .case-table-row:nth-child(odd)  { background: var(--bg3); }
  .case-table-row:nth-child(even) { background: var(--bg2); }
  .case-id {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: var(--amber-tx);
    min-width: 16px;
  }
  .case-cond { color: var(--sub); flex: 1; }
  .case-result {
    color: var(--teal-tx);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
  }

  /* TABLE DISPLAY */
  .case-block { margin-bottom: 48px; }
  .case-heading {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;
  }
  .case-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--amber-bg);
    background: var(--amber-tx);
    padding: 2px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
  .case-desc { font-size: 13px; color: var(--sub); }

  .tbl-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid var(--border); }
  table { border-collapse: collapse; width: 100%; font-size: 12px; font-family: 'JetBrains Mono', monospace; }
  th, td { padding: 9px 14px; border: 1px solid var(--border); white-space: nowrap; text-align: center; }
  td.left, th.left { text-align: left; }

  th.h-wilayah { background: var(--blue-bg);   color: var(--blue-tx);   border-color: var(--blue-bd);   font-weight: 500; }
  th.h-tahun   { background: var(--teal-bg);   color: var(--teal-tx);   border-color: var(--teal-bd);   font-weight: 500; }
  th.h-turtahun{ background: var(--purple-bg); color: var(--purple-tx); border-color: var(--purple-bd); font-weight: 500; }
  th.h-turvar  { background: var(--amber-bg);  color: var(--amber-tx);  border-color: var(--amber-bd);  font-weight: 500; }
  td { background: var(--bg2); color: var(--text); }
  tr:hover td  { background: var(--bg3); }

  .key-annot {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 12px;
    font-size: 12px;
    color: var(--sub);
    flex-wrap: wrap;
  }
  .key-annot .arrow { color: var(--muted); }

  /* LEGEND */
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--sub); }
  .legend-dot  { width: 12px; height: 12px; border-radius: 3px; border: 1px solid; }

</style>
