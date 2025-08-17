# Sutra 1.4.18: यचि भम्

## Overview

**Sanskrit Text**: `यचि भम्`  
**Transliteration**: yaci bham  
**Translation**: When य (or vowel-initial सु-series affixes) follow, that which precedes is called भम्।

## Purpose

This sutra establishes the technical term भम् (bham) for stems that precede affixes beginning with य (ya-class) or vowel-initial affixes from the सु-series. This designation affects how the stem behaves in subsequent morphological operations and is essential for proper Sanskrit word formation.

## Implementation

### Function Signature
```javascript
function sutra1418(stem, context = {}) {
    // Returns object with भम् saṃjñā assignment
}
```

### Key Features
- Multi-script support (Devanagari and IAST) with independent script detection
- य-initial affix detection across scripts
- Vowel-initial सु-series affix recognition with proper contextual requirements
- Context-sensitive rule application (य-initial OR vowel-initial सु-series)
- Advanced script handling for mixed-script inputs
- Comprehensive error handling and input validation

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Independent script detection for stems and affixes
  - `validateSanskritWord` - Input validation
- **Shared Functions**: 
  - Internal `checkSuSeries` - Identifies सु-series affixes
  - Internal `checkYaInitial` - Detects य-initial affixes per script
  - Internal `checkVowelInitial` - Identifies vowel-initial affixes
  - Internal `isVowel` - Vowel classification utility

## Usage Examples

### Basic Usage
```javascript
import { sutra1418 } from './index.js';

// Example 1: य-initial affix
const result1 = sutra1418('राम', { affix: 'य' });
console.log(result1.saṃjñā); // 'भम्'
console.log(result1.applies); // true

// Example 2: यम् affix
const result2 = sutra1418('देव', { affix: 'यम्' });
console.log(result2.saṃjñā); // 'भम्'
```

### Advanced Usage
```javascript
// IAST script support
const result3 = sutra1418('rāma', { affix: 'ya' });
console.log(result3.saṃjñā); // 'भम्'
console.log(result3.script); // 'IAST'

// Mixed script handling (IAST stem + Devanagari affix)
const result4 = sutra1418('rāma', { affix: 'यम्' });
console.log(result4.applies); // true (properly detects Devanagari य in affix)

// Vowel-initial सु-series affix
const result5 = sutra1418('राम', { affix: 'अम्', isSuSeries: true });
console.log(result5.saṃjñā); // 'भम्'

// Non-सु-series vowel-initial (should not apply)
const result6 = sutra1418('राम', { affix: 'अ', isSuSeries: false });
console.log(result6.applies); // false

// Backward compatibility
import { applySutra } from './index.js';
const legacy = applySutra('राम', { affix: 'य' });
console.log(legacy.sanjna); // 'bham'
```

## Test Coverage

Comprehensive test suite covering:
- **Basic functionality**: भम् assignment for य-initial affixes
- **Multi-script support**: IAST stems and affixes with proper script detection
- **Vowel-initial conditions**: Proper handling of vowel-initial सु-series requirements
- **Mixed script inputs**: Independent script detection for stems vs affixes
- **Negative cases**: Non-य-initial consonants, non-सु-series vowel-initials
- **Error handling**: Invalid inputs, missing context
- **Complex cases**: Independent script handling, various affix combinations
- **Backward compatibility**: Legacy function interface

## Implementation Notes

This sutra demonstrates sophisticated script handling where the stem and affix can be in different scripts. The implementation performs independent script detection for each component, ensuring accurate rule application regardless of script mixing.

The rule logic implements the traditional interpretation: य-initial affixes always trigger भम्, while vowel-initial affixes only trigger भम् if they are also from the सु-series. This dual condition is properly handled through the logical OR structure with contextual requirements.

The script detection system allows for natural language mixing, where users might provide stems in IAST but affixes in Devanagari (or vice versa), reflecting real-world usage patterns in Sanskrit digital tools.
