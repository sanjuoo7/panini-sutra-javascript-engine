# Sutra 1.4.42: साधकतमं करणम्

## Overview

**Sanskrit Text**: `साधकतमं करणम्`  
**Transliteration**: sādhakatamaṃ karaṇam  
**Translation**: The most instrumental (in accomplishing an action) is called करण

## Purpose

This sutra defines करण कारक (instrumental case) as that which is most instrumental or especially auxiliary in accomplishing an action. This is the primary definition of the instrumental grammatical relation, identifying the primary means or instrument by which an action is performed.

## Implementation

### Function Signature
```javascript
function sutra1442(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies करण कारक based on instrumentality degree
- Distinguishes primary instruments from secondary aids
- Handles various types of instruments (physical tools, means, methods)
- Multi-script support and semantic analysis

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `case-operations`
- **Shared Functions**: `verb-analysis.js`, `morphology.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1442 } from './index.js';

// Example 1: Physical instrument
const result1 = sutra1442('कुठारेण', {
  action: 'छेदन',
  verb: 'छिनत्ति',
  context: 'वृक्षं कुठारेण छिनत्ति',
  instrumentality: 'primary'
});
console.log(result1); // { applies: true, karaka: 'करण', instrumentType: 'tool' }

// Example 2: Method as instrument
const result2 = sutra1442('विद्यया', {
  action: 'धनलाभ',
  verb: 'लभते',
  context: 'विद्यया धनं लभते',
  instrumentality: 'primary'
});
console.log(result2); // { applies: true, karaka: 'करण', instrumentType: 'method' }
```

### Advanced Usage
```javascript
// Comparative instrumentality analysis
const result3 = sutra1442('मन्त्रेण', {
  action: 'शान्ति',
  verb: 'शाम्यति',
  context: 'मन्त्रेण यज्ञेन च शान्तिं करोति',
  otherInstruments: ['यज्ञ'],
  instrumentality: 'most_effective'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Primary vs secondary instrument identification
- Physical tools, methods, and abstract instruments
- Comparative instrumentality analysis
- Multi-script input validation
- Integration with other कारक designations
- Edge cases with multiple potential instruments

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.42

# Run with coverage
npm test sutras/1.4.42 --coverage
```

## Technical Details

### Algorithm
1. **Instrumentality Assessment**: Evaluate the degree of instrumentality
2. **Contextual Analysis**: Analyze the action and its requirements
3. **Comparative Evaluation**: When multiple instruments exist, identify the most instrumental
4. **Karaka Assignment**: Designate the most instrumental element as करण

### Performance
- **Time Complexity**: O(n) for single analysis, O(n²) for comparative analysis
- **Space Complexity**: O(1) for basic cases
- **Optimization Notes**: Uses semantic classification for efficient instrument type detection

### Edge Cases
- Multiple instruments with equal instrumentality
- Abstract vs concrete instruments
- Collective instruments vs individual components
- Integration with सम्प्रदान in tool-giving contexts

## Integration

### Related Sutras
- **1.4.43**: दिवः कर्म च (special case for दिव् root)
- **1.4.44**: परिक्रयणे सम्प्रदानमन्यतरस्याम् (wage context)
- **1.4.32**: Basic सम्प्रदान rules for comparison

### Used By
- Sentence parsing and case assignment
- Instrumental construction analysis
- Comparative kāraka determination systems

## References

- **Panini's Ashtadhyayi**: 1.4.42 साधकतमं करणम्
- **Implementation Notes**: Focuses on "most instrumental" aspect for disambiguation
- **Test References**: Classical examples showing degrees of instrumentality

---

*Generated from template: SUTRA_README_TEMPLATE.md*
