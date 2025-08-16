# Sutra 1.3.28: आङो यमहनः

## Overview

**Sanskrit Text**: `आङो यमहनः`  
**Transliteration**: āṅo yamahanaḥ  
**Translation**: From आङ् (prefix), for यम् and हन् (roots)

## Purpose

This sutra prescribes ātmanepada endings for the roots यम् (yam - 'to restrain/stop') and हन् (han - 'to strike/injure') when preceded by the आङ् prefix (which appears as आ in practice) and used intransitively. This continues the pattern of specific prefix-root combinations requiring ātmanepada in intransitive contexts.

## Implementation

### Function Signature
```javascript
function determineAangYamHanAtmanepada(word, context = {}) {
    // Returns analysis of ātmanepada assignment for आ + यम्/हन् combinations
}
```

### Key Features
- Pattern recognition for both आ + यम् and आ + हन् combinations
- Dual root support in single implementation
- Intransitive usage requirement validation
- Support for various forms of both roots
- Comprehensive error handling and input validation

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `tokenizePhonemes`
- **Pattern Recognition**: आ prefix patterns with यम्/हन् roots
- **Intransitive Analysis**: Logic to verify intransitive usage requirement

## Usage Examples

### Basic Usage
```javascript
import { determineAangYamHanAtmanepada } from './index.js';

// Example 1: आ + यम् combination
const result1 = determineAangYamHanAtmanepada('आयच्छते');
console.log(result1); 
// { isAangYamHanAtmanepada: true, confidence: 0.8, prefix: 'आ', root: 'यम्' }

// Example 2: आ + हन् combination
const result2 = determineAangYamHanAtmanepada('आहन्यते');
console.log(result2); 
// { isAangYamHanAtmanepada: true, confidence: 0.8, prefix: 'आ', root: 'हन्' }
```

### Advanced Usage
```javascript
// IAST script support for both roots
const result3 = determineAangYamHanAtmanepada('āyacchate');
console.log(result3);
// { isAangYamHanAtmanepada: true, prefix: 'ā', root: 'yam', script: 'IAST' }

const result4 = determineAangYamHanAtmanepada('āhanyate');
console.log(result4);
// { isAangYamHanAtmanepada: true, prefix: 'ā', root: 'han', script: 'IAST' }

// Intransitive context requirement
const result5 = determineAangYamHanAtmanepada('आयम्यते', {
  meaning: 'restrains oneself, controls oneself',
  isIntransitive: true
});
console.log(result5);
// { isAangYamHanAtmanepada: true, confidence: 0.9, transitivity: 'intransitive' }

// Context-based analysis
const result6 = determineAangYamHanAtmanepada('someform', {
  root: 'हन्',
  prefix: 'आ',
  transitivity: 'intransitive'
});
console.log(result6);
// { isAangYamHanAtmanepada: true, confidence: 0.95, requiresIntransitive: true }
```

## Technical Notes

- The आङ् prefix appears as आ in actual usage
- Both यम् and हन् roots are covered by this single sutra
- Intransitive usage is required - transitive uses don't qualify
- The roots have distinct meanings but follow the same grammatical pattern

## Root-Specific Patterns

### आ + यम् Patterns
- आयच्छ- (āyacch-): Most common combination
- आयम्य- (āyamy-): Alternative form
- आयत- (āyat-): Participial form

### आ + हन् Patterns
- आहत- (āhat-): Past participle form
- आहन्य- (āhany-): Present passive
- आघात- (āghāt-): Nominal derivative

## Root Meanings

### यम् (yam) Root
- **Primary**: to restrain, to control, to stop
- **Intransitive**: to be restrained, to control oneself
- **Context**: Self-control, restraint, stopping naturally

### हन् (han) Root  
- **Primary**: to strike, to injure, to kill
- **Intransitive**: to be struck, to injure oneself
- **Context**: Self-inflicted harm, receiving strikes

## Intransitive Requirement

The sutra requires intransitive usage, identified through:
- **Explicit context**: `isIntransitive: true`, `transitivity: 'intransitive'`
- **Ātmanepada endings**: ते, न्ते, से patterns
- **Self-directed meanings**: "restrains oneself", "injures oneself"
- **Passive meanings**: "to be restrained", "to be struck"

## Related Sutras

- **1.3.26**: अकर्मकाच्च (general intransitive principle)
- **1.3.27**: उद्विभ्यां तपः (उद्/वि + तप् pattern)
- **Continues sequence**: Specific prefix-root combinations with intransitive requirement

## Testing

The implementation includes comprehensive tests covering:
- Both आ + यम् and आ + हन् combinations
- Intransitive usage requirement validation
- IAST and Devanagari script support
- Semantic meaning analysis for both roots
- Error handling and edge cases
- Dual root pattern recognition
