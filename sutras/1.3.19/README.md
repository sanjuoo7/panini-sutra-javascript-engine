# Sutra 1.3.19: विपराभ्यां जेः

## Overview

**Sanskrit Text**: `विपराभ्यां जेः`  
**Transliteration**: viparābhyāṃ jeḥ  
**Translation**: After the verb जि 'to conquer', preceded by वि or परा, the आत्मनेपद affix is employed.

## Purpose

This sutra prescribes ātmanepada endings for the root जि (to conquer/win) when preceded by the prefixes वि (vi) or परा (parā). It establishes specific voice assignment rules for this verb-prefix combination.

## Implementation

### Function Signature
```javascript
function determineViParaJiAtmanepada(word, context = {}) {
    // Returns analysis of whether ātmanepada should be used
}
```

### Key Features
- Multi-script support (Devanagari and IAST)
- Context-sensitive analysis
- Morphological pattern recognition
- Confidence scoring based on clarity

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord, tokenizePhonemes
- **Shared Functions**: Pattern matching and morphological analysis utilities

## Usage Examples

### Basic Usage
```javascript
import { determineViParaJiAtmanepada } from './index.js';

// Example 1: विजयते (vijayate) - वि + जि combination
const result1 = determineViParaJiAtmanepada('विजयते');
console.log(result1); 
// { isViParaJiAtmanepada: true, confidence: 0.95, prefix: 'वि', root: 'जि' }

// Example 2: पराजयते (parājayate) - परा + जि combination  
const result2 = determineViParaJiAtmanepada('पराजयते');
console.log(result2);
// { isViParaJiAtmanepada: true, confidence: 0.95, prefix: 'परा', root: 'जि' }
```

### Advanced Usage
```javascript
// With explicit context
const result3 = determineViParaJiAtmanepada('someform', {
  root: 'जि',
  prefix: 'वि'
});
console.log(result3);
// { isViParaJiAtmanepada: true, confidence: 0.9, prefix: 'वि' }

// IAST script support
const result4 = determineViParaJiAtmanepada('vijayate');
console.log(result4);
// { isViParaJiAtmanepada: true, confidence: 0.95, prefix: 'vi' }
```

## Test Coverage

The implementation includes comprehensive tests covering:

- **Positive Cases**: Valid वि/परा + जि combinations in both scripts
- **Negative Cases**: Invalid prefixes, wrong roots, simple जि forms
- **Edge Cases**: Mixed case, whitespace, compound words
- **Error Handling**: Null inputs, invalid words, type checking
- **Context Analysis**: Explicit root/prefix specification

## Technical Details

### Pattern Recognition
- Detects वि/परा prefixes in multiple forms
- Recognizes जि root patterns including जय, जे, जित variants
- Performs morphological clarity analysis

### Confidence Scoring
- Base confidence: 0.7 for clear patterns
- Bonuses for: early position (+0.1), morphological clarity (+0.15)
- Range: 0.0 to 0.95

### Script Support
- **Devanagari**: विजयते, पराजित, विजिगीषते
- **IAST**: vijayate, parājita, vijigīṣate

## Related Sutras

This sutra works in conjunction with:
- General ātmanepada rules (1.3.12-1.3.13)
- Other prefix-specific voice assignments
- Root-specific ātmanepada conditions

## Implementation Notes

- Uses non-destructive pattern matching
- Maintains original text structure
- Provides detailed analysis reasoning
- Supports both explicit and implicit context detection
