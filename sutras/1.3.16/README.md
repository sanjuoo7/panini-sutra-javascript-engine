# Sutra 1.3.16: इतरेतरान्योन्योपपदाच्च

## Overview

**Sanskrit Text**: `इतरेतरान्योन्योपपदाच्च`  
**Transliteration**: itaretarānyonyopapadācca  
**Translation**: And from [verbs with] itaretara and anyonya as upapada

## Purpose

This sutra provides another important exception to Sutra 1.3.14 (कर्त्तरि कर्म्मव्यतिहारे). When verbs are used with the specific compound words इतरेतर (itaretara - "each other") or अन्योन्य (anyonya - "one another") as उपपद (upapada - qualifying/dependent words), ātmanepada endings are NOT used, even though reciprocal action is clearly expressed. This rule recognizes that these specific compounds have their own grammatical behavior that overrides the general reciprocal action rule.

## Implementation

### Function Signature
```javascript
function determineItaretaraAnyonyaException(verb, context = {}) {
    // Returns exception applicability analysis for itaretara/anyonya compound usage
}
```

### Key Features
- **Itaretara Detection**: Identifies इतरेतर compound usage in various contexts
- **Anyonya Detection**: Identifies अन्योन्य compound usage and patterns
- **Upapada Analysis**: Analyzes qualifying words (upapada) for compound usage
- **Multi-Field Analysis**: Checks compounds, expressions, and qualifier arrays
- **Exception Determination**: Determines if Sutra 1.3.16 exception applies
- **Multi-Script Support**: Handles both IAST and Devanagari compound forms

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection for input text
  - `validateSanskritWord` - Input validation for Sanskrit words
- **Shared Functions**: None (self-contained implementation)

## Usage Examples

### Basic Usage
```javascript
import { determineItaretaraAnyonyaException, hasItaretaraCompound, hasAnyonyaCompound } from './index.js';

// Example 1: Itaretara compound detection
const itaretaraResult = determineItaretaraAnyonyaException('vad', {
  upapada: 'itaretara'
});
console.log(itaretaraResult);
// {
//   success: true,
//   verb: 'vad',
//   script: 'IAST',
//   appliesException: true,
//   reason: 'Itaretara compound exception - does not take ātmanepada per Sutra 1.3.16',
//   confidence: 0.9,
//   compoundType: 'itaretara',
//   rule: '1.3.16'
// }

// Example 2: Anyonya compound detection
const anyonyaResult = determineItaretaraAnyonyaException('darś', {
  upapada: 'अन्योन्य'
});
console.log(anyonyaResult);
// {
//   success: true,
//   verb: 'darś',
//   script: 'IAST',
//   appliesException: true,
//   reason: 'Anyonya compound exception - does not take ātmanepada per Sutra 1.3.16',
//   confidence: 0.9,
//   compoundType: 'anyonya',
//   rule: '1.3.16'
// }
```

### Advanced Usage
```javascript
// Multi-field compound analysis
const complexResult = determineItaretaraAnyonyaException('kṛ', {
  upapada: 'itaretara',
  compounds: 'itaretara-karma',
  expression: 'They perform each other\'s duties respectively',
  qualifiers: ['sequential', 'alternating'],
  includeAnalysis: true
});

console.log(complexResult.compoundAnalysis);
// {
//   hasItaretara: true,
//   hasAnyonya: false,
//   compoundType: 'itaretara',
//   compoundIndicators: [
//     { type: 'upapada_itaretara', value: 'itaretara', strength: 0.9 },
//     { type: 'compound_itaretara', value: 'itaretara', strength: 0.8 },
//     { type: 'expression_itaretara', value: 'each other', strength: 0.7 }
//   ],
//   compoundStrength: 1.0
// }

// Simple helper functions
const hasItaretara = hasItaretaraCompound('each other respectively'); // true
const hasAnyonya = hasAnyonyaCompound('one another mutually'); // true

// Force classification for testing
const testResult = determineItaretaraAnyonyaException('test', { 
  forceAnyonya: true 
});
console.log(testResult.compoundType); // 'anyonya'
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30 tests covering:
- Basic itaretara and anyonya compound detection
- Multi-field analysis (upapada, compounds, expression, qualifiers)
- Force flags for testing scenarios
- Script handling (IAST, Devanagari, unknown)
- Integration with traditional grammatical examples
- Helper function interfaces
- Error handling and edge cases
- Performance with large contexts

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.16

# Run with coverage
npm test sutras/1.3.16 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit verb and context structure
2. **Compound Analysis**: 
   - **Upapada Analysis**: Examines qualifying words for compound patterns
   - **Field Analysis**: Checks compounds, expressions, and qualifiers arrays
   - **Pattern Matching**: Uses case-insensitive matching for compound detection
3. **Type Determination**: Prioritizes stronger evidence when both compound types present
4. **Exception Application**: Determines if exception (no ātmanepada) applies based on compound presence

### Performance
- **Time Complexity**: O(n) where n is size of context fields and pattern lists
- **Space Complexity**: O(1) excluding input/output
- **Optimization Notes**: Efficient pattern matching with early breaking on matches

### Edge Cases
- **Mixed Compounds**: Handles contexts with both itaretara and anyonya references
- **Weak Evidence**: Conservative approach requiring clear compound presence
- **Case Sensitivity**: Robust case-insensitive matching for various text inputs
- **Null Handling**: Graceful handling of null/undefined context fields

## Integration

### Related Sutras
- **1.3.14**: Primary reciprocal action rule that this sutra modifies
- **1.3.15**: Motion/injury exception rule (parallel exception structure)
- **1.3.17-1.3.18**: Additional specific verb-preposition exceptions

### Used By
- Voice assignment systems in Sanskrit computational grammar
- Compound analysis in classical Sanskrit text processing
- Educational tools for advanced Sanskrit grammar instruction
- Sanskrit parsing systems handling complex grammatical exceptions

## References

- **Panini's Ashtadhyayi**: Adhyaya 1, Pada 3, Sutra 16
- **Implementation Notes**: Based on traditional understanding of उपपद (upapada) relationships and compound word behavior in Sanskrit grammar
- **Test References**: Traditional grammatical examples demonstrating itaretara/anyonya compound exceptions to reciprocal voice rules

---

*Generated from template: SUTRA_README_TEMPLATE.md*
