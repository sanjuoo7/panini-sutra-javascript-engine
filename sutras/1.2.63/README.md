# Sutra 1.2.63: तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य

## Overview

**Sanskrit Text**: `तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य`  
**Transliteration**: tiṣyapunarvasvor nakṣatra-dvandve bahuvacanasya  
**Translation**: In a dvandva (coordinative) compound consisting of Tiṣya and Punarvasū in the nakṣatra sense, the plural (interpretation) is replaced by (or must be) the dual.

## Purpose

This sutra establishes a **niyama** (restrictive rule) that mandates dual number interpretation for dvandva compounds containing both Tiṣya and Punarvasū nakshatras, overriding any previous plural number assignments. This represents a specific grammatical constraint within the broader framework of nakshatra-based number determination rules (1.2.58-1.2.62).

## Grammatical Context

### Rule Classification
- **Type**: Niyama (नियम) - Restrictive/limiting rule
- **Scope**: Dvandva compounds in nakshatra domain 
- **Application**: Enforces dual, replaces plural when present
- **Priority**: Overrides earlier optional rules (1.2.58-1.2.62)

### Linguistic Scope
- **Domain**: Nakshatra astronomical/astrological contexts
- **Compound Type**: Dvandva (द्वन्द्व) coordinative compounds
- **Required Elements**: Both Tiṣya (तिष्य/Pushya) and Punarvasū (पुनर्वसू) 
- **Number Operation**: Plural → Dual enforcement

### Semantic Framework
The sutra recognizes that when Tiṣya and Punarvasū appear together in a dvandva compound within nakshatra contexts, they form a semantically cohesive dual pair representing specific astronomical positioning or temporal sequencing, thus grammatically requiring dual number rather than plural.

## Implementation

### Function Signature
```javascript
function sutra_1_2_63(input, context = {}) {
    // Comprehensive 8-phase analysis implementation
    // Returns detailed analysis with confidence scoring
}
```

### Key Features
- **8-Phase Analysis Architecture**: Domain validation, dvandva recognition, compound analysis, nakshatra identification, dual enforcement, prior result integration, alternative forms, metadata generation
- **Multi-Script Support**: IAST, Devanagari, romanized, and mixed-script recognition
- **Compound Type Detection**: Structured objects, string compounds, space-separated, plus-separated
- **Nakshatra Recognition**: Comprehensive pattern matching for Tiṣya and Punarvasū variants
- **Confidence Scoring**: Advanced algorithms for partial matches and recognition certainty
- **Context Integration**: Prior result evaluation and rule precedence handling
- **Alternative Generation**: Provides dual forms and grammatical recommendations

### Dependencies
- **Sanskrit Utils**: Advanced compound analysis, nakshatra recognition, number determination
- **Shared Functions**: Multi-script detection, pattern matching, confidence calculation
- **Integration Logic**: Prior result processing, rule precedence management

## Technical Analysis

### Core Logic Flow
1. **Input Validation**: Comprehensive validation of input types and context
2. **Domain Verification**: Ensures nakshatra astronomical context
3. **Dvandva Recognition**: Identifies coordinative compound structure
4. **Compound Analysis**: Parses members, handles multiple input formats
5. **Nakshatra Identification**: Recognizes both Tiṣya and Punarvasū
6. **Dual Enforcement**: Applies rule, handles plural replacement
7. **Integration**: Processes prior results and rule interactions
8. **Result Generation**: Creates comprehensive output with metadata

### Pattern Recognition
- **Tiṣya Patterns**: ['tiṣya', 'तिष्य', 'pushya', 'puṣya', 'पुष्य', 'tishya']
- **Punarvasū Patterns**: ['punarvasu', 'पुनर्वसू', 'punarvasuu', 'punarvasu', 'पुनर्वसु']
- **Compound Separators**: ['+', ' ', 'ca', 'च', 'and']
- **Multi-Script Mixed**: Handles combinations like 'tiṣya+पुनर्वसू'

### Confidence Calculation
- **Exact Match**: 0.95 (perfect recognition)
- **Script Variant**: 0.90 (different script, same meaning)
- **Romanized**: 0.85 (romanized without diacritics)
- **Partial Match**: 0.70 (incomplete but recognizable)
- **Context Boost**: +0.05 for explicit nakshatra domain

## Usage Examples

### Basic Usage
```javascript
import { sutra_1_2_63 } from './index.js';

// Structured compound with plural members (replacement scenario)
const compound = { 
    type: 'dvandva', 
    members: [
        { lemma: 'tiṣya', number: 'plural' }, 
        { lemma: 'punarvasu', number: 'plural' }
    ] 
};
const result = sutra_1_2_63(compound, { domain: 'nakshatra' });
console.log(result.applied);        // true
console.log(result.replaced);       // true
console.log(result.originalNumber); // 'plural'
console.log(result.finalNumber);    // 'dual'

// String compound with context number
const result2 = sutra_1_2_63('tiṣya+punarvasu', { 
    domain: 'nakshatra', 
    number: 'plural' 
});
console.log(result2.applied);    // true
console.log(result2.replaced);   // true

// Already dual (enforcement without replacement)
const dualCompound = { 
    type: 'dvandva',
    members: [
        { lemma: 'punarvasu', number: 'dual' }, 
        { lemma: 'tiṣya', number: 'dual' }
    ] 
};
const result3 = sutra_1_2_63(dualCompound, { domain: 'nakshatra' });
console.log(result3.applied);  // true
console.log(result3.replaced); // false
```

### Advanced Usage
```javascript
// Multi-script recognition
const result4 = sutra_1_2_63('तिष्य पुनर्वसू', { 
    domain: 'nakshatra',
    number: 'plural',
    script: 'devanagari'
});

// Mixed script compound
const result5 = sutra_1_2_63('tiṣya+पुनर्वसू', { 
    domain: 'astronomical',
    context: 'vedic'
});

// Complex context with prior results
const result6 = sutra_1_2_63('punarvasu tiṣya', {
    domain: 'nakshatra',
    number: 'plural',
    priorResults: {
        '1.2.60': { applied: true, number: 'plural' },
        '1.2.61': { applied: false }
    },
    debug: true
});

// Order-insensitive detection
const result7 = sutra_1_2_63('punarvasū ca tiṣya ca', {
    domain: 'nakshatra',
    compoundType: 'dvandva'
});
```

### Error Handling Examples
```javascript
// Missing domain (should fail)
const result8 = sutra_1_2_63('tiṣya+punarvasu', {});
console.log(result8.applied); // false
console.log(result8.reason);  // 'invalid_domain'

// Wrong nakshatra (should fail)
const result9 = sutra_1_2_63('viśākhā+rohiṇī', { domain: 'nakshatra' });
console.log(result9.applied); // false
console.log(result9.reason);  // 'nakshatras_not_matched'

// Invalid input (graceful handling)
const result10 = sutra_1_2_63(null, { domain: 'nakshatra' });
console.log(result10.applied); // false
console.log(result10.reason);  // 'invalid_input'
```

## Integration with Other Sutras

### Rule Precedence
- **Overrides**: 1.2.58 (class plural), 1.2.59 (pronoun dual), 1.2.60 (nakshatra dual-plural)
- **Overridden by**: None (this is a specific niyama)
- **Complements**: 1.2.61 (Punarvasu singular), 1.2.62 (Viśākhā singular)

### Prior Result Integration
```javascript
// Example with prior 1.2.60 result
const priorContext = {
    domain: 'nakshatra',
    number: 'plural',
    priorResults: {
        '1.2.60': { 
            applied: true, 
            number: 'plural',
            confidence: 0.85,
            reason: 'nakshatra_dual_plural_optionality'
        }
    }
};

const result = sutra_1_2_63('tiṣya+punarvasu', priorContext);
// Result will show: applied=true, replaced=true, overridesPrior=['1.2.60']
```

## Test Coverage

### Test Categories
1. **Basic Application Tests** (6 tests)
   - Structured compound plural replacement
   - String compound with context
   - Already dual enforcement
   - Order-insensitive detection
   - Domain validation
   - Invalid input handling

2. **Dvandva Recognition Tests** (8 tests)
   - Structured dvandva objects
   - String compound parsing
   - Separator recognition (+, space, ca/च)
   - Mixed script compounds
   - Complex compound structures
   - Non-dvandva rejection

3. **Nakshatra Domain Validation** (7 tests)
   - Explicit domain nakshatra
   - Implicit astronomical context
   - Domain synonyms (astronomical, astral)
   - Invalid domain rejection
   - Missing domain handling
   - Context validation

4. **Tiṣya-Punarvasū Recognition** (10 tests)
   - IAST forms (tiṣya, punarvasu)
   - Devanagari forms (तिष्य, पुनर्वसू)
   - Romanized variants (pushya, tishya)
   - Alternative names (puṣya, punarvasu)
   - Partial match handling
   - Order independence
   - Mixed script recognition
   - Case sensitivity
   - Wrong nakshatra rejection

5. **Dual Enforcement Analysis** (8 tests)
   - Plural replacement logic
   - Dual enforcement (no replacement)
   - Number determination
   - Context number handling
   - Member number analysis
   - Confidence scoring
   - Replacement metadata
   - Final number assignment

6. **Prior Result Integration** (6 tests)
   - Override previous plural (1.2.58)
   - Override nakshatra optionality (1.2.60)
   - Complement Punarvasu rules (1.2.61)
   - Handle conflicts with 1.2.62
   - Empty prior results
   - Invalid prior results

7. **Alternative Forms and Output** (5 tests)
   - Dual form generation
   - Grammatical recommendations
   - Multi-script output
   - Alternative representations
   - Prosodic guidance

8. **Edge Cases and Error Handling** (5 tests)
   - Null/undefined input
   - Empty context
   - Malformed compounds
   - Invalid member structure
   - Performance limits

**Total Test Cases**: 55 comprehensive tests

## Technical Implementation Details

### Performance Optimizations
- **O(1) Lookups**: Pattern matching using Set data structures
- **Early Returns**: Fail-fast validation for invalid inputs
- **Memoization**: Cache expensive compound analysis operations
- **Lazy Evaluation**: Only compute detailed analysis when basic conditions met

### Memory Management
- **Immutable Operations**: No mutation of input objects
- **Garbage Collection**: Proper cleanup of temporary analysis objects
- **Reference Management**: Avoid circular references in result objects

### Error Handling Strategy
- **Graceful Degradation**: Continue processing when possible
- **Detailed Error Messages**: Specific failure reasons for debugging
- **Input Sanitization**: Clean and validate all input parameters
- **Exception Boundary**: Catch and handle unexpected errors

### Debugging Support
- **Debug Mode**: Comprehensive logging when debug=true
- **Step-by-step Analysis**: Track each phase of processing
- **Confidence Explanations**: Detail confidence calculation factors
- **Performance Metrics**: Measure execution time for optimization

## Future Enhancements

### Planned Features
- **Extended Pattern Recognition**: Additional nakshatra name variants
- **Performance Optimizations**: Faster compound parsing algorithms
- **Enhanced Confidence Models**: Machine learning-based confidence scoring
- **Integration APIs**: Better integration with external grammar engines

### Compatibility Notes
- **Node.js**: Requires ES6+ module support
- **Browser**: Compatible with modern browsers (ES2018+)
- **Dependencies**: Uses only built-in JavaScript features
- **Testing**: Jest-compatible test suite

---

**Implementation Date**: August 20, 2025  
**Implementation Type**: Comprehensive Phase 3a Enhancement  
**Previous Status**: Ultra-minimal (8 lines, 7 tests)  
**Current Status**: Comprehensive (570+ lines, 55 tests)  
**Success Rate Target**: 100% (55/55 tests passing)

## Technical Details
### Algorithm
1. Normalize / parse compound.
2. Confirm nakṣatra domain.
3. Check membership sets for both target stars.
4. If plural present (context or member numbers), mark replacement; else mark enforcement only.

### Edge Cases
- Order-insensitive detection.
- Graceful handling of null / malformed compound.
- Works with mixed input representation styles.

## Integration
- Overrides optional singular / plural semantics from 1.2.58–1.2.62 when specific dvandva pattern appears.

## References
- Traditional dvandva enforcement discussions: dual required when exactly two specified members.
- Strategy Pattern J (Astral Semantic Number Overrides) – enforcement subcase.

---
*Generated from template: SUTRA_README_TEMPLATE.md*
