# Sutra 1.3.93: लुटि च कॢपः (luṭi ca kḷpaḥ)

## Sanskrit Text
**लुटि च कॢपः**

## Transliteration
**luṭi ca kḷpaḥ**

## English Translation
"And for the root कॢप् (kḷp) [when combined] with लुट् (luṭ - 1st Future), [Parasmaipada is optionally used]."

## Overview
This sutra extends the scope of Parasmaipada designation to the root कॢप् (kḷp - "to be fit/suitable") under specific grammatical conditions. The rule applies when:

1. The root कॢप् (kḷp) is used
2. Combined with लुट् (luṭ - 1st Future tense), OR
3. Combined with स्य (sya - Future/Conditional affix), OR  
4. Combined with सन् (san - Desiderative affix)

The Parasmaipada designation is **optional** in these contexts, meaning both Parasmaipada and Ātmanepada forms may be acceptable.

## Function Contract

### `sutra1393(word, context = {})`

**Parameters:**
- `word` (string): The Sanskrit word to analyze (in Devanagari or IAST)
- `context` (object): Grammatical context containing:
  - `root` (string): The root form (कॢप्/कल्प्/क्लृप् or kḷp/kalp/klp)
  - `lakara` (string): The lakāra (लुट्/luṭ)
  - `affixes` (array): Array of affixes (["sya"], ["san"])
  - `affix` (string): Single affix identifier ("future", "conditional", "desiderative")

**Returns:**
- `applies` (boolean): Whether the sutra applies
- `isParasmaipada` (boolean): Whether Parasmaipada is designated
- `isOptional` (boolean): Whether the designation is optional (always true when applies)
- `reason` (string): Explanation for the result
- `sutra` (string): "1.3.93"
- `confidence` (number): Confidence score (0-1)
- `details` (object): Detailed analysis including script detection, conditions, etc.

## Examples

### Positive Cases (Rule Applies)

**Devanagari:**
```javascript
sutra1393('कल्पिता', { lakara: 'luṭ', root: 'कॢप्' })
// → { applies: true, isParasmaipada: true, isOptional: true, ... }

sutra1393('कल्प्स्यति', { root: 'कॢप्', affixes: ['sya'] })
// → { applies: true, isParasmaipada: true, isOptional: true, ... }

sutra1393('चिक्लिप्सति', { root: 'कॢप्', affixes: ['san'] })
// → { applies: true, isParasmaipada: true, isOptional: true, ... }
```

**IAST:**
```javascript
sutra1393('kalpsyati', { root: 'kḷp', affixes: ['sya'] })
// → { applies: true, isParasmaipada: true, isOptional: true, ... }

sutra1393('ciklipsati', { root: 'kḷp', affixes: ['san'] })
// → { applies: true, isParasmaipada: true, isOptional: true, ... }
```

### Negative Cases (Rule Does Not Apply)

```javascript
sutra1393('गच्छति', { root: 'गम्', lakara: 'luṭ' })
// → { applies: false, reason: 'Root is not कॢप्/kḷp', ... }

sutra1393('कल्पते', { root: 'कॢप्', lakara: 'laṭ' })
// → { applies: false, reason: 'Neither लुट् nor स्य/सन् affix found', ... }

sutra1393('कल्पयति', { root: 'कॢप्', affixes: ['ṇic'] })
// → { applies: false, reason: 'Neither लुट् nor स्य/सन् affix found', ... }
```

## Edge Cases

1. **Alternative Root Spellings**: Recognizes कॢप्, कल्प्, क्लृप् (Devanagari) and kḷp, kalp, klp (IAST)
2. **Multiple Affixes**: Works with affixes arrays: `['sya', 'ti']`
3. **Context Variations**: Accepts lakāra spellings like 'luṭ', 'lut', 'loot'
4. **Surface Detection**: Attempts root detection from word surface when context is missing
5. **Multi-Script Support**: Handles both Devanagari and IAST input consistently

## Dependencies

### Internal Dependencies
- None (standalone sutra)

### Sanskrit Utils
- `detectScript` - Multi-script detection and handling
- `validateSanskritWord` - Input validation for Sanskrit words

## Technical Implementation

The function implements a multi-layered validation approach:

1. **Input Validation**: Type checking and Sanskrit word validation
2. **Root Detection**: Multiple spelling recognition with context fallback
3. **Condition Analysis**: 
   - लुट् (luṭ) lakāra detection
   - स्य (sya) affix pattern matching
   - सन् (san) affix pattern matching
4. **Multi-Script Processing**: Consistent handling of Devanagari and IAST
5. **Confidence Scoring**: Based on detection certainty and context quality

## Historical Context

This sutra belongs to the series of rules (1.3.78-1.3.93) that specify Parasmaipada designation for particular roots under specific conditions. It represents a special case where the general Ātmanepada preference is overridden for semantic or morphological reasons.

The optionality (विकल्प) reflects the linguistic reality that both Parasmaipada and Ātmanepada forms of कॢप् were acceptable in classical usage, particularly in future and desiderative formations.

## Overview

**Sanskrit Text**: `लुटि च कॢपः`
**Transliteration**: `luṭi ca kḷpaḥ`
**Translation**: After the verb क्लिप् 'to be fit', परस्मैपद is optionally used, when लुट् (1st Future) is affixed, as well as when स्य and सन् are affixed.

## Purpose

This sutra is a `vidhi` rule that specifies an optional application of `parasmaipadam` to the verb root `kḷp` under certain conditions.

## Implementation

### Function Signature
```javascript
function applySutra1_3_93(verb, context) {
    // Implementation details
}
```

### Key Features
- Detects the verb root `kḷp`.
- Checks for the presence of the `luṭ` lakāra (1st Future tense).
- Also handles conditions where `sya` or `san` affixes are present.
- Optionally applies `parasmaipadam`.

### Dependencies
- **Sanskrit Utils**: None identified yet.
- **Shared Functions**: None identified yet.

## Usage Examples

### Basic Usage
```javascript
import { applySutra1_3_93 } from './index.js';

// Example 1: Verb 'kḷp' with 'luṭ'
const result1 = applySutra1_3_93('kalpitā', { lakara: 'luṭ', root: 'kḷp' });
console.log(result1); // Expected: { applies: true, optional: true, operations: ['add parasmaipadam'] }

// Example 2: Verb 'kḷp' with 'sya'
const result2 = applySutra1_3_93('kalpsyati', { root: 'kḷp', affixes: ['sya'] });
console.log(result2); // Expected: { applies: true, optional: true, operations: ['add parasmaipadam'] }
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: Tests will cover:
- Positive cases where `kḷp` is used with `luṭ`, `sya`, and `san`.
- Negative cases with other verbs or different lakāras.
- Edge cases, such as conjugated forms.

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.93

# Run with coverage
npm test sutras/1.3.93 --coverage
```

## Technical Details

### Algorithm
1. Check if the input verb's root is `kḷp`.
2. Check if the context includes `luṭ` lakāra, or the affixes `sya` or `san`.
3. If both conditions are met, the sutra applies optionally.

### Performance
- **Time Complexity**: O(1)
- **Space Complexity**: O(1)
- **Optimization Notes**: The implementation should be a direct check of properties.

### Edge Cases
- The optionality (`vā`) means both `parasmaipadam` and `ātmanepadam` forms can be correct.

## Integration

### Related Sutras
- This sutra provides an option to the default `ātmanepadam` for `kḷp`.

### Used By
- Higher-level modules responsible for verb conjugation.

## References

- **Panini's Ashtadhyayi**: Sutra 1.3.93
- **Implementation Notes**: Based on the standard interpretation of the sutra.
- **Test References**: Test cases will be derived from standard grammatical examples.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
