## Sutra 1.2.42: तत्पुरुषः समानाधिकरणः कर्मधारयः

## Overview
**Sanskrit Text**: `तत्पुरुषः समानाधिकरणः कर्मधारयः`  
**Transliteration**: tatpuruṣaḥ samānādhikaraṇaḥ karmadhārayaḥ  
**Translation**: “A tatpuruṣa (compound) whose members are in the same case is (called) karmadhāraya.”

## Purpose
Defines the karmadhāraya subtype of tatpuruṣa compounds, establishing a saṃjñā (technical designation) used by later rules that depend on compound role classification.

## Implementation

### Function Signature
```javascript
import { applySutra1_2_42 } from './index.js';
const result = applySutra1_2_42(compoundObject);
```

### Key Features
- Delegates analysis to shared compound utility.
- Returns subtype plus explanatory reason.
- Non-mutating; can be composed with subsequent upasarjana determinations (1.2.43–1.2.44).

### Dependencies
- **Sanskrit Utils**: `compound-analysis.classifyTatpurushaSubtype`

## Usage Examples
```javascript
const compound = { type:'tatpurusha', members:[{form:'mahā', case:'nom'},{form:'rāja', case:'nom'}] };
const r = applySutra1_2_42(compound);
console.log(r.subtype); // 'karmadharaya'
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 2 tests (uniform case positive, mixed case negative)

## Notes
Forms a prerequisite classification feeding broader compound role annotation (Pattern H).
