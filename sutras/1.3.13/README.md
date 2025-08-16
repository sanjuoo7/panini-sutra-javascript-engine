# Sutra 1.3.13: भावकर्म्मणोः (bhāvakarmaṇoḥ)

## Sanskrit Text
भावकर्म्मणोः

## Transliteration
bhāvakarmaṇoḥ

## English Translation
"Of bhāva and karma"

## Brief Description
This sutra provides comprehensive semantic analysis for distinguishing between bhāva (action/state) and karma (object) in Sanskrit expressions. It enables identification of semantic categories that determine grammatical voice, case assignments, and syntactic structures based on the inherent meaning of words and constructions.

## Technical Implementation

### Core Functions

#### `analyzeSemanticMeaning(expression, options = {})`
Analyzes Sanskrit expressions to detect bhāva and karma semantic indicators.

**Parameters:**
- `expression` (string): Sanskrit expression to analyze
- `options` (object): Configuration options
  - `analysisDepth` ('basic'|'detailed'): Level of semantic feature extraction
  - `context` (string): Grammatical context for analysis

**Returns:**
Object containing:
- `success` (boolean): Analysis success status
- `expression` (string): Original expression
- `script` (string): Detected script type
- `bhavaAnalysis` (object): Bhāva indicators and strength
- `karmaAnalysis` (object): Karma indicators and strength
- `dominantSemantic` (object): Primary semantic category
- `semanticFeatures` (object): Additional linguistic features
- `hasBhava` (boolean): Presence of bhāva indicators
- `hasKarma` (boolean): Presence of karma indicators

#### `applySemanticRules(expression, semanticAnalysis, grammaticalContext = {})`
Applies grammatical rules based on semantic analysis results.

**Parameters:**
- `expression` (string): Sanskrit expression
- `semanticAnalysis` (object): Result from analyzeSemanticMeaning
- `grammaticalContext` (object): Additional grammatical context

**Returns:**
Object containing:
- `success` (boolean): Rule application success
- `applicableRules` (array): Rules that apply to the expression
- `ruleApplications` (array): Specific rule applications
- `grammaticalContext` (object): Preserved context

#### `comprehensiveBhavaKarmaAnalysis(expression, options = {})`
Performs complete semantic analysis with optional rule application.

**Parameters:**
- `expression` (string): Sanskrit expression to analyze
- `options` (object): Analysis configuration
  - `analysisDepth` ('basic'|'detailed'): Analysis depth
  - `applyRules` (boolean): Whether to apply grammatical rules
  - `grammaticalContext` (object): Context for rule application

**Returns:**
Object containing:
- `success` (boolean): Overall analysis success
- `semanticAnalysis` (object): Semantic analysis results
- `ruleApplication` (object|null): Rule application results
- `overallClassification` (string): Primary semantic category
- `confidence` (number): Analysis confidence score
- `applicableRules` (array): All applicable rules
- `recommendations` (array): Usage recommendations

## Semantic Categories

### Bhāva (Action/State)
Indicators include:
- **Morphological**: -tva, -tā, bhāva, kriyā suffixes
- **Semantic**: Action concepts, state descriptions
- **Contextual**: Verbal contexts, abstract references

### Karma (Object)
Indicators include:
- **Morphological**: karma, viṣaya, pada, artha patterns
- **Semantic**: Object references, concrete entities
- **Contextual**: Accusative constructions, direct objects

### Mixed Semantics
Expressions containing both bhāva and karma elements with balanced strength.

## Semantic Features (Detailed Analysis)

When `analysisDepth: 'detailed'` is specified:

- **hasVerbalNoun**: Detects -ti, -ana, -ya, -tva, -tā verbal derivatives
- **hasAbstractNoun**: Identifies abstract concept markers
- **hasConcreteNoun**: Recognizes concrete object patterns
- **hasTransitiveMarkers**: Finds transitivity indicators (kṛ, dā, labh, grah)
- **hasStateMarkers**: Locates state verb patterns (as, bhū, sthā)
- **hasAgentMarkers**: Identifies agent-oriented constructions

## Usage Examples

### Basic Semantic Analysis
```javascript
import { analyzeSemanticMeaning } from './sutras/1.3.13/index.js';

// Bhāva analysis
const bhavaResult = analyzeSemanticMeaning('gatitva bhāva kriyā');
console.log(bhavaResult.dominantSemantic.category); // 'bhāva'
console.log(bhavaResult.bhavaAnalysis.strength); // > 0

// Karma analysis
const karmaResult = analyzeSemanticMeaning('putraṃ karma viṣayam');
console.log(karmaResult.dominantSemantic.category); // 'karma'
console.log(karmaResult.karmaAnalysis.strength); // > 0
```

### Detailed Semantic Features
```javascript
const detailedResult = analyzeSemanticMeaning('gatitva kriyāṇi', {
  analysisDepth: 'detailed'
});

console.log(detailedResult.semanticFeatures.hasVerbalNoun); // true
console.log(detailedResult.semanticFeatures.hasAbstractNoun); // true
```

### Rule Application
```javascript
import { comprehensiveBhavaKarmaAnalysis } from './sutras/1.3.13/index.js';

const fullAnalysis = comprehensiveBhavaKarmaAnalysis('bhāva kriyā', {
  analysisDepth: 'detailed',
  applyRules: true,
  grammaticalContext: { voice: 'active' }
});

console.log(fullAnalysis.overallClassification); // 'bhāva'
console.log(fullAnalysis.ruleApplication.applicableRules); // Array of applicable rules
```

### Contextual Analysis
```javascript
const contextualResult = analyzeSemanticMeaning('kriyā', {
  context: 'verbal'
});

// Context influences bhāva strength
console.log(contextualResult.bhavaAnalysis.strength); // Enhanced by context
```

## Dependencies
- `detectScript` from `sanskrit-utils` for script detection
- Multi-script support (IAST, Devanagari)
- Input validation and sanitization utilities

## Rule Integration
This sutra works in conjunction with:
- **Voice assignment rules**: Determines ātmanepada vs parasmaipada based on semantic content
- **Case assignment rules**: Influences nominative vs accusative case selection
- **Syntactic structure rules**: Affects word order and construction patterns
- **Derivational morphology**: Guides suffix selection based on semantic categories

## Performance Characteristics
- **Time Complexity**: O(n) where n is expression length
- **Space Complexity**: O(1) for analysis structures
- **Script Support**: IAST and Devanagari with automatic detection
- **Error Handling**: Comprehensive input validation and graceful degradation

## Linguistic Accuracy
The implementation follows traditional Sanskrit semantic analysis principles:
- Recognizes classical bhāva-karma distinctions
- Supports compound analysis for complex expressions
- Maintains consistency with Pāṇinian grammatical theory
- Provides confidence scoring for uncertain cases

## Test Coverage
- **Basic functionality**: 30 comprehensive tests
- **Edge cases**: Invalid inputs, script detection, mixed semantics
- **Integration tests**: Consistency between analysis functions
- **Linguistic accuracy**: Traditional Sanskrit semantic patterns
- **Error handling**: Graceful degradation and error reporting
- **Performance**: Efficient pattern matching and feature extraction

This sutra enables sophisticated semantic analysis for Sanskrit computational linguistics, supporting accurate grammatical rule application based on inherent word meanings and construction patterns.
