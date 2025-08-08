# State Layer - Complete Sutra Integration

This directory provides a comprehensive stateful interface for chaining sutra applications across all implemented sutras (1.1.1-1.1.7).

## Goals
- Provide immutable state object passed through sutra wrappers
- Accumulate definitions (saṃjñā) and derived phonological/morphological facts
- Preserve existing per-sutra APIs untouched (backward compatibility)
- Supply rich diagnostics for inspection and debugging
- Enable flexible pipeline composition for different analysis needs

## State Shape
```javascript
{
  version: 1,
  surface: "current_word",
  original: "original_input",
  history: [ 
    { timestamp, sutra, name, input, output, notes } 
  ],
  facts: { 
    // Phonological facts from 1.1.1-1.1.3, 1.1.7
    hasVrddhiInitial, hasGunaInitial, ikVowelCount, endsWithConsonant,
    // Morphological facts from 1.1.4-1.1.5
    shouldBlockGunaVrddhi, dhatuLopaOccurs, isArdhadhatikaAffix, confidence,
    hasItMarkers, blocksGunaVrddhi, itMarkerType,
    // Precedence facts from 1.1.6
    precedenceContext, elementCount, hasPrecedence
  },
  definitions: { 
    vrddhiVowels, gunaVowels, consonantInventory
  },
  diagnostics: { 
    '1.1.1': {...}, '1.1.2': {...}, '1.1.3': {...}, 
    '1.1.4': { primaryResult, internalDiagnostics, metrics, dhatu, affix },
    '1.1.5': {...}, '1.1.6': {...}, '1.1.7': {...}
  },
  meta: { createdAt, applied: [] }
}
```

## Available Pipelines

### Complete Pipeline
Applies all sutras in sequence with full analysis:
```javascript
import { createInitialState } from './state-core.js';
import { applyCompletePipeline } from './wrappers-1.1.x.js';

let state = createInitialState('gam');
state = applyCompletePipeline(state, 'gam', 'ya', 'guna');
// Results in comprehensive analysis across all sutras
```

### Specialized Pipelines

**Phonological Pipeline** (1.1.1, 1.1.2, 1.1.3, 1.1.7):
```javascript
import { applyPhonologicalPipeline } from './wrappers-1.1.x.js';
state = applyPhonologicalPipeline(state);
// Focuses on vowel classification and final consonant analysis
```

**Morphological Pipeline** (1.1.4, 1.1.5):
```javascript
import { applyMorphologicalPipeline } from './wrappers-1.1.x.js';
state = applyMorphologicalPipeline(state, 'vid', 'kta', 'guna');
// Focuses on dhātu-lopa and it-marker analysis
```

**Definitional Pipeline** (1.1.1, 1.1.2, 1.1.3, 1.1.7):
```javascript
import { applyDefinitionalPipeline } from './wrappers-1.1.x.js';
state = applyDefinitionalPipeline(state);
// Establishes core definitions and classifications
```

### Individual Sutra Wrappers

Each sutra has its own state wrapper:
- `apply111State(state)` - vṛddhi vowel classification
- `apply112State(state)` - guṇa vowel classification  
- `apply113State(state)` - ik vowel scope analysis
- `apply114State(state, dhatu, affix, operation)` - dhātu-lopa analysis
- `apply115State(state, dhatu, affix, operation)` - it-marker analysis
- `apply116State(state, elements, context)` - precedence analysis
- `apply117State(state)` - final consonant classification

## Usage Examples

See `examples.js` for comprehensive usage patterns including:
- Complete morphological analysis
- Phonological classification only
- Step-by-step analysis with individual wrappers
- Diagnostics and error handling

## Integration with 1.1.4 Advanced Features

The 1.1.4 wrapper (`apply114State`) fully integrates with the advanced features:
- Captures confidence scores, penalty information, and syllable analysis
- Includes internal diagnostics from the rule engine
- Provides metrics on fallback usage and rule application
- Supports all configuration modes (legacy, hybrid, rules)

## Testing

Run the state pipeline tests:
```bash
npm test sutras/state/state.test.js
```

## Future Extensions

- Add remaining sutras as they are implemented
- Enhance precedence analysis in 1.1.6 for complex rule interactions
- Add pipeline optimization for common use cases
- Implement state serialization/deserialization for persistence
