/**
 * Sutra 1.1.7: हलन्त्यम् (halantyam)
 *
 * This sutra establishes that consonants (हल्) are called "अन्त्य" (antya) when they occur at the end.
 * In Pāṇini's system, "हल्" refers to all consonants, and "अन्त्यम्" means "final" or "ending".
 * 
 * This sutra is fundamental for understanding:
 * - Final consonant behavior in Sanskrit words
 * - Sandhi rules that apply to word-final consonants
 * - Morphological processes involving consonant endings
 * - Phonological changes at word boundaries
 * 
 * The sutra helps classify consonants based on their position and determines
 * how they behave in various grammatical operations.
 */

// All Sanskrit consonants (हल्) in IAST
const consonants = [
  // Stops (स्पर्श)
  'k', 'kh', 'g', 'gh', 'ṅ',      // Velars (कण्ठ्य)
  'c', 'ch', 'j', 'jh', 'ñ',      // Palatals (तालव्य)
  'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ',     // Retroflexes (मूर्धन्य)
  't', 'th', 'd', 'dh', 'n',      // Dentals (दन्त्य)
  'p', 'ph', 'b', 'bh', 'm',      // Labials (ओष्ठ्य)
  // Semivowels (अन्तःस्थ)
  'y', 'r', 'l', 'v',
  // Sibilants (ऊष्म)
  'ś', 'ṣ', 's', 'h',
  // Special characters
  'ḥ', 'ṃ', '्'                  // Visarga, anusvara, halanta
];

// Sanskrit consonants in Devanagari
const consonantsDevanagari = [
  // Stops
  'क', 'ख', 'ग', 'घ', 'ङ',
  'च', 'छ', 'ज', 'झ', 'ञ',
  'ट', 'ठ', 'ड', 'ढ', 'ण',
  'त', 'थ', 'द', 'ध', 'न',
  'प', 'फ', 'ब', 'भ', 'म',
  // Semivowels
  'य', 'र', 'ल', 'व',
  // Sibilants
  'श', 'ष', 'स', 'ह',
  // Special characters
  'ः', 'ं', '्'                   // Visarga, anusvara, halanta
];

/**
 * Checks if a given character is a consonant (हल्).
 *
 * @param {string} char The character to check.
 * @returns {boolean} True if the character is a consonant.
 */
function isConsonant(char) {
  if (!char) return false;
  return consonants.includes(char) || consonantsDevanagari.includes(char);
}

/**
 * Determines if a word ends with a consonant sound.
 *
 * @param {string} word The word to analyze.
 * @returns {boolean} True if the word ends with a consonant sound.
 */
function endsWithConsonant(word) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  const lastChar = word.slice(-1);
  
  // Check for explicit halanta (्) at the end
  if (lastChar === '्') {
    return true;
  }
  
  // Special consonant endings that are always consonant-final
  const specialConsonantEndings = ['ः', 'ं', 'ḥ', 'ṃ']; // visarga, anusvara
  if (specialConsonantEndings.includes(lastChar)) {
    return true;
  }
  
  // For IAST, directly check if it's a consonant
  if (consonants.includes(lastChar)) {
    return true;
  }
  
  // Critical Fix: For Devanagari, consonant letters have inherent 'a' vowel
  // They are only truly consonant-ending if:
  // 1. They have explicit halanta (्) - already checked above
  // 2. They are special consonants (visarga/anusvara) - already checked above
  // 3. The word ends with halanta + consonant (like वाक्)
  
  // Check if word ends with halanta + consonant pattern
  if (word.length >= 2 && word.slice(-1) !== '्') {
    const lastChar = word.slice(-1);
    const secondLastChar = word.slice(-2, -1);
    
    // If second-to-last is halanta and last is consonant, it's consonant-ending
    if (secondLastChar === '्' && consonantsDevanagari.includes(lastChar)) {
      return true;
    }
  }
  
  // All other Devanagari consonants carry inherent 'a' vowel, so they're vowel-ending
  // Examples: राम (rāma), गुरु (guru), देव (deva) - all vowel-ending
  return false;
}

/**
 * Gets the final consonant of a word if it exists.
 *
 * @param {string} word The word to analyze.
 * @returns {Object} Analysis of the final consonant.
 */
function getFinalConsonant(word) {
  if (!word || typeof word !== 'string') {
    return {
      isValid: false,
      word: null,
      finalChar: null,
      isConsonant: false,
      consonantType: null,
      error: 'Invalid word input'
    };
  }

  let finalChar = word.slice(-1);
  let actualConsonant = finalChar;
  
  // Handle halanta case
  if (finalChar === '्' && word.length >= 2) {
    actualConsonant = word.slice(-2, -1);
    finalChar = actualConsonant + '्';
  }
  
  // Use the same logic as endsWithConsonant to determine if it's consonant-ending
  const isConsonantFinal = endsWithConsonant(word);

  if (!isConsonantFinal) {
    return {
      isValid: true,
      word: word,
      finalChar: finalChar,
      isConsonant: false,
      consonantType: null,
      explanation: `Word "${word}" does not end with a consonant (may have inherent vowel)`
    };
  }

  // Determine consonant type - use the actual consonant character
  let consonantType = 'unknown';
  const consonantIndex = consonants.indexOf(actualConsonant);
  const devanagariIndex = consonantsDevanagari.indexOf(actualConsonant);

  if (consonantIndex !== -1) {
    if (consonantIndex >= 0 && consonantIndex <= 4) consonantType = 'velar (कण्ठ्य)';
    else if (consonantIndex >= 5 && consonantIndex <= 9) consonantType = 'palatal (तालव्य)';
    else if (consonantIndex >= 10 && consonantIndex <= 14) consonantType = 'retroflex (मूर्धन्य)';
    else if (consonantIndex >= 15 && consonantIndex <= 19) consonantType = 'dental (दन्त्य)';
    else if (consonantIndex >= 20 && consonantIndex <= 24) consonantType = 'labial (ओष्ठ्य)';
    else if (consonantIndex >= 25 && consonantIndex <= 28) consonantType = 'semivowel (अन्तःस्थ)';
    else if (consonantIndex >= 29 && consonantIndex <= 32) consonantType = 'sibilant (ऊष्म)';
    else if (consonantIndex >= 33) consonantType = 'special';
  } else if (devanagariIndex !== -1) {
    if (devanagariIndex >= 0 && devanagariIndex <= 4) consonantType = 'velar (कण्ठ्य)';
    else if (devanagariIndex >= 5 && devanagariIndex <= 9) consonantType = 'palatal (तालव्य)';
    else if (devanagariIndex >= 10 && devanagariIndex <= 14) consonantType = 'retroflex (मूर्धन्य)';
    else if (devanagariIndex >= 15 && devanagariIndex <= 19) consonantType = 'dental (दन्त्य)';
    else if (devanagariIndex >= 20 && devanagariIndex <= 24) consonantType = 'labial (ओष्ठ्य)';
    else if (devanagariIndex >= 25 && devanagariIndex <= 28) consonantType = 'semivowel (अन्तःस्थ)';
    else if (devanagariIndex >= 29 && devanagariIndex <= 32) consonantType = 'sibilant (ऊष्म)';
    else if (devanagariIndex >= 33) consonantType = 'special';
  }

  return {
    isValid: true,
    word: word,
    finalChar: actualConsonant,
    isConsonant: true,
    consonantType: consonantType,
    explanation: `Word "${word}" ends with consonant "${actualConsonant}" (${consonantType})`
  };
}

/**
 * Analyzes multiple words for consonant endings.
 *
 * @param {Array} words Array of words to analyze.
 * @returns {Object} Comprehensive analysis of consonant endings.
 */
function analyzeConsonantEndings(words) {
  if (!words || !Array.isArray(words)) {
    return {
      isValid: false,
      error: 'Invalid words array',
      analysis: null
    };
  }

  const analysis = words.map(word => getFinalConsonant(word));
  const consonantEndings = analysis.filter(a => a.isConsonant);
  const vowelEndings = analysis.filter(a => a.isValid && !a.isConsonant);

  const consonantTypes = consonantEndings.reduce((acc, item) => {
    const type = item.consonantType;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return {
    isValid: true,
    error: null,
    totalWords: words.length,
    consonantEndings: consonantEndings.length,
    vowelEndings: vowelEndings.length,
    consonantPercentage: ((consonantEndings.length / words.length) * 100).toFixed(1),
    consonantTypes: consonantTypes,
    analysis: analysis,
    summary: `${consonantEndings.length} of ${words.length} words end with consonants (${((consonantEndings.length / words.length) * 100).toFixed(1)}%)`
  };
}

/**
 * Determines sandhi behavior for consonant-ending words.
 *
 * @param {string} word The word ending with a consonant.
 * @param {string} nextWord The following word (optional).
 * @returns {Object} Sandhi analysis for consonant endings.
 */
function analyzeConsonantSandhi(word, nextWord = null) {
  const finalAnalysis = getFinalConsonant(word);
  
  if (!finalAnalysis.isConsonant) {
    return {
      isValid: false,
      error: 'Word does not end with consonant',
      sandhiRules: []
    };
  }

  const finalConsonant = finalAnalysis.finalChar;
  let sandhiRules = [];

  // Basic sandhi rules for consonant endings
  if (['क', 'ग', 'ङ', 'k', 'g', 'ṅ'].includes(finalConsonant)) {
    sandhiRules.push('Velar consonant sandhi applies');
  }
  if (['त', 'द', 'न', 't', 'd', 'n'].includes(finalConsonant)) {
    sandhiRules.push('Dental consonant sandhi applies');
  }
  if (['प', 'ब', 'म', 'p', 'b', 'm'].includes(finalConsonant)) {
    sandhiRules.push('Labial consonant sandhi applies');
  }
  if (['स', 'ह', 's', 'h'].includes(finalConsonant)) {
    sandhiRules.push('Sibilant/aspirate sandhi applies');
  }

  return {
    isValid: true,
    error: null,
    word: word,
    finalConsonant: finalConsonant,
    consonantType: finalAnalysis.consonantType,
    nextWord: nextWord,
    sandhiRules: sandhiRules,
    applicableSutras: ['हलन्त्यम् (1.1.7)', 'Various sandhi sutras'],
    explanation: `Consonant "${finalConsonant}" at end of "${word}" triggers specific sandhi rules`
  };
}

/**
 * Applies Sutra 1.1.7 to analyze consonant endings in Sanskrit words.
 *
 * @param {string|Array} input Word or array of words to analyze.
 * @returns {Object} Complete analysis according to Sutra 1.1.7.
 */
function applySutra117(input) {
  const sutraInfo = {
    number: '1.1.7',
    sanskrit: 'हलन्त्यम्',
    transliteration: 'halantyam',
    translation: 'Consonants are (called) final',
    definition: 'Consonants at the end of words are classified as antya (final)'
  };

  let analysis;
  
  if (typeof input === 'string') {
    // Single word analysis
    const finalConsonant = getFinalConsonant(input);
    analysis = {
      type: 'single-word',
      word: input,
      ...finalConsonant
    };
  } else if (Array.isArray(input)) {
    // Multiple words analysis
    analysis = {
      type: 'multiple-words',
      ...analyzeConsonantEndings(input)
    };
  } else {
    analysis = {
      type: 'invalid',
      isValid: false,
      error: 'Invalid input type'
    };
  }

  return {
    sutra: sutraInfo,
    input: input,
    analysis: analysis,
    application: analysis.isValid ? 'Sutra 1.1.7 successfully applied' : 'Sutra 1.1.7 could not be applied',
    examples: {
      'consonant-endings': [
        'वाक् (vāk) - speech (ends with k)',
        'मरुत् (marut) - wind (ends with t)', 
        'जगत् (jagat) - world (ends with t)',
        'भगवत् (bhagavat) - blessed (ends with t)'
      ],
      'vowel-endings': [
        'राम (rāma) - Rama (ends with a)',
        'सीता (sītā) - Sita (ends with ā)',
        'गुरु (guru) - teacher (ends with u)'
      ],
      'sandhi-applications': [
        'वाक् + ईश → वागीश (speech + lord)',
        'जगत् + ईश → जगदीश (world + lord)',
        'भगवत् + गीता → भगवद्गीता (blessed + song)'
      ]
    }
  };
}

/**
 * Gets all consonants in both scripts.
 *
 * @returns {Object} Object containing consonants in both scripts.
 */
function getAllConsonants() {
  return {
    iast: [...consonants],
    devanagari: [...consonantsDevanagari],
    combined: [...consonants, ...consonantsDevanagari],
    categories: {
      'velars': { iast: ['k', 'kh', 'g', 'gh', 'ṅ'], devanagari: ['क', 'ख', 'ग', 'घ', 'ङ'] },
      'palatals': { iast: ['c', 'ch', 'j', 'jh', 'ñ'], devanagari: ['च', 'छ', 'ज', 'झ', 'ञ'] },
      'retroflexes': { iast: ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ'], devanagari: ['ट', 'ठ', 'ड', 'ढ', 'ण'] },
      'dentals': { iast: ['t', 'th', 'd', 'dh', 'n'], devanagari: ['त', 'थ', 'द', 'ध', 'न'] },
      'labials': { iast: ['p', 'ph', 'b', 'bh', 'm'], devanagari: ['प', 'फ', 'ब', 'भ', 'म'] },
      'semivowels': { iast: ['y', 'r', 'l', 'v'], devanagari: ['य', 'र', 'ल', 'व'] },
      'sibilants': { iast: ['ś', 'ṣ', 's', 'h'], devanagari: ['श', 'ष', 'स', 'ह'] },
      'special': { iast: ['ḥ', 'ṃ', 'ṛ'], devanagari: ['ः', 'ं', '्'] }
    }
  };
}

export {
  isConsonant,
  endsWithConsonant,
  getFinalConsonant,
  analyzeConsonantEndings,
  analyzeConsonantSandhi,
  applySutra117,
  getAllConsonants,
  consonants,
  consonantsDevanagari
};
