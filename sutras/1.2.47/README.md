## 1.2.47 ह्रस्वो नपुंसके प्रातिपदिकस्य

IAST: hrasvo napuṃsake prātipadikasya  
Translation: "In a neuter prātipadika, the final vowel is shortened."

### Conditions
- Gender neuter.
- Word is (or assumed) prātipadika.
- Final vowel is a mappable long vowel.

### Implementation
Uses shared `shortenFinalVowel` utility for script-safe mapping.

### Return
Includes metadata: original & new final vowel and reason `neuter-shortening`.

### Example
```js
applySutra1_2_47('देवा', { gender:'neuter', assumePratipadika:true, script:'Devanagari' });
```
