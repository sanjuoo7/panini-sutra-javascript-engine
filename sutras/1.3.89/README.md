# Sutra 1.3.89: न पादम्याङ्यमाङ्यसपरिमुहरुचिनृतिवदवसः

## Overview

**Sanskrit Text**: `न पादम्याङ्यमाङ्यसपरिमुहरुचिनृतिवदवसः`  
**Transliteration**: na pādamyāṅyamāṅyasaparimuharucinṛtivadavasaḥ  
**Translation**: Parasmaipada is not used after causatives of the following roots: pā, dam, āyam, āyas, parimuh, ruc, nṛt, vad, vas.

## Purpose

Introduce a blocking exception to adjacent Parasmaipada rules for a fixed list of roots in causative.

## Implementation

### Function Signature
```javascript
function sutra1389(word, context = {}) { /* ... */ }
```

### Key Features
- Detects membership in the exception list
- Requires causative
- Returns blocksParasmaipada: true

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

```javascript
import sutra1389 from './index.js';

sutra1389('pāyayati', { root: 'pā', hasCausative: true });
// → { applies: true, blocksParasmaipada: true }

// non-listed root: no block
sutra1389('bodhayati', { root: 'budh', hasCausative: true });
```

## Test Coverage

4 tests: positive for pā/vad, negative for others, non-causative rejection.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
