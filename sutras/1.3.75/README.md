# Sutra 1.3.75: समुदाङ्भ्यो यमोऽग्रन्थे

## Overview

**Sanskrit Text**: `समुदाङ्भ्यो यमोऽग्रन्थे`  
**Transliteration**: samudāṅbhyo yamoʼgranthe  
**Translation**: The root यम् when used with the prefixes सम्, उद्, or आङ् in contexts other than books takes Ātmanepada.

## Purpose

This sutra specifies that the root यम् (to restrain, control) takes Ātmanepada endings when combined with specific prefixes (सम्, उद्, आङ्) but only in non-literary or non-book contexts (अग्रन्थे). This represents a contextual application of voice assignment.

## Implementation

### Function Signature
```javascript
function sutra1375(word, context = {}) {
    // Returns analysis of यम् prefix combinations in non-book contexts
}
```

### Key Features
- Root analysis for यम् derivatives
- Prefix detection for सम्, उद्, आङ् (sam, ud, āṅ)
- Context analysis for non-book situations
- Multi-script support (Devanagari and IAST)
- Pattern matching for compound forms

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Root Analysis**: Pattern detection for verbal roots
- **Prefix Detection**: Morphological analysis utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1375 } from './index.js';

// यम् with सम् prefix in non-book context
const result1 = sutra1375('संयमते', {
  root: 'यम्',
  prefix: 'सम्',
  nonBookContext: true
});
console.log(result1); // { applies: true, isAtmanepada: true, confidence: 0.95 }

// Same root in book context
const result2 = sutra1375('संयमति', {
  root: 'यम्',
  prefix: 'सम्',
  nonBookContext: false
});
console.log(result2); // { applies: false, isAtmanepada: false }
```

### Advanced Usage
```javascript
// Automatic prefix detection
const result = sutra1375('उद्यमते', {
  nonBookContext: true
});
// Detects उद् prefix and यम् root automatically

// IAST script support
const result2 = sutra1375('āyamante', {
  nonBookContext: true
});
// Handles IAST transliteration
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 22 tests covering:
- Basic functionality with all three prefixes (सम्, उद्, आङ्)
- Context sensitivity (book vs non-book)
- Pattern recognition for compound forms
- IAST script support and conversion
- Edge cases with partial matches
- Error handling and input validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.75

# Run with coverage
npm test sutras/1.3.75 --coverage
```

## Technical Details

### Algorithm
1. Validates input and detects script
2. Analyzes word for यम् root patterns
3. Identifies qualifying prefixes (सम्, उद्, आङ्)
4. Checks context for non-book application
5. Applies Ātmanepada when all conditions are met

### Performance
- **Time Complexity**: O(n) for pattern matching where n is word length
- **Space Complexity**: O(1) memory usage
- **Optimization Notes**: Early returns for non-matching patterns

### Edge Cases
- Handles compound words with multiple prefixes
- Context defaults to non-book when unspecified
- Pattern detection works across script boundaries
- Partial matches handled with appropriate confidence levels

## Integration

### Related Sutras
- **1.3.66**: भ्रस्जमृदामण्डलोच्छ्रयश्च (specific roots with Ātmanepada)
- **1.3.78**: शेषात् कर्तरि परस्मैपदम् (default Parasmaipada)

### Used By
- Contextual voice assignment systems
- Literary vs. colloquial Sanskrit analysis
- Morphological processing with prefix sensitivity

## References

- **Panini's Ashtadhyayi**: 1.3.75 समुदाङ्भ्यो यमोऽग्रन्थे
- **Context**: अग्रन्थे refers to non-book, practical usage contexts
- **Prefixes**: सम् (complete), उद् (up/out), आङ् (toward/near)

---

*Generated from template: SUTRA_README_TEMPLATE.md*
