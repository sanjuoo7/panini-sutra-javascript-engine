# Sutra 1.2.62: विशाखयोश्च

## Overview

**Sanskrit Text**: विशाखयोश्च  
**Transliteration**: viśākhayoś ca  
**Translation**: And likewise (the provision of optional singular) for Viśākhā (dual pair) – continuing the Vedic (chandas) condition from the preceding rule.

## Purpose

Extends the optional singular usage (introduced for Punarvasū in 1.2.61) to the Viśākhā pair under identical gating: nakṣatra domain + chandas context.

## Implementation

### Function Signature
```javascript
export function sutra_1_2_62(term, context = {}) → ResultObject
```

### Key Features
- Relies on inherited `chandas` restriction (implicit ca of prior rule).
- Lexical match for Viśākhā (IAST & Devanagari) only.
- Supplies `numberOptions:['singular','dual']`.

### Dependencies
- **Sanskrit Utils**: `number-determination.js` (`applySutra1_2_62`).

## Usage Examples
```javascript
import { sutra_1_2_62 } from './index.js';

sutra_1_2_62('viśākhā', { domain:'nakshatra', chandas:true }); // applied:true
sutra_1_2_62('विशाखा', { semanticCategory:'nakshatra', chandas:true }); // applied:true
sutra_1_2_62('viśākhā', { domain:'nakshatra' }); // not applied (missing chandas)
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 5 (positive IAST/Devanagari, missing chandas, wrong star, invalid input)

## Technical Details
Algorithm identical to 1.2.61 with different lexical target set (VISAKHA).

## Integration
Forms a trio with 1.2.60 & 1.2.61 prior to enforcement rule 1.2.63.

## References
Inherited condition via anuvṛtti (ellipsis) of chandas from 1.2.61.

---
*Generated from template: SUTRA_README_TEMPLATE.md*
