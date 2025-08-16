# Sutra 1.3.77: विभाषोपपदेन प्रतीयमाने

## Overview

**Sanskrit Text**: `विभाषोपपदेन प्रतीयमाने`  
**Transliteration**: vibhāṣopapadena pratīyamāne  
**Translation**: Optionally, when the fruit of the action is understood through an उपपद (secondary element), Ātmanepada may be used.

## Purpose

This sutra provides an optional (विभाषा) rule for using Ātmanepada when the agent's benefit is indicated through an उपपद (compound element, secondary word). It recognizes that semantic context can override default voice patterns when agent benefit is implied by associated words.

## Implementation

### Function Signature
```javascript
function sutra1377(word, context = {}) {
    // Returns analysis of optional Ātmanepada with उपपद indication
}
```

### Key Features
- Detection of उपपद elements indicating agent benefit
- Optional application (विभाषा) with confidence scoring
- Semantic analysis of compound meanings
- Pattern recognition for benefit-indicating elements
- Multi-script support (Devanagari and IAST)

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Semantic Analysis**: Compound word analysis utilities
- **Pattern Matching**: उपपद detection and classification

## Usage Examples

### Basic Usage
```javascript
import { sutra1377 } from './index.js';

// Verb with उपपद indicating agent benefit
const result1 = sutra1377('स्वयंकरोति', {
  hasUpapada: true,
  upapada: 'स्वयं',
  benefitsAgent: true
});
console.log(result1); // { applies: true, isAtmanepada: true, isOptional: true, confidence: 0.85 }

// Verb without उपपद indication
const result2 = sutra1377('करोति', {
  hasUpapada: false
});
console.log(result2); // { applies: false, isAtmanepada: false }
```

### Advanced Usage
```javascript
// Automatic उपपद detection
const result = sutra1377('आत्मकरते', {
  meaning: 'does for oneself'
});
// Detects आत्म as उपपद indicating self-benefit

// Optional nature with confidence
const result2 = sutra1377('स्वहितकरोति', {
  hasUpapada: true,
  benefitsAgent: true
});
// Returns optional application with appropriate confidence
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 24 tests covering:
- Basic functionality with उपपद and agent benefit
- Optional nature (विभाषा) testing
- Semantic analysis for different उपपद types
- Pattern recognition for benefit indicators
- IAST script support and conversion
- Confidence scoring for optional applications
- Edge cases and boundary conditions
- Input validation and error handling

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.77

# Run with coverage
npm test sutras/1.3.77 --coverage
```

## Technical Details

### Algorithm
1. Validates input and detects script
2. Analyzes context for उपपद presence
3. Evaluates semantic indicators of agent benefit
4. Determines optional application (विभाषा)
5. Assigns confidence based on contextual strength

### Performance
- **Time Complexity**: O(n) for semantic analysis where n is context size
- **Space Complexity**: O(1) memory usage
- **Optimization Notes**: Efficient pattern matching with semantic caching

### Edge Cases
- Handles ambiguous उपपद interpretations
- Optional nature requires confidence assessment
- Multiple उपपद elements in compound structures
- Cross-script pattern recognition for semantic elements

## Integration

### Related Sutras
- **1.3.72**: स्वरितञितः कर्त्रभिप्राये क्रियाफले (general agent benefit rule)
- **1.3.74**: णिचश्च (causative with agent benefit)
- **1.3.76**: अनुपसर्गाज्ज्ञः (ज्ञा without prefix)
- **1.3.78**: शेषात् कर्तरि परस्मैपदम् (default Parasmaipada)

### Used By
- Compound word analysis systems
- Semantic voice assignment engines
- Optional rule processing frameworks
- Sanskrit grammar interpretation tools

## References

- **Panini's Ashtadhyayi**: 1.3.77 विभाषोपपदेन प्रतीयमाने
- **विभाषा**: Optional application - both choices are grammatically valid
- **उपपद**: Secondary word element that modifies the verbal meaning
- **प्रतीयमाने**: When understood/perceived through context

---

*Generated from template: SUTRA_README_TEMPLATE.md*
