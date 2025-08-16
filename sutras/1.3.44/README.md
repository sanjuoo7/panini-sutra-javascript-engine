# Sutra 1.3.44: अपह्नवे ज्ञः

## Overview

**Sanskrit Text**: `अपह्नवे ज्ञः`
**Transliteration**: apahanave jñaḥ
**Translation**: With ज्ञ in the sense of denying, use Ātmanepada.

## Purpose

Classifies Ātmanepada usage for the root ज्ञ when expressing denial.

## Implementation

### Function Signature
```javascript
export function sutra1344(word, context = {}) {}
```

### Key Features
- Root ज्ञ detection (IAST/Devanagari)
- Semantic gating for denial

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

```javascript
import { sutra1344 } from './index.js';

sutra1344('जानाते', { meaning: 'deny' });
```

## Tests
- Denial positive
- Non-denial negative

---

*Generated from template: SUTRA_README_TEMPLATE.md*
