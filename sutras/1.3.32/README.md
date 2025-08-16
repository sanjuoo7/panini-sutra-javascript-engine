# Sutra 1.3.32: गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः

## Overview

**Sanskrit Text**: `गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः`  
**Transliteration**: gandhanāvakṣepaṇasevanasāhasikayapratiayatnaprakathanopayogeṣu kṛñaḥ  
**Translation**: After the verb कृ when meaning 'to divulge', 'to revile', 'to serve', 'to use violence', 'to cause change', 'to recite' and 'to do an act tending to effect a desired purpose', the आत्मनेपद is used, even when the fruit of the action does not accrue to the agent.

## Purpose

This sutra establishes that the versatile verbal root कृ (kṛ, 'to do/make') takes Ātmanepada endings when used in specific semantic contexts. The seven contexts specified are: गन्धन (divulging secrets), अवक्षेपण (reviling/criticizing), सेवन (serving), साहसिक्य (violence/force), प्रतियत्न (causing change/effort), प्रकथन (recitation/narration), and उपयोग (purposeful utilization). This represents one of the most comprehensive semantic classification rules in Paninian grammar.

## Implementation

### Function Signature
```javascript
function determineSemanticKriAtmanepada(word, context = {}) {
    // Analyzes if कृ root in specified semantic contexts requires Ātmanepada
}
```

### Key Features
- **Seven Semantic Field Analysis**: Comprehensive detection of all seven specified semantic contexts
- **Advanced Root Recognition**: Robust identification of कृ root across morphological variations
- **Multi-Context Processing**: Simultaneous analysis of multiple semantic indicators
- **Script Universality**: Full support for both IAST and Devanagari input
- **Contextual Intelligence**: Deep semantic analysis with confidence assessment
- **Detailed Reporting**: Comprehensive analysis breakdown with specific context identification

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Semantic Analysis**: Internal semantic field classification functions
- **Root Detection**: Specialized कृ root identification utilities

## Usage Examples

### Basic Usage
```javascript
import { determineSemanticKriAtmanepada } from './index.js';

// Example 1: गन्धन context (divulging secrets)
const result1 = determineSemanticKriAtmanepada('करोति', {
    meaning: 'to reveal secrets',
    semanticContext: 'gandana'
});
console.log(result1); 
// { isSutra132Atmanepada: true, confidence: 0.9, analysis: '...', sutraApplied: '1.3.32' }

// Example 2: सेवन context (serving)
const result2 = determineSemanticKriAtmanepada('करते', {
    meaning: 'to serve',
    semanticContext: 'sevana'
});
console.log(result2);
// { isSutra132Atmanepada: true, confidence: 0.85, analysis: '...', sutraApplied: '1.3.32' }
```

### Advanced Usage
```javascript
// Multiple semantic contexts
const result3 = determineSemanticKriAtmanepada('प्रकुर्वते', {
    root: 'कृ',
    meaning: 'to recite extensively',
    semanticContext: 'prakathana',
    contextualClues: ['recitation', 'narration']
});

// साहसिक्य context (violence/force)
const result4 = determineSemanticKriAtmanepada('सकृत्', {
    meaning: 'to use force',
    semanticContext: 'sahasikya',
    violence: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 75 tests covering:
- All seven semantic contexts with representative examples
- कृ root detection across various morphological forms
- Script processing and conversion capabilities
- Contextual semantic analysis validation
- Edge cases including ambiguous semantic boundaries
- Integration testing with complex semantic scenarios
- Error handling for invalid inputs and contexts
- Confidence level validation across different scenarios

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.32

# Run with coverage
npm test sutras/1.3.32 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Multi-layer validation of word and context parameters
2. **Script Processing**: Script detection and normalization using `detectScript`
3. **Root Identification**: Advanced कृ root detection with morphological analysis
4. **Semantic Field Analysis**: Classification into seven specified semantic domains
5. **Context Integration**: Synthesis of explicit context with implicit semantic markers
6. **Confidence Assessment**: Graduated confidence scoring based on semantic certainty
7. **Result Compilation**: Comprehensive analysis with detailed semantic breakdown

### Semantic Contexts
1. **गन्धन (gandana)**: Divulging, revealing secrets
2. **अवक्षेपण (avakṣepaṇa)**: Reviling, criticizing, disparaging
3. **सेवन (sevana)**: Serving, worship, practice
4. **साहसिक्य (sāhasikya)**: Violence, force, boldness
5. **प्रतियत्न (pratiyatna)**: Causing change, making effort
6. **प्रकथन (prakathana)**: Recitation, narration, exposition
7. **उपयोग (upayoga)**: Purposeful use, application, utilization

### Performance
- **Time Complexity**: O(n) where n is the length of the input word
- **Space Complexity**: O(1) for primary analysis, O(k) for context storage where k is the number of semantic indicators
- **Optimization Notes**: Efficient semantic pattern matching with parallel context analysis

### Edge Cases
- **Semantic Overlap**: Handles cases where multiple semantic contexts apply simultaneously
- **Context Ambiguity**: Uses multiple indicators to resolve uncertain semantic classification
- **Root Variations**: Manages कृ root across different pada and tense formations
- **False Context Detection**: Filters out non-relevant uses of कृ root

## Integration

### Related Sutras
- **1.3.33** (अधेः प्रसहने): Specific rule for अधि + कृ in overpowering context
- **1.3.34** (वेः शब्दकर्म्मणः): Rule for वि + कृ in sound-making context
- **1.3.12** (अनुदात्तङित आत्मनेपदम्): General Ātmanepada prescription framework
- **3.1.85-87**: Rules for कृ root conjugation patterns

### Used By
- Advanced Sanskrit parsing systems requiring semantic pada determination
- Digital humanities projects analyzing classical Sanskrit semantic fields
- Educational applications demonstrating complex grammatical-semantic interactions
- Computational linguistics research on Sanskrit semantic classification

## References

- **Panini's Ashtadhyayi**: सूत्र १.३.३२ गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः
- **Kashika Commentary**: Detailed explanation of the seven semantic contexts
- **Patanjali's Mahabhashya**: Discussion of semantic classification principles
- **Bhartrhari's Vakyapadiya**: Philosophical analysis of meaning and grammar interaction
- **Implementation Notes**: Incorporates modern semantic field theory with traditional Sanskrit grammatical analysis
- **Test References**: Examples sourced from classical Sanskrit literature across all seven semantic domains

---

*Generated from template: SUTRA_README_TEMPLATE.md*
