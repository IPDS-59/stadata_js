#!/usr/bin/env node

/**
 * Analyze coverage breakdown by feature module
 */

const fs = require('fs');
const path = require('path');

function analyzeCoverageByFeature() {
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');

  if (!fs.existsSync(coveragePath)) {
    console.error('Coverage summary not found');
    process.exit(1);
  }

  const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
  const features = {};

  // Group coverage by feature
  Object.keys(coverage).forEach((filePath) => {
    if (filePath === 'total') return;

    // Extract feature name from path
    const match = filePath.match(/src\/features\/([^/]+)/);
    if (match) {
      const featureName = match[1];
      if (!features[featureName]) {
        features[featureName] = {
          statements: { total: 0, covered: 0 },
          branches: { total: 0, covered: 0 },
          functions: { total: 0, covered: 0 },
          lines: { total: 0, covered: 0 },
          files: 0,
        };
      }

      const fileCoverage = coverage[filePath];
      features[featureName].statements.total += fileCoverage.statements.total;
      features[featureName].statements.covered += fileCoverage.statements.covered;
      features[featureName].branches.total += fileCoverage.branches.total;
      features[featureName].branches.covered += fileCoverage.branches.covered;
      features[featureName].functions.total += fileCoverage.functions.total;
      features[featureName].functions.covered += fileCoverage.functions.covered;
      features[featureName].lines.total += fileCoverage.lines.total;
      features[featureName].lines.covered += fileCoverage.lines.covered;
      features[featureName].files++;
    }
  });

  // Calculate percentages and sort by coverage
  const featureStats = Object.keys(features)
    .map((name) => {
      const feature = features[name];
      return {
        name,
        files: feature.files,
        statements:
          feature.statements.total > 0
            ? ((feature.statements.covered / feature.statements.total) * 100).toFixed(2)
            : '0.00',
        branches:
          feature.branches.total > 0
            ? ((feature.branches.covered / feature.branches.total) * 100).toFixed(2)
            : '0.00',
        functions:
          feature.functions.total > 0
            ? ((feature.functions.covered / feature.functions.total) * 100).toFixed(2)
            : '0.00',
        lines:
          feature.lines.total > 0
            ? ((feature.lines.covered / feature.lines.total) * 100).toFixed(2)
            : '0.00',
        avg: 0,
      };
    })
    .map((feature) => {
      feature.avg = (
        (parseFloat(feature.statements) +
          parseFloat(feature.branches) +
          parseFloat(feature.functions) +
          parseFloat(feature.lines)) /
        4
      ).toFixed(2);
      return feature;
    })
    .sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));

  return featureStats;
}

function generateMarkdownTable(features) {
  let markdown = '\n### Coverage by Feature Module\n\n';
  markdown += '| Feature | Files | Statements | Branches | Functions | Lines | Average |\n';
  markdown += '|---------|-------|------------|----------|-----------|-------|----------|\n';

  features.forEach((feature) => {
    const avg = parseFloat(feature.avg);
    const icon = avg >= 80 ? '🟢' : avg >= 50 ? '🟡' : '🔴';
    markdown += `| ${icon} **${feature.name}** | ${feature.files} | ${feature.statements}% | ${feature.branches}% | ${feature.functions}% | ${feature.lines}% | **${feature.avg}%** |\n`;
  });

  markdown += '\n';
  return markdown;
}

// Main execution
if (require.main === module) {
  try {
    const features = analyzeCoverageByFeature();
    const markdown = generateMarkdownTable(features);
    console.log(markdown);
  } catch (error) {
    console.error('Error analyzing coverage:', error.message);
    process.exit(1);
  }
}

module.exports = { analyzeCoverageByFeature, generateMarkdownTable };
