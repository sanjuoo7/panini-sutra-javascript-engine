# Sutra 1.3.22: समवप्रविभ्यः स्थः

## Overview

**Sanskrit Text**: `समवप्रविभ्यः स्थः`  
**Transliteration**: samavapravibhyaḥ sthāḥ  
**Translation**: After the root स्था 'to stand', preceded by सम्, अव, प्र, or वि, the ātmanepada affix is employed.

## Purpose

This sutra prescribes ātmanepada endings for the root स्था (to stand/remain) when preceded by specific prefixes: सम् (sam), अव (ava), प्र (pra), or वि (vi). It establishes voice assignment rules for these standing/positioning verb combinations.

## Implementation

### Function Signature
```javascript
function determineSthaPrefixAtmanepada(word, context = {}) {
    // Returns analysis of whether ātmanepada should be used
}
```

### Key Features
- Multi-script support (Devanagari and IAST)
- Four-prefix validation (सम्, अव, प्र, वि)
- Standing/positioning semantic context analysis
- Morphological pattern recognition

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord, tokenizePhonemes
- **Helper Functions**: hasStandingSemanticContext for semantic validation

## Usage Examples

### Basic Usage
```javascript
import { determineSthaPrefixAtmanepada } from './index.js';

// Example 1: समतिष्ठते (samatiṣṭhate) - सम् + स्था combination
const result1 = determineSthaPrefixAtmanepada('समतिष्ठते');
console.log(result1); 
// { isSthaPrefixAtmanepada: true, confidence: 0.95, prefix: 'सम्', root: 'स्था' }

// Example 2: अवतिष्ठते (avatiṣṭhate) - अव + स्था combination
const result2 = determineSthaPrefixAtmanepada('अवतिष्ठते');
console.log(result2);
// { isSthaPrefixAtmanepada: true, confidence: 0.95, prefix: 'अव', root: 'स्था' }
```

### Multiple Prefix Support
```javascript
// Example 3: प्रतिष्ठते (pratiṣṭhate) - प्र + स्था combination
const result3 = determineSthaPrefixAtmanepada('प्रतिष्ठते');
console.log(result3);
// { isSthaPrefixAtmanepada: true, confidence: 0.95, prefix: 'प्र', root: 'स्था' }

// Example 4: विष्ठते (viṣṭhate) - वि + स्था combination
const result4 = determineSthaPrefixAtmanepada('विष्ठते');
console.log(result4);
// { isSthaPrefixAtmanepada: true, confidence: 0.95, prefix: 'वि', root: 'स्था' }
```

### IAST Script Support
```javascript
// IAST examples
const result5 = determineSthaPrefixAtmanepada('samatiṣṭhate');
console.log(result5);
// { isSthaPrefixAtmanepada: true, confidence: 0.95, prefix: 'sam' }

const result6 = determineSthaPrefixAtmanepada('pratiṣṭhate');
console.log(result6);
// { isSthaPrefixAtmanepada: true, confidence: 0.95, prefix: 'pra' }
```

### Context-Based Analysis
```javascript
// With explicit context
const result7 = determineSthaPrefixAtmanepada('someform', {
  root: 'स्था',
  prefix: 'सम्',
  semanticContext: 'standing'
});
console.log(result7);
// { isSthaPrefixAtmanepada: true, confidence: 0.9, prefix: 'सम्' }
```

## Test Coverage

The implementation includes comprehensive tests covering:

- **Positive Cases**: Valid prefix + स्था combinations for all four prefixes
- **Negative Cases**: Invalid prefixes, wrong roots, simple स्था forms
- **Multi-Prefix Tests**: Each of the four valid prefixes (सम्, अव, प्र, वि)
- **Edge Cases**: Mixed case, compound words, contextual analysis
- **Error Handling**: Null inputs, invalid words, type validation
- **Script Support**: Both Devanagari and IAST patterns

## Technical Details

### Pattern Recognition
- Detects all four valid prefixes: सम्, अव, प्र, वि
- Recognizes स्था root patterns including तिष्ठ, स्थित, स्थान variants
- Semantic validation for standing/positioning contexts

### Prefix Validation
The sutra specifically handles four prefixes:
- **सम् (sam)**: Complete/perfect standing
- **अव (ava)**: Down/descending position
- **प्र (pra)**: Forward/prominent standing
- **वि (vi)**: Apart/separate positioning

### Confidence Scoring
- Base confidence: 0.7 for clear patterns
- Bonuses for: morphological clarity (+0.15), position clarity (+0.1)
- Bonuses for: semantic context match (+0.1)
- Range: 0.0 to 0.95

### Script Support
- **Devanagari**: समतिष्ठते, अवतिष्ठते, प्रतिष्ठते, विष्ठते
- **IAST**: samatiṣṭhate, avatiṣṭhate, pratiṣṭhate, viṣṭhate

## Related Sutras

This sutra works in conjunction with:
- Previous prefix-root combinations (1.3.19-1.3.21)
- Following स्था-specific rule (1.3.23)
- General ātmanepada rules (1.3.12-1.3.13)
- Root-specific स्था conjugation patterns

## Implementation Notes

- Supports multiple valid prefixes in single implementation
- Uses semantic context validation for standing/positioning meaning
- Maintains high accuracy across both script systems
- Provides detailed prefix identification and analysis
- Implements comprehensive morphological pattern matching
- Distinguishes from simple स्था forms without valid prefixes
