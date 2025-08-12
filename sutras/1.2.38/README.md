## Sutra 1.2.38: देवब्रह्मणोरनुदात्तः

## Overview
**Sanskrit Text**: `देवब्रह्मणोरनुदात्तः`  
**Transliteration**: deva-brahmaṇor anudāttaḥ  
**Translation**: “In (that domain) the words ‘deva’ and ‘brāhmaṇa’ take (the) anudātta (accent).”

## Purpose
Applies lexical accent override within the Subrahmaṇyā hymn domain: targets `deva` and `brāhmaṇa`, forcing an anudātta realization that supersedes general svarita→udātta substitutions while coexisting with other non-conflicting modes.

## Implementation

### Function Signature
```javascript
import { sutra1238 } from './index.js';
const result = sutra1238(text, context = {}, options = {});
```

### Key Features
- Ensures domain flag persists (`subrahmanya: true`).
- Adds `lexical-anudatta` mode for target lexemes.
- Leaves non-target words to domain transformations of 1.2.37.

### Dependencies
- **Sanskrit Utils**: `accent-prosody-analysis.aggregateProsodyOptions`, `script-detection.detectScript`

## Usage Examples
```javascript
const r1 = sutra1238('deva');
console.log(r1.options.map(o => o.mode)); // contains 'lexical-anudatta'

const r2 = sutra1238('â');
console.log(r2.options.map(o => o.mode)); // may include 'udaatta-replaced' but NOT 'lexical-anudatta'
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 2 tests (target lexical override, non-target behavior).

## Notes
Applies after domain restructuring (1.2.37) to ensure lexical priority layering.
