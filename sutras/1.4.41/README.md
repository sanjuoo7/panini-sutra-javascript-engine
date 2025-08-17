# Sutra 1.4.41: अनुप्रतिगृणश्च

## Overview

**Sanskrit Text**: `अनुप्रतिगृणश्च`  
**Transliteration**: anupratigrṛṇaśca  
**Translation**: And [the one] encouraged by [the prefix] anu and prati [to] grṛ

## Purpose

This sutra defines a specific case of सम्प्रदान (recipient/beneficiary) कारक. When the verbal root गृ (to speak/utter) is preceded by the prefixes अनु and प्रति and means "to encourage by repeating", the person who was the agent of the prior action being repeated is designated as सम्प्रदान कारक.

## Implementation

### Function Signature
```javascript
function sutra1441(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies सम्प्रदान कारक for specific prefix combinations
- Handles semantic constraints based on "encouragement by repetition"
- Multi-script support (IAST and Devanagari)
- Context-sensitive analysis of verbal constructions

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `isValidCombination`
- **Shared Functions**: `case-operations.js`, `verb-analysis.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1441 } from './index.js';

// Example 1: Encouraging by repetition
const result1 = sutra1441('देवदत्त', {
  verb: 'अनुप्रतिगृणाति',
  meaning: 'encourage_by_repetition',
  priorAgent: 'यज्ञदत्त',
  context: 'यज्ञदत्तो गायति। देवदत्तं अनुप्रतिगृणाति।'
});
console.log(result1); // { applies: true, karaka: 'सम्प्रदान', ... }

// Example 2: Regular गृ without anu-prati prefixes
const result2 = sutra1441('राम', {
  verb: 'गृणाति',
  meaning: 'speak'
});
console.log(result2); // { applies: false, reason: 'missing_required_prefixes' }
```

### Advanced Usage
```javascript
// Complex sentence analysis
const result3 = sutra1441('गुरु', {
  verb: 'अनुप्रतिगृणाति',
  meaning: 'encourage_by_repetition',
  priorAgent: 'शिष्य',
  priorAction: 'स्तुति',
  context: 'शिष्यः स्तौति। गुरुं अनुप्रतिगृणाति।',
  script: 'Devanagari'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 25+ tests covering:
- Basic सम्प्रदान identification with अनुप्रति prefixes
- Semantic validation of "encouragement by repetition"
- Multi-script input handling
- Edge cases with different verbal meanings
- Error handling for invalid inputs
- Integration with other कारक rules

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.41

# Run with coverage
npm test sutras/1.4.41 --coverage
```

## Technical Details

### Algorithm
1. **Prefix Validation**: Check for both अनु and प्रति prefixes on verbal root गृ
2. **Semantic Analysis**: Verify the meaning relates to "encouragement by repetition"
3. **Context Analysis**: Identify the prior agent whose action is being encouraged
4. **Karaka Assignment**: Designate the prior agent as सम्प्रदान कारक

### Performance
- **Time Complexity**: O(n) where n is the length of input text
- **Space Complexity**: O(1) for core analysis
- **Optimization Notes**: Uses efficient prefix matching and semantic lookup tables

### Edge Cases
- Multiple agents in context and disambiguation
- Compound verbs with additional prefixes
- Ambiguous semantic contexts requiring human interpretation
- Integration with other सम्प्रदान rules (1.4.32-1.4.40)

## Integration

### Related Sutras
- **1.4.32**: Basic सम्प्रदान definition (दानगुप्रच्छयुक्षसम्प्रदानेषु सम्प्रदानम्)
- **1.4.33**: Specific cases of सम्प्रदान
- **1.4.36**: कर्ता कर्मणोः कृति (agent-object relationship)

### Used By
- Higher-level कारक analysis functions
- Sentence parsing and grammatical analysis
- Semantic role labeling systems

## References

- **Panini's Ashtadhyayi**: 1.4.41 अनुप्रतिगृणश्च
- **Implementation Notes**: Based on traditional commentaries explaining "encouragement by repetition"
- **Test References**: Classical examples from Sanskrit grammatical literature

---

*Generated from template: SUTRA_README_TEMPLATE.md*
