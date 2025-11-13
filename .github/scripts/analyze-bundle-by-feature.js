#!/usr/bin/env node

/**
 * Analyze bundle size breakdown by feature module
 */

const fs = require('fs');
const path = require('path');

function analyzeBundleByFeature() {
  const distPath = path.join(process.cwd(), 'dist');
  const srcPath = path.join(process.cwd(), 'src', 'features');

  if (!fs.existsSync(distPath)) {
    console.error('Dist directory not found. Run npm run build first.');
    process.exit(1);
  }

  const features = {};

  // Get all feature directories
  if (fs.existsSync(srcPath)) {
    const featureDirs = fs.readdirSync(srcPath).filter((dir) => {
      return fs.statSync(path.join(srcPath, dir)).isDirectory();
    });

    featureDirs.forEach((feature) => {
      const featurePath = path.join(srcPath, feature);
      let totalSize = 0;
      let fileCount = 0;

      // Recursively calculate size of all TypeScript files
      function calculateSize(dirPath) {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            calculateSize(filePath);
          } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
            totalSize += stat.size;
            fileCount++;
          }
        });
      }

      calculateSize(featurePath);

      features[feature] = {
        sourceSize: totalSize,
        files: fileCount,
      };
    });
  }

  // Get total bundle size from dist
  const cjsPath = path.join(distPath, 'index.js');
  const esmPath = path.join(distPath, 'index.mjs');

  const totalCjsSize = fs.existsSync(cjsPath) ? fs.statSync(cjsPath).size : 0;
  const totalEsmSize = fs.existsSync(esmPath) ? fs.statSync(esmPath).size : 0;

  // Calculate percentage contribution (approximate based on source size)
  const totalSourceSize = Object.values(features).reduce(
    (sum, feature) => sum + feature.sourceSize,
    0
  );

  const featureStats = Object.keys(features)
    .map((name) => {
      const feature = features[name];
      const contribution = totalSourceSize > 0 ? (feature.sourceSize / totalSourceSize) * 100 : 0;
      const estimatedCjs = (totalCjsSize * contribution) / 100;
      const estimatedEsm = (totalEsmSize * contribution) / 100;

      return {
        name,
        files: feature.files,
        sourceSize: feature.sourceSize,
        contribution: contribution.toFixed(2),
        estimatedCjs: (estimatedCjs / 1024).toFixed(2), // KB
        estimatedEsm: (estimatedEsm / 1024).toFixed(2), // KB
      };
    })
    .sort((a, b) => b.sourceSize - a.sourceSize);

  return {
    features: featureStats,
    total: {
      cjs: (totalCjsSize / 1024).toFixed(2),
      esm: (totalEsmSize / 1024).toFixed(2),
    },
  };
}

function generateMarkdownTable(data) {
  let markdown = '\n### Bundle Size by Feature Module\n\n';
  markdown += `**Total Bundle Size:** CJS: ${data.total.cjs} KB | ESM: ${data.total.esm} KB\n\n`;
  markdown +=
    '| Feature | Files | Source Size | Contribution | Est. CJS | Est. ESM |\n';
  markdown +=
    '|---------|-------|-------------|--------------|----------|----------|\n';

  data.features.forEach((feature) => {
    const sizeKb = (feature.sourceSize / 1024).toFixed(2);
    markdown += `| **${feature.name}** | ${feature.files} | ${sizeKb} KB | ${feature.contribution}% | ~${feature.estimatedCjs} KB | ~${feature.estimatedEsm} KB |\n`;
  });

  markdown += '\n*Note: Bundle size estimates are approximate based on source code size.*\n';
  return markdown;
}

// Main execution
if (require.main === module) {
  try {
    const data = analyzeBundleByFeature();
    const markdown = generateMarkdownTable(data);
    console.log(markdown);
  } catch (error) {
    console.error('Error analyzing bundle:', error.message);
    process.exit(1);
  }
}

module.exports = { analyzeBundleByFeature, generateMarkdownTable };
