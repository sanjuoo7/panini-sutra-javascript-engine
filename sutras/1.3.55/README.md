# Sutra 1.3.55 - दाणश्च सा चेच्चतुर्थ्यर्थे

## Overview

**Sanskrit Text:** दाणश्च सा चेच्चतुर्थ्यर्थे  
**Transliteration:** dāṇaś ca sā cec caturthyarthe  
**Translation:** And (after) the verb दा 'to give', preceded by सम्, and connected with a noun in the Instrumental case (3rd case), the Ātmanepada is used, provided this Instrumental case has the sense of the Dative (4th case).

## Purpose

This sutra extends the instrumental case rule from 1.3.54 (which applied to चर्) to the root दा ('to give') with सम् prefix, but adds a crucial semantic condition: the instrumental case must have dative meaning (चतुर्थ्यर्थे). This creates a complex morphosyntactic environment where an instrumental form functions semantically as a dative, representing the recipient of giving.

The चतुर्थ्यर्थे condition indicates that while the noun appears in instrumental case morphologically, it semantically represents the recipient (dative function), creating the specific environment where सम् + दा takes Ātmanepada.

## Implementation

### Function Signature
```javascript
function sutra1355(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `root`: Verbal root (should be दा/dā)
  - `prefixes`: Array of prefixes applied to the root
  - `hasInstrumental`: Boolean indicating instrumental case connection
  - `instrumentalNoun`: Noun in instrumental case connected to the verb
  - `hasDativeSense`: Boolean indicating dative meaning of instrumental
  - `meaning`: Semantic context related to giving
  - `syntacticContext`: Object containing case and semantic information

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (true when sutra applies)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Root Verification**: Confirms दा root in word or context
2. **Prefix Detection**: Identifies सम् prefix through morphological analysis
3. **Instrumental Analysis**: Validates तृतीया case connection
4. **Semantic Analysis**: Ensures चतुर्थ्यर्थ (dative sense) of instrumental case

## Usage Examples

### Basic Application - सम् + दा with Instrumental-as-Dative
```javascript
import { sutra1355 } from './index.js';

// संददाते with instrumental having dative sense
const result1 = sutra1355('संददाते', { 
  root: 'दा', 
  prefixes: ['सम्'],
  hasInstrumental: true,
  instrumentalNoun: 'ब्राह्मणेन', // "to/for the brahmin" (instrumental with dative sense)
  hasDativeSense: true,
  meaning: 'gives together to the brahmin'
});
// { applies: true, isAtmanepada: true, reason: "... सम् + दा with instrumental-dative ...", confidence: 0.9 }

// With syntactic context
const result2 = sutra1355('संदत्ते', { 
  root: 'dā', 
  prefixes: ['sam'],
  syntacticContext: { 
    instrumentalCase: true,
    dativeSense: true,
    recipient: 'गुरुणा' // "to/by the teacher" (ambiguous form with dative meaning)
  }
});
// { applies: true, isAtmanepada: true, ... }
```

### Semantic-Morphological Interface
```javascript
// Complex instrumental-dative construction
const result = sutra1355('संददते', { 
  root: 'दा', 
  prefixes: ['सम्'],
  hasInstrumental: true,
  instrumentalNoun: 'पुत्रेण', // "to/for the son" (instrumental form, dative meaning)
  hasDativeSense: true,
  meaning: 'gives completely to the son'
});
// { applies: true, isAtmanepada: true, ... }
```

### Contextual Semantic Analysis
```javascript
// Multiple elements with dative-sense instrumental
const result = sutra1355('संददन्ते', { 
  root: 'दा', 
  prefixes: ['सम्'],
  syntacticContext: {
    instrumentalCase: true,
    dativeSense: true,
    recipients: ['शिष्येण', 'मित्रेण'], // "to student, to friend"
    semanticRole: 'recipient'
  }
});
// { applies: true, isAtmanepada: true, ... }
```

### Exclusion Cases
```javascript
// सम् + दा with instrumental but no dative sense
const result1 = sutra1355('संददाति', { 
  root: 'दा', 
  prefixes: ['सम्'],
  hasInstrumental: true,
  instrumentalNoun: 'हस्तेन', // "by hand" (true instrumental, no dative sense)
  hasDativeSense: false
});
// { applies: false, reason: "... चतुर्थ्यर्थ (dative sense) required ...", confidence: 0.8 }

// दा without सम् prefix
const result2 = sutra1355('प्रददाति', { 
  root: 'दा', 
  prefixes: ['प्र'],
  hasInstrumental: true,
  hasDativeSense: true,
  instrumentalNoun: 'ब्राह्मणेन'
});
// { applies: false, reason: "... सम् prefix required ...", confidence: 0.9 }

// सम् with different root
const result3 = sutra1355('संगच्छति', { 
  root: 'गम्', 
  prefixes: ['सम्'],
  hasInstrumental: true,
  hasDativeSense: true
});
// { applies: false, reason: "... root दा not detected ...", confidence: 0.9 }

// Instrumental without dative sense
const result4 = sutra1355('संददाति', { 
  root: 'दा', 
  prefixes: ['सम्'],
  syntacticContext: { 
    instrumentalCase: true,
    dativeSense: false, // True instrumental meaning
    instrument: 'करेण' // "by hand"
  }
});
// { applies: false, reason: "... instrumental must have dative sense ...", confidence: 0.8 }
```

### IAST Script Support
```javascript
// IAST input with instrumental-dative context
const result = sutra1355('saṃdadāte', { 
  root: 'dā', 
  prefixes: ['sam'],
  hasInstrumental: true,
  instrumentalNoun: 'brāhmaṇena',
  hasDativeSense: true,
  meaning: 'gives together to brahmin'
});
// { applies: true, isAtmanepada: true, ... }
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: 
   - सम् + दा with instrumental cases having dative sense
   - Various recipient constructions
   - Context-provided semantic information
   - Multiple instrumental-dative elements
2. **Negative Cases**:
   - सम् + दा with true instrumental (no dative sense)
   - दा without सम् prefix
   - सम् with different roots
   - Instrumental without dative semantic function
3. **Edge Cases**:
   - Ambiguous case-meaning relationships
   - Complex semantic-morphological interfaces
   - IAST vs Devanagari morphosemantic analysis
4. **Semantic-Morphological Analysis**:
   - Dative sense detection in instrumental forms
   - Recipient role validation
   - चतुर्थ्यर्थ condition checking

**Coverage Metrics**: >95% line coverage with comprehensive morphosemantic boundary testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification (दा detection)
- `sanskrit-utils/morphological-analysis.js`: Prefix detection (सम्)
- `sanskrit-utils/syntax-analysis.js`: Instrumental case detection
- `sanskrit-utils/semantic-analysis.js`: Dative sense detection utilities
- `sanskrit-utils/case-analysis.js`: चतुर्थ्यर्थ validation

### Implementation Pattern
```javascript
// Core morphosemantic logic
if (isRoot(context.root, 'दा') && 
    hasPrefix(context.prefixes, 'सम्') &&
    hasInstrumentalConnection(context) &&
    hasDativeSense(context)) {
  return { 
    applies: true, 
    isAtmanepada: true,
    reason: "दाणश्च सा चेच्चतुर्थ्यर्थे - सम् + दा with instrumental-dative"
  };
}
```

### Semantic-Morphological Detection Strategy
- **Case Analysis**: Identifies तृतीया (instrumental) morphology
- **Semantic Analysis**: Detects चतुर्थ्यर्थ (dative meaning)
- **Interface Validation**: Ensures proper morphology-semantics relationship

### Dative Sense Implementation
- **Recipient Detection**: Identifies recipient semantic role
- **Case Function Analysis**: Distinguishes true instrumental from dative-sense instrumental
- **Contextual Validation**: Confirms meaningful dative relationship with giving

## Integration

### Related Sutras
- **1.3.54**: Previous instrumental case rule (समस्तृतीयायुक्तात्) for चर्
- **1.3.56**: Next specification (potential continuation)
- **1.3.12**: General Ātmanepada principles

### Usage in Parsing Pipeline
This sutra requires:
1. Root identification (दा detection)
2. Prefix analysis (सम् identification)
3. Morphological analysis (instrumental case detection)
4. Semantic analysis (dative sense validation)

### Common Integration Patterns
```javascript
// Typical usage in verb analysis with semantic-morphological checking
if (root === 'दा' && hasPrefix('सम्')) {
  const semanticResult = sutra1355(word, context);
  if (semanticResult.applies && 
      context.hasInstrumental && 
      context.hasDativeSense) {
    assignAtmanepada();
  }
}
```

## References

- **Ashtadhyayi**: 1.3.55
- **Traditional Commentaries**: Kāśikā on दाणश्च सा चेच्चतुर्थ्यर्थे
- **Root Analysis**: Classical treatments of दा (dā) 'to give'
- **Case Theory**: Instrumental-dative interface in Sanskrit syntax
- **Semantic Studies**: चतुर्थ्यर्थ (dative sense) analysis in traditional grammar
- **Modern Grammar**: Whitney's Sanskrit Grammar §§283-284, 294 (case functions)
- **Implementation Source**: Enhanced Panini Sutras Dataset
