# Sutra 1.4.4: नेयङुवङ्स्थानावस्त्री

## Overview

**Sanskrit Text**: `नेयङुवङ्स्थानावस्त्री`
**Transliteration**: `neyaṅuvaṅsthānāvastrī`
**Translation**: Feminine words ending in `ī` and `ū` for which `iyaṅ` and `uvaṅ` are substituted are not termed `nadī`, with the exception of the word `strī`.

## Purpose

This sūtra is a `pratiṣedha` (prohibition/exception) to sūtra 1.4.3 (`yū stryākhyau nadī`). It specifies that certain feminine nouns ending in `ī` and `ū` are *not* to be given the `nadī` saṃjñā. This exception applies to nouns that undergo `iyaṅ` or `uvaṅ` substitution (as per sūtra 6.4.77). However, it makes a specific exception for the word `strī`, which remains `nadī`.

## Implementation

### Function Signature
```javascript
function applySutra1_4_4(word, context) {
    // Implementation details
}
```

### Key Features
- Acts as a prohibition (`niṣedha`) to the `nadī` saṃjñā.
- Checks if a word is a stem that would take `iyaṅ` or `uvaṅ` substitution.
- Explicitly excludes the word `strī` from this prohibition.

### Dependencies
- **Sanskrit Utils**: A utility to determine if a word stem is subject to `iyaṅ`/`uvaṅ` substitution.
- **Shared Functions**: Depends on the prior application of 1.4.3.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_4 } from './index.js';

// Example 1: A word subject to iyaṅ substitution
// 'śrī' becomes 'śriyaḥ', so it is not nadī.
const result1 = applySutra1_4_4('śrī', { gender: 'feminine', isIyanUvanSthana: true });
console.log(result1); // Expected: { applies: true, sanjna_prohibition: 'nadī' }

// Example 2: The word 'strī' is an exception
const result2 = applySutra1_4_4('strī', { gender: 'feminine', isIyanUvanSthana: true });
console.log(result2); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- **Positive cases (prohibition applies)**: Words like `śrī`, `bhrū`, `pradhī`.
- **Negative cases (prohibition does not apply)**:
    - The word `strī`.
    - Words that are `nadī` per 1.4.3 and do not take `iyaṅ`/`uvaṅ` (e.g., `kumārī`, `vadhū`).

### Running Tests
```bash
npm test sutras/1.4.4
```

## Technical Details

### Algorithm
1. This sūtra should be checked after 1.4.3 has potentially assigned the `nadī` saṃjñā.
2. Check if the word is `strī`. If so, this sūtra does not apply.
3. Check if the word's stem is one that takes `iyaṅ` or `uvaṅ` substitution. This often applies to monosyllabic words.
4. If it is, then this sūtra applies and revokes the `nadī` saṃjñā.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`yū stryākhyau nadī` (1.4.3)**: This sūtra provides the general rule that 1.4.4 provides an exception to.
- **`aci śnu-dhātu-bhruvāṃ yvor iyaṅ-uvaṅau` (6.4.77)**: The sūtra that defines `iyaṅ` and `uvaṅ` substitution, which is the condition for this sūtra's application.

### Used By
- The main `saṃjñā` processing logic to correctly identify `nadī` nouns.

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.4

---

*Generated from template: SUTRA_README_TEMPLATE.md*
