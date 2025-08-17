# Sutra 1.4.46: अधिष्ठानमधिकरणम्

## Overview

**Sanskrit Text**: `अधिष्ठानमधिकरणम्`  
**Transliteration**: adhiṣṭhānamadhikaraṇam  
**Translation**: अधिष्ठान (seat/abode/presiding place) [is] अधिकरण

## Purpose

This sutra extends the definition of अधिकरण कारक by specifically including अधिष्ठान (seat, abode, presiding place, governing location). While the previous sutra (1.4.45) defined आधार as अधिकरण, this sutra emphasizes the concept of a governing or presiding location - a place that has authority, control, or special significance over what occurs there.

## Implementation

### Function Signature
```javascript
function sutra1446(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies governing/presiding locations as अधिकरण
- Analyzes authority and control relationships
- Handles religious, political, and administrative seats
- Integrates with hierarchical location concepts

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `authority-analysis`
- **Shared Functions**: `case-operations.js`, `hierarchical-analysis.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1446 } from './index.js';

// Example 1: Royal seat
const result1 = sutra1446('सिंहासन', {
  action: 'राज्य',
  context: 'सिंहासने राज्यं करोति',
  authorityType: 'royal',
  case: 'locative'
});
console.log(result1); // { applies: true, karaka: 'अधिकरण', seatType: 'royal_throne' }

// Example 2: Divine abode
const result2 = sutra1446('देवलोक', {
  action: 'शासन',
  context: 'देवलोके शासति',
  authorityType: 'divine'
});
console.log(result2); // { applies: true, karaka: 'अधिकरण', divineRealm: true }
```

### Advanced Usage
```javascript
// Complex institutional analysis
const result3 = sutra1446('न्यायपीठ', {
  action: 'न्यायनिर्णय',
  context: 'न्यायपीठे न्यायं निर्णयति',
  institutionalType: 'judicial',
  authority: 'legal'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Authority and governance seat identification
- Religious, political, judicial presiding places
- Hierarchical location relationships
- Multi-script support and error handling
- Integration with other अधिकरण concepts
- Edge cases with metaphorical and institutional seats

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.46

# Run with coverage
npm test sutras/1.4.46 --coverage
```

## Technical Details

### Algorithm
1. **Seat Identification**: Detect governance and authority markers
2. **Authority Analysis**: Determine type and scope of authority
3. **Presiding Relationship**: Analyze the controlling relationship
4. **Karaka Assignment**: Assign अधिकरण designation with authority context

### Performance
- **Time Complexity**: O(n) for authority pattern matching
- **Space Complexity**: O(1) for standard seat analysis
- **Optimization Notes**: Uses institutional hierarchy patterns for efficiency

### Edge Cases
- Temporary vs permanent seats of authority
- Symbolic vs functional presiding places
- Multiple overlapping authorities
- Historical vs contemporary institutional contexts

## Integration

### Related Sutras
- **1.4.45**: आधारोऽधिकरणम् (basic अधिकरण definition)
- **1.4.47**: गम्यमानं च (movement target locations)
- **2.3.36**: सप्तम्यधिकरणे च (locative case for अधिकरण)

### Used By
- Institutional analysis systems
- Historical text processors
- Religious and mythological text parsers
- Political science applications

## References

- **Panini's Ashtadhyayi**: 1.4.46 अधिष्ठानमधिकरणम्
- **Classical Examples**: Ramayana royal courts, Mahabharata assemblies
- **Institutional Context**: Traditional Indian governance and religious hierarchies

---

*Generated from template: SUTRA_README_TEMPLATE.md*
