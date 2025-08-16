# Sutra 1.3.50 - विभाषा विप्रलापे

## Overview

**Sanskrit Text:** विभाषा विप्रलापे  
**Transliteration:** vibhāṣā viparalāpe  
**Translation:** Optionally, (the root वद् takes Ātmanepada) in the sense of contradicting with each other.

## Purpose

This sutra establishes an optional rule (विभाषा) for वद् when used in the specific semantic context of विप्रलाप—mutual contradiction or arguing back and forth between parties. Unlike the previous mandatory rules (1.3.47-1.3.49), this gives speakers a choice between Ātmanepada and Parasmaipada based on stylistic preference or specific nuance desired.

The विप्रलाप context involves contradictory speech where parties speak against each other, creating a dynamic semantic field where the optional nature allows for expressing different perspectives on the action's relationship to the agent.

## Implementation

### Function Signature
```javascript
function sutra1350(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `root`: Verbal root (should be वद्/vad)
  - `meaning`: Semantic context, particularly contradiction/arguing
  - `isVipralaapa`: Boolean indicating contradictory speaking context
  - `semanticField`: Array of related meanings
  - `parties`: Information about multiple speakers/arguers

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (optional when sutra applies)
- `isOptional`: Boolean (true when sutra applies)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Root Verification**: Confirms वद् root in word or context
2. **Semantic Analysis**: Identifies विप्रलाप (contradictory speech) context
3. **Option Setting**: Sets `isOptional: true` when conditions met
4. **Context Integration**: May consider relationship to other वद् rules

## Usage Examples

### Basic Application - विप्रलाप Context
```javascript
import { sutra1350 } from './index.js';

// वद् in contradictory context → Optional Ātmanepada
const result1 = sutra1350('वदन्ते', { 
  root: 'वद्', 
  meaning: 'contradicting each other',
  isVipralaapa: true 
});
// { applies: true, isOptional: true, reason: "... विप्रलाप optional context ...", confidence: 0.85 }

// Same with specific semantic field
const result2 = sutra1350('वदते', { 
  root: 'vad', 
  semanticField: ['contradiction', 'arguing', 'disputing'],
  parties: ['speaker1', 'speaker2']
});
// { applies: true, isOptional: true, ... }
```

### Semantic Detection
```javascript
// Context-based semantic analysis
const result = sutra1350('विवदन्ते', { 
  root: 'वद्', 
  meaning: 'they contradict mutually',
  isVipralaapa: true
});
// { applies: true, isOptional: true, ... }
```

### Optional Usage Pattern
```javascript
// Demonstrating optional nature
const result1 = sutra1350('वदन्ते', { 
  root: 'वद्', 
  isVipralaapa: true,
  preferredPada: 'atmanepada'
});
// { applies: true, isOptional: true, isAtmanepada: true }

const result2 = sutra1350('वदन्ति', { 
  root: 'वद्', 
  isVipralaapa: true,
  preferredPada: 'parasmaipada'
});
// { applies: true, isOptional: true, isAtmanepada: false }
```

### Exclusion Cases
```javascript
// वद् without विप्रलाप context
const result1 = sutra1350('वदति', { 
  root: 'वद्', 
  meaning: 'simple speaking'
});
// { applies: false, reason: "... विप्रलाप context required ...", confidence: 0.9 }

// Different root in contradictory context
const result2 = sutra1350('गदन्ति', { 
  root: 'गद्', 
  isVipralaapa: true 
});
// { applies: false, reason: "... root वद् not detected ...", confidence: 0.9 }

// Non-contradictory speech context
const result3 = sutra1350('वदते', { 
  root: 'वद्', 
  meaning: 'articulate speaking' // connects to 1.3.48
});
// { applies: false, reason: "... not विप्रलाप context ...", confidence: 0.8 }
```

### IAST Script Support
```javascript
// IAST input with semantic context
const result = sutra1350('vadante', { 
  root: 'vad', 
  meaning: 'contradictory speech',
  isVipralaapa: true
});
// { applies: true, isOptional: true, ... }
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: 
   - वद् in विप्रलाप (contradictory) contexts
   - Optional pada selection demonstration
   - Semantic field detection
   - Multiple party contradiction scenarios
2. **Negative Cases**:
   - वद् in non-contradictory contexts
   - Different roots in विप्रलाप contexts
   - Simple speaking without contradiction
3. **Edge Cases**:
   - Ambiguous semantic contexts
   - Overlap with other वद् semantic rules
   - IAST vs Devanagari semantic analysis
4. **Optional Usage**:
   - Demonstrating विभाषा (optionality)
   - Choice between pada types
   - Preference setting validation

**Coverage Metrics**: >95% line coverage with comprehensive semantic boundary testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification
- `sanskrit-utils/semantic-analysis.js`: Meaning context detection
- `sanskrit-utils/context-analysis.js`: विप्रलाप detection utilities

### Implementation Pattern
```javascript
// Core semantic logic
if (isRoot(context.root, 'वद्') && 
    detectVipralaapa(context.meaning, context.isVipralaapa)) {
  return { 
    applies: true, 
    isOptional: true,
    reason: "विभाषा विप्रलापे - optional in contradictory context"
  };
}
```

### Semantic Detection Strategy
- **Context Analysis**: Checks meaning and semantic fields
- **Keyword Detection**: Identifies contradiction-related terms
- **Multi-party Analysis**: Detects mutual/reciprocal contradicting

### Optional Rule Implementation
- **विभाषा Handling**: Sets `isOptional: true`
- **Choice Mechanism**: Allows pada preference specification
- **Default Behavior**: May prefer Ātmanepada when semantic conditions strong

## Integration

### Related Sutras
- **1.3.47-1.3.49**: Other वद् semantic rules (these take precedence if applicable)
- **1.3.51**: Next वद् specification
- **1.3.12**: General Ātmanepada principles

### Usage in Parsing Pipeline
This sutra requires:
1. Root identification (वद्)
2. Semantic context analysis (विप्रलाप detection)
3. Optional rule handling (विभाषा implementation)
4. Integration with other वद् rules

### Common Integration Patterns
```javascript
// Typical usage in verb analysis with optional handling
if (root === 'वद्' && detectVipralaapa(context)) {
  const optionalResult = sutra1350(word, context);
  if (optionalResult.applies && optionalResult.isOptional) {
    // Allow user choice or apply default preference
    return handleOptionalPada(optionalResult);
  }
}
```

## References

- **Ashtadhyayi**: 1.3.50
- **Traditional Commentaries**: Kāśikā on विभाषा विप्रलापे
- **Semantic Analysis**: Classical treatments of विप्रलाप contexts
- **Optional Rules**: Traditional grammar विभाषा (optionality) principles
- **Modern Grammar**: Whitney's Sanskrit Grammar §762 (optional rules)
- **Implementation Source**: Enhanced Panini Sutras Dataset
