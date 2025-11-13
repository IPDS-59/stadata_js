#!/usr/bin/env node

/**
 * Check if coverage meets minimum thresholds
 */

const fs = require('fs');
const path = require('path');

const COVERAGE_THRESHOLD = {
  statements: 80,
  branches: 80,
  functions: 80,
  lines: 80,
};

function checkCoverage() {
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');

  if (!fs.existsSync(coveragePath)) {
    console.error('Coverage summary not found');
    process.exit(1);
  }

  const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
  const total = coverage.total;

  console.log('\n=== Coverage Report ===\n');

  let failed = false;
  const results = [];

  Object.keys(COVERAGE_THRESHOLD).forEach((metric) => {
    const threshold = COVERAGE_THRESHOLD[metric];
    const actual = total[metric].pct;
    const passed = actual >= threshold;

    results.push({
      metric,
      threshold,
      actual,
      passed,
    });

    const status = passed ? '✓' : '✗';
    const statusColor = passed ? '\x1b[32m' : '\x1b[31m';
    const resetColor = '\x1b[0m';

    console.log(
      `${statusColor}${status}${resetColor} ${metric.padEnd(12)}: ${actual.toFixed(2)}% (threshold: ${threshold}%)`
    );

    if (!passed) {
      failed = true;
    }
  });

  console.log('\n');

  if (failed) {
    console.error('❌ Coverage check failed! Some metrics are below the threshold.');
    process.exit(1);
  } else {
    console.log('✅ All coverage thresholds passed!');
    process.exit(0);
  }
}

checkCoverage();
