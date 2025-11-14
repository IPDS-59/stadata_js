#!/usr/bin/env node

/**
 * Generate changelog from conventional commits
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = process.argv[2] || '0.0.0';

const COMMIT_TYPES = {
  feat: { title: 'Features', emoji: '✨' },
  fix: { title: 'Bug Fixes', emoji: '🐛' },
  docs: { title: 'Documentation', emoji: '📚' },
  style: { title: 'Styles', emoji: '💎' },
  refactor: { title: 'Code Refactoring', emoji: '♻️' },
  perf: { title: 'Performance Improvements', emoji: '⚡' },
  test: { title: 'Tests', emoji: '✅' },
  build: { title: 'Build System', emoji: '📦' },
  ci: { title: 'Continuous Integration', emoji: '👷' },
  chore: { title: 'Chores', emoji: '🔧' },
  revert: { title: 'Reverts', emoji: '⏪' },
};

function getCommits() {
  try {
    // Get the last tag
    let lastTag;
    try {
      lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
      console.log(`Found last tag: ${lastTag}`);
    } catch {
      // No tags exist, get all commits from initial commit
      lastTag = '';
      console.log('No tags found, will use all commits');
    }

    let range;
    if (lastTag) {
      range = `${lastTag}..HEAD`;
    } else {
      // No tags, get all commits from beginning
      try {
        const initialCommit = execSync('git rev-list --max-parents=0 HEAD', {
          encoding: 'utf-8',
        }).trim();
        range = `${initialCommit}..HEAD`;
        console.log(`Using initial commit: ${initialCommit}`);
      } catch {
        // If that fails too, just get all commits
        range = 'HEAD';
        console.log('Using HEAD for all commits');
      }
    }

    const commits = execSync(`git log ${range} --pretty=format:"%H|%s|%b"`, {
      encoding: 'utf-8',
    })
      .split('\n')
      .filter(Boolean);

    console.log(`Found ${commits.length} commits`);

    return commits.map((commit) => {
      const parts = commit.split('|');
      const hash = parts[0] || '';
      const subject = parts[1] || '';
      const body = parts[2] || '';
      return { hash, subject, body };
    });
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    return [];
  }
}

function parseCommit(commit) {
  // Parse conventional commit format: type(scope): subject
  const match = commit.subject.match(/^(\w+)(?:\(([^)]+)\))?: (.+)$/);

  if (!match) {
    return null;
  }

  const [, type, scope, subject] = match;

  if (!COMMIT_TYPES[type]) {
    return null;
  }

  return {
    type,
    scope,
    subject,
    hash: commit.hash.substring(0, 7),
    body: commit.body,
  };
}

function generateChangelog() {
  const commits = getCommits();
  const parsedCommits = commits.map(parseCommit).filter(Boolean);

  if (parsedCommits.length === 0) {
    console.log('No conventional commits found.');
    return;
  }

  // Group commits by type
  const grouped = {};
  parsedCommits.forEach((commit) => {
    if (!grouped[commit.type]) {
      grouped[commit.type] = [];
    }
    grouped[commit.type].push(commit);
  });

  // Read existing changelog
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  let existingChangelog = '';
  if (fs.existsSync(changelogPath)) {
    existingChangelog = fs.readFileSync(changelogPath, 'utf-8');
  }

  // Generate new changelog entry
  let newEntry = `## [${version}] - ${new Date().toISOString().split('T')[0]}\n\n`;

  Object.keys(COMMIT_TYPES).forEach((type) => {
    if (grouped[type] && grouped[type].length > 0) {
      const { title, emoji } = COMMIT_TYPES[type];
      newEntry += `### ${emoji} ${title}\n\n`;

      grouped[type].forEach((commit) => {
        const scopeText = commit.scope ? `**${commit.scope}**: ` : '';
        newEntry += `- ${scopeText}${commit.subject} ([${commit.hash}])\n`;
      });

      newEntry += '\n';
    }
  });

  // Combine with existing changelog
  let fullChangelog;
  if (existingChangelog.includes('# Changelog')) {
    // Insert after the header
    const lines = existingChangelog.split('\n');
    const headerEndIndex = lines.findIndex((line, index) => index > 0 && line.startsWith('## '));

    if (headerEndIndex === -1) {
      // No existing versions, add after header
      fullChangelog = lines.slice(0, 3).join('\n') + '\n\n' + newEntry + lines.slice(3).join('\n');
    } else {
      fullChangelog =
        lines.slice(0, headerEndIndex).join('\n') +
        '\n' +
        newEntry +
        '\n' +
        lines.slice(headerEndIndex).join('\n');
    }
  } else {
    // Create new changelog
    fullChangelog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n${newEntry}`;
  }

  fs.writeFileSync(changelogPath, fullChangelog);
  console.log(`Changelog updated for version ${version}`);
}

generateChangelog();
