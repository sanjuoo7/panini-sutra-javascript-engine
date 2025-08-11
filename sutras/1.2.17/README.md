# Sutra 1.2.17: स्था घ्वोरिच्च

## Overview

**Sanskrit Text**: `स्था घ्वोरिच्च`  
**Transliteration**: sthā ghvoricca  
**Translation**: Of स्था (sthā) and घु class roots, also with सिच् (sic)

## Purpose

This sutra extends the kit designation rules to include the स्था (sthā) root and roots belonging to the घु class when they are followed by the सिच् (sic) affix. It broadens the scope of kit designation beyond the basic rules, ensuring specific morphological patterns are correctly identified.

## Implementation

### Function Signature
```javascript
function sutra1217(root, affix, context = {}) {
    // Validates inputs and checks for स्था or घु class roots with सिच् affix
    // Returns kit designation analysis
}
```

### Key Features
- Validates Sanskrit input using shared utilities
- Recognizes स्था root variants in both scripts (स्था, स्थ, तिष्ठ्, स्थि)
- Identifies all घु class roots (हु, हू, दा, धा, दो, पा, मा, चि, जि, मी, नी, चे)
- Checks specifically for सिच् (sic) affix
- Supports both Devanagari and IAST scripts
- Provides detailed root type classification in results

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection
  - `validateSanskritWord` - Input validation
  - `isSthaRoot` - स्था root identification
  - `isGhuClassRoot` - घु class root identification
  - `isSicAffix` - सिच् affix classification

## Usage Examples

### Basic Usage
```javascript
import { sutra1217 } from './index.js';

// Example 1: स्था root with सिच्
const result1 = sutra1217('स्था', 'सिच्');
console.log(result1.kit); // true
console.log(result1.rootType); // 'sthā'

// Example 2: घु class root (दा) with सिच्
const result2 = sutra1217('दा', 'सिच्');
console.log(result2.kit); // true
console.log(result2.rootType); // 'ghu-class'
```

### Advanced Usage
```javascript
// IAST script input
const result3 = sutra1217('sthā', 'sic');
console.log(result3.applies); // true
console.log(result3.kit); // true

// Mixed scripts
const result4 = sutra1217('हु', 'sic');
console.log(result4.applies); // true
console.log(result4.rootType); // 'ghu-class'

// All घु class roots work
const ghuRoots = ['हु', 'हू', 'दा', 'धा', 'दो', 'पा', 'मा'];
ghuRoots.forEach(root => {
    const result = sutra1217(root, 'सिच्');
    console.log(`${root}: ${result.kit}`); // All true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 35 tests covering:
- स्था root variants with सिच् affix
- All घु class roots with सिच् affix
- IAST and Devanagari script support
- Mixed script combinations
- Negative cases (wrong roots/affixes)
- Error handling for invalid inputs
- Comprehensive root validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.17

# Run with coverage
npm test sutras/1.2.17 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates root and affix as Sanskrit words
2. **Affix Check**: Confirms affix is सिच् using `isSicAffix`
3. **Root Classification**: Checks if root is स्था using `isSthaRoot`
4. **Class Check**: Verifies if root belongs to घु class using `isGhuClassRoot`
5. **Kit Assignment**: Applies kit designation if either condition is met

### Performance
- **Time Complexity**: O(1) - Constant time array lookups
- **Space Complexity**: O(1) - Fixed memory for root lists
- **Optimization Notes**: Pre-defined lists for स्था variants and घु class roots enable fast classification

### Edge Cases
- **Root variants**: Handles all known forms of स्था (स्था, स्थ, तिष्ठ्, स्थि)
- **Complete घु class**: Covers all 12 traditional घु class roots
- **Script mixing**: Supports Devanagari root with IAST affix
- **Invalid combinations**: Gracefully rejects non-सिच् affixes

## Integration

### Related Sutras
- **1.2.8**: Base rule for kit designation with क्त्वा and सन्
- **1.2.15**: Similar pattern for यम् root with सिच्
- **1.2.16**: Parallel optional rule for यम् in different context

### Used By
- Kit designation analysis systems
- Morphological processors requiring घु class identification
- Grammar engines processing स्था root derivatives

## References

- **Panini's Ashtadhyayi**: 1.2.17 स्था घ्वोरिच्च
- **Implementation Notes**: Based on traditional घु class classification and स्था root variants
- **Test References**: Classical lists of घु class roots and स्था morphological forms

---

*Generated from template: SUTRA_README_TEMPLATE.md*
