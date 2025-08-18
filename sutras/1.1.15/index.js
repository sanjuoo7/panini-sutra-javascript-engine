/**
 * Sutra 1.1.15: ओत्
 * "Particles ending in ओ are pragṛhya"
 * 
 * This sutra extends pragṛhya designation to indeclinable particles (निपात)
 * that end with the vowel ओ. These particles resist sandhi operations
 * to maintain their distinctive phonological and functional identity
 * in discourse and grammatical constructions.
 */

import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isPragrhya as isPragrhyaExtended } from '../1.1.14/index.js';
import { 
  isPragrhya as isPragrhyaShared,
  isPragrhyaParticleEndingInO as isPragrhyaParticleEndingInOShared,
  preventsSandhi as preventsSandhiShared
} from '../sanskrit-utils/pragrhya-analysis.js';

// Comprehensive particles ending in ओ
const O_ENDING_PARTICLES = {
  common: {
    devanagari: ['अहो', 'भो', 'हो', 'अथो', 'किन्तो', 'यतो'],
    iast: ['aho', 'bho', 'ho', 'atho', 'kinto', 'yato'],
    functions: {
      'अहो': { type: 'interjection', meaning: 'ah!/alas!/wonderful!', usage: 'surprise/wonder' },
      'भो': { type: 'vocative', meaning: 'hey/sir', usage: 'address/calling' },
      'हो': { type: 'interjection', meaning: 'oh!/alas!', usage: 'emotion/surprise' },
      'अथो': { type: 'conjunction', meaning: 'and now/moreover', usage: 'discourse_transition' },
      'किन्तो': { type: 'conjunction', meaning: 'but/however', usage: 'contrast' },
      'यतो': { type: 'adverb', meaning: 'whence/since', usage: 'causal_relation' }
    }
  },
  
  // Vedic and archaic forms
  vedic: {
    devanagari: ['स्वाहो', 'स्वधो', 'वषटो'],
    iast: ['svāho', 'svadho', 'vaṣaṭo'],
    contexts: ['ritual', 'sacrificial', 'vedic_formula']
  }
};

// Functional categories for ओ-ending particles
const FUNCTIONAL_CATEGORIES = {
  'interjection': { description: 'emotional expression', prosody: 'independent_accent' },
  'vocative': { description: 'address/calling', prosody: 'pre_vocal_stress' },
  'conjunction': { description: 'discourse connector', prosody: 'phrase_initial' },
  'adverb': { description: 'circumstantial modifier', prosody: 'clause_integrated' }
};

/**
 * Enhanced educational function implementing Sutra 1.1.15
 * @param {string} word - The word to analyze for ओ-ending particle pragṛhya status
 * @param {Object} options - Analysis options for educational detail
 * @returns {Object} - Comprehensive ओ-ending particle analysis
 */
export function sutra1115(word, options = {}) {
  const {
    includeExamples = true,
    includeParticleContext = true,
    includeTradition = true,
    includeSandhiAnalysis = true,
    includeVedicForms = true,
    assumeParticle = true
  } = options;

  // Handle invalid input
  if (!word || typeof word !== 'string') {
    return {
      input: word,
      sutraApplied: '1.1.15',
      sutraName: 'ot',
      sutraText: 'ओत्',
      applies: false,
      isPragrhya: false,
      error: 'invalid_word_input',
      explanation: 'Valid Sanskrit word required for ओ-ending particle analysis'
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  const trimmedWord = word.trim();
  
  // Check if word ends with ओ
  const endsWithO = trimmedWord.endsWith('ो') || normalizedWord.endsWith('o');
  
  // Check if word is in known ओ-ending particles
  const isKnownOParticle = O_ENDING_PARTICLES.common.devanagari.includes(trimmedWord) ||
                          O_ENDING_PARTICLES.common.iast.includes(normalizedWord) ||
                          O_ENDING_PARTICLES.vedic.devanagari.includes(trimmedWord) ||
                          O_ENDING_PARTICLES.vedic.iast.includes(normalizedWord);

  // Determine if pragṛhya (particle ending in ओ)
  const isPragrhyaOParticle = (endsWithO || isKnownOParticle) && assumeParticle;

  // Get particle function analysis
  let particleFunction = null;
  if (includeParticleContext && isPragrhyaOParticle) {
    particleFunction = O_ENDING_PARTICLES.common.functions[trimmedWord] ||
                      O_ENDING_PARTICLES.common.functions[normalizedWord] || {
                        type: 'particle',
                        meaning: 'o_ending_particle',
                        usage: 'grammatical_function'
                      };
  }

  // Check if Vedic form
  const isVedicForm = includeVedicForms && (
    O_ENDING_PARTICLES.vedic.devanagari.includes(trimmedWord) ||
    O_ENDING_PARTICLES.vedic.iast.includes(normalizedWord)
  );

  // Check coverage by previous sutras
  const alsoByPreviousSutras = isPragrhyaExtended ? isPragrhyaExtended(word) : false;

  // Build comprehensive analysis
  const analysis = {
    input: word,
    sutraApplied: '1.1.15',
    sutraName: 'ot',
    sutraText: 'ओत्',
    applies: isPragrhyaOParticle,
    isPragrhya: isPragrhyaOParticle,
    
    // Classification details
    classification: isPragrhyaOParticle ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (apragṛhya)',
    pragrhyaType: isPragrhyaOParticle ? 'o_ending_particle' : null,
    
    // Script information
    script: script,
    normalizedForm: normalizedWord,
    
    // Particle analysis
    particleAnalysis: {
      endsWithO: endsWithO,
      isParticle: assumeParticle,
      isKnownForm: isKnownOParticle,
      isVedicForm: isVedicForm
    },
    
    // Detailed explanation
    explanation: isPragrhyaOParticle 
      ? `'${word}' is प्रगृह्य because it is a निपात (particle) ending in ओ, which resists sandhi operations`
      : `'${word}' is not covered by Sutra 1.1.15 as it is not a particle ending in ओ`,
    
    // Traditional definition
    traditionalDefinition: includeTradition ? {
      sanskrit: 'निपातस्य ओकारान्तस्य प्रगृह्यत्वम्',
      translation: 'Particles ending in ओ have pragṛhya status',
      commentary: 'This sutra protects the phonological integrity of ओ-ending particles in discourse'
    } : null,
    
    // Particle function analysis
    particleFunction: includeParticleContext ? particleFunction : null,
    
    // Functional category analysis
    functionalCategory: includeParticleContext && particleFunction ? 
      FUNCTIONAL_CATEGORIES[particleFunction.type] : null,
    
    // Sandhi analysis
    sandhiAnalysis: includeSandhiAnalysis ? {
      preventsSandhi: isPragrhyaOParticle,
      sandhiType: isPragrhyaOParticle ? 'blocked_by_o_particle_pragrhya' : 'normal_sandhi_rules_apply',
      explanation: isPragrhyaOParticle 
        ? 'ओ-ending particles resist sandhi to preserve their functional distinctiveness'
        : 'Normal sandhi rules would apply if this were not pragṛhya',
      oVowelBehavior: isPragrhyaOParticle ? 'remains_unchanged_before_vowels' : 'follows_normal_sandhi'
    } : null,
    
    // Educational examples
    examples: includeExamples ? {
      commonOParticles: [
        { particle: 'अहो', function: 'interjection', example: 'अहो रूपम्', meaning: 'Ah, what beauty!' },
        { particle: 'भो', function: 'vocative', example: 'भो राम', meaning: 'Hey Rama!' },
        { particle: 'हो', function: 'interjection', example: 'हो हन्त', meaning: 'Oh alas!' },
        { particle: 'अथो', function: 'conjunction', example: 'अथो किम्', meaning: 'And now what?' }
      ],
      vedicOParticles: includeVedicForms ? [
        { particle: 'स्वाहो', context: 'Vedic ritual', meaning: 'well said/so be it' },
        { particle: 'वषटो', context: 'sacrifice', meaning: 'ritual exclamation' }
      ] : null,
      sandhiExamples: [
        { 
          phrase: 'अहो + अद्भुतम् = अहो अद्भुतम्', 
          explanation: 'no sandhi due to ओ-particle pragṛhya nature',
          nonPragrhya: 'would normally become अहोऽद्भुतम्'
        },
        { 
          phrase: 'भो + इति = भो इति', 
          explanation: 'ओ resists sandhi in particle',
          contrast: 'normal ओ would become भवेति'
        }
      ]
    } : null,
    
    // Cross-reference information
    relatedSutras: [
      { sutra: '1.1.11', name: 'īdūdeddvivacanaṃ pragṛhyam', relation: 'establishes basic pragṛhya forms' },
      { sutra: '1.1.12', name: 'adaso māt', relation: 'extends pragṛhya to अदस् forms' },
      { sutra: '1.1.13', name: 'śe', relation: 'extends pragṛhya to Vedic शे affix' },
      { sutra: '1.1.14', name: 'nipāta ekājanāṅ', relation: 'covers single-vowel particles' },
      { sutra: '1.1.16', name: 'sambuddhau śākalyasya itāvanārṣe', relation: 'continues pragṛhya in vocative' }
    ],
    
    // Vedic context analysis
    vedicContext: includeVedicForms && isVedicForm ? {
      isVedicForm: true,
      ritualContext: true,
      archaicFeature: 'preserves_vedic_particle_morphology',
      textualDistribution: 'Vedic texts and ritual literature'
    } : null,
    
    // Integration with previous sutras
    coverageAnalysis: {
      byThisSutra: isPragrhyaOParticle,
      byPreviousSutras: alsoByPreviousSutras,
      overlapping: isPragrhyaOParticle && alsoByPreviousSutras,
      uniqueToThisSutra: isPragrhyaOParticle && !alsoByPreviousSutras
    },
    
    // Confidence scoring
    confidence: (endsWithO || isKnownOParticle) ? 1.0 : 0.8,
    analysisMethod: 'o_ending_particle_classification'
  };

  return analysis;
}

// Maintain backward compatibility
export function isPragrhyaParticleEndingInO(word, isParticle = true) {
  const result = sutra1115(word, { assumeParticle: isParticle });
  return result.isPragrhya;
}

export function isPragrhya(word, context = {}) {
  // Use shared pragrhya analysis, but limit to sutras up to 1.1.15
  return isPragrhyaShared(word, context, ['1.1.11', '1.1.12', '1.1.13', '1.1.14', '1.1.15']);
}

export function preventsSandhi(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  return preventsSandhiShared(firstWord, secondWord, context);
}

export default sutra1115;
