# Sutra 1.2.22: पूङः क्त्वा च

## Overview

**Sanskrit Text**: `पूङः क्त्वा च`  
**Transliteration**: pūṅaḥ ktvā ca  
**Translation**: For the root पुङ् (puṅ), with निष्ठा and क्त्वा (affixes) as well

## Purpose

This sutra establishes an exception to the कित् designation rule for the पुङ् root. When पुङ् combines with सेट् निष्ठा affixes (participial endings) or सेट् क्त्वा affixes (absolutive endings), the कित् designation is prevented. This is an अतिदेश (exception) rule that modifies the general कित् assignment patterns.

## Implementation

### Function Signature
```javascript
function sutra1222(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies the पुङ् root in compound words
- Detects सेट् निष्ठा affixes (participial forms)
- Detects सेट् क्त्वा affixes (absolutive forms)
- Prevents कित् designation when conditions are met
- Multi-script support (IAST and Devanagari)

### Dependencies
- **Sanskrit Utils**: `hasSetAugment`, `isKtvAffix`, `detectScript`, `validateSanskritWord`
- **Shared Functions**: पुङ् root detection and classification logic

## Usage Examples

### Basic Usage
```javascript
import { sutra1222 } from './index.js';

// Example 1: पुङ् + सेट् निष्ठा
const result1 = sutra1222('puṅkta', { hasSetAugment: true });
console.log(result1); // { applies: true, reason: "Prevents कित् for पुङ् with सेट् निष्ठा" }

// Example 2: पुङ् + सेट् क्त्वा  
const result2 = sutra1222('puṅktvā', { hasSetAugment: true });
console.log(result2); // { applies: true, reason: "Prevents कित् for पुङ् with सेट् क्त्वा" }
```

### Advanced Usage
```javascript
// Devanagari script example
const result3 = sutra1222('पुङ्क्त', { hasSetAugment: true });
console.log(result3); // { applies: true, reason: "Prevents कित् for पुङ् with सेट् निष्ठा" }

// Non-qualifying case
const result4 = sutra1222('gam', { hasSetAugment: false });
console.log(result4); // { applies: false, reason: "Not पुङ् root" }
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 32 tests covering:
- Basic functionality for both निष्ठा and क्त्वा affixes
- Multi-script support (IAST and Devanagari)
- Edge cases and negative test cases
- Integration with sanskrit-utils functions

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.22

# Run with coverage
npm test sutras/1.2.22 --coverage
```

## Technical Details

### Algorithm
1. Validate input and detect script
2. Extract potential root from compound word
3. Check if root matches पुङ् pattern
4. Verify affix is either सेट् निष्ठा or सेट् क्त्वा
5. Return exception status to prevent कित् designation

### Performance
- **Time Complexity**: O(n) where n is word length
- **Space Complexity**: O(1) constant space
- **Optimization Notes**: Early return for non-matching patterns

### Edge Cases
- Empty or invalid input handled gracefully
- Mixed script combinations properly detected
- Compound words with multiple morphemes parsed correctly
- अनिट् forms properly excluded

## Integration

### Related Sutras
- **1.2.23**: Continues the अतिदेश pattern for न्-उपधा + थ्/फ्-अन्त roots
- **1.2.24**: Extends to specific roots (वञ्च्, लुञ्च्, यृत्)
- **General कित् rules**: This sutra provides exceptions to standard कित् designation

### Used By
- Morphological analysis engines requiring precise कित् designation
- Sanskrit parsing systems handling participial and absolutive forms

## References

- **Panini's Ashtadhyayi**: 1.2.22 पूङः क्त्वा च
- **Implementation Notes**: Based on traditional grammatical interpretations
- **Test References**: Classical Sanskrit examples from grammatical texts

---

*Generated from template: SUTRA_README_TEMPLATE.md*
