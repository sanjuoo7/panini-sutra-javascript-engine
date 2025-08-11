# Sutra 1.2.23: नोपधात्थफान्ताद्वा

## Overview

**Sanskrit Text**: `नोपधात्थफान्ताद्वा`  
**Transliteration**: nopadhāt thaphāntād vā  
**Translation**: Optionally from (roots) having न् as उपधा and ending in थ् or फ्

## Purpose

This sutra continues the अतिदेश (exception) pattern established in 1.2.22, extending it to roots that have न् as their उपधा (penultimate consonant) and end in थ् or फ्. The वा (optionally) indicates this rule is विकल्प (optional), meaning कित् designation may or may not be prevented when these roots combine with सेट् क्त्वा affixes.

## Implementation

### Function Signature
```javascript
function sutra1223(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies न्-उपधा (न् as penultimate consonant) in roots
- Detects थ्-अन्त or फ्-अन्त (roots ending in थ् or फ्)
- Validates सेट् क्त्वा affix presence
- Implements optional (विकल्प) rule behavior
- Multi-script support (IAST and Devanagari)

### Dependencies
- **Sanskrit Utils**: `hasSetAugment`, `isKtvAffix`, `detectScript`, `validateSanskritWord`
- **Shared Functions**: उपधा analysis and root-ending classification logic

## Usage Examples

### Basic Usage
```javascript
import { sutra1223 } from './index.js';

// Example 1: न्-उपधा + थ्-अन्त root with सेट् क्त्वा
const result1 = sutra1223('manthuṅktvā', { hasSetAugment: true });
console.log(result1); // { applies: true, reason: "Optional कित् prevention for न्-उपधा + थ्-अन्त root with सेट् क्त्वा" }

// Example 2: न्-उपधा + फ्-अन्त root
const result2 = sutra1223('stanphuṅktvā', { hasSetAugment: true });
console.log(result2); // { applies: true, reason: "Optional कित् prevention for न्-उपधा + फ्-अन्त root with सेट् क्त्वा" }
```

### Advanced Usage
```javascript
// Devanagari script example
const result3 = sutra1223('मन्थुङ्क्त्वा', { hasSetAugment: true });
console.log(result3); // { applies: true, reason: "Optional कित् prevention for न्-उपधा + थ्-अन्त root with सेट् क्त्वा" }

// Non-qualifying case (not सेट्)
const result4 = sutra1223('manthuṅktvā', { hasSetAugment: false });
console.log(result4); // { applies: false, reason: "Not सेट् क्त्वा affix" }
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 43 tests covering:
- Basic functionality for न्-उपधा + थ्/फ्-अन्त patterns
- Optional rule behavior (विकल्प)
- Multi-script support (IAST and Devanagari)
- Complex consonant cluster analysis
- Integration with sanskrit-utils functions

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.23

# Run with coverage
npm test sutras/1.2.23 --coverage
```

## Technical Details

### Algorithm
1. Validate input and detect script
2. Extract root from compound word structure
3. Analyze उपधा position for न् consonant
4. Check root ending for थ् or फ् consonants
5. Verify सेट् क्त्वा affix presence
6. Return optional exception status

### Performance
- **Time Complexity**: O(n) where n is word length
- **Space Complexity**: O(1) constant space
- **Optimization Notes**: Efficient consonant cluster analysis for उपधा detection

### Edge Cases
- Complex consonant clusters in उपधा position handled correctly
- Consonant combinations like न्थ् and न्फ् properly identified
- Optional nature of rule (विकल्प) reflected in implementation
- Invalid or malformed inputs handled gracefully

## Integration

### Related Sutras
- **1.2.22**: Establishes the अतिदेश pattern this sutra extends
- **1.2.24**: Continues with specific root exceptions (वञ्च्, लुञ्च्, यृत्)
- **उपधा analysis sutras**: Utilizes general उपधा identification principles

### Used By
- Morphological analysis systems requiring precise उपधा analysis
- Sanskrit parsing engines handling optional grammatical rules
- कित् designation algorithms for complex root structures

## References

- **Panini's Ashtadhyayi**: 1.2.23 नोपधात्थफान्ताद्वा
- **Implementation Notes**: Follows traditional grammatical analysis for उपधा and अन्त identification
- **Test References**: Classical examples demonstrating थ्/फ्-अन्त roots with न्-उपधा

---

*Generated from template: SUTRA_README_TEMPLATE.md*
