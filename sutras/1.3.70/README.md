# Sutra 1.3.70: लियः सम्माननशालिनीकरणयोश्च

## Overview

**Sanskrit Text**: `लियः सम्माननशालिनीकरणयोश्च`  
**Transliteration**: liyaḥ sammānanañālinīkaraṇayośca  
**Translation**: The causative of the verb लि 'to adhere' takes Ātmanepada in the senses of 'showing respect' (सम्मानन), 'subduing' (शालिनीकरण), and 'deceiving' (as continued from previous sutra).

## Purpose

This sutra extends the special Ātmanepada designation rules to the causative forms of the verbal root लि (li) when used in three specific semantic contexts: showing respect (सम्मानन), subduing or controlling (शालिनीकरण), and deception (continued from the previous sutra 1.3.69). It provides precise voice assignment based on semantic meaning rather than grammatical structure alone.

## Implementation

### Function Signature
```javascript
function sutra1370(word, context = {}) {
    // Returns analysis of whether the word follows this sutra's conditions
}
```

### Key Features
- Detects causative forms of लि (li) root
- Analyzes three distinct semantic contexts: respect, subduing, and deception
- Handles both Devanagari and IAST scripts
- Provides detailed sense detection and validation
- Supports multiple concurrent semantic contexts
- Infers valid sense when context is ambiguous

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and script detection utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1370 } from './index.js';

// Example 1: लि causative in respect context
const result1 = sutra1370('लिय', {
    root: 'लि',
    isCausative: true,
    isRespectSense: true
});
console.log(result1); 
// { applies: true, isAtmanepada: true, detectedSenses: ['respect'], ... }

// Example 2: लि causative with subduing meaning
const result2 = sutra1370('लियति', {
    root: 'लि',
    isCausative: true,
    meaning: 'subdue and control the enemy'
});
console.log(result2); 
// { applies: true, isAtmanepada: true, validSenses: { subduing: true }, ... }
```

### Advanced Usage
```javascript
// Multiple semantic contexts
const result3 = sutra1370('लिययते', {
    root: 'लि',
    isCausative: true,
    meaning: 'respectfully subdue through honored control'
});

// IAST with pattern detection
const result4 = sutra1370('līyate', {
    isCausative: true,
    meaning: 'deceive through false adherence'
});

// Automatic sense inference
const result5 = sutra1370('लियते', {
    root: 'लि',
    isCausative: true
    // No explicit sense - will infer valid usage
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Input validation and error handling
- Positive cases for all three semantic contexts (respect, subduing, deception)
- Multiple concurrent sense detection
- Pattern recognition in Devanagari and IAST
- Negative cases (wrong root, non-causative, invalid meanings)
- Edge cases and mixed script handling
- Comprehensive return value validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.70

# Run with coverage
npm test sutras/1.3.70 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and input parameters
2. **Root Detection**: Checks for लि root in context or word patterns
3. **Causative Analysis**: Detects णिच् causative formations through morphological patterns
4. **Multi-Sense Analysis**: Evaluates three semantic contexts:
   - **Respect (सम्मानन)**: honor, reverence, worship
   - **Subduing (शालिनीकरण)**: control, domination, subjugation
   - **Deception (प्रलम्भ)**: tricks, cheating, fraud (continued from 1.3.69)
5. **Rule Application**: Applies Ātmanepada designation when any valid sense is detected

### Performance
- **Time Complexity**: O(1) - constant time pattern matching and keyword analysis
- **Space Complexity**: O(1) - minimal memory usage for analysis structures
- **Optimization Notes**: Efficient multi-keyword matching with early termination

### Edge Cases
- **Sense Inference**: When no explicit semantic context is provided, defaults to valid usage assumption for लि causatives
- **Multiple Senses**: Correctly handles words that fit multiple semantic categories simultaneously
- **Mixed Scripts**: Processes combinations of Devanagari words with IAST context parameters
- **Complex Meanings**: Analyzes compound meanings containing multiple relevant keywords

## Integration

### Related Sutras
- **1.3.69**: Previous sutra establishing deception context for गृध्/वञ्च् (provides deception sense continuation)
- **1.3.71**: Following sutra for कृ with मिथ्या उपपद
- **1.3.13**: General rule for Ātmanepada when fruit goes to agent (this sutra provides specific semantic exceptions)

### Used By
- Causative formation analysis modules
- Semantic role labeling systems
- Sanskrit morphological analyzers requiring context-aware voice assignment
- Multi-root Ātmanepada determination engines

## References

- **Panini's Ashtadhyayi**: अध्याय १, पाद ३, सूत्र ७०
- **Implementation Notes**: Follows traditional interpretation with three distinct semantic triggers: सम्मानन (respect), शालिनीकरण (subduing), and प्रलम्भ (deception continued from previous sutra)
- **Test References**: Classical examples from traditional grammar commentaries covering all three semantic contexts

---

*Generated from template: SUTRA_README_TEMPLATE.md*
