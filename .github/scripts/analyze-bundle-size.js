#!/usr/bin/env node

/**
 * Analyze bundle size
 */

const fs = require('fs');
const path = require('path');

const mode = process.argv[2] || 'pr';

function getDirectorySize(dirPath) {
  let totalSize = 0;
  const files = [];

  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);

    items.forEach((item) => {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        traverse(itemPath);
      } else {
        const size = stats.size;
        totalSize += size;
        files.push({
          path: path.relative(process.cwd(), itemPath),
          size,
        });
      }
    });
  }

  if (fs.existsSync(dirPath)) {
    traverse(dirPath);
  }

  return { totalSize, files };
}

function analyzeBundleSize() {
  const buildDirs = ['dist', 'lib', 'build'];
  let totalSize = 0;
  const allFiles = [];

  buildDirs.forEach((dir) => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const { totalSize: dirSize, files } = getDirectorySize(dirPath);
      totalSize += dirSize;
      allFiles.push(...files);
    }
  });

  // Sort files by size (largest first)
  allFiles.sort((a, b) => b.size - a.size);

  const result = {
    total: totalSize,
    totalFormatted: formatBytes(totalSize),
    files: allFiles.map((file) => ({
      path: file.path,
      size: file.size,
      sizeFormatted: formatBytes(file.size),
    })),
  };

  console.log(JSON.stringify(result, null, 2));
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

analyzeBundleSize();
