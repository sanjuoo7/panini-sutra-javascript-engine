# Sutra 1.4.29: आख्यातोपयोगे

## Overview

**Sanskrit Text**: `आख्यातोपयोगे`  
**Transliteration**: ākhyātopayoge  
**Translation**: The noun denoting the teacher is called अपादान in relation to the action signifying formal teaching

## Purpose

This sutra establishes अपादान कारक for contexts involving formal teaching (आख्यात + उपयोग). When there is formal instruction or teaching, the teacher from whom knowledge is received takes अपादान designation and requires ablative case marking. This covers academic and formal educational contexts where knowledge transmission occurs.

## Implementation

### Function Signature
```javascript
function identifyTeachingApadana(word, context = {}) {
    // Identifies अपादान relationships in formal teaching contexts
    // Returns ablative case assignment for knowledge sources (teachers)
}
```

### Key Features
- Identifies teachers as knowledge sources requiring ablative case
- Recognizes formal teaching and instruction contexts
- Handles academic knowledge transmission scenarios
- Supports various teaching verbs and educational constructions
- Validates teacher-student relationships in learning contexts

## Usage Examples

```javascript
// Example: Learning from teacher
const result = identifyTeachingApadana('गुरु', { 
  verb: 'अधीते', 
  context: 'गुरोः अधीते',
  formal_teaching: true
});
// Expected: { applies: true, karaka: 'अपादान', case_required: 'ablative' }
```

## Integration

### Related Sutras
- **1.4.24-1.4.28**: Other ablative contexts
- **1.4.30**: Related source contexts
- **Educational Grammar Rules**: Teaching and learning verb classifications

---

*Generated from template: SUTRA_README_TEMPLATE.md*
