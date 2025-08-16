# Sutra 1.3.30: निसमुपविभ्यो ह्वः

## Overview

**Sanskrit Text**: `निसमुपविभ्यो ह्वः`  
**Transliteration**: nisamupavibhyaḥ hvah  
**Translation**: After the verbs ह्वे 'to call', preceded by नि, सम्, उप and वि, the आत्मनेपद is used, even when the fruit of the action does not accrue to the agent.

## Purpose

This sutra establishes that the verbal root ह्वे (hve, 'to call') takes Ātmanepada endings when preceded by specific prefixes (नि, सम्, उप, वि), regardless of whether the action's result benefits the agent. This is an exception to the general rule that Ātmanepada is used when the action's fruit accrues to the agent.

## Implementation

### Function Signature
```javascript
function determineNisamupavibhyaHvaAtmanepada(word, context = {}) {
    // Analyzes if ह्वे root with specified prefixes requires Ātmanepada
}
```

### Key Features
- **Multi-prefix Detection**: Recognizes नि, सम्, उप, and वि prefixes with ह्वे root
- **Script Support**: Handles both IAST and Devanagari input
- **Comprehensive Validation**: Thorough input validation and error handling
- **Confidence Scoring**: Provides confidence levels for determinations
- **Detailed Analysis**: Returns comprehensive analysis including prefix detection and semantic context

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Classification Utils**: `isVowel`, `isConsonant`
- **Shared Functions**: Internal helper functions for prefix and root detection

## Usage Examples

### Basic Usage
```javascript
import { determineNisamupavibhyaHvaAtmanepada } from './index.js';

// Example 1: नि + ह्वे
const result1 = determineNisamupavibhyaHvaAtmanepada('निह्वयति');
console.log(result1); 
// { isNisamupavibhyaHvaAtmanepada: true, confidence: 0.95, analysis: '...', sutraApplied: '1.3.30' }

// Example 2: सम् + ह्वे  
const result2 = determineNisamupavibhyaHvaAtmanepada('संह्वयति');
console.log(result2);
// { isNisamupavibhyaHvaAtmanepada: true, confidence: 0.95, analysis: '...', sutraApplied: '1.3.30' }
```

### Advanced Usage
```javascript
// With explicit context
const result3 = determineNisamupavibhyaHvaAtmanepada('उपाह्वयति', {
    root: 'ह्वे',
    prefix: 'उप',
    meaning: 'to call forth'
});

// Devanagari input
const result4 = determineNisamupavibhyaHvaAtmanepada('विह्वयति');
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 51 tests covering:
- Basic functionality with all four prefixes (नि, सम्, उप, वि)
- Script detection and conversion (IAST ↔ Devanagari)
- Context-based analysis with explicit root/prefix specification
- Edge cases including boundary conditions and malformed input
- Error handling for invalid inputs
- Integration scenarios with related morphological processes

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.30

# Run with coverage
npm test sutras/1.3.30 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates input string and context object
2. **Script Detection**: Determines input script (IAST/Devanagari) using `detectScript`
3. **Root Analysis**: Identifies ह्वे root patterns in both scripts
4. **Prefix Detection**: Searches for नि/सम्/उप/वि prefixes using pattern matching
5. **Morphological Analysis**: Analyzes prefix-root combinations and sandhi applications
6. **Confidence Calculation**: Assigns confidence scores based on detection certainty
7. **Result Compilation**: Returns comprehensive analysis with sutra application status

### Performance
- **Time Complexity**: O(n) where n is the length of the input word
- **Space Complexity**: O(1) constant space for analysis operations
- **Optimization Notes**: Uses efficient string matching and early returns for invalid cases

### Edge Cases
- **Sandhi Applications**: Handles phonetic changes at prefix-root boundaries (e.g., सम् + ह्वे → संह्वे)
- **Script Variations**: Manages both IAST and Devanagari representations consistently
- **Ambiguous Forms**: Uses context clues when morphological analysis is uncertain
- **Invalid Combinations**: Gracefully handles non-existent prefix-root combinations

## Integration

### Related Sutras
- **1.3.12** (अनुदात्तङित आत्मनेपदम्): General rule for Ātmanepada usage
- **1.3.31** (स्पर्द्धायामाङः): Specific rule for ह्वे with आङ् prefix in challenging context
- **1.4.99-1.4.109**: Rules governing upasarga (prefix) usage and classification

### Used By
- Verbal morphology analyzers requiring pada determination
- Sanskrit parsing systems handling prefixed verbal forms
- Educational tools demonstrating Ātmanepada prescription rules

## References

- **Panini's Ashtadhyayi**: सूत्र १.३.३० निसमुपविभ्यो ह्वः
- **Kashika Commentary**: Detailed explanation of prefix-specific Ātmanepada prescription
- **Implementation Notes**: Based on traditional Sanskrit grammatical analysis with modern computational linguistics principles
- **Test References**: Examples derived from classical Sanskrit texts and traditional grammatical treatises

---

*Generated from template: SUTRA_README_TEMPLATE.md*
