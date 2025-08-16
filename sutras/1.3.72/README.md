# Sutra 1.3.72: स्वरितञितः कर्त्रभिप्राये क्रियाफले

## Overview

**Sanskrit Text**: `स्वरितञितः कर्त्रभिप्राये क्रियाफले`  
**Transliteration**: svaritañitaḥ kartrabhiprāye kriyāphale  
**Translation**: Verbs marked with स्वरित or ञित् accent take Ātmanepada when the fruit of the action accrues to the agent (कर्त्रभिप्राय).

## Purpose

This sutra establishes a fundamental rule for Ātmanepada designation based on accent markings (स्वरित/ञित्) combined with semantic analysis of agent benefit. It demonstrates how phonological features (accent) interact with semantic roles (beneficiary of action) to determine voice assignment in Sanskrit verbs. This is a core principle where marked verbs take Ātmanepada when the agent is the primary beneficiary.

## Implementation

### Function Signature
```javascript
function sutra1372(word, context = {}) {
    // Returns analysis of whether the word follows this sutra's conditions
}
```

### Key Features
- Detects स्वरित (svarita) accent markings through patterns and known roots
- Identifies ञित् (ñit) markings through morphological patterns
- Analyzes कर्त्रभिप्राय (agent benefit) through semantic keywords
- Handles both Devanagari and IAST scripts with accent detection
- Recognizes known accent-marked verbal roots
- Provides detailed accent type classification
- Default agent benefit assumption for accent-marked verbs

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and script detection utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1372 } from './index.js';

// Example 1: स्वरित verb with explicit agent benefit
const result1 = sutra1372('कृष्णाति', {
    root: 'कृष्',
    hasSvarita: true,
    benefitsAgent: true
});
console.log(result1); 
// { applies: true, isAtmanepada: true, detectedAccentType: 'svarita', ... }

// Example 2: ञित् verb with meaning context
const result2 = sutra1372('हन्ति', {
    root: 'हन्',
    hasNjit: true,
    meaning: 'kills for own benefit'
});
console.log(result2); 
// { applies: true, isAtmanepada: true, detectedAccentType: 'njit', ... }
```

### Advanced Usage
```javascript
// Known accent-marked root recognition
const result3 = sutra1372('वृधते', {
    root: 'वृध्',
    benefitsAgent: true
});

// Accent pattern detection in word
const result4 = sutra1372('कृष्णा॒ति', { // with accent mark
    benefitsAgent: true
});

// Default agent benefit assumption
const result5 = sutra1372('युनक्ति', {
    root: 'युज्',
    hasSvarita: true
    // No explicit benefitsAgent - will default to true
});

// Sanskrit agent benefit expressions
const result6 = sutra1372('भुज्ते', {
    root: 'भुज्',
    meaning: 'स्वार्थ में भोजन करता है'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 35+ tests covering:
- Input validation and error handling
- Positive cases for स्वरित and ञित् marked verbs
- Agent benefit analysis with various keyword patterns
- Pattern detection for accent markings in both scripts
- Known root recognition for common accent-marked verbs
- Negative cases (no accent, no agent benefit)
- Edge cases including mixed scripts and complex meanings
- Comprehensive return value validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.72

# Run with coverage
npm test sutras/1.3.72 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and input parameters
2. **Accent Detection**: Multi-layered approach:
   - **Explicit Context**: Checks `hasSvarita`/`hasNjit` parameters
   - **Pattern Recognition**: Detects accent marks and ञ् patterns in words
   - **Known Roots**: Recognizes common स्वरित/ञित् marked roots
3. **Agent Benefit Analysis**: Evaluates कर्त्रभिप्राय through keywords:
   - **Self-benefit**: for oneself, own benefit, स्वार्थ, आत्मन्
   - **Agent-focus**: कर्त्रभिप्राय, स्वकृत, निज, अपने लिए
4. **Rule Application**: Applies Ātmanepada when both conditions are met

### Performance
- **Time Complexity**: O(1) - constant time pattern matching and root lookup
- **Space Complexity**: O(1) - minimal memory usage for known root storage
- **Optimization Notes**: Efficient accent detection with fallback to known root database

### Edge Cases
- **Default Agent Benefit**: Assumes agent benefit for accent-marked verbs when no explicit context provided
- **Combined Accents**: Handles verbs with both स्वरित and ञित् markings
- **Pattern Fallback**: Uses morphological patterns when explicit accent information unavailable
- **Mixed Scripts**: Processes accent marks across different writing systems

## Integration

### Related Sutras
- **1.3.71**: Previous rule for मिथ्या + कृ constructions
- **1.3.73**: Following rule for अप् + वद् constructions
- **1.3.13**: General rule for Ātmanepada when fruit goes to agent (this sutra provides accent-based specification)
- **1.4.99-100**: Rules defining स्वरित and ञित् accent classifications

### Used By
- Accent-sensitive morphological analyzers
- Voice assignment systems requiring phonological feature integration
- Sanskrit prosody and accent analysis modules
- Agent-benefit semantic role labeling systems

## References

- **Panini's Ashtadhyayi**: अध्याय १, पाद ३, सूत्र ७२
- **Implementation Notes**: Follows traditional interpretation emphasizing the interaction between accent markings (स्वरित/ञित्) and semantic agent benefit (कर्त्रभिप्राय)
- **Test References**: Classical examples from traditional grammar commentaries demonstrating accent-marked verbs with agent beneficiary constructions
- **Accent Database**: Based on standard listings of स्वरित and ञित् marked roots in traditional grammars

---

*Generated from template: SUTRA_README_TEMPLATE.md*
