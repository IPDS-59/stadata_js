/**
 * Simple API Test Example
 *
 * This file tests the SDK with real API calls.
 * To run: npx ts-node examples/test-api.ts
 *
 * Make sure to set your BPS_API_KEY environment variable:
 * export BPS_API_KEY=your-api-key-here
 */

import { StadataJS, DataLanguage } from '../src';

async function testAPI() {
  try {
    console.log('🚀 Testing Stadata JS SDK\n');
    console.log('='.repeat(50));

    // Initialize SDK
    console.log('\n1. Initializing SDK...');
    await StadataJS.init({
      apiKey: process.env.BPS_API_KEY || '',
      debug: true,
    });
    console.log('   ✓ SDK initialized\n');

    const stadata = StadataJS.instance;

    // Test 1: List Domains
    console.log('2. Testing List Domains...');
    const domainsResult = await stadata.list.domains({
      lang: DataLanguage.ID,
      page: 1,
      perPage: 5,
    });

    domainsResult.match(
      (result) => {
        console.log(`   ✓ Success! Found ${result.totalItems} domains`);
        console.log(`   ✓ Showing ${result.itemCount} items on page ${result.pagination.page}`);
        console.log('\n   Domains:');
        result.data.forEach((domain, index) => {
          console.log(`   ${index + 1}. ${domain.name} (ID: ${domain.id})`);
        });
      },
      (error) => {
        console.error(`   ✗ Error: ${error.message}`);
        console.error(`   ✗ Code: ${error.code || 'N/A'}`);
      }
    );

    // Test 2: View Domain
    console.log('\n3. Testing View Domain...');
    const domainResult = await stadata.view.domain({
      id: '7200',
      domain: '7200',
      lang: DataLanguage.ID,
    });

    domainResult.match(
      (domain) => {
        console.log(`   ✓ Success!`);
        console.log(`   ✓ ID: ${domain.id}`);
        console.log(`   ✓ Name: ${domain.name}`);
        console.log(`   ✓ URL: ${domain.url}`);
      },
      (error) => {
        console.error(`   ✗ Error: ${error.message}`);
      }
    );

    // Test 3: List Strategic Indicators
    console.log('\n4. Testing List Strategic Indicators...');
    const indicatorsResult = await stadata.list.strategicIndicators({
      lang: DataLanguage.ID,
      domain: '7200',
      page: 1,
      perPage: 3,
    });

    indicatorsResult.match(
      (result) => {
        console.log(`   ✓ Success! Found ${result.totalItems} strategic indicators`);
        console.log(`   ✓ Showing ${result.itemCount} items`);
        console.log('\n   Strategic Indicators:');
        result.data.forEach((indicator, index) => {
          console.log(`   ${index + 1}. ${indicator.title || indicator.name || 'N/A'}`);
        });
      },
      (error) => {
        console.error(`   ✗ Error: ${error.message}`);
      }
    );

    // Test 4: List Publications
    console.log('\n5. Testing List Publications...');
    const publicationsResult = await stadata.list.publications({
      lang: DataLanguage.ID,
      domain: '7200',
      page: 1,
      perPage: 3,
    });

    publicationsResult.match(
      (result) => {
        console.log(`   ✓ Success! Found ${result.totalItems} publications`);
        console.log(`   ✓ Showing ${result.itemCount} items`);
        console.log('\n   Publications:');
        result.data.forEach((publication, index) => {
          console.log(`   ${index + 1}. ${publication.title}`);
        });
      },
      (error) => {
        console.error(`   ✗ Error: ${error.message}`);
      }
    );

    // Test 5: List Subjects
    console.log('\n6. Testing List Subjects...');
    const subjectsResult = await stadata.list.subjects({
      lang: DataLanguage.ID,
      domain: '7200',
      page: 1,
      perPage: 3,
    });

    subjectsResult.match(
      (result) => {
        console.log(`   ✓ Success! Found ${result.totalItems} subjects`);
        console.log(`   ✓ Showing ${result.itemCount} items`);
        console.log('\n   Subjects:');
        result.data.forEach((subject, index) => {
          console.log(`   ${index + 1}. ${subject.title || subject.name || 'N/A'}`);
        });
      },
      (error) => {
        console.error(`   ✗ Error: ${error.message}`);
      }
    );

    console.log('\n' + '='.repeat(50));
    console.log('✨ All tests completed!\n');

    // Cleanup
    StadataJS.destroy();
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the tests
testAPI().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
