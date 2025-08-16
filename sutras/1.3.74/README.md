# Sutra 1.3.74: णिचश्च

## Overview

**Sanskrit Text**: `णिचश्च`  
**Transliteration**: ṇicaśca  
**Translation**: After a verb ending in the affix णि (causal) when the fruit of the action accrues to the agent, the आत्मनेपद is used.

## Purpose

This sutra establishes that causative verbs (formed with the णि suffix) take Ātmanepada endings when the agent benefits from the action (कर्त्रभिप्राय). It extends the general principle of agent benefit to causative constructions.

## Implementation

### Function Signature
```javascript
function sutra1374(word, context = {}) {
    // Returns analysis of causative Ātmanepada conditions
}
```

### Key Features
- Detects causative verbs with णि suffix
- Analyzes agent benefit conditions (कर्त्रभिप्राय)
- Supports both Devanagari and IAST scripts
- Pattern recognition for causative markers (य, पय, आपय)
- Semantic analysis for agent benefit keywords

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Shared Functions**: Script detection and validation utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1374 } from './index.js';

// Causative with agent benefit
const result1 = sutra1374('गमयते', {
  root: 'गम्',
  hasCausative: true,
  benefitsAgent: true,
  meaning: 'makes go for own benefit'
});
console.log(result1); // { applies: true, isAtmanepada: true, confidence: 0.95 }

// Non-causative verb
const result2 = sutra1374('गच्छति', {
  root: 'गम्',
  hasCausative: false,
  benefitsAgent: true
});
console.log(result2); // { applies: false, isAtmanepada: false }
```

### Advanced Usage
```javascript
// Pattern-based detection
const result = sutra1374('बोधयते', {
  benefitsAgent: true,
  meaning: 'awakens for self'
});
// Automatically detects causative pattern and agent benefit
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 19 tests covering:
- Basic functionality with causatives and agent benefit
- Pattern recognition for different causative forms
- IAST script support
- Semantic analysis for agent benefit detection
- Edge cases and error handling
- Input validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.74

# Run with coverage
npm test sutras/1.3.74 --coverage
```

## Technical Details

### Algorithm
1. Validates input and detects script
2. Checks for causative patterns (णि, य, पय, आपय patterns)
3. Analyzes context for agent benefit (कर्त्रभिप्राय)
4. Applies rule when both causative and agent benefit conditions are met

### Performance
- **Time Complexity**: O(1) for most operations
- **Space Complexity**: O(1) memory usage
- **Optimization Notes**: Efficient pattern matching with early returns

### Edge Cases
- Missing context handled gracefully with low confidence
- Pattern detection works for both explicit and implicit causative markers
- Semantic analysis supports multiple languages (Sanskrit, IAST, English)

## Integration

### Related Sutras
- **1.3.72**: स्वरितञितः कर्त्रभिप्राये क्रियाफले (accent-based Ātmanepada)
- **1.3.77**: विभाषोपपदेन प्रतीयमाने (optional Ātmanepada with उपपद)

### Used By
- Voice assignment systems for causative verbs
- Sanskrit grammar analysis engines
- Morphological processing tools

## References

- **Panini's Ashtadhyayi**: 1.3.74 णिचश्च
- **Implementation Notes**: Follows established patterns for Ātmanepada designation
- **Test References**: Traditional Sanskrit grammar examples and modern test cases

---

*Generated from template: SUTRA_README_TEMPLATE.md*
