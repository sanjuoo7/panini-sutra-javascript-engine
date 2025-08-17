# Sutra 1.4.24: ध्रुवमपायेऽपादानम्

## Overview

**Sanskrit Text**: `ध्रुवमपायेऽपादानम्`  
**Transliteration**: dhruvamapoye'pādānama  
**Translation**: A noun whose relation to an action is that of a fixed point from which departure takes place is called अपादान (ablation)

## Purpose

This sutra defines अपादान कारक (apādāna kāraka) - the ablative case relationship. It establishes that when there is a fixed point (ध्रुव) from which departure or separation (अपाय) occurs in relation to a verbal action, that fixed point takes the अपादान designation and requires ablative case marking. This is fundamental for understanding directional and separative relationships in Sanskrit grammar.

## Implementation

### Function Signature
```javascript
function identifyApadana(word, context = {}) {
    // Identifies अपादान (ablative) relationships with fixed departure points
    // Returns ablative case assignment and grammatical analysis
}
```

### Key Features
- Identifies fixed points of departure in verbal actions
- Validates separation and directional contexts
- Supports spatial, temporal, and abstract departure relationships
- Handles various types of ablative constructions
- Integrates with case assignment for ablative endings
- Analyzes semantic roles involving source and origin

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Script identification and conversion
  - `classification.js` - Grammatical classification
  - `directional-analysis.js` - Spatial and directional relationship analysis
  - `verbal-analysis.js` - Verb and action classification
  - `case-assignment.js` - Ablative case assignment
  - `semantic-analysis.js` - Semantic role identification
- **Shared Functions**: Kāraka analysis, directional logic, case application

## Usage Examples

### Basic Usage
```javascript
import { identifyApadana } from './index.js';

// Example 1: Physical departure from place
const result1 = identifyApadana('गृह', { 
  verb: 'गच्छति', 
  context: 'गृहात् गच्छति',
  action_type: 'departure'
});
console.log(result1); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   departure_type: 'spatial',
//   rule: '1.4.24'
// }

// Example 2: Departure from village
const result2 = identifyApadana('ग्राम', { 
  verb: 'निर्गच्छति', 
  context: 'ग्रामात् निर्गच्छति',
  prefix: 'निर्'
});
console.log(result2); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   fixed_point: true,
//   rule: '1.4.24'
// }

// Example 3: Temporal departure
const result3 = identifyApadana('प्रभात', { 
  verb: 'आरभते', 
  context: 'प्रभातात् आरभते',
  temporal: true
});
console.log(result3); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   departure_type: 'temporal',
//   rule: '1.4.24'
// }
```

### Advanced Usage
```javascript
// Abstract departure contexts
const abstractResult = identifyApadana('दुःख', { 
  verb: 'मुच्यते',
  context: 'दुःखात् मुच्यते', // freed from sorrow
  semantic_type: 'liberation'
});

// Multiple departure points
const multiResult = identifyApadana('all', {
  sentence: 'ग्रामात् वनात् च निर्गच्छति',
  verb: 'निर्गच्छति',
  analyze_all_departures: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Basic spatial departure relationships
- Temporal departure contexts
- Abstract separation and liberation
- Integration with directional verbs (निर्गम्, अप्गम्, etc.)
- Fixed point validation and identification
- Complex departure constructions
- Error handling for non-departure contexts
- Script conversion (Devanagari ↔ IAST)
- Integration with ablative case assignment

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.24

# Run with coverage
npm test sutras/1.4.24 --coverage
```

## Technical Details

### Algorithm
1. **Context Validation**: Verify departure/separation context exists
2. **Fixed Point Analysis**: Identify the ध्रुव (fixed reference point)
3. **Departure Detection**: Analyze अपाय (separation/departure) in verbal action
4. **Semantic Analysis**: Classify type of departure (spatial/temporal/abstract)
5. **Case Assignment**: Apply ablative case marking
6. **Validation**: Confirm grammatical and semantic coherence

### Performance
- **Time Complexity**: O(1) for basic cases, O(n) for complex sentence analysis
- **Space Complexity**: O(1) for single relationships
- **Optimization Notes**: Cached departure verb patterns for faster recognition

### Edge Cases
- **Multiple Departure Points**: Handling compound ablative relationships
- **Implicit Departure**: Understanding implied separation contexts
- **Abstract Relationships**: Non-spatial departure (fear, liberation, etc.)
- **Temporal Boundaries**: Start/end point distinctions

## Integration

### Related Sutras
- **1.4.23**: कारके (foundation for all kāraka relationships)
- **1.4.25**: भीत्रार्थानां भयहेतुः (specific ablative for fear contexts)
- **Directional Sutras**: Rules for spatial and movement verbs
- **Case Assignment Sutras**: Ablative case formation rules

### Used By
- Ablative case assignment algorithms
- Directional and spatial analysis systems
- Semantic role labeling for departure/source
- Sanskrit parsing systems for spatial relationships

## References

- **Panini's Ashtadhyayi**: 1.4.24 ध्रुवमपायेऽपादानम्
- **Implementation Notes**: Core definition of ablative relationships in Sanskrit
- **Test References**: Classical examples of departure and separation
- **Scholarly Sources**: Traditional commentaries on अपादान कारक

---

*Generated from template: SUTRA_README_TEMPLATE.md*
