## 1.2.48 गोस्त्रियोरुपसर्जनस्य

IAST: gostriyor-upasarjanasya  
Shortening applies to an upasarjana prātipadika ending in 'go' or one with a feminine affix termination.

### Conditions
- isUpasarjana true
- go-ending OR feminine context
- Final vowel mappable long

### Implementation
Uses `shortenFinalVowel`; reason metadata distinguishes go vs feminine.

### Example
```js
applySutra1_2_48('देवी', { isUpasarjana:true, gender:'feminine', assumePratipadika:true, script:'Devanagari' });
```
