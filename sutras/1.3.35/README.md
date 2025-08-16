# Sutra 1.3.35: अकर्मकाच्च

## Overview

**Sanskrit Text**: `अकर्मकाच्च`  
**Transliteration**: akarmakācca  
**Translation**: After the verb कृ preceded by वि, when used intransitively, the आत्मनेपद is used.

## Purpose

This sutra specifies that when the verbal root कृ (kṛ) is preceded by the prefix वि (vi) and is used intransitively (without a direct object), it takes आत्मनेपद endings instead of परस्मैपद endings. This is a classification rule that determines voice selection in Sanskrit verbal conjugation.

## Implementation

### Function Signature
```javascript
function sutra1335(word, context = {}) {
    // Returns analysis of whether आत्मनेपद should be used
}
```

### Key Features
- Multi-script support (IAST and Devanagari)
- Pattern recognition for वि + कृ combinations
- Semantic context analysis for transitivity determination
- Compound word detection with enhanced confidence
- Flexible context-based classification

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Script detection and validation utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1335 } from './index.js';

// Example 1: Explicit intransitive usage
const result1 = sutra1335('vikaroti', { isIntransitive: true });
console.log(result1); 
// { applies: true, isAtmanepada: true, confidence: 0.95 }

// Example 2: Semantic meaning analysis
const result2 = sutra1335('vikṛti', { meaning: 'to become transformed' });
console.log(result2); 
// { applies: true, isAtmanepada: true, confidence: 0.8 }
```

### Advanced Usage
```javascript
// Devanagari script with compound
const result3 = sutra1335('पूर्वविकृति', { 
  isIntransitive: true,
  meaning: 'prior transformation'
});

// Context-based analysis
const result4 = sutra1335('vikaroti', { hasDirectObject: false });

// Traditional grammatical example
const result5 = sutra1335('विकुरुते', { 
  isIntransitive: true,
  meaning: 'undergoes transformation'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 37 tests covering:
- Input validation (3 tests)
- IAST pattern recognition (6 tests)
- Devanagari pattern recognition (5 tests)
- Intransitive usage analysis (7 tests)
- Combined positive cases (4 tests)
- Combined negative cases (4 tests)
- Edge cases (4 tests)
- Integration tests (2 tests)
- Performance and reliability (2 tests)

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.35

# Run with coverage
npm test sutras/1.3.35 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and script detection
2. **Pattern Matching**: Identifies वि + कृ combinations using regex patterns
3. **Context Analysis**: Evaluates transitivity through multiple indicators:
   - Explicit flags (`isIntransitive`, `hasDirectObject`)
   - Semantic meaning analysis
   - Default inference rules
4. **Confidence Calculation**: Combines pattern and context confidence scores

### Performance
- **Time Complexity**: O(1) - constant time pattern matching
- **Space Complexity**: O(1) - minimal memory usage
- **Optimization Notes**: Efficient regex patterns, early termination on failures

### Edge Cases
- Mixed script handling with reduced confidence
- Case-insensitive IAST pattern matching
- Compound word detection with prefix patterns
- Whitespace normalization
- Semantic meaning priority over default assumptions

## Integration

### Related Sutras
- **1.3.33**: अधेः प्रसहने - Related आत्मनेपद designation for अधि + कृ
- **1.3.34**: वेः शब्दकर्म्मणः - Related आत्मनेपद designation for वि + कृ in sound context
- **1.3.36-39**: Following sutras in आत्मनेपद designation series

### Used By
- Verbal conjugation systems requiring voice determination
- Morphological analyzers processing वि-prefixed कृ forms
- Grammar engines implementing Paninian voice rules

## References

- **Panini's Ashtadhyayi**: 1.3.35 अकर्मकाच्च
- **Implementation Notes**: Follows traditional grammatical interpretation with modern contextual flexibility
- **Test References**: Based on classical examples from Sanskrit grammar texts

---

*Generated from template: SUTRA_README_TEMPLATE.md*
