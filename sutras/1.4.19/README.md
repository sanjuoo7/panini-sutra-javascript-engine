# Sutra 1.4.19: तसौ मत्वर्थे

## Overview

**Sanskrit Text**: `तसौ मत्वर्थे`  
**Transliteration**: tasau matvarthe  
**Translation**: Words ending in त् or स्, when having the meaning of मत्व (possession/attribution), are called भम्।

## Purpose

This sutra establishes the technical term भम् (bham) for words ending in त् (ta) or स् (sa) when they carry the meaning of possession or attribution (मत्व meaning). This designation is crucial for understanding how possessive and attributive constructions behave in Sanskrit morphology, particularly with suffixes like मतुप्.

## Implementation

### Function Signature
```javascript
function sutra1419(word, context = {}) {
    // Returns object with भम् saṃjñā assignment for मत्व contexts
}
```

### Key Features
- Multi-script support (Devanagari and IAST) for both words and meanings
- त्/स्-ending detection across scripts
- मत्व meaning recognition with cross-script equivalents
- Context-sensitive affix and meaning analysis
- Comprehensive possessive meaning detection
- Robust input validation and error handling

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection for multi-script support
  - `validateSanskritWord` - Input validation
- **Shared Functions**: 
  - Internal `checkMatvarthaMeaning` - Identifies मत्व-type meanings
  - Internal `convertToIAST` - Script conversion for comparison
  - Internal MATUPARTHA_AFFIXES - Known possession-indicating affixes

## Usage Examples

### Basic Usage
```javascript
import { sutra1419 } from './index.js';

// Example 1: त्-ending word with मत्व meaning
const result1 = sutra1419('जगत्', { meaning: 'मत्व', affix: 'औ' });
console.log(result1.saṃjñā); // 'भम्'
console.log(result1.applies); // true

// Example 2: स्-ending word with मत्व meaning
const result2 = sutra1419('मनस्', { meaning: 'मत्व', affix: 'औ' });
console.log(result2.saṃjñā); // 'भम्'
```

### Advanced Usage
```javascript
// IAST script support
const result3 = sutra1419('jagat', { meaning: 'matva', affix: 'au' });
console.log(result3.saṃjñā); // 'भम्'
console.log(result3.script); // 'IAST'

// स्-ending in IAST
const result4 = sutra1419('manas', { meaning: 'matva', affix: 'au' });
console.log(result4.applies); // true

// Various possessive meanings
const result5 = sutra1419('जगत्', { meaning: 'possessive', affix: 'औ' });
console.log(result5.applies); // true

const result6 = sutra1419('जगत्', { meaning: 'having', affix: 'औ' });
console.log(result6.applies); // true

// Without मत्व meaning (should not apply)
const result7 = sutra1419('जगत्', { affix: 'औ' });
console.log(result7.applies); // false

// Different meaning (should not apply)
const result8 = sutra1419('जगत्', { meaning: 'कर्तृ', affix: 'औ' });
console.log(result8.applies); // false

// Backward compatibility
import { applySutra } from './index.js';
const legacy = applySutra('जगत्', { meaning: 'मत्व', affix: 'औ' });
console.log(legacy.sanjna); // 'bham'
```

## Test Coverage

Comprehensive test suite covering:
- **Basic functionality**: भम् assignment for त्/स्-ending words with मत्व meaning
- **Multi-script support**: IAST words and meanings with proper detection
- **Meaning requirements**: Various forms of possessive/attributive meanings
- **Ending detection**: Both त् and स् endings across scripts
- **Negative cases**: Wrong endings, missing meanings, different meanings
- **Error handling**: Invalid inputs, undefined context
- **Context metadata**: Proper rule and confidence reporting

## Implementation Notes

This sutra demonstrates the importance of semantic context in Sanskrit grammar, where morphological rules depend not just on phonetic form but also on meaning. The implementation recognizes multiple expressions of the मत्व (possessive/attributive) meaning across scripts:

- Sanskrit: 'मत्व', 'मतुप्'
- IAST: 'matva', 'matup'  
- English: 'possessive', 'attributive', 'having', 'with'

The rule applies specifically to words ending in त् or स् (including their IAST equivalents 't' and 's'), making it particularly relevant for neuter nouns and certain masculine/feminine forms that take possessive suffixes.

The implementation maintains scholarly accuracy by requiring both morphological (त्/स्-ending) and semantic (मत्व meaning) conditions to be satisfied, reflecting the traditional grammatical understanding of this sutra.
