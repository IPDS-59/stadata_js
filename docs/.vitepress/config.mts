import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Stadata JS',
  description: 'TypeScript/JavaScript SDK for BPS (Badan Pusat Statistik) WebAPI — access Indonesia\'s official statistical data with ease.',
  base: '/stadata_js/',

  head: [
    ['link', { rel: 'icon', href: '/stadata_js/logo.svg', type: 'image/svg+xml' }],
  ],

  locales: {
    root: {
      label: 'Indonesia',
      lang: 'id',
      themeConfig: {
        nav: [
          { text: 'Panduan', link: '/guide/memulai' },
          { text: 'API Reference', link: '/api/domains' },
          { text: '▶ Playground', link: '/playground' },
          { text: 'npm', link: 'https://www.npmjs.com/package/stadata-js' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Panduan',
              items: [
                { text: 'Mulai Cepat', link: '/guide/memulai' },
                { text: 'Konfigurasi', link: '/guide/konfigurasi' },
                { text: 'Penanganan Error', link: '/guide/error-handling' },
              ],
            },
          ],
          '/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Domains', link: '/api/domains' },
                { text: 'Publications', link: '/api/publications' },
                { text: 'Press Releases', link: '/api/press-releases' },
                { text: 'Static Tables', link: '/api/static-tables' },
                { text: 'Dynamic Tables', link: '/api/dynamic-tables' },
                { text: 'Infographics', link: '/api/infographics' },
                { text: 'News', link: '/api/news' },
                { text: 'News Categories', link: '/api/news-categories' },
                { text: 'Variables', link: '/api/variables' },
                { text: 'Vertical Variables', link: '/api/vertical-variables' },
                { text: 'Derived Variables', link: '/api/derived-variables' },
                { text: 'Subjects', link: '/api/subjects' },
                { text: 'Subject Categories', link: '/api/subject-categories' },
                { text: 'Units', link: '/api/units' },
                { text: 'Periods', link: '/api/periods' },
                { text: 'Derived Periods', link: '/api/derived-periods' },
                { text: 'Strategic Indicators', link: '/api/strategic-indicators' },
                { text: 'Statistic Classifications', link: '/api/statistic-classifications' },
                { text: 'Census', link: '/api/census' },
                { text: 'Trade', link: '/api/trade' },
              ],
            },
          ],
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'API Reference', link: '/en/api/domains' },
          { text: 'npm', link: 'https://www.npmjs.com/package/stadata-js' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Configuration', link: '/en/guide/configuration' },
                { text: 'Error Handling', link: '/en/guide/error-handling' },
              ],
            },
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Domains', link: '/en/api/domains' },
                { text: 'Publications', link: '/en/api/publications' },
                { text: 'Press Releases', link: '/en/api/press-releases' },
                { text: 'Static Tables', link: '/en/api/static-tables' },
                { text: 'Dynamic Tables', link: '/en/api/dynamic-tables' },
                { text: 'Infographics', link: '/en/api/infographics' },
                { text: 'News', link: '/en/api/news' },
                { text: 'News Categories', link: '/en/api/news-categories' },
                { text: 'Variables', link: '/en/api/variables' },
                { text: 'Vertical Variables', link: '/en/api/vertical-variables' },
                { text: 'Derived Variables', link: '/en/api/derived-variables' },
                { text: 'Subjects', link: '/en/api/subjects' },
                { text: 'Subject Categories', link: '/en/api/subject-categories' },
                { text: 'Units', link: '/en/api/units' },
                { text: 'Periods', link: '/en/api/periods' },
                { text: 'Derived Periods', link: '/en/api/derived-periods' },
                { text: 'Strategic Indicators', link: '/en/api/strategic-indicators' },
                { text: 'Statistic Classifications', link: '/en/api/statistic-classifications' },
                { text: 'Census', link: '/en/api/census' },
                { text: 'Trade', link: '/en/api/trade' },
              ],
            },
          ],
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IPDS-59/stadata_js' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/stadata-js' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present IPDS-59',
    },
    search: {
      provider: 'local',
    },
  },
})
