# Sutra 1.4.59: उपसर्गाः क्रियायोगे

## Overview

**Sanskrit Text**: `उपसर्गाः क्रियायोगे`  
**Transliteration**: upasragāḥ kriyāyoge  
**Translation**: उपसर्ग (prefixes) in combination with क्रिया (verbs) [retain the designation उपसर्ग]

## Purpose

This sutra establishes that प्र and similar elements (referred to in 1.4.58) receive the technical designation of उपसर्ग (prefix) when they are in composition with verbal roots (क्रियायोग). This is crucial for distinguishing between their निपात (particle) function (when independent) and their उपसर्ग (prefix) function (when bound to verbs). This dual classification system enables precise grammatical analysis and determines which rules apply in different contexts.

## Implementation

### Function Signature
```javascript
function sutra1459(prefix, verb, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies prefix-verb combinations (क्रियायोग)
- Assigns उपसर्ग classification to bound prefixes
- Distinguishes from निपात usage when independent
- Manages dual classification systems

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `verb-analysis`
- **Shared Functions**: `prefix-analysis.js`, `kriya-yoga-analyzer.js`, `upasarga-classifier.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1459 } from './index.js';

// Example 1: प्र with गम् (to go)
const result1 = sutra1459('प्र', 'गम्', {
  context: 'प्रगच्छति',
  kriyaYoga: true,
  composition: 'prefix_verb',
  designation: 'उपसर्ग',
  boundUsage: true
});
console.log(result1); // { applies: true, classification: 'उपसर्ग', kriyaYoga: true, composition: 'prefix_verb' }

// Example 2: सम् with स्था (to stand)
const result2 = sutra1459('सम्', 'स्था', {
  context: 'संतिष्ठति',
  kriyaYoga: true,
  verbalComposition: true,
  prefixFunction: 'completive',
  designation: 'उपसर्ग'
});
console.log(result2); // { applies: true, classification: 'उपसर्ग', prefixFunction: 'completive' }
```

### Advanced Usage
```javascript
// Complex prefix-verb analysis
const result3 = sutra1459('वि', 'कृ', {
  context: 'विकरोति',
  kriyaYoga: true,
  semanticModification: 'specialization',
  morphophonetics: 'sandhi_applied',
  verbalMeaning: 'modified'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Prefix-verb combination identification (क्रियायोग)
- उपसर्ग classification in bound contexts
- Distinction from निपात usage when independent
- Multi-script support and error handling
- Integration with verbal morphology and prefix systems
- Edge cases with complex verbal formations

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.59

# Run with coverage
npm test sutras/1.4.59 --coverage
```

## Technical Details

### Algorithm
1. **Combination Recognition**: Identify prefix-verb combinations
2. **Context Analysis**: Verify क्रियायोग (verbal composition)
3. **Classification**: Assign उपसर्ग designation when bound
4. **Morphophonetic Analysis**: Handle sandhi in composition

### Performance
- **Time Complexity**: O(n) for composition analysis
- **Space Complexity**: O(1) for classification
- **Optimization Notes**: Uses morphophonetic patterns for efficiency

### Edge Cases
- Complex multi-prefix combinations
- Verbal derivatives and causatives
- Archaic and Vedic verbal forms
- Denominative and desiderative formations

## Integration

### Related Sutras
- **1.4.56**: प्राग्रीश्वरान्निपाताः (अधिकार for particles)
- **1.4.58**: प्रादयः (प्र-series as निपात when independent)
- **1.4.60**: गतिश्च (गति designation for prefixes with verbs)

### Used By
- Prefix classification systems
- Verbal morphology analyzers
- Compositional analysis engines
- Morphophonetic processors

## References

- **Panini's Ashtadhyayi**: 1.4.59 उपसर्गाः क्रियायोगे
- **Classical Examples**: Prefix-verb compositions in Sanskrit literature
- **Morphological Context**: Dual classification systems in Sanskrit grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
