# Sutra 1.4.23: कारके

## Overview

**Sanskrit Text**: `कारके`  
**Transliteration**: kārake  
**Translation**: In the special relation to a word expressing an action (i.e., in grammatical relations)

## Purpose

This fundamental sutra establishes the scope of कारक (kāraka) - grammatical relations or case relationships. It serves as an अनुवृत्ति (anuvṛtti/continuing element) for subsequent sutras that define specific case relationships like agent (कर्ता), object (कर्म), instrument (करण), etc. This sutra sets the foundation for understanding how nouns relate to verbal actions in Sanskrit grammar through the case system.

## Implementation

### Function Signature
```javascript
function identifyKaraka(word, context = {}) {
    // Identifies and validates grammatical case relationships (kāraka)
    // Returns relationship analysis and case assignment
}
```

### Key Features
- Identifies grammatical relationships between nouns and verbs
- Validates kāraka contexts for case assignment
- Supports analysis of all six primary kārakas
- Handles complex syntactic relationships
- Integrates with verbal action analysis
- Provides foundation for subsequent case-specific sutras

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Script identification and conversion
  - `classification.js` - Grammatical classification
  - `syntactic-analysis.js` - Syntactic relationship analysis
  - `verbal-analysis.js` - Verb and action identification
  - `case-assignment.js` - Case relationship mapping
  - `validation.js` - Input validation
- **Shared Functions**: Syntactic parsing, relationship detection, case logic

## Usage Examples

### Basic Usage
```javascript
import { identifyKaraka } from './index.js';

// Example 1: Agent relationship (कर्ता)
const result1 = identifyKaraka('राम', { 
  verb: 'गच्छति', 
  relationship: 'agent',
  sentence: 'रामो गच्छति'
});
console.log(result1); 
// Expected: { 
//   applies: true, 
//   karaka: 'कर्ता', 
//   case_required: 'nominative',
//   rule: '1.4.23'
// }

// Example 2: Object relationship (कर्म)
const result2 = identifyKaraka('फल', { 
  verb: 'खादति', 
  relationship: 'object',
  sentence: 'रामः फलं खादति'
});
console.log(result2); 
// Expected: { 
//   applies: true, 
//   karaka: 'कर्म', 
//   case_required: 'accusative',
//   rule: '1.4.23'
// }

// Example 3: Instrument relationship (करण)
const result3 = identifyKaraka('चाकु', { 
  verb: 'कृन्तति', 
  relationship: 'instrument',
  sentence: 'चाकुना कृन्तति'
});
console.log(result3); 
// Expected: { 
//   applies: true, 
//   karaka: 'करण', 
//   case_required: 'instrumental',
//   rule: '1.4.23'
// }
```

### Advanced Usage
```javascript
// Complex syntactic analysis
const complexResult = identifyKaraka('गुरु', { 
  verb: 'गच्छति',
  context: 'गुरुं प्रति गच्छति', // going towards teacher
  preposition: 'प्रति',
  semantic_role: 'goal'
});

// Multiple relationship analysis
const multiResult = identifyKaraka('ग्राम', {
  sentence: 'ग्रामात् नगरं गच्छति',
  verb: 'गच्छति',
  analyze_all_relationships: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 35+ tests covering:
- Basic kāraka identification for all six primary relationships
- Agent (कर्ता) analysis with various verb types
- Object (कर्म) analysis including direct and indirect objects
- Instrument (करण) relationship detection
- Recipient/Beneficiary (सम्प्रदान) analysis
- Source/Ablation (अपादान) identification
- Location (अधिकरण) relationship handling
- Complex syntactic constructions
- Integration with case assignment systems
- Error handling and validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.23

# Run with coverage
npm test sutras/1.4.23 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Verify word format and context parameters
2. **Syntactic Analysis**: Parse sentence structure and relationships
3. **Verb Identification**: Locate and analyze verbal actions
4. **Relationship Detection**: Determine specific kāraka relationships
5. **Case Assignment**: Map relationships to appropriate cases
6. **Validation**: Confirm grammatical correctness

### Performance
- **Time Complexity**: O(n) for sentence analysis, O(1) for single word relationships
- **Space Complexity**: O(n) for complex sentence parsing
- **Optimization Notes**: Cached relationship patterns for faster analysis

### Edge Cases
- **Multiple Relationships**: Words serving multiple grammatical functions
- **Implicit Relationships**: Understanding implied grammatical connections
- **Complex Predicates**: Handling compound and complex verbal constructions
- **Prepositional Phrases**: Managing relationships modified by prepositions

## Integration

### Related Sutras
- **1.4.24-1.4.55**: Specific kāraka definitions (अपादान, सम्प्रदान, etc.)
- **Case Assignment Sutras**: Rules determining specific case endings
- **Verbal Analysis Sutras**: Integration with verb classification
- **Syntactic Rules**: Sentence structure and word order principles

### Used By
- All subsequent kāraka-specific sutras (1.4.24-1.4.55)
- Case assignment algorithms
- Syntactic parsing systems
- Sanskrit sentence analysis tools
- Grammatical relationship extraction

## References

- **Panini's Ashtadhyayi**: 1.4.23 कारके
- **Kaumudi Krama**: 534
- **Implementation Notes**: Foundation for the entire kāraka system in Sanskrit grammar
- **Test References**: Classical Sanskrit sentences demonstrating various grammatical relationships
- **Scholarly Sources**: Traditional grammatical commentaries on kāraka theory

---

*Generated from template: SUTRA_README_TEMPLATE.md*
