/**
 * Sutra 1.1.18: ऊँ (ūṃ)
 * "The particle ऊँ replaces उञ in non-Vedic literature and it is pragṛhya in the opinion of Śākalya."
 * 
 * This sutra introduces ऊँ as a pragṛhya particle replacing ऊञ्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.18
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.17/index.js';

/**
 * Main pragṛhya check function - Core sutra implementation
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {Object} - Comprehensive analysis object with pragṛhya determination
 */
export function sutra1118(word, context = {}) {
  // Input validation and normalization
  if (!word || typeof word !== 'string') {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.18',
      confidence: 0.0,
      analysis: {
        error: 'Invalid input',
        traditionalCommentary: 'अशुद्धं पदम्',
        modernExplanation: 'Input validation failed - word must be a non-empty string',
        educationalNote: 'प्रविष्टि परीक्षा विफलता (Input validation failure)'
      }
    };
  }

  try {
    const script = detectScript(word);
    const { isVedic = false } = context;
    
    // Educational analysis object
    const analysis = {
      word: word,
      script: script,
      sutraApplied: '1.1.18',
      rule: 'ऊँ',
      meaning: 'The sacred particle ऊँ (Om) is pragṛhya (Śākalya tradition)',
      
      traditionalCommentary: {
        primary: 'ऊकारान्तो निपातः ऊँ इति। शाकल्यस्य मते अयं प्रगृह्यः। पूर्वस्मात् उञः स्थाने अनार्षे काव्ये।',
        explanation: 'The sacred syllable ऊँ (Om) ending in ऊ with anusvāra is designated as pragṛhya according to Śākalya\'s tradition, particularly in non-Vedic literature as replacement for ऊञ्.',
        authorityReference: 'शाकल्य प्रातिशाख्यम् - Śākalya Prātiśākhya tradition',
        sacredStatus: 'प्रणव - The primordial sound, sacred syllable of ultimate reality'
      },
      
      modernExplanation: {
        grammaticalContext: 'Pragṛhya designation for the most sacred particle in Sanskrit',
        phoneticReasoning: 'Prevents any sandhi modifications to preserve sacred integrity',
        functionalPurpose: 'Maintains absolute phonetic purity of the sacred syllable',
        linguisticSignificance: 'Supreme pragṛhya case - no phonetic modification allowed under any circumstances',
        spiritualImportance: 'Represents Brahman (ultimate reality) in sound form'
      },
      
      conditions: {
        particleForm: 'Must be ऊँ (Om with anusvāra) or its variants',
        sacredContext: 'Sacred syllable representing ultimate reality',
        traditionalAuthority: 'According to Śākalya\'s grammatical and spiritual tradition',
        phoneticVariants: 'Includes ऊँ, ओम्, ओं and their IAST equivalents',
        universalApplication: 'Applies in all contexts - Vedic and classical'
      },
      
      examples: {
        devanagari: [
          { word: 'ऊँ', context: 'sacred syllable', result: 'प्रगृह्य', explanation: 'Primary form of Om' },
          { word: 'ओम्', context: 'extended form', result: 'प्रगृह्य', explanation: 'Full syllabic form' },
          { word: 'ओं', context: 'anusvāra form', result: 'प्रगृह्य', explanation: 'Nasalized variant' }
        ],
        iast: [
          { word: 'ūṃ', context: 'sacred syllable', result: 'pragṛhya', explanation: 'Primary IAST form' },
          { word: 'oṃ', context: 'common form', result: 'pragṛhya', explanation: 'Standard transliteration' },
          { word: 'om', context: 'simplified', result: 'pragṛhya', explanation: 'Popular romanization' }
        ]
      },
      
      spiritualAnalysis: {
        cosmicSignificance: 'ऊँ represents the sound of creation, preservation, and dissolution',
        tripartiteStructure: 'अ (creation), उ (preservation), म् (dissolution) unified in ऊँ',
        upanishadicTeaching: 'प्रणवो धनुः शरो ह्यात्मा ब्रह्म तल्लक्ष्यमुच्यते (Muṇḍaka Up.)',
        meditativeFunction: 'Primary mantra for contemplation and spiritual practice',
        universalSymbol: 'Recognized across all schools of Indian philosophy'
      },
      
      phoneticPreservation: {
        absoluteInviolability: 'No sandhi modification permitted under any grammatical condition',
        sacredIntegrity: 'Phonetic form must remain unchanged to preserve spiritual potency',
        traditionalProtection: 'All grammatical schools unanimously preserve its form',
        practicalApplication: 'Always pronounced independently in recitation and meditation'
      },
      
      relatedSutras: {
        preceding: ['1.1.17 (ऊञ् particle)', '1.1.16 (Vocative ओ before इति)'],
        following: ['1.1.19 (Final pragṛhya rule)'],
        crossReferences: ['1.1.11 (General pragṛhya definition)', '1.1.14 (Single vowel particles)'],
        integrationNote: 'Represents pinnacle of pragṛhya system - absolute phonetic preservation'
      }
    };

    // Check base pragṛhya rules from previous sutras first
    const baseResult = basePragrhya(word, context);
    if (baseResult) {
      return {
        isPragrhya: true,
        sutraApplied: '1.1.18',
        confidence: 1.0,
        analysis: {
          ...analysis,
          result: 'प्रगृह्य by previous sutra rules',
          evidenceChain: 'Covered by earlier pragṛhya classification (1.1.14-1.1.17)',
          educationalNote: 'This word qualifies under previous pragṛhya rules before reaching 1.1.18'
        }
      };
    }
    
    // Check specific conditions for ऊँ (Om) particle
    let isPragrhyaHere = false;
    let detailedReasoning = '';
    
    // Check for Om particle forms
    const isOmParticle = script === 'Devanagari' ? 
      ['ऊँ', 'ओम्', 'ओं'].includes(word) : 
      ['ūṃ', 'oṃ', 'om'].includes(word);
    
    if (isOmParticle) {
      isPragrhyaHere = true;
      detailedReasoning = 'ऊँ - Sacred Om particle: absolute pragṛhya status by Śākalya tradition';
    } else {
      detailedReasoning = 'Not the sacred Om particle - this rule applies only to ऊँ and its variants';
    }

    return {
      isPragrhya: isPragrhyaHere,
      sutraApplied: '1.1.18',
      confidence: isPragrhyaHere ? 1.0 : 0.0,
      analysis: {
        ...analysis,
        result: isPragrhyaHere ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (not pragṛhya)',
        detailedReasoning: detailedReasoning,
        contextualAnalysis: {
          particleIdentity: script === 'Devanagari' ? 
            (['ऊँ', 'ओम्', 'ओं'].includes(word) ? 'Sacred Om ✓' : 'Not Om ✗') :
            (['ūṃ', 'oṃ', 'om'].includes(word) ? 'Sacred Om ✓' : 'Not Om ✗'),
          sacredStatus: isPragrhyaHere ? 'प्रणव (Praṇava) - Supreme sacred syllable' : 'Regular word',
          phoneticProtection: isPragrhyaHere ? 'Absolute inviolability' : 'Subject to normal sandhi'
        },
        educationalNote: isPragrhyaHere ? 
          'Supreme pragṛhya case: Om represents ultimate reality and requires absolute phonetic preservation' :
          'Conditions for sacred Om pragṛhya rule not satisfied'
      }
    };
    
  } catch (error) {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.18',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

/**
 * Checks if the particle ऊँ is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaOm(word, context = {}) {
  const result = sutra1118(word, context);
  return result.isPragrhya;
}

/**
 * Main pragṛhya check that includes this sutra's rule
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word is pragṛhya
 */
export function isPragrhya(word, context = {}) {
  const result = sutra1118(word, context);
  return result.isPragrhya;
}

/**
 * Gets the Om particle forms covered by this sutra
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of Om forms
 */
export function getOmForms(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['ऊँ', 'ओम्', 'ओं'];
  } else {
    return ['ūṃ', 'oṃ', 'om'];
  }
}

/**
 * Checks if a word is the sacred Om particle
 * 
 * @param {string} word - The word to check
 * @returns {boolean} - True if it's an Om form
 */
export function isOmParticle(word) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    if (script === 'Devanagari') {
      return ['ऊँ', 'ओम्', 'ओं'].includes(word);
    } else {
      return ['ūṃ', 'oṃ', 'om'].includes(word);
    }
  } catch (error) {
    return false;
  }
}

/**
 * Checks if pragṛhya behavior should apply according to this sutra
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if pragṛhya rules apply
 */
export function hasPragrhyaBehavior(word, context = {}) {
  return isPragrhya(word, context);
}
