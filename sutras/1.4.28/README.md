# Sutra 1.4.28: अन्तर्द्धौ येनादर्शनमिच्छति

## Overview

**Sanskrit Text**: `अन्तर्द्धौ येनादर्शनमिच्छति`  
**Transliteration**: antarddhau yenādarśanamicchati  
**Translation**: When concealment is indicated, the person whose sight one wishes to avoid is called अपादान कारक

## Purpose

This sutra specifies अपादान कारक (ablative case) for concealment contexts (अन्तर्धान). When someone wishes to avoid being seen by another person or to remain hidden from their sight, the person from whose sight one wants to hide takes अपादान designation and requires ablative case marking. This covers contexts of hiding, concealment, and avoiding detection.

## Implementation

### Function Signature
```javascript
function identifyConcealment Apadana(word, context = {}) {
    // Identifies अपादान relationships in concealment and hiding contexts
    // Returns ablative case assignment for persons one wishes to avoid
}
```

### Key Features
- Identifies persons from whose sight one wishes to hide
- Recognizes concealment and hiding contexts (अन्तर्धान)
- Handles avoidance of detection scenarios
- Supports various concealment verbs and constructions
- Integrates with अदर्शन (non-seeing) semantic analysis
- Validates concealment intentions and hiding motivations

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Script identification and conversion
  - `classification.js` - Grammatical classification
  - `verbal-analysis.js` - Concealment verb identification
  - `semantic-analysis.js` - Concealment and hiding semantics
  - `case-assignment.js` - Ablative case assignment
  - `intention-analysis.js` - इच्छा (desire/intention) analysis
- **Shared Functions**: Kāraka analysis, concealment detection, intentional analysis

## Usage Examples

### Basic Usage
```javascript
import { identifyConcealment Apadana } from './index.js';

// Example 1: Hiding from teacher
const result1 = identifyConcealment Apadana('गुरु', { 
  verb: 'अन्तर्धत्ते', 
  context: 'गुरोः अन्तर्धत्ते',
  concealment_context: true,
  avoid_detection: true
});
console.log(result1); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   concealment_target: true,
//   rule: '1.4.28'
// }

// Example 2: Avoiding king's sight
const result2 = identifyConcealment Apadana('राजा', { 
  verb: 'लुप्यते', 
  context: 'राज्ञः लुप्यते',
  hiding_context: true,
  authority_avoidance: true
});
console.log(result2); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   authority_concealment: true,
//   rule: '1.4.28'
// }

// Example 3: Concealing from enemy
const result3 = identifyConcealment Apadana('शत्रु', { 
  verb: 'गुप्यते', 
  context: 'शत्रोः गुप्यते',
  stealth_context: true,
  enemy_avoidance: true
});
console.log(result3); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   stealth_operation: true,
//   rule: '1.4.28'
// }
```

### Advanced Usage
```javascript
// Complex concealment scenarios
const complexResult = identifyConcealment Apadana('जनता', { 
  verb: 'अन्तर्हीयते',
  context: 'जनतायाः अन्तर्हीयते', // hiding from public
  social_concealment: true
});

// Multiple avoidance targets
const multiResult = identifyConcealment Apadana('all', {
  sentence: 'गुरोः पितुश्च अन्तर्धत्ते',
  verb: 'अन्तर्धत्ते',
  analyze_all_concealment_targets: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Basic concealment verb constructions
- Hiding and stealth contexts
- Authority avoidance scenarios
- Different concealment verbs (अन्तर्धा, लुप्, गुप्, etc.)
- Intention analysis (इच्छा) for avoiding sight
- Social vs personal concealment contexts
- Script conversion (Devanagari ↔ IAST)
- Integration with ablative case assignment
- Error handling for non-concealment contexts

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.28

# Run with coverage
npm test sutras/1.4.28 --coverage
```

## Technical Details

### Algorithm
1. **Concealment Validation**: Verify अन्तर्धान (concealment) context
2. **Intention Analysis**: Identify इच्छा (desire) to avoid being seen
3. **Target Identification**: Locate person from whose sight one hides
4. **Semantic Classification**: Analyze type of concealment (social/personal/strategic)
5. **Case Assignment**: Apply ablative case for concealment targets
6. **Validation**: Confirm intentional concealment relationship

### Performance
- **Time Complexity**: O(1) for basic concealment contexts, O(n) for complex scenarios
- **Space Complexity**: O(1) for single concealment relationships
- **Optimization Notes**: Cached concealment verb patterns and intention semantics

### Edge Cases
- **Multiple Concealment Targets**: Hiding from multiple people
- **Partial vs Complete Concealment**: Different degrees of hiding
- **Intentional vs Accidental**: Deliberate vs unintentional concealment
- **Temporal Concealment**: Temporary vs permanent hiding

## Integration

### Related Sutras
- **1.4.24**: ध्रुवमपायेऽपादानम् (general ablative relationships)
- **1.4.25-1.4.27**: Other specific ablative contexts
- **1.4.29-1.4.30**: Additional specialized ablative cases
- **Concealment Verb Classifications**: Rules for hiding and stealth verbs

### Used By
- Ablative case assignment for concealment contexts
- Semantic analysis of hiding and stealth
- Social interaction analysis for avoidance behaviors
- Literary analysis for concealment and secrecy themes

## References

- **Panini's Ashtadhyayi**: 1.4.28 अन्तर्द्धौ येनादर्शनमिच्छति
- **Implementation Notes**: Specialized ablative for concealment from specific persons
- **Test References**: Classical examples of hiding and concealment
- **Scholarly Sources**: Traditional commentaries on अन्तर्धान and concealment grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
