## Sutra 1.2.50: इद्गोण्याः

## Overview
**Sanskrit Text**: `इद्गोण्याः`  
**Transliteration**: id goṇyāḥ  
**Translation**: "A short vowel (i) replaces the final long ī of a गोणी base when a taddhita affix is elided (luk/lup)."

## Purpose
Implements neuter-like final shortening specifically for the goṇī domain triggered by taddhita elision, preparing stems for subsequent derivation.

## Implementation
### Function Signature
```javascript
applySutra1_2_50(word, context = {}, options = {})
```
### Key Features
- Checks luk/lup elision context.
- Shortens only final long ī.
- Preview mode via `{ transform:false }`.
### Dependencies
- **Sanskrit Utils**: `vowel-length-transformation.shortenFinalVowel`

## Usage Examples
```javascript
applySutra1_2_50('देवी', { taddhitaElisionType:'luk', script:'Devanagari' }, { transform:false });
```
## Test Coverage
**Test File**: `index.test.js`  
**Test Cases**: 3 (positive, no elision, non-ī ending)

## Technical Details
### Algorithm
Matches context + final vowel, delegates mapping to shared utility.
### Performance
O(1) over word length.
### Edge Cases
- Missing elision context.
- Already short vowel.

## Integration
### Related Sutras
- **1.2.47–1.2.48**: Similar vowel shortening contexts.
- **1.2.51**: Subsequent retention of features after elision.
### Used By
- Downstream derivational normalization.

## References
- **Ashtadhyayi**: Traditional commentary on goṇī substitution.

---
*Generated from template: SUTRA_README_TEMPLATE.md*
