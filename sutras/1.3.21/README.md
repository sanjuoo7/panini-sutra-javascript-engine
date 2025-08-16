# Sutra 1.3.21: क्रीडोऽनुसम्परिभ्यश्च

## Overview

**Sanskrit Text**: `क्रीडोऽनुसम्परिभ्यश्च`  
**Transliteration**: krīḍo'nusamparibhyaśca  
**Translation**: After the root क्रीड् 'to play', preceded by अनु, सम्, परि, or आङ्, the ātmanepada affix is employed.

## Purpose

This sutra prescribes ātmanepada endings for the root क्रीड् (to play/sport) when preceded by specific prefixes: अनु (anu), सम् (sam), परि (pari), or आङ् (āṅ). It establishes voice assignment rules for these particular prefix-root combinations.

## Implementation

### Function Signature
```javascript
function determineKriDaPrefixAtmanepada(word, context = {}) {
    // Returns analysis of whether ātmanepada should be used
}
```

### Key Features
- Multi-script support (Devanagari and IAST)
- Multiple prefix validation (अनु, सम्, परि, आङ्)
- Play/sport semantic context analysis
- Morphological pattern recognition

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord, tokenizePhonemes
- **Helper Functions**: hasPlaySemanticContext for semantic validation

## Usage Examples

### Basic Usage
```javascript
import { determineKriDaPrefixAtmanepada } from './index.js';

// Example 1: अनुक्रीडते (anukrīḍate) - अनु + क्रीड् combination
const result1 = determineKriDaPrefixAtmanepada('अनुक्रीडते');
console.log(result1); 
// { isKriDaPrefixAtmanepada: true, confidence: 0.95, prefix: 'अनु', root: 'क्रीड्' }

// Example 2: संक्रीडते (saṃkrīḍate) - सम् + क्रीड् combination
const result2 = determineKriDaPrefixAtmanepada('संक्रीडते');
console.log(result2);
// { isKriDaPrefixAtmanepada: true, confidence: 0.95, prefix: 'सम्', root: 'क्रीड्' }
```

### Multiple Prefix Support
```javascript
// Example 3: परिक्रीडते (parikrīḍate) - परि + क्रीड् combination
const result3 = determineKriDaPrefixAtmanepada('परिक्रीडते');
console.log(result3);
// { isKriDaPrefixAtmanepada: true, confidence: 0.95, prefix: 'परि', root: 'क्रीड्' }

// Example 4: आक्रीडते (ākrīḍate) - आ + क्रीड् combination
const result4 = determineKriDaPrefixAtmanepada('आक्रीडते');
console.log(result4);
// { isKriDaPrefixAtmanepada: true, confidence: 0.95, prefix: 'आ', root: 'क्रीड्' }
```

### IAST Script Support
```javascript
// IAST examples
const result5 = determineKriDaPrefixAtmanepada('anukrīḍate');
console.log(result5);
// { isKriDaPrefixAtmanepada: true, confidence: 0.95, prefix: 'anu' }

const result6 = determineKriDaPrefixAtmanepada('saṃkrīḍate');
console.log(result6);
// { isKriDaPrefixAtmanepada: true, confidence: 0.95, prefix: 'sam' }
```

### Context-Based Analysis
```javascript
// With explicit context
const result7 = determineKriDaPrefixAtmanepada('someform', {
  root: 'क्रीड्',
  prefix: 'अनु',
  semanticContext: 'play'
});
console.log(result7);
// { isKriDaPrefixAtmanepada: true, confidence: 0.9, prefix: 'अनु' }
```

## Test Coverage

The implementation includes comprehensive tests covering:

- **Positive Cases**: Valid prefix + क्रीड् combinations for all four prefixes
- **Negative Cases**: Invalid prefixes, wrong roots, simple क्रीड् forms
- **Multi-Prefix Tests**: Each of the four valid prefixes (अनु, सम्, परि, आङ्)
- **Edge Cases**: Mixed case, compound words, contextual analysis
- **Error Handling**: Null inputs, invalid words, type validation
- **Script Support**: Both Devanagari and IAST patterns

## Technical Details

### Pattern Recognition
- Detects all four valid prefixes: अनु, सम्, परि, आङ्
- Recognizes क्रीड् root patterns including क्रीडत्, क्रीडित variants
- Semantic validation for play/sport contexts

### Prefix Validation
The sutra specifically handles four prefixes:
- **अनु (anu)**: Following/subsequent play
- **सम् (sam)**: Complete/thorough play  
- **परि (pari)**: Around/surrounding play
- **आङ् (āṅ)**: Towards/unto play

### Confidence Scoring
- Base confidence: 0.7 for clear patterns
- Bonuses for: morphological clarity (+0.15), position clarity (+0.1)
- Bonuses for: semantic context match (+0.1)
- Range: 0.0 to 0.95

### Script Support
- **Devanagari**: अनुक्रीडते, संक्रीडते, परिक्रीडते, आक्रीडते
- **IAST**: anukrīḍate, saṃkrīḍate, parikrīḍate, ākrīḍate

## Related Sutras

This sutra works in conjunction with:
- Previous prefix-root combinations (1.3.19-1.3.20)
- Following prefix-specific rules (1.3.22-1.3.23)
- General ātmanepada rules (1.3.12-1.3.13)
- Root-specific क्रीड् conjugation patterns

## Implementation Notes

- Supports multiple valid prefixes in single implementation
- Uses semantic context validation for play/sport meaning
- Maintains high accuracy across both script systems
- Provides detailed prefix identification and analysis
- Implements comprehensive morphological pattern matching
