# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2025-11-15

### ✨ Features

- add universal structured data transformation for DynamicTable ([4b0281d])
- add data transformation utilities to DynamicTable ([cd26f34])

### 🐛 Bug Fixes

- exclude .map files from bundle size analysis ([8e74348])

### ♻️ Code Refactoring

- remove toTableData, toChartData, getColumnHeaders methods ([8e467ca])

### ✅ Tests

- update Subject entity tests for 4-parameter constructor ([477ed51])

### 🔧 Chores

- bump version to 0.3.0 for next development cycle ([a317eda])


## [0.2.0] - 2025-11-14

### ✨ Features

- add RelatedTable entity and improve dynamic table structure ([44f5725])

### 🐛 Bug Fixes

- exclude source maps from npm package to reduce bundle size ([8c2b207])
- add required periodId parameter to dynamic table test ([ec84d8b])
- correct dynamic table implementation to match API documentation ([b96cefa])
- use correct endpoint for dynamic table data ([2f2d427])
- improve back-merge workflow reliability ([481822e])

### 💎 Styles

- apply prettier formatting to tests ([08bdc0b])
- apply linter formatting fixes ([af2b96f])

### ♻️ Code Refactoring

- restructure dynamic table to match BPS API response format ([e2e9d94])

### ✅ Tests

- update dynamic table tests to match new entity structure ([d97540d])

### 🔧 Chores

- exclude source maps and dist files from PR diff analysis ([b97139b])


## [0.1.1] - 2025-11-14

### 🐛 Bug Fixes

- **ci**: add hotfix branch support to changelog and version bump workflows ([87c5c40])
- **network**: remove Content-Type header from GET requests to prevent CORS preflight ([1adfeb0])

### 🔧 Chores

- back-merge release 0.1.0 to develop ([df4d93f])
- bump version to 0.2.0 for next development cycle ([2f63388])


## [0.1.0] - 2025-11-14

### ✨ Features

- **trade**: add trade module for foreign trade data (#36) ([dc67989])
- **ci**: improve CI/CD workflows for manual control (#35) ([6edf027])
- **ci**: add next development version bump workflow ([d2f66ca])
- **dynamic-table**: add dynamic table module ([83a942a])
- **census**: add census module ([813a86f])
- **statistic-classification**: add statistic classification module ([181750a])
- **derived-variable**: add derived variable module ([869b990])
- **derived-period**: add derived period module ([2709045])
- **period**: add period module ([afce14d])
- **unit**: add unit module ([c1a9980])
- **vertical-variable**: add vertical variable module ([d8dc14d])
- **variable**: add variable module ([92c20ea])
- **strategic-indicator**: add strategic indicator module ([e6086ff])
- **subject-category**: add subject category module ([deed2a0])
- **subject**: add subject module ([d06026b])
- **ci**: make pr title validation case-insensitive ([65d418d])
- **news-category**: add NewsCategory module ([eff6b79])
- **ci**: automatically delete source branch after PR merge ([8a72499])
- add StaticTable module ([7201864])
- add PressRelease module ([ff35b62])
- add News module ([8692ef2])
- **ci**: add feature-level breakdown for coverage and bundle size ([59e3dfe])
- add Infographic module with entities, use cases, and SDK integration ([50b4e7b])
- add Publication module with entities, use cases, and SDK integration ([10db8a2])
- initial SDK setup with core architecture and Domain feature ([34bdeb8])

### 🐛 Bug Fixes

- **ci**: detect new CHANGELOG.md file in workflow ([514e2a6])
- **ci**: remove -dev suffix from next development version ([7db2d80])
- **ci**: remove manual commit step from changelog workflow ([536118c])
- **ci**: improve changelog generation and PR handling ([72394d7])
- **ci**: use PAT_TOKEN for workflow PR creation ([c449c7a])
- **ci**: handle commits without subject in changelog generation ([20e8544])
- sync coverage threshold check with jest config ([9a34ab3])
- add json-summary reporter to enable coverage reporting in CI ([226ca49])
- Make bundle size analysis non-blocking for initial PR ([9db97d2])
- Add PR write permissions to test job for coverage comments ([58790a4])
- Lower coverage threshold to 4% to match current coverage ([f0ff022])
- Lower coverage threshold to 10% and fix CI issues ([58d2273])
- Add package-lock.json for CI caching ([f51b3fe])

### 💎 Styles

- fix prettier formatting ([a0f0bad])
- fix prettier formatting issues ([53cfc44])

### ⚡ Performance Improvements

- optimize bundle size with minification and tree-shaking ([8fc9e61])

