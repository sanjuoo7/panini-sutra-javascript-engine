# Sutra 1.3.87: निगरणचलनार्थेभ्यः

## Overview

**Sanskrit Text**: `निगरणचलनार्थेभ्यः`  
**Transliteration**: nigaraṇacalanārthebhyaḥ  
**Translation**: And after causatives of verbs in the senses of swallowing/ingesting and moving/shaking, Parasmaipada is used even when the result accrues to the agent.

## Purpose

Extend Parasmaipada designation to causatives whose base-verb sense is निगरण (ingesting/swallowing) or चलन (moving/shaking), regardless of agent-benefit.

## Implementation

### Function Signature
```javascript
function sutra1387(word, context = {}) { /* ... */ }
```

### Key Features
- Semantic-gated rule: निगरण or चलन sense
- Requires causative (ṇic)
- Overrides agent-benefit constraint

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Shared Functions**: N/A

## Usage Examples

### Basic Usage
```javascript
import sutra1387 from './index.js';

sutra1387('glāpayati', { hasCausative: true, meaning: 'to swallow' });
// → applies: true, isParasmaipada: true
```

### Advanced Usage
```javascript
// चलन sense
sutra1387('calāpayati', { hasCausative: true, meaning: 'to shake' });
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 4 tests covering:
- Swallowing and moving senses
- Non-causative rejection
- Unrelated senses

### Running Tests
```bash
npm test sutras/1.3.87
npm test sutras/1.3.87 --coverage
```

## Technical Details

### Algorithm
- Validate inputs and infer script
- Check causative flag/patterns
- Match meaning to निगरण/चलन keywords

### Performance
- Time Complexity: O(1)
- Space Complexity: O(1)

### Edge Cases
- Mixed script inputs — handled by detectScript
- Meaning synonyms — covered with broad keywords (ingest/swallow/eat and move/shake/agitate)

## Integration

### Related Sutras
- **1.3.86**: Listed roots in causative → Parasmaipada
- **1.3.88–1.3.90**: Adjacent pada-designation conditions

### Used By
- Pada-selection logic

## References

- Panini: 1.3.87 (dataset translation)

---

*Generated from template: SUTRA_README_TEMPLATE.md*
