# Sutra 1.3.24: उदोऽनूर्द्ध्वकर्मणि

## Overview

**Sanskrit Text**: `उदोऽनूर्द्ध्वकर्मणि`  
**Transliteration**: udo'nūrdhvakarmaṇi  
**Translation**: From उद् (prefix), except in the meaning of upward motion

## Purpose

This sutra prescribes ātmanepada endings for the root स्था (to stand) when preceded by the prefix उद्, but specifically excludes cases where the meaning relates to "rising up" or "getting up" (ऊर्द्ध्वकर्मन्). The sutra applies when उद् + स्था does not indicate upward movement.

## Implementation

### Function Signature
```javascript
function determineUdSthaAtmanepada(word, context = {}) {
    // Returns analysis of ātmanepada assignment for उद् + स्था
}
```

### Key Features
- Pattern recognition for उद् + स्था combinations in both Devanagari and IAST
- Semantic exclusion of "rising/upward" meanings (अनूर्द्ध्वकर्मणि)
- Context-sensitive analysis for worship and non-motion meanings
- Comprehensive error handling and input validation
- Support for compound words and variant forms

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `tokenizePhonemes`
- **Pattern Recognition**: Internal regex patterns for prefix-root combinations
- **Semantic Analysis**: Meaning-based exclusion logic

## Usage Examples

### Basic Usage
```javascript
import { determineUdSthaAtmanepada } from './index.js';

// Example 1: Valid ātmanepada (non-rising meaning)
const result1 = determineUdSthaAtmanepada('उत्तिष्ठते');
console.log(result1); 
// { isUdSthaAtmanepada: true, confidence: 0.8, prefix: 'उद्', root: 'स्था' }

// Example 2: Excluded due to rising meaning
const result2 = determineUdSthaAtmanepada('उत्थानार्थम्', {
  meaning: 'rising up, getting up'
});
console.log(result2); 
// { isUdSthaAtmanepada: false, excludesRising: true, confidence: 0.1 }
```

### Advanced Usage
```javascript
// IAST script support
const result3 = determineUdSthaAtmanepada('uttiṣṭhate');
console.log(result3);
// { isUdSthaAtmanepada: true, confidence: 0.8, script: 'IAST' }

// Context-based analysis
const result4 = determineUdSthaAtmanepada('someform', {
  root: 'स्था',
  prefix: 'उद्',
  meaning: 'to position, to establish'
});
console.log(result4);
// { isUdSthaAtmanepada: true, confidence: 0.9, excludesRising: false }

// Mixed case handling
const result5 = determineUdSthaAtmanepada('उत्स्थित');
console.log(result5);
// { isUdSthaAtmanepada: true, confidence: 0.7, analysis: 'उत्स्थित- form' }
```

## Technical Notes

- The exclusion अनूर्द्ध्वकर्मणि is crucial for this sutra's application
- Rising meanings include: उत्थान (getting up), ऊर्द्ध्व (upward), उत्क्रमण (ascending)
- Non-rising meanings include: स्थापन (establishing), अवस्थान (positioning)
- The function analyzes semantic context to determine appropriate exclusions

## Related Sutras

- **1.3.25**: उपान्मन्त्रकरणे (extends to उप + स्था in worship contexts)
- **1.3.26**: अकर्मकाच्च (general intransitive extension)

## Testing

The implementation includes comprehensive tests covering:
- Valid उद् + स्था combinations
- Exclusion of rising meanings
- IAST and Devanagari script support
- Error handling and edge cases
- Semantic analysis validation
