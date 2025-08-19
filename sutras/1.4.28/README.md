# Sutra 1.4.28: अन्तर्धौ येनादर्शनमिच्छति

## Summary
**In concealment: from whom one desires non-visibility (takes ablative case)**

This sutra establishes अपादान कारक (ablative case) for the source from which concealment is sought. When verbs of concealment (अन्तर्धान) are used, the person or entity from whose sight one wishes to remain hidden receives ablative case designation. This distinguishes the concealed object (कर्म) from the source of potential detection (अपादान).

## Technical Implementation

### Core Function
```javascript
import sutra1428 from './index.js';

const result = sutra1428('गुरु', { 
  verb: 'अन्तर्धत्ते', 
  context: 'गुरोः अन्तर्धत्ते',
  concealment_context: true,
  avoid_detection: true 
});
// Returns comprehensive analysis with ablative case assignment
```

### Key Features

#### 1. Concealment Context Recognition
- **Primary Context**: `अन्तर्धान` (concealment, hiding, disappearance)
- **Detection Avoidance**: `अदर्शन` (non-seeing, avoiding sight)
- **Intentional Hiding**: `इच्छा` (desire to remain unseen)

#### 2. Source of Detection Analysis
- **Personal Sources**: Teachers, parents, authorities, enemies
- **Institutional Sources**: Courts, assemblies, public gatherings
- **Abstract Sources**: Scrutiny, observation, surveillance
- **Divine Sources**: Deities, spiritual authorities

#### 3. Concealment Motivation Validation
- **Fear-Based**: Hiding from punishment or consequences
- **Strategic**: Tactical concealment for advantage
- **Privacy**: Personal or intimate concealment
- **Protection**: Hiding for safety or security

#### 4. Case Assignment Logic
- **Ablative Marking**: Assigns पञ्चमी विभक्ति (fifth case) to detection sources
- **Semantic Clarity**: Distinguishes from concealed objects (accusative)
- **Morphological Integration**: Handles various ablative endings

## Implementation Architecture

#### Phase 1: Concealment Detection
```javascript
const analysis = {
  concealment Analysis: {
    hasConcealment Context: true,
    concealment Type: 'personal_hiding',
    intentionality: 'deliberate_avoidance',
    applicabilityReason: 'Explicit concealment context with detection source'
  }
}
```

#### Phase 2: Source Classification
```javascript
const analysis = {
  sourceAnalysis: {
    detectionSource: 'authority_figure',
    sourceCategory: 'personal_relationship',
    avoidanceReason: 'disciplinary_consequence',
    sourceValidity: 'appropriate_context'
  }
}
```

#### Phase 3: Motivational Analysis
```javascript
const analysis = {
  motivationalAnalysis: {
    concealmentMotivation: 'fear_based',
    desiredOutcome: 'अदर्शन_achieved',
    temporalContext: 'immediate_hiding',
    urgencyLevel: 'high'
  }
}
```

#### Phase 4: Confidence Assessment
```javascript
const analysis = {
  confidence: {
    overall: 0.93,
    contextual: 0.95,
    motivational: 0.91,
    morphological: 0.94,
    traditionalSupport: 0.96
  }
}
```

## Usage Examples

### Basic Usage
```javascript
import { identifyConcealment Apadana } from './index.js';

// Example 1: Hiding from teacher
const result1 = identifyConcealment Apadana('गुरु', { 
  verb: 'अन्तर्धत्ते', 
  context: 'गुरोः अन्तर्धत्ते',
  concealment_context: true,
  avoid_detection: true
});
console.log(result1); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   concealment_target: true,
//   rule: '1.4.28'
// }

// Example 2: Avoiding king's sight
const result2 = identifyConcealment Apadana('राजा', { 
  verb: 'लुप्यते', 
  context: 'राज्ञः लुप्यते',
  hiding_context: true,
  authority_avoidance: true
});
console.log(result2); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   authority_concealment: true,
//   rule: '1.4.28'
// }

// Example 3: Concealing from enemy
const result3 = identifyConcealment Apadana('शत्रु', { 
  verb: 'गुप्यते', 
  context: 'शत्रोः गुप्यते',
  stealth_context: true,
  enemy_avoidance: true
});
console.log(result3); 
// Expected: { 
//   applies: true, 
//   karaka: 'अपादान', 
//   case_required: 'ablative',
//   stealth_operation: true,
//   rule: '1.4.28'
// }
```

### Advanced Usage
```javascript
// Complex concealment scenarios
const complexResult = identifyConcealment Apadana('जनता', { 
  verb: 'अन्तर्हीयते',
  context: 'जनतायाः अन्तर्हीयते', // hiding from public
  social_concealment: true
});

// Multiple avoidance targets
const multiResult = identifyConcealment Apadana('all', {
  sentence: 'गुरोः पितुश्च अन्तर्धत्ते',
  verb: 'अन्तर्धत्ते',
  analyze_all_concealment_targets: true
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 30+ tests covering:
- Basic concealment verb constructions
- Hiding and stealth contexts
- Authority avoidance scenarios
- Different concealment verbs (अन्तर्धा, लुप्, गुप्, etc.)
- Intention analysis (इच्छा) for avoiding sight
- Social vs personal concealment contexts
- Script conversion (Devanagari ↔ IAST)
- Integration with ablative case assignment
- Error handling for non-concealment contexts

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.28

# Run with coverage
npm test sutras/1.4.28 --coverage
```

## Technical Details

### Algorithm
1. **Concealment Validation**: Verify अन्तर्धान (concealment) context
2. **Intention Analysis**: Identify इच्छा (desire) to avoid being seen
3. **Target Identification**: Locate person from whose sight one hides
4. **Semantic Classification**: Analyze type of concealment (social/personal/strategic)
5. **Case Assignment**: Apply ablative case for concealment targets
6. **Validation**: Confirm intentional concealment relationship

### Performance
- **Time Complexity**: O(1) for basic concealment contexts, O(n) for complex scenarios
- **Space Complexity**: O(1) for single concealment relationships
- **Optimization Notes**: Cached concealment verb patterns and intention semantics

### Edge Cases
- **Multiple Concealment Targets**: Hiding from multiple people
- **Partial vs Complete Concealment**: Different degrees of hiding
- **Intentional vs Accidental**: Deliberate vs unintentional concealment
- **Temporal Concealment**: Temporary vs permanent hiding

## Integration

### Related Sutras
- **1.4.24**: ध्रुवमपायेऽपादानम् (general ablative relationships)
- **1.4.25-1.4.27**: Other specific ablative contexts
- **1.4.29-1.4.30**: Additional specialized ablative cases
- **Concealment Verb Classifications**: Rules for hiding and stealth verbs

### Used By
- Ablative case assignment for concealment contexts
- Semantic analysis of hiding and stealth
- Social interaction analysis for avoidance behaviors
- Literary analysis for concealment and secrecy themes

## References

- **Panini's Ashtadhyayi**: 1.4.28 अन्तर्द्धौ येनादर्शनमिच्छति
- **Implementation Notes**: Specialized ablative for concealment from specific persons
- **Test References**: Classical examples of hiding and concealment
- **Scholarly Sources**: Traditional commentaries on अन्तर्धान and concealment grammar

---

*Generated from template: SUTRA_README_TEMPLATE.md*
