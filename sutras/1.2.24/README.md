# Sutra 1.2.24: वञ्चिलुञ्च्यृतश्च

## Overview

**Sanskrit Text**: `वञ्चिलुञ्च्यृतश्च`  
**Transliteration**: vañci luñc yṛtaś ca  
**Translation**: And (for the roots) वञ्च्, लुञ्च्, and यृत्

## Purpose

This sutra completes the अतिदेश (exception) sequence that began with 1.2.22, specifically naming three additional roots: वञ्च् (to deceive), लुञ्च् (to pluck), and यृत् (to go/move). Like 1.2.23, this rule is optional (विकल्प) due to the continuing च (ca) from the previous sutra, meaning कित् designation may optionally be prevented when these roots combine with सेट् क्त्वा affixes.

## Implementation

### Function Signature
```javascript
function sutra1224(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies specific roots: वञ्च्, लुञ्च्, यृत्
- Validates सेट् क्त्वा affix presence
- Implements optional (विकल्प) rule behavior from preceding sutra
- Handles root variations and phonetic changes
- Multi-script support (IAST and Devanagari)

### Dependencies
- **Sanskrit Utils**: `hasSetAugment`, `isKtvAffix`, `detectScript`, `validateSanskritWord`
- **Shared Functions**: Specific root identification and classification logic

## Usage Examples

### Basic Usage
```javascript
import { sutra1224 } from './index.js';

// Example 1: वञ्च् root with सेट् क्त्वा
const result1 = sutra1224('vañciktvā', { hasSetAugment: true });
console.log(result1); // { applies: true, reason: "Optional कित् prevention for वञ्च् root with सेट् क्त्वा" }

// Example 2: लुञ्च् root with सेट् क्त्वा
const result2 = sutra1224('luñciktvā', { hasSetAugment: true });
console.log(result2); // { applies: true, reason: "Optional कित् prevention for लुञ्च् root with सेट् क्त्वा" }

// Example 3: यृत् root with सेट् क्त्वा
const result3 = sutra1224('yṛtiktvā', { hasSetAugment: true });
console.log(result3); // { applies: true, reason: "Optional कित् prevention for यृत् root with सेट् क्त्वा" }
```

### Advanced Usage
```javascript
// Devanagari script example
const result4 = sutra1224('वञ्चिक्त्वा', { hasSetAugment: true });
console.log(result4); // { applies: true, reason: "Optional कित् prevention for वञ्च् root with सेट् क्त्वा" }

// Non-qualifying case (different root)
const result5 = sutra1224('gamiktvā', { hasSetAugment: true });
console.log(result5); // { applies: false, reason: "Not a वञ्च्/लुञ्च्/यृत् root" }

// Non-qualifying case (not सेट्)
const result6 = sutra1224('vañciktvā', { hasSetAugment: false });
console.log(result6); // { applies: false, reason: "Not सेट् क्त्वा affix" }
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 44 tests covering:
- All three specified roots (वञ्च्, लुञ्च्, यृत्)
- Optional rule behavior (विकल्प) inheritance
- Multi-script support (IAST and Devanagari)
- Root variation and phonetic change handling
- Integration with sanskrit-utils functions

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.24

# Run with coverage
npm test sutras/1.2.24 --coverage
```

## Technical Details

### Algorithm
1. Validate input and detect script
2. Extract root from compound word structure
3. Check if root matches वञ्च्, लुञ्च्, or यृत् patterns
4. Verify सेट् क्त्वा affix presence
5. Return optional exception status (inherited विकल्प)

### Performance
- **Time Complexity**: O(n) where n is word length
- **Space Complexity**: O(1) constant space
- **Optimization Notes**: Direct pattern matching for specified roots

### Edge Cases
- Root variations and phonetic changes in compounds handled
- Different script representations properly normalized
- Optional nature of rule (विकल्प) from 1.2.23 maintained
- Invalid inputs and non-matching patterns handled gracefully

## Integration

### Related Sutras
- **1.2.22**: Initiates the अतिदेश exception sequence
- **1.2.23**: Provides the विकल्प (optional) nature inherited by this sutra
- **Root classification sutras**: Utilizes general root identification principles

### Used By
- Morphological analysis systems processing specific Sanskrit roots
- कित् designation algorithms requiring precise exception handling
- Sanskrit parsing engines dealing with optional grammatical rules

## References

- **Panini's Ashtadhyayi**: 1.2.24 वञ्चिलुञ्च्यृतश्च
- **Implementation Notes**: Based on traditional root analysis and विकल्प interpretation
- **Test References**: Classical Sanskrit examples demonstrating these specific roots in क्त्वा forms

---

*Generated from template: SUTRA_README_TEMPLATE.md*
