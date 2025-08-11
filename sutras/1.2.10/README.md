# Sutra 1.2.10: हलन्ताच्च

## Overview

**Sanskrit Text**: `हलन्ताच्च`  
**Transliteration**: halantācca  
**Translation**: And after (roots ending in) consonants

## Purpose

Sutra 1.2.10 extends the कित् designation rule from Sutra 1.2.9 to include consonant-ending roots. It specifies that सन् (desiderative) affixes are कित् after roots ending in consonants (हल्), just as they are after roots ending in इक् vowels.

This sutra is crucial for understanding how Sanskrit desiderative formations work and how the कित् designation affects subsequent grammatical operations like guṇa/vṛddhi.

## Implementation

### Function Signature
```javascript
function sutra1210(word, context = {}) {
    // Main implementation
}
```

### Key Features
- **Phonological Analysis**: Checks if roots end with हल् (consonants)
- **Affix Recognition**: Identifies सन् (desiderative) affixes in both Devanagari and IAST
- **Multi-script Support**: Full support for Devanagari and IAST scripts
- **Precedence Logic**: Integrates with other कित् designation sutras with proper precedence
- **Comprehensive Testing**: 44 test cases covering all scenarios
- **Debug Support**: Optional debug output for analysis tracing
- **Integration**: Seamlessly works with shared kit-designation utilities

### Dependencies
- **Sanskrit Utils**: 
  - `validateSanskritWord` - Input validation
  - `detectScript` - Script detection
  - `endsWithHal` - Consonant-ending detection
  - `isSanAffix` - सन् affix identification
  - `isKitBySutra1210` - Core rule implementation
  - `analyzeKitDesignation` - Comprehensive kit analysis
- **Shared Functions**: Integrates with kit-designation utility for consistency

## Usage Examples

### Basic Usage
```javascript
import { sutra1210 } from './index.js';

// Example 1: भज् root with सन् affix
const result1 = sutra1210('भजिषति', { 
  root: 'भज्', 
  affix: 'सि' 
});
console.log(result1);
// {
//   applicable: true,
//   explanation: "हलन्ताच्च - The सन् affix \"सि\" is कित् after हल्-ending root \"भज्\"",
//   details: { sutra: '1.2.10', type: 'कित्त्वातिदेश', ... }
// }

// Example 2: हन् root with सन् affix  
const result2 = sutra1210('जिघांसति', { 
  root: 'हन्', 
  affix: 'स' 
});
console.log(result2);
// {
//   applicable: true,
//   explanation: "हलन्ताच्च - The सन् affix \"स\" is कित् after हल्-ending root \"हन्\"",
//   ...
// }
```

### Advanced Usage
```javascript
// IAST script support
const iastResult = sutra1210('bhajiṣati', { 
  root: 'bhaj', 
  affix: 'si' 
});
console.log(iastResult.applicable); // true

// Debug mode for detailed analysis
const debugResult = sutra1210('गमिषति', { 
  root: 'गम्', 
  affix: 'सि',
  debug: true 
});
console.log(debugResult.debug);
// [
//   "[1.2.10] Detected script: Devanagari",
//   "[1.2.10] Analyzing root: \"गम्\", affix: \"सि\"",
//   "[1.2.10] Root ends with हल्: true",
//   "[1.2.10] Affix is सन्: true",
//   "[1.2.10] Sutra 1.2.10 applies: हल्-ending root + सन् affix → कित्"
// ]

// Non-applicable cases
const nonApplicable = sutra1210('कृषति', { 
  root: 'कृ', 
  affix: 'स' 
});
console.log(nonApplicable.applicable); // false (vowel-ending root)
```

### Helper Functions
```javascript
import { 
  checkSutra1210Applicability, 
  analyzeSutra1210 
} from './index.js';

// Quick applicability check
const applies = checkSutra1210Applicability('भज्', 'सि');
console.log(applies); // true

// Detailed analysis
const analysis = analyzeSutra1210('कृ', 'ति');
console.log(analysis);
// {
//   applies: false,
//   conditions: { 
//     rootEndsWithHal: false, 
//     affixIsSan: false 
//   },
//   reasoning: [
//     "Root \"कृ\" does not end with हल् (consonant)",
//     "Affix \"ति\" is not सन् (desiderative)",
//     "Sutra 1.2.10 does not apply"
//   ]
// }
```

## Technical Details

### Algorithm
1. **Input Validation**: Verify Sanskrit word validity
2. **Root-Affix Identification**: Extract or use provided root and affix
3. **Phonological Analysis**: Check if root ends with हल् consonants
4. **Affix Classification**: Verify if affix is सन् (desiderative)
5. **Rule Application**: Apply कित् designation if conditions are met
6. **Integration**: Consider precedence with related sutras

### Related Sutras
- **1.2.8**: Specific root + क्त्वा/सन् combinations (higher precedence)
- **1.2.9**: इक्-ending roots + सन् affixes (complementary)
- **1.2.14**: हन् + सिच् specific combination (higher precedence)
- **1.2.15**: यम् + सिच् with meaning constraint (higher precedence)

### Precedence Rules
Sutra 1.2.10 is a general rule that applies when more specific rules (1.2.8, 1.2.14, 1.2.15) don't apply. The implementation ensures proper precedence by checking specific rules first.

## Test Coverage

The implementation includes comprehensive test coverage:

- **Positive Cases**: 8 tests for various हल्-ending roots with सन् affixes
- **Negative Cases**: 5 tests for non-applicable scenarios
- **Edge Cases**: 7 tests for error handling and boundary conditions
- **Helper Functions**: 10 tests for utility functions
- **Integration**: 3 tests for kit-designation utility integration
- **Features**: 3 tests for debug and context features
- **Metadata**: 3 tests for exports and documentation
- **Comparisons**: 2 tests comparing with related sutras
- **Performance**: 3 tests for robustness and efficiency

**Total**: 44 test cases with 100% pass rate

## Performance

- **Efficient Processing**: Handles 100 calls in under 1 second
- **Memory Optimization**: Minimal memory footprint through shared utilities
- **Error Resilience**: Graceful handling of invalid inputs
- **Script Agnostic**: Consistent performance across Devanagari and IAST

## Integration Notes

- **Kit-Designation Utility**: Seamlessly integrates with shared kit analysis
- **Precedence Handling**: Properly implements rule precedence hierarchy
- **Multi-Script**: Consistent behavior across different scripts
- **Debugging**: Optional debug output for development and testing
- **Context Support**: Accepts additional context for enhanced analysis

This implementation follows the project's established patterns for accuracy, maintainability, and comprehensive documentation.
