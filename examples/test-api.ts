/**
 * Quick smoke test for the v2 composable API
 *
 * Run with:
 *   npx tsx examples/test-api.ts
 */

import {
  initStadata,
  useDomains,
  usePublications,
  useSubjects,
  useStrategicIndicators,
  DataLanguage,
  DomainType,
} from '../src'

async function testAPI() {
  console.log('🚀 Testing Stadata JS SDK v2\n')

  initStadata({
    apiKey: process.env.BPS_API_KEY || '',
    debug: true,
  })

  const { fetchDomainList } = useDomains()
  const { fetchPublicationList } = usePublications()
  const { fetchSubjectList } = useSubjects()
  const { fetchStrategicIndicatorList } = useStrategicIndicators()

  console.log('1. Domains')
  const domains = await fetchDomainList({
    type: DomainType.ALL,
    lang: DataLanguage.ID,
    page: 1,
    perPage: 5,
  })
  domains.match(
    ({ data, pagination }) => console.log(`   ✓ ${data.length} items, total ${pagination.total}`),
    (error) => console.error(`   ✗ ${error.message}`)
  )

  console.log('\n2. Publications')
  const publications = await fetchPublicationList({
    domain: '7200',
    lang: DataLanguage.ID,
    page: 1,
    perPage: 3,
  })
  publications.match(
    ({ data }) => console.log(`   ✓ ${data.length} publications`),
    (error) => console.error(`   ✗ ${error.message}`)
  )

  console.log('\n3. Subjects')
  const subjects = await fetchSubjectList({
    domain: '7200',
    lang: DataLanguage.ID,
    page: 1,
    perPage: 3,
  })
  subjects.match(
    ({ data }) => console.log(`   ✓ ${data.length} subjects`),
    (error) => console.error(`   ✗ ${error.message}`)
  )

  console.log('\n4. Strategic Indicators')
  const indicators = await fetchStrategicIndicatorList({
    domain: '7200',
    lang: DataLanguage.ID,
    page: 1,
    perPage: 3,
  })
  indicators.match(
    ({ data }) => console.log(`   ✓ ${data.length} indicators`),
    (error) => console.error(`   ✗ ${error.message}`)
  )

  console.log('\n✨ Smoke test finished')
}

testAPI().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
