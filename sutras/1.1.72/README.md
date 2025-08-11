# Sutra 1.1.72: येन विधिस्तदन्तस्य

## Sanskrit Text
येन विधिस्तदन्तस्य

## Transliteration
yena vidhis tadantasya

## English Translation
"What is specified by a rule applies to those ending with that element."

## Brief Description
This fundamental metalinguistic sutra establishes the scope principle for all Paninian rules. When a grammatical rule (विधि) specifies a particular element, class, or category, that rule applies specifically to words ending with that specified element. This principle determines the application boundary of every grammatical rule in the system.

## Technical Implementation

### Dependencies
This sutra uses several shared utilities:
- `detectScript` from sanskrit-utils for script detection
- Phoneme classification functions for class-based rules
- Pattern matching utilities for suffix-based rules

### Key Functions

#### 1. `isWithinVidhiScope(word, specification, context = {})`
Determines if a word falls within the scope of a specified विधि (rule).

**Parameters:**
- `word` (string): The word to check
- `specification` (string): The rule specification (e.g., 'अच्', 'कृत्', 'धातु')
- `context` (object): Optional context for morphological analysis

**Returns:** Boolean indicating if the word is within scope

#### 2. `analyzeVidhiScope(specification, wordList)`
Provides comprehensive analysis of a विधि's scope across multiple words.

**Parameters:**
- `specification` (string): The rule specification
- `wordList` (array): Array of words to analyze

**Returns:** Object with detailed scope analysis including classification and reasoning

#### 3. `getVidhiScopeBoundary(specification)`
Determines the precise boundaries of a विधि's application.

**Parameters:**
- `specification` (string): The rule specification

**Returns:** Object describing the scope boundaries, inclusions, exclusions, and conditions

### Supported Scope Types

#### 1. Suffix-based Rules (प्रत्यययान्त)
- **कृत्**: Words with कृत् (verbal derivative) suffixes
- **तद्धित**: Words with तद्धित (nominal derivative) suffixes  
- **स्त्री**: Words with feminine suffixes
- **तिङ्**: Words with verbal terminations
- **सुप्**: Words with nominal terminations

#### 2. Phonetic Rules (वर्णान्त)
- **अच्**: Words ending in vowels
- **हल्**: Words ending in consonants
- **अम्**: Words ending in specific vowel classes
- **एच्**: Words ending with specific diphthongs

#### 3. Morphological Rules (आकारान्त)
- **धातु**: Verbal roots and root-containing forms
- **प्रातिपदिक**: Nominal stems
- **उपसर्ग**: Words with prefixes
- **निपात**: Particles

#### 4. Syntactic Rules (संज्ञान्त)
- **संज्ञा**: Nouns
- **क्रिया**: Verbs
- **विशेषण**: Adjectives
- **सर्वनाम**: Pronouns

## Usage Examples

### Basic Scope Detection
```javascript
import { isWithinVidhiScope } from './index.js';

// Phonetic scope (अच् - vowel endings)
console.log(isWithinVidhiScope('राम', 'अच्')); // true
console.log(isWithinVidhiScope('वाक्', 'अच्')); // false

// Suffix scope (कृत् - verbal derivatives)
console.log(isWithinViधिScope('गत', 'कृत्')); // true
console.log(isWithinविधिScope('राम', 'कृत्')); // false
```

### Comprehensive Analysis
```javascript
import { analyzeViधiScope } from './index.js';

const words = ['राम', 'वाक्', 'गुरु', 'मरुत्', 'नदी'];
const analysis = analyzeविधिScope('अच्', words);

console.log(analysis.wordsInScope);     // ['राम', 'गुरु', 'नदी']
console.log(analysis.wordsOutOfScope);  // ['वाक्', 'मरुत्']
console.log(analysis.viधिType);        // 'PHONETIC_RULE'
console.log(analysis.reasoning);       // Detailed explanation
```

### Boundary Analysis
```javascript
import { getविधिScopeBoundary } from './index.js';

const boundary = getविधिScopeBoundary('कृत्');
console.log(boundary.includes);        // Description of included elements
console.log(boundary.excludes);        // Description of excluded elements
console.log(boundary.conditions);      // Specific conditions for application
```

## Traditional Examples

### अच्विधि (Vowel-ending Rules)
When a rule specifies अच् (vowels), it applies to words ending in vowels:
- **राम** (ending in अ) - ✓ In scope
- **गुरु** (ending in उ) - ✓ In scope  
- **नदी** (ending in ई) - ✓ In scope
- **वाक्** (ending in क्) - ✗ Out of scope

### कृद्विधि (Verbal Derivative Rules)
When a rule specifies कृत् (verbal derivatives), it applies to words with कृत् suffixes:
- **गत** (गम् + त) - ✓ In scope
- **कृत** (कृ + त) - ✓ In scope
- **तव्य** (तव्य suffix) - ✓ In scope
- **राम** (no कृत् suffix) - ✗ Out of scope

### हल्विधि (Consonant-ending Rules)  
When a rule specifies हल् (consonants), it applies to words ending in consonants:
- **वाक्** (ending in क्) - ✓ In scope
- **मरुत्** (ending in त्) - ✓ In scope
- **भगवन्** (ending in न्) - ✓ In scope
- **राम** (ending in अ) - ✗ Out of scope

## Integration with Other Sutras

This sutra provides the foundational scope principle that governs the application of:
- All suffix-attachment rules (प्रत्यययोजना)
- Phonetic transformation rules (संधि)
- Morphological operations (आकृतिगण)
- Syntactic constructions (वाक्यनिर्माण)

## Error Handling

The implementation includes comprehensive error handling for:
- Invalid or empty specifications
- Null/undefined inputs
- Non-string input types
- Unknown specification types
- Script detection failures

## Testing

The test suite includes:
- 90+ comprehensive test cases
- Coverage of all scope types
- Integration tests across functions
- Mixed script scenarios
- Error condition validation
- Traditional example verification

## Performance Notes

- Efficient O(1) specification type detection
- Optimized phoneme class matching
- Minimal regex usage for better performance
- Cached pattern matching for repeated operations

## Traditional Commentary References

This implementation aligns with traditional commentaries:
- **Kāśikā**: स्पष्टीकरण of तदन्त principle
- **Mahābhāṣya**: विस्तृत analysis of scope determination
- **Siddhāntakaumudī**: व्यावहारिक examples of application

The येन विधिस्तदन्तस्य principle is fundamental to understanding the precise application scope of every rule in Pāṇinian grammar.
