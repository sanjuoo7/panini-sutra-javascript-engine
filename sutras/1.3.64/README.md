# 1.3.64 — प्रोपाभ्यां युजेरयज्ञपात्रेषु

## Overview

**Sanskrit Text**: `प्रोपाभ्यां युजेरयज्ञपात्रेषु`  
**Transliteration**: propaabhyaaṃ yujerayajñapaatreṣu  
**Translation**: After yuJ with pra/upa prefixes, excluding sacrificial vessels

## Purpose

This sutra specifies that the root युज् (yuj 'to join, yoke') takes Ātmanepada when preceded by the prefixes प्र (pra-) or उप (upa-), except when used in the context of sacrificial vessels (यज्ञपात्र), even when the fruit of action doesn't accrue to the agent.

## Implementation

### Function Signature
```javascript
function sutra1364(word, context = {}) {
    // Checks for pra/upa + yuj with sacrificial vessel exclusion
}
```

### Key Features
- Detects root युज् (yuj) with prefixes प्र/उप
- Excludes sacrificial vessel contexts via `isSacrificialVesselContext`
- Multi-script support (Devanagari/IAST)
- Context-based prefix detection

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Context Requirements**: `root`, `prefix`/`prefixes`, `isSacrificialVesselContext`

## Usage Examples

### Basic Usage
```javascript
import { sutra1364 } from './index.js';

// Applies case
const result1 = sutra1364('प्रयुङ्क्ते', { 
  root: 'युज्', 
  prefixes: ['प्र'] 
});
console.log(result1.applies); // true
console.log(result1.isAtmanepada); // true

// Excluded case
const result2 = sutra1364('प्रयुङ्क्ति', { 
  root: 'yuj', 
  prefixes: ['pra'], 
  isSacrificialVesselContext: true 
});
console.log(result2.applies); // false
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 3 tests covering:
- Positive case with pra/upa prefixes
- Exclusion in sacrificial vessel context
- Scope limitation verification

## Technical Details

### Algorithm
1. Validate input and detect script
2. Check for root युज् (yuj)
3. Verify presence of प्र/उप prefix
4. Check for sacrificial vessel exclusion
5. Return Ātmanepada designation if applicable

### Edge Cases
- Mixed script inputs handled via script detection
- Context vs surface prefix detection
- Semantic domain exclusions

## Integration

### Related Sutras
- **1.3.65**: समः क्ष्णुवः (similar prefix-based rule)
- **1.3.66**: भुजोऽनवने (semantic exclusion pattern)

## References

- **Panini's Ashtadhyayi**: 1.3.64 प्रोपाभ्यां युजेरयज्ञपात्रेषु
- **Implementation Notes**: Follows semantic exclusion pattern for domain-specific contexts

---

*Generated from template: SUTRA_README_TEMPLATE.md* — प्रोपाभ्यां युजेरयज्ञपात्रेषु

- Type: Ātmanepada designation (vidhi)
- Scope: युज् ‘to join’ with prefixes प्र/उप; excluded in sacrificial-vessel contexts.

## Implementation
- Function: `sutra1364(word, context)`
- Detects `युज्/yuj` + `प्र/pra` or `उप/upa`; blocks when `isSacrificialVesselContext`.
