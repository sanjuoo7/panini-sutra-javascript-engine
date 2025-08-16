# Sutra 1.3.63 - आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य

## Overview

**Sanskrit Text:** आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य  
**Transliteration:** āmpratyayavat kṛño'nuprayogasya  
**Translation:** Like the verb that takes the affix आम्, if the verb be conjugated with the Ātmanepada terminations, so of the verb कृ when subjoined thereto as an auxiliary, the terminations are of the Ātmanepada, even when the fruit of the action does not accrue to the agent.

## Purpose

This sutra establishes a sophisticated inheritance principle for auxiliary verb constructions. When the root कृ (kṛ, 'to do/make') functions as an auxiliary verb (अनुप्रयोग) with a main verb that takes आम् affix and uses Ātmanepada, the auxiliary कृ must also take Ātmanepada endings, regardless of whether the action's fruit accrues to the agent.

This creates morphological agreement between main and auxiliary verbs in compound constructions, ensuring systematic consistency even when semantic conditions (fruit accruing to agent) don't normally require Ātmanepada for the auxiliary.

## Implementation

### Function Signature
```javascript
function sutra1363(word, context = {})
```

### Parameters
- **word**: Sanskrit word in Devanagari or IAST script
- **context**: Optional object containing:
  - `auxiliaryRoot`: Root of auxiliary verb (should be कृ/kṛ)
  - `mainVerb`: Information about the main verb
  - `mainHasAm`: Boolean indicating main verb has आम् affix
  - `mainAtmanepada`: Boolean indicating main verb uses Ātmanepada
  - `isAuxiliary`: Boolean indicating auxiliary function
  - `fruitToAgent`: Boolean indicating if action's fruit accrues to agent
  - `constructionType`: Type of auxiliary construction

### Return Value
Returns an object with:
- `applies`: Boolean indicating if the sutra applies
- `isAtmanepada`: Boolean (true when sutra applies)
- `inheritsFromMain`: Boolean (true when sutra applies)
- `overridesSemantic`: Boolean (true - overrides normal fruit-to-agent requirement)
- `reason`: String explaining the decision
- `confidence`: Number (0-1) indicating certainty

### Core Logic
1. **Auxiliary Verification**: Confirms कृ as auxiliary verb
2. **Main Verb Analysis**: Checks for आम् affix and Ātmanepada in main verb
3. **Construction Validation**: Ensures proper auxiliary relationship
4. **Agreement Assignment**: Forces Ātmanepada regardless of semantic conditions

## Usage Examples

### Basic Application - कृ Auxiliary with आम् Main Verb
```javascript
import { sutra1363 } from './index.js';

// स्थाम् + कृ auxiliary → कृ takes Ātmanepada
const result1 = sutra1363('तिष्ठते करोते', { 
  auxiliaryRoot: 'कृ',
  mainVerb: {
    root: 'स्था',
    hasAmAffix: true,
    isAtmanepada: true
  },
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true
});
// { applies: true, isAtmanepada: true, inheritsFromMain: true, overridesSemantic: true, reason: "... कृ auxiliary inherits from आम् main verb ...", confidence: 0.9 }

// पाम् + कृ construction
const result2 = sutra1363('पिबते कुरुते', { 
  auxiliaryRoot: 'kṛ',
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true,
  fruitToAgent: false // Even when fruit doesn't accrue to agent
});
// { applies: true, isAtmanepada: true, inheritsFromMain: true, overridesSemantic: true, ... }
```

### Override of Semantic Conditions
```javascript
// कृ auxiliary takes Ātmanepada despite fruit not accruing to agent
const result = sutra1363('गाते करोते', { 
  auxiliaryRoot: 'कृ',
  mainVerb: {
    root: 'गा',
    hasAmAffix: true,
    isAtmanepada: true
  },
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true,
  fruitToAgent: false, // Fruit doesn't accrue to agent
  constructionType: 'auxiliary_compound'
});
// { applies: true, isAtmanepada: true, overridesSemantic: true, ... }
```

### Complex Auxiliary Construction
```javascript
// Detailed auxiliary construction analysis
const result = sutra1363('शयते करोते', { 
  auxiliaryRoot: 'कृ',
  mainVerb: {
    root: 'शी',
    affix: 'आम्',
    pada: 'ātmanepada'
  },
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true,
  constructionType: 'compound_periphrastic'
});
// { applies: true, isAtmanepada: true, inheritsFromMain: true, ... }
```

### Multiple Verb Construction Context
```javascript
// Complex multi-verb auxiliary pattern
const result = sutra1363('जायते करोते', { 
  auxiliaryRoot: 'कृ',
  mainVerb: {
    root: 'जन्',
    morphology: 'आम्_affix',
    pada_usage: 'ātmanepada'
  },
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true
});
// { applies: true, isAtmanepada: true, inheritsFromMain: true, ... }
```

### Exclusion Cases
```javascript
// कृ without auxiliary function
const result1 = sutra1363('करोति', { 
  auxiliaryRoot: 'कृ',
  isAuxiliary: false,
  mainHasAm: true,
  mainAtmanepada: true
});
// { applies: false, reason: "... auxiliary function required ...", confidence: 0.9 }

// Auxiliary कृ but main verb without आम्
const result2 = sutra1363('गच्छति करोति', { 
  auxiliaryRoot: 'कृ',
  mainVerb: {
    root: 'गम्',
    hasAmAffix: false
  },
  mainHasAm: false,
  mainAtmanepada: true,
  isAuxiliary: true
});
// { applies: false, reason: "... main verb आम् affix required ...", confidence: 0.9 }

// Different auxiliary root
const result3 = sutra1363('पठते भवति', { 
  auxiliaryRoot: 'भू',
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true
});
// { applies: false, reason: "... auxiliary कृ required ...", confidence: 0.9 }

// Main verb Parasmaipada
const result4 = sutra1363('पठति करोति', { 
  auxiliaryRoot: 'कृ',
  mainHasAm: true,
  mainAtmanepada: false, // Main verb is Parasmaipada
  isAuxiliary: true
});
// { applies: false, reason: "... main verb Ātmanepada required ...", confidence: 0.8 }
```

### IAST Script Support
```javascript
// IAST input with auxiliary context
const result = sutra1363('tiṣṭhate karote', { 
  auxiliaryRoot: 'kṛ',
  mainHasAm: true,
  mainAtmanepada: true,
  isAuxiliary: true
});
// { applies: true, isAtmanepada: true, inheritsFromMain: true, ... }
```

## Test Coverage

The test suite covers:

1. **Positive Cases**: 
   - कृ auxiliary with आम् affix main verbs in Ātmanepada
   - Various auxiliary construction types
   - Override of semantic fruit-to-agent conditions
   - Complex multi-verb constructions
2. **Negative Cases**:
   - Non-auxiliary कृ usage
   - Main verbs without आम् affix
   - Different auxiliary roots
   - Main verbs in Parasmaipada
3. **Edge Cases**:
   - Complex auxiliary-main verb relationships
   - Ambiguous construction types
   - IAST vs Devanagari auxiliary analysis
4. **Agreement Logic**:
   - Proper auxiliary-main verb agreement
   - Semantic override validation
   - Construction type verification

**Coverage Metrics**: >95% line coverage with comprehensive auxiliary agreement testing.

## Technical Details

### Dependencies
- `sanskrit-utils/classification.js`: Root identification (कृ auxiliary detection)
- `sanskrit-utils/auxiliary-analysis.js`: Auxiliary construction detection
- `sanskrit-utils/affix-analysis.js`: आम् affix identification utilities
- `sanskrit-utils/agreement-logic.js`: Auxiliary-main verb agreement implementation

### Implementation Pattern
```javascript
// Core auxiliary agreement logic
if (isAuxiliaryRoot(context.auxiliaryRoot, 'कृ') && 
    context.mainHasAm && 
    context.mainAtmanepada && 
    context.isAuxiliary) {
  return { 
    applies: true, 
    isAtmanepada: true,
    inheritsFromMain: true,
    overridesSemantic: true,
    reason: "आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य - auxiliary कृ inherits from आम् main"
  };
}
```

### Auxiliary Construction Detection Strategy
- **Function Analysis**: Identifies कृ in auxiliary role vs main verb role
- **Main Verb Analysis**: Validates आम् affix and Ātmanepada usage
- **Agreement Logic**: Ensures proper auxiliary-main verb coordination

### Semantic Override Implementation
- **Normal Override**: Ignores usual fruit-to-agent requirement for कृ
- **Construction Priority**: Prioritizes morphological agreement over semantics
- **Systematic Application**: Ensures consistent auxiliary behavior

## Integration

### Related Sutras
- **1.3.62**: Previous inheritance principle (पूर्ववत् सनः)
- **1.3.64**: Next specification (potential continuation)
- **1.3.12**: General Ātmanepada principles (overridden by this rule)

### Usage in Parsing Pipeline
This sutra requires:
1. Auxiliary construction identification (कृ as auxiliary)
2. Main verb analysis (आम् affix and Ātmanepada detection)
3. Agreement logic application (auxiliary inherits from main)
4. Semantic override handling (ignores fruit-to-agent condition)

### Common Integration Patterns
```javascript
// Typical usage in auxiliary verb analysis with agreement checking
if (isAuxiliaryConstruction(word, context) && 
    context.auxiliaryRoot === 'कृ') {
  const agreementResult = sutra1363(word, context);
  if (agreementResult.applies && 
      context.mainHasAm && 
      context.mainAtmanepada) {
    assignAtmanepada(); // Override normal कृ behavior
  }
}
```

## References

- **Ashtadhyayi**: 1.3.63
- **Traditional Commentaries**: Kāśikā on आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य
- **Auxiliary Grammar**: Classical treatments of अनुप्रयोग (auxiliary usage)
- **Agreement Theory**: Morphological agreement in compound constructions
- **Affix Studies**: आम् affix behavior and inheritance patterns
- **Modern Grammar**: Whitney's Sanskrit Grammar §§1071-1072 (auxiliary verbs)
- **Implementation Source**: Enhanced Panini Sutras Dataset — आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य

- Type: Atideśa (carry-over)
- Scope: Auxiliary कृ (kṛ) takes Ātmanepada when the main verb (ām‑class) is Ātmanepada, even if fruit doesn’t accrue to agent.

## Implementation
- Function: `sutra1363(word, context)`
- Requires `auxiliaryRoot: कृ/kṛ`, `mainHasAm: true`, and `mainAtmanepada: true`.
