# Sutra 1.2.25: तृषिमृषिकृशेः काश्यपस्य

## Overview

**Sanskrit Text**: `तृषिमृषिकृशेः काश्यपस्य`  
**Transliteration**: tṛṣi-mṛṣi-kṛśeḥ kāśyapasya  
**Translation**: According to ऋषि काश्यप, (सेट् क्त्वा is optionally कित्) after तृष्, मृष्, and कृश्

## Purpose

This अतिदेश (exception) sutra represents a difference of opinion among ancient Sanskrit grammarians. According to ऋषि काश्यप, the सेट् क्त्वा affix should optionally be prevented from receiving कित् designation when it follows the specific roots तृष् (to be thirsty), मृष् (to sprinkle), and कृश् (to become lean).

## Implementation

### Function Signature
```javascript
function sutra1225(word, context = {}) {
    // Main implementation with optional Kashyapa opinion application
}
```

### Key Features
- Identification of three specific roots: तृष्, मृष्, कृश्
- Detection of सेट् क्त्वा affixes (क्त्वा with iṭ augment)
- Optional application based on Kashyapa's grammatical opinion
- Cross-script compatibility (Devanagari and IAST)
- Comprehensive morphological effect analysis

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord` for input validation
- **Kit Analysis**: `hasSetAugment`, `isKtvAffix` for morphological analysis
- **Shared Functions**: Part of the अतिदेश exception sequence (1.2.22-1.2.26)

## Usage Examples

### Basic Usage
```javascript
import { 
  sutra1225,
  analyzeKashyapaException,
  isKashyapaRoot,
  getKashyapaExamples 
} from './index.js';

// Example 1: Basic application with Kashyapa opinion
const result1 = sutra1225('तर्षित्वा', {
  root: 'तृष्',
  affix: 'इक्त्वा',
  hasSetAugment: true,
  applyKashyapaOpinion: true
});
console.log(result1.applicable); // true
console.log(result1.explanation); // "According to ऋषि काश्यप's opinion..."

// Example 2: Check if root qualifies
const isKashyapa = isKashyapaRoot('मृष्');
console.log(isKashyapa); // true

// Example 3: Detailed analysis
const analysis = analyzeKashyapaException('कृश्', 'इक्त्वा', {
  hasSetAugment: true,
  applyKashyapaOpinion: true
});
console.log(analysis.preventsKit); // true
console.log(analysis.isOptional); // true
```

### Advanced Usage
```javascript
// Check all three Kashyapa roots
const examples = getKashyapaExamples('iast');
examples.forEach(example => {
  console.log(`${example.root} + ${example.affix} = ${example.combination}`);
  console.log(`Meaning: ${example.meaning}`);
  console.log(`Effect: ${example.kashyapaEffect}`);
});

// Conditional application based on tradition
const traditionalAnalysis = analyzeKashyapaException('tṛṣ', 'iktvā', {
  hasSetAugment: true,
  applyKashyapaOpinion: false  // Don't apply Kashyapa's opinion
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 45 tests covering:
- Root identification (तृष्, मृष्, कृश् and variants)
- सेट् क्त्वा affix detection
- Optional कित् prevention logic
- Kashyapa opinion application
- Cross-script compatibility
- Error handling and edge cases
- Integration with अतिदेश patterns

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.25

# Run with coverage
npm test sutras/1.2.25 --coverage
```

## Technical Details

### Algorithm
1. **Root Validation**: Check if root is one of तृष्/मृष्/कृश्
2. **Affix Analysis**: Verify affix is सेट् क्त्वा (क्त्वा with iṭ augment)
3. **Opinion Application**: Apply Kashyapa's optional rule if conditions are met
4. **Effect Determination**: Decide whether to prevent कित् designation

### Performance
- **Time Complexity**: O(1) - Direct lookup in predefined sets
- **Space Complexity**: O(1) - Constant space for root variants
- **Optimization Notes**: Uses Set-based lookups for root identification

### Edge Cases
- Root variants (तृष/तर्ष्, मृष/मर्ष्, कृश/कर्श्) are handled
- Optional rule application (विकल्प) is properly modeled
- Cross-script consistency between Devanagari and IAST
- Integration with other अतिदेश exception rules

## Integration

### Related Sutras
- **1.2.18**: न क्त्वा सेट् (base rule that this sutra creates exception to)
- **1.2.22**: पूङः क्त्वा च (previous अतिदेश exception)
- **1.2.23**: नोपधात्थफान्ताद्वा (following अतिदेश exception)
- **1.2.24**: वञ्चिलुञ्च्यृतश्च (following अतिदेश exception)

### Used By
- Morphological analysis systems requiring अतिदेश exception handling
- Sanskrit grammar engines implementing traditional scholarly opinions
- Academic tools studying differences in grammatical traditions

## Grammatical Context

### Traditional Commentary
This sutra represents ऋषि काश्यप's minority opinion against the general rule. In traditional Sanskrit grammar, such differences of opinion (मतभेद) are carefully preserved and documented.

### Morphological Effects
When the exception applies:
- Prevents कित् designation of सेट् क्त्वा
- Blocks accent retraction
- Affects subsequent morphophonological operations
- Maintains distinctions in verbal morphology

### Scholarly Significance
- Demonstrates the systematic nature of Paninian grammar
- Shows how minority opinions are incorporated
- Illustrates the optional (विकल्प) nature of certain rules
- Preserves historical grammatical traditions

## References

- **Panini's Ashtadhyayi**: 1.2.25
- **Traditional Commentary**: काश्यप ऋषि मत (Kashyapa's opinion)
- **Implementation Notes**: Follows अतिदेश pattern from sutras 1.2.22-1.2.24
- **Test References**: Classical examples from traditional grammar texts

---

*Generated from template: SUTRA_README_TEMPLATE.md*
