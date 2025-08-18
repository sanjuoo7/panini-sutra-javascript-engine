# Sutra 1.4.79: जीविकोपनिषदावौपम्ये

## Overview

**Sanskrit Text**: `जीविकोपनिषदावौपम्ये`
**Transliteration**: `jīvikopaniṣadāvaupamye`
**Translation**: The words `jīvikā` (livelihood) and `upaniṣad` (secret doctrine) [are `gati` with `kṛ`] in the sense of 'likeness' or 'resemblance' (`aupamye`).

## Purpose

This sutra assigns a `gati` classification to two specific words, `jīvikā` and `upaniṣad`, when they are used with the verb `kṛ` ('to do/make') to denote `aupamya` (likeness, resemblance, or comparison). For instance, `jīvikāṃ kṛtvā` would mean 'making it *like* a livelihood', not actually making a livelihood. This rule is sensitive to the metaphorical or comparative sense of the phrase. The classification is generally considered mandatory when the conditions are met.

## Implementation

### Function Signature
```javascript
function sutra1479(word, context = {}) {
    // Implementation details
}
```

### Key Features
- **Keyword Identification**: Detects `jīvikā` and `upaniṣad`.
- **Verb Check**: Confirms the verb in the context is `kṛ`.
- **Semantic Constraint**: The meaning must be 'likeness' or 'resemblance' (`aupamye`).
- **Mandatory Classification**: The output should indicate that the `gati` status is mandatory.
- **Script Agnostic**: Handles IAST and Devanagari.

### Dependencies
- **Sanskrit Utils**: `isVerb` to validate the verb.
- **Shared Functions**: None.

## Usage Examples

### Basic Usage
```javascript
import { sutra1479 } from './index.js';

// Example 1: 'jīvikā' with 'kṛ' in the sense of likeness
const result1 = sutra1479('jīvikākṛtya', { verb: 'kṛ', meaning: 'likeness' });
console.log(result1);
// Expected output:
// {
//   applies: true,
//   optional: false,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'jīvikā' is used with 'kṛ' in the sense of 'likeness', so its gati classification is mandatory."
// }

// Example 2: 'upaniṣad' with 'kṛ' in the sense of resemblance
const result2 = sutra1479('उपनिषत्करोति', { verb: 'कृ', meaning: 'resemblance' });
console.log(result2);
// Expected output:
// {
//   applies: true,
//   optional: false,
//   classification: 'गति',
//   confidence: 1.0,
//   reason: "The word 'upaniṣad' is used with 'kṛ' in the sense of 'resemblance', so its gati classification is mandatory."
// }
```

### Advanced Usage (Illustrating Failure Conditions)
```javascript
// Example where the meaning is not 'likeness'
const result3 = sutra1479('jīvikākṛtya', { verb: 'kṛ', meaning: 'earning' });
console.log(result3);
// Expected output:
// {
//   applies: false,
//   reason: "The meaning is not 'likeness' or 'resemblance'."
// }

// Example where the verb is not 'kṛ'
const result4 = sutra1479('upaniṣadpaṭhati', { verb: 'paṭh', meaning: 'likeness' });
console.log(result4);
// Expected output:
// {
//   applies: false,
//   reason: "The verb is not 'kṛ'."
// }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 54 tests covering:
- **Positive Cases (24)**: `jīvikā` and `upaniṣad` with `kṛ` are correctly identified as `gati` in the context of 'likeness' or 'resemblance'.
- **Negative Cases (20)**: The rule correctly fails when the meaning is literal (e.g., 'earning a livelihood'), the verb is not `kṛ`, or the keywords are absent.
- **Edge Cases (10)**: Robust handling of invalid inputs.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.79

# Run with coverage
npm test sutras/1.4.79 -- --coverage
```

## Technical Details

### Algorithm
1.  **Input Validation**: Check for valid `word` and `context`.
2.  **Keyword Check**: Identify `jīvikā` (जीविका) or `upaniṣad` (उपनिषद्).
3.  **Contextual Verification**:
    -   Confirm `context.verb` is `kṛ` (कृ).
    -   Confirm `context.meaning` is 'likeness' or 'resemblance'.
4.  **Mandatory Classification**: If all checks pass, return an object with `applies: true` and `optional: false`.
5.  **Failure/Error**: If any check fails, return an object with `applies: false` and a clear `reason` or `error`.

### Performance
-   **Time Complexity**: O(1).
-   **Space Complexity**: O(1).
-   **Optimization Notes**: A direct and efficient rule.

### Edge Cases
-   The context is ambiguous. The function relies on an explicit 'likeness' or 'resemblance' meaning.
-   The words are used in their literal sense (e.g., `jīvikāṃ karoti` - 'he makes a living').

## Integration

### Related Sutras
-   This sutra concludes a series of rules (from 1.4.71) that assign `gati` status to various indeclinables and nouns under highly specific semantic conditions, mostly involving the verb `kṛ`.

### Used By
-   Semantic analysis engines that distinguish between literal and metaphorical/comparative meanings in compounds.

## References

-   **Ashtadhyayi of Panini**: Sutra 1.4.79
-   **Siddhanta Kaumudi**: Explains the `aupamye` condition with examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
