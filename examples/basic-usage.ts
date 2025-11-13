/**
 * Basic Usage Examples for Stadata JS SDK
 *
 * This file demonstrates common usage patterns of the SDK.
 * To run: ts-node examples/basic-usage.ts
 */

import {
  StadataJS,
  DataLanguage,
  CancelToken,
  LogLevel,
  LoggingInterceptor,
  Domain,
} from '../src';

async function main() {
  try {
    // ==============================================
    // 1. INITIALIZATION
    // ==============================================

    console.log('1. Initializing SDK...\n');

    await StadataJS.init({
      apiKey: process.env.BPS_API_KEY || 'your-api-key-here',
      debug: true,
      logLevel: LogLevel.DEBUG,
      timeout: 30000,
      interceptors: [new LoggingInterceptor()],
    });

    const stadata = StadataJS.instance;
    console.log('✓ SDK initialized successfully\n');

    // ==============================================
    // 2. BASIC LIST QUERY
    // ==============================================

    console.log('2. Fetching domains (basic)...\n');

    const basicResult = await stadata.list.domains();

    basicResult.match(
      (listResult) => {
        console.log(`✓ Found ${listResult.totalItems} domains`);
        console.log(`✓ Current page has ${listResult.itemCount} items`);
        console.log(`✓ Page ${listResult.pagination.page} of ${listResult.pagination.pages}\n`);

        // Display first 3 domains
        listResult.data.slice(0, 3).forEach((domain: Domain) => {
          console.log(`  - ${domain.name} (${domain.id})`);
          console.log(`    URL: ${domain.url}`);
        });
        console.log();
      },
      (error) => {
        console.error(`✗ Error: ${error.message}\n`);
      }
    );

    // ==============================================
    // 3. PARAMETERIZED LIST QUERY
    // ==============================================

    console.log('3. Fetching domains with parameters...\n');

    const paramResult = await stadata.list.domains({
      lang: DataLanguage.EN,
      page: 1,
      perPage: 5,
      keyword: 'indonesia',
    });

    if (paramResult.isOk()) {
      const listResult = paramResult.value;
      console.log(`✓ Fetched page ${listResult.pagination.page}`);
      console.log(`✓ Items per page: ${listResult.pagination.perPage}`);
      console.log(`✓ Total items: ${listResult.pagination.total}`);
      console.log(`✓ Has next page: ${listResult.pagination.hasNextPage}\n`);
    } else {
      console.error(`✗ Error: ${paramResult.error.message}\n`);
    }

    // ==============================================
    // 4. VIEW SINGLE ITEM
    // ==============================================

    console.log('4. Fetching single domain...\n');

    const viewResult = await stadata.view.domain({
      id: '7200',
      domain: '7200',
      lang: DataLanguage.EN,
    });

    viewResult.match(
      (domain) => {
        console.log('✓ Domain details:');
        console.log(`  ID: ${domain.id}`);
        console.log(`  Name: ${domain.name}`);
        console.log(`  URL: ${domain.url}\n`);
      },
      (error) => {
        console.error(`✗ Error: ${error.message}\n`);
      }
    );

    // ==============================================
    // 5. ERROR HANDLING WITH PATTERN MATCHING
    // ==============================================

    console.log('5. Demonstrating error handling...\n');

    const errorResult = await stadata.view.domain({
      id: 'nonexistent',
      domain: '9999',
      lang: DataLanguage.EN,
    });

    errorResult.match(
      (domain) => {
        console.log('✓ Unexpected success');
      },
      (error) => {
        console.log('✓ Handled error gracefully:');
        console.log(`  Message: ${error.message}`);
        console.log(`  Code: ${error.code || 'N/A'}`);
        console.log(`  Type: ${error.constructor.name}\n`);
      }
    );

    // ==============================================
    // 6. REQUEST CANCELLATION
    // ==============================================

    console.log('6. Demonstrating request cancellation...\n');

    const { token, cancel } = CancelToken.source();

    // Start request
    const cancelPromise = stadata.list.domains({
      cancelToken: token,
      page: 1,
      perPage: 100,
    });

    // Cancel after 100ms
    setTimeout(() => {
      console.log('  Cancelling request...');
      cancel('User requested cancellation');
    }, 100);

    const cancelResult = await cancelPromise;

    cancelResult.match(
      (data) => {
        console.log('✓ Request completed (wasn\'t cancelled in time)\n');
      },
      (error) => {
        console.log('✓ Request was cancelled successfully');
        console.log(`  Reason: ${error.message}\n`);
      }
    );

    // ==============================================
    // 7. RESULT CHAINING
    // ==============================================

    console.log('7. Demonstrating result chaining...\n');

    const chainResult = await stadata.list
      .domains({ page: 1, perPage: 10 })
      .then((result) =>
        result
          .map((listResult) => {
            // Transform to just the names
            return listResult.data.map((d) => d.name);
          })
          .mapErr((error) => {
            // Transform error message
            return `Failed to fetch domain names: ${error.message}`;
          })
      );

    chainResult.match(
      (names) => {
        console.log(`✓ Domain names: ${names.slice(0, 3).join(', ')}...\n`);
      },
      (errorMsg) => {
        console.error(`✗ ${errorMsg}\n`);
      }
    );

    // ==============================================
    // 8. CONDITIONAL LOGIC WITH isOk/isErr
    // ==============================================

    console.log('8. Demonstrating isOk/isErr pattern...\n');

    const checkResult = await stadata.list.domains({ page: 1, perPage: 5 });

    if (checkResult.isOk()) {
      const listResult = checkResult.value;
      console.log('✓ Success path');
      console.log(`  Retrieved ${listResult.itemCount} items`);

      if (listResult.pagination.hasNextPage) {
        console.log('  More pages available');
      }
    } else {
      const error = checkResult.error;
      console.log('✗ Error path');
      console.log(`  Error: ${error.message}`);
    }
    console.log();

    // ==============================================
    // 9. PAGINATION LOOP
    // ==============================================

    console.log('9. Demonstrating pagination...\n');

    let currentPage = 1;
    let totalFetched = 0;
    const maxPages = 3;

    while (currentPage <= maxPages) {
      const pageResult = await stadata.list.domains({
        page: currentPage,
        perPage: 5,
      });

      if (pageResult.isErr()) {
        console.error(`✗ Error on page ${currentPage}: ${pageResult.error.message}`);
        break;
      }

      const listResult = pageResult.value;
      totalFetched += listResult.itemCount;

      console.log(`  Page ${currentPage}/${maxPages}: ${listResult.itemCount} items`);

      if (!listResult.pagination.hasNextPage || currentPage >= maxPages) {
        break;
      }

      currentPage++;
    }

    console.log(`✓ Total fetched: ${totalFetched} items\n`);

    // ==============================================
    // 10. UPDATING API KEY
    // ==============================================

    console.log('10. Demonstrating API key update...\n');

    console.log('  Current API key set: ' + (stadata ? 'Yes' : 'No'));

    // Update API key
    stadata.setApiKey('new-api-key-here');
    console.log('✓ API key updated successfully\n');

    // ==============================================
    // 11. DEBUG LOGGING
    // ==============================================

    console.log('11. Demonstrating debug logging...\n');

    // Enable debug
    stadata.enableDebug();
    console.log('✓ Debug logging enabled');

    // Make a request (will log debug info)
    await stadata.list.domains({ page: 1, perPage: 1 });

    // Disable debug
    stadata.disableDebug();
    console.log('✓ Debug logging disabled\n');

    // ==============================================
    // 12. ADVANCED: COMBINING MULTIPLE REQUESTS
    // ==============================================

    console.log('12. Combining multiple requests...\n');

    const [domains1, domains2] = await Promise.all([
      stadata.list.domains({ page: 1, perPage: 5 }),
      stadata.list.domains({ page: 2, perPage: 5 }),
    ]);

    if (domains1.isOk() && domains2.isOk()) {
      const total = domains1.value.itemCount + domains2.value.itemCount;
      console.log(`✓ Fetched ${total} items from 2 parallel requests\n`);
    }

    // ==============================================
    // 13. CLEANUP
    // ==============================================

    console.log('13. Cleaning up...\n');
    StadataJS.destroy();
    console.log('✓ SDK destroyed successfully\n');

    console.log('==============================================');
    console.log('All examples completed successfully!');
    console.log('==============================================\n');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run examples
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
