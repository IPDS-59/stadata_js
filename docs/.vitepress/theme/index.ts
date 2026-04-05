import DefaultTheme from 'vitepress/theme'
import BpsPlayground from './components/BpsPlaygroundWrapper.vue'
import DynamicTableJsonMapping from './components/DynamicTableJsonMapping.vue'
import DynamicTableFullMappingId from './components/DynamicTableFullMappingId.vue'
import DynamicTableFullMappingEn from './components/DynamicTableFullMappingEn.vue'
import DynamicTableStructureMappingId from './components/DynamicTableStructureMappingId.vue'
import DynamicTableStructureMappingEn from './components/DynamicTableStructureMappingEn.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BpsPlayground', BpsPlayground)
    app.component('DynamicTableJsonMapping', DynamicTableJsonMapping)
    app.component('DynamicTableFullMappingId', DynamicTableFullMappingId)
    app.component('DynamicTableFullMappingEn', DynamicTableFullMappingEn)
    app.component('DynamicTableStructureMappingId', DynamicTableStructureMappingId)
    app.component('DynamicTableStructureMappingEn', DynamicTableStructureMappingEn)
  },
} satisfies Theme
