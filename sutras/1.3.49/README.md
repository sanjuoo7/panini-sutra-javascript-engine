# Sutra 1.3.49 - अनोरकर्मकात्

## Overview

**Sanskrit Text:** अनोरकर्मकात्  
**Transliteration:** anor akarmakāt  
**Translation:** From the intransitive (usage) with अनु (prefix), (the root वद्) takes Ātmanepada.

## Purpose

This sutra creates a specific refinement to the previous rules about वद् (1.3.47-1.3.48), establishing that when वद् appears with the prefix अनु and is used intransitively, it takes Ātmanepada endings. The rule combines morphological (prefix presence) and syntactic (intransitivity) conditions to determine the appropriate pada choice.

The intransitive constraint (अकर्मकात्) is crucial—it means the action doesn't pass to a direct object but remains with the agent, making Ātmanepada (where the fruit of action stays with the agent) semantically appropriate.

## Implementation

### Function Signature
```javascript
function sutra1349(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `root`: Verbal root (should be वद्/vad)
  - `prefixes`: Array of prefixes applied to the root
  - `isIntransitive`: Boolean indicating intransitive usage
  - `meaning`: Semantic context
  - `hasObject`: Boolean indicating presence of direct object

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (true when sutra applies)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Root Verification**: Confirms वद् root in word or context
2. **Prefix Detection**: Identifies अनु prefix through surface analysis or context
3. **Transitivity Analysis**: Ensures intransitive usage (no direct object)
4. **Integration Check**: May consider continuation from 1.3.48 articulate contexts

## Usage Examples

### Basic Application - अनु + वद् Intransitive
```javascript
import { sutra1349 } from './index.js';

// अनुवद् intransitive → Ātmanepada
const result1 = sutra1349('अनुवदते', { 
  root: 'वद्', 
  prefixes: ['अनु'], 
  isIntransitive: true 
});
// { applies: true, isAtmanepada: true, reason: "... अनु + वद् intransitive ...", confidence: 0.9 }

// With articulate context (connecting to 1.3.48)
const result2 = sutra1349('अनुवदन्ते', { 
  root: 'vad', 
  prefixes: ['anu'], 
  isIntransitive: true,
  meaning: 'following articulate speech'
});
// { applies: true, isAtmanepada: true, ... }
```

### Surface-level Prefix Detection
```javascript
// Surface detection of अनु prefix
const result = sutra1349('अनुवदते', { 
  root: 'वद्', 
  isIntransitive: true 
});
// Analyzes surface for अनु- pattern
// { applies: true, isAtmanepada: true, ... }
```

### Exclusion Cases
```javascript
// अनुवद् but transitive → Does not apply
const result1 = sutra1349('अनुवदति', { 
  root: 'वद्', 
  prefixes: ['अनु'], 
  isIntransitive: false,
  hasObject: true
});
// { applies: false, reason: "... requires intransitive usage ...", confidence: 0.8 }

// वद् without अनु prefix
const result2 = sutra1349('वदते', { 
  root: 'वद्', 
  isIntransitive: true 
});
// { applies: false, reason: "... अनु prefix required ...", confidence: 0.9 }

// Different root with अनु
const result3 = sutra1349('अनुगच्छति', { 
  root: 'गम्', 
  prefixes: ['अनु'], 
  isIntransitive: true 
});
// { applies: false, reason: "... root वद् not detected ...", confidence: 0.9 }
```

### IAST Script Support
```javascript
// IAST input with context analysis
const result = sutra1349('anuvade', { 
  root: 'vad', 
  prefixes: ['anu'], 
  isIntransitive: true
});
// { applies: true, isAtmanepada: true, ... }
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: 
   - अनु + वद् in intransitive usage
   - Surface-level prefix detection
   - Context-provided prefix information
   - Connection to articulate speech contexts
2. **Negative Cases**:
   - अनु + वद् in transitive usage
   - वद् without अनु prefix
   - अनु with other roots
   - Transitive usage with direct objects
3. **Edge Cases**:
   - Ambiguous transitivity contexts
   - IAST vs Devanagari morphological analysis
   - Compound prefix constructions
4. **Morphosyntactic Analysis**:
   - Prefix identification validation
   - Transitivity determination
   - Object presence/absence detection

**Coverage Metrics**: >95% line coverage with comprehensive morphosyntactic boundary testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification and prefix analysis
- `sanskrit-utils/morphological-analysis.js`: Prefix detection utilities
- `sanskrit-utils/syntax-analysis.js`: Transitivity evaluation

### Implementation Pattern
```javascript
// Core morphosyntactic logic
if (isRoot(context.root, 'वद्') && 
    hasPrefix(context.prefixes, 'अनु') && 
    context.isIntransitive) {
  return { applies: true, isAtmanepada: true };
}
```

### Prefix Detection Strategy
- **Context Analysis**: Checks `context.prefixes` array
- **Surface Analysis**: Identifies अनु- pattern in word surface
- **Morphological Parsing**: Decomposes compound forms

### Transitivity Analysis
- **Object Detection**: Absence of direct object (अकर्मक)
- **Semantic Clues**: Intransitive meaning indicators
- **Syntactic Context**: Sentence structure analysis

## Integration

### Related Sutras
- **1.3.47-1.3.48**: Previous वद् semantic specifications
- **1.3.12**: General Ātmanepada rules
- **1.3.87**: Other prefix-dependent Ātmanepada rules

### Usage in Parsing Pipeline
This sutra requires:
1. Root identification (वद्)
2. Prefix analysis (अनु detection)
3. Transitivity determination (अकर्मक validation)
4. Morphosyntactic integration

### Common Integration Patterns
```javascript
// Typical usage in verb analysis
if (root === 'वद्' && hasPrefix('अनु')) {
  const syntacticResult = sutra1349(word, context);
  if (syntacticResult.applies) {
    assignAtmanepada();
  }
}
```

## References

- **Ashtadhyayi**: 1.3.49
- **Traditional Commentaries**: Kāśikā on अनोरकर्मकात्
- **Morphological Analysis**: Classical treatments of उपसर्ग (prefixes)
- **Syntactic Theory**: अकर्मक धातु analysis in traditional grammar
- **Modern Grammar**: Whitney's Sanskrit Grammar §§1087-1090 (prefixes)
- **Implementation Source**: Enhanced Panini Sutras Dataset
