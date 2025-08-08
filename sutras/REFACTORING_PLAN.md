# Sutra Refactoring Guide: Adopting Shared Utilities

## Date: August 8, 2025

## Overview

This guide outlines how to refactor each sutra implementation to use the new `shared-utils.js` module, eliminating code redundancy and improving maintainability.

## **Shared Utilities Created**

### Core Features:
1. **Script Detection**: `detectScript()`, `isDevanagari()`, `isIAST()`
2. **Phoneme Tokenization**: `tokenizePhonemes()`, `tokenizeIastPhonemes()`, `tokenizeDevanagariPhonemes()`
3. **Vowel Classification**: `isVrddhi()`, `isGuna()`, `isIkVowel()`, `isVowel()`, `isConsonant()`
4. **Comprehensive Analysis**: `analyzeVowel()`, `getFirstVowel()`
5. **Data Constants**: `SanskritVowels`, `SanskritConsonants` 
6. **Validation**: `validateInput()`

---

## **Sutra 1.1.1 (वृद्धिरादैच्) - Refactoring Plan**

### **Current Redundancies:**
```javascript
// REMOVE: Duplicate constants and functions
const vrddhiVowels = ['ā', 'ai', 'au'];
const vrddhiVowelsDevanagari = ['आ', 'ऐ', 'औ'];

function isVrddhi(vowel) { /* duplicate logic */ }
function getAllVrddhiVowels() { /* can be simplified */ }
function analyzeVowel(vowel) { /* similar to other sutras */ }
```

### **Refactored Implementation:**
```javascript
import { 
  isVrddhi, 
  analyzeVowel as analyzeVowelShared, 
  SanskritVowels,
  validateInput 
} from '../shared-utils.js';

// Use shared constants
export const vrddhiVowels = SanskritVowels.vrddhi.iast;
export const vrddhiVowelsDevanagari = SanskritVowels.vrddhi.devanagari;

// Use shared function
export { isVrddhi } from '../shared-utils.js';

// Simplified getter
export function getAllVrddhiVowels() {
  return {
    iast: SanskritVowels.vrddhi.iast,
    devanagari: SanskritVowels.vrddhi.devanagari,
    combined: [...SanskritVowels.vrddhi.iast, ...SanskritVowels.vrddhi.devanagari]
  };
}

// Enhanced analyzeVowel with sutra-specific context
export function analyzeVowel(vowel) {
  const validation = validateInput(vowel, 'string', 'vowel');
  if (!validation.isValid) {
    return { ...validation, explanation: validation.error };
  }

  const baseAnalysis = analyzeVowelShared(vowel);
  
  // Add Sutra 1.1.1 specific context
  return {
    ...baseAnalysis,
    sutraContext: '1.1.1',
    vrddhiStatus: baseAnalysis.classifications.isVrddhi ? 'vṛddhi vowel' : 'non-vṛddhi vowel',
    traditionalDefinition: 'ā, ai, au are called vṛddhi vowels'
  };
}

// Keep sutra-specific function
export function applySutra111(vowel) {
  const analysis = analyzeVowel(vowel);
  return {
    input: vowel,
    sutraApplied: '1.1.1',
    sutraName: 'vṛddhirādaic',
    classification: analysis.classifications.isVrddhi ? 'vṛddhi' : 'non-vṛddhi',
    ...analysis
  };
}
```

**Lines of Code Saved: ~30 lines**

---

## **Sutra 1.1.2 (अदेङ् गुणः) - Refactoring Plan**

### **Current Redundancies:**
```javascript
// REMOVE: Duplicate patterns
const gunaVowels = ['a', 'e', 'o'];
const gunaVowelsDevanagari = ['अ', 'ए', 'ओ'];
function isGuna(vowel) { /* duplicate logic */ }
function analyzeVowel(vowel) { /* very similar to 1.1.1 */ }
```

### **Refactored Implementation:**
```javascript
import { 
  isGuna, 
  analyzeVowel as analyzeVowelShared, 
  SanskritVowels,
  validateInput 
} from '../shared-utils.js';

export const gunaVowels = SanskritVowels.guna.iast;
export const gunaVowelsDevanagari = SanskritVowels.guna.devanagari;
export { isGuna } from '../shared-utils.js';

export function getAllGunaVowels() {
  return {
    iast: SanskritVowels.guna.iast,
    devanagari: SanskritVowels.guna.devanagari,
    combined: [...SanskritVowels.guna.iast, ...SanskritVowels.guna.devanagari]
  };
}

export function analyzeVowel(vowel) {
  const validation = validateInput(vowel, 'string', 'vowel');
  if (!validation.isValid) {
    return { ...validation, explanation: validation.error };
  }

  const baseAnalysis = analyzeVowelShared(vowel);
  
  return {
    ...baseAnalysis,
    sutraContext: '1.1.2',
    gunaStatus: baseAnalysis.classifications.isGuna ? 'guṇa vowel' : 'non-guṇa vowel',
    traditionalDefinition: 'a, e, o are called guṇa vowels'
  };
}
```

**Lines of Code Saved: ~25 lines**

---

## **Sutra 1.1.3 (इको गुणवृद्धी) - Refactoring Plan**

### **Current Redundancies:**
```javascript
// REMOVE: Duplicate vowel arrays and detection
const ikVowels = ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'];
const ikVowelsDevanagari = ['इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ'];
function isIkVowel(vowel) { /* duplicate logic */ }

// IMPROVE: getGunaVrddhiScope can use shared tokenization
```

### **Refactored Implementation:**
```javascript
import { 
  isIkVowel, 
  SanskritVowels,
  tokenizePhonemes,
  validateInput 
} from '../shared-utils.js';

export const ikVowels = SanskritVowels.ik.iast;
export const ikVowelsDevanagari = SanskritVowels.ik.devanagari;
export { isIkVowel } from '../shared-utils.js';

// Enhanced scope analysis using shared tokenization
export function getGunaVrddhiScope(word) {
  const validation = validateInput(word, 'string', 'word');
  if (!validation.isValid) {
    return { error: validation.error, results: [] };
  }

  const tokenResult = tokenizePhonemes(word);
  const results = [];
  
  tokenResult.phonemes.forEach((phoneme, index) => {
    if (isVowel(phoneme)) {
      results.push({
        vowel: phoneme,
        position: index,
        isIk: isIkVowel(phoneme),
        gunaForm: applyGunaToIk(phoneme),
        vrddhiForm: applyVrddhiToIk(phoneme)
      });
    }
  });
  
  return {
    results,
    tokenization: tokenResult,
    word
  };
}
```

**Lines of Code Saved: ~40 lines (from tokenization logic)**

---

## **Sutra 1.1.6 (पूर्वोऽवरः) - Already Refactored**

### **Current Status:** ✅ **Already using advanced phoneme tokenization**

The 1.1.6 implementation already uses sophisticated tokenization. We can enhance it further:

```javascript
import { 
  tokenizePhonemes,
  detectScript,
  validateInput 
} from '../shared-utils.js';

// Replace current tokenization with shared utility
export function analyzePhonemeSequence(sequence) {
  const validation = validateInput(sequence, 'string', 'sequence');
  if (!validation.isValid) {
    return { isValid: false, error: validation.error, analysis: null };
  }

  const tokenResult = tokenizePhonemes(sequence);
  
  const precedenceAnalysis = tokenResult.phonemes.map((phoneme, index) => ({
    phoneme,
    position: index,
    precedenceLevel: index + 1,
    category: index === 0 ? 'पूर्व (pūrva)' : 'अवर (avara)',
    influenceDirection: index === 0 ? 'rightward (दक्षिणावर्त)' : 'dependent',
    isPrimary: index === 0
  }));

  return {
    isValid: true,
    error: null,
    sequence,
    script: tokenResult.script,
    phonemes: precedenceAnalysis,
    primaryPhoneme: precedenceAnalysis[0],
    dependentPhonemes: precedenceAnalysis.slice(1),
    principle: 'पूर्वोऽवरः',
    sandhiDirection: 'पूर्व influences अवर',
    analysis: `In sequence "${sequence}", "${precedenceAnalysis[0].phoneme}" has primary influence`,
    tokenization: {
      method: `${tokenResult.script} phoneme tokenization`,
      phonemeCount: tokenResult.count,
      rawPhonemes: tokenResult.phonemes
    }
  };
}
```

**Lines of Code Saved: ~15 lines (removes duplicate tokenization logic)**

---

## **Sutra 1.1.7 (हलन्त्यम्) - Refactoring Plan**

### **Current Redundancies:**
```javascript
// REMOVE: Duplicate consonant arrays
const consonants = [/* long array */];
const consonantsDevanagari = [/* long array */];
function isConsonant(char) { /* duplicate logic */ }
```

### **Refactored Implementation:**
```javascript
import { 
  isConsonant, 
  SanskritConsonants,
  detectScript,
  validateInput 
} from '../shared-utils.js';

export const consonants = SanskritConsonants.all.iast;
export const consonantsDevanagari = SanskritConsonants.all.devanagari;
export { isConsonant } from '../shared-utils.js';

// Enhanced word-final analysis
export function endsWithConsonant(word) {
  const validation = validateInput(word, 'string', 'word');
  if (!validation.isValid) return false;

  const script = detectScript(word);
  const lastChar = word.slice(-1);
  
  // Use shared consonant detection
  if (isConsonant(lastChar)) {
    // Script-specific logic for inherent vowels
    if (script === 'Devanagari') {
      return ['ः', 'ं', '्'].includes(lastChar) || word.slice(-2, -1) === '्';
    }
    return true;
  }
  
  return false;
}
```

**Lines of Code Saved: ~35 lines**

---

## **Migration Summary**

### **Total Benefits:**
- **~145+ lines of code eliminated** across all sutras
- **Consistent behavior** across all vowel/consonant classification
- **Better error handling** with shared validation
- **Enhanced phoneme tokenization** available to all sutras
- **Easier maintenance** - fix bugs in one place
- **Better testing** - test core functionality once

### **Migration Steps:**

1. **Phase 1**: Update imports in each sutra file
2. **Phase 2**: Replace duplicate constants with shared ones
3. **Phase 3**: Replace duplicate functions with shared utilities
4. **Phase 4**: Enhance sutra-specific functions with shared analysis
5. **Phase 5**: Update test files to import from shared utils where appropriate
6. **Phase 6**: Update documentation

### **Breaking Changes:**
- **Minimal**: Most function signatures remain the same
- **Enhanced**: Functions now provide richer analysis data
- **Consistent**: All sutras now handle edge cases uniformly

### **Testing Strategy:**
1. Run all existing tests to ensure compatibility
2. Add tests for shared utilities
3. Test cross-sutra integration scenarios
4. Performance testing for tokenization improvements

### **Next Steps:**
1. **Implement Phase 1** - Update imports (low risk)
2. **Validate with tests** - Ensure no regressions
3. **Continue phases progressively** - Minimize disruption
4. **Update documentation** - Reflect new shared architecture

This refactoring will significantly improve the codebase maintainability while providing enhanced functionality across all sutras.
