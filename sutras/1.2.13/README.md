# Sutra 1.2.13: वा गमः

## Overview

**Sanskrit Text**: `वा गमः`  
**Transliteration**: vā gamaḥ  
**Translation**: Optionally, गम्

## Purpose

This sutra introduces optionality (वा) for the कित् designation of affixes after the root गम् (to go). When the conditions of either Sutra 1.2.11 (लिङश्च - लिङ् affix in आत्मनेपद) or Sutra 1.2.12 (सिज्झल्यमाने - सिच् beginning with झल् in आत्मनेपद) are met with the गम् root, the कित् designation becomes optional rather than mandatory.

This अतिदेश (extension/modification) rule allows for grammatical flexibility specifically for the गम् root, accommodating various forms and usages in Sanskrit literature where the कित् designation may or may not apply.

## Implementation

### Function Signature
```javascript
function sutra_1_2_13(word, context = {}) {
    // Returns analysis of optional कित् designation for गम् root
}
```

### Key Features
- **Root-Specific Optionality**: Applies only to गम् root and its variants (गच्छ्)
- **Conditional Application**: Based on Sutras 1.2.11 and 1.2.12 conditions
- **Multi-Script Support**: Works with both Devanagari and IAST scripts
- **Context-Aware Analysis**: Considers affix types and पद (voice) information
- **Detailed Reasoning**: Provides comprehensive analysis of rule application

### Dependencies
- **Sanskrit Utils**: 
  - `isGamRoot()` from kit-designation.js
  - `isSicAffix()` from kit-designation.js
  - `isLingAffix()` from kit-designation.js
  - `beginsWithJhal()` from kit-designation.js
  - `isAtmanepadaAffix()` from pada-analysis.js
  - `validateSanskritWord()` from validation.js
  - `detectScript()` from script-detection.js

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_2_13, isKitOptionalForGam } from './index.js';

// Example 1: गम् + लिङ् in आत्मनेपद (Sutra 1.2.11 base)
const result1 = sutra_1_2_13('गम्', { 
    affix: 'लिङ्', 
    followingAffix: 'त' 
});
console.log(result1.applies); // true
console.log(result1.optional); // true

// Example 2: गम् + सिच् in आत्मनेपद (Sutra 1.2.12 base)
const result2 = sutra_1_2_13('गम्', { 
    affix: 'सिच्', 
    followingAffix: 'ते' 
});
console.log(result2.applies); // true
console.log(result2.optional); // true

// Example 3: Quick optionality check
const isOptional = isKitOptionalForGam('गच्छ्', {
    affix: 'लिङ्',
    followingAffix: 'स्व'
});
console.log(isOptional); // true
```

### Advanced Usage
```javascript
import { analyzeGamOptionalKit } from './index.js';

// Detailed analysis with debug information
const analysis = analyzeGamOptionalKit('गम्', {
    affix: 'सिच्',
    followingAffix: 'ते'
});

console.log(analysis.analysis.conditions1212Met); // true
console.log(analysis.reasoning); 
// ['गम् root with conditions of Sutra 1.2.12 met',
//  'Due to वा (optionally), कित् designation is optional']

// IAST script support
const iastResult = sutra_1_2_13('gam', {
    affix: 'liṅ',
    followingAffix: 'ta'
});
console.log(iastResult.applies); // true

// Negative case: non-गम् root
const negativeResult = sutra_1_2_13('कृ', {
    affix: 'लिङ्',
    followingAffix: 'त'
});
console.log(negativeResult.applies); // false
```

### Edge Cases
```javascript
// Missing followingAffix (assumes आत्मनेपद context)
const assumedContext = sutra_1_2_13('गम्', { 
    affix: 'लिङ्',
    debug: true 
});
console.log(assumedContext.applies); // true
console.log(assumedContext.debug); // Contains warning about assumption

// Invalid affix (rule doesn't apply)
const invalidAffix = sutra_1_2_13('गम्', {
    affix: 'तिप्',
    followingAffix: 'त'
});
console.log(invalidAffix.applies); // false
```

## Rule Dependencies

This sutra depends on and modifies the application of:

1. **Sutra 1.2.11** (लिङश्च): लिङ् affix is कित् in आत्मनेपद
2. **Sutra 1.2.12** (सिज्झल्यमाने): सिच् beginning with झल् is कित् in आत्मनेपद

The वा (optionally) makes these rules optional specifically for the गम् root.

## Technical Notes

- **Optionality Semantics**: The वा indicates that both कित् and non-कित् treatments are grammatically valid
- **Root Variants**: Handles different forms of गम् including गच्छ् (suppletive form)
- **Script Agnostic**: Consistent behavior across Devanagari and IAST representations
- **Context Validation**: Requires proper affix and voice information for accurate analysis
- **Error Handling**: Graceful handling of invalid inputs with meaningful error messages

## Test Coverage

The implementation includes comprehensive testing for:
- Core functionality with both base rule conditions
- Negative cases (non-गम् roots, invalid affixes, wrong voice)
- Edge cases (missing context, invalid inputs)
- Multi-script support and consistency
- Integration with dependent sutras (1.2.11 and 1.2.12)
- Helper function behaviors
