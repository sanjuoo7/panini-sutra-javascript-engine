# Sutra 1.2.2: विज इट्

## Sanskrit Text
**Devanagari:** विज इट्  
**IAST:** vija iṭ  
**Translation:** (Affixes) beginning with iṭ (are ṅit) after the root vij

## Brief Description
This sutra establishes that affixes beginning with the iṭ-augment receive the ṅit designation when they follow the root विज् (vij). This rule creates a specialized exception within the broader ṅit system, ensuring that iṭ-augmented affixes after विज् are treated with the proper grammatical designation for subsequent morphological processes.

## Technical Analysis

### Scope and Application
- **Primary Scope:** Affix designation (संज्ञा)
- **Grammatical Category:** ṅit designation rules
- **Script Support:** Full Devanagari and IAST support with cross-script compatibility

### Rule Components
1. **Root Condition:** The root must be विज् (vij - "to conquer, overcome")
2. **Affix Condition:** The affix must begin with इट् (iṭ) augment
3. **Result:** Such affixes receive ṅit designation

### Implementation Details

#### Core Functions
- `isVijRoot(root)` - Identifies the विज् root in both scripts
- `beginsWithItAugment(affix)` - Detects इट्-initial patterns  
- `isItAugmentedAffix(affix)` - Validates known iṭ-augmented affixes
- `isNgitByVijIt(root, affix)` - Main rule application function
- `analyzeVijItStatus(combinations)` - Batch analysis utility
- `getVijItExamples()` - Comprehensive examples and documentation

#### Key Constants
```javascript
VIJ_ROOT = {
  devanagari: 'विज्',
  iast: 'vij'
}

IT_AUGMENT_PATTERNS = {
  devanagari: ['^इत', '^इट्', '^इष्य'],
  iast: ['^it', '^iṭ', '^iṣy']
}
```

## Examples

### Positive Cases (Rule Applies)
| Root | Affix | Result | Meaning | Notes |
|------|-------|--------|---------|-------|
| विज् | इत | ṅit | विजित (conquered) | Past participle with iṭ |
| विज् | इत्वा | ṅit | विजित्वा (having conquered) | Gerund with iṭ |
| विज् | इष्यति | ṅit | विजिष्यति (will conquer) | Future with iṭ |
| vij | ita | ṅit | vijita | IAST equivalent |
| vij | itvā | ṅit | vijitvā | IAST gerund |

### Negative Cases (Rule Does Not Apply)
| Root | Affix | Reason | Notes |
|------|-------|---------|-------|
| भू | इत | Different root | Rule specific to विज् |
| गाङ् | इत्वा | Different root | Different ṅit rule applies |
| विज् | ति | No iṭ augment | Regular affix, no iṭ |
| विज् | त | No iṭ augment | No augment present |
| कृ | इत | Different root | Rule doesn't extend |

### Cross-Script Examples
| Root (Script 1) | Affix (Script 2) | Result | Notes |
|-----------------|------------------|--------|-------|
| विज् | ita | ṅit | Devanagari root + IAST affix |
| vij | इत | ṅit | IAST root + Devanagari affix |
| vij | िtvā | ṅit | Mixed script compatibility |

## Traditional Grammar Context

### Relationship to Other Rules
- **Foundational Rule:** 1.1.5 क्ङिति च (kṅiti ca) - ṅit effects
- **Related Rule:** 1.2.1 गाङ्कुटादिभ्योऽञ्णिन्ङ्इत् - ṅit for different roots
- **Sequence:** This rule provides specific exceptions within the ṅit system

### Grammatical Significance
The ṅit designation influences:
1. **Accent patterns** - ṅit affixes affect word stress
2. **Morphophonemic changes** - Subsequent sound changes
3. **Compound behavior** - Treatment in compound formation
4. **Derivational processes** - Impact on further derivation

### Traditional Examples
Classical grammarians cite forms like:
- विजित (vijita) - "conquered" - where the ita suffix gets ṅit
- विजित्वा (vijitvā) - "having conquered" - where the itvā suffix gets ṅit
- विजिष्यति (vijiṣyati) - "will conquer" - where the iṣyati suffix gets ṅit

## Dependencies
- **Sanskrit Utils:** `detectScript`, `validateSanskritWord` for input validation
- **Related Sutras:** Works alongside other ṅit designation rules
- **Precedence:** Applies specifically to विज् + iṭ combinations

## Implementation Features
- ✅ **Multi-script Support:** Full Devanagari and IAST compatibility
- ✅ **Input Validation:** Comprehensive error handling for invalid inputs  
- ✅ **Cross-script Operations:** Works with mixed script inputs
- ✅ **Batch Analysis:** `analyzeVijItStatus()` for processing multiple combinations
- ✅ **Performance Optimized:** Efficient pattern matching and validation
- ✅ **Comprehensive Testing:** 34 test cases covering all scenarios

## Usage Examples

### Basic Usage
```javascript
import { isNgitByVijIt } from './index.js';

// Check if affix gets ṅit designation
console.log(isNgitByVijIt('विज्', 'इत'));        // true
console.log(isNgitByVijIt('vij', 'ita'));       // true  
console.log(isNgitByVijIt('विज्', 'ति'));        // false
```

### Batch Analysis
```javascript
import { analyzeVijItStatus } from './index.js';

const combinations = [
  { root: 'विज्', affix: 'इत' },
  { root: 'विज्', affix: 'इत्वा' },
  { root: 'भू', affix: 'इत' }
];

const analysis = analyzeVijItStatus(combinations);
// Returns detailed statistics and categorization
```

### Getting Examples
```javascript
import { getVijItExamples } from './index.js';

const examples = getVijItExamples();
// Returns comprehensive examples and explanations
```

## Testing
- **Total Tests:** 34 test cases
- **Coverage Areas:** Root identification, affix analysis, rule application, error handling
- **Test Types:** Unit tests, integration tests, cross-script tests, traditional grammar validation
- **All Tests:** ✅ Passing

This implementation provides a complete, tested, and documented solution for Panini's sutra 1.2.2, maintaining consistency with traditional Sanskrit grammar while offering modern programming interfaces.
