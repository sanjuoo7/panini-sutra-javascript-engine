# Sutra 1.2.7: मृडमृदगुधकुषक्लिशवदवसः क्त्वा

## Overview

**Sanskrit Text**: `मृडमृदगुधकुषक्लिशवदवसः क्त्वा`  
**Transliteration**: mṛḍamṛdagudha kuṣakliśavadavasaḥ ktvā  
**Translation**: The affix क्त्वा becomes कित् after the roots मृड्, मृद्, गुध्, कुष्, क्लिश्, वद्, and वस्.

## Purpose

This sutra specifies a morphological exception where the absolutive affix क्त्वा (ktvā) gains the special designation of कित् (kit) when it follows seven specific verbal roots. This kit designation is crucial because it blocks guṇa and vṛddhi transformations of the root, affecting accent placement and other morphological operations.

The seven roots specified are:
- **मृड्** (mṛḍ) - to be gracious, to show mercy
- **मृद्** (mṛd) - to squeeze, to crush  
- **गुध्** (gudh) - to wrap up, to conceal
- **कुष्** (kuṣ) - to tear, to drag
- **क्लिश्** (kliś) - to suffer, to torment
- **वद्** (vad) - to speak, to say
- **वस्** (vas) - to dwell, to reside

## Implementation

### Function Signature
```javascript
function isKitByKtvāSpecialRoots(root, affix, context = {}) {
    // Determines if क्त्वा becomes कित् after special roots
}
```

### Key Features
- Identification of the seven special roots in both Devanagari and IAST scripts
- Recognition of क्त्वा and त्वा affix variants
- Cross-script compatibility (mixed Devanagari/IAST inputs)
- Comprehensive morphological effect analysis
- Traditional example generation with explanations

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord` for input validation
- **Verb Analysis**: `analyzeAffix` for affix classification integration
- **Shared Functions**: Script detection and validation utilities

## Usage Examples

### Basic Usage
```javascript
import { 
  isKitByKtvāSpecialRoots,
  isKitKtvāRoot,
  analyzeKitKtvāApplication 
} from './index.js';

// Example 1: Basic kit designation check
const result1 = isKitByKtvāSpecialRoots('मृड्', 'क्त्वा');
console.log(result1); // true - क्त्वा becomes कित् after मृड्

// Example 2: Non-special root
const result2 = isKitByKtvāSpecialRoots('गम्', 'क्त्वा');
console.log(result2); // false - गम् is not in the special list

// Example 3: IAST script
const result3 = isKitByKtvāSpecialRoots('vad', 'ktvā');
console.log(result3); // true - vad is a special root
```

### Advanced Usage
```javascript
// Detailed morphological analysis
const analysis = analyzeKitKtvāApplication('वद्', 'क्त्वा');
console.log(analysis.analysis.becomesKit); // true
console.log(analysis.analysis.morphologicalEffects); 
// ['Blocks guṇa transformation of the root', 'Affects accent placement', ...]

// Example showing the blocking effect
console.log(analysis.analysis.examples[0]);
// { form: 'वदित्वा', meaning: 'having spoken', 
//   explanation: 'क्त्वा becomes कित्, no guṇa of root' }
// This prevents वद् → वाद् transformation that would normally occur

// Mixed script support
const mixedResult = isKitByKtvāSpecialRoots('मृड्', 'ktvā');
console.log(mixedResult); // true - works across scripts
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 85+ tests covering:
- Recognition of all seven special roots in both scripts
- क्त्वा affix identification and variants
- Main kit designation logic with positive and negative cases
- Detailed morphological analysis and traditional examples
- Input validation and error handling
- Cross-script compatibility
- Integration scenarios with all root combinations

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.2.7

# Run with coverage
npm test sutras/1.2.7 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validate Sanskrit inputs using `validateSanskritWord`
2. **Script Detection**: Identify Devanagari vs IAST using `detectScript`
3. **Affix Recognition**: Check if affix is क्त्वा or त्वा variant
4. **Root Verification**: Verify root is among the seven special roots
5. **Kit Designation**: Apply kit designation if both conditions are met
6. **Effect Analysis**: Generate morphological effects and traditional examples

### Performance
- **Time Complexity**: O(1) - Uses Set lookups for root and affix identification
- **Space Complexity**: O(1) - Constant space for predefined root lists
- **Optimization Notes**: Pre-computed sets for fast lookup, early validation exits

### Edge Cases
- **Mixed Scripts**: Handles Devanagari root with IAST affix and vice versa
- **Similar Roots**: Distinguishes between special roots and similar non-special ones (e.g., मृज् vs मृड्)
- **Affix Variants**: Recognizes both क्त्वा and त्वा forms
- **Whitespace**: Handles leading/trailing whitespace in inputs

## Integration

### Related Sutras
- **Sutra 1.1.5 (क्ङिति च)**: This sutra establishes the general principle that kit-marked affixes block guṇa/vṛddhi
- **Sutra 1.2.2 (विधिषु च)**: General framework for special affix designations
- **Sutra 3.4.21 (समानकर्तृकयोः पूर्वकाले)**: Uses क्त्वा for simultaneous actions

### Used By
- Morphological analysis modules that need to determine when guṇa/vṛddhi should be blocked
- Accent placement algorithms that depend on kit designation
- Word formation modules using absolutive constructions

## References

- **Panini's Ashtadhyayi**: Sutra 1.2.7
- **Implementation Notes**: The implementation adheres to the `COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md` and leverages shared `sanskrit-utils` for robust script detection and validation
- **Test References**: Test cases are based on traditional Sanskrit grammar examples showing the blocking of guṇa transformations, ensuring accurate morphological analysis

---

*Generated from template: SUTRA_README_TEMPLATE.md*
