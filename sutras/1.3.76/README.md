# Sutra 1.3.76: अनुपसर्गाज्ज्ञः

## Overview

**Sanskrit Text**: `अनुपसर्गाज्ज्ञः`  
**Transliteration**: anupasargājjñaḥ  
**Translation**: The root ज्ञा (to know) when not used with a prefix and when the fruit of the action accrues to the agent takes Ātmanepada.

## Purpose

This sutra establishes that the root ज्ञा (to know, understand) takes Ātmanepada endings when used without any prefix (अनुपसर्ग) and when the knowledge benefits the agent (कर्त्रभिप्राय). This recognizes that knowing typically benefits the knower.

## Implementation

### Function Signature
```javascript
function sutra1376(word, context = {}) {
    // Returns analysis of ज्ञा without prefix with agent benefit
}
```

### Key Features
- Root detection for ज्ञा and its derivatives
- Verification of prefix absence (अनुपसर्ग condition)
- Agent benefit analysis (कर्त्रभिप्राय)
- Pattern recognition for ज्ञा forms (जानाति, जानीते, etc.)
- Multi-script support (Devanagari and IAST)

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Root Analysis**: Verbal root identification utilities
- **Morphological Tools**: Prefix detection and analysis

## Usage Examples

### Basic Usage
```javascript
import { sutra1376 } from './index.js';

// ज्ञा without prefix, with agent benefit
const result1 = sutra1376('जानीते', {
  root: 'ज्ञा',
  hasPrefix: false,
  benefitsAgent: true
});
console.log(result1); // { applies: true, isAtmanepada: true, confidence: 0.95 }

// ज्ञा with prefix (rule doesn't apply)
const result2 = sutra1376('प्रजानाति', {
  root: 'ज्ञा',
  hasPrefix: true,
  prefix: 'प्र'
});
console.log(result2); // { applies: false, isAtmanepada: false }
```

### Advanced Usage
```javascript
// Automatic pattern detection
const result = sutra1376('जानते', {
  benefitsAgent: true
});
// Automatically detects ज्ञा root and absence of prefix

// IAST script support
const result2 = sutra1376('jānīte', {
  benefitsAgent: true
});
// Handles IAST transliteration
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 23 tests covering:
- Basic functionality with ज्ञा root and agent benefit
- Prefix detection and exclusion logic
- Pattern recognition for different ज्ञा forms
- IAST script support and conversion
- Semantic analysis for knowledge benefit
- Edge cases and error handling
- Input validation and boundary conditions

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.76

# Run with coverage
npm test sutras/1.3.76 --coverage
```

## Technical Details

### Algorithm
1. Validates input and detects script
2. Analyzes word for ज्ञा root patterns
3. Verifies absence of prefixes (अनुपसर्ग check)
4. Evaluates agent benefit conditions
5. Applies Ātmanepada when all conditions are satisfied

### Performance
- **Time Complexity**: O(n) for pattern analysis where n is word length
- **Space Complexity**: O(1) memory usage
- **Optimization Notes**: Efficient root detection with early validation

### Edge Cases
- Handles various forms of ज्ञा (जानाति, जानीते, ज्ञायते)
- Prefix detection across different attachment patterns
- Agent benefit analysis with context sensitivity
- Pattern matching works for inflected forms

## Integration

### Related Sutras
- **1.3.72**: स्वरितञितः कर्त्रभिप्राये क्रियाफले (general agent benefit rule)
- **1.3.74**: णिचश्च (causative with agent benefit)
- **1.3.78**: शेषात् कर्तरि परस्मैपदम् (default Parasmaipada)

### Used By
- Knowledge verb analysis systems
- Root-based morphological processing
- Semantic voice assignment engines

## References

- **Panini's Ashtadhyayi**: 1.3.76 अनुपसर्गाज्ज्ञः
- **Root Context**: ज्ञा (to know) - knowledge typically benefits the knower
- **Linguistic Principle**: Prefix absence as a conditioning factor
- **Agent Benefit**: कर्त्रभिप्राय - action's fruit accruing to the agent

---

*Generated from template: SUTRA_README_TEMPLATE.md*
