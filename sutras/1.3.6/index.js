// Sutra 1.3.6: षः प्रत्ययस्य
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Determines if a pratyaya (affix) has initial ष् that is an it-marker
 * according to Sutra 1.3.6.
 * 
 * This sutra specifies that when the consonant ष् appears at the beginning
 * of pratyayas (affixes) in grammatical instruction, it is considered an
 * it-marker and should be deleted.
 * 
 * @param {string} form - The affix or form to analyze
 * @param {object} [options] - Optional parameters
 * @param {boolean} [options.isPratyaya] - Whether this is explicitly a pratyaya
 * @param {string} [options.elementType] - Type of element ('pratyaya', 'affix', 'suffix', etc.)
 * @param {boolean} [options.isGrammaticalInstruction] - Whether in grammatical context
 * @returns {{
 *   hasItMarker: boolean,
 *   itConsonant: string|null,
 *   script: string,
 *   reason: string,
 *   processedForm: string|null,
 *   elementType: string|null
 * }}
 */
function hasInitialShaItMarker(form, options = {}) {
  // Input validation
  const validation = validateSanskritWord(form);
  if (!validation.isValid) {
    return {
      hasItMarker: false,
      itConsonant: null,
      script: null,
      reason: validation.errorType === 'EMPTY_INPUT' ? 'empty-input' : 'invalid-input',
      processedForm: null,
      elementType: null
    };
  }

  const script = detectScript(form);
  const trimmed = form.trim();

  // Define the initial ष् that is an it-marker
  const SHA_IT_MARKERS = {
    iast: 'ṣ',
    devanagari: 'ष'
  };

  const shaMarker = script === 'Devanagari' ? SHA_IT_MARKERS.devanagari : SHA_IT_MARKERS.iast;
  
  // Check if the form starts with ष्/ṣ
  let hasInitialSha = false;
  let processedForm = null;
  let actualItMarker = null;

  if (script === 'Devanagari') {
    // Handle Devanagari ष् (which might be ष followed by halanta ्)
    if (trimmed.startsWith('ष्')) {
      hasInitialSha = true;
      actualItMarker = 'ष';
      processedForm = trimmed.substring(2); // Remove ष्
    } else if (trimmed.startsWith('ष') && !trimmed.startsWith('षा') && !trimmed.startsWith('षि') && !trimmed.startsWith('षु') && !trimmed.startsWith('षे') && !trimmed.startsWith('षो')) {
      // Handle bare ष (without explicit halanta, but still consonantal)
      hasInitialSha = true;
      actualItMarker = 'ष';
      processedForm = trimmed.substring(1); // Remove ष
    }
  } else {
    // Handle IAST ṣ
    if (trimmed.startsWith(shaMarker)) {
      hasInitialSha = true;
      actualItMarker = shaMarker;
      processedForm = trimmed.substring(shaMarker.length);
    }
  }

  // Determine if this is a pratyaya context where it-markers should be recognized
  const isPratyayaContext = options.isPratyaya === true ||
                           options.isGrammaticalInstruction === true ||
                           ['pratyaya', 'affix', 'suffix'].includes(options.elementType);

  const hasItMarker = hasInitialSha && isPratyayaContext;

  return {
    hasItMarker,
    itConsonant: actualItMarker,
    script,
    reason: hasInitialSha ? 
      (isPratyayaContext ? 'initial-sha-it-marker' : 'not-pratyaya-context') :
      'no-initial-sha',
    processedForm: hasItMarker ? processedForm : null,
    elementType: options.elementType || null
  };
}

/**
 * Helper function to remove initial ष्/ṣ it-marker from a pratyaya
 * @param {string} form - The form to process
 * @param {object} options - Processing options
 * @returns {string} - The form with it-marker removed
 */
function removeInitialShaItMarker(form, options = {}) {
  const analysis = hasInitialShaItMarker(form, options);
  return analysis.processedForm || form;
}

/**
 * Helper function to check if ष्/ṣ is an it-marker in pratyaya context
 * @param {string} consonant - The consonant to check
 * @param {string} script - The script (IAST or Devanagari)
 * @returns {boolean} - Whether the consonant is the ष्/ṣ it-marker
 */
function isShaItMarker(consonant, script = 'IAST') {
  const SHA_IT_MARKERS = {
    iast: 'ṣ',
    devanagari: 'ष'
  };

  const expectedMarker = script === 'Devanagari' ? SHA_IT_MARKERS.devanagari : SHA_IT_MARKERS.iast;
  return consonant === expectedMarker;
}

export { hasInitialShaItMarker, removeInitialShaItMarker, isShaItMarker };
