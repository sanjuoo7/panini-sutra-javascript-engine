# Sutra 1.4.54: स्वतन्त्रः कर्ता

## Overview

**Sanskrit Text**: `स्वतन्त्रः कर्ता`  
**Transliteration**: svatantraḥ kartā  
**Translation**: The independent one [is] कर्ता (agent)

## Purpose

This sutra defines the fundamental characteristic of कर्ता (agent) in Sanskrit grammar: independence (स्वतन्त्रता). The कर्ता is the entity that acts independently, autonomously, and is the primary initiator of action. This independence distinguishes the agent from other कारक relations that depend on or serve the agent's action. It establishes the agent as the central, self-determined participant in any verbal activity, making it the foundational कारक relationship from which other relations are understood.

## Implementation

### Function Signature
```javascript
function sutra1454(word, context = {}) {
    // Implementation details
}
```

### Key Features
- Identifies independent agents in verbal constructions
- Analyzes autonomy and self-determination in action
- Distinguishes primary from secondary agents
- Handles agency hierarchies and control relationships

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `agency-analysis`
- **Shared Functions**: `case-operations.js`, `independence-assessment.js`, `agent-classification.js`

## Usage Examples

### Basic Usage
```javascript
import { sutra1454 } from './index.js';

// Example 1: Independent agent
const result1 = sutra1454('राम', {
  verb: 'गच्छति',
  action: 'गमन',
  context: 'रामो ग्रामं गच्छति',
  independence: 'full',
  autonomy: 'complete',
  selfDetermined: true
});
console.log(result1); // { applies: true, karaka: 'कर्ता', independence: 'full', agentType: 'primary' }

// Example 2: Autonomous action initiator
const result2 = sutra1454('छात्र', {
  verb: 'पठति',
  action: 'अध्ययन',
  context: 'छात्रो ग्रन्थं पठति',
  selfMotivated: true,
  primaryAgent: true,
  controlLevel: 'high'
});
console.log(result2); // { applies: true, karaka: 'कर्ता', agentType: 'autonomous', controlLevel: 'high' }
```

### Advanced Usage
```javascript
// Complex agency analysis
const result3 = sutra1454('नृप', {
  verb: 'शासति',
  action: 'शासन',
  context: 'नृपो प्रजाः शासति',
  independenceLevel: 'sovereign',
  authorityType: 'absolute',
  agencyComplexity: 'institutional'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 35+ tests covering:
- Independence and autonomy analysis
- Agent identification and classification
- Self-determination and control assessment
- Multi-script support and error handling
- Integration with agency hierarchy systems
- Edge cases with complex agency relationships and institutional agents

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.4.54

# Run with coverage
npm test sutras/1.4.54 --coverage
```

## Technical Details

### Algorithm
1. **Agent Identification**: Identify potential agent entities
2. **Independence Assessment**: Analyze autonomy and self-determination
3. **Control Analysis**: Evaluate level of control over action
4. **Agency Classification**: Classify as primary or dependent agent

### Performance
- **Time Complexity**: O(n) for independence analysis
- **Space Complexity**: O(1) for agent classification
- **Optimization Notes**: Uses agency categorization for efficiency

### Edge Cases
- Collective and institutional agents
- Forced or constrained agency
- Hierarchical and delegated agency
- Abstract and metaphorical agents

## Integration

### Related Sutras
- **1.4.42**: साधकतमं करणम् (most instrumental as करण)
- **1.4.49**: कर्तुरीप्सिततमं कर्म (most desired by agent as कर्म)
- **1.4.53**: हृक्रोरन्यतरस्याम् (optional कर्म for हृ/कृ)
- **1.4.55**: तत्प्रयोजको हेतुश्च (motivating cause as हेतु)

### Used By
- Agent identification systems
- Grammatical role processors
- Semantic analysis engines
- Voice and valency analyzers

## References

- **Panini's Ashtadhyayi**: 1.4.54 स्वतन्त्रः कर्ता
- **Classical Examples**: Independent agency in Sanskrit literature
- **Grammatical Context**: Foundational definition of कर्ता in कारक system

---

*Generated from template: SUTRA_README_TEMPLATE.md*
