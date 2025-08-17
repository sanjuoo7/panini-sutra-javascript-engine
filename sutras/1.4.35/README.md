# Sutra 1.4.35: धारेरुत्तमर्णः

## Overview
**Sanskrit Text**: `धारेरुत्तमर्णः`  
**Transliteration**: dhāreruttamarṇaḥ  
**Translation**: In the case of the verb धारि 'to owe', the creditor is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the creditor in debt contexts. When someone owes something (धारि verb), the creditor to whom the debt is owed takes dative case marking.

## Implementation
```javascript
function identifyCreditorSampradana(word, context = {}) {
    // Identifies dative relationships for creditors in debt/owing contexts
    // Returns dative case assignment for creditors and lenders
}
```

## Key Features
- Identifies creditors in debt relationships requiring dative case
- Recognizes owing (धारि) contexts and debt obligations
- Handles financial and obligation-based relationships
- Validates creditor-debtor relationships

## Usage Examples
```javascript
// Example: Owing to creditor
const result = identifyCreditorSampradana('महाजन', { 
  verb: 'धारयति', 
  context: 'महाजनाय धारयति',
  debt_context: true
});
// Expected: { applies: true, karaka: 'सम्प्रदान', case_required: 'dative' }
```

---

*Generated from template: SUTRA_README_TEMPLATE.md*
