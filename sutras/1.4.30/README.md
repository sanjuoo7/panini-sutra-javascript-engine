# Sutra 1.4.30: जनिकर्तुः प्रकृतिः

## Overview

**Sanskrit Text**: `जनिकर्तुः प्रकृतिः`  
**Transliteration**: janikartuḥ prakṛtiḥ  
**Translation**: The prime cause of the agent of the verb जन् 'to be born' is called अपादान

## Purpose

This sutra establishes अपादान कारक for the source or origin in birth contexts. When the verb जन् (to be born) is used, the source, origin, or prime cause (प्रकृति) from which the birth or generation occurs takes अपादान designation and requires ablative case marking. This covers contexts of origin, source, and generative causation.

## Implementation

### Function Signature
```javascript
function identifyBirthSourceApadana(word, context = {}) {
    // Identifies अपादान relationships for birth/generation sources
    // Returns ablative case assignment for origins and prime causes
}
```

### Key Features
- Identifies sources and origins in birth/generation contexts
- Recognizes prime causes (प्रकृति) requiring ablative case
- Handles generative and creative source relationships
- Supports जन् verb and related generation verbs
- Validates origin-product relationships in creation contexts

## Usage Examples

```javascript
// Example: Born from source
const result = identifyBirthSourceApadana('मूल', { 
  verb: 'जायते', 
  context: 'मूलात् जायते',
  birth_source: true
});
// Expected: { applies: true, karaka: 'अपादान', case_required: 'ablative' }
```

## Integration

### Related Sutras
- **1.4.24-1.4.29**: Other ablative contexts
- **1.4.31**: Related भू verb contexts
- **Generative Grammar Rules**: Creation and birth verb classifications

---

*Generated from template: SUTRA_README_TEMPLATE.md*
