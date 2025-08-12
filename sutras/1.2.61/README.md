# Sutra 1.2.61: छन्दसि पुनर्वस्वोरेकवचनम्

## Overview

**Sanskrit Text**: छन्दसि पुनर्वस्वोरेकवचनम्  
**Transliteration**: chandasi punarvasvor ekavacanam  
**Translation**: In Vedic (chandas) usage, the singular Punarvasu is optionally employed for its dual form.

## Purpose

Adds optional singular interpretation for the dual star pair Punarvasū restricted to the chandas (Vedic) context within the nakṣatra semantic domain. Extends number flexibility without changing the dual surface form unless user explicitly supplies singular.

## Implementation

### Function Signature
```javascript
export function sutra_1_2_61(term, context = {}) → ResultObject
```

### Key Features
- Requires BOTH: nakṣatra domain + `chandas:true`.
- Lexical match for Punarvasū (IAST & Devanagari variants).
- Returns `numberOptions:['singular','dual']` and `optionalSingular:true`.

### Dependencies
- **Sanskrit Utils**: `number-determination.js` (`applySutra1_2_61` + star detection)
- Builds on earlier class/pronoun optional number (1.2.58–59) architecture.

## Usage Examples

```javascript
import { sutra_1_2_61 } from './index.js';

sutra_1_2_61('punarvasu', { domain:'nakshatra', chandas:true });
// applied:true, numberOptions includes singular & dual

sutra_1_2_61('पुनर्वसू', { semanticCategory:'nakshatra', chandas:true });
// applied:true

sutra_1_2_61('punarvasu', { domain:'nakshatra' }); // Not applied (missing chandas)
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 6
- Positive IAST & Devanagari
- Missing chandas flag
- Missing domain
- Non‑star input
- Invalid/empty input handling

## Technical Details
### Algorithm
1. Validate input + domain + `chandas` flag.
2. Detect star group (PUNARVASU) via normalized set.
3. Provide singular+dual options; mark optionalSingular.

### Performance
O(1) constant star set scan.

### Edge Cases
- Whitespace trimmed implicitly.
- Null/empty returns non‑applied with explanation.

## Integration
Related: 1.2.60 (semantic plural), 1.2.62 (parallel optional singular), 1.2.63 (enforced dual). Precedence: enforcement (1.2.63) overrides mere optionality if both stars appear in dvandva context.

## References
- Traditional explanation of Vedic singular usage for dual star pairs.
- Strategy Pattern J (Astral Semantic Number Overrides).

---
*Generated from template: SUTRA_README_TEMPLATE.md*
