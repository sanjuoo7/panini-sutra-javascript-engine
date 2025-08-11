import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

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

// Phonetic categories and their सवर्ण relationships
const SAVARNA_GROUPS = {
  // Gutturals (कण्ठ्य)
  'क': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'ख': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'ग': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'घ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'ङ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'अ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  'आ': ['क', 'ख', 'ग', 'घ', 'ङ', 'अ', 'आ'],
  
  // Palatals (तालव्य)
  'च': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'छ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ज': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'झ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ञ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'इ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ई': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ए': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  'ऐ': ['च', 'छ', 'ज', 'झ', 'ञ', 'इ', 'ई', 'ए', 'ऐ'],
  
  // Retroflexes (मूर्धन्य)
  'ट': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ठ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ड': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ढ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ण': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ऋ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  'ॠ': ['ट', 'ठ', 'ड', 'ढ', 'ण', 'ऋ', 'ॠ'],
  
  // Dentals (दन्त्य)
  'त': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'थ': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'द': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'ध': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'न': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'ल': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  'स': ['त', 'थ', 'द', 'ध', 'न', 'ल', 'स'],
  
  // Labials (ओष्ठ्य)
  'प': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'फ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'ब': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'भ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'म': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'उ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'ऊ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'ओ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  'औ': ['प', 'फ', 'ब', 'भ', 'म', 'उ', 'ऊ', 'ओ', 'औ'],
  
  // Semivowels (अन्तःस्थ)
  'य': ['य', 'इ', 'ई', 'ए', 'ऐ'],  // Related to palatals
  'र': ['र', 'ऋ', 'ॠ'],              // Related to retroflexes  
  'व': ['व', 'उ', 'ऊ', 'ओ', 'औ'],  // Related to labials
  
  // Sibilants (ऊष्म)
  'श': ['श', 'इ', 'ई', 'ए', 'ऐ'],   // Palatal sibilant
  'ष': ['ष', 'ऋ', 'ॠ'],              // Retroflex sibilant
  'ह': ['ह', 'अ', 'आ']               // Glottal fricative
};

// IAST equivalents for सवर्ण groups
const IAST_SAVARNA_GROUPS = {
  'k': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'kh': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'g': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'gh': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'ṅ': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'a': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  'ā': ['k', 'kh', 'g', 'gh', 'ṅ', 'a', 'ā'],
  
  'c': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ch': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'j': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'jh': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ñ': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'i': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ī': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'e': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  'ai': ['c', 'ch', 'j', 'jh', 'ñ', 'i', 'ī', 'e', 'ai'],
  
  'ṭ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṭh': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ḍ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ḍh': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṇ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṛ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  'ṝ': ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 'ṛ', 'ṝ'],
  
  't': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'th': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'd': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'dh': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'n': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  'l': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  's': ['t', 'th', 'd', 'dh', 'n', 'l', 's'],
  
  'p': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'ph': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'b': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'bh': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'm': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'u': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'ū': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'o': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  'au': ['p', 'ph', 'b', 'bh', 'm', 'u', 'ū', 'o', 'au'],
  
  'y': ['y', 'i', 'ī', 'e', 'ai'],
  'r': ['r', 'ṛ', 'ṝ'],
  'v': ['v', 'u', 'ū', 'o', 'au'],
  
  'ś': ['ś', 'i', 'ī', 'e', 'ai'],
  'ṣ': ['ṣ', 'ṛ', 'ṝ'],
  'h': ['h', 'a', 'ā']
};

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
 * Determines if two phonemes are सवर्ण (homorganic - same place of articulation).
 * 
 * @param {string} phoneme1 - First phoneme
 * @param {string} phoneme2 - Second phoneme
 * @returns {boolean} True if phonemes are सवर्ण
 */
function areSavarna(phoneme1, phoneme2) {
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string') {
    return false;
  }

  const script = detectScript(phoneme1);
  const groups = script === 'Devanagari' ? SAVARNA_GROUPS : IAST_SAVARNA_GROUPS;
  
  // Check if phoneme1 has a सवर्ण group and if phoneme2 is in that group
  if (groups[phoneme1]) {
    return groups[phoneme1].includes(phoneme2);
  }
  
  // Check if phoneme2 has a सवर्ण group and if phoneme1 is in that group
  if (groups[phoneme2]) {
    return groups[phoneme2].includes(phoneme1);
  }
  
  return false;
}

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
    result.reasoning.push(`Invalid Sanskrit phoneme: ${validation.message}`);
    return result;
  }

  const script = result.script;
  const anLetters = script === 'Devanagari' ? AN_LETTERS.devanagari : AN_LETTERS.iast;
  const uditLetters = script === 'Devanagari' ? UDIT_LETTERS.devanagari : UDIT_LETTERS.iast;

  // Find सवर्ण relationships with अण् letters
  for (const anLetter of anLetters) {
    if (areSavarna(phoneme, anLetter)) {
      result.savarnaWithAn.push(anLetter);
    }
  }

  // Find सवर्ण relationships with उदित् letters
  for (const uditLetter of uditLetters) {
    const baseLetter = uditLetter.endsWith('u') ? uditLetter.slice(0, -1) : uditLetter.replace('ु', '');
    if (areSavarna(phoneme, baseLetter)) {
      result.savarnaWithUdit.push(uditLetter);
    }
  }

  // Determine if अप्रत्यय
  result.isApratyaya = result.savarnaWithAn.length > 0 || result.savarnaWithUdit.length > 0;

  // Determine articulation place
  const groups = script === 'Devanagari' ? SAVARNA_GROUPS : IAST_SAVARNA_GROUPS;
  if (groups[phoneme]) {
    // Determine place based on group characteristics
    if (groups[phoneme].includes(script === 'Devanagari' ? 'अ' : 'a')) {
      result.articulationPlace = 'कण्ठ्य (guttural)';
    } else if (groups[phoneme].includes(script === 'Devanagari' ? 'इ' : 'i')) {
      result.articulationPlace = 'तालव्य (palatal)';
    } else if (groups[phoneme].includes(script === 'Devanagari' ? 'ऋ' : 'ṛ')) {
      result.articulationPlace = 'मूर्धन्य (retroflex)';
    } else if (groups[phoneme].includes(script === 'Devanagari' ? 'त' : 't')) {
      result.articulationPlace = 'दन्त्य (dental)';
    } else if (groups[phoneme].includes(script === 'Devanagari' ? 'उ' : 'u')) {
      result.articulationPlace = 'ओष्ठ्य (labial)';
    }
  }

  // Add reasoning
  if (result.savarnaWithAn.length > 0) {
    result.reasoning.push(`सवर्ण with अण् letters: ${result.savarnaWithAn.join(', ')}`);
    result.reasoning.push('Therefore considered अप्रत्यय by Sutra 1.1.69');
  }
  
  if (result.savarnaWithUdit.length > 0) {
    result.reasoning.push(`सवर्ण with उदित् letters: ${result.savarnaWithUdit.join(', ')}`);
    result.reasoning.push('Therefore considered अप्रत्यय by Sutra 1.1.69');
  }
  
  if (!result.isApratyaya) {
    result.reasoning.push('No सवर्ण relationship found with अण् or उदित् letters');
    result.reasoning.push('Therefore not अप्रत्यय by this sutra');
  }

  return result;
}

/**
 * Gets the complete सवर्ण group for a given phoneme.
 * 
 * @param {string} phoneme - The phoneme to analyze
 * @returns {string[]} Array of सवर्ण phonemes
 */
function getSavarnaGroup(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return [];
  }

  const script = detectScript(phoneme);
  const groups = script === 'Devanagari' ? SAVARNA_GROUPS : IAST_SAVARNA_GROUPS;
  
  return groups[phoneme] || [];
}

/**
 * Provides traditional examples demonstrating Sutra 1.1.69.
 * 
 * @returns {Object} Examples of सवर्ण अप्रत्यय application
 */
function getSavarnaApratyayaExamples() {
  return {
    principle: 'अणुदित् सवर्णस्य चाप्रत्ययः - Letters सवर्ण with अण् and उदित् are also अप्रत्यय',
    
    anSavarnaExamples: {
      description: 'Examples of letters सवर्ण with अण् (vowels)',
      cases: [
        {
          phoneme: 'क',
          savarnaWith: 'अ',
          reasoning: 'क is सवर्ण with अ (both guttural)',
          result: 'अप्रत्यय'
        },
        {
          phoneme: 'च',
          savarnaWith: 'इ',
          reasoning: 'च is सवर्ण with इ (both palatal)',
          result: 'अप्रत्यय'
        },
        {
          phoneme: 'प',
          savarnaWith: 'उ',
          reasoning: 'प is सवर्ण with उ (both labial)',
          result: 'अप्रत्यय'
        }
      ]
    },
    
    uditSavarnaExamples: {
      description: 'Examples of letters सवर्ण with उदित्',
      cases: [
        {
          phoneme: 'ख',
          savarnaWith: 'कु',
          reasoning: 'ख is सवर्ण with क (from कु)',
          result: 'अप्रत्यय'
        },
        {
          phoneme: 'ज',
          savarnaWith: 'चु',
          reasoning: 'ज is सवर्ण with च (from चु)',
          result: 'अप्रत्यय'
        },
        {
          phoneme: 'भ',
          savarnaWith: 'पु',
          reasoning: 'भ is सवर्ण with प (from पु)',
          result: 'अप्रत्यय'
        }
      ]
    },
    
    traditionalNote: 'This sutra extends the अप्रत्यय designation to homorganic letters, ' +
                    'ensuring comprehensive coverage of phonetically related sounds in grammatical analysis.'
  };
}

export {
  areSavarna,
  isAnLetter,
  isUditLetter,
  isApratyayaBySavarna,
  analyzeSavarnaRelationship,
  getSavarnaGroup,
  getSavarnaApratyayaExamples
};
