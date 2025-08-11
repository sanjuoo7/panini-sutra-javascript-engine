# Sutra 1.2.21: अन्येभ्योऽपि दृश्यते

## Sanskrit Text
**अन्येभ्योऽपि दृश्यते**

## Transliteration
**anyebhyo'pi dṛśyate**

## Translation
The सेट् निष्ठा affixes do not receive कित् designation after other roots as well (as observed in usage).

## Classification
- **Type**: अतिदेश (atidesá) - Exception rule
- **Category**: कित्त्वनिषेध (kittva-niṣedha) - Prevention of कित् designation
- **Scope**: विस्तार (vistāra) - Extension of sutras 1.2.19-1.2.20
- **Basis**: दृश्यते (dṛśyate) - Observed in actual usage

## Linguistic Significance

This sutra serves as an extension and catch-all provision for the specific exceptions established in sutras 1.2.19 and 1.2.20. The key phrase "दृश्यते" (is observed) indicates that this rule is based on empirical observation of actual usage patterns in classical Sanskrit literature, rather than purely theoretical grammatical principles.

### Key Features:
1. **Observational Basis**: Based on patterns found in classical texts
2. **Extensional Nature**: Covers cases beyond sutras 1.2.19-1.2.20
3. **Context Dependency**: Application depends on textual and semantic context
4. **Phonetic Patterns**: Often involves roots with specific consonant clusters
5. **Flexibility**: Allows for exceptions not covered by rigid rules

## Technical Implementation

### Pattern Recognition
- Identifies roots with consonant cluster properties (क्ष्, ज्, ह्, ण्, म्)
- Recognizes exceptional forms found in classical literature
- Considers contextual factors (textual source, usage type, semantic meaning)

### Contextual Analysis
- **Textual Source**: Classical vs. modern usage patterns
- **Usage Type**: Traditional vs. contemporary application
- **Semantic Context**: Passive, perfective, or resultative meanings

### Integration with Related Sutras
- Works alongside sutras 1.2.19 (specific root exceptions) and 1.2.20 (ऋ-ending roots)
- Provides coverage for edge cases and observed variants
- Maintains consistency with established grammatical patterns

## Examples

### Positive Cases (Rule Applies)
| Root | Affix | Result | Meaning | Context | Kit Status |
|------|-------|--------|---------|---------|------------|
| युज् | इत | युक्त | joined | Classical usage | NOT कित् |
| भुज् | इत | भुक्त | enjoyed | Traditional | NOT कित् |
| त्वक्ष् | इत | त्वष्ट | carved | Observed pattern | NOT कित् |
| रक्ष् | इत | रक्षित | protected | Classical context | NOT कित् |
| दुह् | इत | दुग्ध | milked | Literature | NOT कित् |

### Negative Cases (Rule Does Not Apply)
| Root | Affix | Result | Reason |
|------|-------|--------|--------|
| गम् | इत | गत | Ordinary root, no exceptional pattern |
| कृ | इत | कृत | Covered by Sutra 1.2.20 (ऋ-ending) |
| शीङ् | इत | शयित | Covered by Sutra 1.2.19 (specific roots) |
| युज् | त | युक्त | Not सेट् निष्ठा (no इट्) |

### Context-Dependent Cases
| Root | Affix | Classical | Modern | Explanation |
|------|-------|-----------|--------|-------------|
| रक्ष् | इत | रक्षित (no कित्) | रक्षित (may have कित्) | Classical usage shows exception |
| भुज् | इत | भुक्त (no कित्) | भुक्त (varies) | Traditional patterns vary |

## Dependencies

### Sutra Prerequisites
- **1.1.26**: क्तक्तवतू निष्ठा (Definition of निष्ठा)
- **1.2.19**: निष्ठा शीङ्स्विदिमिदिक्ष्विदिधृषः (Specific root exceptions)
- **1.2.20**: ऋत इद्धातोः (ऋ-ending root exceptions)

### Related Sutras
- Works in conjunction with previous कित् designation sutras
- Complements the systematic approach of 1.2.19-1.2.20
- Provides flexibility for empirical observations

### Utility Dependencies
- `detectScript`: Multi-script support
- `validateSanskritWord`: Input validation
- `hasNishtha`: निष्ठा affix identification

## Usage

```javascript
import { sutra1221 } from './sutras/1.2.21/index.js';

// Basic usage with context
const result1 = sutra1221('युक्त', { 
  root: 'युज्', 
  affix: 'इत' 
});
console.log(result1.preventsKit); // true

// Context-dependent analysis
const result2 = sutra1221('रक्षित', {
  root: 'रक्ष्',
  affix: 'इत',
  textualSource: 'classical',
  usage: 'traditional'
});
console.log(result2.applicable); // true

// Semantic context
const result3 = sutra1221('भुक्त', {
  root: 'भुज्',
  affix: 'इत',
  meaning: 'passive voice construction'
});
console.log(result3.preventsKit); // true

// Debug mode with context
const result4 = sutra1221('युक्त', { 
  root: 'युज्', 
  affix: 'इत',
  debug: true,
  textualSource: 'classical'
});
console.log(result4.debug); // Detailed analysis with context info
```

### Utility Functions

```javascript
import {
  isSutra1221Root,
  hasConsonantClusterProperty,
  showsExceptionalBehavior,
  preventsKitBySutra1221
} from './sutras/1.2.21/index.js';

// Check if root is exceptional for this sutra
console.log(isSutra1221Root('युज्')); // true
console.log(isSutra1221Root('गम्')); // false

// Check phonetic properties
console.log(hasConsonantClusterProperty('रक्ष्')); // true (क्ष् cluster)
console.log(hasConsonantClusterProperty('युज्')); // true (ज् ending)

// Context-dependent behavior check
console.log(showsExceptionalBehavior('रक्ष्', 'इत', {
  textualSource: 'classical'
})); // true

console.log(showsExceptionalBehavior('रक्ष्', 'इत', {})); // false (no context)

// Combined prevention check
console.log(preventsKitBySutra1221('युज्', 'इत')); // true
```

## Algorithm Description

1. **Input Validation**: Verify Sanskrit word validity
2. **Context Extraction**: Parse root, affix, and contextual information
3. **Root Classification**: Check if root is known exceptional or has relevant phonetic properties
4. **Affix Verification**: Confirm affix is सेट् निष्ठा
5. **Contextual Analysis**: Evaluate textual source, usage type, and semantic context
6. **Exceptional Behavior Assessment**: Determine if combination shows observed exceptional patterns
7. **Rule Application**: Apply prevention logic based on empirical patterns
8. **Result Generation**: Return comprehensive analysis with observational context

## Contextual Factors

### Textual Source Context
- **Classical**: Traditional Sanskrit texts (Vedas, Puranas, Kavya)
- **Modern**: Contemporary Sanskrit usage
- **Scholarly**: Academic and grammatical texts

### Usage Context
- **Traditional**: Established patterns in religious/literary contexts
- **Contemporary**: Modern Sanskrit applications
- **Regional**: Geographical variations in usage

### Semantic Context
- **Passive Voice**: Focus on action recipient
- **Perfective Aspect**: Completed action emphasis
- **Resultative**: State resulting from action

## Error Handling

- **Invalid Input**: Structured error for non-Sanskrit input
- **Missing Context**: Graceful degradation without context
- **Ambiguous Cases**: Clear indication of uncertainty
- **Processing Errors**: Detailed error reporting with context

## Testing

Comprehensive test suite covers:
- ✅ Root identification (exceptional roots and phonetic properties)
- ✅ Contextual behavior analysis (textual source, usage, semantics)
- ✅ Rule application (positive and negative cases)
- ✅ Integration with related sutras (distinction from 1.2.19-1.2.20)
- ✅ Cross-script consistency (Devanagari ↔ IAST)
- ✅ Error handling (edge cases and invalid input)
- ✅ Debug functionality (contextual information tracking)

## Observational Nature

This sutra's unique character lies in its empirical basis:

### Classical Validation
- Forms attested in Vedic and classical literature
- Usage patterns in major Sanskrit works
- Scholarly commentary and grammatical discussions

### Pattern Recognition
- Phonetic cluster effects on कित् designation
- Semantic context influence on morphological behavior
- Regional and temporal usage variations

### Flexibility
- Accommodates exceptions not covered by rigid rules
- Allows for linguistic evolution and usage patterns
- Provides framework for analyzing new forms

## Future Enhancements

1. **Corpus Integration**: Analysis of larger Sanskrit text corpora
2. **Machine Learning**: Pattern recognition from classical texts
3. **Regional Variants**: Inclusion of geographical usage patterns
4. **Temporal Analysis**: Historical evolution of usage patterns
5. **Semantic Modeling**: Advanced semantic context analysis
