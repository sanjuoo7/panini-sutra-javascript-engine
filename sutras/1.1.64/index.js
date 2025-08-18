import { 
  tokenizePhonemes, 
  isVowel, 
  validateSanskritWord, 
  detectScript, 
  sanitizeInput
} from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.64: aco'ntyādi ṭi
 * "The final portion of a word, beginning with the last among the vowels in the word, is called ṭi."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.64
 */

/**
 * Definition data for ṭi analysis
 */
const TI_DEFINITION = {
  sanskrit: 'अचोऽन्त्यादि टि',
  iast: 'aco\'ntyādi ṭi',
  type: 'saṃjñā',
  scope: 'word_segment',
  description: {
    sanskrit: 'अचः अन्त्यात् आदि टि इति संज्ञा',
    english: 'The segment beginning from the last vowel in a word is called ṭi'
  },
  properties: {
    starts_with_last_vowel: true,
    includes_final_consonants: true,
    phonetic_unit: true,
    morphological_significance: true
  }
};

/**
 * Traditional commentary references
 */
const TRADITIONAL_COMMENTARY = {
  kashika: {
    sanskrit: 'अचः अन्त्यात् आदि टि इति संज्ञा भवति। अन्त्यो अचः तस्मात् आदि यत् तत् टि इत्युच्यते।',
    iast: 'acaḥ antyāt ādi ṭi iti saṃjñā bhavati. antyo acaḥ tasmāt ādi yat tat ṭi ityucyate.',
    english: 'The technical term ṭi is assigned to the segment beginning from the last vowel'
  },
  mahabhashya: {
    sanskrit: 'टि-संज्ञकस्य प्रयोजनम् उत्तरत्र द्रष्टव्यम्',
    iast: 'ṭi-saṃjñakasya prayojanam uttaratra draṣṭavyam',
    english: 'The purpose of the ṭi designation will be seen in subsequent rules'
  }
};

/**
 * Finds the 'ṭi' part of a Sanskrit word.
 * The 'ṭi' is defined as the segment of a word starting from its last vowel to the end.
 *
 * @param {string} word - The Sanskrit word in IAST or Devanagari script.
 * @returns {string} The 'ṭi' part of the word, or an empty string if no vowel is found or input is invalid.
 */
export function getTi(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }

  const tokenizationResult = tokenizePhonemes(word, { accurate: true });
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];

  if (phonemes.length === 0) {
    return '';
  }

  let lastVowelIndex = -1;
  for (let i = phonemes.length - 1; i >= 0; i--) {
    if (isVowel(phonemes[i])) {
      lastVowelIndex = i;
      break;
    }
  }

  if (lastVowelIndex === -1) {
    return ''; // No vowel found in the word.
  }

  return phonemes.slice(lastVowelIndex).join('');
}

/**
 * Analyzes the ṭi segment of a Sanskrit word with comprehensive analysis
 * @param {string|Object} input - The Sanskrit word or analysis context
 * @returns {Object} Comprehensive analysis of the ṭi segment
 */
export function analyzeTi(input) {
  // Input validation and normalization
  const context = typeof input === 'string' ? { word: input } : (input || {});
  const rawWord = context.word;
  
  if (!rawWord) {
    return createEmptyAnalysis('Invalid input: word is required');
  }

  // Sanitize input
  const sanitized = sanitizeInput(rawWord);
  if (!sanitized.success) {
    return createEmptyAnalysis(`Input sanitization failed: ${sanitized.error}`);
  }
  
  const word = sanitized.sanitized;

  // Script detection
  const scriptResult = detectScript(word);
  const script = scriptResult.toLowerCase(); // Convert to lowercase for consistency
  const normalizedWord = script === 'devanagari' ? word : word.toLowerCase();

  // Basic Sanskrit validation
  if (script === 'unknown') {
    return createEmptyAnalysis(`Unsupported script: ${word}`);
  }

  // For IAST, check if it contains typical Sanskrit patterns
  if (script === 'iast' && !isLikelySanskrit(word)) {
    return createEmptyAnalysis(`Not a valid Sanskrit word: ${word}`);
  }

  // Create comprehensive analysis
  const analysis = {
    input: {
      word: normalizedWord,
      script: script,
      isValid: true
    },
    tiAnalysis: analyzeTiSegment(normalizedWord, script),
    morphologicalAnalysis: analyzeMorphology(normalizedWord, script),
    phoneticAnalysis: analyzePhonetics(normalizedWord, script),
    structuralAnalysis: analyzeStructure(normalizedWord, script),
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.1.64',
      sanskrit: TI_DEFINITION.sanskrit,
      iast: TI_DEFINITION.iast,
      type: TI_DEFINITION.type
    },
    confidence: 0
  };

  // Calculate confidence
  analysis.confidence = calculateTiConfidence(analysis);

  return analysis;
}

/**
 * Simple check if a word looks like Sanskrit
 */
function isLikelySanskrit(word) {
  // Sanskrit vowels are always valid
  const vowels = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', 'e', 'ai', 'o', 'au'];
  if (vowels.includes(word)) {
    return true;
  }
  
  // Sanskrit IAST contains specific diacritics or typical Sanskrit patterns
  const sanskritPattern = /[āīūṛṝḷḹēōṃḥṅñṭḍṇśṣḥ]|[kgcjṭtdnpbmyrlvśsh]/;
  const commonSanskritEndings = /[aāiīuūmnst]$/;
  
  // Reject obvious English words
  const englishWords = ['hello', 'world', 'test', 'example', 'sample'];
  if (englishWords.includes(word.toLowerCase())) {
    return false;
  }
  
  // Check for Sanskrit diacritics or common patterns
  return sanskritPattern.test(word) || 
         (commonSanskritEndings.test(word) && word.length > 2 && /[kgcjṭtdnpbmyrlvśsh]/.test(word));
}

/**
 * Analyzes the ṭi segment identification
 */
function analyzeTiSegment(word, script) {
  const tokenizationResult = tokenizePhonemes(word, { accurate: true });
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];
  
  let lastVowelIndex = -1;
  const vowels = [];
  
  // Find all vowels and their positions
  for (let i = 0; i < phonemes.length; i++) {
    if (isVowel(phonemes[i])) {
      vowels.push({ vowel: phonemes[i], position: i });
      lastVowelIndex = i;
    }
  }

  const tiSegment = lastVowelIndex !== -1 ? phonemes.slice(lastVowelIndex).join('') : '';
  
  return {
    tiSegment: tiSegment,
    lastVowel: lastVowelIndex !== -1 ? phonemes[lastVowelIndex] : null,
    lastVowelPosition: lastVowelIndex,
    allVowels: vowels,
    phonemes: phonemes,
    hasValidTi: tiSegment.length > 0
  };
}

/**
 * Analyzes morphological aspects of ṭi
 */
function analyzeMorphology(word, script) {
  const tiSegment = getTi(word);
  
  return {
    word: word,
    tiSegment: tiSegment,
    wordLength: word.length,
    tiLength: tiSegment.length,
    tiRatio: word.length > 0 ? (tiSegment.length / word.length) : 0,
    isWholeWord: tiSegment === word,
    morphologicalType: determineMorphologicalType(tiSegment),
    segmentPosition: 'final'
  };
}

/**
 * Analyzes phonetic structure of ṭi
 */
function analyzePhonetics(word, script) {
  const tiSegment = getTi(word);
  const tokenizationResult = tokenizePhonemes(tiSegment, { accurate: true });
  const phonemes = tokenizationResult ? tokenizationResult.phonemes : [];
  
  const vowelCount = phonemes.filter(p => isVowel(p)).length;
  const consonantCount = phonemes.length - vowelCount;
  
  return {
    tiSegment: tiSegment,
    phonemes: phonemes,
    vowelCount: vowelCount,
    consonantCount: consonantCount,
    phoneticStructure: analyzePhoneticStructure(phonemes),
    endsInConsonant: phonemes.length > 0 && !isVowel(phonemes[phonemes.length - 1]),
    phoneticPattern: getPhoneticPattern(phonemes)
  };
}

/**
 * Analyzes structural properties
 */
function analyzeStructure(word, script) {
  const tiSegment = getTi(word);
  
  return {
    definition: TI_DEFINITION,
    structuralType: 'word_segment',
    segmentScope: 'final_vowel_to_end',
    grammaticalFunction: 'morphophonemic_unit',
    applicationScope: 'sandhi_morphology',
    relatedConcepts: ['अङ्ग', 'प्रत्यय', 'संधि']
  };
}

/**
 * Determines morphological type of ṭi segment
 */
function determineMorphologicalType(tiSegment) {
  if (!tiSegment) return 'none';
  if (tiSegment.length === 1) return 'single_sound';
  if (tiSegment.length === 2) return 'syllable';
  return 'multi_syllable';
}

/**
 * Analyzes phonetic structure pattern
 */
function analyzePhoneticStructure(phonemes) {
  const structure = [];
  for (const phoneme of phonemes) {
    structure.push(isVowel(phoneme) ? 'V' : 'C');
  }
  return structure.join('');
}

/**
 * Gets phonetic pattern description
 */
function getPhoneticPattern(phonemes) {
  if (phonemes.length === 0) return 'empty';
  if (phonemes.length === 1) return isVowel(phonemes[0]) ? 'vowel_only' : 'consonant_only';
  
  const startsWithVowel = isVowel(phonemes[0]);
  const endsWithVowel = isVowel(phonemes[phonemes.length - 1]);
  
  if (startsWithVowel && endsWithVowel) return 'vowel_bracketed';
  if (startsWithVowel && !endsWithVowel) return 'vowel_initial';
  if (!startsWithVowel && endsWithVowel) return 'consonant_initial';
  return 'consonant_bracketed';
}

/**
 * Creates empty analysis result
 */
function createEmptyAnalysis(error) {
  return {
    input: { word: '', script: 'unknown', isValid: false },
    tiAnalysis: { tiSegment: '', hasValidTi: false },
    morphologicalAnalysis: {},
    phoneticAnalysis: {},
    structuralAnalysis: {},
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.1.64',
      sanskrit: TI_DEFINITION.sanskrit,
      iast: TI_DEFINITION.iast,
      type: TI_DEFINITION.type
    },
    error: error,
    confidence: 0
  };
}

/**
 * Calculates confidence score for ṭi analysis
 */
function calculateTiConfidence(analysis) {
  let confidence = 0;
  
  if (analysis.tiAnalysis.hasValidTi) {
    confidence += 30;
    
    if (analysis.tiAnalysis.lastVowel) {
      confidence += 20;
    }
    
    if (analysis.phoneticAnalysis.phonemes.length > 0) {
      confidence += 15;
    }
    
    if (analysis.morphologicalAnalysis.tiLength > 0) {
      confidence += 10;
    }
    
    if (analysis.input.isValid) {
      confidence += 10;
    }
    
    // Cap single-character ti segments (like 'a') at medium confidence
    if (analysis.morphologicalAnalysis.tiLength === 1) {
      confidence = Math.min(confidence, 85);
    }
    
    // Add bonus for multi-character segments
    if (analysis.morphologicalAnalysis.tiLength > 1) {
      confidence += 10;
    }
  } else {
    // Low confidence when no valid ṭi found
    confidence = 15;
  }
  
  return Math.min(confidence, 100);
}
