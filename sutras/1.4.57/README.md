# Sutra 1.4.57: चादयोऽसत्त्वे

## Overview

**Sanskrit Text**: `चादयोऽसत्त्वे`  
**Transliteration**: cādayo 'sattve  
**Translation**: च (and) etc. [are निपात] when not signifying substance (असत्त्व)

## Purpose

This sutra defines specific conditions under which certain words like च (and), वा (or), तु (but), and similar particles are classified as निपात (particles/indeclinables). The key criterion is असत्त्व - when these words do not signify substances or concrete entities. This distinguishes their particle function from any potential substantive usage, ensuring proper grammatical classification based on semantic function rather than mere form.

## Implementation

### Function Signature
```javascript
function sutra1457(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies च-series particles in non-substantive contexts
- Analyzes semantic function vs form distinction
- Handles असत्त्व (non-substance) determination
- Manages particle vs substantive classification

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `semantic-analysis`
- **Shared Functions**: `case-operations.js`, `substance-analysis.js`, `particle-classifier.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1457 } from './index.js';

// Example 1: च as conjunction (non-substantive)
const result1 = sutra1457('च', {
  context: 'रामः सीता च गच्छतः',
  function: 'conjunction',
  signifiesSubstance: false,
  semanticRole: 'connective',
  asattva: true
});
console.log(result1); // { applies: true, classification: 'निपात', function: 'conjunction', asattva: true }

// Example 2: वा as disjunction (non-substantive)
const result2 = sutra1457('वा', {
  context: 'चायं वा कॉफी वा पिब',
  function: 'disjunction',
  signifiesSubstance: false,
  semanticRole: 'alternative',
  asattva: true
});
console.log(result2); // { applies: true, classification: 'निपात', function: 'disjunction', asattva: true }
```

### Advanced Usage
```javascript
// Complex semantic analysis
const result3 = sutra1457('तु', {
  context: 'सः गच्छति तु न आगच्छति',
  function: 'adversative',
  substantiveTest: false,
  semanticAnalysis: 'complete',
  contextualRole: 'contrast_marker'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- च-series particle identification and classification
- असत्त्व (non-substance) semantic analysis
- Substance vs non-substance distinction
- Multi-script support and error handling
- Integration with particle classification systems
- Edge cases with ambiguous semantic functions

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.57

# Run with coverage
npm test sutras/1.4.57 --coverage
```

## Technical Details

### Algorithm
1. **Particle Recognition**: Identify च-series words
2. **Semantic Analysis**: Determine substantive vs non-substantive function
3. **असत्त्व Assessment**: Verify non-substance signification
4. **Classification**: Assign निपात status when conditions met

### Performance
- **Time Complexity**: O(n) for semantic analysis
- **Space Complexity**: O(1) for classification
- **Optimization Notes**: Uses semantic pattern matching for efficiency

### Edge Cases
- Words that can function as both particles and substantives
- Context-dependent semantic interpretation
- Archaic and specialized usages
- Compound formations containing च-series elements

## Integration

### Related Sutras
- **1.4.56**: प्राग्रीश्वरान्निपाताः (अधिकार for particles)
- **1.4.58**: प्रादयः (प्र-series particles)
- **1.1.37**: स्वरादिनिपातमव्ययम् (indeclinable nature)

### Used By
- Particle classification systems
- Semantic analysis engines
- Substance/non-substance processors
- Grammatical categorization tools

## References

- **Panini's Ashtadhyayi**: 1.4.57 चादयोऽसत्त्वे
- **Classical Examples**: Non-substantive usage in Sanskrit literature
- **Semantic Context**: Distinction between substance and function in grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
