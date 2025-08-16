# Sutra 1.3.43: अनुपसर्गाद्वा

## Overview

**Sanskrit Text**: `अनुपसर्गाद्वा`
**Transliteration**: anupasargād vā
**Translation**: With क्रम् and no prefix, Ātmanepada is optional.

## Purpose

Allows Ātmanepada optionally for the root क्रम् when there is no upasarga (prefix).

## Implementation

### Function Signature
```javascript
export function sutra1343(word, context = {}) {}
```

### Key Features
- Detects absence of prefixes via context or surface heuristics
- Marks optionality in the result
- Multi-script validation

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

```javascript
import { sutra1343 } from './index.js';

const r1 = sutra1343('क्रमते', { prefixes: [] }); // optional Ātmanepada permitted
const r2 = sutra1343('vikramate', { prefixes: ['vi'] }); // does not apply
```

## Test Coverage

- Positive optional case
- Negative when any prefix exists

---

*Generated from template: SUTRA_README_TEMPLATE.md*
