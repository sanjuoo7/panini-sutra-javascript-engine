# Sutra 1.4.60: गतिश्च

## Overview

**Sanskrit Text**: `गतिश्च`  
**Transliteration**: gatiśca  
**Translation**: गति (movement) and also [the प्र etc. get the designation गति when in verbal composition]

## Purpose

This sutra establishes that प्र and similar prefixes (referred to in previous sutras) receive an additional technical designation of गति (movement/motion) when they are in composition with verbs, specifically verbs of motion. This creates a triple classification system: these elements can be निपात (when independent), उपसर्ग (when bound to verbs), and गति (when bound to motion verbs). The गति designation is crucial for specific grammatical rules that apply only to motion-related prefixal elements.

## Implementation

### Function Signature
```javascript
function sutra1460(prefix, verb, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies prefix-motion verb combinations
- Assigns गति classification to motion-related prefixes  
- Manages triple classification (निपात/उपसर्ग/गति)
- Analyzes motion semantics in verbal composition

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `motion-analysis`
- **Shared Functions**: `gati-classifier.js`, `motion-verb-analyzer.js`, `prefix-motion-detector.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1460 } from './index.js';

// Example 1: प्र with गम् (motion verb)
const result1 = sutra1460('प्र', 'गम्', {
  context: 'प्रगच्छति',
  kriyaYoga: true,
  motionVerb: true,
  designation: 'गति',
  semanticRole: 'directional_motion'
});
console.log(result1); // { applies: true, classification: 'गति', motionVerb: true, semanticRole: 'directional_motion' }

// Example 2: उप with पत् (motion verb)
const result2 = sutra1460('उप', 'पत्', {
  context: 'उपपतति',
  kriyaYoga: true,
  motionVerb: true,
  motionType: 'approach',
  designation: 'गति'
});
console.log(result2); // { applies: true, classification: 'गति', motionType: 'approach' }
```

### Advanced Usage
```javascript
// Complex motion analysis
const result3 = sutra1460('सम्', 'आ_गम्', {
  context: 'समागच्छति',
  kriyaYoga: true,
  complexMotion: true,
  semanticComposition: 'convergent_motion',
  tripleClassification: ['निपात', 'उपसर्ग', 'गति']
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 32+ tests covering:
- Motion verb identification and prefix-motion combinations
- गति classification for motion-related contexts
- Triple classification system (निपात/उपसर्ग/गति)
- Multi-script support and error handling
- Integration with motion semantics and verbal morphology
- Edge cases with metaphorical and extended motion

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.60

# Run with coverage
npm test sutras/1.4.60 --coverage
```

## Technical Details

### Algorithm
1. **Motion Verb Recognition**: Identify verbs expressing motion/movement
2. **Prefix-Motion Analysis**: Verify prefix modifies motion semantics
3. **गति Assignment**: Assign गति designation when conditions met
4. **Classification Integration**: Manage multiple concurrent designations

### Performance
- **Time Complexity**: O(n) for motion semantic analysis
- **Space Complexity**: O(1) for classification
- **Optimization Notes**: Uses motion semantic patterns for efficiency

### Edge Cases
- Metaphorical motion expressions
- Abstract movement concepts
- Compound motion verbs
- Historical evolution of motion semantics

## Integration

### Related Sutras
- **1.4.56**: प्राग्रीश्वरान्निपाताः (अधिकार for particles)
- **1.4.58**: प्रादयः (प्र-series as निपात when independent)
- **1.4.59**: उपसर्गाः क्रियायोगे (उपसर्ग designation in verbal composition)

### Used By
- Motion analysis systems
- Gati classification engines
- Verbal morphology processors
- Semantic motion analyzers

## References

- **Panini's Ashtadhyayi**: 1.4.60 गतिश्च
- **Classical Examples**: Motion-related prefix usage in Sanskrit literature
- **Semantic Context**: Movement and spatial relationships in Sanskrit grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
