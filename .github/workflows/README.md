# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the stadata-js project, following Git Flow workflow pattern.

## Workflows Overview

### 1. CI Workflow (main.yml)

**Triggers:**
- Pull requests to `main` or `develop`
- Pushes to `main` or `develop`

**Features:**
- Smart change detection (only run relevant jobs)
- Semantic PR title validation (Conventional Commits)
- ESLint and TypeScript type checking
- Jest tests with coverage
- Coverage threshold enforcement (80% minimum)
- Coverage reports as PR comments
- Spell checking for documentation
- Security scanning with npm audit
- Dependency review for PRs

### 2. Changelog Generation (generate-changelog.yml)

**Triggers:**
- Push to `release/**` branches

**Process:**
- Extracts version from branch name (`release/1.2.3`)
- Generates changelog from conventional commits
- Groups changes by type (feat, fix, docs, etc.)
- Creates PR with changelog updates
- Auto-merges if no conflicts

### 3. Version Bump (bump-version.yml)

**Triggers:**
- Push to `release/**` branches

**Process:**
- Extracts version from branch name
- Validates version format (semver)
- Updates package.json and package-lock.json
- Commits changes to release branch

### 4. Publish to npm (publish.yml)

**Triggers:**
- Version tags (e.g., `1.2.3` or `1.2.3-beta.1`)

**Process:**
- Validates tag matches package.json version
- Runs full test suite
- Builds the package
- Publishes to npm with provenance
- Verifies publication

**Environment:**
- Requires `NPM_TOKEN` secret

### 5. Create Release (create-release.yml)

**Triggers:**
- After successful npm publish (workflow_run)

**Process:**
- Extracts changelog for the version
- Adds installation instructions
- Creates GitHub release
- Marks pre-releases appropriately

### 6. Back Merge (back-merge.yml)

**Triggers:**
- When a release is published

**Process:**
- Merges `main` back to `develop`
- Auto-merges if no conflicts
- Creates PR if conflicts detected
- Creates `develop` branch if missing

### 7. Code Coverage (codecov.yml)

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

**Process:**
- Runs tests with coverage
- Uploads to Codecov
- Generates coverage summary
- Posts coverage table in step summary

**Environment:**
- Requires `CODECOV_TOKEN` secret (optional)

### 8. PR Bundle Size Analysis (pr-size-analysis.yml)

**Triggers:**
- Pull requests to `main` or `develop`

**Process:**
- Builds PR bundle
- Builds base branch bundle
- Compares sizes
- Posts comparison as PR comment
- Warns if size increase exceeds 10%

### 9. Cleanup (cleanup.yml)

**Triggers:**
- When PR is closed

**Process:**
- Deletes PR-specific artifacts
- Cleans up PR caches

## Git Flow Workflow

This project follows Git Flow:

```
main (production)
  |
  |-- release/1.2.3 (created from develop)
  |     |
  |     |-- Changelog generated
  |     |-- Version bumped
  |     |-- Merged to main (via PR)
  |     |-- Tagged (1.2.3)
  |     |-- Published to npm
  |     |-- GitHub release created
  |     |-- Back-merged to develop
  |
develop (integration)
  |
  |-- feature/my-feature (created from develop)
        |
        |-- CI runs on each push
        |-- Merged to develop (via PR)
```

## Release Process

### 1. Create Release Branch

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.2.3
git push origin release/1.2.3
```

### 2. Automated Steps

The following workflows run automatically:

1. **Changelog Generation** - Creates PR with updated CHANGELOG.md
2. **Version Bump** - Updates package.json version

### 3. Merge to Main

```bash
# Create PR from release/1.2.3 to main
# After PR is merged, tag the release
git checkout main
git pull origin main
git tag 1.2.3
git push origin 1.2.3
```

### 4. Publication & Back Merge

The following workflows run automatically:

1. **Publish to npm** - Publishes package to npm
2. **Create Release** - Creates GitHub release
3. **Back Merge** - Merges main back to develop

## Environment Variables & Secrets

### Required Secrets

- `NPM_TOKEN` - npm authentication token for publishing
  - Create at: https://www.npmjs.com/settings/your-username/tokens
  - Type: Automation token
  - Add to: Repository secrets

### Optional Secrets

- `CODECOV_TOKEN` - Codecov upload token
  - Create at: https://codecov.io/
  - Add to: Repository secrets

## Scripts

Supporting scripts are located in `.github/scripts/`:

- `check-coverage.js` - Validates coverage meets thresholds
- `generate-coverage-comment.js` - Creates coverage PR comments
- `generate-changelog.js` - Generates changelog from commits
- `extract-changelog-section.js` - Extracts version section
- `generate-release-notes.js` - Creates release notes
- `analyze-bundle-size.js` - Analyzes build output size
- `compare-bundle-sizes.js` - Compares PR vs base bundle sizes

## Conventional Commits

All commits should follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `revert`: Revert previous commit

### Examples

```
feat(api): add support for pagination
fix(auth): resolve token refresh issue
docs: update installation instructions
chore: bump dependencies
```

## Troubleshooting

### Workflow Not Running

1. Check if branch protection rules are configured
2. Verify workflow file syntax (YAML)
3. Check workflow permissions in repository settings

### Publishing Fails

1. Verify NPM_TOKEN is valid
2. Check package.json version matches tag
3. Ensure package name is available on npm

### Coverage Check Fails

1. Review coverage thresholds in `check-coverage.js`
2. Add more tests to improve coverage
3. Check Jest configuration

### Bundle Size Warning

1. Review the size comparison in PR comment
2. Check if large dependencies were added
3. Consider code splitting or tree shaking

## Best Practices

1. Always create feature branches from `develop`
2. Use conventional commits for all changes
3. Keep PRs focused and small
4. Write meaningful commit messages
5. Ensure tests pass before merging
6. Review coverage reports
7. Monitor bundle size changes
8. Update documentation as needed

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing](https://docs.npmjs.com/packages-and-modules)
