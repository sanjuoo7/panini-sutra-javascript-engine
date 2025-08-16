# Sutra 1.3.31: स्पर्द्धायामाङः

## Overview

**Sanskrit Text**: `स्पर्द्धायामाङः`  
**Transliteration**: spardhāyām āṅgaḥ  
**Translation**: After the verbs ह्वे 'to call', when meaning 'to challenge' and preceded by आङ्, the आत्मनेपद is used, even when the fruit of the action does not accrue to the agent.

## Purpose

This sutra specifies that the verbal root ह्वे (hve, 'to call') takes Ātmanepada endings when preceded by the prefix आङ् and used in the specific semantic context of challenging or competition (स्पर्द्धा). This represents a contextual refinement of the general rules for Ātmanepada usage, emphasizing the importance of semantic meaning in grammatical prescription.

## Implementation

### Function Signature
```javascript
function determineSpardhayamAngaAtmanepada(word, context = {}) {
    // Analyzes if ह्वे root with आङ् prefix in challenging context requires Ātmanepada
}
```

### Key Features
- **Contextual Semantic Analysis**: Detects challenging/competitive semantic contexts (स्पर्द्धा)
- **Prefix-Specific Recognition**: Identifies आङ् prefix patterns and variations
- **Multi-Script Support**: Processes both IAST and Devanagari input seamlessly
- **Challenge Context Detection**: Recognizes various forms of competitive meanings
- **Comprehensive Validation**: Robust input processing with detailed error handling
- **Confidence Assessment**: Provides graduated confidence levels based on detection certainty

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Classification Utils**: `isVowel`, `isConsonant`
- **Shared Functions**: Internal semantic analysis and morphological processing functions

## Usage Examples

### Basic Usage
```javascript
import { determineSpardhayamAngaAtmanepada } from './index.js';

// Example 1: आङ् + ह्वे in challenging context
const result1 = determineSpardhayamAngaAtmanepada('आह्वयति', {
    meaning: 'to challenge',
    challenge: true
});
console.log(result1); 
// { isSpardhayamAngaAtmanepada: true, confidence: 0.95, analysis: '...', sutraApplied: '1.3.31' }

// Example 2: Competition context
const result2 = determineSpardhayamAngaAtmanepada('आह्वयते', {
    competition: true,
    meaning: 'to challenge to compete'
});
console.log(result2);
// { isSpardhayamAngaAtmanepada: true, confidence: 0.9, analysis: '...', sutraApplied: '1.3.31' }
```

### Advanced Usage
```javascript
// With explicit semantic context
const result3 = determineSpardhayamAngaAtmanepada('आह्वयति', {
    root: 'ह्वे',
    prefix: 'आङ्',
    meaning: 'to call to battle',
    challenge: true,
    semanticField: 'competition'
});

// Devanagari input with context
const result4 = determineSpardhayamAngaAtmanepada('आह्वयते', {
    meaning: 'युद्धे आह्वानम्',
    challenge: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 54 tests covering:
- Basic functionality with आङ् prefix and ह्वे root combinations
- Challenge/competition semantic context detection
- Script processing (IAST and Devanagari)
- Context validation with explicit challenge flags
- Edge cases including ambiguous semantic contexts
- Error handling for invalid inputs and missing context
- Integration with morphological analysis systems
- Boundary conditions for semantic field recognition

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.31

# Run with coverage
npm test sutras/1.3.31 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Comprehensive validation of word input and context parameters
2. **Script Detection**: Identifies input script using `detectScript` utility
3. **Root Analysis**: Detects ह्वे root patterns in multiple morphological forms
4. **Prefix Recognition**: Identifies आङ् prefix with sandhi considerations
5. **Semantic Context Analysis**: Evaluates challenge/competition meaning indicators
6. **Challenge Flag Processing**: Analyzes explicit context flags and semantic markers
7. **Confidence Calculation**: Computes confidence based on morphological and semantic certainty
8. **Result Synthesis**: Compiles comprehensive analysis with sutra application determination

### Performance
- **Time Complexity**: O(n) where n is the length of the input word
- **Space Complexity**: O(1) constant space for primary analysis operations
- **Optimization Notes**: Efficient semantic pattern matching with early termination for non-matching cases

### Edge Cases
- **Ambiguous Semantics**: Handles cases where challenge meaning is unclear or context-dependent
- **Sandhi Variations**: Manages phonetic changes in आङ् + ह्वे combinations
- **Context Disambiguation**: Uses multiple semantic indicators to resolve ambiguous cases
- **False Positives**: Filters out non-challenging uses of आङ् + ह्वे combinations

## Integration

### Related Sutras
- **1.3.30** (निसमुपविभ्यो ह्वः): General rule for ह्वे with specific prefixes
- **1.3.12** (अनुदात्तङित आत्मनेपदम्): Fundamental Ātmanepada prescription rule
- **1.4.59** (उपसर्गाः क्रियायोगे): Rules governing upasarga usage with verbal roots

### Used By
- Sanskrit parsing engines requiring contextual pada determination
- Semantic analysis systems processing competitive discourse
- Educational applications demonstrating context-dependent grammatical rules
- Digital Sanskrit text processing pipelines

## References

- **Panini's Ashtadhyayi**: सूत्र १.३.३१ स्पर्द्धायामाङः
- **Kashika Commentary**: Commentary on competitive context and आङ् prefix usage
- **Patanjali's Mahabhashya**: Detailed discussion of semantic context in grammatical rules
- **Implementation Notes**: Incorporates computational semantic analysis with traditional grammatical interpretation
- **Test References**: Examples from classical Sanskrit literature involving challenges and competitions

---

*Generated from template: SUTRA_README_TEMPLATE.md*
