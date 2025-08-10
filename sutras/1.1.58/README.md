# Sutra 1.1.58: न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु (na padāntadvirvacanavarayalopasvarasavarṇānusvāradīrghajaścaravidhiṣu)

## Overview

**Sanskrit Text**: `न पदान्तद्विर्वचनवरेयलोपस्वरसवर्णानुस्वारदीर्घजश्चर्विधिषु`  
**Transliteration**: na padāntadvirvacanavarayalopasvarasavarṇānusvāradīrghajaścaravidhiṣu  
**Translation**: Not so, in rules relating to the finals of words, to the doubling of letters, to the affixing of वरच् , to the elision of य , to accent, to homogenous letters, to अनुस्वर , to the lengthening of vowels and to the substitution of जस् and चर् characters.

## Purpose

This sutra acts as a `pratiṣedha` (prohibition or exception) to the general principle of `Sthānivadbhāva` established by Sutra 1.1.56 and further specified by 1.1.57. It explicitly lists nine types of rules where `Sthānivadbhāva` does *not* apply. This means that even if a substitute (`ādeśa`) replaces an original (`sthānī`), the substitute will *not* be treated as the original for the purpose of these specific rules.

The nine categories are:
1.  **`padānta-vidhi`**: Rules relating to the end of a word.
2.  **`dvirvacana-vidhi`**: Rules relating to the doubling (reduplication) of letters.
3.  **`varaya-vidhi`**: Rules relating to the affixing of `varac`.
4.  **`lopa-vidhi`**: Rules relating to the elision of `ya`.
5.  **`svara-vidhi`**: Rules relating to accent.
6.  **`savarṇa-vidhi`**: Rules relating to homogenous letters.
7.  **`anusvāra-vidhi`**: Rules relating to `anusvāra`.
8.  **`dīrgha-vidhi`**: Rules relating to the lengthening of vowels.
9.  **`jaś-car-vidhi`**: Rules relating to the substitution of `jaś` and `car` characters.

## Implementation

### Function Signature
```javascript
export function isSthanivadbhavaBlocked(ruleType) { /* ... */ }
export const SthanivadbhavaBlockingRuleTypes = { /* ... */ };
```

### Key Features
- Defines an `enum` (`SthanivadbhavaBlockingRuleTypes`) for the nine rule types that block `Sthānivadbhāva`.
- The `isSthanivadbhavaBlocked` function checks if a given `ruleType` is present in this predefined list of blocking types.

### Dependencies
- **Sanskrit Utils**: None directly used.

## Usage Examples

### Basic Usage
```javascript
import { isSthanivadbhavaBlocked, SthanivadbhavaBlockingRuleTypes } from './index.js';

// Example 1: Sthānivadbhāva is blocked for a Dvirvacana rule
const isBlockedForDvirvacana = isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.DVIRVACANA_VIDHI);
console.log(isBlockedForDvirvacana); // true

// Example 2: Sthānivadbhāva is blocked for a Lopa rule
const isBlockedForLopa = isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.LOPA_VIDHI);
console.log(isBlockedForLopa); // true

// Example 3: Sthānivadbhāva is NOT blocked for a general rule (not in the list)
const isBlockedForGeneral = isSthanivadbhavaBlocked('some_general_rule');
console.log(isBlockedForGeneral); // false

// Example 4: Sthānivadbhāva is blocked for a Svara rule
const isBlockedForSvara = isSthanivadbhavaBlocked(SthanivadbhavaBlockingRuleTypes.SVARA_VIDHI);
console.log(isBlockedForSvara); // true
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 14 tests covering:
- Positive cases for each of the nine blocking rule types.
- Negative cases for rule types not in the blocking list.
- Handling of invalid or unexpected inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.1.58

# Run with coverage
npm test sutras/1.1.58 --coverage
```

## Technical Details

### Algorithm
- The `isSthanivadbhavaBlocked` function retrieves all values from the `SthanivadbhavaBlockingRuleTypes` enum and checks if the provided `ruleType` string is included in that array. This provides a simple and efficient lookup.

### Performance
- **Time Complexity**: O(1) on average, as the number of blocking rule types is constant and small, making `Array.prototype.includes` effectively constant time.
- **Space Complexity**: O(1).
- **Optimization Notes**: The use of an enum and `Object.values` ensures clarity and maintainability.

### Edge Cases
- Handles `null`, `undefined`, and other non-string inputs by returning `false`, as they do not match any of the defined blocking rule types.

## Integration

### Related Sutras
- **1.1.56 (स्थानिवदादेशोऽनल्विधौ)**: This sutra defines exceptions to the general `Sthānivadbhāva` principle established by 1.1.56.
- **1.1.57 (अचः परस्मिन् पूर्वविधौ)**: This sutra also defines exceptions to the specific `Sthānivadbhāva` for vowel substitutes.
- **1.1.59 (द्विर्वचनेऽचि)**: This sutra provides a specific context where `Sthānivadbhāva` applies for reduplication, which might interact with the `dvirvacana-vidhi` exception in 1.1.58.

### Used By
- Any function or rule engine that applies `Sthānivadbhāva` will need to consult this sutra to determine if the application is prohibited in certain contexts.

## References

- **Panini's Ashtadhyayi**: 1.1.58
- **Implementation Notes**: This `pratiṣedha` sutra is critical for correctly applying `Sthānivadbhāva` by defining its limitations.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
