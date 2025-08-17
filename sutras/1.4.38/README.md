# Sutra 1.4.38: क्रुधद्रुहोरुपसृष्टयोः कर्म

## Overview
**Sanskrit Text**: `क्रुधद्रुहोरुपसृष्टयोः कर्म`  
**Transliteration**: krudhdruhroupasṛṣṭayoḥ karma  
**Translation**: But in the case of the verbs क्रुध् and द्रुह्, when preceded by prepositions, the object is called कर्म (accusative)

## Purpose
Modifies sutra 1.4.37 by establishing that when क्रुध् and द्रुह् verbs are preceded by prepositions (उपसर्ग), the target takes कर्म (accusative) case instead of सम्प्रदान (dative).

## Implementation
```javascript
function identifyPrefixedAngerKarma(word, context = {}) {
    // Identifies accusative relationships for anger/harm targets with prefixed verbs
    // Returns accusative case assignment when prepositions are present
}
```

## Key Features
- Identifies accusative case for prefixed क्रुध्/द्रुह् verbs
- Recognizes preposition-modified anger/harm contexts
- Handles the case change from dative to accusative with उपसर्ग
- Validates preposition presence and its effect on case assignment

## Usage Examples
```javascript
// Example: Anger with prefix (accusative instead of dative)
const result = identifyPrefixedAngerKarma('शत्रु', { 
  verb: 'अभिक्रुध्यति', 
  context: 'शत्रुम् अभिक्रुध्यति',
  prefix: 'अभि'
});
// Expected: { applies: true, karaka: 'कर्म', case_required: 'accusative' }
```

---

*Generated from template: SUTRA_README_TEMPLATE.md*
