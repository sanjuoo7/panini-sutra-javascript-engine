# Sutra 1.2.29: उच्चैरुदात्तः

## Overview

**Sanskrit Text**: `उच्चैरुदात्तः`  
**Transliteration**: uccairudāttaḥ  
**Translation**: "The vowel that is perceived as having a high tone is called उदात्त or acutely accented"

## Purpose

This संज्ञा (definitional) sutra establishes the technical term **उदात्त** (udātta) for vowels pronounced with high tone in Vedic Sanskrit. It forms the foundation of the Vedic accent system by defining the first of three fundamental accent types.

The sutra establishes the principle: **उच्चैः** (uccaiḥ - "in a high manner") → **उदात्त** (udātta - "elevated/raised designation").

## Implementation

### Function Signature
```javascript
function sutra1229(vowel, context = {})
```

### Key Features
- **Explicit Accent Detection**: Recognizes vowels with udātta accent marks (́)
- **Multi-script Support**: Works with both IAST and Devanagari scripts
- **Phonetic Context Analysis**: Can detect high tone from contextual information
- **Comprehensive Analysis**: Provides detailed accent classification with confidence levels
- **Traditional Examples**: Includes examples from Vedic literature

### Dependencies
- **Sanskrit Utils**: `detectScript`, `isVowel`, `analyzeVowelAccent`, `ACCENT_TYPES`
- **Accent Analysis**: Complete accent analysis framework from `accent-analysis.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1229, isUdatta, applyUdattaDesignation } from './index.js';

// Check if vowel has udātta accent
const result1 = sutra1229('á');
console.log(result1.applies); // true
console.log(result1.designation); // 'उदात्त'

// Various udātta vowels
const result2 = sutra1229('ī́');
console.log(result2.applies); // true

// Unmarked vowel (not udātta)
const result3 = sutra1229('a');
console.log(result3.applies); // false

// Anudātta vowel (explicitly not udātta)
const result4 = sutra1229('à');
console.log(result4.applies); // false
```

### Convenience Functions
```javascript
// Simple boolean check
console.log(isUdatta('á')); // true
console.log(isUdatta('a')); // false

// Apply udātta accent to vowel
console.log(applyUdattaDesignation('a')); // 'á'
console.log(applyUdattaDesignation('i')); // 'í'
```

### Advanced Usage with Context
```javascript
// Phonetic context analysis
const context = {
  phoneticContext: 'Root with udātta accent on final vowel',
  detectHighTone: true
};
const result = sutra1229('a', context);
console.log(result.applies); // true (detected from context)

// Strict accent marking mode
const strict = sutra1229('a', { strictAccentMarking: true });
console.log(strict.applies); // false (requires explicit marks)

// Different script specification
const devanagari = sutra1229('á', { script: 'Devanagari' });
console.log(devanagari.script); // 'Devanagari'
```

### Comprehensive Analysis
```javascript
import { analyzeUdattaDesignation } from './index.js';

const analysis = analyzeUdattaDesignation('á');
console.log(analysis.sutraReference); 
// {
//   number: '1.2.29',
//   sanskrit: 'उच्चैरुदात्तः',
//   transliteration: 'uccairudāttaḥ',
//   translation: 'The vowel that is perceived as having a high tone...',
//   type: 'संज्ञा (definitional)'
// }
```

## Technical Details

### Accent Detection Methods
1. **Explicit Marking** (confidence: 1.0): Direct udātta accent mark (́)
2. **Phonetic Context** (confidence: 0.8): High tone indicators in context
3. **Default Classification** (confidence: 0.9): Based on Paninian principles

### Supported Vowels
- **Simple vowels**: a, i, u, e, o, ā, ī, ū
- **Diphthongs**: ai, au  
- **Liquids**: ṛ, ṝ, ḷ, ḹ
- **All with udātta marks**: á, í, ú, é, ó, ā́, ī́, ū́, aí, aú, ṛ́, ṝ́, ḷ́

### Script Support
- **IAST**: Uses acute accent mark (́) for udātta
- **Devanagari**: Uses udātta mark (॑) for udātta

## Traditional Context

### Vedic Accent System
Udātta is the first of three fundamental accents in Vedic Sanskrit:
1. **उदात्त** (udātta) - High tone (acute accent)
2. **अनुदात्त** (anudātta) - Low tone (grave accent) 
3. **स्वरित** (svarita) - Circumflex tone (combination accent)

### Historical Usage
In Vedic recitation, udātta vowels are pronounced with raised pitch, distinguishing them from the lower anudātta and the circumflex svarita. This accent system was crucial for:
- Proper ritual recitation
- Semantic differentiation
- Metrical patterns
- Grammatical analysis

### Examples from Literature
- **अग्ने́** (agne) - "O Agni" (vocative with udātta)
- **देव́** (deva) - "god" (with udātta marking)
- **सोम़** (soma) - "soma plant" (ritual plant with udātta)

## Related Sutras

- **1.2.30**: नीचैरनुदात्तः - Defines anudātta (low tone)
- **1.2.31**: समाहारः स्वरितः - Defines svarita (circumflex tone)
- **1.2.28**: अचश्च - Extends duration rules to vowels

## Testing

The implementation includes comprehensive tests covering:
- All vowel types with and without udātta marks
- Input validation and error handling
- Context-based analysis
- Multi-script support
- Performance and consistency
- Traditional examples and edge cases

```bash
# Run tests for this sutra
npm test sutras/1.2.29

# Run with coverage
npm run test:coverage -- sutras/1.2.29
```
