# Sutra 1.2.4: सार्वधातुकमपित् (sārvādhātukam apit)

## Sanskrit Text
सार्वधातुकमपित्

## Transliteration
sārvādhātukam apit

## English Translation
"Sārvādhātuka affixes that are apit (not having pit designation) are treated as ṅit."

## Description
This sutra establishes that sārvādhātuka affixes (primary verbal affixes) that do not have the pit designation are automatically assigned the ṅit designation. This is a fundamental rule in Sanskrit grammar that affects the behavior of verbal affixes in various grammatical processes.

## Technical Definition

### Sārvādhātuka Affixes
Primary verbal affixes that include:
- Present tense (laṭ) endings: ति, तः, न्ति, सि, etc.
- Imperative (loṭ) endings: तु, ताम्, न्तु, हि, etc.
- Potential (liṅ) endings: एत्, एताम्, एयुः, एः, etc.

### Pit Designation
Affixes that have the pit designation include certain kṛt pratyayas like 'त', 'तवत्', 'न', etc.

### Apit Classification
An affix is apit if it is a sārvādhātuka affix AND does not have pit designation.

### Ṅit Designation
The resulting designation applied to sārvādhātuka apit affixes, which affects various grammatical operations.

## Dependencies
This sutra works independently but interacts with:
- 1.2.1: गाङ्कुटादिभ्यो ङित् (mandatory ṅit for specific roots)
- 1.2.2: विज इडागमः (mandatory ṅit for विज् + iṭ)
- 1.2.3: ऊर्णोति (optional ṅit for ऊर्ण + iṭ)

## Implementation Features

### Core Functions
- `isSarvadhatukaAffix(affix)`: Identifies sārvādhātuka affixes
- `hasPitDesignation(affix)`: Checks pit designation
- `isApitAffix(affix)`: Determines apit status
- `isNgitBySarvadhatukaApit(affix)`: Main rule application
- `analyzeSarvadhatukaApitStatus(affixes)`: Batch analysis

### Script Support
- Full Devanagari support
- Complete IAST transliteration support
- Cross-script consistency validation

### Validation Features
- Sanskrit input validation
- Comprehensive error handling
- Type safety checks

## Usage Examples

### Basic Usage
```javascript
import { isNgitBySarvadhatukaApit } from './index.js';

// Sārvādhātuka apit affixes get ṅit designation
console.log(isNgitBySarvadhatukaApit('ति')); // true (present tense 3rd person singular)
console.log(isNgitBySarvadhatukaApit('तु')); // true (imperative 3rd person singular)

// Pit affixes do not get ṅit by this rule
console.log(isNgitBySarvadhatukaApit('त')); // false (has pit designation)

// Non-sārvādhātuka affixes are not affected
console.log(isNgitBySarvadhatukaApit('इत')); // false (not sārvādhātuka)
```

### Batch Analysis
```javascript
import { analyzeSarvadhatukaApitStatus } from './index.js';

const affixes = ['ति', 'सि', 'त', 'इत'];
const analysis = analyzeSarvadhatukaApitStatus(affixes);

console.log(analysis.ngitCount); // 2 (ति, सि)
console.log(analysis.nonSarvadhatukaCount); // 2 (त, इत)
```

### IAST Script Support
```javascript
// Works with IAST transliteration
console.log(isNgitBySarvadhatukaApit('ti')); // true
console.log(isNgitBySarvadhatukaApit('tu')); // true
console.log(isNgitBySarvadhatukaApit('ta')); // false (pit affix)
```

## Traditional Grammar Context
In classical Sanskrit grammar, this rule is fundamental for understanding:
- Verbal conjugation patterns
- Sandhi operations involving verbal forms
- The interaction between affix types and phonetic changes

The distinction between pit and apit affixes affects numerous other grammatical rules and is essential for proper Sanskrit morphological analysis.

## Implementation Notes
- Maintains strict separation between sārvādhātuka and other affix types
- Handles edge cases with comprehensive validation
- Provides detailed categorization for linguistic analysis
- Supports both traditional and modern computational approaches

## Testing
The implementation includes 49 comprehensive tests covering:
- Positive identification of sārvādhātuka apit affixes
- Proper rejection of pit affixes
- Cross-script consistency
- Error handling and edge cases
- Integration with traditional grammatical principles
