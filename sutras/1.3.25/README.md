# Sutra 1.3.25: उपान्मन्त्रकरणे

## Overview

**Sanskrit Text**: `उपान्मन्त्रकरणे`  
**Transliteration**: upānamantrakaraṇe  
**Translation**: From उप (prefix), in worship/mantra contexts

## Purpose

This sutra prescribes ātmanepada endings for the root स्था (to stand) when preceded by the prefix उप, specifically in contexts related to worship, adoration, or mantra recitation (मन्त्रकरणे). This extends the ātmanepada assignment from the previous sutra to उप-prefixed forms in devotional contexts.

## Implementation

### Function Signature
```javascript
function determineUpSthaWorshipAtmanepada(word, context = {}) {
    // Returns analysis of ātmanepada assignment for उप + स्था in worship contexts
}
```

### Key Features
- Pattern recognition for उप + स्था combinations in both Devanagari and IAST
- Worship context detection and semantic analysis
- Support for mantra, upāsana, and pūjā contexts
- Comprehensive error handling and input validation
- Integration with उपास (upās) worship-related forms

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`, `tokenizePhonemes`
- **Pattern Recognition**: Internal regex patterns for उप + स्था combinations
- **Semantic Analysis**: Worship context identification logic

## Usage Examples

### Basic Usage
```javascript
import { determineUpSthaWorshipAtmanepada } from './index.js';

// Example 1: Valid ātmanepada in worship context
const result1 = determineUpSthaWorshipAtmanepada('उपतिष्ठते');
console.log(result1); 
// { isUpSthaWorshipAtmanepada: true, confidence: 0.8, prefix: 'उप', root: 'स्था' }

// Example 2: Worship-related form
const result2 = determineUpSthaWorshipAtmanepada('उपासते');
console.log(result2); 
// { isUpSthaWorshipAtmanepada: true, worshipContext: true, confidence: 0.8 }
```

### Advanced Usage
```javascript
// IAST script support
const result3 = determineUpSthaWorshipAtmanepada('upatiṣṭhate');
console.log(result3);
// { isUpSthaWorshipAtmanepada: true, confidence: 0.8, script: 'IAST' }

// Explicit worship context
const result4 = determineUpSthaWorshipAtmanepada('उपस्थान', {
  meaning: 'worship practice, devotional standing'
});
console.log(result4);
// { isUpSthaWorshipAtmanepada: true, worshipContext: true, confidence: 0.9 }

// Mantra context detection
const result5 = determineUpSthaWorshipAtmanepada('उपमन्त्रस्था', {
  meaning: 'standing for mantra recitation'
});
console.log(result5);
// { isUpSthaWorshipAtmanepada: true, worshipContext: true, confidence: 0.8 }
```

## Technical Notes

- The term मन्त्रकरणे encompasses various worship activities including mantra recitation, upāsana, and pūjā
- Worship indicators include: उपास (upāsa), मन्त्र (mantra), पूजा (pūjā), वन्दना (vandanā)
- Non-worship uses of उप + स्था may not qualify for ātmanepada under this sutra
- The function analyzes semantic context to determine worship-related usage

## Related Sutras

- **1.3.24**: उदोऽनूर्द्ध्वकर्मणि (उद् + स्था with exclusions)
- **1.3.26**: अकर्मकाच्च (general intransitive extension)

## Worship Context Recognition

The implementation identifies worship contexts through:
- **Explicit terms**: मन्त्र, उपासना, पूजा, वन्दना
- **Semantic meanings**: worship, adoration, devotion, reverence
- **Compound analysis**: Forms containing worship-related elements
- **Contextual cues**: Devotional or ritual usage indicators

## Testing

The implementation includes comprehensive tests covering:
- Valid उप + स्था combinations
- Worship context detection
- IAST and Devanagari script support
- Error handling and edge cases
- Semantic analysis for devotional contexts
