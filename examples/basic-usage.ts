/**
 * Basic v2 usage example for Stadata JS SDK
 *
 * Run with:
 *   npx tsx examples/basic-usage.ts
 */

import {
  initStadata,
  useDomains,
  usePublications,
  useDynamicTables,
  DynamicTableHtmlGenerator,
  DataLanguage,
  DomainType,
} from '../src'

async function main() {
  initStadata({
    apiKey: process.env.BPS_API_KEY || 'your-api-key-here',
    debug: true,
    timeout: 30000,
  })

  console.log('1. Fetch domains')
  const { fetchDomainList } = useDomains()
  const domainsResult = await fetchDomainList({
    type: DomainType.ALL,
    lang: DataLanguage.ID,
    page: 1,
    perPage: 5,
  })

  domainsResult.match(
    ({ data, pagination }) => {
      console.log(`✓ ${data.length} domains loaded (total: ${pagination.total})`)
      data.slice(0, 3).forEach((domain) => {
        console.log(`  - ${domain.name} (${domain.id})`)
      })
    },
    (error) => console.error(`✗ Domains error: ${error.message}`)
  )

  console.log('\n2. Fetch publications')
  const { fetchPublicationList } = usePublications()
  const publicationsResult = await fetchPublicationList({
    domain: '0000',
    lang: DataLanguage.ID,
    page: 1,
    perPage: 3,
    year: 2024,
  })

  publicationsResult.match(
    ({ data }) => {
      console.log(`✓ ${data.length} publications loaded`)
      data.forEach((publication) => console.log(`  - ${publication.title}`))
    },
    (error) => console.error(`✗ Publications error: ${error.message}`)
  )

  console.log('\n3. Fetch dynamic table + helpers')
  const { fetchDynamicTableList } = useDynamicTables()
  const dynamicTableResult = await fetchDynamicTableList({
    domain: '1404',
    variableId: 33,
    periodId: '117;123',
    lang: DataLanguage.ID,
  })

  dynamicTableResult.match(
    (table) => {
      console.log('✓ Dynamic table loaded')
      console.log(`  Vertical variable label: ${table.verticalVariableLabel}`)
      console.log(`  Data points: ${Object.keys(table.dataContent).length}`)

      const structured = table.toStructuredData()
      const html = DynamicTableHtmlGenerator.generate(table)

      console.log(`  Structured rows: ${structured.data.length}`)
      console.log(`  HTML preview: ${html.slice(0, 120)}...`)
    },
    (error) => console.error(`✗ Dynamic table error: ${error.message}`)
  )
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
