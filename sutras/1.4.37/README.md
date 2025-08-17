# Sutra 1.4.37: क्रुधद्रुहेर्ष्याऽसूयार्थानां यं प्रति कोपः

## Overview
**Sanskrit Text**: `क्रुधद्रुहेर्ष्याऽसूयार्थानां यं प्रति कोपः`  
**Transliteration**: krudhdruheryā'sūyārthānāṃ yaṃ prati kopaḥ  
**Translation**: In the case of verbs having the sense of क्रुध् 'to be angry', द्रुह् 'to injure', ईर्ष्या 'to envy', असूया 'to find fault', the person towards whom the anger is directed is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the target of negative emotions. When verbs express anger, injury, envy, or fault-finding, the person towards whom these emotions are directed takes dative case.

## Implementation
```javascript
function identifyAngerTargetSampradana(word, context = {}) {
    // Identifies dative relationships for targets of anger and negative emotions
    // Returns dative case assignment for recipients of anger, envy, etc.
}
```

## Key Features
- Identifies targets of anger (क्रुध्) requiring dative case
- Recognizes targets of injury/harm (द्रुह्) contexts
- Handles envy (ईर्ष्या) and fault-finding (असूया) target relationships
- Validates negative emotion direction relationships

## Usage Examples
```javascript
// Example: Being angry at someone
const result = identifyAngerTargetSampradana('शत्रु', { 
  verb: 'क्रुध्यति', 
  context: 'शत्रवे क्रुध्यति',
  anger_target: true
});
// Expected: { applies: true, karaka: 'सम्प्रदान', case_required: 'dative' }
```

---

*Generated from template: SUTRA_README_TEMPLATE.md*
