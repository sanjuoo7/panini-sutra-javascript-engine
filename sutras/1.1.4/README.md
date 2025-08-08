# Sutra 1.1.4: न धातुलोप आर्धधातुके (na dhātulopa ārdhadhātuke)

## Original Sutra
न धातुलोप आर्धधातुके

## Translation
There is no dhātu lopa (elision of the dhātu) before an ārdhadhātuka affix.

## Description
This sutra establishes a blocking rule that prevents guṇa and vṛddhi transformations when dhātu lopa (elision/deletion of dhātu) occurs with ārdhadhātuka affixes. This is a critical morphological rule that governs how verbal roots interact with certain types of affixes.

### Key Concepts:
- **Dhātu lopa**: Complete or partial elision of the verbal root
- **Ārdhadhātuka affixes**: A class of affixes that includes:
  - य (ya) - gerundive suffix
  - त्वा (tvā) - absolutive suffix  
  - क्त (kta) - past participle suffix
  - क्तवत् (ktavat) - perfect participle suffix
  - श (śa) - aorist suffix
  - Various other affixes like क (ka), न (na), त (ta), त्र (tra), मन् (man)

### When Blocking Occurs:
1. An ārdhadhātuka affix is added to a dhātu
2. The combination causes dhātu lopa (elision of the root)
3. Under these conditions, guṇa/vṛddhi transformations are blocked

### When Blocking Does NOT Occur:
1. With sārvadhātuka affixes (like ति, तस्, थि, सि, etc.)
2. With vowel-initial affixes (अ, इ, उ, आ)
3. When no dhātu lopa occurs

## Functions

### `isArdhadhatuka(affix)`
Determines if an affix belongs to the ārdhadhātuka class.

```javascript
isArdhadhatuka('ya')    // true
isArdhadhatuka('kta')   // true
isArdhadhatuka('ti')    // false (sārvadhātuka)
```

### `causesDhatuLopa(dhatu, affix)`
Checks if a dhātu-affix combination results in dhātu lopa.

```javascript
causesDhatuLopa('gam', 'ya')  // true
causesDhatuLopa('pac', 'ti')  // false
```

### `shouldBlockGunaVrddhi(dhatu, affix, operation)`
Main function that determines if guṇa/vṛddhi should be blocked.

```javascript
shouldBlockGunaVrddhi('han', 'ya', 'guna')     // true (blocks)
shouldBlockGunaVrddhi('nī', 'ti', 'guna')      // false (allows)
```

### `analyzeDhatuAffixCombination(dhatu, affix)`
Provides detailed analysis of dhātu-affix interactions.

```javascript
analyzeDhatuAffixCombination('gam', 'ya')
// Returns: {
//   isArdhadhatuka: true,
//   causesDhatuLopa: true,
//   shouldBlock: true,
//   reason: "Blocks guṇa/vṛddhi due to dhātu lopa with ārdhadhātuka affix"
// }
```

## Examples

### Blocking Cases (guṇa/vṛddhi prevented):
- गम् + य → गम्य (not गेम्य)
- हन् + य → हन्य (not हान्य)  
- विद् + क्त → विदित (not वेदित)
- गम् + त्वा → गत्वा (not गेत्वा)

### Non-blocking Cases (guṇa/vṛddhi allowed):
- नी + ति → नेति (guṇa applied)
- भू + ति → भोति (guṇa applied)
- कृ + ति → करोति (guṇa applied)
- बुध् + अन → बोधन (guṇa with vowel-initial affix)

## Linguistic Significance
This sutra is fundamental to Sanskrit morphology as it:
1. Defines the scope of vowel transformation blocking
2. Establishes the interaction between dhātu lopa and guṇa/vṛddhi
3. Provides a systematic approach to handling morphological conflicts
4. Forms the basis for understanding complex verbal derivations

## Test Coverage
- 92 comprehensive tests covering:
  - Ārdhadhātuka affix classification (25 tests)
  - Dhātu-affix combination blocking (50 tests)
  - Dhātu lopa detection (3 tests)
  - Combination analysis (2 tests)
  - Sutra application (4 tests)
  - Condition validation (3 tests)
  - Edge cases and error handling (3 tests)
  - Integration with other sutras (2 tests)

## Implementation Notes
- Supports both IAST and Devanagari scripts
- Handles complex morphological interactions
- Provides detailed analysis for linguistic research
- Includes comprehensive error handling
- Follows authentic Pāṇinian grammatical principles
