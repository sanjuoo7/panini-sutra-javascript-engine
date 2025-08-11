import { 
  tokenizePhonemes,
  constructPratyahara,
  getCommonPratyahara,
  validatePratyahara,
  getPratyaharaExamples,
  SHIVA_SUTRAS,
  SHIVA_SUTRAS_WITH_IT,
  COMMON_PRATYAHARAS
} from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.71: आदिरन्त्येन सहेता
 * "An initial letter, with a final इत् letter, is the name of itself and of the intervening letters."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.71 - The fundamental pratyāhāra rule
 */

/**
 * Main function implementing Sutra 1.1.71 using shared utilities
 * @param {string} startLetter - The initial letter of the pratyāhāra
 * @param {string} itMarker - The इत् marker letter
 * @param {Object} context - Additional context
 * @returns {Object} Complete pratyāhāra analysis
 */
export function sutra1_1_71(startLetter, itMarker, context = {}) {
  // Input validation
  if (!startLetter || !itMarker || 
      typeof startLetter !== 'string' || typeof itMarker !== 'string') {
    throw new Error('Both start letter and इत् marker must be valid strings');
  }

  const { customAlphabet = null } = context;

  // Use shared pratyāhāra construction utility
  const result = constructPratyahara(startLetter, itMarker, customAlphabet);

  return {
    startLetter,
    itMarker,
    pratyahara: result.pratyahara,
    valid: result.valid,
    length: result.length,
    type: result.type,
    traditional: result.traditional,
    error: result.error || null,
    sutraReference: '1.1.71',
    principle: 'आदिरन्त्येन सहेता - Initial with final इत् denotes the group'
  };
}

/**
 * Constructs a pratyāhāra using the shared utility
 * @param {string} startLetter - The initial letter
 * @param {string} itMarker - The इत् marker
 * @param {string[]} alphabet - Custom alphabet (optional)
 * @returns {string[]} Array of letters in the pratyāhāra
 */
export function getPratyahara(startLetter, itMarker, alphabet = null) {
  const result = constructPratyahara(startLetter, itMarker, alphabet);
  return result.valid ? result.pratyahara : [];
}

/**
 * Gets a pratyāhāra from the standard Śivasūtras using shared utility
 * @param {string} startLetter - The initial letter
 * @param {string} itMarker - The इत् marker
 * @returns {string[]} The pratyāhāra letters
 */
export function getShivaSutraPratyahara(startLetter, itMarker) {
  return getPratyahara(startLetter, itMarker, SHIVA_SUTRAS_WITH_IT);
}

/**
 * Gets a well-known pratyāhāra by name using shared utility
 * @param {string} name - The name of the pratyāhāra
 * @returns {string[]} The letters in the pratyāhāra
 */
export function getCommonPratyaharaLegacy(name) {
  const result = getCommonPratyahara(name);
  return result.valid ? result.pratyahara : [];
}

/**
 * Validates if a given letter sequence forms a valid pratyāhāra using shared utility
 * @param {string} startLetter - The proposed start letter
 * @param {string} itMarker - The proposed इत् marker
 * @param {string[]} alphabet - The alphabet to validate against (optional)
 * @returns {boolean} True if it forms a valid pratyāhāra
 */
export function isValidPratyahara(startLetter, itMarker, alphabet = null) {
  const result = validatePratyahara(startLetter, itMarker, alphabet);
  return result.valid;
}

/**
 * Get examples demonstrating this sutra using shared utility
 * @returns {Object} Traditional examples
 */
export function getExamples() {
  return getPratyaharaExamples();
}

// Re-export shared constants for backward compatibility
export { 
  SHIVA_SUTRAS,
  SHIVA_SUTRAS_WITH_IT,
  COMMON_PRATYAHARAS
};

export default sutra1_1_71;
