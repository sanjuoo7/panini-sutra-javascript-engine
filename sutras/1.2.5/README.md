# Sutra 1.2.5: असंयोगाल्लिट् कित् (asaṃyogāl liṭ kit)

## Sanskrit Text
असंयोगाल्लिट् कित्

## Transliteration
asaṃyogāl liṭ kit

## English Translation
"The affixes of liṭ (Perfect Tense) not coming after a conjunct consonant are treated as kit (having k designation)."

## Description
This sutra establishes that perfect tense (liṭ) affixes that do not follow conjunct consonants (saṃyoga) receive the kit designation. This is a crucial rule in Sanskrit grammar that affects the morphological behavior of perfect tense formations.

## Technical Definition

### Liṭ Affixes
Perfect tense affixes that include:
- Parasmaipada endings: आ, अतुः, उः, थ, अथुः, etc.
- Ātmanepada endings: ए, आते, इरे, से, ध्वे, etc.

### Conjunct Consonants (Saṃyoga)
Clusters of two or more consonants occurring together, such as:
- क्त, ष्ट, न्त, म्प, स्थ
- यज्ञ, अग्नि, उत्पद्, सम्स्कृत

### Kit Designation
The k designation applied to affixes, which affects various grammatical operations including:
- Vowel changes in the root
- Application of other grammatical rules
- Morphophonemic modifications

### Condition: असंयोगात् (asaṃyogāt)
The rule applies specifically when the liṭ affix does NOT follow a conjunct consonant - hence "असंयोगात्" (from non-conjunct).

## Dependencies
This sutra works within the broader system of affix designations:
- Related to kit designation rules in general
- Interacts with perfect tense formation rules
- Affects root vowel changes and sandhi operations

## Implementation Features

### Core Functions
- `isLitAffix(affix)`: Identifies perfect tense affixes
- `hasConjunct(sequence)`: Detects conjunct consonants
- `isLitAffixAfterConjunct(context, affix)`: Checks conjunct proximity
- `isKitByAsamyogalLit(context, affix)`: Main rule application
- `analyzeLitKitStatus(contexts)`: Batch analysis

### Script Support
- Full Devanagari support
- Complete IAST transliteration support
- Cross-script consistency validation

### Validation Features
- Sanskrit input validation
- Comprehensive error handling
- Type safety checks
- Conjunct pattern recognition

## Usage Examples

### Basic Usage
```javascript
import { isKitByAsamyogalLit } from './index.js';

// Liṭ affixes not after conjunct get kit designation
console.log(isKitByAsamyogalLit('भु', 'आ')); // true (बभूव - no conjunct)
console.log(isKitByAsamyogalLit('कृ', 'औ')); // true (चकार - no conjunct)

// Liṭ affixes after conjunct do not get kit by this rule
console.log(isKitByAsamyogalLit('यज्ञ', 'आ')); // false (after conjunct ज्ञ)
console.log(isKitByAsamyogalLit('अग्नि', 'ए')); // false (after conjunct ग्न)

// Non-liṭ affixes are not affected
console.log(isKitByAsamyogalLit('भु', 'ति')); // false (ति is not liṭ)
```

### Conjunct Detection
```javascript
import { hasConjunct } from './index.js';

// Identify conjunct consonants
console.log(hasConjunct('यज्ञ')); // true (ज्ञ is a conjunct)
console.log(hasConjunct('अग्नि')); // true (ग्न is a conjunct)
console.log(hasConjunct('भु')); // false (no conjunct)
console.log(hasConjunct('गम्')); // false (single consonant)
```

### Batch Analysis
```javascript
import { analyzeLitKitStatus } from './index.js';

const contexts = [
  { precedingContext: 'भु', affix: 'आ' },
  { precedingContext: 'यज्ञ', affix: 'आ' },
  { precedingContext: 'कृ', affix: 'ति' }
];

const analysis = analyzeLitKitStatus(contexts);

console.log(analysis.kitCount); // 1 (भु+आ)
console.log(analysis.afterConjunctCount); // 1 (यज्ञ+आ)
console.log(analysis.nonLitCount); // 1 (कृ+ति)
```

### IAST Script Support
```javascript
// Works with IAST transliteration
console.log(isKitByAsamyogalLit('bhu', 'ā')); // true
console.log(isKitByAsamyogalLit('yajñ', 'ā')); // false (after conjunct)
console.log(hasConjunct('agni')); // true (gn is conjunct)
```

## Traditional Grammar Context

### Perfect Tense Formation
In classical Sanskrit, the perfect tense (liṭ) has specific formation rules:
- Root reduplication
- Special perfect endings
- Vowel modifications based on affix properties

### Kit Designation Effects
The kit designation affects:
- Root vowel strengthening (guṇa/vṛddhi)
- Specific sandhi operations
- Interaction with other grammatical rules

### Examples from Classical Texts
- **बभूव** (from भू + आ): No conjunct, gets kit → strengthening occurs
- **ययाज** (from यज् + आ): After conjunct ज्ञ, no kit by this rule
- **चकार** (from कृ + औ): No conjunct, gets kit → normal formation

## Implementation Notes
- Maintains extensive conjunct pattern database for accurate detection
- Handles both simple and complex conjunct formations
- Provides detailed categorization for linguistic analysis
- Supports traditional grammatical principles

## Testing
The implementation includes 47 comprehensive tests covering:
- Perfect tense affix identification
- Conjunct consonant detection
- Rule application in various contexts
- Cross-script consistency
- Error handling and edge cases
- Integration with traditional grammatical examples

## Linguistic Significance
This rule is fundamental for understanding:
- Perfect tense morphology in Sanskrit
- The role of phonological context in grammatical rules
- The systematic nature of Sanskrit affix designation
- Historical development of Indo-European perfect formations
