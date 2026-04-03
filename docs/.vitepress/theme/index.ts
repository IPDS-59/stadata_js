import DefaultTheme from 'vitepress/theme'
import BpsPlayground from './components/BpsPlaygroundWrapper.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BpsPlayground', BpsPlayground)
  },
} satisfies Theme
