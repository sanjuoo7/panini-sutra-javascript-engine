# Sutra 1.3.6: षः प्रत्ययस्य

## Overview

**Sanskrit Text**: `षः प्रत्ययस्य`  
**Transliteration**: ṣaḥ pratyayasya  
**Translation**: The initial ष् of an affix [is an it-marker]

## Purpose

This sutra defines that the retroflex sibilant ष् (ṣ) when it appears at the beginning of pratyayas (affixes) in grammatical instruction is considered an it-marker (इत्). This it-marker should be deleted from the final form according to the general rule that it-markers are not pronounced.

## Implementation

### Function Signature
```javascript
function hasInitialShaItMarker(form, options = {}) {
    // Returns analysis of initial ष्/ṣ it-marker in pratyaya context
}
```

### Key Features
- Identifies initial ष् (retroflex sibilant) in both IAST and Devanagari
- Specifically targets pratyaya (affix) context
- Properly handles Devanagari halanta forms (ष्)
- Distinguishes ष्/ṣ from regular स्/s
- Provides processed form with it-marker removed
- Includes helper functions for removal and validation

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` for script identification
  - `validateSanskritWord` for input validation

## Usage Examples

### Basic Usage
```javascript
import { hasInitialShaItMarker } from './index.js';

// Example 1: ष् in IAST pratyaya
const result1 = hasInitialShaItMarker('ṣas', { isPratyaya: true });
console.log(result1); 
// { hasItMarker: true, itConsonant: 'ṣ', processedForm: 'as', ... }

// Example 2: No initial ष्
const result2 = hasInitialShaItMarker('as', { isPratyaya: true });
console.log(result2); 
// { hasItMarker: false, itConsonant: null, processedForm: null, ... }
```

### Advanced Usage
```javascript
// Element type specification
const result3 = hasInitialShaItMarker('ष्त्वा', { elementType: 'affix' });
// Recognizes affix as pratyaya context

const result4 = hasInitialShaItMarker('ṣyati', { isGrammaticalInstruction: true });
// Processes in grammatical instruction context

// Helper function usage
import { removeInitialShaItMarker, isShaItMarker } from './index.js';

const processed = removeInitialShaItMarker('ष्यति', { isPratyaya: true });
// Returns: 'यति'

const isRetroflex = isShaItMarker('ṣ', 'IAST');
// Returns: true

const isRegularS = isShaItMarker('s', 'IAST');
// Returns: false
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 37 tests covering:
- Positive cases (ष्/ṣ in pratyaya context)
- Negative cases (no ष्/ṣ or non-pratyaya context)
- Pratyaya context requirements
- Script-specific handling (IAST vs Devanagari)
- Helper function testing
- Return structure validation
- Element type specification
- Integration considerations

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.6

# Run with coverage
npm test sutras/1.3.6 --coverage
```

## Technical Details

### Algorithm
1. Validate input using `validateSanskritWord`
2. Detect script (IAST or Devanagari)
3. Check for initial ष्/ṣ with proper halanta handling
4. Verify pratyaya context through options
5. Process form by removing initial it-marker if conditions met

### Performance
- **Time Complexity**: O(1) constant time operations
- **Space Complexity**: O(1) constant space usage
- **Optimization Notes**: Efficient string prefix checking with script-specific handling

### Edge Cases
- **Devanagari halanta**: Properly handles ष् vs ष + vowel combinations
- **Retroflex distinction**: Distinguishes ष्/ṣ from regular स्/s
- **Context requirement**: Only applies in pratyaya/affix context
- **Script sensitivity**: Handles Unicode properly for both scripts

## Integration

### Related Sutras
- **1.3.2**: Deals with vowel it-markers in upadeśa
- **1.3.3**: Defines final consonant it-markers
- **1.3.4**: Creates exception for TUSMĀḤ consonants in vibhakti
- **1.3.5**: Defines initial ञि, टु, डु sequences as it-markers
- **1.3.7-1.3.8**: Continue the series of it-marker definitions

### Used By
- Affix processing engines for grammatical analysis
- Pratyaya identification systems
- Sanskrit morphological analyzers requiring it-marker recognition

## References

- **Panini's Ashtadhyayi**: 1.3.6 षः प्रत्ययस्य
- **Implementation Notes**: The retroflex ष् is specifically mentioned for pratyayas, distinguishing it from other sibilants
- **Test References**: Classical Sanskrit grammar texts for examples of ष्-initial affixes

---

*Generated from template: SUTRA_README_TEMPLATE.md*
