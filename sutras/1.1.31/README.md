# Sutra 1.1.31: द्वन्द्वे च (dvandve ca)

## Overview
**Sanskrit Text**: द्वन्द्वे च  
**IAST**: dvandve ca  
**Translation**: "And in Collective Compound (द्वन्द्व), the words सर्व etc. are not सर्वनाम।"

## Purpose
This is a सञ्ज्ञा (sañjñā - definition) sutra that extends the exception from sutra 1.1.30. In द्वन्द्व compounds (copulative/collective compounds), words that are normally classified as सर्वनाम also lose this designation.

## Technical Definition
- **Compound Type**: द्वन्द्व (Copulative/Collective Compound)
- **Affected Words**: सर्व, विश्व, उभ, उभय, इतर, अन्य, etc.
- **Exception**: These words are NOT treated as सर्वनाम in this context
- **Extension**: The word "च" (ca) indicates this is in addition to sutra 1.1.30

## Key Functions

### Core Functions
- `isDvandva(compound, context)` - Detects द्वन्द्व compounds
- `loseSarvanameInDvandva(word, context)` - Checks if सर्वनाम status is lost
- `isSarvanama(word, context)` - Determines final सर्वनाम classification
- `analyzeDvandvaSarvaname(compound, constituents, context)` - Full द्वन्द्व analysis

### Pattern Analysis
- `analyzeDvandvaPatterns(compound, constituents)` - Identifies द्वन्द्व patterns:
  - **Simple**: Two coordinated elements
  - **Iterative**: Multiple coordinated elements (समाहार द्वन्द्व)
  - **Alternative**: Elements with वा (vā) alternation

### Educational Functions
- `getDvandvaExamples(script)` - Provides examples in IAST or Devanagari
- `validateSarvanameInDvandva(compound, analysis, context)` - Validation with recommendations

### Combined Analysis
- `analyzeCombinedSarvanameExceptions(compound, constituents, context)` - Integrates both sutras 1.1.30 and 1.1.31

## Examples

### IAST Examples
**Simple Coordinative:**
- `sarvānya` (sarva + anya = all and other)
- `viśvubha` (viśva + ubha = universe and both)
- `ekadvi` (eka + dvi = one and two)

**Iterative Collective:**
- `sarvaviśvānya` (sarva + viśva + anya = all, universe, and other)
- `ekadvitri` (eka + dvi + tri = one, two, and three)

### Devanagari Examples
**Simple Coordinative:**
- `सर्वान्य` (सर्व + अन्य = all and other)
- `विश्वउभ` (विश्व + उभ = universe and both)
- `एकद्वि` (एक + द्वि = one and two)

**Iterative Collective:**
- `सर्वविश्वान्य` (सर्व + विश्व + अन्य = all, universe, and other)
- `एकद्वित्रि` (एक + द्वि + त्रि = one, two, and three)

## Dvandva Detection

The system automatically detects द्वन्द्व compounds through:
1. **Explicit marking**: `compoundType: 'dvandva'`
2. **Semantic relations**: `semanticRelation: 'coordination'`
3. **Conjunction markers**: presence of च (ca), वा (vā)
4. **Pattern analysis**: coordinative structure

## Usage

```javascript
import { 
  isSarvanama, 
  analyzeDvandvaSarvaname,
  analyzeCombinedSarvanameExceptions 
} from './index.js';

// Normal context - words remain सर्वनाम
console.log(isSarvanama('sarva', { compoundType: 'tatpurusha' })); // true

// Dvandva context - words lose सर्वनाम status
console.log(isSarvanama('sarva', { compoundType: 'dvandva' })); // false

// Dvandva analysis
const analysis = analyzeDvandvaSarvaname('sarvānya', ['sarva', 'anya'], {
  compoundType: 'dvandva'
});
console.log(analysis.sutraApplied); // true
console.log(analysis.sarvanameWords); // []
console.log(analysis.nonSarvanameWords); // ['sarva', 'anya']

// Combined analysis (both 1.1.30 and 1.1.31)
const combined = analyzeCombinedSarvanameExceptions('sarvānya', ['sarva', 'anya'], {
  compoundType: 'dvandva'
});
console.log(combined.exceptionsApplied.sutra1131); // true
console.log(combined.recommendation); // 'सर्वनाम exceptions apply due to compound type'
```

## Pattern Analysis

```javascript
import { analyzeDvandvaPatterns } from './index.js';

// Simple pattern
const simple = analyzeDvandvaPatterns('sarvānya', ['sarva', 'anya']);
console.log(simple.pattern); // 'simple'
console.log(simple.semanticGroup); // 'pronouns'

// Iterative pattern
const iterative = analyzeDvandvaPatterns('sarvaviśvaanya', ['sarva', 'viśva', 'anya']);
console.log(iterative.pattern); // 'iterative'
console.log(iterative.isIterative); // true

// Alternative pattern
const alternative = analyzeDvandvaPatterns('sarva-vā-anya', ['sarva', 'anya']);
console.log(alternative.pattern); // 'alternative'
console.log(alternative.hasAlternation); // true
```

## Integration
This sutra works in conjunction with:
- **1.1.27**: Basic सर्वनाम classification
- **1.1.30**: तृतीयासमास compound exceptions
- **Compound analysis**: Automatic detection of द्वन्द्व patterns
- **Semantic grouping**: Classification by semantic relationships

## Test Coverage
- ✅ 32 comprehensive test cases
- ✅ Both IAST and Devanagari support
- ✅ Pattern detection (simple, iterative, alternative)
- ✅ Semantic group identification
- ✅ Combined analysis with sutra 1.1.30
- ✅ Edge case handling and validation
- ✅ Integration with compound analysis systems
