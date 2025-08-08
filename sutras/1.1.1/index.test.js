import { isVrddhi } from './index.js';
import TransliterationUtil from '../utils.js';
import { iastTestCases, devanagariTestCases } from './test-cases.js';

// Simple function to extract the first vowel-like sound from a word in IAST.
function getFirstIastVowel(word) {
  const vowelRegex = /ai|au|ā|a|i|ī|u|ū|ṛ|ṝ|ḷ|ḹ|e|o/;
  const match = word.match(vowelRegex);
  return match ? match[0] : undefined;
}

describe('Sutra 1.1.1: vṛddhirādaic (IAST)', () => {
  iastTestCases.forEach(({ word, expected }) => {
    const firstVowel = getFirstIastVowel(word);

    test(`should return ${expected} for the first vowel of "${word}" (vowel: ${firstVowel})`, () => {
      if (firstVowel) {
        expect(isVrddhi(firstVowel)).toBe(expected);
      } else {
        fail(`Could not find a vowel in "${word}"`);
      }
    });
  });
});

describe('Sutra 1.1.1: vṛddhirādaic (Devanagari)', () => {
    devanagariTestCases.forEach(({ word, expected }) => {
        const firstVowel = TransliterationUtil.getFirstDevanagariVowel(word);
        const iastVowel = firstVowel ? TransliterationUtil.transliterate(firstVowel) : undefined;

        test(`should return ${expected} for the first vowel of "${word}" (vowel: ${iastVowel})`, () => {
            if (iastVowel) {
                expect(isVrddhi(iastVowel)).toBe(expected);
            } else {
                fail(`Could not find or transliterate a vowel in "${word}"`);
            }
        });
    });
});
