# Sutra 1.4.45: आधारोऽधिकरणम्

## Overview

**Sanskrit Text**: `आधारोऽधिकरणम्`  
**Transliteration**: ādhāro'dhikaraṇam  
**Translation**: The support/substratum [is called] अधिकरण

## Purpose

This sutra defines अधिकरण कारक as the आधार (support, substratum, foundation) in which or on which an action takes place. It establishes the fundamental concept of locative relationships in Sanskrit grammar, where अधिकरण represents the locus, base, or container of an action. This is crucial for understanding spatial, temporal, and abstract locative relationships.

## Implementation

### Function Signature
```javascript
function sutra1445(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies locative/support relationships as अधिकरण
- Analyzes spatial, temporal, and abstract substrata
- Handles physical and metaphorical supports
- Integrates with locative case analysis

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `spatial-analysis`
- **Shared Functions**: `case-operations.js`, `locative-analysis.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1445 } from './index.js';

// Example 1: Physical support
const result1 = sutra1445('मञ्च', {
  action: 'शयन',
  context: 'मञ्चे शेते',
  supportType: 'physical',
  case: 'locative'
});
console.log(result1); // { applies: true, karaka: 'अधिकरण', supportType: 'platform' }

// Example 2: Temporal support
const result2 = sutra1445('प्रातः', {
  action: 'जागरण',
  context: 'प्रातः जागर्ति',
  supportType: 'temporal'
});
console.log(result2); // { applies: true, karaka: 'अधिकरण', timeSupport: true }
```

### Advanced Usage
```javascript
// Complex locative analysis
const result3 = sutra1445('हृदय', {
  action: 'चिन्तन',
  context: 'हृदये चिन्तयति',
  supportType: 'abstract',
  metaphorical: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 35+ tests covering:
- Physical, temporal, and abstract support identification
- Locative case analysis and spatial relationships
- Container vs surface vs abstract locative concepts
- Multi-script support and error handling
- Integration with other कारक systems
- Edge cases with metaphorical and compound supports

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.45

# Run with coverage
npm test sutras/1.4.45 --coverage
```

## Technical Details

### Algorithm
1. **Support Detection**: Identify locative markers and spatial patterns
2. **Adhara Classification**: Categorize support type (physical, temporal, abstract)
3. **Locative Analysis**: Analyze the supportive relationship
4. **Karaka Assignment**: Assign अधिकरण designation

### Performance
- **Time Complexity**: O(n) for spatial pattern matching
- **Space Complexity**: O(1) for standard locative analysis
- **Optimization Notes**: Uses precompiled locative patterns for efficiency

### Edge Cases
- Multiple nested supports (supports within supports)
- Metaphorical vs literal locative relationships
- Temporal vs spatial ambiguities
- Abstract philosophical substrata

## Integration

### Related Sutras
- **1.4.46**: अधिकरणे च (extended अधिकरण rules)
- **2.3.36**: सप्तम्यधिकरणे च (locative case rules)
- **1.4.24**: धातुर्भावस्य (action-location relationships)

### Used By
- Spatial relationship parsers
- Temporal analysis systems
- Metaphorical language processors
- Geographic and architectural text analysis

## References

- **Panini's Ashtadhyayi**: 1.4.45 आधारोऽधिकरणम्
- **Classical Examples**: Vedic spatial descriptions and architectural texts
- **Grammatical Context**: Fundamental locative relationships in Sanskrit

---

*Generated from template: SUTRA_README_TEMPLATE.md*
