# Sutra 1.4.31: भुवः प्रभवः

## Overview

**Sanskrit Text**: `भुवः प्रभवः`  
**Transliteration**: bhuvaḥ prabhavaḥ  
**Translation**: The source of the agent of the verb भू 'to become' is called अपादान

## Purpose

This sutra establishes अपादान कारक for the source in contexts of becoming (भू). When the verb भू (to become, to exist) is used, the source or origin (प्रभव) from which the becoming or existence emerges takes अपादान designation and requires ablative case marking. This covers contexts of transformation, emergence, and existential origins.

## Implementation

### Function Signature
```javascript
function identifyBecomingSourceApadana(word, context = {}) {
    // Identifies अपादान relationships for sources of becoming/existence
    // Returns ablative case assignment for transformational origins
}
```

### Key Features
- Identifies sources in becoming/existence contexts (भू verb)
- Recognizes transformational origins requiring ablative case
- Handles emergence and existential source relationships
- Supports भू verb and related existence/becoming verbs
- Validates transformation source-result relationships

## Usage Examples

```javascript
// Example: Becoming from source
const result = identifyBecomingSourceApadana('बीज', { 
  verb: 'भवति', 
  context: 'बीजात् भवति',
  becoming_source: true
});
// Expected: { applies: true, karaka: 'अपादान', case_required: 'ablative' }
```

## Integration

### Related Sutras
- **1.4.30**: जनिकर्तुः प्रकृतिः (birth source contexts)
- **1.4.32**: कर्मणा यमभिप्रैति (transition to सम्प्रदान)
- **Transformation Grammar Rules**: Becoming and existence verb classifications

---

*Generated from template: SUTRA_README_TEMPLATE.md*
