/**
 * Sutra 1.1.14: निपात एकाजनाङ्
 * "Single-vowel particles (निपात), except आङ्, are pragṛhya"
 * 
 * This sutra extends pragṛhya designation to indeclinable particles (निपात)
 * that consist of a single vowel, with the specific exception of आङ्.
 * These particles resist sandhi to maintain their functional identity
 * as discourse markers and grammatical particles.
 */

import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.13/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaSingleVowelParticle as isPragrhyaSingleVowelParticleShared,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

// Comprehensive single-vowel particle data
const SINGLE_VOWEL_PARTICLES = {
  pragrhya: {
    devanagari: ['अ', 'इ', 'उ', 'ए', 'ओ'],
    iast: ['a', 'i', 'u', 'e', 'o'],
    functions: {
      'अ': { type: 'interjection', meaning: 'exclamation', usage: 'address/surprise' },
      'इ': { type: 'particle', meaning: 'here/indeed', usage: 'emphasis/location' },
      'उ': { type: 'interjection', meaning: 'oh/alas', usage: 'emotion/address' },
      'ए': { type: 'vocative', meaning: 'hey/o', usage: 'address/calling' },
      'ओ': { type: 'vocative', meaning: 'oh/o', usage: 'address/invocation' }
    }
  },
  
  // Exception: आङ् is NOT pragṛhya
  exceptions: {
    devanagari: ['आ', 'आङ्'],
    iast: ['ā', 'āṅ'],
    reason: 'explicitly_excluded_by_sutra'
  }
};

// Particle classification and usage contexts
const PARTICLE_CONTEXTS = {
  'vocative': { description: 'addressing/calling', examples: ['ए देव', 'ओ राम'] },
  'interjection': { description: 'emotional expression', examples: ['अ बत', 'उ हा'] },
  'emphasis': { description: 'emphatic particle', examples: ['इ यम्', 'तत् इ'] },
  'discourse': { description: 'discourse marker', examples: ['अ तु', 'इ वै'] }
};

/**
 * Enhanced educational function implementing Sutra 1.1.14
 * @param {string} word - The word to analyze for single-vowel particle pragṛhya status
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive particle analysis
 */
export function sutra1114(word, options = {}) {
  const {
    includeExamples = true,
    includeParticleContext = true,
    includeTradition = true,
    includeSandhiAnalysis = true,
    assumeParticle = true // Assume word is a particle for analysis
  } = options;

  // Handle invalid input
  if (!word || typeof word !== 'string') {
    return {
      input: word,
      sutraApplied: '1.1.14',
      sutraName: 'nipāta ekājanāṅ',
      sutraText: 'निपात एकाजनाङ्',
      applies: false,
      isPragrhya: false,
      error: 'invalid_word_input',
      explanation: 'Valid Sanskrit word required for particle analysis'
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  const trimmedWord = word.trim();
  
  // Check if word is a single vowel
  const isSingleVowel = trimmedWord.length === 1 && 
    (SINGLE_VOWEL_PARTICLES.pragrhya.devanagari.includes(trimmedWord) ||
     SINGLE_VOWEL_PARTICLES.pragrhya.iast.includes(normalizedWord));
  
  // Check if word is the exception आङ्
  const isException = SINGLE_VOWEL_PARTICLES.exceptions.devanagari.includes(trimmedWord) ||
                     SINGLE_VOWEL_PARTICLES.exceptions.iast.includes(normalizedWord);

  // Determine if pragṛhya (single vowel particle, not आङ्)
  const isPragrhyaParticle = isSingleVowel && !isException && assumeParticle;

  // Get particle function analysis
  let particleFunction = null;
  if (includeParticleContext && isPragrhyaParticle) {
    particleFunction = SINGLE_VOWEL_PARTICLES.pragrhya.functions[trimmedWord] ||
                      SINGLE_VOWEL_PARTICLES.pragrhya.functions[normalizedWord] || {
                        type: 'particle',
                        meaning: 'single_vowel_particle',
                        usage: 'grammatical_function'
                      };
  }

  // Check coverage by previous sutras
  const alsoByPreviousSutras = isPragrhyaExtended ? isPragrhyaExtended(word) : false;

  // Build comprehensive analysis
  const analysis = {
    input: word,
    sutraApplied: '1.1.14',
    sutraName: 'nipāta ekājanāṅ',
    sutraText: 'निपात एकाजनाङ्',
    applies: isPragrhyaParticle,
    isPragrhya: isPragrhyaParticle,
    
    // Classification details
    classification: isPragrhyaParticle ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (apragṛhya)',
    pragrhyaType: isPragrhyaParticle ? 'single_vowel_particle' : null,
    
    // Script information
    script: script,
    normalizedForm: normalizedWord,
    
    // Particle analysis
    particleAnalysis: {
      isSingleVowel: isSingleVowel,
      isParticle: assumeParticle,
      isException: isException,
      exceptionReason: isException ? 'explicitly_excluded_by_āṅ_clause' : null
    },
    
    // Detailed explanation
    explanation: isPragrhyaParticle 
      ? `'${word}' is प्रगृह्य because it is a single-vowel निपात (particle) and not the excluded आङ्`
      : isException 
        ? `'${word}' is not प्रगृह्य because it is specifically excluded by the आङ् exception in this sutra`
        : `'${word}' is not covered by Sutra 1.1.14 as it is not a single-vowel particle`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'निपातः एकाच् न आङ् प्रगृह्यम्',
      translation: 'Single-vowel particles, except आङ्, are pragṛhya',
      commentary: 'This sutra protects the functional identity of monosyllabic particles while making a specific exception for आङ्'
    } : null,
    
    // Particle function analysis
    particleFunction: includeParticleContext ? particleFunction : null,
    
    // Sandhi analysis
    sandhiAnalysis: includeSandhiAnalysis ? {
      preventsSandhi: isPragrhyaParticle,
      sandhiType: isPragrhyaParticle ? 'blocked_by_particle_pragrhya' : 'normal_sandhi_rules_apply',
      explanation: isPragrhyaParticle 
        ? 'Single-vowel particles resist sandhi to preserve their distinct grammatical function'
        : isException
          ? 'आङ् undergoes normal sandhi despite being a single-vowel particle'
          : 'Normal sandhi rules would apply if this were not pragṛhya'
    } : null,
    
    // Educational examples
    examples: includeExamples ? {
      pragrhyaParticles: [
        { particle: 'अ', function: 'interjection', example: 'अ बत हतोऽस्मि', meaning: 'Alas, I am destroyed!' },
        { particle: 'इ', function: 'emphasis', example: 'तत् इ वै सत्यम्', meaning: 'That indeed is truth' },
        { particle: 'उ', function: 'interjection', example: 'उ हो वत्स', meaning: 'Oh dear child!' },
        { particle: 'ए', function: 'vocative', example: 'ए देव', meaning: 'O god!' },
        { particle: 'ओ', function: 'vocative', example: 'ओ राम', meaning: 'O Rama!' }
      ],
      exceptions: [
        { particle: 'आङ्', reason: 'explicit exception', behavior: 'undergoes normal sandhi' }
      ],
      sandhiExamples: [
        { 
          phrase: 'अ + इह = अ इह', 
          explanation: 'no sandhi due to particle pragṛhya nature',
          contrast: 'आङ् + इह = आङिह (normal sandhi for आङ्)'
        },
        { 
          phrase: 'ए + अग्ने = ए अग्ने', 
          explanation: 'vocative particle resists sandhi',
          nonPragrhya: 'would normally become एऽग्ने'
        }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.11', name: 'īdūdeddvivacanaṃ pragṛhyam', relation: 'establishes basic pragṛhya forms' },
      { sutra: '1.1.12', name: 'adaso māt', relation: 'extends pragṛhya to अदस् forms' },
      { sutra: '1.1.13', name: 'śe', relation: 'extends pragṛhya to Vedic शे affix' },
      { sutra: '1.1.15', name: 'ot', relation: 'continues pragṛhya extensions' },
      { sutra: '1.4.57', name: 'cādayo\'sattve', relation: 'defines particle class and usage' }
    ],
    
    // Exception analysis
    exceptionAnalysis: isException ? {
      isException: true,
      exceptionType: 'explicit_exclusion',
      reasoning: 'आङ् explicitly excluded despite meeting single-vowel particle criteria',
      linguisticReason: 'आङ् has different morphophonological behavior than other particles'
    } : null,
    
    // Integration with previous sutras
    coverageAnalysis: {
      byThisSutra: isPragrhyaParticle,
      byPreviousSutras: alsoByPreviousSutras,
      overlapping: isPragrhyaParticle && alsoByPreviousSutras,
      uniqueToThisSutra: isPragrhyaParticle && !alsoByPreviousSutras
    },
    
    // Confidence scoring
    confidence: (isSingleVowel || isException) ? 1.0 : 0.8, // High confidence for clear cases
    analysisMethod: 'single_vowel_particle_classification'
  };

  return analysis;
}

// Maintain backward compatibility
export function isPragrhyaSingleVowelParticle(word, isParticle = true) {
  const result = sutra1114(word, { assumeParticle: isParticle });
  return result.isPragrhya;
}

export function isPragrhya(word, context = {}) {
  // Use shared pragrhya analysis, but limit to sutras up to 1.1.14
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12', '1.1.13', '1.1.14']);
}

export function preventsSandhi(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  return preventsSandhiShared(firstWord, secondWord, context);
}

export default sutra1114;
