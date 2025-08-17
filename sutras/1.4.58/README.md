# Sutra 1.4.58: प्रादयः

## Overview

**Sanskrit Text**: `प्रादयः`  
**Transliteration**: prādayaḥ  
**Translation**: प्र (forth/forward) etc. [are निपात when not signifying substances]

## Purpose

This sutra extends the classification of निपात (particles) to include प्र and similar prefixal elements when they function independently and do not signify substances. Like sutra 1.4.57 with च-series particles, this rule applies the असत्त्व (non-substance) criterion to determine when words like प्र, परा, अप, सम्, etc. function as particles rather than substantive entities. This is crucial for understanding the multi-functional nature of Sanskrit prefixes and their grammatical classification.

## Implementation

### Function Signature
```javascript
function sutra1458(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies प्र-series prefixal particles
- Analyzes independent vs bound usage
- Handles असत्त्व (non-substance) determination for prefixes
- Manages prefix vs particle classification

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `prefix-analysis`
- **Shared Functions**: `case-operations.js`, `prefix-classifier.js`, `independence-analyzer.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1458 } from './index.js';

// Example 1: प्र as independent particle
const result1 = sutra1458('प्र', {
  context: 'प्र तत् गच्छतु',
  function: 'emphatic_particle',
  signifiesSubstance: false,
  independentUsage: true,
  asattva: true
});
console.log(result1); // { applies: true, classification: 'निपात', function: 'emphatic_particle', asattva: true }

// Example 2: सम् as particle
const result2 = sutra1458('सम्', {
  context: 'सम् इति शुभलक्षणम्',
  function: 'auspicious_particle',
  signifiesSubstance: false,
  independentUsage: true,
  asattva: true
});
console.log(result2); // { applies: true, classification: 'निपात', function: 'auspicious_particle', asattva: true }
```

### Advanced Usage
```javascript
// Complex prefix-particle analysis
const result3 = sutra1458('अप', {
  context: 'अप इति निषेधार्थकम्',
  function: 'negative_particle',
  prefixalOrigin: true,
  independentFunction: true,
  semanticShift: 'prefix_to_particle'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- प्र-series prefix-particle identification
- Independent vs bound usage analysis
- असत्त्व (non-substance) determination for prefixal elements
- Multi-script support and error handling
- Integration with prefix and particle classification systems
- Edge cases with context-dependent prefix-particle functions

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.58

# Run with coverage
npm test sutras/1.4.58 --coverage
```

## Technical Details

### Algorithm
1. **Prefix Recognition**: Identify प्र-series prefixal elements
2. **Independence Analysis**: Determine independent vs bound usage
3. **Semantic Assessment**: Verify non-substantive function
4. **Classification**: Assign निपात status when conditions met

### Performance
- **Time Complexity**: O(n) for independence analysis
- **Space Complexity**: O(1) for classification
- **Optimization Notes**: Uses prefix pattern matching for efficiency

### Edge Cases
- Prefixes that retain substantive meaning
- Context-dependent prefix-particle alternation
- Compound formations with prefixal elements
- Historical evolution from prefix to particle

## Integration

### Related Sutras
- **1.4.56**: प्राग्रीश्वरान्निपाताः (अधिकार for particles)
- **1.4.57**: चादयोऽसत्त्वे (च-series particles)
- **3.1.1**: प्रत्ययः (definition of suffix/prefix)

### Used By
- Prefix classification systems
- Particle analysis engines
- Independence analyzers
- Morphological processors

## References

- **Panini's Ashtadhyayi**: 1.4.58 प्रादयः
- **Classical Examples**: Independent prefix usage in Sanskrit literature
- **Morphological Context**: Prefix-particle transition in Sanskrit grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
