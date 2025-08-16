# 1.3.58 — नानोर्ज्ञः

## Overview

**Sanskrit Text**: `नानोर्ज्ञः`  
**Transliteration**: nānorjñāḥ  
**Translation**: Not with anu- prefix for jñā (in desiderative)

## Purpose

This sutra creates an exception to the general rule that desiderative forms can take Ātmanepada. Specifically, when the root ज्ञा (jñā 'to know') is in desiderative form and preceded by the prefix अनु (anu-), Ātmanepada is prohibited.

## Implementation

### Function Signature
```javascript
function sutra1358(word, context = {}) {
    // Prohibition for desiderative ज्ञा with अनु prefix
}
```

### Key Features
- Detects desiderative (सन्) morphology
- Identifies root ज्ञा (jñā) 
- Checks for अनु (anu-) prefix
- Returns prohibition (isAtmanepada: false)

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Context Requirements**: `isDesiderative`, `root`, `prefix`/`prefixes`

## Usage Examples

### Basic Usage
```javascript
import { sutra1358 } from './index.js';

// Prohibited case
const result1 = sutra1358('अनुजिज्ञासते', { 
  root: 'ज्ञा', 
  prefixes: ['अनु'], 
  isDesiderative: true 
});
console.log(result1.applies); // true
console.log(result1.isAtmanepada); // false (prohibited)

// Not in scope
const result2 = sutra1358('जिज्ञासते', { 
  root: 'ज्ञा', 
  isDesiderative: true 
});
console.log(result2.applies); // false (no anu prefix)
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 9 tests covering:
- Prohibition for anu + jñā desiderative
- Scope limitation (requires all conditions)
- Edge cases with different root/prefix combinations

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.58

# Run with coverage
npm test sutras/1.3.58 --coverage
```

## Technical Details

### Algorithm
1. Validate input and detect script
2. Check for desiderative morphology (सन्)
3. Verify root is ज्ञा (jñā)
4. Detect अनु (anu-) prefix via context or word analysis
5. If all conditions met, return prohibition

### Performance
- **Time Complexity**: O(1) - constant time lookups
- **Space Complexity**: O(1) - minimal memory usage
- **Optimization Notes**: Uses regex patterns for efficient root/prefix detection

### Edge Cases
- Mixed script inputs (Devanagari/IAST) handled via script detection
- Context-based vs surface-based prefix detection
- Validation bypass for malformed inputs

## Integration

### Related Sutras
- **1.3.59**: प्रत्याङ्भ्यां श्रुवः (another desiderative prohibition)
- **1.3.62**: पूर्ववत् सन् (general desiderative inheritance rule)

### Used By
- Ātmanepada determination systems
- Verbal morphology analyzers

## References

- **Panini's Ashtadhyayi**: 1.3.58 नानोर्ज्ञः
- **Implementation Notes**: Prohibition pattern following 1.3.59 structure
- **Test References**: Traditional examples of अनुज्ञा vs जिज्ञासा

---

*Generated from template: SUTRA_README_TEMPLATE.md*
