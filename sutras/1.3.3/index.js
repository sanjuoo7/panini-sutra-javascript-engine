// Sutra 1.3.3: हलन्त्यम्
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isConsonant, getConsonantArticulation } from '../sanskrit-utils/classification.js';
import { normalizeScript } from '../sanskrit-utils/transliteration.js';
import { sanitizeInput } from '../sanskrit-utils/validation.js';

/**
 * Determines if the final consonant of a word is an it-marker according to Sutra 1.3.3.
 * In upadeśa (grammatical instruction), the final consonant (hal + antyam) is considered इत्.
 * 
 * @param {string} form - The input word or form to analyze
 * @param {object} [options] - Optional context and processing options
 * @returns {{ isIt: boolean, consonant: string|null, script: string, reason: string, consonantType: string|null }}
 */
function isFinalConsonantItMarker(form, options = {}) {
  // Input validation
  if (!form || typeof form !== 'string') {
    return { 
      isIt: false, 
      consonant: null, 
      script: null, 
      reason: 'invalid-input',
      consonantType: null 
    };
  }

  const script = detectScript(form);
  const trimmed = form.trim();

  if (!trimmed) {
    return { 
      isIt: false, 
      consonant: null, 
      script, 
      reason: 'empty-input',
      consonantType: null 
    };
  }

  // Get the final character and handle halanta cases
  let finalChar = trimmed.slice(-1);
  let actualConsonant = finalChar;
  
  // Handle explicit halanta (्) in Devanagari
  if (finalChar === '्' && trimmed.length >= 2) {
    actualConsonant = trimmed.slice(-2, -1);
    // This is explicitly a consonant ending, not vowel ending
    const consonantType = getConsonantArticulation(actualConsonant);
    return {
      isIt: true,
      consonant: actualConsonant,
      script,
      reason: 'final-consonant-it-marker',
      consonantType
    };
  }

  // For Devanagari, check special consonants first (visarga, anusvara)
  if (script === 'Devanagari' && ['ः', 'ं'].includes(finalChar)) {
    const consonantType = getConsonantArticulation(finalChar);
    return {
      isIt: true,
      consonant: finalChar,
      script,
      reason: 'final-consonant-it-marker',
      consonantType
    };
  }

  // For Devanagari words without explicit halanta, check if the consonant letter
  // has an inherent vowel (meaning it's vowel-ending, not consonant-ending)
  if (script === 'Devanagari' && finalChar !== '्') {
    // Check if final char is a consonant letter (without halanta)
    if (isConsonant(finalChar)) {
      // If it's a consonant letter but no halanta, it has inherent 'a' vowel
      // So it's vowel-ending, not consonant-ending
      return {
        isIt: false,
        consonant: finalChar,
        script,
        reason: 'vowel-ending-with-inherent-a',
        consonantType: null
      };
    }
  }

  // For IAST, check special consonant markers
  if (script === 'IAST' && ['ḥ', 'ṃ'].includes(finalChar)) {
    const consonantType = getConsonantArticulation(finalChar);
    return {
      isIt: true,
      consonant: finalChar,
      script,
      reason: 'final-consonant-it-marker',
      consonantType
    };
  }

  // Check if the final character is a consonant
  if (!isConsonant(actualConsonant)) {
    return {
      isIt: false,
      consonant: actualConsonant,
      script,
      reason: 'not-consonant-ending',
      consonantType: null
    };
  }

  // If it's a consonant, it's an it-marker according to 1.3.3
  const consonantType = getConsonantArticulation(actualConsonant);
  const normalizedConsonant = normalizeScript(actualConsonant);

  return {
    isIt: true,
    consonant: normalizedConsonant,
    script,
    reason: 'final-consonant-it-marker',
    consonantType
  };
}

export { isFinalConsonantItMarker };
