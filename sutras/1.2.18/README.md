# Sutra 1.2.18: न क्त्वा सेट्

## Overview

**Sanskrit Text**: `न क्त्वा सेट्`  
**Transliteration**: na ktvā seṭ  
**Translation**: Not क्त्वा (ktvā) with सेट् (seṭ/iṭ augment)

## Purpose

This sutra serves as an exception rule that prevents kit designation when the क्त्वा (ktvā) affix has the सेट् (iṭ) augment. This is a crucial exception to the general kit rules, ensuring that augmented forms of क्त्वा do not receive kit designation, which affects subsequent grammatical operations.

## Implementation

### Function Signature
```javascript
function sutra1218(root, affix, context = {}) {
    // Validates inputs and checks for क्त्वा with सेट् augment
    // Returns prevention analysis for kit designation
}
```

### Key Features
- Validates Sanskrit input using shared utilities
- Recognizes क्त्वा affixes including augmented forms (इक्त्वा, इत्वा)
- Detects सेट् augment from context or affix form
- Implements exception rule logic (prevents rather than applies kit)
- Supports both explicit context marking and implicit form detection
- Handles both Devanagari and IAST scripts

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection
  - `validateSanskritWord` - Input validation
  - `isKtvAffix` - क्त्वा affix identification (including augmented forms)
  - `hasSetAugment` - सेट् augment detection

## Usage Examples

### Basic Usage
```javascript
import { sutra1218 } from './index.js';

// Example 1: Explicit context marking
const result1 = sutra1218('कृ', 'क्त्वा', { hasSetAugment: true });
console.log(result1.preventsKit); // true
console.log(result1.kit); // false

// Example 2: Augment detected from form
const result2 = sutra1218('कृ', 'इक्त्वा');
console.log(result2.applies); // true
console.log(result2.kit); // false
```

### Advanced Usage
```javascript
// IAST with iṭ augment
const result3 = sutra1218('kṛ', 'iktvā');
console.log(result3.preventsKit); // true

// Mixed scripts
const result4 = sutra1218('स्था', 'itvā');
console.log(result4.applies); // true

// Various augment markings
const contexts = [
    { augment: 'सेट्' },
    { augment: 'seṭ' },
    { augment: 'iṭ' }
];
contexts.forEach(context => {
    const result = sutra1218('गम्', 'क्त्वा', context);
    console.log(result.preventsKit); // All true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 27 tests covering:
- Context-based सेट् augment detection
- Form-based augment detection (इक्त्वा, iktvā patterns)
- Both Devanagari and IAST scripts
- Mixed script combinations
- Negative cases (non-क्त्वा affixes, non-augmented forms)
- Various augment marking methods
- Exception rule behavior validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.18

# Run with coverage
npm test sutras/1.2.18 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates root and affix as Sanskrit words
2. **Affix Check**: Confirms affix is क्त्वा (including augmented forms)
3. **Augment Detection**: Checks for सेट् augment via context or form analysis
4. **Exception Application**: Prevents kit designation when both conditions are met
5. **Result Formation**: Returns prevention analysis with detailed reasoning

### Performance
- **Time Complexity**: O(1) - Constant time string operations
- **Space Complexity**: O(1) - Fixed memory usage
- **Optimization Notes**: Efficient pattern matching for augmented forms

### Edge Cases
- **Augmented forms**: Automatically recognizes इक्त्वा, इत्वा, iktvā, itvā
- **Context variations**: Handles multiple augment marking conventions
- **Non-augmented क्त्वा**: Correctly doesn't apply to regular क्त्वा
- **Exception behavior**: Always returns `kit: false` when rule applies

## Integration

### Related Sutras
- **1.2.8**: Base rule that this sutra provides exception to
- **1.2.16**: Parallel rule for different root-meaning combinations
- **1.2.17**: Related kit designation rule for specific roots

### Used By
- Kit designation analysis systems requiring exception handling
- Morphological processors dealing with augmented affixes
- Grammar engines implementing complete kit designation logic

## References

- **Panini's Ashtadhyayi**: 1.2.18 न क्त्वा सेट्
- **Implementation Notes**: Implements negative rule (न) as prevention rather than application
- **Test References**: Traditional examples of क्त्वा with िट् augment

---

*Generated from template: SUTRA_README_TEMPLATE.md*
