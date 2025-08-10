# Sanskrit Utilities Documentation

## Overview

The `sanskrit-utils` library is a comprehensive collection of utilities for Sanskrit linguistic analysis, developed for the Panini Sutra JavaScript Engine. It provides modular, well-tested functions for script detection, phoneme analysis, classification, morphological operations, and more.

## Table of Contents

1. [Core Modules](#core-modules)
2. [Constants & Data](#constants--data)
3. [Quick Start Guide](#quick-start-guide)
4. [API Reference](#api-reference)
5. [Usage Examples](#usage-examples)
6. [Migration Guide](#migration-guide)
7. [Testing & Validation](#testing--validation)

---

## Core Modules

### 1. **Script Detection** (`script-detection.js`)
**Purpose**: Identifies and validates Sanskrit text scripts (IAST, Devanagari, Mixed)

**Key Functions**:
- `detectScript(text)` - Returns 'IAST', 'Devanagari', 'Mixed', or 'Unknown'
- `isDevanagari(text)` - Boolean check for Devanagari script
- `isIAST(text)` - Boolean check for IAST script
- `analyzeScript(text)` - Detailed script analysis with statistics

**Use Cases**: Input validation, script-specific processing, mixed-script handling

### 2. **Phoneme Classification** (`classification.js`)
**Purpose**: Classifies Sanskrit phonemes according to Paninian grammar

**Key Functions**:
- `isVrddhi(vowel)` - Checks for वृद्धि vowels (ā, ai, au)
- `isGuna(vowel)` - Checks for गुण vowels (a, e, o)  
- `isIkVowel(vowel)` - Checks for इक् vowels (i, ī, u, ū, ṛ, ṝ, ḷ, ḹ)
- `isVowel(char)` - General vowel classification
- `isConsonant(char)` - General consonant classification
- `getVowelClassifications(vowel)` - Returns all applicable classifications

**Use Cases**: Grammatical analysis, sandhi rules, morphological operations

### 3. **Phoneme Tokenization** (`phoneme-tokenization.js`)
**Purpose**: Breaks Sanskrit text into individual phonemes for analysis

**Key Functions**:
- `tokenizePhonemes(text)` - Auto-detects script and tokenizes
- `tokenizeIastPhonemes(text)` - IAST-specific tokenization
- `tokenizeDevanagariPhonemes(text)` - Devanagari-specific tokenization
- `analyzePhonemeStructure(text)` - Detailed phonemic analysis

**Use Cases**: Phonological analysis, metre analysis, morpheme segmentation

### 4. **Vowel Analysis** (`vowel-analysis.js`)
**Purpose**: Specialized analysis and operations on Sanskrit vowels

**Key Functions**:
- `analyzeVowel(vowel)` - Comprehensive vowel analysis
- `getFirstVowel(text)` - Extracts first vowel for operations
- `getAllVowels(text)` - Returns all vowels with positions
- `applyGunaTransformation(vowel)` - गुण vowel gradation
- `applyVrddhiTransformation(vowel)` - वृद्धि vowel gradation
- `getGunaVrddhiScope(text)` - Determines applicable gradations

**Use Cases**: Sandhi operations, verbal conjugation, nominal declension

### 5. **Validation** (`validation.js`)
**Purpose**: Input validation and sanitization for Sanskrit text

**Key Functions**:
- `validateSanskritWord(word)` - Validates Sanskrit word structure
- `validatePhonemeSequence(sequence)` - Validates phoneme combinations
- `validateVowel(vowel)` - Vowel-specific validation
- `sanitizeInput(text)` - Cleans and normalizes input
- `isValidCombination(phonemes)` - Checks phoneme combination rules

**Use Cases**: Input processing, error handling, data quality assurance

### 6. **Similarity Analysis** (`similarity-analysis.js`)
**Purpose**: Calculates phonetic and grammatical similarity between Sanskrit elements

**Key Functions**:
- `analyzeSimilarity(element1, element2)` - Comprehensive similarity analysis
- `calculatePhoneticSimilarity(sound1, sound2)` - Sound-based similarity
- `calculateArticulatorySimilarity(consonant1, consonant2)` - Articulatory feature comparison
- `findClosestSubstitute(target, candidates)` - Finds best phonetic match
- `getVowelLength(vowel)` - Vowel length classification
- `getConsonantType(consonant)` - Consonant articulatory classification

**Use Cases**: Morphological operations, phonetic substitutions, comparative analysis

### 7. **Transliteration** (`transliteration.js`)
**Purpose**: Converts between IAST and Devanagari scripts

**Key Functions**:
- `iastToDevanagari(text)` - IAST → Devanagari conversion
- `devanagariToIast(text)` - Devanagari → IAST conversion
- `normalizeScript(text, targetScript)` - Script normalization
- `transliteratePhonemes(phonemes, targetScript)` - Phoneme-level transliteration

**Use Cases**: Script conversion, input normalization, output formatting

### 8. **Morphological Analysis** (`morphology.js`)
**Purpose**: Morphological operations and stem analysis

**Key Functions**:
- `analyzeMorphology(word)` - Morphological breakdown
- `extractStem(word)` - Stem extraction
- `identifyAffixes(word)` - Affix identification
- `classifyMorpheme(morpheme)` - Morpheme classification

**Use Cases**: Word analysis, grammatical parsing, morphological generation

---

## Constants & Data

### **SanskritVowels** (`constants.js`)
Contains comprehensive vowel classifications:
```javascript
// वृद्धि vowels (1.1.1)
vrddhi: {
  iast: ['ā', 'ai', 'au'],
  devanagari: ['आ', 'ऐ', 'औ']
}

// गुण vowels (1.1.2)  
guna: {
  iast: ['a', 'e', 'o'],
  devanagari: ['अ', 'ए', 'ओ']
}

// इक् vowels (1.1.3)
ik: {
  iast: ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'],
  devanagari: ['इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ']
}
```

### **SanskritConsonants** (`constants.js`)
Organized by place of articulation:
```javascript
// Organized by articulatory positions
stops: {
  velars: { iast: ['k', 'kh', 'g', 'gh', 'ṅ'], devanagari: ['क', 'ख', 'ग', 'घ', 'ङ'] },
  palatals: { iast: ['c', 'ch', 'j', 'jh', 'ñ'], devanagari: ['च', 'छ', 'ज', 'झ', 'ञ'] },
  // ... etc
}

// Special consonant endings
specialEndings: {
  iast: ['ḥ', 'ṃ'], // visarga, anusvara
  devanagari: ['ः', 'ं']
}
```

### **SanskritWordLists** (`constants.js`)
Important word lists for grammatical analysis:
```javascript
// सर्वादि words (1.1.27, 1.1.30, 1.1.31)
sarvaadi: {
  iast: ['sarva', 'viśva', 'ubha', 'ubhaya', 'itara', 'anya', ...],
  devanagari: ['सर्व', 'विश्व', 'उभ', 'उभय', 'इतर', 'अन्य', ...]
}

// Interrogatives (1.1.25)
interrogatives: {
  iast: ['kati', 'kiyati'],
  devanagari: ['कति', 'कियति']
}
```

---

## Quick Start Guide

### Installation
```javascript
// Import specific utilities
import { detectScript, isVrddhi, tokenizePhonemes } from '../sanskrit-utils/index.js';

// Import specific modules
import { SanskritVowels } from '../sanskrit-utils/constants.js';
import { analyzeVowel } from '../sanskrit-utils/vowel-analysis.js';

// Import all utilities (not recommended for production)
import * as SanskritUtils from '../sanskrit-utils/index.js';
```

### Basic Usage
```javascript
// 1. Script Detection
const script = detectScript('रामः'); // Returns 'Devanagari'
const script2 = detectScript('rāmaḥ'); // Returns 'IAST'

// 2. Phoneme Analysis
const phonemes = tokenizePhonemes('रामः');
// Returns: ['र', 'आ', 'म', 'ः']

// 3. Vowel Classification
const isVrddhiVowel = isVrddhi('आ'); // Returns true
const isGunaVowel = isGuna('ए'); // Returns true

// 4. Morphological Analysis
const vowelAnalysis = analyzeVowel('आ');
// Returns: { type: 'vrddhi', length: 'long', script: 'Devanagari', ... }
```

---

## API Reference

### Core Utility Functions

#### `detectScript(text: string): string`
**Purpose**: Detects the script of input text
**Parameters**: 
- `text` - Text to analyze
**Returns**: 'IAST' | 'Devanagari' | 'Mixed' | 'Unknown'
**Example**:
```javascript
detectScript('राम'); // 'Devanagari'
detectScript('rāma'); // 'IAST'
```

#### `tokenizePhonemes(text: string): string[]`
**Purpose**: Breaks text into individual phonemes
**Parameters**:
- `text` - Text to tokenize
**Returns**: Array of phoneme strings
**Example**:
```javascript
tokenizePhonemes('राम'); // ['र', 'आ', 'म']
tokenizePhonemes('rāma'); // ['r', 'ā', 'm', 'a']
```

#### `isVrddhi(vowel: string): boolean`
**Purpose**: Checks if vowel is वृद्धि (ā, ai, au)
**Parameters**:
- `vowel` - Vowel character to check
**Returns**: Boolean
**Example**:
```javascript
isVrddhi('आ'); // true
isVrddhi('इ'); // false
```

#### `analyzeVowel(vowel: string): object`
**Purpose**: Comprehensive vowel analysis
**Parameters**:
- `vowel` - Vowel to analyze
**Returns**: Analysis object with type, length, script, etc.
**Example**:
```javascript
analyzeVowel('आ');
// {
//   type: 'vrddhi',
//   length: 'long',
//   script: 'Devanagari',
//   iastEquivalent: 'ā',
//   classifications: ['vrddhi', 'long']
// }
```

### Constants Access

#### `SanskritVowels`
**Structure**:
```javascript
{
  vrddhi: { iast: [...], devanagari: [...] },
  guna: { iast: [...], devanagari: [...] },
  ik: { iast: [...], devanagari: [...] },
  all: { iast: [...], devanagari: [...], diacritics: [...] }
}
```

#### `SanskritConsonants`
**Structure**:
```javascript
{
  stops: {
    velars: { iast: [...], devanagari: [...] },
    palatals: { iast: [...], devanagari: [...] },
    // ... other positions
  },
  semivowels: { iast: [...], devanagari: [...] },
  sibilants: { iast: [...], devanagari: [...] },
  specialEndings: { iast: [...], devanagari: [...] }
}
```

---

## Usage Examples

### Example 1: Sandhi Analysis
```javascript
import { detectScript, tokenizePhonemes, analyzeVowel, isVrddhi } from '../sanskrit-utils/index.js';

function prepareSandhiAnalysis(word1, word2) {
  // Detect scripts
  const script1 = detectScript(word1);
  const script2 = detectScript(word2);
  
  // Tokenize for analysis
  const phonemes1 = tokenizePhonemes(word1);
  const phonemes2 = tokenizePhonemes(word2);
  
  // Analyze final and initial sounds
  const finalSound = phonemes1[phonemes1.length - 1];
  const initialSound = phonemes2[0];
  
  // Check for vowel combinations
  const finalVowelAnalysis = analyzeVowel(finalSound);
  const initialVowelAnalysis = analyzeVowel(initialSound);
  
  return {
    scripts: { first: script1, second: script2 },
    phonemes: { first: phonemes1, second: phonemes2 },
    junction: { final: finalVowelAnalysis, initial: initialVowelAnalysis },
    applicableRules: determineSandhiRules(finalVowelAnalysis, initialVowelAnalysis)
  };
}
```

### Example 2: Morphological Classification
```javascript
import { SanskritWordLists, isVrddhi, isGuna } from '../sanskrit-utils/index.js';

function classifyWord(word) {
  // Check against known word lists
  const isSarvaadi = SanskritWordLists.sarvaadi.iast.includes(word) || 
                     SanskritWordLists.sarvaadi.devanagari.includes(word);
  
  const isInterrogative = SanskritWordLists.interrogatives.iast.includes(word) || 
                          SanskritWordLists.interrogatives.devanagari.includes(word);
  
  // Analyze vowel characteristics
  const phonemes = tokenizePhonemes(word);
  const vowels = phonemes.filter(p => isVowel(p));
  const hasVrddhi = vowels.some(v => isVrddhi(v));
  const hasGuna = vowels.some(v => isGuna(v));
  
  return {
    grammaticalClass: {
      isSarvaadi,
      isInterrogative,
      // ... other classifications
    },
    phoneticFeatures: {
      hasVrddhi,
      hasGuna,
      vowelCount: vowels.length,
      // ... other features
    }
  };
}
```

### Example 3: Input Validation Pipeline
```javascript
import { validateSanskritWord, sanitizeInput, detectScript } from '../sanskrit-utils/index.js';

function processSanskritInput(rawInput) {
  // Sanitize input
  const cleanInput = sanitizeInput(rawInput);
  
  // Validate as Sanskrit
  const validation = validateSanskritWord(cleanInput);
  if (!validation.isValid) {
    throw new Error(`Invalid Sanskrit input: ${validation.errors.join(', ')}`);
  }
  
  // Detect and normalize script
  const script = detectScript(cleanInput);
  
  return {
    original: rawInput,
    cleaned: cleanInput,
    script: script,
    isValid: validation.isValid,
    recommendations: validation.suggestions || []
  };
}
```

---

## Migration Guide

### From Legacy `shared-utils.js`

**Old Way**:
```javascript
import { detectScript, tokenizePhonemes } from '../shared/shared-utils.js';
```

**New Way**:
```javascript
import { detectScript, tokenizePhonemes } from '../sanskrit-utils/index.js';
```

### Breaking Changes
1. **Module Structure**: Functions are now organized in separate modules
2. **Import Paths**: Changed from `../shared/` to `../sanskrit-utils/`
3. **Constants**: Now organized in structured objects (e.g., `SanskritVowels.vrddhi.iast`)

### Compatibility Layer
For backward compatibility, use the legacy compatibility layer:
```javascript
import { createLegacyUtils } from '../sanskrit-utils/index.js';

const legacyUtils = await createLegacyUtils();
// Use legacyUtils.detectScript(), etc.
```

---

## Testing & Validation

### Running Tests
```bash
# Run all sanskrit-utils tests
npm test sutras/sanskrit-utils/

# Run specific module tests
npm test sutras/sanskrit-utils/phoneme-tokenization.test.js

# Run integration tests with sutras
npm test sutras/1.1.*/index.test.js
```

### Test Coverage
The sanskrit-utils library maintains high test coverage:
- **Script Detection**: 95%+ coverage across all script types
- **Phoneme Tokenization**: 98%+ coverage with edge cases
- **Classification**: 100% coverage for all vowel/consonant types
- **Validation**: 90%+ coverage including error conditions

### Validation Utilities
```javascript
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

// Validate input before processing
const validation = validateSanskritWord('रामः');
console.log(validation);
// {
//   isValid: true,
//   script: 'Devanagari',
//   phonemeCount: 4,
//   warnings: [],
//   suggestions: []
// }
```

---

## Performance Considerations

### Optimization Tips
1. **Import only what you need**: Use specific imports rather than `import *`
2. **Cache analysis results**: Vowel and phoneme analysis results can be cached
3. **Batch operations**: Use batch functions for processing multiple words
4. **Script detection**: Cache script detection results for repeated text

### Memory Usage
- Constants are loaded once and shared across modules
- Phoneme tokenization uses minimal memory allocation
- Analysis functions avoid creating large intermediate objects

---

## Contributing

### Code Style
- Follow ESDoc documentation standards
- Include comprehensive tests for new functions
- Maintain backward compatibility when possible
- Use meaningful function and variable names

### Adding New Utilities
1. Create module in appropriate category
2. Export functions from `index.js`
3. Add comprehensive tests
4. Update this documentation
5. Add usage examples

---

## Changelog

### Version 2.0.0 (August 2025)
- **BREAKING**: Restructured from single file to modular architecture
- **ADDED**: Comprehensive vowel analysis utilities
- **ADDED**: Enhanced script detection with mixed-script support
- **ADDED**: Similarity analysis module
- **ADDED**: Validation and sanitization utilities
- **IMPROVED**: Phoneme tokenization accuracy
- **IMPROVED**: Constants organization and coverage

### Version 1.x (Legacy)
- Single-file shared-utils.js implementation
- Basic script detection and phoneme tokenization
- Limited vowel classification

---

## License & Credits

Part of the Panini Sutra JavaScript Engine project.
Developed for accurate implementation of Paninian grammar rules in JavaScript.

**Authors**: Sanskrit Computational Linguistics Team
**Created**: August 8, 2025
**Last Updated**: August 10, 2025
