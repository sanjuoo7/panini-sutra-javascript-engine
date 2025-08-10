# Sutra 1.1.33: प्रथमचरमतयाल्पार्धकतिपयनेमाश्च

## Text
**Sanskrit:** प्रथमचरमतयाल्पार्धकतिपयनेमाश्च  
**IAST:** prathamacaramatayālpārdhakatipayanemāśca  
**Translation:** And also the words प्रथम 'first', चरम 'last', words with the affix तय, अल्प 'few', अर्ध 'half', कतिपय 'some' and नेम 'half' are optionally सर्वनाम, before the Nominative Plural termination.

## Description
This sutra extends the optional sarvanama classification to a specific list of words when they appear before the nominative plural ending (jas). This is part of the broader rules governing when sarvaadi words retain their sarvanama status.

## Key Elements
- **Scope:** Specific words: प्रथम, चरम, तय-ending words, अल्प, अर्ध, कतिपय, नेम
- **Condition:** When followed by जस् (nominative plural ending)
- **Effect:** Optional (विभाषा implied) सर्वनाम status
- **Continuation:** Extends rules from 1.1.32

## Specified Words

### Direct words:
1. **प्रथम** (prathama) - "first"
2. **चरम** (carama) - "last" 
3. **अल्प** (alpa) - "few"
4. **अर्ध** (ardha) - "half"
5. **कतिपय** (katipaya) - "some"
6. **नेम** (nema) - "half"

### Words with तय affix:
Words formed with the affix तय (mentioned in 5.2.42: संख्याया अवयवे तयप्), such as:
- **द्वितय** (dvitaya) - "consisting of two"
- **त्रितय** (tritaya) - "consisting of three"
- **चतुष्टय** (catuṣṭaya) - "consisting of four"

## Rule Application

### When the sutra applies:
1. The word must be one of the specified words or have तय affix
2. The word must be followed by जस् (nominative plural ending)
3. The सर्वनाम status becomes optional

### When the sutra does not apply:
1. Words not in the specified list
2. Other case endings (not nominative plural)
3. Words without तय affix (for that category)

## Examples

### Positive Examples (Sutra applies):
1. **प्रथमाः** (prathamāḥ) - "the first ones" in nom. pl.
2. **चरमाः** (caramāḥ) - "the last ones" in nom. pl.
3. **अल्पाः** (alpāḥ) - "the few ones" in nom. pl.
4. **द्वितयाः** (dvitayāḥ) - "the pairs" in nom. pl.

### Negative Examples (Sutra does not apply):
1. **प्रथमम्** (prathamam) - not nominative plural
2. **द्वितीयाः** (dvitīyāḥ) - not in specified list (द्वितीय ≠ द्वितय)
3. **मध्यमाः** (madhyamāḥ) - not in specified list

## Technical Analysis

### Word Recognition
```javascript
const specified_words = [
    'prathama',   // प्रथम - first
    'carama',     // चरम - last  
    'alpa',       // अल्प - few
    'ardha',      // अर्ध - half
    'katipaya',   // कतिपय - some
    'nema'        // नेम - half
];
```

### Taya Affix Detection
```javascript
function hasTayaAffix(word, context) {
    // Check context for affix information
    if (context.affixes && context.affixes.includes('taya')) {
        return true;
    }
    
    // Check word pattern
    const taya_patterns = ['taya', 'tīya', 'tya'];
    return taya_patterns.some(pattern => word.includes(pattern));
}
```

## Usage Example

```javascript
const context = {
    case: {
        vibhakti: 'prathama',
        vacana: 'bahuvacana'
    }
};

const result = applySutra1_1_33('prathamāḥ', context);
// result.applies = true
// result.sarvanama_status = 'optional'
```

## Related Sutras
- **1.1.32:** विभाषा जसि (optional sarvanama in dvandva before jas)
- **1.1.27:** सर्वादीनि सर्वनामानि (defines सर्वनाम)
- **5.2.42:** संख्याया अवयवे तयप् (तय affix formation)

## Implementation Notes
- The optionality means both sarvanama and non-sarvanama treatments are valid
- Proper base word extraction is crucial for matching specified words
- तय affix detection requires both morphological and contextual analysis
- This rule works in conjunction with the general principles from earlier sutras
