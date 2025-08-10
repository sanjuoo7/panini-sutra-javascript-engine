import { detectScript } from '../sanskrit-utils/script-detection.js';
import { SanskritVowels } from '../sanskrit-utils/constants.js';

/**
 * Sutra 1.1.51: uraँṇa raparaḥ (उरँण् रपरः)
 * "When a letter of अण् प्रत्यहार comes as a substitute for ऋ, it is always followed by र्।"
 *
 * This rule ensures that when the vowels 'a', 'i', or 'u' (which constitute the 'aṇ' pratyahara)
 * are substituted in place of 'ṛ' or 'ṝ', they are always accompanied by an 'r' sound.
 *
 * @param {string} substitute - The phoneme that is substituting 'ṛ' or 'ṝ'.
 * @param {string} originalPhoneme - The phoneme being substituted (expected to be 'ṛ' or 'ṝ').
 * @param {string} script - The script of the input ('IAST' or 'Devanagari').
 * @returns {string} The modified substitute with 'r' appended if the rule applies, otherwise the original substitute.
 *
 * @example
 * // IAST examples
 * applyRaparaha('a', 'ṛ', 'IAST'); // returns 'ar'
 * applyRaparaha('i', 'ṛ', 'IAST'); // returns 'ir'
 * applyRaparaha('u', 'ṛ', 'IAST'); // returns 'ur'
 *
 * // Devanagari examples
 * applyRaparaha('अ', 'ऋ', 'Devanagari'); // returns 'अर्'
 * applyRaparaha('इ', 'ऋ', 'Devanagari'); // returns 'इर्'
 * applyRaparaha('उ', 'ऋ', 'Devanagari'); // returns 'उर्'
 */
export function applyRaparaha(substitute, originalPhoneme, script) {
  if (!substitute || typeof substitute !== 'string' || !originalPhoneme || typeof originalPhoneme !== 'string' || !script || typeof script !== 'string') {
    throw new Error('Invalid input: substitute, originalPhoneme, and script must be non-empty strings.');
  }

  const isAnPratyahara = (phoneme, currentScript) => {
    const anPratyaharaIAST = ['a', 'i', 'u'];
    const anPratyaharaDevanagari = ['अ', 'इ', 'उ'];

    if (currentScript === 'IAST') {
      return anPratyaharaIAST.includes(phoneme);
    } else if (currentScript === 'Devanagari') {
      return anPratyaharaDevanagari.includes(phoneme);
    }
    return false;
  };

  const isR = (phoneme, currentScript) => {
    const rIAST = ['ṛ', 'ṝ'];
    const rDevanagari = ['ऋ', 'ॠ'];

    if (currentScript === 'IAST') {
      return rIAST.includes(phoneme);
    } else if (currentScript === 'Devanagari') {
      return rDevanagari.includes(phoneme);
    }
    return false;
  };

  if (isR(originalPhoneme, script) && isAnPratyahara(substitute, script)) {
    return script === 'IAST' ? `${substitute}r` : `${substitute}र्`;
  }

  return substitute;
}
