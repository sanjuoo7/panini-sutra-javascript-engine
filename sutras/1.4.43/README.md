# Sutra 1.4.43: दिवः कर्म च

## Overview

**Sanskrit Text**: `दिवः कर्म च`  
**Transliteration**: divaḥ karma ca  
**Translation**: And [that which is instrumental] of दिव् [is also called] कर्म

## Purpose

This sutra extends the previous rule (1.4.42) by stating that for the verbal root दिव् (to play/gamble), the instrument that is especially auxiliary in accomplishing the action receives dual designation: it can be called both करण (instrument) and कर्म (object). This is a special exception showing how certain elements can have multiple कारक designations.

## Implementation

### Function Signature
```javascript
function sutra1443(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies dual करण-कर्म designation for दिव् root
- Validates the verbal root and gaming/playing context
- Handles gambling instruments and playing tools
- Integrates with both करण and कर्म analysis systems

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `verb-analysis`
- **Shared Functions**: `case-operations.js`, `dhatu-classification.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1443 } from './index.js';

// Example 1: Gaming dice
const result1 = sutra1443('अक्ष', {
  verb: 'दीव्यति',
  action: 'द्यूत',
  context: 'अक्षैः दीव्यति',
  case: 'instrumental'
});
console.log(result1); // { applies: true, karakas: ['करण', 'कर्म'], dualDesignation: true }

// Example 2: Playing instruments
const result2 = sutra1443('वीणा', {
  verb: 'दीव्यति',
  action: 'वादन',
  context: 'वीणया दीव्यति',
  playType: 'musical'
});
console.log(result2); // { applies: true, karakas: ['करण', 'कर्म'] }
```

### Advanced Usage
```javascript
// Complex gaming context analysis
const result3 = sutra1443('पाशक', {
  verb: 'दीव्यति',
  action: 'पाशकक्रीडा',
  context: 'पाशकैः सह मित्रैः दीव्यति',
  companions: ['मित्र'],
  gameType: 'dice_game'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 25+ tests covering:
- Dual करण-कर्म designation validation
- दिव् root verification and context analysis
- Gaming vs playing vs other contexts
- Multi-script support and error handling
- Integration with broader कारक systems
- Edge cases with compound verbs

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.43

# Run with coverage
npm test sutras/1.4.43 --coverage
```

## Technical Details

### Algorithm
1. **Root Verification**: Confirm the verbal root is दिव्
2. **Context Analysis**: Validate playing/gaming context
3. **Instrumentality Check**: Verify the word functions as primary instrument
4. **Dual Assignment**: Assign both करण and कर्म designations

### Performance
- **Time Complexity**: O(n) for context analysis
- **Space Complexity**: O(1) for standard cases
- **Optimization Notes**: Uses precompiled दिव् context patterns for efficiency

### Edge Cases
- दिव् in non-gaming contexts (compounds, derived meanings)
- Multiple instruments in gaming scenarios
- Integration priority with other कारक rules
- Archaic vs modern gaming terminology

## Integration

### Related Sutras
- **1.4.42**: साधकतमं करणम् (primary करण definition)
- **1.4.49**: कर्तुरीप्सिततमं कर्म (कर्म definition)
- **1.4.51**: अकथितं च (general कर्म cases)

### Used By
- Gaming context parsers
- Dual कारक assignment systems
- Literary analysis tools for classical texts

## References

- **Panini's Ashtadhyayi**: 1.4.43 दिवः कर्म च
- **Implementation Notes**: Classical examples from Mahabharata gambling episodes
- **Test References**: Traditional gaming terminology and contexts

---

*Generated from template: SUTRA_README_TEMPLATE.md*
