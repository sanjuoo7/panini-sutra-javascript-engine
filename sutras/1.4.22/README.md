# Sutra 1.4.22: द्व्येकयोर्द्विवचनैकवचने

## Overview

**Sanskrit Text**: `द्व्येकयोर्द्विवचनैकवचने`  
**Transliteration**: dvyekayordvivacanaikavacane  
**Translation**: The dual and singular case-affixes are employed severally in the sense of duality and unity

## Purpose

This sutra establishes the fundamental rule for using dual case affixes (द्विवचन) when expressing duality (द्वि) and singular case affixes (एकवचन) when expressing unity/singularity (एक). It complements sutra 1.4.21 by completing the grammatical number system, ensuring proper case endings are applied based on the numerical context - whether referring to one entity (singular), two entities (dual), or multiple entities (plural).

## Implementation

### Function Signature
```javascript
function applyDualSingularRule(word, context = {}) {
    // Determines if dual or singular case affixes should be applied
    // Returns transformation information and validation
}
```

### Key Features
- Detects duality contexts requiring dual case affixes
- Detects unity contexts requiring singular case affixes  
- Validates grammatical conditions for dual/singular application
- Supports both Devanagari and IAST input/output
- Handles edge cases for irregular dual and singular formations
- Integrates with complete case ending system

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Script identification and conversion
  - `classification.js` - Grammatical classification
  - `case-endings.js` - Case affix systems for dual and singular
  - `validation.js` - Input validation
  - `transliteration.js` - Script conversion utilities
  - `number-detection.js` - Numerical context analysis
- **Shared Functions**: Case application logic, number detection, grammatical analysis

## Usage Examples

### Basic Usage
```javascript
import { applyDualSingularRule } from './index.js';

// Example 1: Dual application
const result1 = applyDualSingularRule('देव', { count: 'dual', case: 'nominative' });
console.log(result1); 
// Expected: { 
//   applies: true, 
//   form: 'देवौ', 
//   case: 'nominative_dual',
//   rule: '1.4.22'
// }

// Example 2: Singular application  
const result2 = applyDualSingularRule('देव', { count: 'singular', case: 'nominative' });
console.log(result2); 
// Expected: { 
//   applies: true, 
//   form: 'देवः', 
//   case: 'nominative_singular',
//   rule: '1.4.22'
// }

// Example 3: IAST dual input
const result3 = applyDualSingularRule('deva', { count: 'dual', case: 'accusative', script: 'iast' });
console.log(result3); 
// Expected: { 
//   applies: true, 
//   form: 'devau', 
//   case: 'accusative_dual',
//   rule: '1.4.22'
// }
```

### Advanced Usage
```javascript
// Context-sensitive dual/singular detection
const contextualResult = applyDualSingularRule('नेत्र', { 
  semantic_context: 'pair_of_eyes',
  natural_dual: true,
  case: 'instrumental'
});

// Validation with number indicators
const numberResult = applyDualSingularRule('हस्त', { 
  context: 'एकेन हस्तेन', // with one hand
  numerical_indicator: 'एक',
  case: 'instrumental'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Basic dual application for different noun classes and cases
- Basic singular application for different noun classes and cases
- Case-specific dual/singular endings (all 8 cases)
- Script conversion (Devanagari ↔ IAST)
- Natural pairs requiring dual (eyes, hands, etc.)
- Context validation for numerical requirements
- Edge cases with irregular dual and singular formations
- Error handling for invalid inputs
- Integration with complete number system (singular/dual/plural)

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.22

# Run with coverage
npm test sutras/1.4.22 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Verify word format and context parameters
2. **Number Detection**: Analyze context for duality/unity indicators
3. **Case Analysis**: Determine required case endings for dual/singular forms
4. **Transformation**: Apply appropriate dual or singular case affixes
5. **Script Handling**: Maintain consistent script output
6. **Validation**: Confirm grammatical correctness and number agreement

### Performance
- **Time Complexity**: O(1) for basic operations, O(n) for complex context analysis
- **Space Complexity**: O(1) constant space for transformations
- **Optimization Notes**: Cached case ending patterns for both dual and singular forms

### Edge Cases
- **Natural Pairs**: Handles anatomical pairs (eyes, hands) that typically use dual
- **Contextual Numbers**: Processes explicit numerical indicators (एक, द्वि)
- **Irregular Forms**: Accommodates non-standard dual and singular formations
- **Pronoun Systems**: Special handling for pronominal dual/singular forms

## Integration

### Related Sutras
- **1.4.21**: बहुषु बहुवचनम् (plural number rules - completes the number system)
- **1.4.23**: कारके (case relationship foundations)
- **Dual Specific Sutras**: Various sutras defining dual case formations
- **Singular Specific Sutras**: Rules for singular case applications

### Used By
- Complete case ending application systems
- Declension generation for all numbers
- Grammatical analysis tools
- Sanskrit parsing algorithms
- Number agreement validation systems

## References

- **Panini's Ashtadhyayi**: 1.4.22 द्व्येकयोर्द्विवचनैकवचने
- **Kaumudi Krama**: 186
- **Implementation Notes**: Traditional grammatical interpretation emphasizing the dual system's importance in Sanskrit
- **Test References**: Classical Sanskrit texts demonstrating dual and singular usage patterns

---

*Generated from template: SUTRA_README_TEMPLATE.md*
