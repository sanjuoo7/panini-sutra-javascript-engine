# Sutra 1.3.33: अधेः प्रसहने

## Overview

**Sanskrit Text**: `अधेः प्रसहने`  
**Transliteration**: adheḥ prasahane  
**Translation**: After the verb कृ preceded by अधि, when the sense is that of 'overcoming or defeat', the आत्मनेपद is used, even when the fruit of the action does not accrue to the agent.

## Purpose

This sutra establishes a specific rule for the verbal root कृ (kṛ, 'to do/make') when preceded by the prefix अधि (adhi) and used in the semantic context of प्रसहन (prasahana - overpowering, overcoming, or defeating). This represents a contextual specification that demonstrates how prefix-semantic combinations can override general pada selection rules, emphasizing the sophisticated interplay between morphology and semantics in Sanskrit grammar.

## Implementation

### Function Signature
```javascript
function determineAdhiKriPrasahaneAtmanepada(word, context = {}) {
    // Analyzes if अधि + कृ in overpowering context requires Ātmanepada
}
```

### Key Features
- **Prefix-Specific Analysis**: Targeted detection of अधि prefix with कृ root combinations
- **Semantic Context Recognition**: Specialized प्रसहन (overpowering/defeat) context identification
- **Morphological Integration**: Advanced analysis of prefix-root sandhi applications
- **Multi-Script Compatibility**: Seamless processing of IAST and Devanagari inputs
- **Contextual Validation**: Comprehensive semantic field analysis with confidence assessment
- **Detailed Diagnostics**: In-depth analysis reporting with component-level breakdown

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Morphological Analysis**: Prefix detection and root identification utilities
- **Semantic Processing**: Context analysis and meaning classification functions

## Usage Examples

### Basic Usage
```javascript
import { determineAdhiKriPrasahaneAtmanepada } from './index.js';

// Example 1: अधि + कृ in overpowering context
const result1 = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
    meaning: 'to overcome',
    semanticContext: 'prasahana'
});
console.log(result1); 
// { isSutra133Atmanepada: true, confidence: 0.9, analysis: '...', sutraApplied: '1.3.33' }

// Example 2: Defeat context
const result2 = determineAdhiKriPrasahaneAtmanepada('अधिकुर्वते', {
    meaning: 'to defeat',
    prasahana: true
});
console.log(result2);
// { isSutra133Atmanepada: true, confidence: 0.85, analysis: '...', sutraApplied: '1.3.33' }
```

### Advanced Usage
```javascript
// With explicit prefix and root specification
const result3 = determineAdhiKriPrasahaneAtmanepada('अधिकरोति', {
    prefix: 'अधि',
    root: 'कृ',
    meaning: 'to overpower completely',
    semanticContext: 'prasahana',
    contextualClues: ['overcoming', 'superiority']
});

// Devanagari input with context
const result4 = determineAdhiKriPrasahaneAtmanepada('अधिक्रियते', {
    meaning: 'प्रसहनेन जयति',
    prasahana: true,
    victory: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 48 tests covering:
- अधि prefix detection with कृ root combinations
- प्रसहन semantic context identification and validation
- Script processing across IAST and Devanagari representations
- Morphological analysis of prefix-root combinations
- Edge cases including ambiguous overpowering contexts
- Integration scenarios with related morphological processes
- Error handling for invalid prefix-root combinations
- Confidence assessment across various semantic certainty levels

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.33

# Run with coverage
npm test sutras/1.3.33 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Comprehensive validation of word input and semantic context
2. **Script Detection**: Script identification and normalization processing
3. **Root Analysis**: Specialized कृ root detection across morphological variations
4. **Prefix Recognition**: अधि prefix identification with sandhi consideration
5. **Semantic Context Evaluation**: प्रसहन context analysis with multiple indicators
6. **Component Integration**: Synthesis of prefix, root, and semantic components
7. **Confidence Calculation**: Multi-factor confidence assessment based on detection certainty
8. **Result Generation**: Comprehensive analysis compilation with detailed breakdown

### Semantic Analysis
- **प्रसहन (prasahana)**: Core meaning involving overpowering, overcoming, conquest
- **Victory Contexts**: Recognition of triumph, defeat, and superiority semantics
- **Power Dynamics**: Analysis of dominance and control-related meanings
- **Competitive Contexts**: Identification of contest and struggle scenarios

### Performance
- **Time Complexity**: O(n) where n is the length of the input word
- **Space Complexity**: O(1) for core analysis operations
- **Optimization Notes**: Efficient prefix-root pattern matching with early semantic validation

### Edge Cases
- **Ambiguous Overpowering**: Handles cases where प्रसहन meaning is context-dependent
- **Prefix Sandhi**: Manages phonetic changes in अधि + कृ combinations
- **Semantic Boundaries**: Distinguishes प्रसहन from related but distinct meanings
- **False Positive Prevention**: Filters out non-overpowering uses of अधि + कृ

## Integration

### Related Sutras
- **1.3.32** (गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः): General semantic contexts for कृ root
- **1.3.34** (वेः शब्दकर्म्मणः): Specific rule for वि + कृ in sound-making context
- **1.3.12** (अनुदात्तङित आत्मनेपदम्): Fundamental Ātmanepada prescription framework
- **1.4.59-69**: Rules governing upasarga (prefix) classification and usage

### Used By
- Sanskrit parsing systems requiring context-sensitive pada determination
- Digital humanities applications analyzing power dynamics in classical texts
- Educational tools demonstrating prefix-semantic interactions
- Computational Sanskrit morphology analyzers

## References

- **Panini's Ashtadhyayi**: सूत्र १.३.३३ अधेः प्रसहने
- **Kashika Commentary**: Explanation of प्रसहन context and अधि prefix specification
- **Patanjali's Mahabhashya**: Discussion of overpowering semantics in grammatical context
- **Nirukta**: Etymology and semantic analysis of प्रसहन terminology
- **Implementation Notes**: Combines computational morphology with traditional semantic analysis
- **Test References**: Examples from classical Sanskrit literature featuring conquest and overpowering narratives

---

*Generated from template: SUTRA_README_TEMPLATE.md*
