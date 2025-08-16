# 1.3.67 — णेरणौ यत् कर्म णौ चेत् स कर्ताऽनाध्याने

## Overview

**Sanskrit Text**: `णेरणौ यत् कर्म णौ चेत् स कर्ताऽनाध्याने`  
**Transliteration**: ṇeraṇau yat karma ṇau cet sa kartā'nādhyāne  
**Translation**: After causative (ṇic), when the non-causative object becomes the agent in causative, not in regretful remembering sense

## Purpose

This sutra specifies complex conditions for Ātmanepada in causative (णिच्) constructions. When the object of the base verb becomes the agent of the causative verb, Ātmanepada is used, except when the meaning involves regretful remembering (अनाध्यान), regardless of whether the fruit accrues to the agent.

## Implementation

### Function Signature
```javascript
function sutra1367(word, context = {}) {
    // Causative with object→agent transformation, excluding regret sense
}
```

### Key Features
- Detects causative morphology (णिच्)
- Checks for object→agent transformation
- Excludes regretful remembering semantics
- Independent of fruit-to-agent consideration

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Context Requirements**: `isCausative`, `objectBecomesAgent`, `isRegretfulRemembering`

## Usage Examples

### Basic Usage
```javascript
import { sutra1367 } from './index.js';

// Applies case
const result1 = sutra1367('कारयते', { 
  isCausative: true, 
  objectBecomesAgent: true, 
  semantic: 'to cause to do' 
});
console.log(result1.applies); // true
console.log(result1.isAtmanepada); // true

// Excluded case (regret sense)
const result2 = sutra1367('अनुस्मारयते', { 
  isCausative: true, 
  objectBecomesAgent: true, 
  isRegretfulRemembering: true 
});
console.log(result2.applies); // false
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 3 tests covering:
- Positive causative with object→agent
- Non-causative exclusion
- Regretful remembering exclusion

## Technical Details

### Algorithm
1. Validate causative morphology
2. Verify object→agent transformation
3. Check for regretful remembering exclusion
4. Return Ātmanepada if conditions met

### Edge Cases
- Complex causative semantics
- Semantic domain exclusions
- Context-dependent transformations

## Integration

### Related Sutras
- **1.3.68**: भीस्म्योर्हेतुभये (specific causative roots)
- **1.3.62**: पूर्ववत् सन् (morphological inheritance pattern)

## References

- **Panini's Ashtadhyayi**: 1.3.67 णेरणौ यत् कर्म णौ चेत् स कर्ताऽनाध्याने
- **Implementation Notes**: Complex causative-passive interaction with semantic constraints

---

*Generated from template: SUTRA_README_TEMPLATE.md* — णेरणौ यत् कर्म णौ चेत् स कर्ताऽनाध्याने

- Type: Ātmanepada designation (vidhi)
- Scope: Causatives (णिच्) where the base object becomes the agent; excluded in “regretful remembering”.

## Implementation
- Function: `sutra1367(word, context)`
- Requires `isCausative` and `objectBecomesAgent`; guards against regret sense.
