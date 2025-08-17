# Sutra 1.4.15: नः क्ये

## Overview

**Sanskrit Text**: `नः क्ये`  
**Transliteration**: naḥ kye  
**Translation**: The word-form ending in न्, is called पद when क्य follows

## Purpose

This sutra establishes the पद (pada) saṃjñā for words ending in the consonant न् when followed by affixes from the क्य-class (क्यच्, क्यङ्, क्यष्). This designation is crucial for determining which morphological rules apply during word formation.

## Implementation

### Function Signature
```javascript
function sutra1415(word, context = {}) {
    // word: Sanskrit stem ending in न्
    // context.affix: क्य-class affix (क्यच्, क्यङ्, क्यष्)
    // Returns: {applies, saṃjñā, reason, confidence, ...}
}
```

### Key Features
- **पद saṃjñā Assignment**: Assigns पद designation to न्-ending words before क्य affixes
- **Multi-script Support**: Works with both Devanagari and IAST transliteration
- **Affix Validation**: Recognizes क्यच्, क्यङ्, and क्यष् affixes in both scripts
- **Comprehensive Validation**: Input validation and error handling
- **Backward Compatibility**: Maintains legacy property names

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Core Classification**: Script detection and word validation utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1415 } from './index.js';

// Example 1: गमन् + क्यच् → पद saṃjñā
const result1 = sutra1415('गमन्', { affix: 'क्यच्' });
console.log(result1); 
// { applies: true, saṃjñā: 'पद', confidence: 0.95, ... }

// Example 2: यान् + क्यङ् → पद saṃjñā  
const result2 = sutra1415('यान्', { affix: 'क्यङ्' });
console.log(result2);
// { applies: true, saṃjñā: 'पद', reason: 'Word "यान्" ends in न् and affix "क्यङ्" is क्य-class, hence assigned पद saṃjñā' }
```

### IAST Script Usage
```javascript
// IAST transliteration support
const result3 = sutra1415('gaman', { affix: 'kyac' });
console.log(result3);
// { applies: true, saṃjñā: 'पद', script: 'IAST', ... }

const result4 = sutra1415('dhyan', { affix: 'kyaṣ' });
console.log(result4);
// { applies: true, saṃjñā: 'पद', ... }
```

### Negative Cases
```javascript
// Word not ending in न्
const result5 = sutra1415('गम्', { affix: 'क्यच्' });
console.log(result5);
// { applies: false, saṃjñā: null, reason: 'Word "गम्" does not end in न्' }

// Non-क्य affix
const result6 = sutra1415('गमन्', { affix: 'तु' });
console.log(result6);
// { applies: false, saṃjñā: null, reason: 'Word "गमन्" or affix "तु" is not क्य-class' }
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 19 tests covering:
- Basic पद saṃjñā assignment with all क्य-class affixes
- IAST script support and mixed-script scenarios
- Negative cases (non-न् endings, non-क्य affixes)
- Edge cases (compound words, vowel endings)
- Error handling (invalid inputs, missing context)
- Backward compatibility with legacy function names

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.15

# Run with coverage
npm test sutras/1.4.15 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates word and affix inputs
2. **Script Detection**: Determines if input is Devanagari or IAST
3. **न् Ending Check**: Verifies word ends in consonant न् (not न + vowel)
4. **क्य Affix Check**: Confirms affix belongs to क्य-class
5. **Rule Application**: Assigns पद saṃjñā if both conditions met

### Performance
- **Time Complexity**: O(1) - constant time lookups
- **Space Complexity**: O(1) - minimal memory usage
- **Optimization Notes**: Pre-compiled affix lists for efficient matching

### Edge Cases
- **Compound Words**: Correctly handles compound words ending in न्
- **Vowel vs Consonant**: Distinguishes न् (consonant) from न + vowel
- **Script Mixing**: Supports mixed Devanagari/IAST contexts
- **Affix Variants**: Recognizes all three क्य-class affixes (क्यच्, क्यङ्, क्यष्)

## Integration

### Related Sutras
- **1.4.14**: Previous पद saṃjñā rule for sup/tiṅ endings
- **1.4.16**: Next पद saṃjñā rule for सित् affixes
- **1.1.62**: General principles of saṃjñā assignment

### Used By
- Morphological analysis modules requiring पद identification
- Sandhi rule processors that need word boundary detection
- Word formation engines using क्य-class suffixation

## References

- **Panini's Ashtadhyayi**: 1.4.15 नः क्ये
- **Implementation Notes**: Follows traditional grammatical interpretation
- **Test References**: Classical examples from Sanskrit grammatical literature

---

*Generated from template: SUTRA_README_TEMPLATE.md*
