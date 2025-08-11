# Sutra 1.1.74: त्यदादीनि वृद्धम्

## Overview

**Sanskrit Text**: `त्यदादीनि वृद्धम्`
**Transliteration**: tyadādīni vṛddham
**Translation**: The words त्यद् etc. are called वृद्धम्।

## Purpose

This `saṃjñā` (definition) sutra extends the classification of `vṛddham` (वृद्धम्) beyond the phonetic criteria established by Sutra 1.1.73. While 1.1.73 defines `vṛddham` based on the presence of vṛddhi vowels (ā, ai, au) as the first vowel, this sutra introduces a lexical extension that applies to specific pronominal words beginning with `tyad` (त्यद्).

This rule demonstrates that Sanskrit grammatical categories can be defined through both phonetic patterns and lexical lists. The words in the `tyadādi` (त्यदादि) group receive the `vṛddham` designation regardless of their phonetic structure, representing a grammatical classification that supersedes purely phonological criteria.

## Technical Details

### Sutra Type
- **Type**: `saṃjñā` (definition/naming rule)
- **Target**: Specific pronominal words in the त्यदादि group
- **Operation**: Lexical classification as वृद्धम्
- **Scope**: Traditional forms of त्यद् and related archaic/dialectal pronouns

### Algorithm

1. **Input Validation**: Verify the input is a valid Sanskrit word
2. **Lexical Lookup**: Check if the word appears in the traditional त्यदादि list
3. **Script Detection**: Handle both IAST and Devanagari representations
4. **Classification**: Return boolean result for वृद्धम् status

### Implementation Features

- **Lexical Classification**: Based on traditional word lists rather than phonetic analysis
- **Multi-Script Support**: Handles both IAST and Devanagari scripts seamlessly  
- **Inflected Forms**: Includes various case forms of त्यद्-based pronouns
- **Archaic Forms**: Covers dialectal and archaic variants from traditional commentaries
- **Comprehensive Analysis**: Provides detailed linguistic analysis with confidence scores

## Usage Examples

### Basic Usage
```javascript
import { isTyadAdi, isVrddhamByTyadAdi } from './index.js';

// IAST examples
console.log(isTyadAdi('tyad')); // true (primary form)
console.log(isTyadAdi('tyat')); // true (variant)
console.log(isTyadAdi('tyena')); // true (instrumental form)

// Devanagari examples  
console.log(isTyadAdi('त्यद्')); // true (primary form)
console.log(isTyadAdi('त्यत्')); // true (variant)
console.log(isTyadAdi('त्येन')); // true (instrumental form)

// वृद्धम् classification
console.log(isVrddhamByTyadAdi('tyad')); // true
console.log(isVrddhamByTyadAdi('त्यद्')); // true

// Non-त्यदादि words
console.log(isTyadAdi('tad')); // false (regular तद्, not त्यद्)
console.log(isTyadAdi('deva')); // false (regular noun)
```

### Advanced Analysis
```javascript
import { analyzeTyadAdiVrddham, getAllTyadAdiWords } from './index.js';

// Detailed analysis
const analysis = analyzeTyadAdiVrddham('tyad');
console.log(analysis);
// {
//   word: 'tyad',
//   script: 'IAST',
//   isVrddhamByTyadAdi: true,
//   category: 'tyad-adi-pronoun',
//   confidence: 1.0,
//   reasoning: ['Word found in traditional त्यदादि list'],
//   linguisticNotes: [
//     'Classified as वृद्धम् lexically, not phonetically',
//     'Traditional pronominal form with वृद्धम् designation'
//   ],
//   sutraReference: '1.1.74'
// }

// Get all त्यदादि words
const allWords = getAllTyadAdiWords();
console.log(allWords.iast); // ['tyad', 'tyat', 'tyena', ...]
console.log(allWords.devanagari); // ['त्यद्', 'त्यत्', 'त्येन', ...]
```

## Related Sutras

### Dependencies
- **None**: This is an independent lexical rule

### Complements
- **Sutra 1.1.73 (वृद्धिर्यस्याचामादिस्तद् वृद्धम्)**: Provides phonetic definition of वृद्धम्; this sutra extends it lexically
- **Sutra 1.1.27 (सर्वादीनि सर्वनामानि)**: Defines general pronoun classification; त्यदादि words are related to pronominal categories

### Usage Context
- Used in grammatical analysis where lexical वृद्धम् classification is required
- Important for distinguishing त्यद्-based forms from regular तद्-based pronouns
- Essential for traditional Sanskrit text analysis involving archaic pronominal forms

## Traditional Context

The त्यदादि words represent archaic or dialectal forms that appear in Vedic and classical Sanskrit literature. Traditional commentaries recognize these forms as requiring special grammatical treatment, hence their explicit inclusion in the वृद्धम् category despite potentially lacking the phonetic वृद्धि characteristics defined in Sutra 1.1.73.

This sutra exemplifies how Paninian grammar accommodates both systematic phonetic rules and specific lexical exceptions, ensuring comprehensive coverage of Sanskrit linguistic phenomena.

## Integration

### Related Sutras
- This `saṃjñā` (definition) sutra works in conjunction with Sutra 1.1.73 to provide complete वृद्धम् classification
- Forms part of the broader system of grammatical categories that affect declension and morphological operations

### Used By
- Any module performing वृद्धम् classification or analysis
- Systems analyzing archaic or Vedic Sanskrit texts
- Morphological analyzers dealing with pronominal forms

---

*Generated from template: SUTRA_README_TEMPLATE.md*
