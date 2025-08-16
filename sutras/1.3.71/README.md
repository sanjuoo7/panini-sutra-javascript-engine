# Sutra 1.3.71: मिथ्योपपदात् कृञोऽभ्यासे

## Overview

**Sanskrit Text**: `मिथ्योपपदात् कृञोऽभ्यासे`  
**Transliteration**: mithyopapadāt kṛñoʿbhyāse  
**Translation**: When कृ is preceded by मिथ्या as उपपद (preverb/prefix), it takes Ātmanepada in the sense of 'abhyāsa' (repeated wrong utterance/falsehood).

## Purpose

This sutra establishes a specific rule for Ātmanepada designation when the verbal root कृ (kṛ) is combined with the उपपद (upapada/preverb) मिथ्या (mithyā) in the context of abhyāsa - repeated wrong utterance or falsehood. This rule demonstrates how semantic context combined with specific morphological constructions can override general voice assignment principles.

## Implementation

### Function Signature
```javascript
function sutra1371(word, context = {}) {
    // Returns analysis of whether the word follows this sutra's conditions
}
```

### Key Features
- Detects कृ (kṛ) root in various forms (कृ, कर, kar)
- Identifies मिथ्या (mithyā) उपपद in word or context
- Analyzes abhyāsa sense (repetition, falsehood, wrong utterance)
- Handles both Devanagari and IAST scripts
- Provides detailed construction analysis
- Default inference when मिथ्या + कृ combination is present

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and script detection utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1371 } from './index.js';

// Example 1: मिथ्या + कृ with explicit abhyāsa sense
const result1 = sutra1371('मिथ्याकरोति', {
    root: 'कृ',
    upapada: 'मिथ्या',
    hasAbhyasaSense: true
});
console.log(result1); 
// { applies: true, isAtmanepada: true, construction: 'मिथ्या + कृ', ... }

// Example 2: IAST with meaning context
const result2 = sutra1371('mithyākaroti', {
    root: 'kṛ',
    upapada: 'mithyā',
    meaning: 'repeatedly speaks falsehood'
});
console.log(result2); 
// { applies: true, isAtmanepada: true, detectedAbhyasaSense: true, ... }
```

### Advanced Usage
```javascript
// Pattern detection without explicit upapada
const result3 = sutra1371('मिथ्याकुर्वे', {
    root: 'कृ',
    hasAbhyasaSense: true
});

// Automatic sense inference with मिथ्या + कृ
const result4 = sutra1371('मिथ्याकरोति', {
    root: 'कृ',
    upapada: 'मिथ्या'
    // No explicit sense - will infer abhyāsa context
});

// Complex meaning analysis
const result5 = sutra1371('मिथ्याकरोति', {
    root: 'कृ',
    upapada: 'मिथ्या',
    meaning: 'अभ्यास से असत्य वचन करता है'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 32+ tests covering:
- Input validation and error handling
- Positive cases for मिथ्या + कृ constructions
- Pattern detection in Devanagari and IAST
- Meaning analysis for abhyāsa sense keywords
- Negative cases (wrong root, missing उपपद, invalid sense)
- Edge cases including mixed scripts and root variations
- Comprehensive return value validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.71

# Run with coverage
npm test sutras/1.3.71 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and input parameters
2. **Root Detection**: Checks for कृ root and variations (कर, kar)
3. **उपपद Analysis**: Detects मिथ्या upapada in context or word patterns
4. **Sense Analysis**: Evaluates abhyāsa context through keywords:
   - **Repetition**: repeated, repeat, abhyāsa, अभ्यास
   - **Falsehood**: false, untrue, lie, मिथ्या, झूठ, असत्य
   - **Utterance**: speaking, saying, telling, वचन, कथन
5. **Rule Application**: Applies Ātmanepada when all conditions are met

### Performance
- **Time Complexity**: O(1) - constant time pattern matching and keyword analysis
- **Space Complexity**: O(1) - minimal memory usage for analysis
- **Optimization Notes**: Efficient उपपद detection with early validation

### Edge Cases
- **Sense Inference**: Automatically assumes abhyāsa context when मिथ्या + कृ combination is detected without explicit meaning
- **Root Variations**: Handles multiple forms of कृ root (कृ, कर, kar, kṛ)
- **Mixed Scripts**: Processes combinations of Devanagari words with IAST context parameters
- **Complex Constructions**: Analyzes compound words containing मिथ्या + कृ patterns

## Integration

### Related Sutras
- **1.3.69**: Previous rule for गृध्/वञ्च् causatives in deception sense
- **1.3.70**: Previous rule for लि causatives in specific senses
- **1.3.72**: Following rule for स्वरित/ञित् verbs when fruit accrues to agent
- **1.3.13**: General rule for Ātmanepada when fruit goes to agent (this sutra provides specific उपपद-based exception)

### Used By
- उपपद-based construction analyzers
- Semantic role labeling systems for compound verbs
- Sanskrit morphological analyzers requiring prefix-sensitive voice assignment
- Falsehood and repetition context detection modules

## References

- **Panini's Ashtadhyayi**: अध्याय १, पाद ३, सूत्र ७१
- **Implementation Notes**: Follows traditional interpretation focusing on मिथ्या उपपद with कृ root in abhyāsa (repeated wrong utterance) context
- **Test References**: Classical examples from traditional grammar commentaries demonstrating मिथ्या + कृ constructions

---

*Generated from template: SUTRA_README_TEMPLATE.md*
