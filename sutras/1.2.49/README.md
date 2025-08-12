## Sutra 1.2.49: लुक् तद्धितलुकि

## Overview
**Sanskrit Text**: `लुक् तद्धितलुकि`  
**Transliteration**: luk taddhita-luki  
**Translation**: “(There is) LUK (elision) when (a prior) taddhita (affix) is LUK.” (Propagation of elision.)

## Purpose
Propagates prior taddhita LUK elision to feminine upasarjana members—ensuring structural consistency in compounds where an affix already underwent LUK.

## Implementation

### Function Signature
```javascript
import { applySutra1_2_49 } from './index.js';
const result = applySutra1_2_49(membersArray, context = {});
```

### Key Features
- Validates LUK context (`context.taddhitaElisionType==='luk'`).
- Scans members; marks eligible feminine upasarjana entries with `elided` & `elisionType`.
- Returns indices + count for downstream restructuring.

### Dependencies
- **Earlier Sutra**: 1.1.61 (`isLukSluLup`) for validating LUK designation.

## Usage Examples
```javascript
const members = [{ text:'देवी', role:'upasarjana', gender:'feminine', hasFeminineAffix:true }];
applySutra1_2_49(members, { taddhitaElisionType:'luk' });
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 4 tests (positive propagation, missing luk, non-upasarjana, invalid input)

## Notes
Non‑destructive to unrelated members; idempotent (skips already `elided` entries).
