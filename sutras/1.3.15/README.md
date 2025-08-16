# Sutra 1.3.15: न गतिहिंसार्थेभ्यः

## Overview

**Sanskrit Text**: `न गतिहिंसार्थेभ्यः`  
**Transliteration**: na gatihiṃsārthebhyaḥ  
**Translation**: Not from [verbs expressing] motion or injury

## Purpose

This sutra provides a crucial exception to Sutra 1.3.14 (कर्त्तरि कर्म्मव्यतिहारे). Even when there is reciprocal action between multiple agents, verbs that primarily express motion (गति/gati) or injury/harm (हिंसा/hiṃsā) do NOT take ātmanepada endings. This rule ensures that the inherent semantic nature of motion and injury verbs takes precedence over the reciprocal context rule.

## Implementation

### Function Signature
```javascript
function determineMotionInjuryException(verb, context = {}) {
    // Returns exception applicability analysis for motion/injury verbs
}
```

### Key Features
- **Motion Verb Detection**: Identifies verbs with inherent motion semantics
- **Injury Verb Detection**: Identifies verbs expressing harm or injury
- **Contextual Analysis**: Analyzes semantic meaning from context descriptions
- **Exception Determination**: Determines if Sutra 1.3.15 exception applies
- **Multi-Script Support**: Handles both IAST and Devanagari input
- **Confidence Scoring**: Provides confidence levels for semantic categorization

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection for input text
  - `validateSanskritWord` - Input validation for Sanskrit words
- **Shared Functions**: None (self-contained implementation)

## Usage Examples

### Basic Usage
```javascript
import { determineMotionInjuryException, hasMotionMeaning, hasInjuryMeaning } from './index.js';

// Example 1: Motion verb detection
const motionResult = determineMotionInjuryException('gam');
console.log(motionResult);
// {
//   success: true,
//   verb: 'gam',
//   script: 'IAST',
//   appliesException: true,
//   reason: 'Motion verb exception - does not take ātmanepada per Sutra 1.3.15',
//   confidence: 0.8,
//   semanticCategory: 'motion',
//   rule: '1.3.15'
// }

// Example 2: Injury verb detection
const injuryResult = determineMotionInjuryException('han');
console.log(injuryResult);
// {
//   success: true,
//   verb: 'han',
//   script: 'IAST',
//   appliesException: true,
//   reason: 'Injury verb exception - does not take ātmanepada per Sutra 1.3.15',
//   confidence: 0.8,
//   semanticCategory: 'injury',
//   rule: '1.3.15'
// }
```

### Advanced Usage
```javascript
// Contextual semantic analysis
const contextResult = determineMotionInjuryException('test', {
  meaning: 'to move from one place to another',
  includeAnalysis: true
});

console.log(contextResult.semanticAnalysis);
// {
//   hasMotionMeaning: true,
//   hasInjuryMeaning: false,
//   category: 'motion',
//   motionIndicators: [
//     { type: 'contextual_motion', value: 'move', strength: 0.6 }
//   ],
//   semanticStrength: 0.6
// }

// Simple helper functions
const isMotionVerb = hasMotionMeaning('car'); // true
const isInjuryVerb = hasInjuryMeaning('hiṃs'); // true

// Force classification for testing
const testResult = determineMotionInjuryException('test', { 
  forceMotion: true 
});
console.log(testResult.semanticCategory); // 'motion'
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 26 tests covering:
- Basic motion and injury verb detection
- Root-based semantic analysis
- Contextual meaning detection
- Force flags for testing scenarios
- Script handling (IAST, Devanagari, unknown)
- Integration with traditional examples
- Helper function interfaces
- Error handling and edge cases
- Performance with large contexts

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.15

# Run with coverage
npm test sutras/1.3.15 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit verb and context structure
2. **Semantic Analysis**: 
   - **Root Analysis**: Checks verb against known motion/injury root lists
   - **Contextual Analysis**: Analyzes meaning/action descriptions for motion/injury patterns
   - **Pattern Matching**: Uses precise matching to avoid false positives
3. **Category Determination**: Prioritizes stronger semantic evidence when both categories present
4. **Exception Application**: Determines if exception (no ātmanepada) applies based on semantic strength

### Performance
- **Time Complexity**: O(n) where n is size of root lists and context
- **Space Complexity**: O(1) excluding input/output
- **Optimization Notes**: Precise root matching prevents substring false positives

### Edge Cases
- **Substring Matching**: Prevents false positives like 'hiṃs' matching motion root 'i'
- **Mixed Semantics**: Handles verbs with both motion and injury aspects
- **Weak Evidence**: Conservative approach requiring clear semantic evidence
- **Unknown Scripts**: Graceful handling with force flags for testing

## Integration

### Related Sutras
- **1.3.14**: Primary reciprocal action rule that this sutra modifies
- **1.3.16**: Additional exception for itaretara/anyonya compounds
- **1.3.17-1.3.18**: Specific verb-preposition combination exceptions

### Used By
- Voice assignment systems in Sanskrit computational grammar
- Exception handling in reciprocal action analysis
- Semantic classification of Sanskrit verbs
- Educational tools for advanced Sanskrit grammar

## References

- **Panini's Ashtadhyayi**: Adhyaya 1, Pada 3, Sutra 15
- **Implementation Notes**: Based on traditional commentaries distinguishing गति (motion) and हिंसा (injury) verb classes
- **Test References**: Classical examples from traditional grammar texts and modern linguistic analysis

---

*Generated from template: SUTRA_README_TEMPLATE.md*
