/**
 * Sutra 1.1.75: एङ् प्राचां देशे (eṅ prācāṃ deśe)
 * 
 * Text: एङ् प्राचां देशे
 * Translation: A word that has the letters ए and ओ as the first among its vowels, gets also the designation of वृद्धम्।
 * 
 * This sutra extends the definition of वृद्धम् to include words where e (ए) or o (ओ) 
 * appears as the first vowel, but only according to the Eastern Grammarians (प्राच्याः).
 * This represents a dialectal or regional variation in grammatical interpretation.
 * 
 * The एङ् (eṅ) pratyāhāra includes e (ए) and o (ओ) vowels.
 * The term प्राचां देशे indicates this rule applies "in the eastern regions" or 
 * "according to eastern grammarians."
 */

import { 
  isVrddhamEastern, 
  isEngVowel, 
  analyzeVrddham, 
  getAllEngVowels 
} from '../sanskrit-utils/vrddham-analysis.js';
    word: word,
    firstVowel: null,
    isEngVowel: false,
    position: -1,
    allVowels: []
  };

  if (!word || typeof word !== 'string') {
    return result;
  }

  const tokenResult = tokenizePhonemes(word);
  const phonemes = tokenResult.phonemes || [];
  
  for (let i = 0; i < phonemes.length; i++) {
    const phoneme = phonemes[i];
    if (isVowel(phoneme)) {
      result.allVowels.push({ phoneme, position: i });
      
      if (result.firstVowel === null) {
        result.firstVowel = phoneme;
        result.position = i;
        result.isEngVowel = isEngVowel(phoneme);
        break;
      }
    }
  }

  return result;
}

/**
 * Checks if a word should be classified as वृद्धम् according to Sutra 1.1.75
 * (Eastern grammarians' rule for e/o as first vowel).
 * 
 * @param {string} word - The word to check
 * @param {Object} [context={}] - Optional context with regional preferences
 * @returns {boolean} True if word qualifies as वृद्धम् by Eastern rule, false otherwise
 */
function isVrddhamByEasternRule(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return false;
  }

  // Check if Eastern grammatical tradition is being followed
  const followsEasternTradition = context.tradition === 'eastern' || 
                                  context.region === 'prācya' ||
                                  context.allowEasternRules === true;

  if (!followsEasternTradition && !context.includeOptionalRules) {
    return false; // This rule is specific to Eastern grammarians
  }

  const vowelAnalysis = analyzeFirstVowel(word);
  return vowelAnalysis.isEngVowel;
}

/**
 * Provides detailed analysis of whether a word qualifies as वृद्धम् 
 * according to Sutra 1.1.75 (Eastern grammarians' rule).
 * 
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Optional analysis context
 * @returns {Object} Analysis result with detailed information
 */
function analyzeEasternVrddham(word, context = {}) {
  const result = {
    word: word,
    script: detectScript(word),
    isVrddhamByEasternRule: false,
    firstVowel: null,
    isEngVowel: false,
    tradition: 'standard',
    confidence: 0,
    reasoning: [],
    linguisticNotes: [],
    sutraReference: '1.1.75',
    alternativeClassification: null
  };

  if (!word || typeof word !== 'string') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    return result;
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    result.reasoning.push(`Invalid Sanskrit word: ${validation.message}`);
    return result;
  }

  const vowelAnalysis = analyzeFirstVowel(word);
  result.firstVowel = vowelAnalysis.firstVowel;
  result.isEngVowel = vowelAnalysis.isEngVowel;

  // Check if Eastern tradition is being followed
  const followsEasternTradition = context.tradition === 'eastern' || 
                                  context.region === 'prācya' ||
                                  context.allowEasternRules === true ||
                                  context.includeOptionalRules === true;

  if (result.isEngVowel && followsEasternTradition) {
    result.isVrddhamByEasternRule = true;
    result.tradition = 'eastern';
    result.confidence = 0.8; // Lower confidence due to regional specificity
    result.reasoning.push(`First vowel '${result.firstVowel}' is एङ् (e/o)`);
    result.reasoning.push('Eastern grammatical tradition allows this classification');
    result.linguisticNotes.push('According to Eastern grammarians (प्राच्याः)');
    result.linguisticNotes.push('This is a regional/dialectal extension to वृद्धम् definition');
  } else if (result.isEngVowel && !followsEasternTradition) {
    result.reasoning.push(`First vowel '${result.firstVowel}' is एङ् (e/o)`);
    result.reasoning.push('But Eastern grammatical tradition not specified in context');
    result.linguisticNotes.push('Would qualify as वृद्धम् under Eastern tradition');
    result.alternativeClassification = 'vrddham-if-eastern-tradition';
  } else {
    result.reasoning.push(`First vowel '${result.firstVowel}' is not एङ् (e/o)`);
    result.linguisticNotes.push('Does not qualify for वृद्धम् under Sutra 1.1.75');
  }

  return result;
}

/**
 * Gets all एङ् vowels (e and o) in both scripts.
 * 
 * @returns {Object} Object containing all एङ् vowels in both scripts
 */
function getAllEngVowels() {
  return {
    iast: [...ENG_VOWELS.iast],
    devanagari: [...ENG_VOWELS.devanagari],
    combined: [...ENG_VOWELS.iast, ...ENG_VOWELS.devanagari]
  };
}

// Export all functions
export {
  isEngVowel,
  analyzeFirstVowel,
  isVrddhamByEasternRule,
  analyzeEasternVrddham,
  getAllEngVowels
};
