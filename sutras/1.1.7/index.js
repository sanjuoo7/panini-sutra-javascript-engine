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

// Import shared utilities
import { SanskritConsonants } from '../sanskrit-utils/constants.js';
import { isConsonant } from '../sanskrit-utils/classification.js';

// Use shared consonant arrays for specific needs
const consonants = SanskritConsonants.all.iast;
const consonantsDevanagari = SanskritConsonants.all.devanagari;

/**
 * Check if a word ends with a consonant (हलन्त्यम्)
 * 
 * Sanskrit phonology distinguishes between consonant-ending and vowel-ending words:
 * 
 * IAST Logic:
 * - Last character is a consonant → consonant-ending
 * - Special endings (ḥ, ṃ) → consonant-ending
 * 
 * Devanagari Logic (more complex due to inherent vowels):
 * - Explicit halanta (्) → always consonant-ending  
 * - Visarga (ः) or anusvara (ं) → consonant-ending
 * - Bare consonant (क, त, प) → vowel-ending (has inherent 'a')
 * - Consonant + vowel mark → vowel-ending
 * 
 * @param {string} word - The word to analyze
 * @returns {boolean} - True if word ends with consonant
 */
function endsWithConsonant(word) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  const lastChar = word.slice(-1);
  const secondLastChar = word.length > 1 ? word.slice(-2, -1) : '';

  // Check for explicit halanta (्) at the end, and if the character before it is a consonant
  if (lastChar === '्' && secondLastChar && consonantsDevanagari.includes(secondLastChar)) {
    return true;
  }
  
  // Special consonant endings that are always consonant-final
  const specialConsonantEndings = [
    ...SanskritConsonants.specialEndings.devanagari,
    ...SanskritConsonants.specialEndings.iast
  ]; // visarga, anusvara
  if (specialConsonantEndings.includes(lastChar)) {
    return true;
  }
  
  // For IAST, directly check if it's a consonant
  if (consonants.includes(lastChar)) {
    return true;
  }
  
  // Critical Fix: For Devanagari, consonant letters have inherent 'a' vowel.
  // They are only truly consonant-ending if:
  // 1. They have explicit halanta (्) - already checked above.
  // 2. They are special consonants (visarga/anusvara) - already checked above.
  // 3. The word ends with a pure consonant (e.g., क्, त्) which might be a single Unicode character
  //    or a character followed by a halanta.
  
  // For Devanagari, if the last character is a consonant from our list,
  // it's only truly consonant-ending if it's followed by an explicit halanta
  // or if it's a special character (visarga/anusvara).
  // Otherwise, it's considered vowel-ending due to the inherent 'a' vowel.
  if (consonantsDevanagari.includes(lastChar)) {
    // If it's a Devanagari consonant, it's only consonant-ending if it's a special case
    // (visarga/anusvara) or if the previous character was a halanta (already handled).
    // Otherwise, it has an inherent 'a' vowel and is vowel-ending.
    return false;
  }

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
 * Analyze consonant sandhi rules for word endings (हलन्त्यम्)
 * 
 * This function provides sandhi analysis for consonant-ending words.
 * Note: This is a simplified implementation. Complete sandhi analysis
 * requires considering multiple factors:
 * - Following sound context
 * - Morphological boundaries  
 * - Specific Paninian sutras (8.2.x, 8.3.x, 8.4.x series)
 * - Euphonic combinations
 * 
 * For production use, implement full sandhi rule engine.
 * 
 * @param {string} word - The consonant-ending word
 * @param {string} nextWord - Optional following word for context
 * @returns {Object} Sandhi analysis with applicable rules
 */
function analyzeConsonantSandhi(word, nextWord = null) {
  const finalAnalysis = getFinalConsonant(word);
  
  if (!finalAnalysis.isConsonant) {
    return {
      isValid: false,
      error: 'Word does not end with consonant - no consonant sandhi applicable',
      sandhiRules: [],
      limitations: 'This function only analyzes consonant-ending words'
    };
  }

  const finalConsonant = finalAnalysis.finalChar;
  let sandhiRules = [];
  let specificRules = [];

  // Enhanced sandhi categorization by place of articulation
  if (['क', 'ख', 'ग', 'घ', 'ङ', 'k', 'kh', 'g', 'gh', 'ṅ'].includes(finalConsonant)) {
    sandhiRules.push('Velar consonant sandhi (कण्ठ्य संधि) applies');
    specificRules.push('Sutra 8.2.30 (च्योः कु वशि), 8.4.55 (खरि च)');
  }
  if (['च', 'छ', 'ज', 'झ', 'ञ', 'c', 'ch', 'j', 'jh', 'ñ'].includes(finalConsonant)) {
    sandhiRules.push('Palatal consonant sandhi (तालव्य संधि) applies');
    specificRules.push('Sutra 8.4.40 (स्तोः श्चुना श्चुः)');
  }
  if (['ट', 'ठ', 'ड', 'ढ', 'ण', 'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ'].includes(finalConsonant)) {
    sandhiRules.push('Retroflex consonant sandhi (मूर्धन्य संधि) applies');
    specificRules.push('Cerebral assimilation rules (8.4.41)');
  }
  if (['त', 'थ', 'द', 'ध', 'न', 't', 'th', 'd', 'dh', 'n'].includes(finalConsonant)) {
    sandhiRules.push('Dental consonant sandhi (दन्त्य संधि) applies');
    specificRules.push('Most common final consonant changes (8.2.39, 8.4.56)');
  }
  if (['प', 'फ', 'ब', 'भ', 'म', 'p', 'ph', 'b', 'bh', 'm'].includes(finalConsonant)) {
    sandhiRules.push('Labial consonant sandhi (ओष्ठ्य संधि) applies');
    specificRules.push('Labial to labial assimilation (8.4.58)');
  }
  if (['य', 'र', 'ल', 'व', 'y', 'r', 'l', 'v'].includes(finalConsonant)) {
    sandhiRules.push('Semivowel sandhi (अन्तःस्थ संधि) applies');
    specificRules.push('Liquid and glide modifications');
  }
  if (['श', 'ष', 'स', 'ह', 'ś', 'ṣ', 's', 'h'].includes(finalConsonant)) {
    sandhiRules.push('Sibilant/aspirate sandhi (ऊष्म संधि) applies');
    specificRules.push('Sibilant assimilation rules (8.3.34-36)');
  }

  // Special endings
  if (['ः', 'ḥ'].includes(finalConsonant)) {
    sandhiRules.push('Visarga sandhi (विसर्ग संधि) - complex rules apply');
    specificRules.push('Sutras 8.3.15, 8.3.34 (रुँण्णो रुः), contextual changes');
  }
  if (['ं', 'ṃ'].includes(finalConsonant)) {
    sandhiRules.push('Anusvara sandhi (अनुस्वार संधि) applies');
    specificRules.push('Nasal assimilation based on following consonant');
  }

  return {
    isValid: true,
    error: null,
    word: word,
    finalConsonant: finalConsonant,
    consonantType: finalAnalysis.consonantType,
    nextWord: nextWord,
    sandhiRules: sandhiRules,
    specificSutras: specificRules,
    applicableSutras: ['हलन्त्यम् (1.1.7)', 'Various sandhi sutras'],
    explanation: `Consonant "${finalConsonant}" at end of "${word}" triggers specific sandhi rules`,
    limitations: 'Simplified sandhi analysis - complete implementation requires context-aware rule engine covering all Paninian sutras (8.2.x-8.4.x series)'
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
      'special': { iast: ['ḥ', 'ṃ'], devanagari: ['ः', 'ं'] }
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
