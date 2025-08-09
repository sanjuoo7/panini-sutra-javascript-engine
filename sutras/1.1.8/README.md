
# Sūtra 1.1.8: mukhanāsikāvacano'nunāsikaḥ

**Translation:** That which is uttered simultaneously through the mouth and the nose is called *anunāsika* (nasal).

This sūtra defines what is meant by the term **anunāsika** (nasalized). It is a *saṃjñā* (definition or name) sūtra.

## Implementation

The `isAnunasika(phoneme)` function checks if a given phoneme is a nasal consonant. It uses a predefined list of nasal consonants from the `SanskritConsonants` constants, which includes:

- **IAST:** ṅ, ñ, ṇ, n, m, ṃ
- **Devanagari:** ङ, ञ, ण, न, म, ं

The function returns `true` if the phoneme is in this list, and `false` otherwise.

## Usage

```javascript
import { isAnunasika } from './index.js';

const isNasal = isAnunasika('m'); // true
const isNasalDevanagari = isAnunasika('न'); // true
const isNotNasal = isAnunasika('k'); // false
```
