# Sutra 1.4.52: गतिर्यः कर्म शब्दयते

## Overview

**Sanskrit Text**: `गतिर्यः कर्म शब्दयते`  
**Transliteration**: gatir yaḥ karma śabdayate  
**Translation**: गति (motion/movement) which expresses कर्म [is called कर्म]

## Purpose

This sutra establishes that गति (movement, motion, path) functions as कर्म कारक when it expresses the object or goal of movement. This rule specifically deals with motion expressions where the path, direction, or movement itself becomes the object of the action. It's particularly important for understanding spatial and directional relationships in Sanskrit.

## Implementation

### Function Signature
```javascript
function sutra1452(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies motion and path expressions as कर्म
- Analyzes directional and spatial movement
- Handles abstract and concrete motion concepts
- Integrates with movement and spatial analysis

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `motion-analysis`
- **Shared Functions**: `case-operations.js`, `spatial-movement-analysis.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1452 } from './index.js';

// Example 1: Directional movement
const result1 = sutra1452('उत्तरगति', {
  agent: 'यात्री',
  action: 'गमन',
  context: 'यात्री उत्तरगतिं गच्छति',
  motionType: 'directional',
  case: 'accusative'
});
console.log(result1); // { applies: true, karaka: 'कर्म', motionExpression: 'directional_path' }

// Example 2: Movement pattern
const result2 = sutra1452('वक्रगति', {
  agent: 'नदी',
  action: 'प्रवाह',
  context: 'नदी वक्रगतिं प्रवहति',
  movementPattern: 'curved'
});
console.log(result2); // { applies: true, karaka: 'कर्म', pathType: 'curved_motion' }
```

### Advanced Usage
```javascript
// Complex motion analysis
const result3 = sutra1452('आकाशगमन', {
  agent: 'विमान',
  action: 'यान',
  context: 'विमानम् आकाशगमनं करोति',
  spatialDimension: 'aerial',
  motionComplexity: 'three_dimensional'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Motion and path expression identification
- Directional and spatial movement analysis
- Abstract vs concrete motion concepts
- Multi-script support and error handling
- Integration with movement verbs and spatial concepts
- Edge cases with complex and metaphorical movements

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.52

# Run with coverage
npm test sutras/1.4.52 --coverage
```

## Technical Details

### Algorithm
1. **Motion Detection**: Identify movement and path indicators
2. **Gati Analysis**: Determine type and nature of motion
3. **Expression Assessment**: Analyze how motion functions as कर्म
4. **Karaka Assignment**: Assign कर्म designation for motion expressions

### Performance
- **Time Complexity**: O(n) for motion pattern matching
- **Space Complexity**: O(1) for standard motion analysis
- **Optimization Notes**: Uses motion categorization for efficiency

### Edge Cases
- Complex multi-dimensional movements
- Metaphorical vs literal motion expressions
- Composite motion patterns
- Temporal vs spatial movement concepts

## Integration

### Related Sutras
- **1.4.47**: गम्यमानं च (destinations being approached)
- **1.4.48**: उपसृष्टं च (contacted entities)
- **2.3.18**: कर्तुः प्रकरणे द्वितीया (accusative for agent's कर्म)

### Used By
- Motion analysis systems
- Spatial relationship processors
- Navigation and pathfinding applications
- Movement pattern analyzers

## References

- **Panini's Ashtadhyayi**: 1.4.52 गतिर्यः कर्म शब्दयते
- **Classical Examples**: Movement descriptions in travel literature
- **Spatial Context**: Traditional concepts of motion and direction

---

*Generated from template: SUTRA_README_TEMPLATE.md*
