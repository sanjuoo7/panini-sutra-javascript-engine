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
- `tokenizePhonemes(text, options = {})` - Auto-detects script and tokenizes
- `tokenizeIastPhonemes(text)` - IAST-specific tokenization
- `tokenizeDevanagariPhonemes(text, options = {})` - Devanagari-specific tokenization with accuracy modes
- `analyzePhonemeStructure(text)` - Detailed phonemic analysis

**New Features**:
- **Accurate Mode**: Use `{ accurate: true }` for phonetically correct Devanagari tokenization
- **Inherent Vowel Handling**: Properly handles inherent 'अ' vowels in Devanagari
- **Backward Compatibility**: Default mode preserves existing behavior

**Use Cases**: Phonological analysis, metre analysis, morpheme segmentation, grammatical rule application

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

### 8. **Conjunct Analysis** (`conjunct-analysis.js`)
**Purpose**: Comprehensive analysis of Sanskrit conjunct consonants (saṃyoga)

**Key Functions**:
- `hasConjunct(consonantSequence)` - Detects presence of conjunct patterns
- `findConjuncts(text)` - Finds all conjunct patterns with positions
- `isConjunctPattern(pattern, script)` - Validates specific conjunct patterns
- `analyzeConjunctUsage(text)` - Provides detailed conjunct statistics
- `getConjunctPatterns(script)` - Returns conjunct pattern database
- `validateConjunctPattern(pattern, script)` - Validates conjunct format

**Pattern Database**: 150+ conjunct patterns for both Devanagari and IAST scripts

**Use Cases**: Phonological analysis, morphological operations, grammatical rule application (especially sutras 1.2.5)

### 9. **Verb Analysis** (`verb-analysis.js`)
**Purpose**: Analysis of Sanskrit verbal affixes and forms

**Key Functions**:
- `isLitAffix(affix)` - Identifies perfect tense (liṭ) affixes
- `isSarvadhatuka(affix)` - Identifies primary verbal (sārvādhātuka) affixes
- `isPitAffix(affix)` - Identifies pit-designated affixes
- `analyzeAffix(affix)` - Comprehensive affix analysis
- `getAffixesByType(type, script)` - Returns affix sets by classification
- `validateAffix(affix)` - Validates affix format and recognition
- `findVerbalAffixes(text)` - Finds verbal affixes in text

**Affix Databases**: Complete sets of liṭ, sārvādhātuka, and pit affixes for both scripts

**Use Cases**: Verbal morphology, tense identification, grammatical analysis (sutras 1.2.4, 1.2.5, 1.2.6)

### 10. **Root Analysis** (`root-analysis.js`)
**Purpose**: Analysis of Sanskrit verbal roots (dhātu) with variant recognition

**Key Functions**:
- `isVijRoot(root)`, `isUrnaRoot(root)`, `isIndhiRoot(root)`, `isBhuRoot(root)` - Specific root identification
- `isIndhiBhavatiRoot(root)` - Combined identification for sutras 1.2.6
- `getRootVariants(root)` - Returns all variants of a root
- `normalizeRoot(root)` - Normalizes variants to base form
- `analyzeRoot(root)` - Comprehensive root analysis with metadata
- `hasItAugment(root)` - Detects iṭ-augment patterns
- `findSpecificRoots(text)` - Finds specific roots in text
- `validateRoot(root)` - Validates root format and recognition

**Root Database**: Specific roots (विज्, ऊर्ण, इन्धि, भू) with variants, meanings, and sutra references

**Use Cases**: Root identification, morphological analysis, grammatical rule application (sutras 1.2.2, 1.2.3, 1.2.6)

### 11. **Kit Designation** (`kit-designation.js`)
**Purpose**: Analysis and determination of कित् (kit) designation for Sanskrit affixes according to Pāṇinian rules

**Key Functions**:
- `analyzeKitDesignation(root, affix, context)` - Comprehensive कित् analysis with sutra application
- `isSutra128Root(root)` - Checks if root is in Sutra 1.2.8 enumeration (रुद्, विद्, मुष्, etc.)
- `isKitBySutra128(root, affix)` - Determines कित् by Sutra 1.2.8 (specific root-affix combinations)
- `isKitBySutra129(root, affix)` - Determines कित् by Sutra 1.2.9 (इक्-ending roots + सन्)
- `isKitBySutra1210(root, affix)` - Determines कित् by Sutra 1.2.10 (हल्-ending roots + सन्)
- `isKitBySutra1214(root, affix)` - Determines कित् by Sutra 1.2.14 (हन् root with सिच्)
- `isKitBySutra1215(root, affix, meaning)` - Determines कित् by Sutra 1.2.15 (यम् root with सिच्)
- `isSthaRoot(root)` - Identifies स्था (sthā) root and variants for Sutra 1.2.17
- `isGhuClassRoot(root)` - Identifies घु class roots (हु, दा, धा, etc.) for Sutra 1.2.17
- `isKtvAffix(affix)` - Identifies क्त्वा affix including augmented forms (इक्त्वा, iktvā)
- `hasSetAugment(affix, context)` - Detects सेट् (iṭ) augment in affixes for Sutra 1.2.18
- `isKtvaOrSanAffix(affix)` - Identifies क्त्वा and सन् affixes
- `isSanAffix(affix)` - Identifies सन् (desiderative) affixes specifically
- `isSicAffix(affix)` - Identifies सिच् affix
- `isLingAffix(affix)` - Identifies लिङ् affix
- `isHanRoot(root)`, `isYamRoot(root)`, `isGamRoot(root)` - Specific root identification
- `endsWithIka(root)` - Checks if root ends with इक् vowels (i, u, ṛ, ḷ)
- `endsWithHal(root)` - Checks if root ends with हल् consonants
- `beginsWithJhal(affix)` - Checks if affix begins with झल् consonants

**Root Database**: Comprehensive collection of roots for sutras 1.2.8-1.2.15 with variants and morphological patterns

**Constants**: 
- `KIT_DESIGNATION_ROOTS` - Categorized roots by sutra
- `KIT_ROOT_VARIANTS` - Root variants and alternative forms
- `KIT_AFFIXES` - Affix patterns and classifications

**Supported Sutras**: 1.2.8, 1.2.9, 1.2.10, 1.2.14, 1.2.15, 1.2.16, 1.2.17, 1.2.18 with proper precedence handling

**Use Cases**: कित् designation analysis, morphological rule application, accent determination, desiderative formations

### 12. **Kit Analysis** (`kit-analysis.js`) 🆕
**Purpose**: Advanced analysis functions for कित् (kit) designation and अतिदेश (exception) rules, specifically for sutras 1.2.19-1.2.21

**Key Functions**:
- `hasSetAugment(affix, context)` - Detects सेट् (iṭ) augment in affixes across multiple scripts
- `isKtvAffix(affix)` - Identifies क्त्वा affixes including augmented forms (इक्त्वा, iktvā) 
- `isGhuClassRoot(root)` - Identifies घु class roots (हु, दा, धा, etc.) for morphological analysis
- `isSthaRoot(root)` - Identifies स्था (sthā) root and variants including दीर्घस्था

**Advanced Pattern Matching**:
- Multi-script support (IAST and Devanagari)
- Morphological variant detection
- Context-dependent analysis for complex grammatical environments

**Supported Analysis**:
- सेट् augment detection in निष्ठा affixes
- Exception handling for कित् designation prevention (अतिदेश rules)
- Root classification for specific grammatical contexts
- Pattern matching for complex morphological forms

**Use Cases**: Exception rule application (sutras 1.2.19-1.2.21), advanced कित् analysis, morphological classification, augment detection

### 13. **Accent Analysis** (`accent-analysis.js`) 🆕
**Purpose**: Comprehensive Vedic accent analysis and classification according to Pāṇinian principles (Sutras 1.2.29-1.2.31)

**Key Functions**:
- `analyzeVowelAccent(vowel, options)` - Complete vowel accent analysis with script detection
- `extractAccentMarks(vowel, script)` - Extracts accent marks from vowels
- `determineAccentType(accentMarks, script, strict)` - Classifies accent type (udātta, anudātta, svarita)
- `isUdattaMark(mark, script)` - Identifies udātta (high tone/acute) marks
- `isAnudattaMark(mark, script)` - Identifies anudātta (low tone/grave) marks  
- `isSvaritaMark(mark, script)` - Identifies svarita (combined tone/circumflex) marks
- `isUdatta(vowel, options)` - Boolean check for udātta vowels
- `isAnudatta(vowel, options)` - Boolean check for anudātta vowels
- `isSvarita(vowel, options)` - Boolean check for svarita vowels
- `applyUdatta(vowel)` - Adds udātta accent to vowel
- `applyAnudatta(vowel)` - Adds anudātta accent to vowel
- `applySvarita(vowel)` - Adds svarita accent to vowel
- `getAccentVariants(vowel)` - Returns all accent variants of a vowel

**Accent Constants**:
- `ACCENT_TYPES` - Standard accent classifications (udātta, anudātta, svarita)
- `ACCENT_MARKERS` - Script-specific accent mark mappings for IAST and Devanagari

**Advanced Features**:
- **Unicode Normalization**: Handles both precomposed (â) and decomposed (a + ̂) accent characters
- **Multi-script Support**: Works with both IAST and Devanagari accent notation
- **Context Analysis**: Supports phonetic context analysis for accent determination
- **Strict/Lenient Modes**: Configurable strict mode for explicit marking requirements
- **Integration Ready**: Designed for sutras 1.2.29 (udātta), 1.2.30 (anudātta), 1.2.31 (svarita)

**Linguistic Foundation**: Based on traditional Vedic accent system where:
- **उदात्त (Udātta)**: High tone, marked with acute accent (á) in IAST
- **अनुदात्त (Anudātta)**: Low tone, marked with grave accent (à) in IAST  
- **स्वरित (Svarita)**: Combined/circumflex tone, marked with circumflex (â) in IAST

**Use Cases**: Vedic accent classification, tone analysis, accent-sensitive grammatical rules, prosodic analysis

**Created For**: Three-sutra accent classification trilogy (1.2.29-1.2.31) implementing complete Vedic accent terminology

### 14. **Accent Prosody Analysis** (`accent-prosody-analysis.js`) 🆕
**Purpose**: Higher-level prosodic interpretation built on accent analysis – svarita internal segmentation (1.2.32), ekashruti monotone rule (1.2.33), ritual monotone with exceptions (1.2.34), vaṣaṭ raised option (1.2.35), and chandas optional monotone (1.2.36).

**Key Functions**:
- `decomposeSvarita(vowel, options)` - Returns temporal/pitch segments for svarita vowel (udātta-initial + anudātta-fall)
- `classifyEkashruti(text, context)` - Boolean classification for distant vocative monotone condition
- `applyEkashruti(text, context, options)` - Applies monotone override, optionally flattening accent marks
- `aggregateProsodyOptions(text, context, options)` - Aggregates layered prosodic possibilities (accented, monotone-forced, monotone, raised) evaluating sutras 1.2.32–1.2.36.

**Features**:
- Fixed half-unit udātta onset per 1.2.32
- Duration unit inference (hrasva/dirgha) with extensible mapping
- Distance threshold & semantic context support
- Unicode-safe accent stripping
- Context layering & precedence (Pattern F extension): ritual forcing > lexical raise > chandas optional > distance vocative optional
- Exception gating (japa, Oṃ variants, sāma) prevents ritual forcing per 1.2.34
- Option de-duplication via stable map keying (form+mode)

**Use Cases**: Prosody-aware chanting tools, pitch contour modeling, sacrificial recitation planners, metrical recitation simulators.

**Created For**: Sutras 1.2.32–1.2.36 (prosodic refinement, contextual override & optionalization)

**Example**:
```js
aggregateProsodyOptions('vaṣaṭ', { ritual: true });
// {
//  options: [
//    { form: 'vaṣaṭ', mode: 'accented', sources:['base'] },
//    { form: 'vaṣaṭ', mode: 'monotone-forced', sources:['1.2.34-ritual-default'] },
//    { form: 'vaṣaṭ́', mode: 'raised', sources:['1.2.35'] }
//  ],
//  primaryDecision: 'options',
//  appliedSutras: ['1.2.34','1.2.35','1.2.33?'],
//  reasoning: [...]
// }
```

### 14b. **Accent Domain Rules** (`accent-domain-rules.js`) 🆕
**Purpose**: Domain & assimilation layer (1.2.37–1.2.39) extending aggregate prosody decisions.

**Key Functions**:
- `integrateDomainProsody(aggregateResult, context)` – Applies:
  - 1.2.37 subrahmaṇyā: blocks monotone, svarita→udātta (adds `udaatta-replaced` mode)
  - 1.2.38 lexical overrides (deva, brāhmaṇa) → `lexical-anudatta`
  - 1.2.39 local svarita→anudātta run assimilation → `local-monotone` option

**Modes Added**: `udaatta-replaced`, `lexical-anudatta`, `local-monotone`.
**Reason Tags**: `1.2.37-svarita-to-udaatta`, `1.2.37-block-monotone`, `1.2.38-lexical-anudatta`, `1.2.39-local-monotone-span`.

**Precedence Extension**:
Domain prohibitions > lexical overrides > local assimilation > earlier global/context options (ritual/chandas/distance, etc.).

**Example**:
```js
const agg = aggregateProsodyOptions('âàà', {});
// options include local-monotone variant from 1.2.39 if run detected
```


### 15. **Pada Analysis** (`pada-analysis.js`) 🆕
**Purpose**: Voice classification for Sanskrit verbal affixes (Ātmanepada and Parasmaipada)

**Key Functions**:
- `isAtmanepadaAffix(affix, tense)` - Identifies Ātmanepada (middle voice) endings
- `isParasmaipadaAffix(affix, tense)` - Identifies Parasmaipada (active voice) endings  
- `getAffixPada(affix, tense)` - Determines pada classification with tense details
- `getAffixesByPada(pada, tense, script)` - Returns affix sets by voice and tense
- `validatePadaAnalysis(affix, expectedPada)` - Validates pada classification

**Affix Databases**: Comprehensive voice-classified endings for all tense systems (laṭ, liṭ, loṭ, liṅ, luṅ, lṛṭ, lṛṅ)

**Use Cases**: Voice identification, morphological analysis, Ātmanepada-specific rules (sutra 1.2.11)

**Created For**: Sutra 1.2.11 implementation - extends कित् designation to voice-specific contexts
- `findPadaAffixes(text)` - Finds and classifies all pada affixes in text

**Affix Database**: 
- `ATMANEPADA_AFFIXES` - Complete आत्मनेपद affix inventory by tense (present, perfect, imperative, potential, aorist)
- `PARASMAIPADA_AFFIXES` - Complete परस्मैपद affix inventory by tense

**Tense Support**: लट् (present), लिट् (perfect), लोट् (imperative), लिङ् (potential), लुङ् (aorist), and more

**Features**:
- Multi-script support (Devanagari and IAST)
- Tense-specific classification
- Person and number analysis
- Comprehensive validation with suggestions
- Integration with morphological analysis

**Use Cases**: Voice determination, morphological analysis, grammatical rule application (sutras involving आत्मनेपद/परस्मैपद distinctions like 1.2.11)

### 16. **Transliteration** (`transliteration.js`)
**Purpose**: Converts between IAST and Devanagari scripts

**Key Functions**:
- `iastToDevanagari(text)` - IAST → Devanagari conversion
- `devanagariToIast(text)` - Devanagari → IAST conversion
- `normalizeScript(text, targetScript)` - Script normalization
- `transliteratePhonemes(phonemes, targetScript)` - Phoneme-level transliteration

**Use Cases**: Script conversion, input normalization, output formatting

### 17. **Morphological Analysis** (`morphology.js`)
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

## Recent Refactoring (December 2024)

**Major Utility Extraction Completed**: Successfully extracted shared patterns from sutras 1.1.67-1.2.6 into comprehensive utility modules:

### Newly Added Modules (December 2024)

#### conjunct-analysis.js
- **Purpose**: Comprehensive analysis of Sanskrit conjunct consonants (saṃyoga)
- **Functions**: `hasConjunct()`, `findConjuncts()`, `isConjunctPattern()`, `analyzeConjunctUsage()`
- **Data**: 150+ conjunct patterns for both Devanagari and IAST scripts
- **Used by**: Sutras 1.2.5 and other rules dealing with consonant clusters
- **Test Coverage**: 30 comprehensive test cases

#### verb-analysis.js  
- **Purpose**: Analysis of Sanskrit verbal affixes and forms
- **Functions**: `isLitAffix()`, `isSarvadhatuka()`, `isPitAffix()`, `analyzeAffix()`
- **Data**: Complete affix databases (liṭ, sārvādhātuka, pit affixes)
- **Used by**: Sutras 1.2.4, 1.2.5 and other verbal morphology rules
- **Test Coverage**: 39 comprehensive test cases

#### root-analysis.js
- **Purpose**: Analysis of Sanskrit verbal roots with variant recognition  
- **Functions**: `isVijRoot()`, `isUrnaRoot()`, `isIndhiRoot()`, `isBhuRoot()`, `analyzeRoot()`
- **Data**: Specific root databases with variants and meanings for sutras 1.2.2, 1.2.3, 1.2.6
- **Used by**: Sutras 1.2.2 (विज्), 1.2.3 (ऊर्ण), 1.2.6 (इन्धि/भू)
- **Test Coverage**: 47 comprehensive test cases

### Refactored Sutras

The following sutras have been successfully refactored to use shared utilities:

- **Sutra 1.2.2**: Now uses `isVijRoot()` from root-analysis utility
- **Sutra 1.2.3**: Now uses `isUrnaRoot()` from root-analysis utility  
- **Sutra 1.2.4**: Now uses `isSarvadhatuka()` and `isPitAffix()` from verb-analysis utility
- **Sutra 1.2.5**: Now uses `hasConjunct()` and `isLitAffix()` from conjunct-analysis and verb-analysis utilities
- **Sutra 1.2.6**: Now uses `isIndhiRoot()`, `isBhuRoot()` from root-analysis utility

All refactored sutras maintain backward compatibility through re-exports and function aliases.

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

#### `tokenizePhonemes(text: string, options?: object): object`
**Purpose**: Breaks text into individual phonemes with script detection
**Parameters**:
- `text` - Text to tokenize
- `options` - Optional configuration object
  - `accurate` - Boolean, enables phonetically accurate Devanagari tokenization (default: false)
**Returns**: Object with phonemes array, script, count, and metadata
**Example**:
```javascript
// Legacy mode (default)
tokenizePhonemes('राम'); // { phonemes: ['र', 'ा', 'म'], script: 'Devanagari', ... }
tokenizePhonemes('rāma'); // { phonemes: ['r', 'ā', 'm', 'a'], script: 'IAST', ... }

// Accurate mode (phonetically correct for Devanagari)
tokenizePhonemes('राम', { accurate: true }); // { phonemes: ['र', 'ा', 'म', 'अ'], script: 'Devanagari', ... }
```

#### `tokenizeDevanagariPhonemes(text: string, options?: object): string[]`
**Purpose**: Devanagari-specific phoneme tokenization
**Parameters**:
- `text` - Devanagari text to tokenize
- `options` - Optional configuration object
  - `accurate` - Boolean, enables phonetically accurate tokenization (default: false)
**Returns**: Array of phoneme strings
**Example**:
```javascript
// Legacy mode (character-based)
tokenizeDevanagariPhonemes('मन'); // ['म', 'न']

// Accurate mode (with inherent vowels)
tokenizeDevanagariPhonemes('मन', { accurate: true }); // ['म', 'अ', 'न', 'अ']
tokenizeDevanagariPhonemes('राम्', { accurate: true }); // ['र', 'ा', 'म', '्']
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

### Example 4: Kit Designation Analysis
```javascript
import { analyzeKitDesignation, isSutra128Root, isKtvaOrSanAffix } from '../sanskrit-utils/index.js';

function analyzeVerbMorphology(root, affix, context = {}) {
  // Comprehensive kit designation analysis
  const kitAnalysis = analyzeKitDesignation(root, affix, {
    ...context,
    debug: true  // Enable detailed analysis
  });
  
  // Check specific sutra applications
  const isSutra128Applicable = isSutra128Root(root) && isKtvaOrSanAffix(affix);
  
  // Determine morphological effects
  const morphologicalEffects = {
    accentPreservation: kitAnalysis.isKit,
    preventGuna: kitAnalysis.isKit && hasGunaContext(root, affix),
    sandhiRules: determineSandhiRules(root, affix, kitAnalysis.isKit)
  };
  
  return {
    kitDesignation: kitAnalysis,
    sutraApplication: {
      '1.2.8': isSutra128Applicable,
      applicable: kitAnalysis.applicableSutras || []
    },
    morphologicalImpact: morphologicalEffects,
    linguisticAnalysis: {
      rootType: classifyRoot(root),
      affixType: classifyAffix(affix),
      combination: `${root} + ${affix}`,
      explanation: kitAnalysis.explanation
    }
  };
}

// Helper function for guṇa context analysis
function hasGunaContext(root, affix) {
  const rootFinalVowel = getLastVowel(root);
  return isIkVowel(rootFinalVowel) && requiresGuna(affix);
}

// Usage example
const morphAnalysis = analyzeVerbMorphology('रुद्', 'क्त्वा', {
  meaning: 'having wept',
  tense: 'absolutive'
});

console.log(morphAnalysis.kitDesignation.isKit);        // true (by Sutra 1.2.8)
console.log(morphAnalysis.morphologicalImpact.accentPreservation); // true
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
