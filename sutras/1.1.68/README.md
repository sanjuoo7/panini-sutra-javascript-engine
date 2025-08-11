# Sutra 1.1.68: स्वं रूपं शब्दस्याशब्दसंज्ञा

## Sanskrit Text
```
स्वं रूपं शब्दस्याशब्दसंज्ञा
```

## Transliteration (IAST)
```
svaṃ rūpaṃ śabdasyāśabdasaṃjñā
```

## English Translation
"The own form of a word [is called its] designation-without-meaning."

## Detailed Explanation

This fundamental sutra establishes the crucial distinction between:
- **स्वरूप (sva-rūpa)**: The form of a word itself when used metalinguistically
- **शब्दसंज्ञा (śabdasaṃjñā)**: The word when used with its normal semantic meaning
- **अशब्दसंज्ञा (aśabdasaṃjñā)**: The word when used as a mere designation without its semantic content

### Core Principle
When a word is mentioned in grammatical discussion or technical analysis, it refers to its own form (sva-rūpa) rather than its meaning. This is the fundamental principle of metalinguistic reference in Sanskrit grammar.

### Examples
1. **Metalinguistic Usage (अशब्दसंज्ञा)**:
   - "अकार" - refers to the letter 'अ' itself, not any meaning
   - "गो इति शब्दे" - the word "गो" (not the cow it represents)
   - In grammatical rules like "अच्" - refers to the pratyāhāra itself

2. **Semantic Usage (शब्दसंज्ञा)**:
   - "गो गच्छति" - "The cow goes" (गो refers to the animal)
   - "राम आगतः" - "Rama has come" (राम refers to the person)

## Dependencies

This sutra is foundational and referenced by numerous other sutras, particularly:
- **1.1.69**: अणुदित् सवर्णस्य चाप्रत्ययः (follows from this principle)
- **1.1.70**: तपरस्तत्कालस्य (temporal interpretation principle)
- **1.3.1-3**: Various संज्ञा (designation) rules
- Most pratyāhāra and technical term definitions

## Usage

```javascript
import { 
  isSvaRupaUsage, 
  analyzeWordUsage, 
  getWordInterpretation 
} from './index.js';

// Check if word is used metalinguistically
const isMetalinguistic = isSvaRupaUsage('अ', { 
  isGrammaticalDiscussion: true 
});

// Analyze usage context
const analysis = analyzeWordUsage('गो', { 
  quotedTerm: true 
});

// Get interpretation type
const interpretation = getWordInterpretation('राम', {
  inVyakaranaShastra: true
});
```

## Functions

### `isSvaRupaUsage(word, context)`
Determines if a word is used in its sva-rūpa (own form) sense.

**Parameters:**
- `word` (string): The Sanskrit word to analyze
- `context` (object): Context indicators
  - `isGrammaticalDiscussion` (boolean): In grammatical analysis
  - `isPhonemeReference` (boolean): Referring to sound/letter
  - `isMorphemeReference` (boolean): Referring to morphological unit
  - `isTechnicalTerm` (boolean): Technical grammatical term
  - `isQuoted` (boolean): Appears in quotes/citation
  - `isInGrammaticalRule` (boolean): Part of grammatical rule
  - `metalinguistic` (boolean): Explicit metalinguistic usage

**Returns:** `boolean` - true if sva-rūpa usage

### `analyzeWordUsage(word, context)`
Provides comprehensive analysis of word usage.

**Returns:** Object with:
- `isSvaRupa` (boolean): Whether it's sva-rūpa usage
- `interpretationType` (string): 'metalinguistic' or 'semantic'
- `usageContext` (string): Context description
- `confidence` (number): Analysis confidence (0-1)
- `reasoning` (string): Explanation of determination
- `linguisticNotes` (string): Additional linguistic notes
- `script` (string): Detected script
- `sutraReference` (string): Reference to this sutra

### `getWordInterpretation(word, context)`
Returns the interpretation type according to this sutra.

**Returns:** 
- `'ashabda-samjna'` for metalinguistic usage
- `'shabda'` for semantic usage

### `requiresSvaRupaInterpretation(word, context)`
Determines if the context requires sva-rūpa interpretation.

### `getSvaRupaExamples()`
Provides traditional examples demonstrating the principle.

## Technical Implementation

The implementation handles:
- **Script Detection**: Both Devanagari and IAST
- **Context Analysis**: Multiple indicators for metalinguistic usage
- **Error Handling**: Graceful handling of invalid inputs
- **Performance**: Efficient context evaluation
- **Linguistic Accuracy**: Based on traditional grammatical analysis

## Test Coverage

- ✅ Metalinguistic usage detection
- ✅ Semantic usage identification  
- ✅ Context analysis across all indicators
- ✅ Script compatibility (Devanagari/IAST)
- ✅ Error handling for edge cases
- ✅ Integration across all functions
- ✅ Traditional examples validation

## Linguistic Notes

This sutra establishes the foundation for all metalinguistic discourse in Sanskrit grammar. It allows grammarians to discuss words as linguistic objects rather than semantic entities, enabling precise technical analysis of phonological, morphological, and syntactic phenomena.

The principle extends to:
- Pratyāhāra formation and reference
- Technical term definitions
- Morphological analysis
- Phonological descriptions
- Rule formulation and application

## Historical Context

This fundamental principle appears early in Pāṇini's Aṣṭādhyāyī, establishing the metalinguistic framework essential for all subsequent grammatical analysis. It demonstrates the sophisticated understanding of language-object vs. meta-language distinction in ancient Indian grammatical tradition.
