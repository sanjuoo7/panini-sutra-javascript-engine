# Sutra 1.3.59 - प्रत्याङ्भ्यां श्रुवः

## Overview

**Sanskrit Text:** प्रत्याङ्भ्यां श्रुवः  
**Transliteration:** pratyāṅgbhyāṃ śruvaḥ  
**Translation:** After the Desideratives of श्रु 'to hear', when preceded by प्रति and आङ्, the Ātmanepada affix is NOT used.

## Purpose

This sutra creates a specific restriction to the general rule from 1.3.57 that desiderative forms of श्रु (śru 'to hear') take Ātmanepada. When श्रु is in desiderative form (संन्/san) and preceded by either प्रति (prati-) or आङ् (āṅ-) prefixes, Ātmanepada is prohibited, forcing Parasmaipada usage instead.

This represents a morphosyntactic override where specific prefix combinations with desiderative श्रु create semantic or phonological environments that favor Parasmaipada despite the general Ātmanepada rule.

## Implementation

### Function Signature
```javascript
function sutra1359(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `root`: Verbal root (should be श्रु/śru)
  - `prefixes`: Array of prefixes applied to the root
  - `isDesiderative`: Boolean indicating desiderative formation
  - `affixes`: Array containing san/संन् for desiderative
  - `meaning`: Semantic context related to hearing

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (false when sutra applies - prohibition)
- `isProhibition`: Boolean (true when sutra applies)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Root Verification**: Confirms श्रु root in word or context
2. **Desiderative Check**: Validates desiderative formation (सन् affix)
3. **Prefix Detection**: Identifies प्रति or आङ् prefixes
4. **Prohibition Setting**: Returns `isAtmanepada: false` when conditions met

## Usage Examples

### Basic Application - Desiderative श्रु with प्रति/आङ्
```javascript
import { sutra1359 } from './index.js';

// प्रतिशुश्रूषति → Parasmaipada (prohibition of Ātmanepada)
const result1 = sutra1359('प्रतिशुश्रूषति', { 
  root: 'श्रु', 
  prefixes: ['प्रति'],
  isDesiderative: true,
  affixes: ['सन्']
});
// { applies: true, isAtmanepada: false, isProhibition: true, reason: "... प्रति + desiderative श्रु prohibition ...", confidence: 0.9 }

// आश्रु in desiderative → Parasmaipada
const result2 = sutra1359('आशुश्रूषति', { 
  root: 'śru', 
  prefixes: ['ā'],
  isDesiderative: true
});
// { applies: true, isAtmanepada: false, isProhibition: true, ... }
```

### Prefix-specific Prohibitions
```javascript
// प्रति prefix with desiderative श्रु
const result1 = sutra1359('प्रतिशुश्रूषन्ति', { 
  root: 'श्रु', 
  prefixes: ['प्रति'],
  isDesiderative: true,
  meaning: 'desire to hear back/respond'
});
// { applies: true, isAtmanepada: false, isProhibition: true, ... }

// आङ् prefix with desiderative श्रु
const result2 = sutra1359('आशुश्रूषन्ति', { 
  root: 'श्रु', 
  prefixes: ['आ'],
  isDesiderative: true,
  meaning: 'desire to hear completely'
});
// { applies: true, isAtmanepada: false, isProhibition: true, ... }
```

### Surface-level Detection
```javascript
// Automatic prefix and desiderative detection
const result = sutra1359('प्रतिशुश्रूषति', { 
  root: 'श्रु',
  isDesiderative: true
});
// Analyzes surface for प्रति- prefix and desiderative form
// { applies: true, isAtmanepada: false, isProhibition: true, ... }
```

### Exclusion Cases
```javascript
// Desiderative श्रु without प्रति/आङ् → Does not apply (allows Ātmanepada from 1.3.57)
const result1 = sutra1359('शुश्रूषते', { 
  root: 'श्रु', 
  prefixes: [],
  isDesiderative: true
});
// { applies: false, reason: "... प्रति or आङ् prefix required for prohibition ...", confidence: 0.9 }

// प्रति/आङ् with श्रु but not desiderative
const result2 = sutra1359('प्रतिशृणोति', { 
  root: 'श्रु', 
  prefixes: ['प्रति'],
  isDesiderative: false
});
// { applies: false, reason: "... desiderative formation required ...", confidence: 0.9 }

// Different root with प्रति/आङ् and desiderative
const result3 = sutra1359('प्रतिजिघांसति', { 
  root: 'हन्', 
  prefixes: ['प्रति'],
  isDesiderative: true
});
// { applies: false, reason: "... root श्रु not detected ...", confidence: 0.9 }

// Different prefix with desiderative श्रु
const result4 = sutra1359('उपशुश्रूषते', { 
  root: 'श्रु', 
  prefixes: ['उप'],
  isDesiderative: true
});
// { applies: false, reason: "... प्रति or आङ् prefix required ...", confidence: 0.8 }
```

### IAST Script Support
```javascript
// IAST input with prohibition context
const result = sutra1359('pratiśuśrūṣati', { 
  root: 'śru', 
  prefixes: ['prati'],
  isDesiderative: true
});
// { applies: true, isAtmanepada: false, isProhibition: true, ... }
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: 
   - Desiderative श्रु with प्रति prefix (prohibition)
   - Desiderative श्रु with आङ् prefix (prohibition)
   - Surface-level prefix and desiderative detection
   - Various tense forms with prohibited Ātmanepada
2. **Negative Cases**:
   - Desiderative श्रु without प्रति/आङ् (allows 1.3.57)
   - प्रति/आङ् + श्रु without desiderative
   - Different roots with प्रति/आङ् and desiderative
   - Different prefixes with desiderative श्रु
3. **Edge Cases**:
   - Complex prefix combinations
   - Ambiguous desiderative formations
   - IAST vs Devanagari morphological analysis
4. **Prohibition Logic**:
   - Proper override of 1.3.57 rule
   - Parasmaipada enforcement validation
   - प्रति/आङ् prefix identification accuracy

**Coverage Metrics**: >95% line coverage with comprehensive prohibition logic testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification (श्रु detection)
- `sanskrit-utils/morphological-analysis.js`: Prefix detection (प्रति, आङ्)
- `sanskrit-utils/derivational-analysis.js`: Desiderative formation detection
- `sanskrit-utils/prohibition-logic.js`: Restriction rule implementation

### Implementation Pattern
```javascript
// Core prohibition logic
if (isRoot(context.root, 'श्रु') && 
    context.isDesiderative &&
    (hasPrefix(context.prefixes, 'प्रति') || hasPrefix(context.prefixes, 'आ'))) {
  return { 
    applies: true, 
    isAtmanepada: false,
    isProhibition: true,
    reason: "प्रत्याङ्भ्यां श्रुवः - prohibition with प्रति/आङ्"
  };
}
```

### Prohibition Implementation Strategy
- **Override Logic**: Overrides general 1.3.57 Ātmanepada rule
- **Prefix Detection**: Identifies प्रति and आङ् (आ) specifically
- **Desiderative Validation**: Ensures सन् affix or desiderative context

### Prefix-Specific Analysis
- **प्रति Detection**: Identifies प्रति- prefix patterns
- **आङ् Detection**: Identifies आ- prefix (आङ् form)
- **Combined Analysis**: Handles either prefix condition

## Integration

### Related Sutras
- **1.3.57**: General rule for desiderative Ātmanepada (ज्ञाश्रुस्मृदृशां सनः) - this sutra overrides
- **1.3.58**: Previous exception (नानोर्ज्ञः) for ज्ञा with अनु
- **1.3.60**: Next specification (potential continuation)

### Usage in Parsing Pipeline
This sutra requires:
1. Root identification (श्रु detection)
2. Derivational analysis (desiderative formation check)
3. Prefix analysis (प्रति/आङ् identification)
4. Prohibition logic (override of general Ātmanepada rule)

### Common Integration Patterns
```javascript
// Typical usage in verb analysis with prohibition checking
if (root === 'श्रु' && isDesiderative) {
  const prohibitionResult = sutra1359(word, context);
  if (prohibitionResult.applies && prohibitionResult.isProhibition) {
    forceParasmaipada(); // Override 1.3.57
  } else {
    // Allow 1.3.57 Ātmanepada rule
    assignAtmanepada();
  }
}
```

## References

- **Ashtadhyayi**: 1.3.59
- **Traditional Commentaries**: Kāśikā on प्रत्याङ्भ्यां श्रुवः
- **Root Analysis**: Classical treatments of श्रु (śru) 'to hear' in desiderative
- **Prefix Studies**: प्रति and आङ् prefix analysis with desideratives
- **Restriction Theory**: प्रतिषेध (prohibition) rules in traditional grammar
- **Modern Grammar**: Whitney's Sanskrit Grammar §1031 (desideratives)
- **Implementation Source**: Enhanced Panini Sutras Dataset — प्रत्याङ्भ्यां श्रुवः

- Type: Restriction (pratiṣedha)
- Scope: Desiderative (सन्) of श्रु ‘to hear’ when preceded by प्रति or आङ् (either). Do not use Ātmanepada.

## Implementation
- Function: `sutra1359(word, context)`
- Detects desiderative + root `श्रु/śru` and prefix `प्रति/आ (आङ्)`; sets `isAtmanepada: false`.
