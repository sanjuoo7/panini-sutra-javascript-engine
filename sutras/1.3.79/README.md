# Sutra 1.3.79: अनुपराभ्यां कृञः

## Overview

**Sanskrit Text**: `अनुपराभ्यां कृञः`  
**Transliteration**: anuparābhyāṁ kṛñaḥ  
**Translation**: For the root कृ (to do/make) when preceded by अनु or पर, Parasmaipada is used, even when the action’s fruit accrues to the agent (esp. in divulging/revealing senses).

## Purpose

Overrides the agent-benefit Ātmanepada tendency for कृ when prefixed with अनु/पर, prescribing Parasmaipada.

## Implementation

### Function Signature
```javascript
function sutra1379(word, context = {}) { /* ... */ }
```

### Key Features
- Detects root कृ (kṛ) with अनु/पर prefixes
- Overrides Ātmanepada due to agent-benefit; forces Parasmaipada
- Optional semantic boost for divulging/revealing senses

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

### Basic Usage
```javascript
import sutra1379 from './index.js';

sutra1379('अनुकरोति', { root: 'कृ', prefix: 'अनु' });
// { applies: true, isParasmaipada: true, ... }

sutra1379('परकरोति', { root: 'kṛ', upasarga: 'para', benefitsAgent: true });
// { applies: true, isParasmaipada: true, ... }
```

### Advanced Usage
```javascript
// Sense-based confidence boost
sutra1379('अनुकरोति', { root: 'कृ', prefix: 'अनु', meaning: 'to reveal' });
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 4 tests covering:
- Positive cases with अनु/पर
- Negative case without prefix
- Input validation

### Running Tests
```bash
npm test sutras/1.3.79
```

## Technical Details

### Algorithm
- Validate input and script
- Detect root कृ and prefixes अनु/पर
- Return Parasmaipada designation with confidence

### Performance
- Time Complexity: O(n) for pattern checks
- Space Complexity: O(1)

### Edge Cases
- Mixed-script inputs
- Root detection via word surface when context not provided

## Integration

### Related Sutras
- 1.3.78: Default Parasmaipada
- 1.3.72–1.3.77: Ātmanepada rules overridden by this exception

### Used By
- Voice assignment engine

## References

- **Panini's Ashtadhyayi**: 1.3.79 अनुपराभ्यां कृञः

---

*Generated from template: SUTRA_README_TEMPLATE.md*
