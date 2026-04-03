<template>
  <div v-if="mounted">
    <BpsPlaygroundInner />
  </div>
  <div v-else class="playground-loading">
    <div class="skeleton-header" />
    <div class="skeleton-body" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'

const BpsPlaygroundInner = defineAsyncComponent(() => import('./BpsPlayground.vue'))
const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>

<style scoped>
.playground-loading {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin: 1.5rem 0;
}
.skeleton-header, .skeleton-body {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
.skeleton-header { height: 40px; margin-bottom: 10px; }
.skeleton-body { height: 120px; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
