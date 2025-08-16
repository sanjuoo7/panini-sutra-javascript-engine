// Sutra 1.3.4: न विभक्तौ तुस्माः
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isConsonant, getConsonantArticulation } from '../sanskrit-utils/classification.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Determines if a form with final dental/स्/म् consonants should NOT be treated as it-markers
 * in vibhakti (inflective) affixes according to Sutra 1.3.4.
 * 
 * This sutra creates an exception to Sutra 1.3.3 (हलन्त्यम्) by specifying that certain
 * final consonants are NOT it-markers when they appear in inflective endings.
 * 
 * @param {string} form - The word or form to analyze
 * @param {object} [options] - Optional parameters
 * @param {boolean} [options.isVibhakti] - Whether the form is known to be a vibhakti affix
 * @param {string} [options.affixType] - Type of affix ('vibhakti', 'pratyaya', etc.)
 * @returns {{
 *   isException: boolean,
 *   finalConsonant: string|null,
 *   script: string,
 *   reason: string,
 *   consonantType: string|null,
 *   exceptionApplies: boolean
 * }}
 */
function isVibhaktiException(form, options = {}) {
  // Input validation
  const validation = validateSanskritWord(form);
  if (!validation.isValid) {
    return {
      isException: false,
      finalConsonant: null,
      script: null,
      reason: validation.errorType === 'EMPTY_INPUT' ? 'empty-input' : 'invalid-input',
      consonantType: null,
      exceptionApplies: false
    };
  }

  const script = detectScript(form);
  const trimmed = form.trim();

  // Get the final character and handle halanta cases
  let finalChar = trimmed.slice(-1);
  let actualConsonant = finalChar;
  
  // Handle explicit halanta (्) in Devanagari
  if (finalChar === '्' && trimmed.length >= 2) {
    actualConsonant = trimmed.slice(-2, -1);
  }

  // Check if final character is a consonant
  if (!isConsonant(actualConsonant)) {
    return {
      isException: false,
      finalConsonant: actualConsonant,
      script,
      reason: 'not-consonant-ending',
      consonantType: null,
      exceptionApplies: false
    };
  }

  const consonantType = getConsonantArticulation(actualConsonant);

  // Define TUSMĀḤ consonants:
  // तु (tu) = dental consonants: त्, थ्, द्, ध्, न्
  // स् (s) = sibilant स्
  // म् (m) = labial म्
  
  const TUSMAAH_CONSONANTS = {
    iast: ['t', 'th', 'd', 'dh', 'n', 's', 'm'],
    devanagari: ['त', 'थ', 'द', 'ध', 'न', 'स', 'म']
  };

  const isTusmaaConsonant = TUSMAAH_CONSONANTS.iast.includes(actualConsonant) || 
                           TUSMAAH_CONSONANTS.devanagari.includes(actualConsonant);

  // Check if this is a vibhakti context
  // Priority: explicit options first, then pattern detection
  let isVibhaktiContext;
  
  if (options.affixType) {
    // If affixType is explicitly specified, respect it
    isVibhaktiContext = options.affixType === 'vibhakti';
  } else if (options.isVibhakti !== undefined) {
    // If isVibhakti is explicitly specified, respect it
    isVibhaktiContext = options.isVibhakti === true;
  } else {
    // Fall back to pattern detection
    isVibhaktiContext = isCommonVibhaktiEnding(trimmed, script);
  }

  // Apply Sutra 1.3.4: In vibhakti, TUSMĀḤ consonants are NOT it-markers
  if (isTusmaaConsonant && isVibhaktiContext) {
    return {
      isException: true,
      finalConsonant: actualConsonant,
      script,
      reason: 'vibhakti-tusmaa-exception',
      consonantType,
      exceptionApplies: true
    };
  }

  // If not TUSMĀḤ consonant or not vibhakti context, exception doesn't apply
  return {
    isException: false,
    finalConsonant: actualConsonant,
    script,
    reason: isTusmaaConsonant ? 'not-vibhakti-context' : 'not-tusmaa-consonant',
    consonantType,
    exceptionApplies: false
  };
}

/**
 * Helper function to detect common vibhakti endings
 * @param {string} form - The form to check
 * @param {string} script - The script of the form
 * @returns {boolean} - Whether it appears to be a vibhakti ending
 */
function isCommonVibhaktiEnding(form, script) {
  // Common vibhakti endings that end in TUSMĀḤ consonants
  // Be specific to avoid false positives with root words
  const vibhaktiPatterns = {
    iast: [
      'bhis', 'bhyas', 'su', 'os', 'ām', 'āni', 'ās', 'īs', 'ān', 'eṣu', 'iṣu',
      'ebhis', 'ebhyas', 'eṣu', 'ais', 'āt', 'āya', 'ena', 'asya', 'e', 'ā'
    ],
    devanagari: [
      'भिस्', 'भ्यस्', 'सु', 'ओस्', 'आम्', 'आनि', 'आस्', 'ईस्', 'आन्', 'एषु', 'इषु',
      'एभिस्', 'एभ्यस्', 'एषु', 'ऐस्', 'आत्', 'आय', 'एन', 'अस्य', 'ए', 'आ'
    ]
  };

  const patterns = script === 'Devanagari' ? vibhaktiPatterns.devanagari : vibhaktiPatterns.iast;
  
  // Only return true if the form ends with a clear vibhakti pattern
  // and is long enough to be a legitimate inflected form
  return patterns.some(pattern => form.endsWith(pattern)) && form.length > 3;
}

export { isVibhaktiException };
