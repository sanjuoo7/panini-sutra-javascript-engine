# Sutra 1.3.23: प्रकाशनस्थेयाख्ययोश्च

## Overview

**Sanskrit Text**: `प्रकाशनस्थेयाख्ययोश्च`  
**Transliteration**: prakāśanastheyākhyayośca  
**Translation**: Also (the ātmanepada) after स्था when it expresses the sense of making known one's intention or arbitration.

## Purpose

This sutra extends ātmanepada usage for the root स्था (to stand) in specific semantic contexts: when it expresses making known one's intention (स्थेया) or arbitration/judicial decision-making (आख्यान). This provides semantic-based voice assignment beyond the prefix rules of 1.3.22.

## Implementation

### Function Signature
```javascript
function determineSthaSemanticsAtmanepada(word, context = {}) {
    // Returns analysis of whether ātmanepada should be used based on semantic context
}
```

### Key Features
- Multi-script support (Devanagari and IAST)
- Dual semantic context analysis (intention + arbitration)
- Advanced morphological pattern recognition
- Compound semantic analysis

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord, tokenizePhonemes
- **Helper Functions**: analyzeSemanticContext, analyzeCompoundSemantics

## Usage Examples

### Intention Context (स्थेया)
```javascript
import { determineSthaSemanticsAtmanepada } from './index.js';

// Example 1: Intention-declaring context
const result1 = determineSthaSemanticsAtmanepada('स्थेयते', {
  semanticContext: 'intention-declaration'
});
console.log(result1); 
// { isSthaSemanticsAtmanepada: true, confidence: 0.9, context: 'intention', root: 'स्था' }

// Example 2: Making known one's resolve
const result2 = determineSthaSemanticsAtmanepada('स्थानं प्रकाशयते', {
  semanticContext: 'intention-making-known'
});
console.log(result2);
// { isSthaSemanticsAtmanepada: true, confidence: 0.85, context: 'intention-declaration' }
```

### Arbitration Context (आख्यान)
```javascript
// Example 3: Judicial/arbitration context
const result3 = determineSthaSemanticsAtmanepada('स्थितिं निर्णयते', {
  semanticContext: 'arbitration'
});
console.log(result3);
// { isSthaSemanticsAtmanepada: true, confidence: 0.9, context: 'arbitration', root: 'स्था' }

// Example 4: Decision-making context
const result4 = determineSthaSemanticsAtmanepada('न्यायस्थते', {
  semanticContext: 'judicial-decision'
});
console.log(result4);
// { isSthaSemanticsAtmanepada: true, confidence: 0.85, context: 'arbitration' }
```

### IAST Script Support
```javascript
// IAST examples
const result5 = determineSthaSemanticsAtmanepada('stheyate', {
  semanticContext: 'intention'
});
console.log(result5);
// { isSthaSemanticsAtmanepada: true, confidence: 0.9, context: 'intention' }

const result6 = determineSthaSemanticsAtmanepada('nyāyasthate', {
  semanticContext: 'arbitration'
});
console.log(result6);
// { isSthaSemanticsAtmanepada: true, confidence: 0.85, context: 'arbitration' }
```

### Advanced Context Analysis
```javascript
// Complex semantic analysis
const result7 = determineSthaSemanticsAtmanepada('प्रकाशनार्थं स्थिते', {
  compoundAnalysis: true,
  semanticMarkers: ['प्रकाशन', 'intention']
});
console.log(result7);
// { isSthaSemanticsAtmanepada: true, confidence: 0.88, context: 'compound-intention' }
```

## Test Coverage

The implementation includes comprehensive tests covering:

- **Intention Context**: स्थेया forms and intention-declaration contexts
- **Arbitration Context**: आख्यान forms and judicial decision contexts
- **Negative Cases**: Simple स्था forms without semantic markers
- **Compound Analysis**: Complex semantic compound detection
- **Edge Cases**: Mixed contexts, ambiguous semantic markers
- **Error Handling**: Invalid inputs, missing context, type validation
- **Script Support**: Both Devanagari and IAST semantic patterns

## Technical Details

### Semantic Context Analysis
The sutra identifies two specific semantic contexts:

#### 1. Intention Declaration (स्थेया)
- **Markers**: प्रकाशन, संकल्प, इच्छा, निश्चय
- **Patterns**: स्थेया-, -स्थेय-, प्रकाशन + स्था
- **Meaning**: Making known one's intention or resolve

#### 2. Arbitration/Judicial (आख्यान)
- **Markers**: न्याय, निर्णय, व्यवस्था, विवाद
- **Patterns**: न्याय + स्था, निर्णय + स्था, -व्यवस्था
- **Meaning**: Judicial decision-making or arbitration

### Pattern Recognition
- Detects semantic compound markers
- Analyzes contextual semantic indicators
- Recognizes both explicit and implicit contexts
- Performs morphological semantic analysis

### Confidence Scoring
- Base confidence: 0.6 for semantic context detection
- Bonuses for: clear semantic markers (+0.2), compound clarity (+0.15)
- Bonuses for: contextual consistency (+0.1), morphological match (+0.1)
- Range: 0.0 to 0.9

### Script Support
- **Devanagari**: स्थेयते, न्यायस्थते, प्रकाशनस्थिति
- **IAST**: stheyate, nyāyasthate, prakāśanasthiti

## Related Sutras

This sutra works in conjunction with:
- Prefix-based स्था rule (1.3.22)
- Previous prefix-root combinations (1.3.19-1.3.21)
- General ātmanepada rules (1.3.12-1.3.13)
- Semantic-based voice assignment principles

## Implementation Notes

- Implements dual semantic context detection
- Uses advanced compound analysis techniques
- Provides semantic reasoning in analysis results
- Maintains compatibility with prefix-based rules (1.3.22)
- Supports both explicit context and implicit semantic detection
- Handles complex compound forms with semantic markers
