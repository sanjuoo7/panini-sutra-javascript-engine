# Sutra 1.3.9: तस्य लोपः (tasya lopaḥ)

## Sanskrit Text
तस्य लोपः

## Transliteration
tasya lopaḥ

## English Translation
"Of this (it-marker), there is elision/deletion"

## Description
This fundamental sutra prescribes the deletion or elision of it-markers (इत्) that have been identified by the previous sutras (1.3.2-1.3.8). It serves as the general rule that all elements marked as 'it' should be deleted from the final grammatical form.

The term "tasya" refers back to the it-markers defined in earlier sutras, establishing a clear dependency chain in Panini's systematic approach to Sanskrit grammar.

## Type
General elision rule (लोप)

## Dependencies
- **Sutra 1.3.2**: उपदेशेऽजनुनासिक इत् (Initial vowels in teaching forms are it)
- **Sutra 1.3.3**: हलन्त्यम् (Final consonants are it)
- **Sutra 1.3.4**: न विभक्तौ (Not in case endings)
- **Sutra 1.3.5**: आदिर्ञिटुडवः (Initial ñi, ṭu, ḍu are it)
- **Sutra 1.3.6**: षः प्रत्ययस्य (ṣ of suffixes is it)
- **Sutra 1.3.7**: चुटू (cu and ṭu are it)
- **Sutra 1.3.8**: लशक्वतद्धिते (l, ś, k, v in certain suffixes are it)

## Technical Implementation

### Functions

#### `applyItElision(form, options)`
Applies it-marker elision to specified markers.

**Parameters:**
- `form` (string): Sanskrit form containing it-markers
- `options` (Object): Configuration options
  - `itMarkers` (Array): Specific it-markers to remove
  - `context` (string): Grammatical context

**Returns:**
```javascript
{
  success: boolean,
  originalForm: string,
  processedForm: string,
  script: string,
  removedItMarkers: Array,
  context: string,
  elisionApplied: boolean,
  rule: string
}
```

#### `checkItElision(form, options)`
Analyzes a form for potential it-markers based on previous sutra patterns.

**Parameters:**
- `form` (string): Sanskrit form to analyze
- `options` (Object): Analysis options

**Returns:**
```javascript
{
  success: boolean,
  form: string,
  script: string,
  context: string,
  potentialItMarkers: Array,
  shouldElide: boolean
}
```

#### `integratedItElision(form, context)`
Combines it-marker detection and elision in a single operation.

**Parameters:**
- `form` (string): Form to process
- `context` (Object): Grammatical context

**Returns:**
Complete analysis and elision result with context preservation.

### Usage Examples

```javascript
import { applyItElision, checkItElision, integratedItElision } from './index.js';

// Apply specific it-marker removal
const result1 = applyItElision('ñivas', { itMarkers: ['ñi'] });
console.log(result1.processedForm); // 'vas'

// Check for potential it-markers
const analysis = checkItElision('ñivas');
console.log(analysis.potentialItMarkers); // [{ marker: 'ñi', type: 'initial_sequence', sutra: '1.3.5' }, ...]

// Integrated analysis and elision
const integrated = integratedItElision('ñivas');
console.log(integrated.processedForm); // 'va' (both ñi and s removed)

// Devanagari support
const devResult = applyItElision('ञिवस्', { itMarkers: ['ञि'] });
console.log(devResult.processedForm); // 'वस्'
```

## Script Support
- **IAST**: Full support for romanized Sanskrit
- **Devanagari**: Full support for native script

## Test Coverage
- Input validation and error handling
- Specified it-marker removal
- Multiple marker processing
- Script detection and handling
- Integration framework testing
- Context preservation
- Edge cases and error conditions

## Integration Notes
This sutra provides the framework for integration with the preceding it-marker identification sutras (1.3.2-1.3.8). The implementation supports both explicit it-marker specification and automatic detection based on established patterns.

## Linguistic Accuracy
The implementation follows traditional Sanskrit grammatical principles where it-markers are metalinguistic elements that guide grammatical operations but are not part of the final linguistic form. The elision process maintains the phonological integrity of the remaining elements.
