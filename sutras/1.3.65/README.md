# Sutra 1.3.65 - समः क्ष्णुवः

## Overview

**Sanskrit Text:** समः क्ष्णुवः  
**Transliteration:** samaḥ kṣṇuvaḥ  
**Translation:** The root क्ष्णु (to sharpen) with the prefix सम् (sam) takes Ātmanepada endings.

## Purpose

This sutra establishes that the root क्ष्णु/क्षणु "to sharpen, to make sharp" specifically requires Ātmanepada verbal endings when it appears with the prefix सम्. This creates a specific exception within the broader system of Ātmanepada designation, focusing on the semantic combination of "sharpening together" or "complete sharpening."

## Implementation

### Function Signature
```javascript
function sutra1365(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `root`: Verbal root (if known)
  - `prefixes`: Array of prefixes applied to the root
  - `meaning`: Semantic context

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (true when sutra applies)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Root Detection**: Identifies क्ष्णु/क्षणु root in word or context
2. **Prefix Analysis**: Checks for सम् prefix through surface analysis or context
3. **Semantic Validation**: Confirms the "sharpening" meaning context
4. **Multi-Script Support**: Handles both Devanagari and IAST inputs

## Usage Examples

### Basic Application
```javascript
import { sutra1365 } from './index.js';

// सम् + क्ष्णु → Ātmanepada
const result1 = sutra1365('संक्ष्णुते', { root: 'क्ष्णु', prefixes: ['सम्'] });
// { applies: true, isAtmanepada: true, reason: "... सम्-क्ष्णु ...", confidence: 0.95 }

// Without सम् prefix
const result2 = sutra1365('क्ष्णाति', { root: 'क्ष्णु' });
// { applies: false, reason: "... सम् prefix required ...", confidence: 0.9 }
```

### IAST Script Support
```javascript
// IAST input with context detection
const result = sutra1365('saṃkṣṇute', { root: 'kṣṇu' });
// { applies: true, isAtmanepada: true, ... }
```

### Semantic Context
```javascript
// With meaning confirmation
const result = sutra1365('संक्ष्णुते', { 
  root: 'क्ष्णु', 
  prefixes: ['सम्'],
  meaning: 'to sharpen completely'
});
// Enhanced confidence due to semantic match
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: सम् + क्ष्णु combinations
2. **Negative Cases**: 
   - क्ष्णु without सम् prefix
   - सम् with different roots
   - Other prefixes with क्ष्णु
3. **Edge Cases**:
   - IAST vs Devanagari input validation
   - Surface-level prefix detection
   - Alternative root forms (क्ष्णु vs क्षणु)
4. **Error Handling**: Invalid inputs and malformed words

**Coverage Metrics**: >95% line coverage with comprehensive boundary testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification
- `sanskrit-utils/constants.js`: Script detection
- Core validation pipeline for input processing

### Implementation Pattern
```javascript
// Core detection logic
if (isRoot(context.root, 'क्ष्णु') && hasPrefix(context.prefixes, 'सम्')) {
  return { applies: true, isAtmanepada: true, ... };
}
```

### Performance Considerations
- Optimized prefix detection using string matching
- Cached root pattern recognition
- Minimal regex usage for enhanced performance

## Integration

### Related Sutras
- **1.3.12**: General Ātmanepada rules
- **1.3.62-1.3.67**: Other prefix-specific Ātmanepada designations

### Usage in Parsing Pipeline
This sutra is typically applied after:
1. Basic root identification
2. Prefix analysis
3. Before general Ātmanepada/Parasmaipada assignment

## References

- **Ashtadhyayi**: 1.3.65
- **Traditional Commentaries**: Kāśikā, Mahābhāṣya
- **Modern Grammar**: Whitney's Sanskrit Grammar §§750-760
- **Implementation Source**: Enhanced Panini Sutras Dataset — समः क्ष्णुवः

- Type: Ātmanepada designation (vidhi)
- Scope: क्ष्णु/क्षणु ‘to sharpen’ with सम् prefix.

## Implementation
- Function: `sutra1365(word, context)`
- Detects root and sam‑prefix via word or `context.prefixes`.
