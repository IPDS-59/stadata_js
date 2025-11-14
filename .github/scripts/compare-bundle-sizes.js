#!/usr/bin/env node

/**
 * Compare bundle sizes between PR and base
 */

const fs = require('fs');
const path = require('path');
const {
  analyzeBundleByFeature,
  generateMarkdownTable: generateFeatureTable,
} = require('./analyze-bundle-by-feature');

const prSizeFile = process.argv[2];
const baseSizeFile = process.argv[3];

if (!prSizeFile || !baseSizeFile) {
  console.error('Usage: node compare-bundle-sizes.js <pr-size.json> <base-size.json>');
  process.exit(1);
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDiff(prSize, baseSize) {
  const diff = prSize - baseSize;
  const diffFormatted = formatBytes(Math.abs(diff));
  const percentChange = baseSize === 0 ? 0 : ((diff / baseSize) * 100).toFixed(2);

  if (diff > 0) {
    return `+${diffFormatted} (+${percentChange}%)`;
  } else if (diff < 0) {
    return `-${diffFormatted} (${percentChange}%)`;
  } else {
    return 'No change';
  }
}

function getEmoji(prSize, baseSize) {
  const diff = prSize - baseSize;
  const percentChange = baseSize === 0 ? 0 : (diff / baseSize) * 100;

  if (percentChange > 5) return '🔴';
  if (percentChange > 0) return '🟡';
  if (percentChange < -5) return '🟢';
  if (percentChange < 0) return '🔵';
  return '⚪';
}

function compareSizes() {
  const prSize = JSON.parse(fs.readFileSync(prSizeFile, 'utf-8'));
  const baseSize = JSON.parse(fs.readFileSync(baseSizeFile, 'utf-8'));

  let output = '## Bundle Size Analysis\n\n';

  // Overall comparison
  const emoji = getEmoji(prSize.total, baseSize.total);
  output += `### ${emoji} Overall Bundle Size\n\n`;
  output += '| Metric | Size | Change |\n';
  output += '|--------|------|--------|\n';
  output += `| Base (${process.env.GITHUB_BASE_REF || 'develop'}) | ${formatBytes(baseSize.total)} | - |\n`;
  output += `| PR | ${formatBytes(prSize.total)} | ${formatDiff(prSize.total, baseSize.total)} |\n`;
  output += '\n';

  // Detailed file comparison
  if (prSize.files.length > 0 || baseSize.files.length > 0) {
    output += '### File Size Changes\n\n';

    // Get top 10 largest files
    const topFiles = prSize.files.slice(0, 10);

    if (topFiles.length > 0) {
      output += '**Top Files:**\n\n';
      output += '| File | Size | Change |\n';
      output += '|------|------|--------|\n';

      topFiles.forEach((file) => {
        const baseFile = baseSize.files.find((f) => f.path === file.path);
        const baseFileSize = baseFile ? baseFile.size : 0;
        const change = formatDiff(file.size, baseFileSize);

        output += `| \`${file.path}\` | ${formatBytes(file.size)} | ${change} |\n`;
      });

      output += '\n';
    }
  }

  // Recommendations
  const diff = prSize.total - baseSize.total;
  const percentChange = baseSize.total === 0 ? 0 : (diff / baseSize.total) * 100;

  output += '### Analysis\n\n';

  if (percentChange > 10) {
    output += '- **Warning:** Bundle size increased by more than 10%\n';
    output += '- Consider reviewing and optimizing the changes\n';
    output += '- Check if large dependencies were added\n';
  } else if (percentChange > 5) {
    output += '- Bundle size increased moderately\n';
    output += '- Review if the increase is justified\n';
  } else if (percentChange > 0) {
    output += '- Small increase in bundle size (acceptable)\n';
  } else if (percentChange < 0) {
    output += '- Great job! Bundle size decreased\n';
  } else {
    output += '- No change in bundle size\n';
  }

  // Add feature breakdown
  try {
    const featureData = analyzeBundleByFeature();
    if (featureData && featureData.features && featureData.features.length > 0) {
      output += generateFeatureTable(featureData);
    }
  } catch (error) {
    // If feature analysis fails, just skip it
    console.error('Warning: Could not generate feature breakdown:', error.message);
  }

  console.log(output);
}

compareSizes();
