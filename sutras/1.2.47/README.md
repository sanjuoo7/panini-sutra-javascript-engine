## Sutra 1.2.47: ह्रस्वो नपुंसके प्रातिपदिकस्य

## Overview
**Sanskrit Text**: `ह्रस्वो नपुंसके प्रातिपदिकस्य`  
**Transliteration**: hrasvo napuṃsake prātipadikasya  
**Translation**: “In a neuter prātipadika the (final long vowel) becomes short.”

## Purpose
Implements neuter‑specific final long vowel shortening, preparing forms for downstream morphology by normalizing quantity in neuter stems.

## Implementation

### Function Signature
```javascript
import { applySutra1_2_47 } from './index.js';
const result = applySutra1_2_47(word, context = {}, options = {});
```

### Key Features
- Gender gate (`gender==='neuter'`).
- Optional prātipadika verification (`assumePratipadika` shortcut).
- Uses shared vowel shortening utility (Pattern I preview/commit capability).
- Metadata includes original/new vowel and reason code.

### Dependencies
- **Sanskrit Utils**: `pratipadika-classification.isPratipadika`, `vowel-length-transformation.shortenFinalVowel`

## Usage Examples
```javascript
// Preview (no mutation)
applySutra1_2_47('देवा', { gender:'neuter', assumePratipadika:true, script:'Devanagari' }, { transform:false });

// Commit transformation
applySutra1_2_47('देवा', { gender:'neuter', assumePratipadika:true, script:'Devanagari' });
```

## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 4 tests (preview success, gender negative, already short, invalid input)

## Notes
Pairs with 1.2.48 which applies similar shortening under different (upasarjana / feminine / go) conditions.
