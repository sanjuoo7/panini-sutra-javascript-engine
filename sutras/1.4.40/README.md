# Sutra 1.4.40: आधारोऽधिकरणम्

## Overview
**Sanskrit Text**: `आधारोऽधिकरणम्`  
**Transliteration**: ādhāro'dhikaraṇam  
**Translation**: The substrate (support/base) is called अधिकरण (locative relationship)

## Purpose
Defines the fundamental कारक relationship where the substrate or base upon which an action occurs is assigned अधिकरण (locative) case, establishing spatial and temporal foundations for grammatical analysis.

## Implementation
```javascript
function identifySubstrateAdhikarana(word, context = {}) {
    // Identifies locative relationships for substrates and supporting bases
    // Returns locative case assignment for foundational spatial/temporal contexts
}
```

## Key Features
- Identifies locative case for substrate relationships
- Recognizes supporting base contexts in actions
- Handles fundamental spatial and temporal foundations
- Validates substrate role in various action contexts

## Usage Examples
```javascript
// Example: Substrate location (locative case)
const result = identifySubstrateAdhikarana('पृथिव्याम्', { 
  verb: 'चरति', 
  context: 'पृथिव्यां चरति',
  spatial_relationship: 'substrate'
});
// Expected: { applies: true, karaka: 'अधिकरण', case_required: 'locative' }
```

---

*Generated from template: SUTRA_README_TEMPLATE.md*
