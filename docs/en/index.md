---
layout: home

hero:
  name: "Stadata JS"
  text: "SDK for BPS WebAPI"
  tagline: Access Indonesia's official statistical data with TypeScript/JavaScript — type-safe, modern, and easy to use.
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: API Reference
      link: /en/api/domains

features:
  - icon: 🔷
    title: Full TypeScript Support
    details: Complete type definitions for all API endpoints with IntelliSense support.

  - icon: 🏗️
    title: Clean Architecture
    details: Follows Clean Architecture principles with clear separation of concerns.

  - icon: ✅
    title: Result Pattern
    details: Uses neverthrow for elegant, functional error handling. No more messy try-catch.

  - icon: 📄
    title: Pagination Support
    details: Built-in pagination handling for all list endpoints.
---

## Quick Install

```bash
npm install stadata-js
```

## Quick Example

```typescript
import { StadataJS, DataLanguage } from 'stadata-js';

await StadataJS.init({ apiKey: 'your-api-key' });
const stadata = StadataJS.instance;

const result = await stadata.list.domains({ lang: DataLanguage.EN });

result.match(
  ({ data }) => data.forEach(d => console.log(d.id, d.name)),
  (err) => console.error(err.message)
);
```
