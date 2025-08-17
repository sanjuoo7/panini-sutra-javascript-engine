# Sutra 1.4.26: पराजेरसोढः

## Overview

**Sanskrit Text**: `पराजेरसोढः`  
**Transliteration**: parājerasoḍhaḥ  
**Translation**: In the case of the verb पराजि 'to be tired or weary of', that which becomes unbearable is called अपादान कारक

## Purpose

This sutra specifies a particular application of अपादान कारक (ablative case) for contexts involving the verb पराजि (parāji - to be defeated, tired, or weary). When someone becomes tired, weary, or unable to bear something, the source of that weariness or the thing that has become unbearable takes अपादान designation and requires ablative case marking. This extends the ablative system to contexts of exhaustion and defeat.

## Implementation

### Function Signature
```javascript
function identifyParajiApadana(word, context = {}) {
    // Identifies अपादान relationships with पराजि contexts (weariness/defeat)
    // Returns ablative case assignment for sources of exhaustion or defeat
}
```

### Key Features
- Identifies sources of weariness and exhaustion requiring ablative case
- Recognizes defeat and inability contexts with पराजि verb
- Handles physical, mental, and emotional exhaustion sources
- Supports contexts of being overwhelmed or overpowered
- Integrates with पराजि verb forms and related semantics
- Validates weariness/defeat verb constructions

### Dependencies
- **Sanskrit Utils**: 
  - `script-detection.js` - Script identification and conversion
  - `classification.js` - Grammatical classification
  - `verbal-analysis.js` - पराजि verb identification and analysis
  - `semantic-analysis.js` - Exhaustion and defeat semantic analysis
  - `case-assignment.js` - Ablative case assignment
  - `emotional-analysis.js` - Weariness and fatigue analysis
- **Shared Functions**: Kāraka analysis, defeat context detection, semantic role assignment

## Usage Examples

### Basic Usage
```javascript
import { identifyParajiApadana } from './index.js';

// Example 1: Weariness from work
const result1 = identifyParajiApadana('कार्य', { 
  verb: 'पराजयते', 
  context: 'कार्यात् पराजयते',
  exhaustion_source: true
});
console.log(result1); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   weariness_source: true,
//   rule: '1.4.26'
// }

// Example 2: Defeat in battle
const result2 = identifyParajiApadana('युद्ध', { 
  verb: 'पराजयते', 
  context: 'युद्धात् पराजयते',
  defeat_context: true
});
console.log(result2); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   defeat_source: true,
//   rule: '1.4.26'
// }

// Example 3: Overwhelmed by studies
const result3 = identifyParajiApadana('अध्ययन', { 
  verb: 'पराजीयते', 
  context: 'अध्ययनात् पराजीयते',
  mental_exhaustion: true
});
console.log(result3); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   cognitive_overload: true,
//   rule: '1.4.26'
// }
```

### Advanced Usage
```javascript
// Physical exhaustion contexts
const physicalResult = identifyParajiApadana('श्रम', { 
  verb: 'पराजयते',
  context: 'श्रमात् पराजयते', // tired from labor
  physical_exhaustion: true
});

// Emotional overwhelm contexts
const emotionalResult = identifyParajiApadana('चिन्ता', { 
  verb: 'पराजीयते',
  context: 'चिन्तात् पराजीयते', // overwhelmed by worry
  emotional_overload: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Basic पराजि verb constructions with various sources
- Physical exhaustion and weariness contexts
- Mental and cognitive overload situations
- Defeat and inability expressions
- Different forms of पराजि verb (passive, causative, etc.)
- Integration with ablative case assignment
- Script conversion (Devanagari ↔ IAST)
- Error handling for non-weariness contexts
- Semantic analysis of exhaustion types

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.26

# Run with coverage
npm test sutras/1.4.26 --coverage
```

## Technical Details

### Algorithm
1. **Verb Validation**: Verify पराजि or related exhaustion verb
2. **Context Analysis**: Identify weariness, defeat, or exhaustion context
3. **Source Identification**: Locate the cause of weariness or defeat
4. **Semantic Classification**: Analyze type of exhaustion (physical/mental/emotional)
5. **Case Assignment**: Apply ablative case for exhaustion sources
6. **Validation**: Confirm grammatical and semantic coherence

### Performance
- **Time Complexity**: O(1) for basic contexts, O(n) for complex exhaustion analysis
- **Space Complexity**: O(1) for single exhaustion relationships
- **Optimization Notes**: Cached पराजि verb patterns and exhaustion semantics

### Edge Cases
- **Multiple Exhaustion Sources**: Handling compound weariness relationships
- **Degrees of Exhaustion**: Different intensities of tiredness or defeat
- **Temporary vs Permanent**: Distinguishing short-term fatigue from lasting defeat
- **Physical vs Mental**: Different types of exhaustion and their sources

## Integration

### Related Sutras
- **1.4.24**: ध्रुवमपायेऽपादानम् (general ablative relationships)
- **1.4.25**: भीत्रार्थानां भयहेतुः (ablative for fear contexts)
- **1.4.27-1.4.30**: Other specific ablative contexts
- **Exhaustion Verb Rules**: Classification of fatigue and defeat verbs

### Used By
- Ablative case assignment for defeat/exhaustion contexts
- Semantic analysis of weariness and fatigue expressions
- Sanskrit literature analysis for defeat and struggle narratives
- Psychological and physical state analysis in texts

## References

- **Panini's Ashtadhyayi**: 1.4.26 पराजेरसोढः
- **Implementation Notes**: Specialized ablative for exhaustion and defeat contexts
- **Test References**: Classical examples of weariness and defeat expressions
- **Scholarly Sources**: Traditional commentaries on पराजि verb usage

---

*Generated from template: SUTRA_README_TEMPLATE.md*
