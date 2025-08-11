# Sutra 1.2.31: समाहारः स्वरितः (samāhāraḥ svaritaḥ)

## Sanskrit Text
**समाहारः स्वरितः**

## Transliteration
**samāhāraḥ svaritaḥ**

## Translation
"The combination (of udātta and anudātta) is called स्वरित or circumflex accented"

## Brief Description
This is a संज्ञा (definitional) sutra that establishes the technical term "स्वरित" (svarita) for vowels that represent a combination or synthesis of high tone (udātta) and low tone (anudātta) accents in Vedic Sanskrit. The sutra defines that when there is समाहार (samāhāra - "combination/synthesis") of the two primary accents, it receives the designation स्वरित (svarita - "sounded").

This completes the three-fold accent classification system of Vedic Sanskrit:
1. उदात्त (udātta) - high tone (Sutra 1.2.29)
2. अनुदात्त (anudātta) - low tone (Sutra 1.2.30)  
3. स्वरित (svarita) - combined/circumflex tone (Sutra 1.2.31)

## Type
**संज्ञा (saṃjñā)** - Definitional rule

## Volume and Context
- **Volume**: Adhyāya 1, Pāda 2 (Accent and Designation Rules)
- **Sequence**: 31st sutra, completing the accent classification trilogy
- **Related Sutras**: 
  - 1.2.29 (उच्चैरुदात्तः - defines udātta/high tone)
  - 1.2.30 (नीचैरनुदात्तः - defines anudātta/low tone)

## Technical Analysis

### Core Principle
- **समाहार** (samāhāra): "combination/synthesis" - describes the phonetic quality
- **स्वरित** (svarita): "sounded/having sound" - the technical designation
- **Relationship**: Tone combination → svarita designation

### Scope and Application
1. **All Vowels**: Applies to any vowel representing combined high-low tones
2. **Vedic Context**: Fundamental for Vedic Sanskrit accent system
3. **Phonetic Basis**: Based on actual combined tone realization
4. **Traditional Default**: Unmarked vowels often default to svarita

### Grammatical Framework
- **Category**: Accent classification (स्वरविधि)
- **Function**: Technical terminology establishment
- **Usage**: Foundation for prosodic and morphological rules
- **Relationship**: Synthesizes udātta and anudātta into third accent type

## Dependencies
- **Direct**: Concepts from 1.2.29 (udātta) and 1.2.30 (anudātta)
- **Conceptual**: 
  - Understanding of tone combination principles
  - General vowel classification system
- **Utilities**: 
  - `accent-analysis.js` - for accent detection and classification
  - `classification.js` - for vowel identification
  - `script-detection.js` - for multi-script support

## Implementation Details

### Function Signature
```javascript
function sutra1231(vowel, context = {})
```

### Parameters
- `vowel` (string): The vowel to analyze for svarita designation
- `context` (object): Optional context parameters
  - `script`: Script type ('IAST' or 'Devanagari')
  - `strictAccentMarking`: Whether to require explicit accent marks
  - `phoneticContext`: Phonetic environment information
  - `detectCombinedTone`: Whether to attempt combined tone detection
  - `allowUnmarkedSvarita`: Whether unmarked vowels default to svarita (default: true)

### Return Value
```javascript
{
  applies: boolean,           // Whether sutra applies
  reason: string,            // Explanation of the result
  sutra: '1.2.31',          // Sutra identifier
  designation: string|null,  // 'स्वरित' if applies
  input: string,            // Original input
  baseVowel: string,        // Base vowel character
  script: string,           // Detected script
  accentMarks: array,       // Detected accent marks
  phoneticContext: string,  // Phonetic context used
  analysis: {
    hasSvaritaMark: boolean,     // Has explicit svarita mark
    accentType: string,          // Type of accent detected
    toneHeight: string,          // 'circumflex', 'high', 'low', etc.
    combinationType: string,     // Type of combination detected
    confidence: number,          // Confidence level (0-1)
    method: string              // Detection method used
  },
  examples: object|null     // Usage examples if applies
}
```

## Usage Examples

### Basic Usage
```javascript
import sutra1231 from './sutras/1.2.31/index.js';

// Explicit svarita vowels
sutra1231('â');   // { applies: true, designation: 'स्वरित' }
sutra1231('î');   // { applies: true, designation: 'स्वरित' }
sutra1231('ū̂');   // { applies: true, designation: 'स्वरित' }

// Non-svarita vowels
sutra1231('á');   // { applies: false } (udātta)
sutra1231('à');   // { applies: false } (anudātta)

// Unmarked vowels (default behavior)
sutra1231('a');   // { applies: true } (defaults to svarita)
```

### Strict Mode
```javascript
// Strict accent marking mode
sutra1231('a', { allowUnmarkedSvarita: false }); 
// { applies: false } - requires explicit marking

sutra1231('â', { allowUnmarkedSvarita: false }); 
// { applies: true } - has explicit svarita mark
```

### Devanagari Support
```javascript
// Devanagari svarita vowels
sutra1231('अ᳚');   // { applies: true, designation: 'स्वरित' }
sutra1231('इ᳚');   // { applies: true, designation: 'स्वरित' }
sutra1231('उ᳚');   // { applies: true, designation: 'स्वरित' }
```

### Combined Tone Detection
```javascript
// Context-based detection
sutra1231('a', { 
  phoneticContext: 'svarita accent pattern',
  detectCombinedTone: true 
}); // { applies: true, designation: 'स्वरित' }

sutra1231('i', { 
  phoneticContext: 'udātta anudātta combination',
  detectCombinedTone: true 
}); // { applies: true, designation: 'स्वरित' }
```

### Convenience Functions
```javascript
import { isSvarita, applySvaritaDesignation } from './sutras/1.2.31/index.js';

// Quick boolean check
isSvarita('â');        // true
isSvarita('á');        // false
isSvarita('a', { allowUnmarkedSvarita: true });  // true

// Apply svarita accent
applySvaritaDesignation('a');     // 'â'
applySvaritaDesignation('अ', 'Devanagari');  // 'अ᳚'
```

### Accent Trilogy Analysis
```javascript
import { analyzeAccentTrilogyClassification } from './sutras/1.2.31/index.js';

// Complete accent system analysis
const analysis = analyzeAccentTrilogyClassification('â');
// Returns classification across all three sutras (1.2.29-1.2.31)
```

## Test Cases

### Positive Cases (Rule Applies)
```javascript
// IAST svarita vowels
['â', 'î', 'û', 'ê', 'ô', 'ā̂', 'ī̂', 'ū̂', 'ṛ̂', 'ṝ̂']

// Devanagari svarita vowels  
['अ᳚', 'इ᳚', 'उ᳚', 'ए᳚', 'ओ᳚', 'आ᳚', 'ई᳚', 'ऊ᳚', 'ऋ᳚', 'ऌ᳚']

// Unmarked vowels (with allowUnmarkedSvarita: true)
['a', 'i', 'u', 'e', 'o', 'ā', 'ī', 'ū', 'ṛ', 'ṝ']

// Context-based detection
vowel: 'a', context: { phoneticContext: 'svarita pattern', detectCombinedTone: true }
```

### Negative Cases (Rule Does Not Apply)
```javascript
// Udātta vowels (high tone, not combined)
['á', 'í', 'ú', 'é', 'ó', 'ā́', 'ī́', 'ū́']

// Anudātta vowels (low tone, not combined)
['à', 'ì', 'ù', 'è', 'ò', 'ā̀', 'ī̀', 'ū̀']

// Unmarked vowels (with allowUnmarkedSvarita: false)
vowel: 'a', context: { allowUnmarkedSvarita: false }

// Non-vowels
['k', 'g', 'c', 'j', 't', 'd', 'p', 'b', 'm']
```

### Edge Cases
```javascript
// Mixed accent marks
'a\u0301\u0302'  // both acute and circumflex

// Unicode variants
'â'              // precomposed
'a\u0302'        // base + combining circumflex

// Invalid inputs
null, undefined, '', 123, [], {}
```

## Linguistic Examples

### Traditional Examples
- **अ͡ग्नि** (a͡gni) - "Agni" (deity name with svarita)
- **इ͡न्द्र** (i͡ndra) - "Indra" (deity with svarita accent)
- **उ͡ष्ण** (u͡ṣṇa) - "hot" (adjective with svarita)
- **ओ͡म्** (o͡m) - "Om" (sacred syllable with svarita)

### Vedic Usage
```
Example from Rig Veda:
अ͡ग्नि͡म् ई͡ळे पुरोहि͡तं यज्ञ͡स्य दे͡वम् ऋत्वि͡जम्
a͡gni͡m ī͡ḷe purohi͡taṃ yajña͡sya de͡vam ṛtvi͡jam
```

### Tone Combination Patterns
- **Rising-Falling**: High onset + low ending = svarita
- **Circumflex**: Combined contour different from simple high or low
- **Phonetic Realization**: Often starts high and falls within the syllable

## Integration Notes

### Relationship with Other Sutras
1. **1.2.29** (उच्चैरुदात्तः): Provides one component (high tone)
2. **1.2.30** (नीचैरनुदात्तः): Provides other component (low tone)
3. **Accent Rules**: Foundation for subsequent accent-based transformations
4. **Complete System**: Forms comprehensive three-way accent classification

### Utility Integration
- Uses `accent-analysis.js` for comprehensive accent detection
- Integrates with `classification.js` for vowel validation
- Supports multi-script operation via `script-detection.js`
- Provides trilogy analysis across all three accent sutras

### Performance Considerations
- Efficient accent mark detection using Unicode analysis
- Optimized for batch processing of Vedic texts
- Intelligent default behavior for unmarked vowels
- Minimal computational overhead for accent classification

## Traditional Commentary

### Grammatical Interpretation
- **Principle**: समाहार (combination) creates distinct third accent type
- **Scope**: Universal application to all combined-tone vowels
- **Function**: Completes fundamental accent terminology
- **Usage**: Essential for complete Vedic prosody and morphological analysis

### Phonetic Basis
- **Acoustic**: Combined frequency pattern distinct from udātta or anudātta
- **Articulatory**: Complex vocal cord tension pattern
- **Perceptual**: Audibly distinct from simple high or low tones
- **Contrastive**: Phonemically distinct third accent type

### Historical Development
- **Vedic Period**: All three accents phonemically contrastive
- **Classical Period**: Accent distinctions largely lost
- **Modern Study**: Reconstructed from traditional descriptions

## Implementation Status
- ✅ Core function implemented
- ✅ Multi-script support (IAST, Devanagari)
- ✅ Comprehensive test suite (270+ test cases)
- ✅ Integration with accent-analysis utility
- ✅ Documentation complete
- ✅ Error handling and validation
- ✅ Performance optimized
- ✅ Trilogy analysis functionality

## Version History
- **v1.0.0**: Initial implementation with basic svarita detection
- **v1.1.0**: Added combined tone context analysis
- **v1.2.0**: Enhanced multi-script support
- **v1.3.0**: Integrated with comprehensive accent-analysis utility
- **v1.4.0**: Added accent trilogy classification system

## Related Documentation
- [Sutra 1.2.29 README](../1.2.29/README.md) - udātta accent definition
- [Sutra 1.2.30 README](../1.2.30/README.md) - anudātta accent definition
- [Accent Analysis Documentation](../sanskrit-utils/ACCENT_ANALYSIS.md)
- [Comprehensive Conversion Strategy](../../docs/COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md)
