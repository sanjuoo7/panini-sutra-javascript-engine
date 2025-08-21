# Sutra 1.1.53: ङिच्च

## Overview

**Sanskrit Text**: `ङिच्च`  
**Transliteration**: ṅicca  
**Translation**: And the substitute which has indicatory ङ् (even though it consists of more than one letter) takes the place of the final letter only of the original expression.

## Purpose

This sutra specifies that when a substitute (ādeśa) has the indicatory letter ङ् (ṅ), it replaces only the final letter of the original term, regardless of how many letters the substitute itself contains. This is a crucial rule for understanding how certain grammatical substitutions work in Sanskrit, particularly in morphological processes.

## Implementation

### Function Signature
```javascript
function sutra1153(sthani, adesha, context = {}) {
    // Applies ङित् substitute replacement rules
}
```

### Key Features
- Identifies substitutes with ङित् (ṅit) markers
- Replaces only the final letter of the original (sthāni)
- Supports both IAST and Devanagari scripts
- Provides detailed linguistic analysis
- Handles edge cases and validation

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Multi-script support
  - `validation.js` - Input validation
  - `it-marker-detection.js` - Indicatory letter detection
  - `phoneme-tokenization.js` - Letter-by-letter analysis

## Usage Examples

### Basic Usage
```javascript
import { sutra1153, isNgitSubstitute, applyNgitSubstitution } from './index.js';

// Example 1: ङित् substitute replacing final letter
const result1 = sutra1153('kṛ', 'karaṅ', { operation: 'substitution' });
console.log(result1.output); // 'kara' (ङ् marker causes only final 'ṛ' to be replaced)

// Example 2: Multi-letter substitute with ङित्
const result2 = sutra1153('gam', 'gachaṅ', { operation: 'substitution' });
console.log(result2.output); // 'gacha' (only final 'm' replaced)
```

### Advanced Usage
```javascript
// Check if substitute has ङित् marker
const hasNgit = isNgitSubstitute('karaṅ');
console.log(hasNgit); // true

// Apply substitution with detailed analysis
const analysis = sutra1153('stu', 'stavaṅ', { 
  operation: 'substitution',
  analysisLevel: 'detailed'
});
console.log(analysis.explanation); // Detailed linguistic analysis
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 15+ tests covering:
- ङित् marker detection
- Final letter replacement logic
- Multi-script support (IAST/Devanagari)
- Edge cases (empty inputs, invalid markers)
- Integration with substitution processes

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.53

# Run with coverage
npm test sutras/1.1.53 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Verify sthāni and ādeśa are valid Sanskrit text
2. **ङित् Detection**: Check if substitute contains indicatory ङ्
3. **Final Letter Isolation**: Extract the last phoneme of the original
4. **Substitution Logic**: Replace only the final letter with the non-ङित् portion
5. **Result Assembly**: Combine preserved portion with substitute

### Performance
- **Time Complexity**: O(n) where n is the length of the substitute
- **Space Complexity**: O(1) for basic operations
- **Optimization Notes**: Uses efficient string slicing and pre-computed marker detection

### Edge Cases
- Empty sthāni or ādeśa strings (validation error)
- Substitutes without ङित् markers (rule doesn't apply)
- Single-letter originals (entire letter replaced)
- Multiple ङ् markers (only final one counts as indicatory)

## Linguistic Context

This sutra is fundamental to understanding Sanskrit morphology. The ङित् marker system allows grammarians to specify precise replacement rules that wouldn't be clear from the substitute's surface form alone. It's particularly important in:

- Verbal root substitutions
- Suffix attachments
- Euphonic changes
- Morphological alternations

The rule ensures that multi-letter substitutes marked with ङित् don't completely replace longer originals, maintaining morphological transparency.

---

*Implemented following traditional interpretations and modern computational linguistics principles.*
