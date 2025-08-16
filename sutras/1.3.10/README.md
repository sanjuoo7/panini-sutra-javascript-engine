# Sutra 1.3.10: यथासंख्यमनुदेशः (yathāsaṅkhyamanudeśaḥ)

## Sanskrit Text
यथासंख्यमनुदेशः

## Transliteration
yathāsaṅkhyamanudeśaḥ

## English Translation
"Correspondence (rules apply) according to number"

## Description
This foundational sutra establishes the principle of sequential correspondence in Sanskrit grammar. When multiple elements are enumerated in grammatical rules, they correspond to each other in the order they are presented (first with first, second with second, etc.).

This sutra provides the systematic framework for ordered correspondence in various grammatical operations, ensuring that elements map correctly according to their positional sequence.

## Type
Sequential correspondence rule (अनुदेश)

## Dependencies
This sutra operates independently but is frequently applied in conjunction with other grammatical rules that involve multiple elements.

## Technical Implementation

### Functions

#### `applySequentialCorrespondence(sourceElements, targetElements, options)`
Creates sequential correspondence mappings between two arrays of elements.

**Parameters:**
- `sourceElements` (Array): Source elements to map
- `targetElements` (Array): Target elements to map to
- `options` (Object): Configuration options
  - `context` (string): Grammatical context
  - `allowPartialMapping` (boolean): Allow incomplete mappings
  - `cyclicMapping` (boolean): Enable cyclic correspondence for excess elements

**Returns:**
```javascript
{
  success: boolean,
  correspondences: Array,
  unmappedSource: Array,
  unmappedTarget: Array,
  isComplete: boolean,
  mappingType: string,
  context: string,
  rule: string
}
```

#### `analyzeCorrespondence(elements, options)`
Analyzes elements for correspondence requirements and linguistic properties.

**Parameters:**
- `elements` (Array): Elements to analyze
- `options` (Object): Analysis options with context

**Returns:**
```javascript
{
  success: boolean,
  elements: Array,
  elementCount: number,
  sanskritElements: Array,
  otherElements: Array,
  hasSequentialStructure: boolean,
  requiresCorrespondence: boolean,
  context: string,
  rule: string
}
```

#### `createCorrespondenceMapping(sourceList, targetList, context)`
Creates comprehensive correspondence mapping with linguistic analysis.

**Parameters:**
- `sourceList` (Array): Source elements (roots, stems, etc.)
- `targetList` (Array): Target elements (affixes, endings, etc.)
- `context` (Object): Grammatical context with mapping options

**Returns:**
Complete mapping result with enhanced linguistic analysis and script detection.

### Usage Examples

```javascript
import { applySequentialCorrespondence, analyzeCorrespondence, createCorrespondenceMapping } from './index.js';

// Basic sequential correspondence
const roots = ['gam', 'as', 'bhū'];
const endings = ['ti', 'anti', 'ati'];
const result = applySequentialCorrespondence(roots, endings);
console.log(result.correspondences);
// [
//   { sourceIndex: 0, targetIndex: 0, sourceElement: 'gam', targetElement: 'ti', rule: '1.3.10' },
//   { sourceIndex: 1, targetIndex: 1, sourceElement: 'as', targetElement: 'anti', rule: '1.3.10' },
//   { sourceIndex: 2, targetIndex: 2, sourceElement: 'bhū', targetElement: 'ati', rule: '1.3.10' }
// ]

// Handling unequal arrays
const moreRoots = ['gam', 'as', 'bhū', 'kṛ'];
const fewerEndings = ['ti', 'anti'];
const partialResult = applySequentialCorrespondence(moreRoots, fewerEndings);
console.log(partialResult.unmappedSource); // [{ index: 2, element: 'bhū' }, { index: 3, element: 'kṛ' }]

// Cyclic mapping for excess elements
const cyclicResult = applySequentialCorrespondence(moreRoots, fewerEndings, { cyclicMapping: true });
console.log(cyclicResult.isComplete); // true

// Comprehensive correspondence mapping
const mapping = createCorrespondenceMapping(roots, endings, { type: 'verbal' });
console.log(mapping.correspondences[0].sourceScript); // 'IAST'
console.log(mapping.correspondences[0].scriptMatch); // true

// Element analysis
const analysis = analyzeCorrespondence(['गम्', 'अस्', 'भू']);
console.log(analysis.sanskritElements[0].script); // 'Devanagari'
```

## Script Support
- **IAST**: Full support for romanized Sanskrit
- **Devanagari**: Full support for native script
- **Mixed scripts**: Handles correspondence between different scripts
- **Non-Sanskrit**: Graceful handling of mixed element types

## Correspondence Types
- **Sequential**: Standard one-to-one positional mapping
- **Partial**: Handles unequal array lengths
- **Cyclic**: Repeats target elements for excess source elements
- **Enhanced**: Includes linguistic and script analysis

## Test Coverage
- Input validation and error handling
- Equal and unequal array correspondence
- Cyclic mapping functionality
- Sanskrit element detection and validation
- Mixed script handling
- Complex object and type support
- Linguistic analysis integration
- Context preservation

## Integration Notes
This sutra provides essential infrastructure for grammatical operations involving multiple elements. It integrates with:
- Verbal conjugation systems (root-ending correspondence)
- Nominal declension patterns (stem-case ending correspondence)
- Affix application rules
- Sound change operations

## Linguistic Accuracy
The implementation follows Panini's systematic approach to correspondence, ensuring that:
- Elements map according to their enumeration order
- Partial correspondences are handled gracefully
- Context-dependent variations are supported
- Script differences are preserved and analyzed

This sutra is fundamental to Sanskrit computational linguistics as it provides the framework for systematic element mapping that underlies many grammatical operations.
