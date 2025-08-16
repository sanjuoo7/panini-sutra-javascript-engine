# Sutra 1.3.12: अनुदात्तङित आत्मनेपदम् (anudāttaṅita ātmanepadam)

## Sanskrit Text
अनुदात्तङित आत्मनेपदम्

## Transliteration
anudāttaṅita ātmanepadam

## English Translation
"(Roots that are) anudātta-accented or ṅit-marked (take) ātmanepada (endings)"

## Brief Description
This sutra establishes the fundamental rule for ātmanepada voice assignment in Sanskrit. Verbal roots that have anudātta accent or are marked with the ṅit marker (ङित्) take ātmanepada endings rather than parasmaipada endings. This determines the voice system that affects verb conjugation patterns throughout Sanskrit grammar.

## Technical Implementation

### Core Functions

#### `detectAnudattaAccent(expression, script)`
Detects anudātta accent markers in Sanskrit expressions.

**Parameters:**
- `expression` (string): Sanskrit text to analyze
- `script` (string): Script type (IAST/Devanagari)

**Returns:**
Object containing:
- `hasAnudatta` (boolean): Presence of anudātta accent
- `anudattaPositions` (array): Locations of accent markers
- `confidence` (number): Detection confidence score
- `accentPattern` (string): Detected accent pattern type

#### `detectNgitMarker(expression, script)`
Identifies ṅit markers in Sanskrit roots and words.

**Parameters:**
- `expression` (string): Sanskrit expression to check
- `script` (string): Script type for processing

**Returns:**
Object containing:
- `hasNgit` (boolean): Presence of ṅit marker
- `ngitPositions` (array): Marker locations
- `confidence` (number): Detection confidence
- `markerType` (string): Type of ṅit marker found

#### `determineAtmanepada(expression, options = {})`
Determines ātmanepada voice assignment based on accent and marker analysis.

**Parameters:**
- `expression` (string): Sanskrit verbal form or root
- `options` (object): Analysis configuration
  - `includeAnalysis` (boolean): Include detailed analysis
  - `context` (string): Grammatical context

**Returns:**
Object containing:
- `success` (boolean): Analysis success status
- `isAtmanepada` (boolean): Ātmanepada voice assignment
- `reasons` (array): Factors determining the assignment
- `confidence` (number): Assignment confidence score
- `anudattaAnalysis` (object): Accent analysis results
- `ngitAnalysis` (object): Marker analysis results
- `traditionalClassification` (string): Classical grammatical category

#### `applyAtmanepadaEndings(expression, options = {})`
Applies appropriate ātmanepada endings to verbal forms.

**Parameters:**
- `expression` (string): Base verbal form
- `options` (object): Application options
  - `tense` (string): Tense/mood specification
  - `person` (string): Grammatical person
  - `number` (string): Grammatical number

**Returns:**
Object containing:
- `success` (boolean): Application success
- `modifiedForm` (string): Form with ātmanepada endings
- `appliedEndings` (array): Specific endings applied
- `voiceAssignment` (string): Confirmed voice assignment

## Accent and Marker Detection

### Anudātta Accent Patterns
- **IAST notation**: Underscore (_) marking low tone
- **Traditional patterns**: Absence of udātta (high tone) markers
- **Contextual detection**: Relative accent positioning

### Ṅit Marker Identification
- **Direct markers**: Explicit ṅ indicators
- **Morphological clues**: Root structure patterns
- **Traditional classifications**: Based on grammatical treatises

## Voice Assignment Logic

### Ātmanepada Conditions
1. **Anudātta accent**: Root has low tone marking
2. **Ṅit marker**: Root is marked with ṅit indicator
3. **Combined criteria**: Both accent and marker present

### Confidence Scoring
- **High confidence (0.8-1.0)**: Clear accent/marker indicators
- **Medium confidence (0.5-0.8)**: Partial or contextual evidence
- **Low confidence (0.0-0.5)**: Ambiguous or unclear patterns

## Usage Examples

### Basic Voice Determination
```javascript
import { determineAtmanepada } from './sutras/1.3.12/index.js';

// Anudātta root analysis
const anudattaResult = determineAtmanepada('kr̥_');
console.log(anudattaResult.isAtmanepada); // true
console.log(anudattaResult.reasons); // ['anudatta_accent']

// Ṅit marker analysis
const ngitResult = determineAtmanepada('labh', { context: 'traditional' });
console.log(ngitResult.isAtmanepada); // Based on traditional classification
```

### Accent Detection
```javascript
import { detectAnudattaAccent } from './sutras/1.3.12/index.js';

const accentResult = detectAnudattaAccent('kr̥_ṇoti', 'IAST');
console.log(accentResult.hasAnudatta); // true
console.log(accentResult.anudattaPositions); // [2] (position of _)
console.log(accentResult.confidence); // 0.9
```

### Marker Detection
```javascript
import { detectNgitMarker } from './sutras/1.3.12/index.js';

const markerResult = detectNgitMarker('labh', 'IAST');
console.log(markerResult.hasNgit); // Based on traditional classification
console.log(markerResult.confidence); // Varies based on evidence
```

### Ending Application
```javascript
import { applyAtmanepadaEndings } from './sutras/1.3.12/index.js';

const endingResult = applyAtmanepadaEndings('labh', {
  tense: 'present',
  person: 'third',
  number: 'singular'
});

console.log(endingResult.modifiedForm); // 'labhate'
console.log(endingResult.appliedEndings); // ['te']
```

### Comprehensive Analysis
```javascript
const fullAnalysis = determineAtmanepada('kr̥_', {
  includeAnalysis: true,
  context: 'verbal'
});

console.log(fullAnalysis.anudattaAnalysis.hasAnudatta); // true
console.log(fullAnalysis.ngitAnalysis.hasNgit); // false
console.log(fullAnalysis.traditionalClassification); // 'anudatta_root'
console.log(fullAnalysis.confidence); // 0.8
```

## Dependencies
- `detectScript` from `sanskrit-utils` for multi-script support
- Input validation and sanitization utilities
- Traditional Sanskrit accent and marker databases

## Grammatical Integration
This sutra directly affects:
- **Verb conjugation**: Determines ending selection (-te vs -ti series)
- **Voice semantics**: Influences reflexive and middle voice meanings
- **Syntactic patterns**: Affects argument structure and case assignments
- **Morphological derivation**: Impacts secondary derivations from roots

## Traditional Classifications
The implementation recognizes classical root categories:
- **Anudātta roots**: Traditionally low-accented roots
- **Ṅit roots**: Roots marked in traditional grammars
- **Mixed categories**: Roots with contextual voice variation
- **Exception handling**: Special cases and irregular patterns

## Performance Characteristics
- **Time Complexity**: O(n) for expression length
- **Space Complexity**: O(1) for analysis structures  
- **Script Support**: Full IAST and Devanagari compatibility
- **Accuracy**: High precision for traditional Sanskrit patterns

## Linguistic Accuracy
Follows authentic Pāṇinian principles:
- Recognizes traditional accent classifications
- Maintains consistency with classical grammar texts
- Supports contextual voice determination
- Handles irregular and exceptional cases

## Error Handling
- Invalid input validation
- Script detection failures
- Ambiguous accent/marker cases
- Graceful degradation for uncertain patterns

## Test Coverage
- **Comprehensive testing**: 31 test cases covering all functionality
- **Accent detection**: Multiple accent pattern types
- **Marker identification**: Various ṅit marker contexts
- **Voice assignment**: Traditional and contextual determination
- **Edge cases**: Invalid inputs, ambiguous patterns, script issues
- **Integration**: Consistency between analysis functions

This sutra provides the foundation for accurate ātmanepada voice assignment in Sanskrit computational grammar, enabling proper verb conjugation and semantic interpretation based on traditional grammatical principles.
