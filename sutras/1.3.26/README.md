# Sutra 1.3.26: अकर्मकाच्च

## Overview

**Sanskrit Text**: `अकर्मकाच्च`  
**Transliteration**: akarmakācca  
**Translation**: And from intransitive (usage)

## Purpose

This sutra extends the ātmanepada assignment from previous sutras (1.3.24-1.3.25) to include general intransitive constructions. The particle च (ca - "and") indicates this is an additional rule that broadens the application of ātmanepada beyond specific prefix-root combinations to any intransitive usage of the relevant verbs.

## Implementation

### Function Signature
```javascript
function determineIntransitiveAtmanepada(word, context = {}) {
    // Returns analysis of ātmanepada assignment for intransitive constructions
}
```

### Key Features
- Detection of intransitive verbal constructions
- Ātmanepada ending pattern recognition
- Extension of previous sutra rules to intransitive usage
- Support for various intransitive root patterns
- Comprehensive semantic analysis for transitivity

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `tokenizePhonemes`
- **Pattern Recognition**: Ātmanepada ending patterns and intransitive root detection
- **Rule Extension**: Logic to extend उद्/उप + स्था rules to intransitive contexts

## Usage Examples

### Basic Usage
```javascript
import { determineIntransitiveAtmanepada } from './index.js';

// Example 1: Explicit intransitive context
const result1 = determineIntransitiveAtmanepada('गच्छते', {
  transitivity: 'intransitive'
});
console.log(result1); 
// { isIntransitiveAtmanepada: true, confidence: 0.8, transitivity: 'intransitive' }

// Example 2: Ātmanepada ending detection
const result2 = determineIntransitiveAtmanepada('वर्धते');
console.log(result2); 
// { isIntransitiveAtmanepada: true, confidence: 0.7, analysis: 'ते ending detected' }
```

### Advanced Usage
```javascript
// Extension of previous sutra rules
const result3 = determineIntransitiveAtmanepada('स्थीयते', {
  meaning: 'to be stood, to remain'
});
console.log(result3);
// { isIntransitiveAtmanepada: true, extendsUdStha: true, confidence: 0.8 }

// Intransitive meaning detection
const result4 = determineIntransitiveAtmanepada('श्रीयते', {
  meaning: 'to shine, to be resplendent'
});
console.log(result4);
// { isIntransitiveAtmanepada: true, confidence: 0.7, transitivity: 'intransitive' }

// Context-based analysis
const result5 = determineIntransitiveAtmanepada('someform', {
  isIntransitive: true,
  meaning: 'grows, develops naturally'
});
console.log(result5);
// { isIntransitiveAtmanepada: true, confidence: 0.9, transitivity: 'intransitive' }
```

## Technical Notes

- The च (ca) particle indicates this sutra extends previous rules
- Intransitive constructions lack direct objects and often express:
  - Natural processes (growing, shining, moving)
  - State changes (becoming, remaining)
  - Self-directed actions
- Common intransitive patterns include:
  - ते, से, न्ते endings (ātmanepada)
  - Meanings involving "to be", "to become", "to grow"
  - Context indicating lack of transitivity

## Intransitive Detection Criteria

The implementation identifies intransitive usage through:
- **Explicit flags**: `isIntransitive: true`, `transitivity: 'intransitive'`
- **Ātmanepada endings**: ते, से, न्ते, ध्वे, महे patterns
- **Semantic meanings**: Growth, state change, natural processes
- **Root patterns**: Known intransitive roots (गम्, पत्, श्री, etc.)
- **Context analysis**: Lack of direct object indicators

## Related Sutras

- **1.3.24**: उदोऽनूर्द्ध्वकर्मणि (उद् + स्था base rule)
- **1.3.25**: उपान्मन्त्रकरणे (उप + स्था in worship)
- **Extends both**: Previous specific rules to general intransitive usage

## Rule Extension Logic

This sutra specifically extends:
1. **उद् + स्था** rules from 1.3.24 to intransitive उद् + स्था
2. **उप + स्था** rules from 1.3.25 to intransitive उप + स्था
3. **General principle**: Any verb in intransitive usage may take ātmanepada

## Testing

The implementation includes comprehensive tests covering:
- Explicit intransitive context detection
- Ātmanepada ending pattern recognition
- Extension of previous sutra rules
- Semantic intransitive meaning analysis
- Error handling and edge cases
