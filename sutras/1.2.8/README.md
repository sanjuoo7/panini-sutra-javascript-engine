# Sutra 1.2.8: रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च

## Overview

**Sanskrit Text**: `रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च`  
**Transliteration**: rudavidamuṣagrahisvapipracchḥ saṃśaca  
**Translation**: "After the roots रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्, the affixes क्त्वा and सन् are कित्।"

## Purpose

This sutra establishes कित् (kit) designation for the affixes क्त्वा (ktvā - absolutive/gerund) and सन् (san - desiderative) when they follow specific verbal roots. The कित् designation is crucial because it prevents guṇa/vṛddhi operations, maintaining the original vowel quality of the root.

**Root List:**
- **रुद्** (rud) - to weep, to cry
- **विद्** (vid) - to know, to find  
- **मुष्** (muṣ) - to steal, to rob
- **गृह्** (gṛh) - to seize, to grasp
- **स्वप्** (svap) - to sleep
- **प्रच्छ्** (pracch) - to ask, to question

**Affected Affixes:**
- **क्त्वा** (ktvā) - Absolutive/gerund affix
- **सन्** (san) - Desiderative affix

## Implementation

### Function Signature
```javascript
function sutra128(root, affix, options = {}) {
    // Returns comprehensive analysis of कित् designation
}

function analyzeKitDesignationSutra128(root, affix, options = {}) {
    // Core analysis function for Sutra 1.2.8
}
```

### Key Features
- **Multi-script Support**: Handles both Devanagari and IAST input
- **Root Variant Recognition**: Recognizes alternative forms of the specified roots
- **Affix Variant Support**: Handles different forms of क्त्वा and सन् affixes
- **Comprehensive Analysis**: Provides detailed कित् designation information
- **Error Handling**: Graceful handling of invalid inputs
- **Integration**: Uses shared kit-designation utilities for consistency

### Dependencies
- **Sanskrit Utils**: 
  - `detectScript` - Script detection for multi-script support
  - `validateSanskritWord` - Input validation
- **Kit Designation Utils**:
  - `isSutra128Root` - Identifies roots from this sutra
  - `isKtvaOrSanAffix` - Identifies relevant affixes
  - `isKitBySutra128` - Determines कित् designation

## Usage Examples

### Basic Usage
```javascript
import sutra128, { analyzeKitDesignationSutra128 } from './index.js';

// Example 1: रुद् + क्त्वा (having wept)
const result1 = sutra128('रुद्', 'क्त्वा');
console.log(result1.isKit); // true
console.log(result1.effect); // "Affix receives कित् designation, preventing guṇa/vṛddhi"

// Example 2: विद् + सन् (desire to know)
const result2 = analyzeKitDesignationSutra128('विद्', 'सन्');
console.log(result2.isKit); // true
console.log(result2.description); // "After रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्, the affixes क्त्वा and सन् are कित्"

// Example 3: IAST input
const result3 = sutra128('muṣ', 'ktvā');
console.log(result3.isKit); // true
```

### Advanced Usage
```javascript
import { 
  getSutra128Roots, 
  getSutra128Affixes, 
  getSutra128Examples,
  appliesSutra128 
} from './index.js';

// Get all roots covered by this sutra
const roots = getSutra128Roots('both');
console.log(roots.devanagari); // ['रुद्', 'विद्', 'मुष्', 'गृह्', 'स्वप्', 'प्रच्छ्']
console.log(roots.iast); // ['rud', 'vid', 'muṣ', 'gṛh', 'svap', 'pracch']

// Get affected affixes
const affixes = getSutra128Affixes('devanagari');
console.log(affixes); // ['क्त्वा', 'सन्']

// Get practical examples
const examples = getSutra128Examples('devanagari');
examples.forEach(ex => {
  console.log(`${ex.root} + ${ex.affix} → ${ex.result} (${ex.meaning})`);
});
// Output:
// रुद् + क्त्वा → रुदित्वा (having wept)
// विद् + सन् → विविदिषा (desire to know)
// स्वप् + क्त्वा → सुप्त्वा (having slept)
// गृह् + सन् → जिगृक्षा (desire to seize)

// Quick check if sutra applies
console.log(appliesSutra128('रुद्', 'क्त्वा')); // true
console.log(appliesSutra128('कृ', 'क्त्वा')); // false (wrong root)
console.log(appliesSutra128('रुद्', 'ति')); // false (wrong affix)

// Combined input format
const result4 = sutra128('गृह्+सन्');
console.log(result4.isKit); // true

// With options
const result5 = sutra128('स्वप्', 'क्त्वा', { 
  strict: true,
  includeVariants: true 
});
console.log(result5.applies); // true
```

### Practical Applications

#### Morphological Analysis
```javascript
// Check if a root-affix combination gets कित् designation
function analyzeForm(root, affix) {
  const analysis = sutra128(root, affix);
  
  if (analysis.applies && analysis.isKit) {
    return {
      kitDesignation: true,
      morphologicalEffect: 'No guṇa/vṛddhi applied to root vowel',
      sutraReference: '1.2.8',
      formation: `${root} + ${affix} (कित्)`
    };
  }
  
  return {
    kitDesignation: false,
    note: 'This sutra does not apply'
  };
}

console.log(analyzeForm('रुद्', 'क्त्वा'));
// {
//   kitDesignation: true,
//   morphologicalEffect: 'No guṇa/vṛddhi applied to root vowel',
//   sutraReference: '1.2.8',
//   formation: 'रुद् + क्त्वा (कित्)'
// }
```

#### Batch Processing
```javascript
// Process multiple root-affix combinations
const combinations = [
  ['रुद्', 'क्त्वा'], ['विद्', 'सन्'], ['मुष्', 'क्त्वा'], 
  ['कृ', 'क्त्वा'], ['गम्', 'सन्'] // Last two should not apply
];

const results = combinations.map(([root, affix]) => ({
  root,
  affix,
  ...sutra128(root, affix)
}));

results.forEach(result => {
  console.log(`${result.root} + ${result.affix}: ${result.isKit ? 'कित्' : 'Not कित्'}`);
});
```

## Linguistic Significance

### Morphological Impact
When क्त्वा and सन् receive कित् designation after these specific roots:

1. **गुण/वृद्धि Prevention**: The कित् marker blocks vowel gradation operations
2. **Phonological Preservation**: Root vowels maintain their original quality
3. **Morphological Consistency**: Ensures predictable formation patterns

### Classical Examples
- **रुद् + क्त्वा → रुदित्वा** (not *रोदित्वा with guṇa)
- **विद् + सन् → विविदिषा** (desiderative with preserved vowel)
- **स्वप् + क्त्वा → सुप्त्वा** (with expected phonological changes)
- **गृह् + सन् → जिगृक्षा** (desiderative formation)

### Grammatical Context
This sutra is part of the larger framework of कित्त्वातिदेश (kit designation rules) in Chapter 1, Pāda 2 of Pāṇini's Aṣṭādhyāyī, which governs how affixes interact with verbal roots in Sanskrit morphology.

## Testing

The implementation includes comprehensive tests covering:

- **Core Functionality**: कित् designation for all specified root-affix combinations
- **Script Support**: Both Devanagari and IAST inputs
- **Variant Handling**: Alternative forms of roots and affixes
- **Error Cases**: Invalid inputs and edge cases
- **Performance**: Efficient batch processing
- **Linguistic Accuracy**: Classical Sanskrit examples
- **Integration**: Compatibility with shared utilities

Run tests with:
```bash
npm test sutras/1.2.8/index.test.js
```

## Related Sutras

- **1.2.9**: इको झल् (kit designation for इक्-ending roots)
- **1.2.10**: हलन्ताच्च (kit designation for consonant-ending roots)
- **1.2.11-1.2.15**: Additional kit designation rules
- **1.1.5**: अपृक्त इत् (definition of इत् markers)

## References

- **Aṣṭādhyāyī**: 1.2.8
- **Kāśikā**: Commentary on अतिदेश rules
- **Siddhāntakaumudī**: Traditional explanations of kit designation
- **Modern Grammar**: Whitney's Sanskrit Grammar §§ 994-1000
