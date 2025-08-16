# Sutra 1.3.14: कर्त्तरि कर्म्मव्यतिहारे

## Overview

**Sanskrit Text**: `कर्त्तरि कर्म्मव्यतिहारे`  
**Transliteration**: karttari karmavyatihāre  
**Translation**: When there is reciprocal action among agents, [ātmanepada] is used

## Purpose

This sutra establishes the grammatical rule for using ātmanepada (middle voice) endings when the action is reciprocal or mutual between multiple agents. It is fundamental for determining the correct voice assignment in Sanskrit verbal constructions involving reciprocal or mutual actions.

## Implementation

### Function Signature
```javascript
function determineReciprocalAtmanepada(verb, context = {}) {
    // Returns voice assignment based on reciprocal action analysis
}
```

### Key Features
- **Reciprocal Action Detection**: Identifies mutual/reciprocal actions from context
- **Multi-Agent Analysis**: Evaluates multiple agents performing actions upon each other
- **Confidence Scoring**: Provides confidence levels for voice assignment decisions
- **Multi-Script Support**: Handles both IAST and Devanagari input
- **Comprehensive Analysis**: Optional detailed analysis of reciprocal indicators

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection for input text
  - `validateSanskritWord` - Input validation for Sanskrit words
  - `tokenizePhonemes` - Text processing utilities
- **Shared Functions**: None (self-contained implementation)

## Usage Examples

### Basic Usage
```javascript
import { determineReciprocalAtmanepada, hasReciprocalAction } from './index.js';

// Example 1: Reciprocal action with explicit context
const result1 = determineReciprocalAtmanepada('yudh', {
  action: 'fight each other',
  agents: ['army1', 'army2']
});
console.log(result1);
// {
//   success: true,
//   verb: 'yudh',
//   script: 'IAST',
//   isAtmanepada: true,
//   reason: 'Reciprocal action detected - ātmanepada required per Sutra 1.3.14',
//   confidence: 0.9,
//   rule: '1.3.14'
// }

// Example 2: Sanskrit text
const result2 = determineReciprocalAtmanepada('युध्', {
  action: 'परस्पर युद्ध',
  agents: ['सेना1', 'सेना2']
});
console.log(result2.isAtmanepada); // true
```

### Advanced Usage
```javascript
// Detailed analysis with confidence breakdown
const result = determineReciprocalAtmanepada('vad', {
  meaning: 'speak to one another',
  agents: ['speaker1', 'speaker2'],
  includeAnalysis: true
});

console.log(result.reciprocalAnalysis);
// {
//   hasReciprocalAction: true,
//   reciprocalIndicators: [
//     { type: 'multiple_agents', value: 2, strength: 0.4 },
//     { type: 'meaning_based', value: 'one another', strength: 0.5 }
//   ],
//   agentCount: 2,
//   mutualityStrength: 0.9
// }

// Simple boolean check
const isReciprocal = hasReciprocalAction('fight each other', ['warrior1', 'warrior2']);
console.log(isReciprocal); // true
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 27 tests covering:
- Basic functionality and voice assignment
- Reciprocal action detection patterns
- Multi-agent analysis
- Verb inherent reciprocal potential
- Script handling (IAST, Devanagari, mixed)
- Error handling and edge cases
- Integration scenarios with traditional examples
- Performance with large contexts

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.14

# Run with coverage
npm test sutras/1.3.14 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit verb and context structure
2. **Script Detection**: Determines input script (IAST/Devanagari/mixed)
3. **Reciprocal Analysis**: Analyzes context for reciprocal indicators:
   - Explicit reciprocal action terms
   - Multiple agent presence
   - Reciprocal meaning patterns
   - Verb inherent reciprocal potential
4. **Mutuality Scoring**: Calculates confidence based on evidence strength
5. **Voice Assignment**: Determines ātmanepada usage based on analysis

### Performance
- **Time Complexity**: O(n) where n is context size
- **Space Complexity**: O(1) excluding input/output
- **Optimization Notes**: Pattern matching optimized for common reciprocal indicators

### Edge Cases
- **Single Agent**: No ātmanepada assignment without multiple agents
- **Non-Reciprocal Context**: Conservative assignment requiring clear evidence
- **Mixed Scripts**: Graceful handling of Sanskrit/transliteration combinations
- **Invalid Input**: Robust error handling with meaningful error messages

## Integration

### Related Sutras
- **1.3.15**: Exception rules for motion and injury verbs
- **1.3.16**: Special cases for itaretara and anyonya compounds
- **1.3.17-1.3.18**: Specific verb-preposition combination rules

### Used By
- Voice assignment systems in Sanskrit computational grammar
- Educational tools for Sanskrit grammar instruction
- Text analysis pipelines for classical Sanskrit literature

## References

- **Panini's Ashtadhyayi**: Adhyaya 1, Pada 3, Sutra 14
- **Implementation Notes**: Based on traditional grammatical commentaries and modern computational linguistics approaches
- **Test References**: Classical Sanskrit texts and pedagogical examples from traditional grammar instruction

---

*Generated from template: SUTRA_README_TEMPLATE.md*
