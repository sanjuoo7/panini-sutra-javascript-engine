# Sutra 1.4.36: स्पृहेरीप्सितः

## Overview
**Sanskrit Text**: `स्पृहेरीप्सितः`  
**Transliteration**: spṛherīpsitaḥ  
**Translation**: In the case of the verb स्पृह् 'to desire', the thing desired is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the object of desire in contexts with स्पृह् verb. When someone desires or longs for something, the desired object takes dative case marking.

## Implementation
```javascript
function identifyDesiredObjectSampradana(word, context = {}) {
    // Identifies dative relationships for objects of desire (स्पृह् contexts)
    // Returns dative case assignment for desired objects
}
```

## Key Features
- Identifies desired objects requiring dative case with स्पृह् verb
- Recognizes longing and desire contexts
- Handles emotional and material desire relationships
- Validates desire-object relationships

## Usage Examples
```javascript
// Example: Desiring wealth
const result = identifyDesiredObjectSampradana('धन', { 
  verb: 'स्पृहयति', 
  context: 'धनाय स्पृहयति',
  desire_context: true
});
// Expected: { applies: true, karaka: 'सम्प्रदान', case_required: 'dative' }
```

---

*Generated from template: SUTRA_README_TEMPLATE.md*
