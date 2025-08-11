import { 
  detectScript, 
  validateSanskritWord,
  areSavarna,
  getSavarnaGroup,
  getArticulationPlace,
  analyzePhoneticFeatures
} from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.69: अणुदित् सवर्णस्य चाप्रत्ययः
 * anudit savarṇasya cāpratyayaḥ
 * 
 * "When अण् and उदित् [letters] have the same place of articulation,
 * they are also [considered] non-suffixes."
 * 
 * This sutra extends the principle that letters with सवर्ण (homorganic) 
 * relationship to अण् and उदित् letters are also considered अप्रत्यय 
 * (non-suffixes) in certain grammatical contexts.
 */

// Traditional अण् letters (अ वर्ग - all vowels)
const AN_LETTERS = {
  devanagari: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ल्ऋ', 'ए', 'ऐ', 'ओ', 'औ'],
  iast: ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'e', 'ai', 'o', 'au']
};

// Traditional उदित् letters (letters marked with उ)
const UDIT_LETTERS = {
  devanagari: ['कु', 'खु', 'गु', 'घु', 'ङु', 'चु', 'छु', 'जु', 'झु', 'ञु', 
               'टु', 'ठु', 'डु', 'ढु', 'णु', 'तु', 'थु', 'दु', 'धु', 'नु',
               'पु', 'फु', 'बु', 'भु', 'मु', 'यु', 'रु', 'लु', 'वु', 'शु', 'षु', 'सु', 'हु'],
  iast: ['ku', 'khu', 'gu', 'ghu', 'ṅu', 'cu', 'chu', 'ju', 'jhu', 'ñu',
         'ṭu', 'ṭhu', 'ḍu', 'ḍhu', 'ṇu', 'tu', 'thu', 'du', 'dhu', 'nu',
         'pu', 'phu', 'bu', 'bhu', 'mu', 'yu', 'ru', 'lu', 'vu', 'śu', 'ṣu', 'su', 'hu']
};

/**
 * Checks if a letter is अण् (vowel class).
 * 
 * @param {string} letter - Letter to check
 * @returns {boolean} True if letter is अण्
 */
function isAnLetter(letter) {
  if (!letter || typeof letter !== 'string') {
    return false;
  }

  const script = detectScript(letter);
  const anLetters = script === 'Devanagari' ? AN_LETTERS.devanagari : AN_LETTERS.iast;
  
  return anLetters.includes(letter);
}

/**
 * Checks if a letter is उदित् (marked with उ).
 * 
 * @param {string} letter - Letter to check
 * @returns {boolean} True if letter is उदित्
 */
function isUditLetter(letter) {
  if (!letter || typeof letter !== 'string') {
    return false;
  }

  const script = detectScript(letter);
  const uditLetters = script === 'Devanagari' ? UDIT_LETTERS.devanagari : UDIT_LETTERS.iast;
  
  return uditLetters.includes(letter) || letter.endsWith('u');
}

/**
 * Implements Sutra 1.1.69: अणुदित् सवर्णस्य चाप्रत्ययः
 * Determines if a phoneme should be considered अप्रत्यय (non-suffix) 
 * based on सवर्ण relationship with अण् and उदित् letters.
 * 
 * @param {string} phoneme - The phoneme to analyze
 * @param {Object} [context={}] - Context for analysis
 * @returns {boolean} True if phoneme is अप्रत्यय according to this sutra
 */
function isApratyayaBySavarna(phoneme, context = {}) {
  if (!phoneme || typeof phoneme !== 'string') {
    return false;
  }

  const validation = validateSanskritWord(phoneme);
  if (!validation.isValid && !context.allowTechnicalTerms) {
    return false;
  }

  // Check if phoneme is सवर्ण with any अण् letter
  for (const anLetter of (detectScript(phoneme) === 'Devanagari' ? AN_LETTERS.devanagari : AN_LETTERS.iast)) {
    if (areSavarna(phoneme, anLetter)) {
      return true;
    }
  }

  // Check if phoneme is सवर्ण with any उदित् letter
  const uditLetters = detectScript(phoneme) === 'Devanagari' ? UDIT_LETTERS.devanagari : UDIT_LETTERS.iast;
  for (const uditLetter of uditLetters) {
    // Extract base letter from उदित् form (remove 'u' suffix)
    const baseLetter = uditLetter.endsWith('u') ? uditLetter.slice(0, -1) : uditLetter.replace('ु', '');
    if (areSavarna(phoneme, baseLetter)) {
      return true;
    }
  }

  return false;
}

/**
 * Analyzes the सवर्ण relationship of a phoneme with अण् and उदित् letters.
 * 
 * @param {string} phoneme - The phoneme to analyze
 * @param {Object} [context={}] - Context for analysis
 * @returns {Object} Analysis result with सवर्ण relationships
 */
function analyzeSavarnaRelationship(phoneme, context = {}) {
  const result = {
    phoneme,
    script: detectScript(phoneme),
    isApratyaya: false,
    savarnaWithAn: [],
    savarnaWithUdit: [],
    articulationPlace: '',
    reasoning: [],
    sutraReference: '1.1.69'
  };

  if (!phoneme || typeof phoneme !== 'string') {
    result.reasoning.push('Invalid input: phoneme must be a non-empty string');
    return result;
  }

  const validation = validateSanskritWord(phoneme);
  if (!validation.isValid && !context.allowTechnicalTerms) {
    result.reasoning.push('Invalid Sanskrit phoneme');
    return result;
  }

  const script = detectScript(phoneme);
  result.articulationPlace = getArticulationPlace(phoneme) || 'unknown';

  // Check सवर्ण relationships with अण् letters
  const anLetters = script === 'Devanagari' ? AN_LETTERS.devanagari : AN_LETTERS.iast;
  for (const anLetter of anLetters) {
    if (areSavarna(phoneme, anLetter)) {
      result.savarnaWithAn.push(anLetter);
    }
  }

  // Check सवर्ण relationships with उदित् letters
  const uditLetters = script === 'Devanagari' ? UDIT_LETTERS.devanagari : UDIT_LETTERS.iast;
  for (const uditLetter of uditLetters) {
    const baseLetter = uditLetter.endsWith('u') ? uditLetter.slice(0, -1) : uditLetter.replace('ु', '');
    if (areSavarna(phoneme, baseLetter)) {
      result.savarnaWithUdit.push(uditLetter);
    }
  }

  // Determine if अप्रत्यय
  result.isApratyaya = result.savarnaWithAn.length > 0 || result.savarnaWithUdit.length > 0;

  // Add reasoning
  if (result.savarnaWithAn.length > 0) {
    result.reasoning.push(`सवर्ण with अण् letters: ${result.savarnaWithAn.join(', ')}`);
  }
  if (result.savarnaWithUdit.length > 0) {
    result.reasoning.push(`सवर्ण with उदित् letters: ${result.savarnaWithUdit.join(', ')}`);
  }
  if (result.isApratyaya) {
    result.reasoning.push('Therefore considered अप्रत्यय by this sutra');
  } else {
    result.reasoning.push('No सवर्ण relationship found, not अप्रत्यय by this sutra');
  }

  return result;
}

/**
 * Gets the सवर्ण group containing the given phoneme.
 * Now uses the shared utility function.
 * 
 * @param {string} phoneme - The phoneme to analyze
 * @returns {Array|null} Array of सवर्ण phonemes, or null if not found
 */
function getSavarnaGroupForPhoneme(phoneme) {
  return getSavarnaGroup(phoneme);
}

/**
 * Provides examples demonstrating Sutra 1.1.69.
 * 
 * @param {string} script - 'Devanagari' or 'IAST'
 * @returns {Object} Comprehensive examples object
 */
function getSavarnaApratyayaExamples(script = 'Devanagari') {
  const anCases = script === 'Devanagari' ? [
    {
      phoneme: 'क',
      result: 'अप्रत्यय',
      reasoning: 'क is सवर्ण with अ (both guttural), so it is अप्रत्यय',
      analysis: 'क shares कण्ठ्य स्थान with अ'
    },
    {
      phoneme: 'च',
      result: 'अप्रत्यय',
      reasoning: 'च is सवर्ण with इ (both palatal), so it is अप्रत्यय',
      analysis: 'च shares तालव्य स्थान with इ'
    },
    {
      phoneme: 'प',
      result: 'अप्रत्यय',
      reasoning: 'प is सवर्ण with उ (both labial), so it is अप्रत्यय',
      analysis: 'प shares ओष्ठ्य स्थान with उ'
    }
  ] : [
    {
      phoneme: 'k',
      result: 'अप्रत्यय',
      reasoning: 'k is सवर्ण with a (both guttural), so it is अप्रत्यय',
      analysis: 'k shares guttural place with a'
    },
    {
      phoneme: 'c',
      result: 'अप्रत्यय',
      reasoning: 'c is सवर्ण with i (both palatal), so it is अप्रत्यय',
      analysis: 'c shares palatal place with i'
    },
    {
      phoneme: 'p',
      result: 'अप्रत्यय',
      reasoning: 'p is सवर्ण with u (both labial), so it is अप्रत्यय',
      analysis: 'p shares labial place with u'
    }
  ];

  const uditCases = script === 'Devanagari' ? [
    {
      phoneme: 'ख',
      result: 'अप्रत्यय',
      reasoning: 'ख is सवर्ण with कु (उदित्), so it is अप्रत्यय',
      analysis: 'ख shares कण्ठ्य स्थान with कु'
    },
    {
      phoneme: 'ज',
      result: 'अप्रत्यय',
      reasoning: 'ज is सवर्ण with चु (उदित्), so it is अप्रत्यय',
      analysis: 'ज shares तालव्य स्थान with चु'
    },
    {
      phoneme: 'भ',
      result: 'अप्रत्यय',
      reasoning: 'भ is सवर्ण with पु (उदित्), so it is अप्रत्यय',
      analysis: 'भ shares ओष्ठ्य स्थान with पु'
    }
  ] : [
    {
      phoneme: 'kh',
      result: 'अप्रत्यय',
      reasoning: 'kh is सवर्ण with ku (उदित्), so it is अप्रत्यय',
      analysis: 'kh shares guttural place with ku'
    },
    {
      phoneme: 'j',
      result: 'अप्रत्यय',
      reasoning: 'j is सवर्ण with cu (उदित्), so it is अप्रत्यय',
      analysis: 'j shares palatal place with cu'
    },
    {
      phoneme: 'bh',
      result: 'अप्रत्यय',
      reasoning: 'bh is सवर्ण with pu (उदित्), so it is अप्रत्यय',
      analysis: 'bh shares labial place with pu'
    }
  ];

  return {
    principle: 'अणुदित् सवर्णस्य चाप्रत्ययः - Letters homorganic with अण् and उदित् are also non-suffixes',
    anSavarnaExamples: {
      description: 'Examples of consonants सवर्ण with अण् (vowel) letters',
      cases: anCases
    },
    uditSavarnaExamples: {
      description: 'Examples of consonants सवर्ण with उदित् letters',
      cases: uditCases
    },
    traditionalNote: 'This sutra establishes that homorganic relationships extend the अप्रत्यय designation beyond just अण् and उदित् to their सवर्ण counterparts.'
  };
}

/**
 * Tests if a phoneme meets the conditions of Sutra 1.1.69.
 * 
 * @param {string} phoneme - The phoneme to test
 * @param {Object} [context={}] - Additional context
 * @returns {Object} Test result with detailed analysis
 */
function testSavarnaApratyayaRule(phoneme, context = {}) {
  const analysis = analyzeSavarnaRelationship(phoneme, context);
  
  return {
    phoneme,
    applies: analysis.isApratyaya,
    reason: analysis.reasoning.join('. '),
    savarnaWithAn: analysis.savarnaWithAn,
    savarnaWithUdit: analysis.savarnaWithUdit,
    articulationPlace: analysis.articulationPlace,
    phoneticFeatures: analyzePhoneticFeatures(phoneme),
    sutraReference: '1.1.69',
    technicalSummary: `${phoneme} ${analysis.isApratyaya ? 'is' : 'is not'} अप्रत्यय by सवर्ण relationship`
  };
}

export {
  isAnLetter,
  isUditLetter,
  isApratyayaBySavarna,
  analyzeSavarnaRelationship,
  getSavarnaGroupForPhoneme,
  getSavarnaApratyayaExamples,
  testSavarnaApratyayaRule,
  AN_LETTERS,
  UDIT_LETTERS
};

export default isApratyayaBySavarna;
