# Sutra 1.3.73: अपाद्वदः

## Overview

**Sanskrit Text**: `अपाद्वदः`  
**Transliteration**: apādvadaḥ  
**Translation**: When the verb वद् 'to speak' is preceded by अप (apa), it takes Ātmanepada when the fruit of the action accrues to the agent.

## Purpose

This sutra establishes a specific rule for Ātmanepada designation when the verbal root वद् (vad) is combined with the upasarga (prefix) अप (apa) and the action benefits the agent. This rule is particularly relevant in contexts of अपवाद (censure, blame, criticism) where the speaker derives satisfaction or benefit from the act of speaking against someone. It demonstrates how specific prefix-root combinations can override general voice assignment rules based on semantic context.

## Implementation

### Function Signature
```javascript
function sutra1373(word, context = {}) {
    // Returns analysis of whether the word follows this sutra's conditions
}
```

### Key Features
- Detects वद् (vad) root and its variations (वच्, वाद)
- Identifies अप (apa) upasarga in word or context
- Analyzes agent benefit through various keyword patterns
- Handles both Devanagari and IAST scripts
- Special recognition of अपवाद (censure/blame) semantic context
- Default inference for अप + वद् combinations
- Comprehensive pattern detection for prefix-root combinations

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and script detection utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1373 } from './index.js';

// Example 1: अप + वद् with explicit agent benefit
const result1 = sutra1373('अपवदति', {
    root: 'वद्',
    upasarga: 'अप',
    benefitsAgent: true
});
console.log(result1); 
// { applies: true, isAtmanepada: true, construction: 'अप + वद्', ... }

// Example 2: IAST with censure meaning
const result2 = sutra1373('apavadati', {
    root: 'vad',
    upasarga: 'apa',
    meaning: 'censures and blames others'
});
console.log(result2); 
// { applies: true, isAtmanepada: true, detectedAgentBenefit: true, ... }
```

### Advanced Usage
```javascript
// Pattern detection without explicit context
const result3 = sutra1373('अपवादते', {
    benefitsAgent: true
});

// Automatic agent benefit inference
const result4 = sutra1373('अपवदति', {
    root: 'वद्',
    upasarga: 'अप'
    // No explicit benefitsAgent - will infer as true
});

// Sanskrit meaning analysis
const result5 = sutra1373('अपवदति', {
    root: 'वद्',
    upasarga: 'अप',
    meaning: 'निन्दा और दूषण करता है'
});

// Root variation handling
const result6 = sutra1373('अपवचन', {
    upasarga: 'अप',
    meaning: 'speaks critically for own satisfaction'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Input validation and error handling
- Positive cases for अप + वद् constructions
- Pattern detection for both prefix and root
- Meaning analysis including censure/blame contexts
- Negative cases (wrong root, wrong upasarga, no agent benefit)
- Edge cases including mixed scripts and sandhi forms
- Comprehensive return value validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.73

# Run with coverage
npm test sutras/1.3.73 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and input parameters
2. **Root Detection**: Checks for वद् root and variations (वच्, वाद, vac, vād)
3. **Upasarga Analysis**: Detects अप prefix in context or word patterns
4. **Agent Benefit Analysis**: Evaluates agent benefit through multiple contexts:
   - **General Agent Benefit**: for oneself, own benefit, स्वार्थ, कर्त्रभिप्राय
   - **Censure Context**: censure, blame, अपवाद, निन्दा, दूषण
5. **Rule Application**: Applies Ātmanepada when all conditions are satisfied

### Performance
- **Time Complexity**: O(1) - constant time pattern matching and keyword analysis
- **Space Complexity**: O(1) - minimal memory usage for pattern storage
- **Optimization Notes**: Efficient upasarga detection with multi-pattern fallback

### Edge Cases
- **Default Agent Benefit**: Assumes agent benefit for अप + वद् combinations when no explicit context provided
- **Root Variations**: Handles multiple forms of वद् root (वद्, वच्, वाद)
- **Sandhi Forms**: Processes morphophonological changes in compound forms
- **Semantic Specificity**: Recognizes अपवाद (censure) as a specific beneficial context for the agent

## Integration

### Related Sutras
- **1.3.72**: Previous rule for स्वरित/ञित् verbs with agent benefit
- **1.3.71**: Previous rule for मिथ्या + कृ constructions
- **1.3.69-70**: Earlier rules in the sequence dealing with specific semantic contexts
- **1.3.13**: General rule for Ātmanepada when fruit goes to agent (this sutra provides upasarga-specific application)

### Used By
- Upasarga-sensitive morphological analyzers
- Sanskrit prefix-root combination processors
- Semantic role labeling systems for complex verbal constructions
- Voice assignment modules requiring contextual prefix analysis

## References

- **Panini's Ashtadhyayi**: अध्याय १, पाद ३, सूत्र ७३
- **Implementation Notes**: Follows traditional interpretation emphasizing अप upasarga with वद् root in agent-beneficial contexts, particularly अपवाद (censure/blame)
- **Test References**: Classical examples from traditional grammar commentaries demonstrating अप + वद् constructions in censure and critical speech contexts
- **Semantic Analysis**: Based on the understanding that अपवाद (speaking against, censure) inherently benefits the speaker through expression of criticism

---

*Generated from template: SUTRA_README_TEMPLATE.md*
