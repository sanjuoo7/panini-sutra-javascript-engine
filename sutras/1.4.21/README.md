# Sutra 1.4.21: बहुषु बहुवचनम्

## Overview

**Sanskrit Text**: `बहुषु बहुवचनम्`  
**Transliteration**: bahuṣu bahuvacanama  
**Translation**: In expressing plurality, a plural case affix is employed

## Purpose

This sutra establishes the fundamental rule for using plural case affixes (बहुवचन) when expressing plurality (बहुषु). It defines when multiple entities or objects require plural grammatical endings rather than singular or dual forms. This is a core grammatical principle that governs the formation of plural nouns, pronouns, and related declensions in Sanskrit.

## Implementation

### Function Signature
```javascript
function applyPluralRule(word, context = {}) {
    // Determines if plural case affixes should be applied
    // Returns transformation information and validation
}
```

### Key Features
- Detects plurality contexts requiring plural case affixes
- Validates grammatical conditions for plural application
- Supports both Devanagari and IAST input/output
- Handles edge cases for irregular plural formations
- Integrates with case ending systems

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Script identification and conversion
  - `classification.js` - Grammatical classification
  - `case-endings.js` - Case affix systems
  - `validation.js` - Input validation
  - `transliteration.js` - Script conversion utilities
- **Shared Functions**: Case application logic, plurality detection

## Usage Examples

### Basic Usage
```javascript
import { applyPluralRule } from './index.js';

// Example 1: Basic plural application
const result1 = applyPluralRule('देव', { count: 'multiple', case: 'nominative' });
console.log(result1); 
// Expected: { 
//   applies: true, 
//   form: 'देवाः', 
//   case: 'nominative_plural',
//   rule: '1.4.21'
// }

// Example 2: IAST input
const result2 = applyPluralRule('deva', { count: 'multiple', case: 'accusative', script: 'iast' });
console.log(result2); 
// Expected: { 
//   applies: true, 
//   form: 'devān', 
//   case: 'accusative_plural',
//   rule: '1.4.21'
// }
```

### Advanced Usage
```javascript
// Context-sensitive plural detection
const contextualResult = applyPluralRule('गृह', { 
  context: 'multiple_houses', 
  semantic_plurality: true,
  case: 'locative'
});

// Validation of plural requirements
const validation = applyPluralRule('एकम्', { count: 'single' });
// Should indicate plural not required for singular contexts
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 25+ tests covering:
- Basic plural application for different noun classes
- Case-specific plural endings (nominative, accusative, etc.)
- Script conversion (Devanagari ↔ IAST)
- Context validation for plurality requirements
- Edge cases with irregular plurals
- Error handling for invalid inputs
- Integration with case ending systems

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.21

# Run with coverage
npm test sutras/1.4.21 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Verify word format and context parameters
2. **Plurality Detection**: Analyze context for plurality indicators
3. **Case Analysis**: Determine required case endings for plural form
4. **Transformation**: Apply appropriate plural case affixes
5. **Script Handling**: Maintain consistent script output
6. **Validation**: Confirm grammatical correctness

### Performance
- **Time Complexity**: O(1) for basic operations, O(n) for complex context analysis
- **Space Complexity**: O(1) constant space for transformations
- **Optimization Notes**: Cached case ending patterns for faster lookup

### Edge Cases
- **Dual vs Plural**: Handles distinction between द्विवचन (dual) and बहुवचन (plural)
- **Semantic Plurality**: Manages cases where grammatical and semantic plurality differ
- **Irregular Forms**: Accommodates non-standard plural formations
- **Context Dependencies**: Processes contextual clues for plurality determination

## Integration

### Related Sutras
- **1.4.22**: द्व्येकयोर्द्विवचनैकवचने (dual and singular number rules)
- **1.4.23**: कारके (case relationship foundations)
- **Case Ending Sutras**: Various sutras defining specific case affix forms
- **Number System Sutras**: Related grammatical number determinations

### Used By
- Case ending application functions
- Declension generation systems
- Grammatical analysis tools
- Sanskrit parsing algorithms

## References

- **Panini's Ashtadhyayi**: 1.4.21 बहुषु बहुवचनम्
- **Kaumudi Krama**: 187
- **Implementation Notes**: Based on traditional grammatical interpretation of plurality contexts
- **Test References**: Classical Sanskrit texts and grammatical examples

---

*Generated from template: SUTRA_README_TEMPLATE.md*
