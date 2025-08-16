# Sutra 1.3.29: समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः

## Overview

**Sanskrit Text**: `समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः`  
**Transliteration**: samo gamayṛcachiparacachisavaratayaratiśaruvidibhayaḥ  
**Translation**: From सम् (prefix), for गम्, ऋच्छ्, प्रच्छ्, स्वर्, ऋ, श्रु, विद् (roots)

## Purpose

This sutra prescribes ātmanepada endings for a specific set of seven roots when preceded by the सम् prefix and used intransitively. The roots are: गम् (to go), ऋच्छ् (to become hard), प्रच्छ् (to ask), स्वर् (to find fault), ऋ (to go), श्रु (to hear), and विद् (to know). This represents a comprehensive list of roots that take ātmanepada with सम् in intransitive contexts.

## Implementation

### Function Signature
```javascript
function determineSamSpecificRootsAtmanepada(word, context = {}) {
    // Returns analysis of ātmanepada assignment for सम् + specified root combinations
}
```

### Key Features
- Pattern recognition for सम् + all seven specified roots
- Multi-root support in single implementation
- Intransitive usage requirement validation
- Comprehensive root pattern matching
- Support for various forms of all roots

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `tokenizePhonemes`
- **Pattern Recognition**: सम् prefix patterns with all specified roots
- **Root Analysis**: Multi-root pattern detection and validation

## Usage Examples

### Basic Usage
```javascript
import { determineSamSpecificRootsAtmanepada } from './index.js';

// Example 1: सम् + गम् combination
const result1 = determineSamSpecificRootsAtmanepada('संगच्छते');
console.log(result1); 
// { isSamSpecificRootsAtmanepada: true, confidence: 0.8, prefix: 'सम्', root: 'गम्' }

// Example 2: सम् + श्रु combination
const result2 = determineSamSpecificRootsAtmanepada('संशृणोते');
console.log(result2); 
// { isSamSpecificRootsAtmanepada: true, confidence: 0.8, prefix: 'सम्', root: 'श्रु' }
```

### Advanced Usage
```javascript
// IAST script support for multiple roots
const result3 = determineSamSpecificRootsAtmanepada('saṃgacchate');
console.log(result3);
// { isSamSpecificRootsAtmanepada: true, prefix: 'sam', root: 'gam', script: 'IAST' }

const result4 = determineSamSpecificRootsAtmanepada('saṃvidyate');
console.log(result4);
// { isSamSpecificRootsAtmanepada: true, prefix: 'sam', root: 'vid', script: 'IAST' }

// Intransitive context requirement
const result5 = determineSamSpecificRootsAtmanepada('संपृच्छते', {
  meaning: 'asks together, inquires collectively',
  isIntransitive: true
});
console.log(result5);
// { isSamSpecificRootsAtmanepada: true, confidence: 0.9, transitivity: 'intransitive' }

// Context-based analysis for any specified root
const result6 = determineSamSpecificRootsAtmanepada('someform', {
  root: 'विद्',
  prefix: 'सम्',
  transitivity: 'intransitive'
});
console.log(result6);
// { isSamSpecificRootsAtmanepada: true, confidence: 0.95, requiresIntransitive: true }
```

## Technical Notes

- Seven specific roots are covered: गम्, ऋच्छ्, प्रच्छ्, स्वर्, ऋ, श्रु, विद्
- All require सम् prefix and intransitive usage
- Each root has distinct semantic patterns but follows the same grammatical rule
- Common semantic theme: collective or unified action

## Root-Specific Patterns

### सम् + गम् (saṃgam)
- संगच्छ- (saṃgacch-): Come together, meet
- संगत- (saṃgat-): United, joined

### सम् + प्रच्छ् (saṃpracch)
- संप्रच्छ- (saṃpracch-): Ask together
- संपृच्छ- (saṃpṛcch-): Inquire collectively

### सम् + श्रु (saṃśru)
- संश्रु- (saṃśru-): Hear together
- संशृण- (saṃśṛṇ-): Listen collectively

### सम् + विद् (saṃvid)
- संविद्- (saṃvid-): Know together
- संवेत्- (saṃvet-): Understand collectively

### Other Roots
- **ऋच्छ्**: संऋच्छ- (become hard together)
- **स्वर्**: संस्वर- (find fault together)  
- **ऋ**: संऋ- (go together)

## Semantic Patterns

All specified roots with सम् typically express:
- **Collective action**: Multiple agents acting together
- **Unified process**: Single coordinated activity
- **Mutual engagement**: Reciprocal or shared experience
- **Convergence**: Coming together or meeting

## Intransitive Requirement

The sutra requires intransitive usage, identified through:
- **Explicit context**: `isIntransitive: true`, `transitivity: 'intransitive'`
- **Ātmanepada endings**: ते, न्ते, से patterns
- **Collective meanings**: "come together", "hear together", "know collectively"
- **Unity semantics**: Actions expressing convergence or mutual engagement

## Related Sutras

- **1.3.26**: अकर्मकाच्च (general intransitive principle)
- **1.3.27-28**: Continues pattern of specific prefix-root combinations
- **Comprehensive coverage**: This sutra provides extensive list of qualifying roots

## Testing

The implementation includes comprehensive tests covering:
- All seven specified roots with सम् prefix
- Intransitive usage requirement validation
- IAST and Devanagari script support
- Semantic meaning analysis for collective actions
- Error handling and edge cases
- Multi-root pattern recognition and validation
