# Sutra 1.1.30: तृतीयासमासे (tṛtīyāsamāse)

## Overview
**Sanskrit Text**: तृतीयासमासे  
**IAST**: tṛtīyāsamāse  
**Translation**: "In the Instrumental Determinative Compounds the words सर्व etc. are not सर्वनाम।"

## Purpose
This is a सञ्ज्ञा (sañjñā - definition) sutra that specifies an exception to the सर्वनाम (sarvanāma - pronoun) classification established in sutra 1.1.27. In तृतीयासमास (instrumental determinative compounds), words that are normally classified as सर्वनाम lose this designation.

## Technical Definition
- **Compound Type**: तृतीयासमास (Instrumental Determinative Compound)
- **Affected Words**: सर्व, विश्व, उभ, उभय, इतर, अन्य, etc.
- **Exception**: These words are NOT treated as सर्वनाम in this context

## Key Functions

### Core Functions
- `isTritiyasamasa(compound, context)` - Detects instrumental determinative compounds
- `loseSarvanameInTritiyasamasa(word, context)` - Checks if सर्वनाम status is lost
- `isSarvanama(word, context)` - Determines final सर्वनाम classification
- `analyzeCompoundSarvaname(compound, constituents, context)` - Full compound analysis

### Educational Functions
- `getTritiyasamasaExamples(script)` - Provides examples in IAST or Devanagari
- `validateSarvanameInCompound(compound, analysis, context)` - Validation with recommendations

## Examples

### IAST Examples
- `sarvakāma` (sarva + kāma = all desires)
- `viśvakarmā` (viśva + karmā = all actions)
- `ubhayapakṣa` (ubhaya + pakṣa = both sides)
- `anyagotra` (anya + gotra = other lineage)

### Devanagari Examples
- `सर्वकाम` (सर्व + काम = all desires)
- `विश्वकर्मा` (विश्व + कर्मा = all actions)
- `उभयपक्ष` (उभय + पक्ष = both sides)
- `अन्यगोत्र` (अन्य + गोत्र = other lineage)

## Usage

```javascript
import { isSarvanama, analyzeCompoundSarvaname } from './index.js';

// Normal context - words remain सर्वनाम
console.log(isSarvanama('sarva', { compoundType: 'tatpurusha' })); // true

// Tritiyasamasa context - words lose सर्वनाम status
console.log(isSarvanama('sarva', { compoundType: 'tritiyasamasa' })); // false

// Full analysis
const analysis = analyzeCompoundSarvaname('sarvakāma', ['sarva', 'kāma'], {
  compoundType: 'tritiyasamasa'
});
console.log(analysis.sutraApplied); // true
console.log(analysis.sarvanameWords); // []
console.log(analysis.nonSarvanameWords); // ['sarva', 'kāma']
```

## Integration
This sutra works in conjunction with:
- **1.1.27**: Basic सर्वनाम classification
- **1.1.31**: द्वन्द्व compound exceptions
- **Compound analysis**: Automatic detection of तृतीयासमास

## Test Coverage
- ✅ 22 comprehensive test cases
- ✅ Both IAST and Devanagari support
- ✅ Edge case handling
- ✅ Integration with compound analysis
- ✅ Error handling and validation
