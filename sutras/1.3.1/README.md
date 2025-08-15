# Sutra 1.3.1: भूवादयो धातवः

## Overview
**Sanskrit Text**: `भूवादयो धातवः`  
**Transliteration**: bhūvādayo dhātavaḥ  
**Translation**: The verbal roots (dhātus) are the set beginning with the root bhū.

## Purpose
Establishes the technical term धातु (dhātu, verbal root) for items enumerated in the canonical dhātu-pāṭha (root list). This foundational designation enables downstream verbal morphology rules (affix selection, augments, guṇa/vṛddhi environments, voice, tense/mood operations).

## Implementation

### Function Signature
```javascript
export function applySutra1_3_1(form, options = {}) { /* returns analysis object */ }
export function isDhatu(form, options = {}) { /* boolean */ }
```

### Key Features
- Multi‑script input (IAST & Devanagari) with normalization
- Seed dhātu set (extensible) with registration hook
- Lightweight analysis object (script, normalized form, reason)
- Heuristic inherent "a" restoration for short Devanagari citation forms (e.g., गम् → gam)

### Dependencies
- **sanskrit-utils**: `script-detection`, `transliteration`, `validation`
- **Internal heuristic**: Minimal inherent vowel restoration

## Usage Examples
```javascript
import { applySutra1_3_1, isDhatu } from './index.js';

isDhatu('bhū');      // true
isDhatu('भू');       // true
isDhatu('gam');      // true
isDhatu('गम्');      // true (heuristic reconstruction → gam)
isDhatu('bhavati');  // false (conjugated form)

const analysis = applySutra1_3_1('गम्');
/* analysis = {
 *  sutra: '1.3.1',
 *  input: 'गम्',
 *  script: 'Devanagari',
 *  normalized: 'gm',
 *  isDhatu: true,
 *  root: 'gam',
 *  reason: 'listed-root'
 * }
 */
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 6 tests covering:
- Positive roots (IAST & Devanagari)
- Negative / derived / inflected forms
- Analysis object structure
- Invalid input handling

### Running Tests
```bash
# This sutra's tests
npm test sutras/1.3.1

# With coverage (entire project)
npm run test:coverage
```

## Technical Details
### Algorithm
1. Sanitize & normalize script to IAST.
2. Quick heuristics reject obviously invalid / derived forms.
3. Direct membership check in canonical seed set.
4. If Devanagari consonant-final transliteration fails (e.g., gm), attempt inherent "a" restoration (gam).
5. Return structured analysis.

### Performance
- Time Complexity: O(1) per lookup (Set membership)
- Space Complexity: O(n) for root set (small seed, extensible)
- Optimizations: Early heuristic rejection minimizes normalization overhead for invalid forms.

### Edge Cases
- Empty / null → `isDhatu: false`, reason `invalid-input`
- Conjugated or derived forms (bhavati, bhūta) rejected by heuristic suffix filter
- Mixed / malformed input with digits or separators rejected
- Final consonant Devanagari citation forms supported (गम्, पच्, वद्)

## Integration
### Related Sutras
- **1.2.45–1.2.46**: Prātipadika classification (contrast with dhātu)
- **Upcoming 1.3.x**: Will rely on dhātu designation for sārvādhātuka / ārdhadhātuka distinctions

### Used By (Future)
- Tense/mood affix selection
- Voice (parasmaipada / ātmanepada) determinations
- Augment and strengthening rules (guṇa / vṛddhi contexts)

## References
- Pāṇini, Aṣṭādhyāyī 1.3.1 (bhūvādayo dhātavaḥ)
- Traditional dhātu-pāṭha (root list) – not fully embedded; seed subset implemented

---
*Generated from template with project-specific adaptations.*
