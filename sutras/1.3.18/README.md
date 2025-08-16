# Sutra 1.3.18: परिव्यवेभ्यः क्रियः

## Overview

**Sanskrit Text**: `परिव्यवेभ्यः क्रियः`  
**Transliteration**: parivayavebhayaḥ kariyaḥ  
**Translation**: After the verb क्री 'to purchase', when preceded by परि, वि or अव, the आत्मनेपद affix is employed, even when the fruit of the action does not accrue to the agent.

## Purpose

This sutra establishes a specific voice assignment rule for the verbal root क्री (krī, "to purchase") when it is combined with any of three specific prefixes: परि (pari), वि (vi), or अव (ava). Unlike the general rule that आत्मनेपद is used when the action benefits the agent, this sutra mandates आत्मनेपद usage for these specific combinations regardless of whether the agent receives the benefit of the action.

## Implementation

### Function Signature
```javascript
function determineKriPrefixAtmanepada(verb, context = {}) {
    // Analyzes Sanskrit verbs for क्री + specific prefix combinations
}
```

### Key Features
- Detects क्री root in various forms and inflections
- Identifies target prefixes (परि, वि, अव) from multiple sources
- Supports both IAST and Devanagari scripts
- Provides confidence scoring based on evidence quality
- Comprehensive context analysis including compound forms and expressions

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Input validation and error handling patterns

## Usage Examples

### Basic Usage
```javascript
import { determineKriPrefixAtmanepada } from './index.js';

// Example 1: परि + क्री combination
const result1 = determineKriPrefixAtmanepada('parikrī');
console.log(result1);
// {
//   success: true,
//   verb: 'parikrī',
//   isAtmanepada: true,
//   reason: 'क्री root with परि/वि/अव prefix - takes ātmanepada per Sutra 1.3.18',
//   confidence: 0.95,
//   combinationType: 'kri_prefix'
// }

// Example 2: वि + क्री combination
const result2 = determineKriPrefixAtmanepada('vikrī');
console.log(result2.isAtmanepada); // true

// Example 3: अव + क्री combination  
const result3 = determineKriPrefixAtmanepada('avakrī');
console.log(result3.isAtmanepada); // true
```

### Advanced Usage
```javascript
// Context-based detection
const contextResult = determineKriPrefixAtmanepada('krī', { prefix: 'pari' });
console.log(contextResult.isAtmanepada); // true

// Prefixes array analysis
const arrayResult = determineKriPrefixAtmanepada('krī', { prefixes: ['sam', 'pari'] });
console.log(arrayResult.isAtmanepada); // true

// Expression-based detection
const expressionResult = determineKriPrefixAtmanepada('krī', { 
  expression: 'with vi prefix'
});
console.log(expressionResult.isAtmanepada); // true

// Detailed analysis
const detailed = determineKriPrefixAtmanepada('parikrī', { includeAnalysis: true });
console.log(detailed.kriPrefixAnalysis);
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 29 tests covering:
- क्री root detection with all three target prefixes (परि, वि, अव)
- Context-based prefix and root analysis
- Multiple detection strategies (prefixes array, compound field, expressions)
- Script handling (IAST and Devanagari)
- Case-insensitive matching
- Non-target prefix rejection
- Error handling and edge cases
- Confidence scoring validation
- Integration with linguistic accuracy requirements

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.18

# Run with coverage
npm test sutras/1.3.18 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word and context structure
2. **Script Detection**: Identifies IAST, Devanagari, or unknown script  
3. **क्री Root Analysis**: Detects क्री root with multiple pattern matching strategies:
   - Exact root match
   - Root at word ending (e.g., parikrī)
   - Root within reasonable length constraints
4. **Target Prefix Analysis**: Identifies परि/वि/अव prefixes from:
   - Direct verb prefix detection (case-insensitive)
   - Context prefix field
   - Prefixes array
   - Compound field
   - Expression-based patterns
5. **Combination Analysis**: Evaluates evidence strength and combination type
6. **Voice Assignment**: Determines ātmanepada based on क्री + target prefix combination
7. **Confidence Scoring**: Assigns confidence based on detection evidence quality

### Performance
- **Time Complexity**: O(n) where n is the length of input strings
- **Space Complexity**: O(1) for core analysis, O(m) for detailed analysis where m is evidence count
- **Optimization Notes**: Pattern matching optimized with early breaks and length constraints

### Edge Cases
- **Non-target prefixes**: Properly rejects prefixes like 'sam', 'upa', etc.
- **Case sensitivity**: Handles mixed case inputs with normalization
- **Type safety**: Gracefully handles non-string context values
- **Script mixing**: Supports different scripts in same analysis
- **Inflected forms**: Detects क्री in inflected forms like krīṇāti

## Integration

### Related Sutras
- **1.3.14**: General reciprocal action rule that this sutra complements
- **1.3.15**: Motion and injury verb exception in the same domain
- **1.3.16**: Itaretara/anyonya compound exception
- **1.3.17**: Ni+viś specific rule in the same ātmanepada category

### Used By
- Sanskrit verb analysis systems requiring specific prefix + root combinations
- Voice assignment pipelines for purchase-related verbs
- Educational tools demonstrating sutra-specific grammatical rules

## References

- **Panini's Ashtadhyayi**: Sutra 1.3.18 - परिव्यवेभ्यः क्रियः
- **Implementation Notes**: Based on traditional analysis requiring क्री root with specific prefixes (परि, वि, अव)
- **Test References**: Classical Sanskrit examples of purchasing verbs with mandatory ātmanepada usage

---

*Generated from template: SUTRA_README_TEMPLATE.md*
