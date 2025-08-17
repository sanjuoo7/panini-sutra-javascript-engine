# Sutra 1.4.3: यू स्त्र्याख्यौ नदी

## Overview

**Sanskrit Text**: `यू स्त्र्याख्यौ नदी`
**Transliteration**: `yū stryākhyau nadī`
**Translation**: Feminine words ending in long `ī` (ई) or long `ū` (ऊ) are termed `nadī`.

## Purpose

This sūtra is a `saṃjñā` (technical term) rule that assigns the name `nadī` to a specific class of feminine nouns. This designation is crucial for the application of subsequent grammatical rules, particularly those related to case endings.

## Implementation

### Function Signature
```javascript
function applySutra1_4_3(word, context) {
    // Implementation details
}
```

### Key Features
- Identifies if a word is feminine.
- Checks if the word ends in a long `ī` or long `ū`.
- If both conditions are met, it assigns the `nadī` saṃjñā.

### Dependencies
- **Sanskrit Utils**: A utility to check the final vowel of a word and its length. A utility to check the gender of a word.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_4_3 } from './index.js';

// Example 1: Feminine word ending in ī
const result1 = applySutra1_4_3('kumārī', { gender: 'feminine' });
console.log(result1); // Expected: { applies: true, sanjna: 'nadī' }

// Example 2: Feminine word ending in ū
const result2 = applySutra1_4_3('vadhū', { gender: 'feminine' });
console.log(result2); // Expected: { applies: true, sanjna: 'nadī' }
```

### Advanced Usage
```javascript
// Example of a word that does not qualify
const result3 = applySutra1_4_3('dhenu', { gender: 'feminine' }); // ends in short u
console.log(result3); // Expected: { applies: false }

const result4 = applySutra1_4_3('pati', { gender: 'masculine' }); // not feminine
console.log(result4); // Expected: { applies: false }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**:
- Positive cases: Feminine nouns ending in `ī` and `ū` (e.g., `nadī`, `gaurī`, `vadhū`).
- Negative cases:
    - Nouns not ending in `ī` or `ū` (e.g., `mati`, `dhenu`).
    - Masculine or neuter nouns (e.g., `pati`, `vāri`).
    - Words subject to exceptions in later sūtras (e.g., `strī`, which is handled by 1.4.4).

### Running Tests
```bash
npm test sutras/1.4.3
```

## Technical Details

### Algorithm
1. Check the `gender` from the context. It must be `feminine`.
2. Get the last character of the input word.
3. Check if the last character is a long `ī` or a long `ū`.
4. If both conditions are met, the sūtra applies and assigns the `nadī` saṃjñā.

### Performance
- **Time Complexity**: O(1).
- **Space Complexity**: O(1).

## Integration

### Related Sutras
- **`neyaṅuvaṅsthānāvastrī` (1.4.4)**: Provides exceptions to this rule.
- **`vāmi` (1.4.5)**: Makes the `nadī` designation optional in a specific context (before the `ām` case ending).
- **`ṅiti hrasvaśca` (1.4.6)**: Extends the `nadī` designation optionally to short-vowel feminine nouns in certain cases.

### Used By
- Many sūtras in the Aṣṭādhyāyī use the term `nadī` to specify their domain of application, such as `āṇ nadyāḥ` (7.3.112).

## References

- **Panini's Ashtadhyayi**: Sutra 1.4.3

---

*Generated from template: SUTRA_README_TEMPLATE.md*
