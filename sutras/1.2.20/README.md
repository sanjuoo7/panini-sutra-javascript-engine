# Sutra 1.2.20: ऋत इद्धातोः

## Sanskrit Text
**ऋत इद्धातोः**

## Transliteration
**ṛta iddhātoḥ**

## Translation
The सेट् निष्ठा affixes do not receive कित् designation after roots ending in ऋ vowel.

## Classification
- **Type**: अतिदेश (atidesá) - Exception rule
- **Category**: कित्त्वनिषेध (kittva-niṣedha) - Prevention of कित् designation
- **Scope**: Affects morphological behavior of सेट् निष्ठा affixes

## Linguistic Significance

This sutra establishes a crucial exception to the general कित् designation rules by preventing सेट् निष्ठा (past participle with iṭ augment) affixes from receiving कित् designation when they follow verbal roots ending in the vowel ऋ (ṛ).

### Key Features:
1. **Root Condition**: Applies only to roots ending in ऋ/ṛ vowel
2. **Affix Condition**: Affects only सेट् निष्ठा affixes (निष्ठा with इट् augment)
3. **Exception Nature**: Prevents कित् designation (negative rule)
4. **Phonological Basis**: Related to vowel-consonant interaction patterns

## Technical Implementation

### Root Analysis
- Identifies roots ending with ऋ/ṛ vowel
- Covers common roots like कृ/kṛ (to do), भृ/bhṛ (to bear), पृ/pṛ (to fill)
- Includes both short ऋ and long ॄ variants

### Affix Analysis  
- Detects सेट् निष्ठा affixes (past participles with इट् augment)
- Recognizes patterns like इत/ita, इक्त/ikta, etc.
- Validates presence of इट् augment through context or form analysis

### Morphological Integration
- Prevents कित् designation when both conditions are met
- Maintains consistency with related sutras (1.2.19, 1.2.21)
- Supports multi-script analysis (Devanagari and IAST)

## Examples

### Positive Cases (Rule Applies)
| Root | Affix | Result | Meaning | Kit Status |
|------|-------|--------|---------|------------|
| कृ | इत | कृत | done, made | NOT कित् |
| भृ | इत | भृत | borne, carried | NOT कित् |
| पृ | इत | पूर्त | filled | NOT कित् |
| तृ | इत | तीर्ण | crossed | NOT कित् |
| dṛ | ita | dīrṇa | torn | NOT कित् |

### Negative Cases (Rule Does Not Apply)
| Root | Affix | Result | Reason |
|------|-------|--------|--------|
| गम् | इत | गत | Root doesn't end with ऋ |
| कृ | त | कृत | Not सेट् निष्ठा (no इट्) |
| भ्रम् | इत | भ्रान्त | Root doesn't end with ऋ |

## Dependencies

### Sutra Prerequisites
- **1.1.26**: क्तक्तवतू निष्ठा (Definition of निष्ठा)
- **General कित् rules**: Base understanding of कित् designation

### Related Sutras
- **1.2.19**: निष्ठा शीङ्स्विदिमिदिक्ष्विदिधृषः (Specific root exceptions)
- **1.2.21**: अन्येभ्योऽपि दृश्यते (Further निष्ठा exceptions)

### Utility Dependencies
- `detectScript`: Multi-script support
- `validateSanskritWord`: Input validation
- `hasNishtha`: निष्ठा affix identification

## Usage

```javascript
import { sutra1220 } from './sutras/1.2.20/index.js';

// Basic usage with context
const result1 = sutra1220('कृत', { 
  root: 'कृ', 
  affix: 'इत' 
});
console.log(result1.preventsKit); // true

// Word analysis without explicit context
const result2 = sutra1220('भृत');
console.log(result2.applicable); // true

// IAST script support
const result3 = sutra1220('kṛta', {
  root: 'kṛ',
  affix: 'ita'
});
console.log(result3.preventsKit); // true

// Debug mode
const result4 = sutra1220('पूर्त', { debug: true });
console.log(result4.debug); // Detailed analysis steps
```

### Utility Functions

```javascript
import {
  endsWithRVowel,
  isSutra1220Root,
  hasSetAugment,
  isSetNishtha,
  preventsKitBySutra1220
} from './sutras/1.2.20/index.js';

// Check if root ends with ऋ vowel
console.log(endsWithRVowel('कृ')); // true
console.log(endsWithRVowel('गम्')); // false

// Check if root is covered by this sutra
console.log(isSutra1220Root('भृ')); // true

// Check affix properties
console.log(hasSetAugment('इत')); // true
console.log(isSetNishtha('इत')); // true

// Combined check
console.log(preventsKitBySutra1220('कृ', 'इत')); // true
```

## Algorithm Description

1. **Input Validation**: Verify Sanskrit word validity
2. **Context Analysis**: Extract root and affix from context if provided
3. **Root Verification**: Check if root ends with ऋ vowel
4. **Affix Verification**: Confirm affix is सेट् निष्ठा
5. **Word Analysis**: If no context, attempt pattern recognition
6. **Rule Application**: Apply prevention logic when conditions met
7. **Result Generation**: Return comprehensive analysis object

## Error Handling

- **Invalid Input**: Returns structured error for non-Sanskrit input
- **Missing Context**: Attempts word-level pattern analysis
- **Processing Errors**: Graceful degradation with explanation
- **Script Detection**: Automatic handling of mixed scripts

## Testing

Comprehensive test suite covers:
- ✅ Root identification (ऋ-ending roots)
- ✅ Affix analysis (सेट् निष्ठा detection)  
- ✅ Rule application (positive and negative cases)
- ✅ Word recognition (example forms)
- ✅ Cross-script consistency (Devanagari ↔ IAST)
- ✅ Error handling (edge cases)
- ✅ Integration testing (with related functions)
- ✅ Debug functionality

## Performance Notes

- **Root Database**: Optimized lookup for common ऋ-ending roots
- **Pattern Matching**: Efficient regex-free form recognition
- **Caching**: Static data structures for fast access
- **Memory**: Minimal allocation during analysis

## Future Enhancements

1. **Extended Root Coverage**: Additional ऋ-ending roots from classical texts
2. **Sandhi Integration**: Interaction with phonetic change rules
3. **Semantic Context**: Meaning-based validation for ambiguous cases
4. **Performance Optimization**: Further algorithmic improvements
