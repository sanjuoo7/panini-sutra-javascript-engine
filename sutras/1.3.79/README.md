# Sutra 1.3.79: अनुपराभ्यां कृञः

## Overview

**Sanskrit Text**: `अनुपराभ्यां कृञः`  
**Transliteration**: anuparābhyāṁ kṛñaḥ  
**Translation**: After the verb kṛ (to do/make) when preceded by both anu- and para-, Parasmaipada is used in active voice, even when the fruit accrues to the agent (especially in senses like divulging).

## Purpose

This sutra sets a Parasmaipada override for the root कृ (kṛ) when both अनु and पर prefixes are present in an active (कर्तरि) construction. It blocks the otherwise applicable Ātmanepada rules driven by agent-benefit or other preceding conditions.

## Implementation

### Function Signature
```javascript
function sutra1379(word, context = {}) {
    // Determines Parasmaipada for kṛ with anu+para in active voice
}
```

### Key Features
- Detects कृ (kṛ) root via context/surface patterns
- Requires both अनु and पर upasargas (canonicalized across variants)
- Active voice (कर्तरि) enforcement
- Explicitly blocks Ātmanepada rules when it applies
- Multi-script support (Devanagari and IAST)

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Shared Functions**: root and upasarga pattern handling (inline normalization here)

## Usage Examples

### Basic Usage
```javascript
import { sutra1379 } from './index.js';

// Devanagari example
const r1 = sutra1379('अनुपरकरोति', {
  root: 'कृ',
  upasarga: ['अनु', 'पर'],
  isActiveVoice: true,
  benefitsAgent: true
});
// → { applies: true, isParasmaipada: true, blocksAtmanepada: true }

// IAST example
const r2 = sutra1379('anuparakaroti', {
  root: 'kṛ',
  upasarga: ['anu', 'para'],
  isActiveVoice: true
});
// → applies true
```

### Advanced Usage
```javascript
// Surface-detected upasargas (no explicit context)
const r3 = sutra1379('अनुपरकृतम्', { isActiveVoice: true });

// Semantic cue helpful but optional
const r4 = sutra1379('anuparakaroti', { meaning: 'to divulge' });
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 5 tests covering:
- Applicability with both अनु and पर
- IAST and Devanagari script handling
- Missing one upasarga (negative)
- Passive voice exclusion
- Input validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.79

# Run with coverage
npm test sutras/1.3.79 --coverage
```

## Technical Details

### Algorithm
1. Validate input and detect script
2. Detect root कृ (kṛ) via context or surface patterns
3. Canonicalize upasargas; ensure both अनु and पर are present
4. Verify active voice
5. Apply Parasmaipada and block Ātmanepada

### Performance
- **Time Complexity**: O(n) for surface/prefix scans
- **Space Complexity**: O(1)
- **Optimization Notes**: Early returns on failed conditions

### Edge Cases
- Upasarga variants (परि/पार) normalized to para when relevant
- Works with/without explicit context if surface prefixes present
- Passive voice or missing prefixes → non-application

## Integration

### Related Sutras
- **1.3.72**: स्वरितञितः कर्त्रभिप्राये क्रियाफले (agent-benefit → Ātmanepada)
- **1.3.74–1.3.77**: Various Ātmanepada rules (this sutra overrides when applicable)
- **1.3.78**: शेषात् कर्तरि परस्मैपदम् (default Parasmaipada; 1.3.79 is specific)

### Used By
- Voice assignment pipeline for prefixed kṛ forms
- Disambiguation where agent-benefit rules might otherwise apply

## References

- **Panini's Ashtadhyayi**: 1.3.79 अनुपराभ्यां कृञः
- **Commentarial Note**: Applies prominently in senses like ‘divulging’ (prakaṭa/udghoṣa)

---

*Generated from template: SUTRA_README_TEMPLATE.md*
