## Sutra 1.2.36: छन्दसि वा एकश्रुतिः

## Overview
**Sanskrit Text**: `छन्दसि वा एकश्रुतिः`  
**Transliteration**: chandasi vā ekaśrutiḥ  
**Translation**: “In metrical (chandas) recitation a monotone (ekaśruti) delivery is optional.”

## Purpose
Adds an optional monotone prosody alternative under metrical recitation contexts so downstream consumers can select either canonical accenting or flattened monotone without losing earlier accent metadata.

## Implementation

### Function Signature
```javascript
import { sutra1236 } from './index.js';
const result = sutra1236(text, context = {}, options = {});
```

### Key Features
- Context‑triggered (no lexeme restriction).
- Produces option set (`primaryDecision: 'options'`).
- Coexists with other accent transformations (does not overwrite existing modes).

### Dependencies
- **Sanskrit Utils**: `accent-prosody-analysis.aggregateProsodyOptions`, `script-detection.detectScript`

## Usage Examples
```javascript
const r = sutra1236('agnim', { chandas: true });
console.log(r.options.map(o => o.mode)); // contains 'monotone'
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 1 test (positive chandas monotone option creation)

## Notes
Acts before domain‑blocking rules like 1.2.37 which may remove monotone in specialized hymn contexts.
