// Sutra 1.3.7: चुटू
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Determines if a pratyaya (affix) has initial palatal/lingual consonants that are it-markers
 * according to Sutra 1.3.7.
 * 
 * This sutra specifies that initial palatal (च्, छ्, ज्, झ्, ञ्) and lingual/retroflex 
 * (ट्, ठ्, ड्, ढ्, ण्) consonants in pratyayas are considered it-markers.
 * 
 * @param {string} form - The affix or form to analyze
 * @param {object} [options] - Optional parameters
 * @param {boolean} [options.isPratyaya] - Whether this is explicitly a pratyaya
 * @param {string} [options.elementType] - Type of element ('pratyaya', 'affix', 'suffix', etc.)
 * @param {boolean} [options.isGrammaticalInstruction] - Whether in grammatical context
 * @returns {{
 *   hasItMarker: boolean,
 *   itConsonant: string|null,
 *   consonantClass: string|null,
 *   script: string,
 *   reason: string,
 *   processedForm: string|null,
 *   elementType: string|null
 * }}
 */
function hasInitialPalatalLingualItMarker(form, options = {}) {
  // Input validation
  const validation = validateSanskritWord(form);
  if (!validation.isValid) {
    return {
      hasItMarker: false,
      itConsonant: null,
      consonantClass: null,
      script: null,
      reason: validation.errorType === 'EMPTY_INPUT' ? 'empty-input' : 'invalid-input',
      processedForm: null,
      elementType: null
    };
  }

  const script = detectScript(form);
  const trimmed = form.trim();

  // Define palatal and lingual/retroflex consonants that are it-markers
  const CU_TU_CONSONANTS = {
    iast: {
      palatals: ['c', 'ch', 'j', 'jh', 'ñ'],
      linguals: ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ']
    },
    devanagari: {
      palatals: ['च', 'छ', 'ज', 'झ', 'ञ'],
      linguals: ['ट', 'ठ', 'ड', 'ढ', 'ण']
    }
  };

  const consonants = script === 'Devanagari' ? CU_TU_CONSONANTS.devanagari : CU_TU_CONSONANTS.iast;
  const allItConsonants = [...consonants.palatals, ...consonants.linguals];
  
  // Check if the form starts with any of the it-marker consonants
  let hasInitialItConsonant = false;
  let processedForm = null;
  let actualItMarker = null;
  let consonantClass = null;

  if (script === 'Devanagari') {
    // Handle Devanagari consonants (with potential halanta)
    for (const consonant of allItConsonants) {
      if (trimmed.startsWith(consonant + '्')) {
        hasInitialItConsonant = true;
        actualItMarker = consonant;
        processedForm = trimmed.substring(2); // Remove consonant + halanta
        consonantClass = consonants.palatals.includes(consonant) ? 'palatal' : 'lingual';
        break;
      } else if (trimmed.startsWith(consonant) && !isVowelCombination(trimmed, consonant)) {
        hasInitialItConsonant = true;
        actualItMarker = consonant;
        processedForm = trimmed.substring(1); // Remove consonant
        consonantClass = consonants.palatals.includes(consonant) ? 'palatal' : 'lingual';
        break;
      }
    }
  } else {
    // Handle IAST consonants
    for (const consonant of allItConsonants) {
      if (trimmed.startsWith(consonant)) {
        hasInitialItConsonant = true;
        actualItMarker = consonant;
        processedForm = trimmed.substring(consonant.length);
        consonantClass = consonants.palatals.includes(consonant) ? 'palatal' : 'lingual';
        break;
      }
    }
  }

  // Determine if this is a pratyaya context where it-markers should be recognized
  const isPratyayaContext = options.isPratyaya === true ||
                           options.isGrammaticalInstruction === true ||
                           ['pratyaya', 'affix', 'suffix'].includes(options.elementType);

  const hasItMarker = hasInitialItConsonant && isPratyayaContext;

  return {
    hasItMarker,
    itConsonant: actualItMarker,
    consonantClass,
    script,
    reason: hasInitialItConsonant ? 
      (isPratyayaContext ? 'initial-palatal-lingual-it-marker' : 'not-pratyaya-context') :
      'no-initial-palatal-lingual',
    processedForm: hasItMarker ? processedForm : null,
    elementType: options.elementType || null
  };
}

/**
 * Helper function to check if a consonant is followed by a vowel (not halanta)
 * @param {string} text - The text to check
 * @param {string} consonant - The consonant to check
 * @returns {boolean} - Whether it's followed by a vowel
 */
function isVowelCombination(text, consonant) {
  const vowelMarks = ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ'];
  const afterConsonant = text.substring(consonant.length, consonant.length + 1);
  return vowelMarks.includes(afterConsonant);
}

/**
 * Helper function to remove initial palatal/lingual it-markers from a pratyaya
 * @param {string} form - The form to process
 * @param {object} options - Processing options
 * @returns {string} - The form with it-marker removed
 */
function removeInitialPalatalLingualItMarker(form, options = {}) {
  const analysis = hasInitialPalatalLingualItMarker(form, options);
  return analysis.processedForm || form;
}

/**
 * Helper function to check if a consonant is a palatal/lingual it-marker
 * @param {string} consonant - The consonant to check
 * @param {string} script - The script (IAST or Devanagari)
 * @returns {Object} - Analysis of consonant type
 */
function isPalatalLingualItMarker(consonant, script = 'IAST') {
  const CU_TU_CONSONANTS = {
    iast: {
      palatals: ['c', 'ch', 'j', 'jh', 'ñ'],
      linguals: ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ']
    },
    devanagari: {
      palatals: ['च', 'छ', 'ज', 'झ', 'ञ'],
      linguals: ['ट', 'ठ', 'ड', 'ढ', 'ण']
    }
  };

  const consonants = script === 'Devanagari' ? CU_TU_CONSONANTS.devanagari : CU_TU_CONSONANTS.iast;
  
  if (consonants.palatals.includes(consonant)) {
    return { isItMarker: true, class: 'palatal' };
  } else if (consonants.linguals.includes(consonant)) {
    return { isItMarker: true, class: 'lingual' };
  } else {
    return { isItMarker: false, class: null };
  }
}

export { hasInitialPalatalLingualItMarker, removeInitialPalatalLingualItMarker, isPalatalLingualItMarker };
