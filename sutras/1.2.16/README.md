# Sutra 1.2.16: विभाषोपयमने

## Overview

**Sanskrit Text**: `विभाषोपयमने`  
**Transliteration**: vibhāṣopayamane  
**Translation**: Optionally in the sense of restraining (upayamane)

## Purpose

This sutra establishes an optional rule for kit designation when the root यम् (yam) is used in the specific meaning of upayamane (restraining/curbing) with certain affixes. The विभाषा (vibhāṣā) prefix indicates that this rule is optional, allowing flexibility in grammatical application.

## Implementation

### Function Signature
```javascript
function sutra1216(root, affix, context = {}) {
    // Validates inputs and checks for यम् root with upayamane meaning
    // Returns kit designation analysis with optional application
}
```

### Key Features
- Validates Sanskrit input using shared utilities
- Recognizes यम् root variants in both Devanagari and IAST
- Checks for क्त्वा (ktvā) and सिच् (sic) affixes
- Requires semantic context of upayamane (restraining)
- Implements optional rule application (विभाषा)
- Supports mixed script inputs

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection
  - `validateSanskritWord` - Input validation
  - `isYamRoot` - Root identification
  - `isKtvAffix` - Affix classification
  - `isSicAffix` - Affix classification

## Usage Examples

### Basic Usage
```javascript
import { sutra1216 } from './index.js';

// Example 1: Apply kit designation (optional = true)
const result1 = sutra1216('यम्', 'क्त्वा', { 
  meaning: 'upayamane', 
  optional: true 
});
console.log(result1.kit); // true

// Example 2: Don't apply kit designation (optional = false)
const result2 = sutra1216('यम्', 'क्त्वा', { 
  meaning: 'restraining', 
  optional: false 
});
console.log(result2.kit); // false
```

### Advanced Usage
```javascript
// Mixed script input with सिच् affix
const result3 = sutra1216('yam', 'सिच्', { 
  meaning: 'curbing', 
  optional: true 
});
console.log(result3.applies); // true
console.log(result3.kit); // true

// Context with Sanskrit meaning term
const result4 = sutra1216('यम्', 'क्त्वा', { 
  meaning: 'उपयमने' 
});
console.log(result4.kit); // true (defaults to optional = true)
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 34 tests covering:
- Basic functionality with different meaning contexts
- Optional rule application (true/false)
- Both Devanagari and IAST scripts
- Mixed script combinations
- Error handling for invalid inputs
- Edge cases and context variations

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.16

# Run with coverage
npm test sutras/1.2.16 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates root and affix as Sanskrit words
2. **Root Check**: Confirms root is यम् using `isYamRoot`
3. **Affix Check**: Verifies affix is क्त्वा or सिच्
4. **Semantic Check**: Looks for upayamane meaning in context
5. **Optional Application**: Applies kit designation based on optional flag

### Performance
- **Time Complexity**: O(1) - Constant time lookups
- **Space Complexity**: O(1) - Fixed memory usage
- **Optimization Notes**: Uses pre-compiled root/affix lists for fast identification

### Edge Cases
- **Empty/null inputs**: Returns graceful error messages
- **Non-Sanskrit text**: Validated using `validateSanskritWord`
- **Missing context**: Requires upayamane meaning to apply
- **Mixed scripts**: Handles Devanagari root with IAST affix and vice versa

## Integration

### Related Sutras
- **1.2.8**: Base rule for kit designation with क्त्वा and सन्
- **1.2.15**: Related rule for यम् root in different semantic context (गन्धने)

### Used By
- Kit designation analysis in morphological processing
- Grammatical rule engines requiring optional kit application

## References

- **Panini's Ashtadhyayi**: 1.2.16 विभाषोपयमने
- **Implementation Notes**: Based on traditional interpretation of विभाषा as optional application
- **Test References**: Classical Sanskrit grammar examples with यम् in upayamane sense

---

*Generated from template: SUTRA_README_TEMPLATE.md*
