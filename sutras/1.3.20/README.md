# Sutra 1.3.20: आङो दोऽनास्यविहरणे

## Overview

**Sanskrit Text**: `आङो दोऽनास्यविहरणे`  
**Transliteration**: āṅo do'nāsyaviharaṇe  
**Translation**: After the root दा 'to give', preceded by आङ्, the ātmanepada affix is employed, except when it means opening of the mouth.

## Purpose

This sutra prescribes ātmanepada endings for the root दा (to give) when preceded by the prefix आङ् (ā), with a specific semantic exception for contexts involving opening of the mouth.

## Implementation

### Function Signature
```javascript
function determineAangDoAtmanepada(word, context = {}) {
    // Returns analysis of whether ātmanepada should be used
}
```

### Key Features
- Multi-script support (Devanagari and IAST)
- Semantic context analysis
- Exception handling for mouth-opening contexts
- Morphological pattern recognition

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord, tokenizePhonemes
- **Helper Functions**: isMouthOpeningContext for semantic analysis

## Usage Examples

### Basic Usage
```javascript
import { determineAangDoAtmanepada } from './index.js';

// Example 1: आददाते (ādadāte) - आ + दा combination (general giving)
const result1 = determineAangDoAtmanepada('आददाते');
console.log(result1); 
// { isAangDoAtmanepada: true, confidence: 0.95, prefix: 'आ', root: 'दा' }

// Example 2: आदत्ते (ādatte) - आ + दा combination (receiving/taking)
const result2 = determineAangDoAtmanepada('आदत्ते');
console.log(result2);
// { isAangDoAtmanepada: true, confidence: 0.95, prefix: 'आ', root: 'दा' }
```

### Semantic Exception Example
```javascript
// Context indicating mouth-opening (exception case)
const result3 = determineAangDoAtmanepada('आददाति', {
  semanticContext: 'mouth-opening'
});
console.log(result3);
// { isAangDoAtmanepada: false, confidence: 0.9, reason: 'exception_mouth_opening' }
```

### Advanced Usage
```javascript
// IAST script support
const result4 = determineAangDoAtmanepada('ādatte');
console.log(result4);
// { isAangDoAtmanepada: true, confidence: 0.95, prefix: 'ā' }

// With explicit context
const result5 = determineAangDoAtmanepada('someform', {
  root: 'दा',
  prefix: 'आ'
});
console.log(result5);
// { isAangDoAtmanepada: true, confidence: 0.9, prefix: 'आ' }
```

## Test Coverage

The implementation includes comprehensive tests covering:

- **Positive Cases**: Valid आ + दा combinations in both scripts
- **Negative Cases**: Invalid prefixes, wrong roots, other गि forms
- **Exception Cases**: Mouth-opening semantic contexts
- **Edge Cases**: Mixed case, compound words, contextual analysis
- **Error Handling**: Null inputs, invalid words, type validation

## Technical Details

### Pattern Recognition
- Detects आङ्/आ prefix in multiple forms
- Recognizes दा root patterns including दत्त, दान, दत्ते variants
- Semantic analysis for mouth-opening contexts

### Semantic Exception Handling
The sutra specifically excludes cases where आ + दा means "opening the mouth":
- Analyzes semantic context markers
- Checks for mouth-related compound indicators
- Applies exception logic when detected

### Confidence Scoring
- Base confidence: 0.7 for clear patterns
- Bonuses for: morphological clarity (+0.15), position clarity (+0.1)
- Penalties for: semantic exceptions (-0.2)
- Range: 0.0 to 0.95

### Script Support
- **Devanagari**: आददाते, आदत्ते, आदान
- **IAST**: ādadāte, ādatte, ādāna

## Related Sutras

This sutra works in conjunction with:
- General ātmanepada rules (1.3.12-1.3.13)
- Other prefix-specific voice assignments (1.3.19, 1.3.21-1.3.23)
- Root-specific दा conjugation patterns

## Implementation Notes

- Implements semantic exception logic
- Uses contextual analysis for mouth-opening detection
- Maintains pattern matching accuracy
- Provides detailed reasoning for exceptions
- Supports both script systems with equal accuracy
