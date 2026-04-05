import DefaultTheme from 'vitepress/theme'
import BpsPlayground from './components/BpsPlaygroundWrapper.vue'
import DynamicTableJsonMapping from './components/DynamicTableJsonMapping.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BpsPlayground', BpsPlayground)
    app.component('DynamicTableJsonMapping', DynamicTableJsonMapping)
  },
} satisfies Theme
