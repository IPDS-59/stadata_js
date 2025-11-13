#!/usr/bin/env node

/**
 * Extract changelog section for a specific version
 */

const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
  console.error('Usage: node extract-changelog-section.js <version>');
  process.exit(1);
}

function extractSection() {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) {
    console.log(`No changelog found for version ${version}`);
    return;
  }

  const changelog = fs.readFileSync(changelogPath, 'utf-8');
  const lines = changelog.split('\n');

  let startIndex = -1;
  let endIndex = -1;

  // Find the section for this version
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match version header: ## [1.2.3] or ## 1.2.3
    if (line.match(new RegExp(`^##\\s+\\[?${version.replace(/\./g, '\\.')}\\]?`))) {
      startIndex = i;
    } else if (startIndex !== -1 && line.startsWith('## ')) {
      endIndex = i;
      break;
    }
  }

  if (startIndex === -1) {
    console.log(`No changelog entry found for version ${version}`);
    return;
  }

  if (endIndex === -1) {
    endIndex = lines.length;
  }

  // Extract the section (skip the version header)
  const section = lines.slice(startIndex + 1, endIndex).join('\n').trim();

  console.log(section);
}

extractSection();
