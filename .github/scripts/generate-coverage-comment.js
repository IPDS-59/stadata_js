#!/usr/bin/env node

/**
 * Generate coverage comment for PR
 */

const fs = require('fs');
const path = require('path');

function generateCoverageComment() {
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');

  if (!fs.existsSync(coveragePath)) {
    console.log('## Coverage Report\n\nNo coverage data available.');
    return;
  }

  const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
  const total = coverage.total;

  const getEmoji = (pct) => {
    if (pct >= 90) return '🟢';
    if (pct >= 80) return '🟡';
    return '🔴';
  };

  const getBar = (pct) => {
    const filled = Math.round(pct / 5);
    const empty = 20 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  let comment = '## Coverage Report\n\n';
  comment += '| Metric | Coverage | Bar |\n';
  comment += '|--------|----------|-----|\n';

  ['statements', 'branches', 'functions', 'lines'].forEach((metric) => {
    const data = total[metric];
    const pct = data.pct;
    const emoji = getEmoji(pct);
    const bar = getBar(pct);

    comment += `| ${emoji} ${metric.charAt(0).toUpperCase() + metric.slice(1)} | ${pct.toFixed(2)}% (${data.covered}/${data.total}) | ${bar} |\n`;
  });

  comment += '\n';

  // Overall status
  const avgCoverage = (
    (total.statements.pct +
      total.branches.pct +
      total.functions.pct +
      total.lines.pct) /
    4
  ).toFixed(2);

  if (avgCoverage >= 90) {
    comment += '### Excellent coverage! 🎉\n';
  } else if (avgCoverage >= 80) {
    comment += '### Good coverage! 👍\n';
  } else {
    comment += '### Coverage needs improvement 📈\n';
  }

  comment += `\nAverage coverage: **${avgCoverage}%**\n`;

  console.log(comment);
}

generateCoverageComment();
