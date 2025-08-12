## Sutra 1.2.37: न सुब्रह्मण्यायां स्वरितस्य तूदात्तः

## Overview
**Sanskrit Text**: `न सुब्रह्मण्यायां स्वरितस्य तूदात्तः`  
**Transliteration**: na subrahmaṇyāyāṃ svaritasya tūdāttaḥ  
**Translation**: “In (the) Subrahmaṇyā (recitation), a svarita does not remain (so); instead (it is) udātta, and monotone is not applied.”

## Purpose
Establishes a recitation domain override: suppresses monotone (ekaśruti) options added by 1.2.36 and substitutes svarita vowels with an udātta equivalent, preparing for subsequent lexical overrides (1.2.38).

## Implementation

### Function Signature
```javascript
import { sutra1237 } from './index.js';
const result = sutra1237(text, context = {}, options = {});
```

### Key Features
- Domain flag (`subrahmanya: true`) injected to aggregator.
- Filters out monotone modes.
- Adds `udaatta-replaced` mode when original prosody included svarita.
- Chains cleanly with lexical overrides (1.2.38) and global accent metadata.

### Dependencies
- **Sanskrit Utils**: `accent-prosody-analysis.aggregateProsodyOptions`, `script-detection.detectScript`
- **Domain Utilities**: `accent-domain-rules` (integrated internally by aggregator)

## Usage Examples
```javascript
const r = sutra1237('â'); // svarita a representation
console.log(r.options.map(o => o.mode)); // includes 'udaatta-replaced', excludes monotone
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 1 test verifying udātta replacement and monotone suppression.

## Notes
Ordering: Apply after optional monotone generation (1.2.36) but before lexical accent overrides (1.2.38).
