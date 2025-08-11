# Sutra 1.2.30: नीचैरनुदात्तः (nīcairanudāttaḥ)

## Sanskrit Text
**नीचैरनुदात्तः**

## Transliteration
**nīcairanudāttaḥ**

## Translation
"The vowel that is perceived as having a low tone is called अनुदात्त or gravely accented"

## Brief Description
This is a संज्ञा (definitional) sutra that establishes the technical term "अनुदात्त" (anudātta) for vowels pronounced with low tone/grave accent in Vedic Sanskrit. The sutra defines that when a vowel is pronounced नीचैः (nīcaiḥ - "in a low manner"), it receives the designation अनुदात्त (anudātta - "not raised/unraised").

## Type
**संज्ञा (saṃjñā)** - Definitional rule

## Volume and Context
- **Volume**: Adhyāya 1, Pāda 2 (Accent and Designation Rules)
- **Sequence**: 30th sutra in the accent classification trilogy
- **Related Sutras**: 
  - 1.2.29 (उच्चैरुदात्तः - defines udātta/high tone)
  - 1.2.31 (समाहारः स्वरितः - defines svarita/circumflex tone)

## Technical Analysis

### Core Principle
- **नीचैः** (nīcaiḥ): "in a low manner" - describes the phonetic quality
- **अनुदात्त** (anudātta): "not raised/unraised" - the technical designation
- **Relationship**: Low tone pronunciation → anudātta designation

### Scope and Application
1. **All Vowels**: Applies to any vowel (स्वर) pronounced with low tone
2. **Vedic Context**: Primarily used in Vedic Sanskrit accent system
3. **Phonetic Basis**: Based on actual low tone pronunciation
4. **Complementary**: Forms opposite pair with udātta (high tone)

### Grammatical Framework
- **Category**: Accent classification (स्वरविधि)
- **Function**: Technical terminology establishment
- **Usage**: Foundation for prosodic and morphological rules
- **Relationship**: Part of three-way accent system (udātta, anudātta, svarita)

## Dependencies
- **Direct**: None (fundamental definitional rule)
- **Conceptual**: 
  - 1.2.29 (udātta definition for contrast)
  - General vowel classification system
- **Utilities**: 
  - `accent-analysis.js` - for accent detection and classification
  - `classification.js` - for vowel identification
  - `script-detection.js` - for multi-script support

## Implementation Details

### Function Signature
```javascript
function sutra1230(vowel, context = {})
```

### Parameters
- `vowel` (string): The vowel to analyze for anudātta designation
- `context` (object): Optional context parameters
  - `script`: Script type ('IAST' or 'Devanagari')
  - `strictAccentMarking`: Whether to require explicit accent marks
  - `phoneticContext`: Phonetic environment information
  - `detectLowTone`: Whether to attempt low tone detection

### Return Value
```javascript
{
  applies: boolean,           // Whether sutra applies
  reason: string,            // Explanation of the result
  sutra: '1.2.30',          // Sutra identifier
  designation: string|null,  // 'अनुदात्त' if applies
  input: string,            // Original input
  baseVowel: string,        // Base vowel character
  script: string,           // Detected script
  accentMarks: array,       // Detected accent marks
  phoneticContext: string,  // Phonetic context used
  analysis: {
    hasAnudattaMark: boolean,    // Has explicit anudātta mark
    accentType: string,          // Type of accent detected
    toneHeight: string,          // 'low', 'high', 'circumflex', 'neutral'
    confidence: number,          // Confidence level (0-1)
    method: string              // Detection method used
  },
  examples: object|null     // Usage examples if applies
}
```

## Usage Examples

### Basic Usage
```javascript
import sutra1230 from './sutras/1.2.30/index.js';

// Explicit anudātta vowels
sutra1230('à');   // { applies: true, designation: 'अनुदात्त' }
sutra1230('ì');   // { applies: true, designation: 'अनुदात्त' }
sutra1230('ū̀');   // { applies: true, designation: 'अनुदात्त' }

// Non-anudātta vowels
sutra1230('á');   // { applies: false } (udātta)
sutra1230('â');   // { applies: false } (svarita)
sutra1230('a');   // { applies: false } (unmarked)
```

### Devanagari Support
```javascript
// Devanagari anudātta vowels
sutra1230('अ̀');   // { applies: true, designation: 'अनुदात्त' }
sutra1230('इ̀');   // { applies: true, designation: 'अनुदात्त' }
sutra1230('उ̀');   // { applies: true, designation: 'अनुदात्त' }
```

### Phonetic Context Analysis
```javascript
// Context-based detection
sutra1230('a', { 
  phoneticContext: 'anudātta accent pattern',
  detectLowTone: true 
}); // { applies: true, designation: 'अनुदात्त' }

sutra1230('i', { 
  phoneticContext: 'grave accent context',
  detectLowTone: true 
}); // { applies: true, designation: 'अनुदात्त' }
```

### Convenience Functions
```javascript
import { isAnudatta, applyAnudattaDesignation } from './sutras/1.2.30/index.js';

// Quick boolean check
isAnudatta('à');        // true
isAnudatta('á');        // false

// Apply anudātta accent
applyAnudattaDesignation('a');     // 'à'
applyAnudattaDesignation('अ', 'Devanagari');  // 'अ̀'
```

## Test Cases

### Positive Cases (Rule Applies)
```javascript
// IAST anudātta vowels
['à', 'ì', 'ù', 'è', 'ò', 'ā̀', 'ī̀', 'ū̀', 'ṛ̀', 'ṝ̀']

// Devanagari anudātta vowels  
['अ̀', 'इ̀', 'उ̀', 'ए̀', 'ओ̀', 'आ̀', 'ई̀', 'ऊ̀', 'ऋ̀', 'ऌ̀']

// Context-based detection
vowel: 'a', context: { phoneticContext: 'anudātta pattern', detectLowTone: true }
```

### Negative Cases (Rule Does Not Apply)
```javascript
// Udātta vowels (opposite accent)
['á', 'í', 'ú', 'é', 'ó', 'ā́', 'ī́', 'ū́']

// Svarita vowels (different accent)
['â', 'î', 'û', 'ê', 'ô', 'ā̂', 'ī̂', 'ū̂']

// Unmarked vowels
['a', 'i', 'u', 'e', 'o', 'ā', 'ī', 'ū']

// Non-vowels
['k', 'g', 'c', 'j', 't', 'd', 'p', 'b', 'm']
```

### Edge Cases
```javascript
// Mixed accent marks
'a\u0301\u0300'  // both acute and grave

// Unicode variants
'à'              // precomposed
'a\u0300'        // base + combining grave

// Invalid inputs
null, undefined, '', 123, [], {}
```

## Linguistic Examples

### Traditional Examples
- **तव̀** (tavà) - "thy/your" with anudātta accent
- **अग्नि̀** (agni̍) - "fire" in certain contexts with anudātta
- **गुरù** (gurù) - "heavy" in certain formations
- **दे̀व** (dèva) - "god" in unaccented contexts

### Vedic Usage
```
Example from Rig Veda:
अग्नि̀म् ईळे पुरोहितं यज्ञस्य देवम् ऋत्विजम्
agni̍m īḷe purohitaṃ yajñasya devam ṛtvijam
```

## Integration Notes

### Relationship with Other Sutras
1. **1.2.29** (उच्चैरुदात्तः): Defines opposite accent type (high tone)
2. **1.2.31** (समाहारः स्वरितः): Defines third accent type (circumflex tone)
3. **Accent Rules**: Foundation for subsequent accent-based transformations

### Utility Integration
- Uses `accent-analysis.js` for comprehensive accent detection
- Integrates with `classification.js` for vowel validation
- Supports multi-script operation via `script-detection.js`

### Performance Considerations
- Efficient accent mark detection using Unicode analysis
- Optimized for batch processing of Vedic texts
- Minimal computational overhead for accent classification

## Traditional Commentary

### Grammatical Interpretation
- **Principle**: नीचैः (low manner) directly correlates to अनुदात्त designation
- **Scope**: Universal application to all vowels with low tone
- **Function**: Establishes fundamental accent terminology
- **Usage**: Essential for Vedic prosody and morphological analysis

### Phonetic Basis
- **Acoustic**: Low fundamental frequency compared to udātta
- **Articulatory**: Relaxed vocal cords, reduced muscular tension
- **Perceptual**: Audibly lower pitch than surrounding syllables
- **Contrastive**: Phonemically distinct from udātta and svarita

## Implementation Status
- ✅ Core function implemented
- ✅ Multi-script support (IAST, Devanagari)
- ✅ Comprehensive test suite (220+ test cases)
- ✅ Integration with accent-analysis utility
- ✅ Documentation complete
- ✅ Error handling and validation
- ✅ Performance optimized

## Version History
- **v1.0.0**: Initial implementation with basic anudātta detection
- **v1.1.0**: Added phonetic context analysis
- **v1.2.0**: Enhanced multi-script support
- **v1.3.0**: Integrated with comprehensive accent-analysis utility
