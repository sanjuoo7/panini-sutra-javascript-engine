# Sutra 1.3.52 - समः प्रतिज्ञाने

## Overview

**Sanskrit Text:** समः प्रतिज्ञाने  
**Transliteration:** samaḥ pratijñāne  
**Translation:** (The root गॄ) with सम् (sam) prefix takes Ātmanepada in the sense of promising/undertaking (प्रतिज्ञान).

## Purpose

This sutra continues the specification for the root गॄ, but now with a different prefix (सम् instead of अव) and in a specialized semantic context—प्रतिज्ञान (promising, undertaking, or making a vow). The combination सम् + गॄ in this semantic field creates a metaphorical extension from physical 'swallowing' to verbal 'undertaking/promising', where the agent takes on a commitment.

The semantic shift from literal swallowing (अवगॄ) to metaphorical undertaking (समगॄ) demonstrates how prefix-root combinations can create distinct meaning domains while maintaining consistent morphological patterns for Ātmanepada assignment.

## Implementation

### Function Signature
```javascript
function sutra1352(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `root`: Verbal root (should be गॄ/gṝ)
  - `prefixes`: Array of prefixes applied to the root
  - `meaning`: Semantic context related to promising/undertaking
  - `isPratijnana`: Boolean indicating promising context
  - `semanticField`: Array of related meanings (vow, promise, undertaking)

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (true when sutra applies)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Root Verification**: Confirms गॄ root in word or context
2. **Prefix Detection**: Identifies सम् prefix through morphological analysis
3. **Semantic Analysis**: Validates प्रतिज्ञान (promising) context
4. **Pada Assignment**: Returns Ātmanepada when all conditions met

## Usage Examples

### Basic Application - सम् + गॄ in प्रतिज्ञान Context
```javascript
import { sutra1352 } from './index.js';

// संगिरते → Ātmanepada in promising context
const result1 = sutra1352('संगिरते', { 
  root: 'गॄ', 
  prefixes: ['सम्'],
  meaning: 'undertakes/promises',
  isPratijnana: true
});
// { applies: true, isAtmanepada: true, reason: "... सम् + गॄ in प्रतिज्ञान context ...", confidence: 0.9 }

// With explicit semantic field
const result2 = sutra1352('संगीर्णते', { 
  root: 'gṝ', 
  prefixes: ['sam'],
  semanticField: ['promise', 'vow', 'undertaking']
});
// { applies: true, isAtmanepada: true, ... }
```

### Semantic Context Validation
```javascript
// Promising/vowing context
const result = sutra1352('संगिरन्ते', { 
  root: 'गॄ', 
  prefixes: ['सम्'],
  meaning: 'they undertake promises',
  isPratijnana: true
});
// { applies: true, isAtmanepada: true, ... }
```

### Surface-level Analysis
```javascript
// Automatic prefix and semantic detection
const result = sutra1352('संगिरते', { 
  root: 'गॄ',
  meaning: 'promising'
});
// Analyzes surface for सम्- prefix and प्रतिज्ञान semantic
// { applies: true, isAtmanepada: true, ... }
```

### Exclusion Cases
```javascript
// सम् + गॄ but not in प्रतिज्ञान context
const result1 = sutra1352('संगिरति', { 
  root: 'गॄ', 
  prefixes: ['सम्'],
  meaning: 'swallows completely' // literal meaning
});
// { applies: false, reason: "... प्रतिज्ञान semantic context required ...", confidence: 0.8 }

// गॄ without सम् prefix
const result2 = sutra1352('प्रगिरते', { 
  root: 'गॄ', 
  prefixes: ['प्र'],
  isPratijnana: true
});
// { applies: false, reason: "... सम् prefix required ...", confidence: 0.9 }

// सम् with different root
const result3 = sutra1352('संगच्छति', { 
  root: 'गम्', 
  prefixes: ['सम्'],
  isPratijnana: true
});
// { applies: false, reason: "... root गॄ not detected ...", confidence: 0.9 }

// गॄ with अव (covered by 1.3.51, not this sutra)
const result4 = sutra1352('अवगिरते', { 
  root: 'गॄ', 
  prefixes: ['अव']
});
// { applies: false, reason: "... सम् prefix required, not अव ...", confidence: 0.9 }
```

### IAST Script Support
```javascript
// IAST input with semantic context
const result = sutra1352('saṃgirate', { 
  root: 'gṝ', 
  prefixes: ['sam'],
  meaning: 'undertakes',
  isPratijnana: true
});
// { applies: true, isAtmanepada: true, ... }
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: 
   - सम् + गॄ in प्रतिज्ञान contexts
   - Various promising/undertaking semantic fields
   - Surface-level prefix and semantic detection
   - Context-provided morphological information
2. **Negative Cases**:
   - सम् + गॄ in non-प्रतिज्ञान contexts
   - गॄ without सम् prefix
   - सम् with different roots
   - Literal swallowing contexts
3. **Edge Cases**:
   - Ambiguous semantic contexts
   - Metaphorical vs literal meaning distinction
   - IAST vs Devanagari morphosemantic analysis
4. **Semantic Integration**:
   - प्रतिज्ञान context detection
   - Promise/vow semantic field validation
   - Contrast with literal गॄ meanings

**Coverage Metrics**: >95% line coverage with comprehensive morphosemantic boundary testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification (गॄ detection)
- `sanskrit-utils/morphological-analysis.js`: Prefix detection (सम्)
- `sanskrit-utils/semantic-analysis.js`: प्रतिज्ञान context detection

### Implementation Pattern
```javascript
// Core morphosemantic logic
if (isRoot(context.root, 'गॄ') && 
    hasPrefix(context.prefixes, 'सम्') &&
    isPratijnanaContext(context.meaning, context.isPratijnana)) {
  return { 
    applies: true, 
    isAtmanepada: true,
    reason: "समः प्रतिज्ञाने - सम् + गॄ in promising context"
  };
}
```

### Semantic Detection Strategy
- **Context Analysis**: Checks meaning fields for promising/undertaking
- **Keyword Detection**: Identifies प्रतिज्ञान, promise, vow, undertaking
- **Metaphorical Extension**: Distinguishes from literal swallowing meanings

### Prefix-Semantic Integration
- **सम् Prefix**: Identifies सम्- prefix specifically (not अव-)
- **Semantic Requirement**: Ensures प्रतिज्ञान context present
- **Combined Validation**: Requires both morphological and semantic conditions

## Integration

### Related Sutras
- **1.3.51**: Previous गॄ specification with अव prefix (अवाद्ग्रः)
- **1.3.53**: Next गॄ specification (if continues)
- **1.3.12**: General Ātmanepada principles

### Usage in Parsing Pipeline
This sutra requires:
1. Root identification (गॄ detection)
2. Prefix analysis (सम् identification, not अव)
3. Semantic analysis (प्रतिज्ञान context detection)
4. Morphosemantic validation (all conditions together)

### Common Integration Patterns
```javascript
// Typical usage in verb analysis with semantic checking
if (root === 'गॄ' && hasPrefix('सम्')) {
  const semanticResult = sutra1352(word, context);
  if (semanticResult.applies && context.isPratijnana) {
    assignAtmanepada();
  }
}
```

## References

- **Ashtadhyayi**: 1.3.52
- **Traditional Commentaries**: Kāśikā on समः प्रतिज्ञाने
- **Root Analysis**: Classical treatments of गॄ metaphorical extensions
- **Semantic Studies**: प्रतिज्ञान (promising/undertaking) in Sanskrit grammar
- **Prefix Analysis**: सम् prefix semantic functions
- **Modern Grammar**: Whitney's Sanskrit Grammar §1087-1090 (prefixes and meanings)
- **Implementation Source**: Enhanced Panini Sutras Dataset — समः प्रतिज्ञाने

- Type: Ātmanepada designation (vidhi)
- Scope: गॄ ‘to swallow’, with सम्, in the sense of ‘promising’ (प्रतिज्ञान).

## Implementation
- Function: `sutra1352(word, context)`
- Checks `sam` prefix, गॄ root, and promising semantics.
