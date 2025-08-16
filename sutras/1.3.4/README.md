# Sutra 1.3.4: न विभक्तौ तुस्माः

## Overview

**Sanskrit Text**: `न विभक्तौ तुस्माः`  
**Transliteration**: na vibhaktau tusmāḥ  
**Translation**: TUSMĀḤ consonants are not [considered it-markers] in vibhakti [affixes]

## Purpose

This sutra creates a specific exception to Sutra 1.3.3 (हलन्त्यम्) which states that final consonants are it-markers. Sutra 1.3.4 specifies that when TUSMĀḤ consonants (dental consonants त्, थ्, द्, ध्, न् plus स् and म्) appear at the end of vibhakti (case) affixes, they are NOT considered it-markers and should be retained in the final form.

## Implementation

### Function Signature
```javascript
function isVibhaktiException(form, options = {}) {
    // Returns analysis of whether TUSMĀḤ exception applies
}
```

### Key Features
- Identifies TUSMĀḤ consonants (dental consonants + स्, म्)
- Detects vibhakti context through patterns or explicit specification
- Supports both IAST and Devanagari scripts
- Provides detailed analysis with consonant classification
- Prioritizes explicit affix type over pattern detection

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` for script identification
  - `isConsonant` for consonant validation
  - `getConsonantArticulation` for consonant classification
  - `validateSanskritWord` for input validation

## Usage Examples

### Basic Usage
```javascript
import { isVibhaktiException } from './index.js';

// Example 1: Vibhakti ending with स्
const result1 = isVibhaktiException('devais');
console.log(result1); 
// { isException: true, finalConsonant: 's', exceptionApplies: true, ... }

// Example 2: Non-vibhakti context
const result2 = isVibhaktiException('gam');
console.log(result2); 
// { isException: false, finalConsonant: 'm', exceptionApplies: false, ... }
```

### Advanced Usage
```javascript
// Explicit affix type specification
const result3 = isVibhaktiException('devais', { affixType: 'vibhakti' });
// Forces vibhakti context

const result4 = isVibhaktiException('devais', { affixType: 'pratyaya' });
// Forces non-vibhakti context, exception won't apply

// Devanagari support
const result5 = isVibhaktiException('देवैस्');
// Handles Devanagari script automatically
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 36 tests covering:
- Positive cases (TUSMĀḤ consonants in vibhakti context)
- Negative cases (non-TUSMĀḤ or non-vibhakti)
- Affix type specification
- Dental consonant analysis
- स् and म् specific cases
- Common vibhakti pattern detection
- Return structure validation
- Error handling
- Integration with Sutra 1.3.3

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.4

# Run with coverage
npm test sutras/1.3.4 --coverage
```

## Technical Details

### Algorithm
1. Validate input using `validateSanskritWord`
2. Extract final consonant, handling halanta cases
3. Check if final consonant is in TUSMĀḤ set
4. Determine vibhakti context through:
   - Explicit options (`affixType`, `isVibhakti`)
   - Pattern matching against common vibhakti endings
5. Apply exception logic: TUSMĀḤ + vibhakti = exception applies

### Performance
- **Time Complexity**: O(1) for most operations, O(k) for pattern matching where k is number of patterns
- **Space Complexity**: O(1) constant space usage
- **Optimization Notes**: Pattern matching optimized with early termination and length checks

### Edge Cases
- **Halanta handling**: Properly extracts consonant from Devanagari halanta forms (e.g., "त्")
- **Empty input**: Returns structured error response
- **Invalid input**: Type validation with detailed error information
- **Ambiguous patterns**: Prioritizes explicit specification over pattern detection

## Integration

### Related Sutras
- **1.3.3 (हलन्त्यम्)**: This sutra creates an exception to the general it-marker rule
- **1.3.5-1.3.8**: Part of the same series dealing with it-marker exceptions

### Used By
- Forms the foundation for vibhakti processing in the larger grammar engine
- Referenced by case ending analyzers
- Used in morphological decomposition algorithms

## References

- **Panini's Ashtadhyayi**: 1.3.4 न विभक्तौ तुस्माः
- **Implementation Notes**: TUSMĀḤ defined as त्-उ-स्-म्-आ-ह् (dental series + स् + म्)
- **Test References**: Classical Sanskrit declension patterns for test case validation

---

*Generated from template: SUTRA_README_TEMPLATE.md*
