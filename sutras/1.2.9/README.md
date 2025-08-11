# Sutra 1.2.9: इको झल्

## Sanskrit Text
**Devanagari:** इको झल्  
**IAST:** iko jhal  
**Translation:** "After [roots ending in] इक् [i, u, ṛ, ḷ], [affixes beginning with] झल् [consonants are कित्]."

## Description

This sutra extends the कित् (kit) designation to affixes that begin with झल् (all consonants) when they follow roots ending in इक् (the close vowels i, u, ṛ, ḷ). It represents a systematic extension of the कित् designation rules begun in Sutra 1.2.8.

### Grammatical Analysis

- **Type:** अतिदेश (Extension/Application rule)
- **Category:** कित्त्वातिदेश (Kit-designation rule)
- **Scope:** Applies to any affix beginning with a झल् consonant after इक्-ending roots
- **Dependencies:** Continues from Sutra 1.2.8's specific enumeration

### Key Components

1. **इक्:** The pratyāhāra covering close vowels:
   - **इ (i)** - short i
   - **उ (u)** - short u
   - **ऋ (ṛ)** - vocalic r
   - **ऌ (ḷ)** - vocalic l

2. **झल्:** The pratyāhāra covering all consonants (equivalent to हल्):
   - All stops, fricatives, nasals, liquids, and semivowels
   - Essentially any non-vowel sound

## Implementation

The implementation checks two conditions:
1. Root ends in any of the इक् vowels (i, u, ṛ, ḷ)
2. Affix begins with any झल् consonant

### Function Signature

```javascript
analyzeKitDesignationSutra129(word, context = {})
```

### Parameters

- `word` (string): The Sanskrit word or morphological combination
- `context` (Object): Optional morphological context
  - `root` (string): The verbal root
  - `affix` (string): The affix being analyzed
  - `affixes` (Array): Multiple affix combinations
  - `debug` (boolean): Enable debug output

### Return Value

```javascript
{
  sutra: '1.2.9',
  text: 'इको झल्',
  applies: boolean,
  kitDesignated: boolean,
  analysis: {
    word: string,
    script: string,
    root: string,
    affix: string,
    rootEndsInIka: boolean,
    affixBeginsWithJhal: boolean,
    debug: array (if enabled)
  },
  explanation: string
}
```

## Examples

### Positive Cases (Sutra Applies)

1. **चि + त = चित**
   - Root: चि (to gather) - ends in इ
   - Affix: त (past participle) - begins with त
   - Result: कित् designation applies

2. **शु + क्त = शुक्त**
   - Root: शु (to be pure) - ends in उ
   - Affix: क्त (past participle) - begins with क्
   - Result: कित् designation applies

3. **कृ + त = कृत**
   - Root: कृ (to do) - ends in ऋ
   - Affix: त (past participle) - begins with त
   - Result: कित् designation applies

### Negative Cases (Sutra Does Not Apply)

1. **गम् + त = गत**
   - Root: गम् (to go) - ends in म्, not इक्
   - Sutra does not apply

2. **भू + अन = भवन**
   - Root: भू (to be) - ends in उ (इक्)
   - Affix: अन - begins with अ (vowel), not झल्
   - Sutra does not apply

## Usage Examples

### Basic Usage

```javascript
import { analyzeKitDesignationSutra129 } from './index.js';

// Analyze a specific combination
const result = analyzeKitDesignationSutra129('चित', {
  root: 'चि',
  affix: 'त'
});

console.log(result.applies); // true
console.log(result.kitDesignated); // true
```

### Multiple Affixes

```javascript
const result = analyzeKitDesignationSutra129('compound', {
  affixes: [
    { root: 'चि', affix: 'त' },    // Should apply
    { root: 'गम्', affix: 'त' },   // Should not apply
    { root: 'शु', affix: 'क्त' }   // Should apply
  ]
});
```

### With Debug Information

```javascript
const result = analyzeKitDesignationSutra129('चित', {
  root: 'चि',
  affix: 'त',
  debug: true
});

console.log(result.analysis.debug);
// [
//   "Analyzing Sutra 1.2.9 for word: चित",
//   "Root 'चि' ends in इक्: true",
//   "Affix 'त' begins with झल्: true",
//   "Final result: applies=true, kitDesignated=true"
// ]
```

## Linguistic Significance

### Morphophonemic Impact

The कित् designation affects:
1. **Accent:** कित् affixes don't alter the root's accent
2. **Vowel gradation:** May prevent guṇa/vṛddhi changes
3. **Final sound changes:** Influences consonant clusters and sandhi

### Traditional Commentary

This sutra represents a systematic generalization from the specific enumeration in 1.2.8. Rather than listing each root-affix combination, Pāṇini provides a phonologically-based rule that captures the pattern: इक्-ending roots take कित् affixes when followed by consonant-initial suffixes.

### Relationship to Other Sutras

- **1.2.8:** Provides specific enumerated cases
- **1.2.10:** Further extends to हल्-ending roots
- **1.2.11-1.2.15:** Additional specific कित् designation rules

## Technical Details

### Multi-Script Support

The implementation handles both Devanagari and IAST input:

```javascript
// Devanagari
analyzeKitDesignationSutra129('चित', { root: 'चि', affix: 'त' });

// IAST
analyzeKitDesignationSutra129('cita', { root: 'ci', affix: 'ta' });
```

### Vowel Detection

Properly handles Devanagari vowel signs (mātrās):
- `ि` (i-mātrā) in चि
- `ु` (u-mātrā) in शु
- `ृ` (ṛ-mātrā) in कृ
- `ॢ` (ḷ-mātrā) in कॢ

### Consonant Classification

Uses the complete झल् pratyāhāra for consonant identification, covering all stops, fricatives, nasals, liquids, and semivowels in both scripts.

## Testing

The implementation includes comprehensive tests covering:
- Core functionality with various root-affix combinations
- Multi-script support (Devanagari and IAST)
- Edge cases and error handling
- Performance optimization
- Integration with shared utilities

All tests ensure linguistic accuracy and proper handling of Sanskrit morphological analysis.
