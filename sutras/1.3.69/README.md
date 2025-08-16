# Sutra 1.3.69: गृधिवञ्च्योः प्रलम्भने

## Overview

**Sanskrit Text**: `गृधिवञ्च्योः प्रलम्भने`  
**Transliteration**: gṛdhivañacayoḥ paralambhane  
**Translation**: After the causatives of the verbs गृध 'to covet' and वञ्च 'to go' the Ātmanepada is used in the sense of 'deceiving' even though the fruit of the action does not accrue to the agent.

## Purpose

This sutra establishes a special rule for Ātmanepada designation with causative forms of two specific verbal roots (गृध् and वञ्च्) when used in the context of deception (प्रलम्भ). It overrides the general principle that Ātmanepada is used when the fruit of the action accrues to the agent, mandating Ātmanepada regardless of who benefits from the action.

## Implementation

### Function Signature
```javascript
function sutra1369(word, context = {}) {
    // Returns analysis of whether the word follows this sutra's conditions
}
```

### Key Features
- Detects causative forms of गृध् (gṛdh) and वञ्च् (vañc) roots
- Analyzes semantic context for deception meaning (प्रलम्भ)
- Handles both Devanagari and IAST scripts
- Overrides normal fruit-to-agent requirements for Ātmanepada
- Provides detailed confidence scoring and analysis

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and script detection utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1369 } from './index.js';

// Example 1: गृध् causative in deception context
const result1 = sutra1369('गृध्य', {
    root: 'गृध्',
    isCausative: true,
    isDeceptionSense: true
});
console.log(result1); 
// { applies: true, isAtmanepada: true, overridesFruit: true, ... }

// Example 2: वञ्च् causative with meaning context
const result2 = sutra1369('वञ्चयति', {
    root: 'वञ्च्',
    isCausative: true,
    meaning: 'deceives through trickery'
});
console.log(result2); 
// { applies: true, isAtmanepada: true, detectedDeceptionSense: true, ... }
```

### Advanced Usage
```javascript
// IAST script with pattern detection
const result3 = sutra1369('gṛdhayate', {
    isCausative: true,
    meaning: 'causes to covet for deception'
});

// Automatic pattern recognition
const result4 = sutra1369('वञ्चयामि', {
    isDeceptionSense: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 25+ tests covering:
- Input validation and error handling
- Positive cases for both गृध् and वञ्च् roots
- Pattern detection in Devanagari and IAST
- Negative cases (wrong root, non-causative, wrong meaning)
- Edge cases and mixed script handling
- Return value structure validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.69

# Run with coverage
npm test sutras/1.3.69 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and input parameters
2. **Root Detection**: Checks for गृध्/वञ्च् roots in context or word patterns
3. **Causative Analysis**: Detects णिच् causative formations through morphological patterns
4. **Semantic Analysis**: Evaluates deception context through meaning keywords
5. **Rule Application**: Applies Ātmanepada designation when all conditions are met

### Performance
- **Time Complexity**: O(1) - constant time pattern matching and validation
- **Space Complexity**: O(1) - minimal memory usage for analysis
- **Optimization Notes**: Efficient regex patterns for morphological detection

### Edge Cases
- **Default Deception Assumption**: When no explicit meaning is provided, assumes deception context for these specific roots with causatives
- **Mixed Script Handling**: Correctly processes combinations of Devanagari words with IAST context parameters
- **Pattern Fallback**: Uses morphological patterns when explicit root information is unavailable

## Integration

### Related Sutras
- **1.3.72**: Similar Ātmanepada designation for स्वरित/ञित् verbs when fruit accrues to agent
- **1.3.13**: General rule for Ātmanepada when fruit goes to agent (this sutra provides exception)
- **1.3.74**: Continuation rule for Ātmanepada in similar contexts

### Used By
- Causative formation analysis modules
- Ātmanepada/Parasmaipada determination systems
- Sanskrit morphological analyzers requiring precise voice assignment

## References

- **Panini's Ashtadhyayi**: अध्याय १, पाद ३, सूत्र ६९
- **Implementation Notes**: Follows traditional interpretation focusing on प्रलम्भ (deception) as key semantic trigger
- **Test References**: Classical examples from traditional grammar commentaries and modern linguistic analyses

---

*Generated from template: SUTRA_README_TEMPLATE.md*
