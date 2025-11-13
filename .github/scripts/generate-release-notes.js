#!/usr/bin/env node

/**
 * Generate release notes from commits
 */

const { execSync } = require('child_process');

const version = process.argv[2];

if (!version) {
  console.error('Usage: node generate-release-notes.js <version>');
  process.exit(1);
}

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
    } catch {
      // No tags exist, get all commits
      lastTag = '';
    }

    const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
    const commits = execSync(`git log ${range} --pretty=format:"%H|%s"`, {
      encoding: 'utf-8',
    })
      .split('\n')
      .filter(Boolean);

    return commits.map((commit) => {
      const [hash, subject] = commit.split('|');
      return { hash, subject };
    });
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    return [];
  }
}

function parseCommit(commit) {
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
  };
}

function generateReleaseNotes() {
  const commits = getCommits();
  const parsedCommits = commits.map(parseCommit).filter(Boolean);

  if (parsedCommits.length === 0) {
    console.log(`## What's Changed\n\nNo significant changes in this release.`);
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

  let notes = `## What's Changed\n\n`;

  Object.keys(COMMIT_TYPES).forEach((type) => {
    if (grouped[type] && grouped[type].length > 0) {
      const { title, emoji } = COMMIT_TYPES[type];
      notes += `### ${emoji} ${title}\n\n`;

      grouped[type].forEach((commit) => {
        const scopeText = commit.scope ? `**${commit.scope}**: ` : '';
        notes += `- ${scopeText}${commit.subject} (${commit.hash})\n`;
      });

      notes += '\n';
    }
  });

  console.log(notes);
}

generateReleaseNotes();
