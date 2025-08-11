# Sutra 1.2.11: लिङ्सिचावात्मनेपदेषु

## Sanskrit Text
**Devanagari:** लिङ्सिचावात्मनेपदेषु  
**IAST:** liṅsicāvātmanepadēṣu

## Translation
"In the case of लिङ् (potential) and सिच् (future) [substitutes] when followed by आत्मनेपद [affixes]."

## Description
This sutra provides the कित् designation for substitutes of लिङ् (potential mood marker) and सिच् (future tense marker) when they begin with झल् consonants, are used after roots ending in consonants that contain इक् vowels, and are followed by आत्मनेपद (middle voice) affixes.

## Scope
- **Type:** अतिदेश (Designation/Extension Rule)
- **Category:** कित्त्वातिदेश (कित् Designation Rules)
- **Domain:** Affix designation for verbal morphology

## Conditions for Application
The rule applies when ALL the following conditions are met:

1. **Root Condition:** The root must end with a consonant and contain vowels from the इक् प्रत्यहार (i, u, ṛ, ḷ)
2. **Affix Condition:** The original affix must be either लिङ् (potential) or सिच् (future)
3. **Substitute Condition:** The substitute form of the affix must begin with a consonant from झल् प्रत्यहार
4. **Following Condition:** The following affixes must be आत्मनेपद (middle voice endings)

## Examples

### Positive Cases (Rule Applies)
```
Root: गुप् (to protect) - contains उ (इक्) and ends with प् (consonant)
Affix: लिङ् → Substitute: ज (begins with झ)
Following: ते (आत्मनेपद)
Result: गुप्जते (कित् designation applied)

Root: रुच् (to please) - contains उ (इक्) and ends with च् (consonant)  
Affix: सिच् → Substitute: ष्य (begins with ष्)
Following: ते (आत्मनेपद)
Result: रुचिष्यते (कित् designation applied)
```

### Negative Cases (Rule Does Not Apply)
```
Root: पा (to drink) - doesn't end with consonant
→ No कित् designation

Root: गुप् + लिङ् → अ (doesn't begin with झल्)
→ No कित् designation

Root: गुप् + लिङ् → ज + ति (परस्मैपद, not आत्मनेपद)
→ No कित् designation
```

## Dependencies
This sutra builds upon:
- **1.2.8** - कित् designation for specific roots with क्त्वा/सन्
- **1.2.9** - कित् designation after इक्-ending roots  
- **1.2.10** - कित् designation after हल्-ending roots

It integrates with:
- **Sutra 3.3.161** - विधिनिमन्त्रणामन्त्रण अधीष्टसम्प्रश्नप्रार्थनेषु लिङ्
- **Sutra 3.1.44** - च्लेः सिच्

## Technical Implementation

### Function Signature
```javascript
sutra1211(word, context = {})
```

### Parameters
- `word` (string): The verbal form being analyzed
- `context` (object): Morphological context containing:
  - `root`: The root of the word  
  - `affix`: The primary affix (लिङ् or सिच्)
  - `substitute`: The substitute form of the affix
  - `followingAffix`: The आत्मनेपद affix that follows

### Return Value
Returns an analysis object with:
- `isValid`: Boolean indicating valid input
- `isKit`: Boolean indicating कित् designation  
- `sutraApplies`: Boolean indicating if this sutra applies
- `conditions`: Object with detailed condition analysis
- `analysis`: Object with morphological details

### Usage Example
```javascript
import { sutra1211 } from './sutras/1.2.11/index.js';

const context = {
  root: 'गुप्',
  affix: 'लिङ्',
  substitute: 'ज',
  followingAffix: 'ते'
};

const result = sutra1211('गुप्जते', context);
console.log(result.isKit); // true
console.log(result.sutraApplies); // true
```

## Linguistic Significance
This sutra is crucial for proper morphological analysis of Sanskrit verbal forms in the potential and future tenses when used with middle voice endings. The कित् designation affects:

1. **Accent patterns** in the derived forms
2. **Phonological processes** that apply to the verbal stem
3. **Morphophonemic changes** in sandhi applications

## Implementation Notes
- Uses existing utility functions from the kit-designation module
- Leverages the **NEW** pada-analysis module for आत्मनेपद detection (created for this sutra)
- The pada-analysis module includes comprehensive voice classification for all tense systems
- Maintains compatibility with the broader sutra analysis framework
- Includes comprehensive error handling and validation

### New Utility Module Created
This implementation introduced `pada-analysis.js` containing:
- `isAtmanepadaAffix(affix, tense)` - Identifies Ātmanepada endings
- `isParasmaipadaAffix(affix, tense)` - Identifies Parasmaipada endings
- `getAffixPada(affix)` - Determines pada classification  
- Comprehensive databases for all verbal endings by voice and tense

## Test Coverage
The implementation includes 24 comprehensive tests covering:
- ✅ Positive cases with both लिङ् and सिच् affixes
- ✅ Negative cases for each condition
- ✅ Edge cases with complex morphological patterns  
- ✅ Error handling for invalid inputs
- ✅ Multi-script support (Devanagari and IAST)
- ✅ Integration with related sutras

## Performance
- **Time Complexity:** O(1) for basic analysis
- **Space Complexity:** O(1) for result storage
- **Dependencies:** Leverages existing utility functions for efficiency

---

**Sutra Number:** 1.2.11  
**Implementation Date:** January 2025  
**Last Updated:** January 2025  
**Test Status:** ✅ All tests passing
