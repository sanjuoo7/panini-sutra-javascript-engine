# Sutra 1.3.2: उपदेशेऽजनुनासिक इत्

## Overview

**Sanskrit Text**: `उपदेशेऽजनुनासिक इत्`  
**Transliteration**: upadeśe 'janunāsika it  
**Translation**: "In grammatical instruction, a non-nasalized vowel (is called) it"

## Purpose

This sutra defines one of the fundamental concepts in Pāṇini's grammar system - the identification of it-markers. Specifically, it states that in the context of grammatical instruction (upadeśa), a non-nasalized vowel is considered an it-marker. This is crucial for understanding which parts of grammatical forms are markers and which are part of the actual form.

## Implementation

### Function Signature
```javascript
function isNonNasalizedVowelItMarker(form, options = {}) {
  return {
    isIt: boolean,
    vowel: string|null,
    script: string,
    reason: string
  };
}
```

### Key Features
- Multi-script support for both Devanagari and IAST
- Comprehensive validation of vowel characteristics
- Detailed result object with reason codes and script information
- Proper handling of long vowels (दीर्घ)
- Input sanitization and error handling

### Dependencies
- **Sanskrit Utils**:
  - `script-detection.js`: For identifying the input script
  - `classification.js`: For vowel and nasalization detection
  - `transliteration.js`: For script normalization
  - `validation.js`: For input validation

## Usage Examples

### Basic Usage
```javascript
import { isNonNasalizedVowelItMarker } from './index.js';

// Example 1: Simple vowels (IAST)
console.log(isNonNasalizedVowelItMarker('a'));
// Output: { isIt: true, vowel: 'a', script: 'IAST', reason: 'non-nasalized-vowel' }

console.log(isNonNasalizedVowelItMarker('ā'));
// Output: { isIt: true, vowel: 'ā', script: 'IAST', reason: 'non-nasalized-vowel' }

// Example 2: Devanagari vowels
console.log(isNonNasalizedVowelItMarker('अ'));
// Output: { isIt: true, vowel: 'अ', script: 'Devanagari', reason: 'non-nasalized-vowel' }
```

### Advanced Usage
```javascript
// Example 3: Nasalized vowels (not it-markers)
console.log(isNonNasalizedVowelItMarker('aṃ'));
// Output: { isIt: false, vowel: 'aṃ', script: 'IAST', reason: 'nasalized-vowel' }

console.log(isNonNasalizedVowelItMarker('अं'));
// Output: { isIt: false, vowel: 'अं', script: 'Devanagari', reason: 'nasalized-vowel' }

// Example 4: Invalid inputs
console.log(isNonNasalizedVowelItMarker('k'));
// Output: { isIt: false, vowel: 'k', script: 'IAST', reason: 'not-vowel' }

console.log(isNonNasalizedVowelItMarker(''));
// Output: { isIt: false, vowel: null, script: null, reason: 'invalid-input' }
```

### Edge Cases
```javascript
// Long vowels
const longVowels = ['ā', 'ī', 'ū', 'आ', 'ई', 'ऊ'];
longVowels.forEach(vowel => {
  const result = isNonNasalizedVowelItMarker(vowel);
  console.log(`${vowel}: ${result.isIt}`); // All true
});

// Visarga handling
console.log(isNonNasalizedVowelItMarker('aḥ'));
// Output: { isIt: false, vowel: 'aḥ', script: 'IAST', reason: 'not-vowel' }
```

## Technical Details

### Return Value Structure
The function returns an object with the following properties:
- `isIt`: Boolean indicating whether the input is a valid it-marker
- `vowel`: The normalized form of the input vowel (or null for invalid inputs)
- `script`: The detected script ('IAST' or 'Devanagari')
- `reason`: Explanation for the result, one of:
  - `'non-nasalized-vowel'`: Valid it-marker
  - `'nasalized-vowel'`: Vowel but nasalized
  - `'not-vowel'`: Input is not a vowel
  - `'invalid-input'`: Input is empty or invalid

### Validation Steps
1. Basic input validation (non-empty string)
2. Script detection
3. Vowel classification check
4. Nasalization check
5. Final normalization for consistent return values

### Notes
- The implementation handles both independent vowels (स्वर) and vowel diacritics (मात्रा)
- Long vowels (दीर्घ) are treated the same as short vowels for it-marker purposes
- The function is safe to use with mixed scripts in a single codebase
