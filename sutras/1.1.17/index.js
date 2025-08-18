/**
 * Sutra 1.1.17: उञः (uñaḥ)
 * "The particle ऊञ् before इति, according to Śākalya is pragṛhya."
 * 
 * This sutra extends pragṛhya rules to the specific particle ऊञ्.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.17
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.16/index.js';

/**
 * Main pragṛhya check function - Core sutra implementation
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {Object} - Comprehensive analysis object with pragṛhya determination
 */
export function sutra1117(word, context = {}) {
  // Input validation and normalization
  if (!word || typeof word !== 'string') {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.17',
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
    const { nextWord } = context;
    
    // Educational analysis object
    const analysis = {
      word: word,
      script: script,
      sutraApplied: '1.1.17',
      rule: 'उञः',
      meaning: 'The particle ऊञ् before इति (Śākalya tradition)',
      
      traditionalCommentary: {
        primary: 'उञ् निपातः। शाकल्यस्य मते एतस्य प्रगृह्यत्वं इत्युक्ते पूर्वे।',
        explanation: 'The particle ऊञ् (expressing surprise/wonder) is designated as pragṛhya before इति according to Śākalya\'s tradition.',
        authorityReference: 'शाकल्य प्रातिशाख्यम् - Śākalya Prātiśākhya tradition',
        particleClassification: 'निपात - indeclinable particle expressing emotional response'
      },
      
      modernExplanation: {
        grammaticalContext: 'Pragṛhya designation for specific emotional particle in quotative environment',
        phoneticReasoning: 'Prevents sandhi between emotional particle ऊञ् and following quotative इति',
        functionalPurpose: 'Preserves emotional expression distinctiveness before reported speech',
        linguisticSignificance: 'Shows special treatment of expressive particles in discourse boundaries'
      },
      
      conditions: {
        particleForm: 'Must be ऊञ् (emotional particle expressing surprise/wonder)',
        followingContext: 'Must be followed by इति (quotative marker)',
        traditionalAuthority: 'According to Śākalya\'s grammatical tradition',
        phoneticVariants: 'Includes both ऊञ् (with visarga) and ऊञ (without visarga)'
      },
      
      examples: {
        devanagari: [
          { word: 'ऊञ्', context: 'before इति', result: 'प्रगृह्य', explanation: 'Emotional particle before quotative' },
          { word: 'ऊञ', context: 'before इति', result: 'प्रगृह्य', explanation: 'Variant form before quotative' }
        ],
        iast: [
          { word: 'ūñ', context: 'before iti', result: 'pragṛhya', explanation: 'Emotional particle before quotative' },
          { word: 'uñ', context: 'before iti', result: 'pragṛhya', explanation: 'Variant form before quotative' }
        ]
      },
      
      semanticAnalysis: {
        emotionalFunction: 'ऊञ् expresses surprise, wonder, or sudden realization',
        discourseRole: 'Introduces or concludes emotionally charged statements',
        quotativeInteraction: 'Forms boundary between emotional response and reported content',
        pragmaticEffect: 'Maintains clarity between speaker\'s emotional state and quoted material'
      },
      
      relatedSutras: {
        preceding: ['1.1.16 (Vocative ओ before इति)', '1.1.15 (O-ending particles)'],
        following: ['1.1.18', '1.1.19'],
        crossReferences: ['1.1.11 (General pragṛhya definition)', '1.1.14 (Single vowel particles)'],
        integrationNote: 'Part of Śākalya\'s specialized pragṛhya system for discourse particles'
      }
    };

    // Check base pragṛhya rules from previous sutras first
    const baseResult = basePragrhya(word, context);
    if (baseResult) {
      return {
        isPragrhya: true,
        sutraApplied: '1.1.17',
        confidence: 1.0,
        analysis: {
          ...analysis,
          result: 'प्रगृह्य by previous sutra rules',
          evidenceChain: 'Covered by earlier pragṛhya classification (1.1.14-1.1.16)',
          educationalNote: 'This word qualifies under previous pragṛhya rules before reaching 1.1.17'
        }
      };
    }
    
    // Check specific conditions for ऊञ् particle
    let isPragrhyaHere = false;
    let detailedReasoning = '';
    
    // Must be followed by 'iti'
    if (nextWord !== 'iti' && nextWord !== 'इति') {
      detailedReasoning = 'Must be followed by इति (quotative marker) for this rule to apply';
    }
    // Check for the specific particle ऊञ्
    else {
      const isCorrectParticle = script === 'Devanagari' ? 
        (word === 'ऊञ्' || word === 'ऊञ') : 
        (word === 'ūñ' || word === 'uñ');
      
      if (isCorrectParticle) {
        isPragrhyaHere = true;
        detailedReasoning = 'उञः - Śākalya tradition: ऊञ् particle before इति is pragṛhya';
      } else {
        detailedReasoning = 'Not the particle ऊञ् - this rule applies only to the specific emotional particle';
      }
    }

    return {
      isPragrhya: isPragrhyaHere,
      sutraApplied: '1.1.17',
      confidence: isPragrhyaHere ? 1.0 : 0.0,
      analysis: {
        ...analysis,
        result: isPragrhyaHere ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (not pragṛhya)',
        detailedReasoning: detailedReasoning,
        contextualAnalysis: {
          particleIdentity: script === 'Devanagari' ? 
            (word === 'ऊञ्' || word === 'ऊञ' ? 'ऊञ् particle ✓' : 'Not ऊञ् ✗') :
            (word === 'ūñ' || word === 'uñ' ? 'ūñ particle ✓' : 'Not ūñ ✗'),
          followingWord: nextWord || 'not specified',
          quotativeContext: (nextWord === 'iti' || nextWord === 'इति') ? 'Before इति ✓' : 'Not before इति ✗'
        },
        educationalNote: isPragrhyaHere ? 
          'Śākalya tradition preserves emotional particle distinctiveness through pragṛhya designation' :
          'Conditions for ऊञ् pragṛhya rule not satisfied'
      }
    };
    
  } catch (error) {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.17',
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
 * Checks if the particle ऊञ् before 'iti' is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including next word
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaUnj(word, context = {}) {
  const result = sutra1117(word, context);
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
  const result = sutra1117(word, context);
  return result.isPragrhya;
}

/**
 * Gets the particle forms covered by this sutra
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of particle forms
 */
export function getUnjParticles(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['ऊञ्', 'ऊञ'];
  } else {
    return ['ūñ', 'uñ'];
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
