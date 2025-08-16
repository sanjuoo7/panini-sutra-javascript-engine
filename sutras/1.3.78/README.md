# Sutra 1.3.78: शेषात् कर्तरि परस्मैपदम्

## Overview

**Sanskrit Text**: `शेषात् कर्तरि परस्मैपदम्`  
**Transliteration**: śeṣāt kartari parasmaipada  
**Translation**: For the remaining (verbs) in the active voice, Parasmaipada is used.

## Purpose

This sutra establishes the default rule for Sanskrit verb conjugation: when no other specific conditions apply (शेष), verbs in the active voice (कर्तरि) take Parasmaipada endings. This serves as the fundamental fallback rule after all special Ātmanepada conditions have been considered.

## Implementation

### Function Signature
```javascript
function sutra1378(word, context = {}) {
    // Returns analysis for default Parasmaipada assignment
}
```

### Key Features
- Default voice assignment for active constructions
- Comprehensive condition checking (शेष analysis)
- Active voice verification (कर्तरि)
- Integration with preceding Ātmanepada rules
- Multi-script support (Devanagari and IAST)

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord
- **Voice Analysis**: Active/passive voice detection
- **Rule Integration**: Coordination with other voice rules

## Usage Examples

### Basic Usage
```javascript
import { sutra1378 } from './index.js';

// Standard active verb (no special conditions)
const result1 = sutra1378('गच्छति', {
  voice: 'active',
  isShesa: true  // No other rules apply
});
console.log(result1); // { applies: true, isParasmaipada: true, confidence: 0.95 }

// Passive voice (rule doesn't apply)
const result2 = sutra1378('गम्यते', {
  voice: 'passive'
});
console.log(result2); // { applies: false, isParasmaipada: false }
```

### Advanced Usage
```javascript
// Automatic शेष detection
const result = sutra1378('पचति', {
  voice: 'active'
});
// Analyzes context to determine if other rules apply

// Integration with other rules
const result2 = sutra1378('करोति', {
  voice: 'active',
  otherRulesChecked: ['1.3.72', '1.3.74', '1.3.76']
});
// Considers other Ātmanepada rules before applying default
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 26 tests covering:
- Basic default Parasmaipada assignment
- Active voice verification and requirement
- शेष condition analysis (when other rules don't apply)
- Integration with special Ātmanepada conditions
- Pattern recognition for various verb forms
- IAST script support and conversion
- Edge cases with ambiguous voice
- Error handling and input validation

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.78

# Run with coverage
npm test sutras/1.3.78 --coverage
```

## Technical Details

### Algorithm
1. Validates input and detects script
2. Verifies active voice condition (कर्तरि)
3. Analyzes whether other voice rules apply
4. Determines शेष (remaining) status
5. Assigns default Parasmaipada when conditions are met

### Performance
- **Time Complexity**: O(1) for most operations
- **Space Complexity**: O(1) memory usage
- **Optimization Notes**: Efficient default assignment with rule integration

### Edge Cases
- Handles verbs with ambiguous voice assignment
- Integration with complex morphological patterns
- Default assignment when rule precedence is unclear
- Cross-script consistency for voice determination

## Integration

### Related Sutras
- **Preceded by**: All specific Ātmanepada rules (1.3.72-1.3.77)
- **1.3.72**: स्वरितञितः कर्त्रभिप्राये क्रियाफले (accent-based Ātmanepada)
- **1.3.74**: णिचश्च (causative with agent benefit)
- **1.3.75**: समुदाङ्भ्यो यमोऽग्रन्थे (यम् with specific prefixes)
- **1.3.76**: अनुपसर्गाज्ज्ञः (ज्ञा without prefix)
- **1.3.77**: विभाषोपपदेन प्रतीयमाने (optional with उपपद)

### Used By
- Complete voice assignment systems
- Sanskrit conjugation engines
- Default morphological processing
- Grammar validation frameworks

## References

- **Panini's Ashtadhyayi**: 1.3.78 शेषात् कर्तरि परस्मैपदम्
- **शेष Principle**: Default rule application when specific conditions don't apply
- **कर्तरि**: Active voice where the subject performs the action
- **परस्मैपद**: "Word for another" - traditional active voice endings

---

*Generated from template: SUTRA_README_TEMPLATE.md*
