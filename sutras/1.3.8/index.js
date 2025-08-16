// Sutra 1.3.8: लशक्वतद्धिते
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Determines if a non-taddhita affix has initial ल्, श्, or guttural consonants that are it-markers
 * according to Sutra 1.3.8.
 * 
 * This sutra specifies that initial ल् (l), श् (ś), and guttural consonants 
 * (क्, ख्, ग्, घ्, ङ्) in affixes (except taddhita) are considered it-markers.
 * 
 * @param {string} form - The affix or form to analyze
 * @param {object} [options] - Optional parameters
 * @param {boolean} [options.isPratyaya] - Whether this is explicitly a pratyaya
 * @param {string} [options.elementType] - Type of element ('pratyaya', 'affix', 'suffix', etc.)
 * @param {boolean} [options.isTaddhita] - Whether this is a taddhita affix (exception)
 * @param {boolean} [options.isGrammaticalInstruction] - Whether in grammatical context
 * @returns {{
 *   hasItMarker: boolean,
 *   itConsonant: string|null,
 *   consonantClass: string|null,
 *   script: string,
 *   reason: string,
 *   processedForm: string|null,
 *   elementType: string|null,
 *   isTaddhita: boolean
 * }}
 */
function hasInitialLaShakuItMarker(form, options = {}) {
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
      elementType: null,
      isTaddhita: options.isTaddhita || false
    };
  }

  const script = detectScript(form);
  const trimmed = form.trim();

  // Define ल्, श्, and guttural consonants that are it-markers
  const LA_SHAKU_CONSONANTS = {
    iast: {
      la: 'l',
      sha: 'ś',
      gutturals: ['k', 'kh', 'g', 'gh', 'ṅ']
    },
    devanagari: {
      la: 'ल',
      sha: 'श',
      gutturals: ['क', 'ख', 'ग', 'घ', 'ङ']
    }
  };

  const consonants = script === 'Devanagari' ? LA_SHAKU_CONSONANTS.devanagari : LA_SHAKU_CONSONANTS.iast;
  const allItConsonants = [consonants.la, consonants.sha, ...consonants.gutturals];
  
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
        consonantClass = getConsonantClass(consonant, consonants);
        break;
      } else if (trimmed.startsWith(consonant) && !isVowelCombination(trimmed, consonant)) {
        hasInitialItConsonant = true;
        actualItMarker = consonant;
        processedForm = trimmed.substring(1); // Remove consonant
        consonantClass = getConsonantClass(consonant, consonants);
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
        consonantClass = getConsonantClass(consonant, consonants);
        break;
      }
    }
  }

  // Determine if this is a non-taddhita pratyaya context
  const isPratyayaContext = options.isPratyaya === true ||
                           options.isGrammaticalInstruction === true ||
                           ['pratyaya', 'affix', 'suffix'].includes(options.elementType);

  const isTaddhita = options.isTaddhita === true;
  
  // Apply sutra: it-markers apply in non-taddhita pratyaya context
  const hasItMarker = hasInitialItConsonant && isPratyayaContext && !isTaddhita;

  let reason;
  if (!hasInitialItConsonant) {
    reason = 'no-initial-la-shaku';
  } else if (!isPratyayaContext) {
    reason = 'not-pratyaya-context';
  } else if (isTaddhita) {
    reason = 'taddhita-exception';
  } else {
    reason = 'initial-la-shaku-it-marker';
  }

  return {
    hasItMarker,
    itConsonant: actualItMarker,
    consonantClass,
    script,
    reason,
    processedForm: hasItMarker ? processedForm : null,
    elementType: options.elementType || null,
    isTaddhita
  };
}

/**
 * Helper function to determine consonant class
 */
function getConsonantClass(consonant, consonants) {
  if (consonant === consonants.la) return 'la';
  if (consonant === consonants.sha) return 'sha';
  if (consonants.gutturals.includes(consonant)) return 'guttural';
  return null;
}

/**
 * Helper function to check if a consonant is followed by a vowel (not halanta)
 */
function isVowelCombination(text, consonant) {
  const vowelMarks = ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ'];
  const afterConsonant = text.substring(consonant.length, consonant.length + 1);
  return vowelMarks.includes(afterConsonant);
}

/**
 * Helper function to remove initial ल्/श्/guttural it-markers from a non-taddhita pratyaya
 */
function removeInitialLaShakuItMarker(form, options = {}) {
  const analysis = hasInitialLaShakuItMarker(form, options);
  return analysis.processedForm || form;
}

/**
 * Helper function to check if a consonant is a ल्/श्/guttural it-marker
 */
function isLaShakuItMarker(consonant, script = 'IAST') {
  const LA_SHAKU_CONSONANTS = {
    iast: {
      la: 'l',
      sha: 'ś',
      gutturals: ['k', 'kh', 'g', 'gh', 'ṅ']
    },
    devanagari: {
      la: 'ल',
      sha: 'श',
      gutturals: ['क', 'ख', 'ग', 'घ', 'ङ']
    }
  };

  const consonants = script === 'Devanagari' ? LA_SHAKU_CONSONANTS.devanagari : LA_SHAKU_CONSONANTS.iast;
  
  if (consonant === consonants.la) return { isItMarker: true, class: 'la' };
  if (consonant === consonants.sha) return { isItMarker: true, class: 'sha' };
  if (consonants.gutturals.includes(consonant)) return { isItMarker: true, class: 'guttural' };
  return { isItMarker: false, class: null };
}

export { hasInitialLaShakuItMarker, removeInitialLaShakuItMarker, isLaShakuItMarker };
