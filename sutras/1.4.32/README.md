# Sutra 1.4.32: कर्मणा यमभिप्रैति स सम्प्रदानम्

## Overview

**Sanskrit Text**: `कर्मणा यमभिप्रैति स सम्प्रदानम्`  
**Transliteration**: karmaṇā yamabhipraiti sa sampradānam  
**Translation**: The person whom one wishes to connect with the object of giving is called सम्प्रदान

## Purpose

This fundamental sutra establishes सम्प्रदान कारक (dative case) for recipients in giving contexts. When there is an action of giving, offering, or transferring, the person to whom something is given (the recipient) takes सम्प्रदान designation and requires dative case marking. This is the core definition of the dative relationship in Sanskrit grammar.

## Implementation

### Function Signature
```javascript
function identifySampradana(word, context = {}) {
    // Identifies सम्प्रदान (dative) relationships in giving/recipient contexts
    // Returns dative case assignment for recipients and beneficiaries
}
```

### Key Features
- Identifies recipients in giving and transfer contexts
- Recognizes beneficiaries requiring dative case
- Handles various giving verbs and transfer actions
- Supports both concrete and abstract giving scenarios
- Validates giver-recipient-object relationships
- Integrates with complete dative case system

## Usage Examples

```javascript
// Example: Giving to student
const result = identifySampradana('छात्र', { 
  verb: 'ददाति', 
  object: 'पुस्तक',
  context: 'छात्राय पुस्तकं ददाति',
  recipient: true
});
// Expected: { applies: true, karaka: 'सम्प्रदान', case_required: 'dative' }
```

## Integration

### Related Sutras
- **1.4.33-1.4.40**: Specific सम्प्रदान contexts
- **Giving Verb Classifications**: दा, प्रदा, उपहृ, etc.
- **Dative Case Formation Rules**: Dative ending assignments

---

*Generated from template: SUTRA_README_TEMPLATE.md*
