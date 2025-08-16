# Sutra 1.3.90: वा क्यषः

## Overview

**Sanskrit Text**: `वा क्यषः`  
**Transliteration**: vā kayaṣaḥ  
**Translation**: Parasmaipada is optionally used after denominative verbs ending in kyaṣ.

## Purpose

Provide optional Parasmaipada for kyaṣ-denominative verbs.

## Implementation

### Function Signature
```javascript
function sutra1390(word, context = {}) { /* ... */ }
```

### Key Features
- Detects kyaṣ denominative via context
- Optional designation (isOptional: true)

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

```javascript
import sutra1390 from './index.js';

sutra1390('śaṅkayate', { isDenominative: true, affix: 'kyaṣ' });
// → applies: true, isOptional: true

// not kyaṣ denominative: not applied
sutra1390('śaṅkate', { isDenominative: true, affix: 'ṇic' });
```

---

*Generated from template: SUTRA_README_TEMPLATE.md*
