# Sutra 1.4.56: प्राग्रीश्वरान्निपाताः

## Overview

**Sanskrit Text**: `प्राग्रीश्वरान्निपाताः`  
**Transliteration**: prāg-rīśvarān nipātāḥ  
**Translation**: Before [the sutra] रीश्वरे (1.4.97), [the terms discussed are] निपात (particles)

## Purpose

This sutra establishes an important अधिकार (governing rule) that extends from this point (1.4.56) until sutra 1.4.97 (अधिरीश्वरे). All terms and rules discussed within this range are to be understood as referring to निपात (particles/indeclinables). This creates a structural framework for understanding a significant section of Panini's grammar dedicated to particles, which are crucial elements that don't undergo declension but serve important grammatical and semantic functions.

## Implementation

### Function Signature
```javascript
function sutra1456(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies निपात (particles) within the defined range
- Establishes अधिकार scope from 1.4.56 to 1.4.97
- Handles particle classification and analysis
- Manages indeclinable word recognition

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `particle-analysis`
- **Shared Functions**: `case-operations.js`, `indeclinable-processor.js`, `adhikara-manager.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1456 } from './index.js';

// Example 1: Basic particle identification
const result1 = sutra1456('च', {
  context: 'conjunctive particle',
  sutraRange: '1.4.56-1.4.97',
  wordType: 'conjunction',
  indeclinable: true
});
console.log(result1); // { applies: true, classification: 'निपात', type: 'conjunction', range: 'adhikara_scope' }

// Example 2: Particle in अधिकार scope
const result2 = sutra1456('वा', {
  context: 'disjunctive particle',
  sutraNumber: '1.4.60',
  withinAdhikara: true,
  particleFunction: 'alternative'
});
console.log(result2); // { applies: true, classification: 'निपात', adhikaraActive: true, particleFunction: 'alternative' }
```

### Advanced Usage
```javascript
// Complex अधिकार scope analysis
const result3 = sutra1456('इति', {
  context: 'quotative particle',
  sutraPosition: '1.4.75',
  adhikaraScope: 'active',
  semanticFunction: 'quotation_marker',
  syntacticRole: 'clause_boundary'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 28+ tests covering:
- अधिकार scope establishment and management
- Particle identification and classification
- Range validation and scope checking
- Multi-script support and error handling
- Integration with indeclinable processing systems
- Edge cases with scope boundaries and particle categorization

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.56

# Run with coverage
npm test sutras/1.4.56 --coverage
```

## Technical Details

### Algorithm
1. **Scope Establishment**: Define अधिकार range from 1.4.56 to 1.4.97
2. **Particle Recognition**: Identify terms as निपात within scope
3. **Classification**: Categorize particles by function and type
4. **Scope Validation**: Ensure terms fall within defined range

### Performance
- **Time Complexity**: O(1) for scope checking
- **Space Complexity**: O(1) for range management
- **Optimization Notes**: Uses अधिकार caching for efficiency

### Edge Cases
- Boundary conditions at scope limits
- Overlapping अधिकार rules
- Compound particles and complex forms
- Context-dependent particle interpretation

## Integration

### Related Sutras
- **1.4.97**: अधिरीश्वरे (end of particle अधिकार)
- **1.1.37**: स्वरादिनिपातमव्ययम् (indeclinable nature of particles)
- **1.4.57**: चादयोऽसत्त्वे (specific particles in negative contexts)

### Used By
- Particle analysis systems
- Indeclinable processors
- अधिकार scope managers
- Grammatical categorization engines

## References

- **Panini's Ashtadhyayi**: 1.4.56 प्राग्रीश्वरान्निपाताः
- **Classical Examples**: Particle usage in Sanskrit literature
- **Grammatical Context**: अधिकार system and scope management in Paninian grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
