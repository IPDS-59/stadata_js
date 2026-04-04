<template>
  <div class="bps-playground">
    <div class="playground-header">
      <span class="method-badge get">GET</span>
      <div class="url-bar">
        <span class="base-url">https://webapi.bps.go.id/v1/api</span>
        <span class="endpoint-path">{{ builtPath }}</span>
      </div>
    </div>

    <!-- API Key -->
    <div class="playground-section">
      <div class="param-row">
        <div class="param-info">
          <code class="param-name">key</code>
          <span class="param-required">required</span>
        </div>
        <input v-model="apiKey" placeholder="Masukkan BPS API key kamu" class="param-input" type="password" />
        <p class="param-desc">API key dari <a href="https://webapi.bps.go.id" target="_blank">webapi.bps.go.id</a></p>
      </div>
    </div>

    <!-- Endpoint Selector -->
    <div class="playground-section">
      <h4>Pilih Endpoint</h4>
      <div class="endpoint-grid">
        <button
          v-for="ep in endpoints"
          :key="ep.id"
          @click="selectEndpoint(ep)"
          class="endpoint-btn"
          :class="{ active: selectedEndpoint?.id === ep.id }"
        >
          <span class="ep-label">{{ ep.label }}</span>
          <code class="ep-path">{{ ep.path }}</code>
        </button>
      </div>
    </div>

    <!-- Dynamic Params -->
    <div v-if="selectedEndpoint?.params?.length" class="playground-section">
      <h4>Parameter</h4>
      <div class="params-grid">
        <div v-for="param in editableParams" :key="param.name" class="param-row">
          <div class="param-info">
            <code class="param-name">{{ param.name }}</code>
            <span class="param-type">{{ param.type }}</span>
            <span v-if="param.required" class="param-required">required</span>
            <span v-else class="param-optional">optional</span>
          </div>
          <input v-model="param.value" :placeholder="param.placeholder || ''" class="param-input" />
          <p v-if="param.description" class="param-desc">{{ param.description }}</p>
        </div>
      </div>
    </div>

    <!-- URL Preview -->
    <div class="playground-section">
      <h4>Request URL</h4>
      <code class="request-url">{{ fullUrl }}</code>
    </div>

    <!-- Actions -->
    <div class="playground-actions">
      <button @click="send" :disabled="loading || !apiKey" class="btn-send">
        <span v-if="loading">⏳ Loading...</span>
        <span v-else>▶ Send Request</span>
      </button>
      <button v-if="response" @click="clear" class="btn-clear">Clear</button>
      <span v-if="!apiKey" class="hint">⚠ Masukkan API key terlebih dahulu</span>
    </div>

    <!-- Response -->
    <div v-if="response || error" class="playground-response">
      <div class="response-header">
        <span class="response-label">Response</span>
        <span v-if="statusCode" class="status-badge" :class="statusCode >= 200 && statusCode < 300 ? 'status-ok' : 'status-error'">
          {{ statusCode }}
        </span>
        <span v-if="responseTime" class="response-time">{{ responseTime }}ms</span>
        <button @click="copy" class="btn-copy">{{ copied ? '✓ Copied' : 'Copy' }}</button>
      </div>
      <pre v-if="response" class="response-body"><code>{{ formattedResponse }}</code></pre>
      <div v-if="error" class="response-error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Param {
  name: string
  type: string
  required?: boolean
  placeholder?: string
  description?: string
  default?: string
  value?: string
}

interface Endpoint {
  id: string
  label: string
  path: string
  params?: Param[]
}

const BPS_BASE = 'https://webapi.bps.go.id/v1/api'

const endpoints: Endpoint[] = [
  {
    id: 'list-domain',
    label: 'List Domains',
    path: '/list/model/domain/type/all',
    params: [
      { name: 'page', type: 'number', placeholder: '1', default: '1', description: 'Page number' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10', description: 'Items per page' },
    ],
  },
  {
    id: 'list-publication',
    label: 'List Publications',
    path: '/list/model/publication/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true, description: 'BPS domain code' },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'keyword', type: 'string', placeholder: 'inflasi', description: 'Search keyword' },
    ],
  },
  {
    id: 'view-publication',
    label: 'View Publication',
    path: '/view/model/publication/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'id', type: 'string', placeholder: 'pub-id', required: true, description: 'Publication ID' },
    ],
  },
  {
    id: 'list-pressrelease',
    label: 'List Press Releases',
    path: '/list/model/pressrelease/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'year', type: 'number', placeholder: '2023', description: 'Filter by year' },
      { name: 'bulan', type: 'number', placeholder: '1', description: 'Filter by month (1-12)' },
    ],
  },
  {
    id: 'view-pressrelease',
    label: 'View Press Release',
    path: '/view/model/pressrelease/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'id', type: 'string', placeholder: 'release-id', required: true },
    ],
  },
  {
    id: 'list-statictable',
    label: 'List Static Tables',
    path: '/list/model/statictable/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'keyword', type: 'string', placeholder: 'kemiskinan', description: 'Search keyword' },
    ],
  },
  {
    id: 'view-statictable',
    label: 'View Static Table',
    path: '/view/model/statictable/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'id', type: 'string', placeholder: 'table-id', required: true },
    ],
  },
  {
    id: 'list-dynamictable',
    label: 'List Dynamic Tables',
    path: '/list/model/turuntabel/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'keyword', type: 'string', placeholder: 'PDRB', description: 'Search keyword' },
    ],
  },
  {
    id: 'list-infographic',
    label: 'List Infographics',
    path: '/list/model/infographic/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'keyword', type: 'string', placeholder: 'inflasi', description: 'Search keyword' },
    ],
  },
  {
    id: 'list-news',
    label: 'List News',
    path: '/list/model/news/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'keyword', type: 'string', placeholder: 'sensus', description: 'Search keyword' },
    ],
  },
  {
    id: 'list-newscategory',
    label: 'List News Categories',
    path: '/list/model/newscategory/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
    ],
  },
  {
    id: 'list-variable',
    label: 'List Variables',
    path: '/list/model/var/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'subject', type: 'number', placeholder: '1', description: 'Filter by subject ID' },
    ],
  },
  {
    id: 'list-vervar',
    label: 'List Vertical Variables',
    path: '/list/model/vervar/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
    ],
  },
  {
    id: 'list-turvar',
    label: 'List Derived Variables',
    path: '/list/model/turvar/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
    ],
  },
  {
    id: 'list-subject',
    label: 'List Subjects',
    path: '/list/model/subject/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
    ],
  },
  {
    id: 'list-subjectcategory',
    label: 'List Subject Categories',
    path: '/list/model/subjectcategory/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
    ],
  },
  {
    id: 'list-unit',
    label: 'List Units',
    path: '/list/model/unit/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
    ],
  },
  {
    id: 'list-period',
    label: 'List Periods',
    path: '/list/model/period/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'var', type: 'number', placeholder: '100', description: 'Variable ID' },
    ],
  },
  {
    id: 'list-turperiod',
    label: 'List Derived Periods',
    path: '/list/model/turperiod/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'turvar', type: 'number', placeholder: '100', description: 'Derived variable ID' },
    ],
  },
  {
    id: 'list-strategicindicator',
    label: 'List Strategic Indicators',
    path: '/list/model/strategicindicator/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
    ],
  },
  {
    id: 'list-kbli2020',
    label: 'Statistic Classifications (KBLI 2020)',
    path: '/list/model/kbli2020/lang/ind',
    params: [
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
      { name: 'keyword', type: 'string', placeholder: 'pertanian', description: 'Search keyword' },
    ],
  },
  {
    id: 'list-census',
    label: 'List Census',
    path: '/list/model/census/lang/ind',
    params: [
      { name: 'domain', type: 'string', placeholder: '7200', default: '7200', required: true },
      { name: 'page', type: 'number', placeholder: '1', default: '1' },
      { name: 'perpage', type: 'number', placeholder: '10', default: '10' },
    ],
  },
]

const apiKey = ref('')
const selectedEndpoint = ref<Endpoint | null>(endpoints[0])
const editableParams = ref<(Param & { value: string })[]>([])
const loading = ref(false)
const response = ref<string | null>(null)
const error = ref<string | null>(null)
const statusCode = ref<number | null>(null)
const responseTime = ref<number | null>(null)
const copied = ref(false)

function selectEndpoint(ep: Endpoint) {
  selectedEndpoint.value = ep
  response.value = null
  error.value = null
  editableParams.value = (ep.params || []).map(p => ({ ...p, value: p.default || '' }))
}

// Init with first endpoint
selectEndpoint(endpoints[0])

const builtPath = computed(() => selectedEndpoint.value?.path || '')

const fullUrl = computed(() => {
  if (!selectedEndpoint.value) return ''
  const params = editableParams.value
    .filter(p => p.value)
    .map(p => `${p.name}=${encodeURIComponent(p.value)}`)
  const keyParam = `key=${apiKey.value || '<your-api-key>'}`
  const allParams = [keyParam, ...params].join('&')
  return `${BPS_BASE}${selectedEndpoint.value.path}?${allParams}`
})

const formattedResponse = computed(() => {
  if (!response.value) return ''
  try { return JSON.stringify(JSON.parse(response.value), null, 2) }
  catch { return response.value }
})

async function send() {
  if (!apiKey.value || !selectedEndpoint.value) return
  loading.value = true
  error.value = null
  response.value = null
  statusCode.value = null
  const start = Date.now()
  try {
    const res = await fetch(fullUrl.value)
    responseTime.value = Date.now() - start
    statusCode.value = res.status
    response.value = await res.text()
  } catch (e) {
    responseTime.value = Date.now() - start
    error.value = `Network error: ${(e as Error).message}`
  } finally {
    loading.value = false
  }
}

function clear() {
  response.value = null
  error.value = null
  statusCode.value = null
  responseTime.value = null
}

async function copy() {
  if (!response.value) return
  await navigator.clipboard.writeText(formattedResponse.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style scoped>
.bps-playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
  font-size: 14px;
}

.playground-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.method-badge.get {
  background: #d1fae5; color: #065f46;
  font-weight: 700; font-size: 12px;
  padding: 3px 8px; border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}
.dark .method-badge.get { background: #064e3b; color: #6ee7b7; }

.url-bar {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  overflow-x: auto;
  white-space: nowrap;
}
.base-url { color: var(--vp-c-text-3); }
.endpoint-path { color: var(--vp-c-brand-1); font-weight: 500; }

.playground-section {
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.playground-section h4 {
  margin: 0 0 10px 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.endpoint-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 6px;
}

.endpoint-btn {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.endpoint-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.endpoint-btn.active {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
}

.ep-label { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); }
.ep-path { font-size: 10px; color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); }

.params-grid { display: flex; flex-direction: column; gap: 10px; }

.param-row { display: grid; grid-template-columns: 180px 1fr; gap: 8px; align-items: center; }

.param-info { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

.param-name { font-size: 13px; font-weight: 600; }
.param-type { font-size: 11px; color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); }
.param-required { font-size: 10px; padding: 1px 5px; border-radius: 3px; background: #fee2e2; color: #991b1b; font-weight: 600; }
.dark .param-required { background: #450a0a; color: #fca5a5; }
.param-optional { font-size: 10px; color: var(--vp-c-text-3); }
.param-desc { grid-column: 1 / -1; margin: 0; font-size: 12px; color: var(--vp-c-text-2); }

.param-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
}
.param-input:focus { outline: none; border-color: var(--vp-c-brand-1); }

.request-url {
  display: block;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 5px;
  font-size: 11px;
  word-break: break-all;
  color: var(--vp-c-brand-1);
  line-height: 1.6;
}

.playground-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.btn-send {
  padding: 8px 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}
.btn-send:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-send:hover:not(:disabled) { opacity: 0.85; }

.btn-clear, .btn-copy {
  padding: 8px 14px;
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
}
.btn-clear:hover, .btn-copy:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

.hint { font-size: 12px; color: var(--vp-c-warning-1); }

.playground-response { padding: 12px 16px; }

.response-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.response-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--vp-c-text-2); font-weight: 600; }
.status-badge { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-family: var(--vp-font-family-mono); }
.status-ok { background: #d1fae5; color: #065f46; }
.status-error { background: #fee2e2; color: #991b1b; }
.dark .status-ok { background: #064e3b; color: #6ee7b7; }
.response-time { font-size: 12px; color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); margin-left: auto; }

.response-body {
  margin: 0;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  overflow: auto;
  font-size: 12px;
  max-height: 400px;
  line-height: 1.6;
}

.response-error {
  padding: 10px 14px;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 6px;
  font-size: 13px;
}
.dark .response-error { background: #450a0a; color: #fca5a5; }
</style>
