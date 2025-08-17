# Sutra 1.4.17: स्वादिष्वसर्वनामस्थाने

## Overview

**Sanskrit Text**: `स्वादिष्वसर्वनामस्थाने`  
**Transliteration**: svādiṣvasarvanāmasthāne  
**Translation**: When affixes beginning with सु (and ending with कप्) follow, not being सर्वनामस्थान, that which precedes is called पद।

## Purpose

This sutra establishes the technical term पद (pada) for stems that precede affixes from the सु-series when those affixes are not designated as सर्वनामस्थान. This is a crucial rule for understanding when word-forms receive the पद designation, which affects subsequent morphological processes.

## Implementation

### Function Signature
```javascript
function sutra1417(stem, context = {}) {
    // Returns object with पद saṃjñā assignment
}
```

### Key Features
- Multi-script support (Devanagari and IAST)
- सु-series affix recognition with comprehensive IAST conversion
- Context-sensitive सर्वनामस्थान detection
- Robust input validation and error handling
- Backward compatibility with legacy `applySutra` interface

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection for multi-script support
  - `validateSanskritWord` - Input validation
- **Shared Functions**: 
  - Internal `checkSuSeries` - Identifies सु-series affixes
  - Internal `checkSarvanamasthaana` - Determines सर्वनामस्थान status
  - Internal `convertToIAST` - Script conversion for matching

## Usage Examples

### Basic Usage
```javascript
import { sutra1417 } from './index.js';

// Example 1: सु affix (not सर्वनामस्थान)
const result1 = sutra1417('राम', { affix: 'सु' });
console.log(result1.saṃjñā); // 'पद'
console.log(result1.applies); // true

// Example 2: औ affix
const result2 = sutra1417('देव', { affix: 'औ' });
console.log(result2.saṃjñā); // 'पद'
```

### Advanced Usage
```javascript
// IAST script support
const result3 = sutra1417('rāma', { affix: 'bhis' });
console.log(result3.saṃjñā); // 'पद'
console.log(result3.script); // 'IAST'

// Context with explicit सर्वनामस्थान
const result4 = sutra1417('सर्व', { affix: 'स्य', isSarvanamasthaana: true });
console.log(result4.applies); // false (सर्वनामस्थान exclusion)

// Backward compatibility
import { applySutra } from './index.js';
const legacy = applySutra('राम', { affix: 'सु' });
console.log(legacy.sanjna); // 'pada'
```

## Test Coverage

Comprehensive test suite covering:
- **Basic functionality**: पद assignment for common सु-series affixes
- **Multi-script support**: IAST stems and affixes
- **सर्वनामस्थान exclusion**: Proper handling of pronominal contexts
- **Negative cases**: Non-सु-series affixes
- **Error handling**: Invalid inputs, missing context
- **Backward compatibility**: Legacy function interface
- **Edge cases**: Mixed script inputs, various affix forms

## Implementation Notes

This sutra is foundational for Sanskrit morphological analysis. The implementation carefully distinguishes between affixes that are inherently सर्वनामस्थान versus those that are normally सु-series but can optionally be सर्वनामस्थान in specific grammatical contexts.

The script conversion system handles proper ordering of replacements to ensure accurate IAST-Devanagari matching, with longest matches processed first to avoid partial replacement conflicts.
