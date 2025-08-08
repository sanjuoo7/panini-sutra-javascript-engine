/**
 * Sutra 1.1.2: अदेङ् गुणः (adeṅ guṇaḥ)
 *
 * This sutra defines the term "guṇa". It states that the vowels a (अ), e (ए), and o (ओ) are called guṇa.
 * In Pāṇini's system, "aT" (अत्) refers to "a" and "eṅ" (एङ्) is a pratyāhāra (abbreviation)
 * that includes the vowels "e" (ए) and "o" (ओ).
 */

const gunaVowels = ['a', 'e', 'o'];

/**
 * Checks if a given vowel is a guṇa vowel.
 *
 * @param {string} vowel The vowel to check.
 * @returns {boolean} True if the vowel is a guṇa vowel, false otherwise.
 */
function isGuna(vowel) {
  return gunaVowels.includes(vowel);
}

/**
 * Gets the guṇa form of a vowel according to Pāṇini's system.
 * This is used in sandhi and other grammatical operations.
 *
 * @param {string} vowel The input vowel.
 * @returns {string|null} The guṇa form if applicable, null otherwise.
 */
function getGunaForm(vowel) {
  const gunaMapping = {
    'i': 'e',
    'ī': 'e',
    'u': 'o',
    'ū': 'o',
    'ṛ': 'ar',
    'ṝ': 'ar',
    'ḷ': 'al',
    'ḹ': 'al'
  };
  
  return gunaMapping[vowel] || null;
}

/**
 * Applies guṇa transformation to a vowel if it's in the ik category (i, u, ṛ, ḷ).
 *
 * @param {string} vowel The vowel to transform.
 * @returns {string} The transformed vowel or the original if no transformation applies.
 */
function applyGuna(vowel) {
  const gunaForm = getGunaForm(vowel);
  return gunaForm || vowel;
}

export {
  isGuna,
  gunaVowels,
  getGunaForm,
  applyGuna
};
