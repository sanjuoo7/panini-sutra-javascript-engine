# Sutra 1.1.32: विभाषा जसि (vibhāṣā jasi)

## Text
**Sanskrit:** विभाषा जसि  
**IAST:** vibhāṣā jasi  
**Translation:** Their द्वन्द्व compounds are optionally सर्वनाम when the nominative plural termination जस् follows.

## Description
This sutra provides a specific condition under which सर्वादि words (words beginning with सर्व etc.) retain their सर्वनाम status even when in compound form. Normally, सर्वादि words lose their सर्वनाम status in compounds (as per sutras 1.1.29-31), but this sutra creates an exception.

## Key Elements
- **Scope:** Applies to द्वन्द्व (dvandva/copulative) compounds
- **Condition:** When followed by जस् (nominative plural ending)
- **Effect:** Optional (विभाषा) सर्वनाम status
- **Words affected:** सर्वादि words in द्वन्द्व compounds

## Rule Application

### When the sutra applies:
1. The compound must be द्वन्द्व type
2. The compound must contain सर्वादि words
3. The word must be followed by जस् (nominative plural ending)
4. The सर्वनाम status becomes optional (not mandatory)

### When the sutra does not apply:
1. Non-द्वन्द्व compounds
2. Other case endings (not nominative plural)
3. Compounds without सर्वादि words

## Examples

### Positive Examples (Sutra applies):
1. **सर्वविश्वाः** (sarvaviśvāḥ) - "all and universal (ones)" in nom. pl.
2. **पूर्वापराः** (pūrvāparāḥ) - "prior and posterior (ones)" in nom. pl.
3. **अन्यान्यतराः** (anyānyatarāḥ) - "other and another (ones)" in nom. pl.

### Negative Examples (Sutra does not apply):
1. **सर्वविश्वम्** (sarvaviśvam) - not nominative plural
2. **सर्वजनः** (sarvajanaḥ) - not द्वन्द्व compound (tatpuruṣa)
3. **रामकृष्णाः** (rāmakṛṣṇāḥ) - no सर्वादि words

## Technical Analysis

### Compound Type Detection
```javascript
// Check for द्वन्द्व compound
function isDvandvaCompound(compound) {
    return compound && compound.type === 'dvandva';
}
```

### Case Analysis
```javascript
// Check for nominative plural (jas)
function isNominativePlural(caseInfo) {
    return caseInfo && 
           caseInfo.vibhakti === 'prathama' && 
           caseInfo.vacana === 'bahuvacana';
}
```

### सर्वादि Words
The sutra applies to compounds containing any of these words:
- सर्व, विश्व, उभ, उभय
- अन्य, अन्यतर, इतर
- त्वत्, त्व, नेम, सम, सीम
- पूर्व, पर, अवर, दक्षिण, उत्तर, अपर, अधर

## Usage Example

```javascript
const context = {
    compound: {
        type: 'dvandva',
        parts: ['sarva', 'viśva']
    },
    case: {
        vibhakti: 'prathama',
        vacana: 'bahuvacana'
    }
};

const result = applySutra1_1_32('sarvaviśvāḥ', context);
// result.applies = true
// result.sarvanama_status = 'optional'
```

## Related Sutras
- **1.1.27:** सर्वादीनि सर्वनामानि (defines सर्वनाम)
- **1.1.29:** न बहुव्रीहौ (सर्वादि not सर्वनाम in बहुव्रीहि)
- **1.1.30:** तृतीयासमासे (सर्वादि not सर्वनाम in instrumental determinative)
- **1.1.31:** द्वन्द्वे च (सर्वादि not सर्वनाम in द्वन्द्व)

## Implementation Notes
- The optionality (विभाषा) means both सर्वनाम and non-सर्वनाम treatments are valid
- This creates an exception to the general rule in 1.1.31
- Proper compound type identification is crucial for correct application
