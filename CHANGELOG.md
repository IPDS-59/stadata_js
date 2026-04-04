# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-04-04

### ✨ Features

- implement global init pattern (Option C) ([d57e594])
- update client API to bound composables pattern + restore pnpm + update docs ([ecf79fb])
- **docs**: expand English API docs and playground to all 20+ endpoints ([05b4d62])

### 🐛 Bug Fixes

- **lint**: add explicit return types and fix prettier formatting on all composables ([2490313])
- resolve merge conflict — keep version 1.2.0 from develop ([9c899fc])
- **ci**: use npm ci for docs deployment on main branch ([83adc27])
- normalize repository.url format for npm publish ([b62c70c])

### 🔧 Chores

- back-merge release 1.1.0 to develop (with conflicts) ([810947c])
- bump version to 1.2.0 for next development cycle ([ee79faf])


## [1.1.0] - 2026-04-03

### ✨ Features

- **playground**: add interactive BPS API playground ([f0b4cca])
- **docs**: add VitePress documentation site with GitHub Pages deployment ([60dbe51])

### 🐛 Bug Fixes

- **lint**: include tsconfig.test.json in eslint parserOptions.project ([056bb8e])
- update package-lock.json with vitepress dependencies ([a714111])
- **ci**: use correct npm package name in deployment url ([a165acd])

### 💎 Styles

- fix formatting for prettier 3.8.0 compatibility ([89d849e])

### 👷 Continuous Integration

- trigger CI after base branch change to develop ([6bc05e5])
- **deps**: bump dorny/paths-filter from 3 to 4 ([85bed7d])
- **deps**: bump marocchino/sticky-pull-request-comment from 2 to 3 ([c9b2958])
- **deps**: bump geekyeggo/delete-artifact from 5 to 6 ([a7a39d3])
- **deps**: bump actions/upload-artifact from 6 to 7 ([430b305])
- **deps**: bump peter-evans/create-pull-request from 7 to 8 ([e1bf4e5])
- **deps**: bump actions/upload-artifact from 5 to 6 ([f57a405])
- **deps**: bump actions/checkout from 4 to 6 ([1a92989])

### 🔧 Chores

- upgrade dependencies and fix TypeScript 6 compatibility ([c7fb7d9])
- bump version to 0.5.0 for next development cycle ([d1ca9ff])
- **deps**: refresh package lockfile ([54360d5])
- **logger**: remove unused eslint-disable comments ([a5ea389])
- **eslint**: migrate to flat config ([dbbf61c])
- **deps-dev**: bump @typescript-eslint/eslint-plugin ([a4c714e])
- **deps-dev**: bump @typescript-eslint/parser from 8.54.0 to 8.57.1 ([b6fcf9e])
- **deps-dev**: bump rollup-plugin-visualizer from 6.0.5 to 7.0.1 ([2f081a0])
- **deps-dev**: bump eslint from 9.39.2 to 10.1.0 ([3a3061b])
- **deps-dev**: bump @types/node from 25.2.0 to 25.5.0 ([c527fd5])
- **deps-dev**: bump jest from 30.2.0 to 30.3.0 ([9d7366c])
- **deps-dev**: bump @rollup/plugin-terser from 0.4.4 to 1.0.0 ([6521aa6])
- **deps-dev**: bump @typescript-eslint/eslint-plugin ([3fde28d])
- **deps-dev**: bump @typescript-eslint/parser from 8.53.1 to 8.54.0 ([e4f53ba])
- **deps-dev**: bump @types/node from 25.0.10 to 25.2.0 ([788bddd])
- **deps-dev**: bump @typescript-eslint/eslint-plugin ([195b051])
- **deps-dev**: bump @types/node from 24.10.1 to 25.0.9 ([57dc12c])
- **deps-dev**: bump @typescript-eslint/parser from 8.47.0 to 8.53.0 ([283485b])
- **deps-dev**: bump prettier from 3.6.2 to 3.8.0 ([9828533])
- **deps-dev**: bump eslint-plugin-prettier from 5.5.4 to 5.5.5 ([5392155])
- **deps-dev**: bump @typescript-eslint/eslint-plugin ([9592ad6])
- **deps-dev**: bump eslint from 9.39.1 to 9.39.2 ([b5dbbb1])
- **deps-dev**: bump ts-jest from 29.4.5 to 29.4.6 ([cba5aa1])
- **deps-dev**: bump @typescript-eslint/parser from 8.46.4 to 8.47.0 ([00a9f0b])
- **deps-dev**: bump @typescript-eslint/eslint-plugin ([4603324])


## [0.4.0] - 2025-11-15

### 🐛 Bug Fixes

- add missing properties to Variable entity ([e9e1d5d])

### 📚 Documentation

- update browser test to show new Variable properties ([5f62e08])

### 🔧 Chores

- bump version to 0.4.0 for next development cycle ([4498f9a])


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

