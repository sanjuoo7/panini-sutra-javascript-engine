/**
 * Sutra 1.1.27: सर्वादीनि सर्वनामानि (sarvādīni sarvanāmāni)
 * "The words सर्व 'all' and the rest are called सर्वनाम or pronouns."
 * 
 * This is a saṃjñā (definition) sutra that defines the technical term सर्वनाम
 * for pronouns and pronominal words.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.27
 */

import { detectScript } from '../shared/script-detection.js';

/**
 * List of सर्वादि (sarvādi) words that are classified as सर्वनाम
 */
const SARVADI_WORDS = {
  iast: [
    'sarva', 'viśva', 'ubha', 'ubhaya', 'ḍatara', 'ḍatama', 'anya', 'anyatara',
    'itara', 'tvat', 'tva', 'nema', 'sama', 'simā', 'pūrva', 'para', 'avara',
    'dakṣiṇa', 'uttara', 'apara', 'adhara', 'sva', 'antara', 'ekatera', 'ka',
    'kim', 'tad', 'tat', 'etad', 'etat', 'idam', 'adas', 'ena', 'yad', 'yat', 
    'bhavat', 'yuṣmad', 'asmad'
  ],
  devanagari: [
    'सर्व', 'विश्व', 'उभ', 'उभय', 'डतर', 'डतम', 'अन्य', 'अन्यतर',
    'इतर', 'त्वत्', 'त्व', 'नेम', 'सम', 'सिमा', 'पूर्व', 'पर', 'अवर',
    'दक्षिण', 'उत्तर', 'अपर', 'अधर', 'स्व', 'अन्तर', 'एकतर', 'क',
    'किम्', 'तद्', 'तत्', 'एतद्', 'एतत्', 'इदम्', 'अदस्', 'एन', 'यद्', 'यत्',
    'भवत्', 'युष्मद्', 'अस्मद्'
  ]
};

/**
 * Checks if a word is classified as सर्वनाम according to Sutra 1.1.27
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context (for exceptions in later sutras)
 * @returns {boolean} - True if the word is सर्वनाम
 */
/**
 * Checks if a word is derived from a सर्वादि base through inflection
 */
function isInflectedSarvadi(word) {
  // Common Sanskrit inflection patterns for pronouns
  const inflectionPatterns = [
    // tad -> tas-, ta-, te-
    { base: 'tad', patterns: [/^tas[yaāḥmiḥsu]/, /^ta[syaḥmi]/, /^te[ṣāṃṣu]/] },
    { base: 'tat', patterns: [/^tas[yaāḥmiḥsu]/, /^ta[syaḥmi]/, /^te[ṣāṃṣu]/] },
    // etad -> etas-, eta-, ete-
    { base: 'etad', patterns: [/^etas[yaāḥmiḥsu]/, /^eta[syaḥmi]/, /^ete[ṣāṃṣu]/] },
    { base: 'etat', patterns: [/^etas[yaāḥmiḥsu]/, /^eta[syaḥmi]/, /^ete[ṣāṃṣu]/] },
    // idam -> as-, im-, en-
    { base: 'idam', patterns: [/^as[yaāḥmiḥsu]/, /^im[eāṃāḥ]/, /^en[āḥaṃ]/] },
    // yad -> yas-, ya-, ye-
    { base: 'yad', patterns: [/^yas[yaāḥmiḥsu]/, /^ya[syaḥmi]/, /^ye[ṣāṃṣu]/] },
    { base: 'yat', patterns: [/^yas[yaāḥmiḥsu]/, /^ya[syaḥmi]/, /^ye[ṣāṃṣu]/] },
    // sarva -> sarvas-, sarva-
    { base: 'sarva', patterns: [/^sarvas[yaāḥmi]/, /^sarv[aāeāṃ]/] },
    // asmad -> asm-, ah-, mam-, mad-
    { base: 'asmad', patterns: [/^asm[aākam]/, /^ah[aṃam]/, /^mam[a]/, /^mad[īyaḥ]/] },
    // yuṣmad -> yuṣm-, yū-, tvam-, tav-
    { base: 'yuṣmad', patterns: [/^yuṣm[aākam]/, /^yū[yam]/, /^tvam[a]/, /^tav[a]/] }
  ];

  for (const {base, patterns} of inflectionPatterns) {
    for (const pattern of patterns) {
      if (pattern.test(word)) {
        return true;
      }
    }
  }
  
  return false;
}

export function isSarvanama(word, context = {}) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    
    // Check direct match first
    if (script === 'Devanagari') {
      if (SARVADI_WORDS.devanagari.includes(word)) {
        return true;
      }
      // Try stripping common case endings to get the base form
      const wordBase = word.replace(/[ःंस्य्न्त्ाेाि्]$/, '');
      return SARVADI_WORDS.devanagari.includes(wordBase) ||
             SARVADI_WORDS.devanagari.some(base => word.startsWith(base));
    } else {
      if (SARVADI_WORDS.iast.includes(word)) {
        return true;
      }
      // Check if it starts with any sarvadi word (for simple cases)
      const startsWithSarvadi = SARVADI_WORDS.iast.some(base => word.startsWith(base));
      if (startsWithSarvadi) {
        return true;
      }
      // Check for complex inflected forms
      if (isInflectedSarvadi(word)) {
        return true;
      }
      // Try stripping common case endings (but not 'm' from words like kim, idam)
      const wordBase = word.replace(/[ḥṃsynt]$/, '');
      return SARVADI_WORDS.iast.includes(wordBase);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Gets all सर्वादि words
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of सर्वादि words
 */
export function getSarvadiWords(script = 'IAST') {
  if (script === 'Devanagari') {
    return [...SARVADI_WORDS.devanagari];
  } else {
    return [...SARVADI_WORDS.iast];
  }
}

/**
 * Checks if सर्वनाम rules should apply to a word
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if सर्वनाम rules apply
 */
export function hasSarvanamaBehavior(word, context = {}) {
  // Basic सर्वनाम check
  if (isSarvanama(word, context)) {
    // Later sutras (1.1.28-1.1.31) may modify this behavior
    // For now, return true for basic classification
    return true;
  }
  
  return false;
}
