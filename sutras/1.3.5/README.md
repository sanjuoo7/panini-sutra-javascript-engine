# Sutra 1.3.5: आदिर्ञिटुडवः

## Overview

**Sanskrit Text**: `आदिर्ञिटुडवः`  
**Transliteration**: ādirañiṭuḍavaḥ  
**Translation**: The initial ñi, ṭu, ḍu [are it-markers]

## Purpose

This sutra defines that the consonant sequences ञि (ñi), टु (ṭu), and डु (ḍu) when they appear at the beginning of affixes, roots, or other grammatical elements are considered it-markers (इत्). These sequences should be deleted from the final form according to the general rule that it-markers are not pronounced.

## Implementation

### Function Signature
```javascript
function hasInitialItMarkers(form, options = {}) {
    // Returns analysis of initial it-marker sequences
}
```

### Key Features
- Identifies initial ञि, टु, डु sequences in both IAST and Devanagari
- Requires grammatical context for it-marker recognition
- Provides processed form with it-markers removed
- Supports multiple element types (affix, pratyaya, dhatu, suffix)
- Includes helper functions for sequence removal and validation

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` for script identification
  - `validateSanskritWord` for input validation

## Usage Examples

### Basic Usage
```javascript
import { hasInitialItMarkers } from './index.js';

// Example 1: ञि sequence in grammatical instruction
const result1 = hasInitialItMarkers('ñikṛ', { isGrammaticalInstruction: true });
console.log(result1); 
// { hasItMarkers: true, itSequences: ['ñi'], processedForm: 'kṛ', ... }

// Example 2: No initial it-marker
const result2 = hasInitialItMarkers('gam', { isGrammaticalInstruction: true });
console.log(result2); 
// { hasItMarkers: false, itSequences: [], processedForm: null, ... }
```

### Advanced Usage
```javascript
// Element type specification
const result3 = hasInitialItMarkers('ṭubhū', { elementType: 'dhatu' });
// Recognizes dhatu as grammatical context

const result4 = hasInitialItMarkers('ḍupāka', { elementType: 'affix' });
// Processes affix with initial it-marker

// Helper function usage
import { removeInitialItMarkers, isInitialItSequence } from './index.js';

const processed = removeInitialItMarkers('ञिकृ', { isGrammaticalInstruction: true });
// Returns: 'कृ'

const isItMarker = isInitialItSequence('ṭu', 'IAST');
// Returns: true
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 37 tests covering:
- Positive cases (ñi, ṭu, ḍu sequences in grammatical context)
- Negative cases (no it-sequences or non-grammatical context)
- Grammatical context requirements
- Specific sequence analysis for each it-marker
- Helper function testing
- Return structure validation
- Element type specification
- Integration considerations

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.5

# Run with coverage
npm test sutras/1.3.5 --coverage
```

## Technical Details

### Algorithm
1. Validate input using `validateSanskritWord`
2. Detect script (IAST or Devanagari)
3. Check if form starts with any of the it-sequences: ञि/ñi, टु/ṭu, डु/ḍu
4. Verify grammatical context through options
5. Process form by removing initial it-marker if conditions met

### Performance
- **Time Complexity**: O(k) where k is number of it-sequences to check (constant = 3)
- **Space Complexity**: O(1) constant space usage
- **Optimization Notes**: Early termination on first matching sequence

### Edge Cases
- **Context requirement**: Only applies in grammatical instruction context
- **Element type validation**: Recognizes specific grammatical element types
- **Script handling**: Proper Unicode support for Devanagari sequences
- **Sequence specificity**: Distinguishes it-markers from similar regular sequences

## Integration

### Related Sutras
- **1.3.2**: Deals with vowel it-markers in upadeśa
- **1.3.3**: Defines final consonant it-markers
- **1.3.4**: Creates exception for TUSMĀḤ consonants in vibhakti
- **1.3.6-1.3.8**: Continue the series of it-marker definitions

### Used By
- Morphological analysis engines for root and affix processing
- Grammatical instruction parsers
- Sanskrit parsing systems requiring it-marker identification

## References

- **Panini's Ashtadhyayi**: 1.3.5 आदिर्ञिटुडवः
- **Implementation Notes**: The sequences ञि, टु, डु are specific retroflex/palatal combinations that appear in grammatical metalanguage
- **Test References**: Classical grammatical texts for authentic examples of these sequences

---

*Generated from template: SUTRA_README_TEMPLATE.md*
