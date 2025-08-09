
# Sūtra 1.1.9: tulyāsyaprayatnaṃ savarṇam

**Translation:** Those whose place of utterance and effort are equal are called *savarṇa* or homogeneous letters.

This sūtra defines the concept of **savarṇa** (homogeneous phonemes). It is a *saṃjñā* (definition or name) sūtra.

## Implementation

The `isSavarna(char1, char2)` function checks if two given phonemes are savarṇa. It uses the `Phoneme` class to get the phonetic features of each phoneme and then compares their `placeOfArticulation` and `mannerOfArticulation` properties.

The implementation also takes into account Sūtra 1.1.10 (nājjhalau), which prohibits a savarṇa relationship between vowels and consonants.

## Usage

```javascript
import { isSavarna } from './index.js';

const areVowelsSavarna = isSavarna('a', 'ā'); // true
const areConsonantsSavarna = isSavarna('k', 'g'); // true
const areNotSavarna = isSavarna('a', 'i'); // false
const vowelAndConsonant = isSavarna('a', 'k'); // false
```
