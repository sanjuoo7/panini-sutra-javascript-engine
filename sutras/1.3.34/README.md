# Sutra 1.3.34: वेः शब्दकर्म्मणः

## Overview

**Sanskrit Text**: `वेः शब्दकर्म्मणः`  
**Transliteration**: veḥ śabdakarmaṇaḥ  
**Translation**: After the verb कृ preceded by वि, even when the fruit of the action does not accrue to the agent, and when the sense is that of 'making sound' (literally having 'sound' for its object), the आत्मनेपद affix is used.

## Purpose

This sutra establishes that the verbal root कृ (kṛ, 'to do/make') takes Ātmanepada endings when preceded by the prefix वि (vi) and used in the specific semantic context of शब्दकर्मन् (śabdakarman - having sound as object, sound-making). This rule demonstrates the sophisticated relationship between prefix semantics, object specification, and grammatical prescription in Sanskrit, where the nature of the action's object influences pada selection.

## Implementation

### Function Signature
```javascript
function determineViKriShabdakarmaAtmanepada(word, context = {}) {
    // Analyzes if वि + कृ in sound-making context requires Ātmanepada
}
```

### Key Features
- **Sound-Object Analysis**: Specialized detection of शब्दकर्मन् (sound-making) semantic contexts
- **Prefix Recognition**: Advanced वि prefix identification with morphological considerations
- **Object-Oriented Semantics**: Analysis of karman (object) types and their grammatical implications
- **Acoustic Context Detection**: Recognition of sound-production, noise-making, and phonetic creation contexts
- **Multi-Dimensional Analysis**: Integration of prefix, root, semantic, and object-type analysis
- **Comprehensive Validation**: Robust input processing with detailed morphological breakdown

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Morphological Analysis**: Prefix-root combination processing utilities
- **Semantic Classification**: Object-type analysis and context determination functions

## Usage Examples

### Basic Usage
```javascript
import { determineViKriShabdakarmaAtmanepada } from './index.js';

// Example 1: वि + कृ in sound-making context
const result1 = determineViKriShabdakarmaAtmanepada('विकरोति', {
    meaning: 'to make sound',
    semanticContext: 'shabdakarma'
});
console.log(result1); 
// { isSutra134Atmanepada: true, confidence: 0.9, analysis: '...', sutraApplied: '1.3.34' }

// Example 2: Sound production context
const result2 = determineViKriShabdakarmaAtmanepada('विकुर्वते', {
    meaning: 'to produce noise',
    soundMaking: true
});
console.log(result2);
// { isSutra134Atmanepada: true, confidence: 0.85, analysis: '...', sutraApplied: '1.3.34' }
```

### Advanced Usage
```javascript
// With explicit object specification
const result3 = determineViKriShabdakarmaAtmanepada('विकरोति', {
    prefix: 'वि',
    root: 'कृ',
    meaning: 'to create musical sounds',
    objectType: 'शब्द',
    semanticContext: 'shabdakarma',
    contextualClues: ['sound', 'noise', 'acoustic']
});

// Musical instrument context
const result4 = determineViKriShabdakarmaAtmanepada('विक्रियते', {
    meaning: 'वाद्यं शब्दं करोति',
    soundMaking: true,
    instrument: true,
    objectType: 'sound'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 50 tests covering:
- वि prefix detection with कृ root in sound-making contexts
- शब्दकर्मन् semantic context identification across various sound types
- Object-type analysis including musical, vocal, and mechanical sounds
- Script processing for both IAST and Devanagari representations
- Morphological analysis of वि + कृ combinations with sandhi
- Edge cases including ambiguous sound-making vs. other वि + कृ uses
- Integration testing with acoustic and phonetic terminology
- Error handling for invalid object specifications and contexts

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.34

# Run with coverage
npm test sutras/1.3.34 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Multi-level validation of word input and semantic parameters
2. **Script Processing**: Script detection and normalization using `detectScript`
3. **Root Identification**: Comprehensive कृ root detection across morphological forms
4. **Prefix Analysis**: वि prefix recognition with sandhi transformation awareness
5. **Object-Type Evaluation**: शब्दकर्मन् context analysis with object specification
6. **Semantic Integration**: Synthesis of acoustic context indicators with grammatical structure
7. **Confidence Assessment**: Multi-factor confidence scoring based on component certainty
8. **Result Compilation**: Detailed analysis generation with component-level diagnostics

### Semantic Contexts for शब्दकर्मन्
- **Musical Creation**: Producing musical sounds, melodies, rhythms
- **Vocal Production**: Speech sounds, calls, vocalizations
- **Instrumental Sounds**: Mechanical, percussive, wind-produced sounds
- **Natural Acoustics**: Environmental sounds, echoes, resonances
- **Linguistic Sounds**: Phonetic production, pronunciation, articulation

### Performance
- **Time Complexity**: O(n) where n is the length of the input word
- **Space Complexity**: O(1) for core analysis, O(k) for context storage
- **Optimization Notes**: Efficient semantic pattern matching with acoustic context prioritization

### Edge Cases
- **Sound vs. Action Ambiguity**: Distinguishes sound-making from other types of creation
- **Object Specification**: Handles implicit vs. explicit object references
- **Prefix Sandhi**: Manages phonetic changes in वि + कृ combinations
- **Context Disambiguation**: Resolves ambiguous cases using multiple semantic indicators

## Integration

### Related Sutras
- **1.3.32** (गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः): General semantic contexts for कृ root
- **1.3.33** (अधेः प्रसहने): Specific rule for अधि + कृ in overpowering context
- **1.3.12** (अनुदात्तङित आत्मनेपदम्): Fundamental Ātmanepada prescription framework
- **1.4.49** (शब्दकर्म च): Rules specifically dealing with sound as grammatical object

### Used By
- Sanskrit parsing systems analyzing acoustic and musical terminology
- Digital musicology applications processing Sanskrit texts on sound theory
- Educational tools demonstrating object-type influences on grammatical selection
- Computational linguistics research on semantic-grammatical interactions
- Applications analyzing classical Sanskrit texts on music, acoustics, and phonetics

## References

- **Panini's Ashtadhyayi**: सूत्र १.३.३४ वेः शब्दकर्म्मणः
- **Kashika Commentary**: Detailed explanation of शब्दकर्मन् and वि prefix specification
- **Bharata's Natyashastra**: Classical treatise on music and sound production terminology
- **Sarangadeva's Sangitaratnakara**: Comprehensive analysis of musical terminology and sound creation
- **Patanjali's Mahabhashya**: Discussion of object-type influences on grammatical prescription
- **Implementation Notes**: Integrates acoustic theory with computational morphological analysis
- **Test References**: Examples from classical Sanskrit texts on music theory, phonetics, and acoustic phenomena

---

*Generated from template: SUTRA_README_TEMPLATE.md*
