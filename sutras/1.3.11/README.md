# Sutra 1.3.11: स्वरितेनाधिकारः (svaritena adhikāraḥ)

## Sanskrit Text
स्वरितेनाधिकारः

## Transliteration
svaritena adhikāraḥ

## English Translation
"There is authority/scope by means of svarita accent"

## Description
This crucial sutra establishes that elements marked with svarita accent possess special authority or extended scope in grammatical operations. The svarita accent serves as a meta-linguistic marker indicating that a rule, element, or operation should have broader application than would otherwise be indicated by its immediate context.

In Panini's system, the svarita accent functions as a scope expansion mechanism, allowing rules to extend their influence beyond their immediate grammatical environment.

## Type
Authority and scope determination rule (अधिकार)

## Dependencies
This sutra operates independently but interacts with accent-marked elements throughout the grammatical system.

## Technical Implementation

### Functions

#### `detectSvaritaAccent(text, options)`
Detects and analyzes svarita accent markings in Sanskrit text.

**Parameters:**
- `text` (string): Sanskrit text to analyze for svarita markings
- `options` (Object): Analysis configuration
  - `context` (string): Grammatical context for analysis

**Returns:**
```javascript
{
  success: boolean,
  text: string,
  script: string,
  context: string,
  svaritaMarkings: Array,
  hasExplicitSvarita: boolean,
  implicitAuthority: Object,
  totalSvaritaCount: number,
  rule: string
}
```

#### `applySvaritaAuthority(element, operation, options)`
Applies svarita accent authority to grammatical operations.

**Parameters:**
- `element` (string): Element to apply authority to
- `operation` (Object): Grammatical operation details
  - `type` (string): Operation type (substitution, elision, augmentation)
  - `scope` (Array): Base scope of the operation
- `options` (Object): Application options
  - `context` (string): Grammatical context
  - `forceAuthority` (boolean): Force authority regardless of markings
  - `extendScope` (boolean): Enable scope extension

**Returns:**
```javascript
{
  success: boolean,
  element: string,
  operation: Object,
  authorityLevel: string,
  scopeExtension: Array,
  authorityMetrics: Object,
  svaritaAnalysis: Object,
  hasAuthority: boolean,
  context: string,
  rule: string
}
```

#### `analyzeAuthorityScope(elements, ruleContext)`
Analyzes overall authority scope for collections of grammatical elements.

**Parameters:**
- `elements` (Array): Elements to analyze for collective authority
- `ruleContext` (Object): Rule context information

**Returns:**
Comprehensive authority analysis including element classification, authority ratios, and dominant authority determination.

### Usage Examples

```javascript
import { detectSvaritaAccent, applySvaritaAuthority, analyzeAuthorityScope } from './index.js';

// Detect explicit svarita markings
const result1 = detectSvaritaAccent('a`gni');
console.log(result1.hasExplicitSvarita); // true
console.log(result1.svaritaMarkings[0]);
// {
//   position: 0,
//   vowel: 'a',
//   accent: 'svarita',
//   representation: 'a`',
//   type: 'explicit'
// }

// Detect circumflex svarita notation
const result2 = detectSvaritaAccent('âgni');
console.log(result2.svaritaMarkings[0].type); // 'circumflex'

// Apply authority to grammatical operations
const element = 'a`gni';
const operation = { type: 'substitution', scope: ['base'] };
const authority = applySvaritaAuthority(element, operation);
console.log(authority.authorityLevel); // 'explicit'
console.log(authority.scopeExtension); // ['base', 'adjacent_elements', 'compound_members']

// Different operation types with scope extension
const elision = applySvaritaAuthority(element, { type: 'elision' });
console.log(elision.scopeExtension); // [..., 'related_phonemes', 'contextual_environment']

// Force authority for elements without explicit markings
const forced = applySvaritaAuthority('simple', operation, { forceAuthority: true });
console.log(forced.hasAuthority); // true

// Analyze authority in element collections
const elements = ['a`gni', 'simple', 'râma', 'test'];
const scope = analyzeAuthorityScope(elements);
console.log(scope.authorityRatio); // 0.5 (2/4 elements have authority)
console.log(scope.overallAuthorityLevel); // 'partial' or 'dominant'

// Detect implicit authority from technical terms
const implicit = detectSvaritaAccent('adhikara pratyaya', { context: 'authority' });
console.log(implicit.implicitAuthority.hasImplicitAuthority); // true
```

## Svarita Accent Representations

### IAST (Roman)
- **Explicit**: `a`gni` (grave accent after vowel)
- **Circumflex**: `âgni` (circumflex on vowel)

### Devanagari
- **Combining**: अ̀ग्नि (combining grave accent ◌̀)

### Authority Types
- **Explicit**: Marked with svarita accent
- **Implicit**: Technical terms with inherent authority
- **Forced**: Programmatically assigned authority

## Scope Extension Patterns

### By Operation Type
- **Substitution**: `adjacent_elements`, `compound_members`
- **Elision**: `related_phonemes`, `contextual_environment`  
- **Augmentation**: `stem_variants`, `derived_forms`
- **Default**: `extended_context`

### Authority Metrics
- **Strength**: 1.0 (explicit), 0.7 (implicit), 0.0 (none)
- **Scope**: Number of extended scope elements
- **Count**: Number of svarita markings detected

## Script Support
- **IAST**: Full support for backtick and circumflex notations
- **Devanagari**: Support for combining accent marks
- **Mixed**: Graceful handling of mixed script texts
- **Fallback**: Assumes IAST for texts with accent markings

## Test Coverage
- Explicit and implicit svarita detection
- Multiple accent notation systems
- Authority application with scope extension
- Operation-specific scope patterns
- Element collection analysis
- Error handling and edge cases
- Script detection and fallback handling

## Integration Notes
This sutra provides essential infrastructure for:
- Rule scope determination in grammatical operations
- Authority-based decision making in ambiguous contexts
- Hierarchical rule application systems
- Meta-linguistic markup interpretation

## Linguistic Accuracy
The implementation follows traditional Sanskrit grammatical principles where:
- Svarita accent indicates extended authority
- Authority can be explicit (marked) or implicit (contextual)
- Scope extension follows systematic patterns based on operation types
- Authority strength affects rule precedence and application scope

This sutra is fundamental to understanding Panini's hierarchical rule system and provides the computational framework for authority-based grammatical processing.
