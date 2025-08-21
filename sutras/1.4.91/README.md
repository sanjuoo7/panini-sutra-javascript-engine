# Sutra 1.4.91: अभिरभागे

## Overview

**Sanskrit Text**: `अभिरभागे`  
**Transliteration**: abhirabhāge  
**Translation**: अभि (abhi) is कर्म-प्रवचनीय (karma-pravachaniya) in specific contexts

## Purpose

This sutra establishes the classification of the particle अभि (abhi) as कर्म-प्रवचनीय (karma-pravachaniya) when used in specific semantic contexts. Unlike other particles covered in previous sutras, अभि has a more limited scope for कर्म-प्रवचनीय classification, particularly regarding the भाग (division/share) meaning.

## Implementation

### Function Signature
```javascript
function sutra_1_4_91(input, context = {}, options = {}) {
    // Comprehensive karma-pravachaniya classification analysis
}
```

### Key Features
- **Multi-Script Support**: Processes both Devanagari (अभि) and IAST (abhi) input
- **Semantic Context Analysis**: Identifies four specific contexts for कर्म-प्रवचनीय classification
- **Confidence-Based Classification**: Uses weighted scoring for reliable classification
- **Comprehensive Integration**: Supports complex grammatical contexts and sutra chaining
- **Performance Optimized**: Efficient processing with detailed performance metrics

### Semantic Contexts for कर्म-प्रवचनीय Classification

1. **लक्षणे (lakṣaṇe)** - Direction/aim
   - Usage: "in the direction of", "aiming towards"
   - Weight: 0.8 (high confidence)

2. **इत्थंभूताख्यान (itthaṃbhūtākhyāna)** - Stating circumstances  
   - Usage: "as regards", "concerning", "about"
   - Weight: 0.7 (good confidence)

3. **भाग (bhāga)** - Division/share (limited scope)
   - Usage: "divided portion", "share of"
   - Weight: 0.6 (limited compared to other particles)

4. **वीप्सा (vīpsā)** - Pervasion
   - Usage: "throughout", "all over", "pervasive"
   - Weight: 0.8 (high confidence)

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Multi-script processing
  - `validation.js` - Input validation and sanitization
  - `phoneme-tokenization.js` - Phonemic analysis
- **Core Features**: Semantic context analysis, confidence scoring, performance tracking

## Usage Examples

### Basic Usage
```javascript
import sutra_1_4_91 from './index.js';

// Example 1: Directional context (लक्षणे)
const result1 = sutra_1_4_91('अभि', {
    semantic: ['direction', 'towards'],
    meaning: 'in the direction of the mountain'
});
console.log(result1.applied); // true
console.log(result1.classification.isKarmaPravachaniya); // true
console.log(result1.classification.semanticFunction); // 'लक्षणे (direction/aim)'

// Example 2: Circumstantial context (इत्थंभूताख्यान)
const result2 = sutra_1_4_91('abhi', {
    semantic: ['circumstance', 'regarding'],
    translation: 'concerning this matter'
});
console.log(result2.applied); // true
console.log(result2.classification.applicableContexts); // ['इत्थंभूताख्यान (stating circumstances)']

// Example 3: Pervasion context (वीप्सा)
const result3 = sutra_1_4_91('अभिः', {
    semantic: ['pervasion', 'throughout'],
    meaning: 'spreading all over'
});
console.log(result3.applied); // true
console.log(result3.classification.confidence); // > 0.8
```

### Advanced Usage
```javascript
// Complex linguistic analysis with multiple contexts
const complexResult = sutra_1_4_91('अभि गच्छति', {
    semantic: ['direction', 'aim'],
    syntacticRole: ['adverbial', 'modifier'],
    hasVerb: true,
    verbalContext: true,
    grammaticalContext: {
        caseContext: 'accusative',
        verbalRoot: 'gam',
        tense: 'present'
    }
});

console.log(complexResult.applied); // true
console.log(complexResult.contextualFactors.syntacticRole.classification); // 'कर्म-प्रवचनीय'
console.log(complexResult.semanticAnalysis.primaryContext.name); // 'लक्षणे (direction/aim)'

// Object input processing
const objectResult = sutra_1_4_91({
    word: 'abhi',
    morphology: 'indeclinable',
    function: 'particle'
}, {
    semantic: ['pervasion'],
    syntacticRole: ['modifier']
});

console.log(objectResult.metadata.inputFormat); // 'object'
console.log(objectResult.classification.isKarmaPravachaniya); // true

// Strict mode for higher confidence requirements
const strictResult = sutra_1_4_91('अभि', {
    semantic: ['direction'],
    strictMode: true  // Requires confidence > 0.7
});

console.log(strictResult.classification.confidence); // Must be > 0.7 for application
```

## Technical Details

### Algorithm Overview
1. **Input Processing**: Multi-format input handling with validation
2. **Script Analysis**: Devanagari/IAST detection and normalization
3. **Particle Recognition**: Pattern matching for अभि variants
4. **Semantic Analysis**: Context classification with weighted scoring
5. **Classification Decision**: Confidence-based कर्म-प्रवचनीय determination
6. **Integration**: Comprehensive result building with metadata

### Complexity
- **Time Complexity**: O(n) where n is input length
- **Space Complexity**: O(1) for analysis structures
- **Performance**: Optimized for real-time grammatical analysis

### Edge Cases Handled
- Multiple अभि occurrences in text
- Mixed script processing (Devanagari + IAST)
- Variant forms (अभिः, abhiḥ, etc.)
- Compound word containing अभि
- Context ambiguity resolution
- Insufficient semantic context scenarios

## Test Coverage

### Comprehensive Test Suite (10 Phases, 55+ Tests)
- ✅ **Phase 1**: Basic Application Tests (8 tests)
- ✅ **Phase 2**: Script Support Tests (6 tests)  
- ✅ **Phase 3**: Semantic Context Analysis Tests (6 tests)
- ✅ **Phase 4**: Object Input Processing Tests (4 tests)
- ✅ **Phase 5**: Integration and Context Tests (4 tests)
- ✅ **Phase 6**: Performance and Metadata Tests (4 tests)
- ✅ **Phase 7**: Error Handling Tests (4 tests)
- ✅ **Phase 8**: Edge Cases and Complex Scenarios (5 tests)
- ✅ **Phase 9**: Integration with Panini Grammar Framework (4 tests)
- ✅ **Phase 10**: Comprehensive Integration Tests (2 tests)

### Test Categories
- **Positive Cases**: All four semantic contexts (लक्षणे, इत्थंभूताख्यान, भाग, वीप्सा)
- **Negative Cases**: Missing contexts, non-अभि particles, invalid input
- **Script Variants**: Devanagari, IAST, mixed scripts, variant forms
- **Performance**: Response time, memory usage, large input handling
- **Error Handling**: Malformed input, missing properties, exceptions
- **Integration**: Complex contexts, sutra chaining, grammatical frameworks

## Integration

### Related Sutras
- **1.4.89-90**: Other कर्म-प्रवचनीय particles (प्रति, परि, अनु)
- **1.4.83-88**: General कर्म-प्रवचनीय classifications
- **1.4.57-82**: Broader grammatical term definitions

### Grammatical Framework Integration
- **Classification System**: Integrates with Paninian grammatical categories
- **Syntax Analysis**: Supports syntactic role determination
- **Semantic Processing**: Context-aware semantic analysis
- **Multi-Sutra Coordination**: Chainable with related classification sutras

### Usage in Larger Systems
```javascript
// Integration with grammatical analysis pipeline
const grammaticalAnalysis = {
    sutras: ['1.4.89', '1.4.90', '1.4.91'],
    particles: ['प्रति', 'परि', 'अभि'],
    classification: 'karma_pravachaniya_analysis'
};

const result = sutra_1_4_91('अभि', {
    semantic: ['direction'],
    chainedAnalysis: grammaticalAnalysis,
    dependencies: ['previous_sutra_results']
});
```

## References

### Source Texts
- **Pāṇini's Aṣṭādhyāyī**: 1.4.91 अभिरभागे
- **Kāśikā-vṛtti**: Commentary on अभि classification
- **Siddhānta-kaumudī**: Traditional explanation of कर्म-प्रवचनीय scope

### Linguistic Analysis
- **Semantic Contexts**: Four specific meanings requiring कर्म-प्रवचनीय classification
- **Scope Limitation**: अभि has more restricted भाग usage compared to प्रति/परि
- **Grammatical Function**: Role in Sanskrit syntax and semantics

### Modern Applications
- **Computational Grammar**: Sanskrit NLP and parsing systems
- **Educational Tools**: Interactive Sanskrit learning platforms
- **Research**: Digital humanities and linguistic analysis

---

*Implementation follows the systematic Phase 3a methodology with comprehensive testing, performance optimization, and integration capabilities. Designed for both standalone usage and integration with larger Sanskrit grammatical analysis systems.*
