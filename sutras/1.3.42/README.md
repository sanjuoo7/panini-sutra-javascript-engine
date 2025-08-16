# Sutra 1.3.42: प्रोपाभ्यां समर्थाभ्याम्

## Overview

**Sanskrit Text**: `प्रोपाभ्यां समर्थाभ्याम्`
**Transliteration**: propābhyāṃ samarthābhyām
**Translation**: With vi- + kram, use Ātmanepada when pra-/upa- convey the same sense (beginning/commencement).

## Purpose

Determines Ātmanepada for the root क्रम् when compounded with vi- and additionally with pra/upa indicating the inception of an action.

## Implementation

### Function Signature
```javascript
export function sutra1342(word, context = {}) {}
```

### Key Features
- Multi-script support (IAST/Devanagari)
- Prefix detection for vi-, pra-, upa-
- Semantic gating for beginning/commencement sense

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

```javascript
import { sutra1342 } from './index.js';

const r1 = sutra1342('विक्रमते', { prefixes: ['वि','प्र'], meaning: 'begin the action' });
const r2 = sutra1342('vikramate', { prefixes: ['vi','upa'], meaning: 'commencement' });
```

## Test Coverage

**Test File**: `index.test.js`
**Test Cases**: 4 tests covering:
- Positive pra/upa cases
- Missing vi- prefix
- Semantic mismatch

### Running Tests
```bash
npm test sutras/1.3.42
```

## Technical Details

### Algorithm
- Validate input and detect script
- Ensure kram root and vi- prefix
- Check for pra/upa presence
- Verify beginning/commencement semantics

### Performance
- Time Complexity: O(1)
- Space Complexity: O(1)

### Edge Cases
- Ambiguous prefixes provided only in context
- Non-beginning semantics

## Integration

### Related Sutras
- 1.3.38–1.3.41 (क्रम् series)

---

*Generated from template: SUTRA_README_TEMPLATE.md*
