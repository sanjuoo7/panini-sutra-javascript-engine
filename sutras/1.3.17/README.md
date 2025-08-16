# Sutra 1.3.17: नेर्विशः

## Overview

**Sanskrit Text**: `नेर्विशः`  
**Transliteration**: neraviśaḥ  
**Translation**: After the verb विश् 'to enter', when preceded by the preposition नि, the आत्मनेपद affixes are employed

## Purpose

This sutra establishes a specific rule for voice assignment in Sanskrit grammar. When the verbal root विश् (viś, "to enter") is combined with the prefix नि (ni), the resulting compound verb must take ātmanepada voice endings rather than parasmaipada. This is a specific exception that overrides the general voice assignment rules for this particular ni+viś combination.

## Implementation

### Function Signature
```javascript
function determineNiVisAtmanepada(verb, context = {}) {
    // Analyzes Sanskrit verbs for ni+viś combination and determines ātmanepada usage
}
```

### Key Features
- Detects ni+viś combinations from compound verbs (e.g., "niviś")
- Analyzes context for separate prefix and root information
- Supports both IAST and Devanagari scripts
- Provides confidence scoring based on evidence strength
- Comprehensive pattern matching with multiple detection strategies

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and error handling patterns

## Usage Examples

### Basic Usage
```javascript
import { determineNiVisAtmanepada } from './index.js';

// Example 1: Direct compound verb
const result1 = determineNiVisAtmanepada('niviś');
console.log(result1);
// {
//   success: true,
//   verb: 'niviś',
//   isAtmanepada: true,
//   reason: 'Ni+viś combination - takes ātmanepada per Sutra 1.3.17',
//   confidence: 0.95,
//   combinationType: 'ni_vis'
// }

// Example 2: Context-based detection
const result2 = determineNiVisAtmanepada('viś', { prefix: 'ni' });
console.log(result2);
// {
//   success: true,
//   verb: 'viś',
//   isAtmanepada: true,
//   reason: 'Ni+viś combination - takes ātmanepada per Sutra 1.3.17',
//   confidence: 0.85,
//   combinationType: 'ni_vis'
// }
```

### Advanced Usage
```javascript
// With detailed analysis
const detailed = determineNiVisAtmanepada('niviś', { includeAnalysis: true });
console.log(detailed.niVisAnalysis);

// Handling edge cases
const noMatch = determineNiVisAtmanepada('kṛ');
console.log(noMatch.isAtmanepada); // false

// Expression-based detection
const expression = determineNiVisAtmanepada('viś', { 
  expression: 'with ni prefix' 
});
console.log(expression.confidence); // Lower confidence for weaker evidence
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 26 tests covering:
- Basic ni+viś compound detection
- Context-based prefix and root analysis
- Prefixes array and compound field detection
- Expression-based pattern matching
- Script handling (IAST and Devanagari)
- Error handling and edge cases
- Confidence scoring accuracy
- Integration with related linguistic rules

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.17

# Run with coverage
npm test sutras/1.3.17 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word and context structure
2. **Script Detection**: Identifies IAST, Devanagari, or unknown script
3. **Viś Root Analysis**: Detects विश् root in various forms with pattern matching
4. **Ni Prefix Analysis**: Identifies नि prefix from multiple sources:
   - Direct verb prefix detection
   - Context prefix field
   - Prefixes array
   - Compound field
   - Expression-based detection
5. **Combination Analysis**: Evaluates strength and type of evidence
6. **Voice Assignment**: Determines ātmanepada based on ni+viś combination
7. **Confidence Scoring**: Assigns confidence based on evidence quality

### Performance
- **Time Complexity**: O(n) where n is the length of input strings
- **Space Complexity**: O(1) for core analysis, O(m) for detailed output where m is evidence count
- **Optimization Notes**: Pattern matching optimized to avoid false positives

### Edge Cases
- **Partial matches**: "visible" containing "viś" but not being विश् root - handled with precise pattern matching
- **Case sensitivity**: Handles mixed case inputs with normalization
- **Multiple evidence sources**: Prioritizes stronger evidence over weaker (verb-level over expression-based)
- **Script mixing**: Gracefully handles different scripts in same analysis

## Integration

### Related Sutras
- **1.3.14**: Provides the general reciprocal action rule that this sutra modifies
- **1.3.15**: Motion and injury verb exception that works alongside this rule
- **1.3.16**: Itaretara/anyonya compound exception in the same domain

### Used By
- Voice assignment systems requiring specific ni+viś detection
- Sanskrit verb analysis pipelines
- Educational tools demonstrating specific sutra applications

## References

- **Panini's Ashtadhyayi**: Sutra 1.3.17 - नेर्विशः
- **Implementation Notes**: Based on traditional grammar analysis requiring specific ni+viś combination detection
- **Test References**: Classical Sanskrit texts and grammatical examples demonstrating ni+viś usage

---

*Generated from template: SUTRA_README_TEMPLATE.md*
