# Sutra 1.3.8: लशक्वतद्धिते

## Overview

**Sanskrit Text**: `लशक्वतद्धिते`  
**Transliteration**: laśakvat taddhite  
**Translation**: The initial la, śa (labials), and ku (gutturals) [are it-markers] except in taddhita affixes

## Purpose

This sutra defines that initial consonants from three groups - ल्, श-वर्ग (श्, ष्, स्), and क-वर्ग (क्, ख्, ग्, घ्, ङ्) - when they appear at the beginning of pratyayas (affixes) are considered it-markers (इत्), except when the affix is a taddhita (secondary derivational affix). These consonants should be deleted from the final form unless it's a taddhita context.

## Implementation

### Function Signature
```javascript
function hasInitialLaShakuItMarker(form, options = {}) {
    // Returns analysis of initial la/śa/ku it-markers with taddhita exception
}
```

### Key Features
- Identifies initial ल्, sibilants, and guttural consonants
- Implements taddhita exception logic
- Supports both IAST and Devanagari scripts
- Requires affix context for application
- Properly handles multiple consonant classes

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` for script identification
  - `validateSanskritWord` for input validation

## Usage Examples

### Basic Usage
```javascript
import { hasInitialLaShakuItMarker } from './index.js';

// Example 1: Guttural consonant in regular affix
const result1 = hasInitialLaShakuItMarker('kas', { isAffix: true });
console.log(result1); 
// { hasItMarker: true, itConsonant: 'k', consonantClass: 'guttural', processedForm: 'as' }

// Example 2: Same consonant in taddhita affix (exception)
const result2 = hasInitialLaShakuItMarker('kas', { isAffix: true, isTaddhita: true });
console.log(result2); 
// { hasItMarker: false, itConsonant: null, consonantClass: null, processedForm: 'kas' }
```

### Advanced Usage
```javascript
// Helper functions
import { removeInitialLaShakuItMarker, isLaShakuItMarker } from './index.js';

// Sibilant consonant
const processed = removeInitialLaShakuItMarker('शत्', { isAffix: true });
// Returns: 'त्'

// Classification check
const classification = isLaShakuItMarker('l', 'IAST');
// Returns: { isItMarker: true, class: 'la' }
```

## Context Rules

### Affix Context Required
The sutra applies only when:
- The form is identified as an affix (`isAffix: true`)
- The initial consonant is from the specified classes

### Taddhita Exception
The rule does NOT apply when:
- The affix is a taddhita secondary derivational affix (`isTaddhita: true`)
- Even if the consonant would normally be an it-marker

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 24 tests covering:
- Positive cases (applicable consonants in affix context)
- Taddhita exception cases
- Context requirements (affix context needed)
- Consonant classification (la, sibilants, gutturals)
- Helper function testing
- Return structure validation

### Running Tests
```bash
npm test sutras/1.3.8
```

## References

- **Panini's Ashtadhyayi**: 1.3.8 लशक्वतद्धिते
- **Implementation Notes**: Implements exception logic for taddhita affixes

---

*Generated from template: SUTRA_README_TEMPLATE.md*
