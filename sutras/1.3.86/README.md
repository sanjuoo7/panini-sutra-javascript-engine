# Sutra 1.3.86: बुधयुधनशजनेङ्प्रुद्रुस्रुभ्यो णेः

## Overview

**Sanskrit Text**: `बुधयुधनशजनेङ्प्रुद्रुस्रुभ्यो णेः`  
**Transliteration**: budhayudhanaśajaneṅ prudrusrubhyo ṇeḥ  
**Translation**: After the roots बुध्, युध्, नश्, जन्, इ (एङ्), प्रु, द्रु, and स्रु, when ending in the causative affix णे (i.e., ṇic), Parasmaipada is designated, even when the fruit of the action accrues to the agent.

## Purpose

Parasmaipada designation for a specific list of roots in causative constructions, overriding the agent-benefit condition that typically triggers Ātmanepada (cf. 1.3.74).

## Implementation

### Function Signature
```javascript
function sutra1386(word, context = {}) { /* ... */ }
```

### Key Features
- Recognizes the eight specified roots in both IAST and Devanagari
- Detects causative (ṇic/णे) via explicit context or surface patterns
- Overrides agent-benefit: still Parasmaipada even if benefitsAgent = true

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Shared Functions**: N/A

## Usage Examples

### Basic Usage
```javascript
import sutra1386 from './index.js';

const r1 = sutra1386('bodhayati', { root: 'budh', hasCausative: true });
// → { applies: true, isParasmaipada: true, isOptional: false, sutra: '1.3.86', ... }

const r2 = sutra1386('द्रावयति', { root: 'द्रु', hasCausative: true });
// → applies true
```

### Advanced Usage
```javascript
// Overrides 1.3.74 agent-benefit scenario
sutra1386('janayati', { root: 'jan', hasCausative: true, benefitsAgent: true });
// → still Parasmaipada due to 1.3.86 exception
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 6+ tests covering:
- All listed roots (sampled) in causative
- Non-causative rejection
- Agent-benefit override
- Invalid input guard

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.86

# Run with coverage
npm test sutras/1.3.86 --coverage
```

## Technical Details

### Algorithm
- Validate input and detect script
- Match root against the specified list (prefer context.root; fallback to surface inference)
- Confirm causative via context affix/flag or via standard causative surface patterns
- If both conditions met, return Parasmaipada with override flag

### Performance
- Time Complexity: O(1) list checks and substring tests
- Space Complexity: O(1)
- Optimization Notes: Root list kept local; use context.root for reliability

### Edge Cases
- Mixed-script or diacritic variants (naś/nas) handled via IAST list
- If context is missing, surface heuristics still attempt detection
- Benefits to agent ignored due to explicit exception

## Integration

### Related Sutras
- **1.3.74**: णिचश्च — causatives with agent-benefit → Ātmanepada (overridden here)
- **1.3.79–1.3.85**: Nearby Parasmaipada designations for prefixed roots

### Used By
- Higher-level pada-selection logic in the rule engine

## References

- **Panini's Ashtadhyayi**: 1.3.86
- **Implementation Notes**: Based on enhanced dataset description and traditional commentators
- **Test References**: Standard causative forms bodhayati, drāvayati, sṛāvayati, janayati, etc.

---

*Generated from template: SUTRA_README_TEMPLATE.md*
