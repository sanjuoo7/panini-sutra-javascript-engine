# Sutra 1.3.7: चुटू

## Overview

**Sanskrit Text**: `चुटू`  
**Transliteration**: cuṭū  
**Translation**: The initial palatals and linguals [of an affix are it-markers]

## Purpose

This sutra defines that initial palatal consonants (च्, छ्, ज्, झ्, ञ्) and lingual/retroflex consonants (ट्, ठ्, ड्, ढ्, ण्) when they appear at the beginning of pratyayas (affixes) in grammatical instruction are considered it-markers (इत्). These consonants should be deleted from the final form.

## Implementation

### Function Signature
```javascript
function hasInitialPalatalLingualItMarker(form, options = {}) {
    // Returns analysis of initial palatal/lingual it-markers in pratyaya context
}
```

### Key Features
- Identifies initial palatal and lingual/retroflex consonants
- Supports both IAST and Devanagari scripts
- Requires pratyaya context for application
- Properly handles Devanagari halanta forms
- Classifies consonants by articulatory class

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` for script identification
  - `validateSanskritWord` for input validation

## Usage Examples

### Basic Usage
```javascript
import { hasInitialPalatalLingualItMarker } from './index.js';

// Example 1: Palatal consonant in IAST
const result1 = hasInitialPalatalLingualItMarker('cas', { isPratyaya: true });
console.log(result1); 
// { hasItMarker: true, itConsonant: 'c', consonantClass: 'palatal', processedForm: 'as' }

// Example 2: Lingual consonant in Devanagari
const result2 = hasInitialPalatalLingualItMarker('टस्', { isPratyaya: true });
console.log(result2); 
// { hasItMarker: true, itConsonant: 'ट', consonantClass: 'lingual', processedForm: 'स्' }
```

### Advanced Usage
```javascript
// Helper functions
import { removeInitialPalatalLingualItMarker, isPalatalLingualItMarker } from './index.js';

const processed = removeInitialPalatalLingualItMarker('च्त्वा', { isPratyaya: true });
// Returns: 'त्वा'

const classification = isPalatalLingualItMarker('ṭ', 'IAST');
// Returns: { isItMarker: true, class: 'lingual' }
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 20 tests covering:
- Positive cases (palatal/lingual consonants in pratyaya context)
- Negative cases (non-applicable consonants or context)
- Context requirements
- Consonant classification
- Helper function testing
- Return structure validation

### Running Tests
```bash
npm test sutras/1.3.7
```

## References

- **Panini's Ashtadhyayi**: 1.3.7 चुटू
- **Implementation Notes**: Covers palatal (च-वर्ग) and retroflex (ट-वर्ग) consonant classes

---

*Generated from template: SUTRA_README_TEMPLATE.md*
