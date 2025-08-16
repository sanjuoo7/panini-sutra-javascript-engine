# Sutra 1.3.27: उद्विभ्यां तपः

## Overview

**Sanskrit Text**: `उद्विभ्यां तपः`  
**Transliteration**: udvibhyāṃ tapaḥ  
**Translation**: From उद् and वि (prefixes), for तप् (root)

## Purpose

This sutra prescribes ātmanepada endings for the root तप् (tap - 'to shine', 'to heat', 'to perform austerities') when preceded by either उद् (ud) or वि (vi) prefixes and used intransitively. The dual form उद्विभ्यां indicates both prefixes are covered by this single rule.

## Implementation

### Function Signature
```javascript
function determineUdViTapAtmanepada(word, context = {}) {
    // Returns analysis of ātmanepada assignment for उद्/वि + तप् combinations
}
```

### Key Features
- Pattern recognition for both उद् + तप् and वि + तप् combinations
- Dual prefix support in single implementation
- Intransitive usage requirement validation
- Support for various तप् meanings (shine, heat, glow)
- Comprehensive error handling and input validation

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `tokenizePhonemes`
- **Pattern Recognition**: Dual prefix patterns for उद्/वि + तप्
- **Intransitive Analysis**: Logic to verify intransitive usage requirement

## Usage Examples

### Basic Usage
```javascript
import { determineUdViTapAtmanepada } from './index.js';

// Example 1: उद् + तप् combination
const result1 = determineUdViTapAtmanepada('उत्तपते');
console.log(result1); 
// { isUdViTapAtmanepada: true, confidence: 0.8, prefix: 'उद्', root: 'तप्' }

// Example 2: वि + तप् combination  
const result2 = determineUdViTapAtmanepada('वितपते');
console.log(result2); 
// { isUdViTapAtmanepada: true, confidence: 0.8, prefix: 'वि', root: 'तप्' }
```

### Advanced Usage
```javascript
// IAST script support for both prefixes
const result3 = determineUdViTapAtmanepada('uttapate');
console.log(result3);
// { isUdViTapAtmanepada: true, prefix: 'ud', root: 'tap', script: 'IAST' }

const result4 = determineUdViTapAtmanepada('vitapate');
console.log(result4);
// { isUdViTapAtmanepada: true, prefix: 'vi', root: 'tap', script: 'IAST' }

// Intransitive context requirement
const result5 = determineUdViTapAtmanepada('उत्तापते', {
  meaning: 'shines brightly, glows',
  isIntransitive: true
});
console.log(result5);
// { isUdViTapAtmanepada: true, confidence: 0.9, transitivity: 'intransitive' }

// Context-based analysis
const result6 = determineUdViTapAtmanepada('someform', {
  root: 'तप्',
  prefix: 'वि',
  transitivity: 'intransitive'
});
console.log(result6);
// { isUdViTapAtmanepada: true, confidence: 0.95, requiresIntransitive: true }
```

## Technical Notes

- Both उद् and वि prefixes are explicitly covered by this sutra
- The root तप् has multiple meanings: to shine, to heat, to perform austerities
- Intransitive usage is required - transitive uses don't qualify
- Common forms include: उत्तपते, वितपते, उत्तापते, वीतापते
- The requirement अकर्मक (intransitive) is carried forward from previous sutras

## Prefix-Specific Patterns

### उद् + तप् Patterns
- उत्तप- (uttapa-): Basic combination
- उत्ताप- (uttāpa-): With vowel lengthening
- उद्तप- (udtapa-): Explicit form

### वि + तप् Patterns  
- वितप- (vitapa-): Basic combination
- वीताप- (vītāpa-): With vowel lengthening
- वीतप- (vītapa-): Variant form

## Intransitive Requirement

The sutra requires intransitive usage, identified through:
- **Explicit context**: `isIntransitive: true`, `transitivity: 'intransitive'`
- **Ātmanepada endings**: ते, न्ते, से patterns
- **Semantic meanings**: Self-directed shining, heating, glowing
- **Meaning analysis**: "to be heated", "to shine", "to glow"

## Related Sutras

- **1.3.26**: अकर्मकाच्च (general intransitive principle)
- **Continues pattern**: Specific prefix-root combinations with intransitive requirement

## Testing

The implementation includes comprehensive tests covering:
- Both उद् + तप् and वि + तप् combinations
- Intransitive usage requirement validation
- IAST and Devanagari script support
- Semantic meaning analysis
- Error handling and edge cases
- Dual prefix pattern recognition
