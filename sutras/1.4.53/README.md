# Sutra 1.4.53: हृक्रोरन्यतरस्याम्

## Overview

**Sanskrit Text**: `हृक्रोरन्यतरस्याम्`  
**Transliteration**: hṛkror anyatarasya-am  
**Translation**: Optionally for हृ (to lose/take away) and कृ (to make/do) [the agent becomes कर्म]

## Purpose

This sutra establishes an optional rule where the agent (कर्ता) of the verbs हृ (to lose, take away, remove) and कृ (to make, do, create) can optionally be treated as कर्म कारक under specific conditions. This creates a grammatical flexibility that reflects certain semantic relationships where the traditional agent-object distinction becomes blurred or inverted. This is particularly relevant in passive constructions and certain specialized usages of these fundamental verbs.

## Implementation

### Function Signature
```javascript
function sutra1453(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies हृ and कृ verb constructions
- Analyzes optional कर्ता to कर्म transformation
- Handles semantic role flexibility
- Manages grammatical optionality (वैकल्पिकता)

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `verb-analysis`
- **Shared Functions**: `case-operations.js`, `verb-classification.js`, `role-transformation.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1453 } from './index.js';

// Example 1: हृ verb with optional कर्म treatment
const result1 = sutra1453('चोर', {
  verb: 'हरति',
  action: 'हरण',
  context: 'चोरो धनं हरति',
  agentRole: 'कर्ता',
  optionalKarma: true,
  semanticRole: 'taker'
});
console.log(result1); // { applies: true, optionalKarma: true, originalRole: 'कर्ता', alternateRole: 'कर्म' }

// Example 2: कृ verb with role flexibility
const result2 = sutra1453('कारक', {
  verb: 'करोति',
  action: 'करण',
  context: 'कारकः कार्यं करोति',
  agentRole: 'कर्ता',
  optionalTransformation: true,
  semanticRole: 'maker'
});
console.log(result2); // { applies: true, optionalKarma: true, verbType: 'कृ', roleFlexibility: true }
```

### Advanced Usage
```javascript
// Complex role analysis
const result3 = sutra1453('निष्पादक', {
  verb: 'निष्पादयति',
  action: 'निष्पादन',
  context: 'निष्पादकः कार्यं निष्पादयति',
  causativeForm: true,
  agentComplexity: 'complex',
  roleAmbiguity: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 32+ tests covering:
- हृ and कृ verb identification and analysis
- Optional कर्ता to कर्म transformation scenarios
- Semantic role flexibility and grammatical optionality
- Multi-script support and error handling
- Integration with verb analysis and role transformation systems
- Edge cases with causative forms and complex agent-object relationships

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.53

# Run with coverage
npm test sutras/1.4.53 --coverage
```

## Technical Details

### Algorithm
1. **Verb Identification**: Identify हृ and कृ verb forms
2. **Agent Analysis**: Analyze the agent's semantic role
3. **Optionality Assessment**: Determine conditions for optional कर्म treatment
4. **Role Assignment**: Apply optional कर्ता-कर्म transformation

### Performance
- **Time Complexity**: O(n) for verb form analysis
- **Space Complexity**: O(1) for role transformation
- **Optimization Notes**: Uses verb root classification for efficiency

### Edge Cases
- Causative and derived forms of हृ and कृ
- Complex compound verbs containing हृ/कृ
- Passive constructions with role inversion
- Multiple agent scenarios with ambiguous roles

## Integration

### Related Sutras
- **1.4.49**: कर्तुरीप्सिततमं कर्म (most desired by agent as कर्म)
- **1.4.50**: तथायुक्तं चानीप्सितम् (similarly connected undesired as कर्म)
- **1.4.51**: अकथितं च (unspecified objects as कर्म)
- **3.1.7**: धातोः कर्मणि च भावे च (verbal affixes for कर्म and भाव)

### Used By
- Verb analysis systems
- Grammatical role processors
- Passive construction analyzers
- Semantic role assignment algorithms

## References

- **Panini's Ashtadhyayi**: 1.4.53 हृक्रोरन्यतरस्याम्
- **Classical Examples**: Usage patterns in classical Sanskrit literature
- **Grammatical Context**: Optional rules and semantic flexibility in कारक assignment

---

*Generated from template: SUTRA_README_TEMPLATE.md*
