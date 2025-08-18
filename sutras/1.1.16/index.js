/**
 * Sutra 1.1.16: सम्बुद्धौ शाकल्यस्येतावनार्षे (sambuddhau śākalyasyetāvanārṣe)
 * "The final ओ of a vocative singular before इति according to Śākalya, in non-Vedic literature is pragṛhya."
 * 
 * This extends the pragṛhya rules for specific vocative contexts.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.16
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.15/index.js';

/**
 * Main pragṛhya check function - Core sutra implementation
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {Object} - Comprehensive analysis object with pragṛhya determination
 */
export function sutra1116(word, context = {}) {
  // Input validation and normalization
  if (!word || typeof word !== 'string') {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.16',
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
    const { nextWord, grammaticalCase, isVedic = false } = context;
    
    // Educational analysis object
    const analysis = {
      word: word,
      script: script,
      sutraApplied: '1.1.16',
      rule: 'सम्बुद्धौ शाकल्यस्येतावनार्षे',
      meaning: 'Vocative ओ before इति (Śākalya tradition, non-Vedic)',
      
      traditionalCommentary: {
        primary: 'सम्बुद्धिरेकवचने। तत्रापि शाकल्यस्य मते एतावन्तमात्रं प्रगृह्यमिति विशेषः। अनार्षे लौकिके काव्ये।',
        explanation: 'Vocative singular forms ending in ओ are pragṛhya before इति according to Śākalya\'s tradition, specifically in non-Vedic (classical) literature.',
        authorityReference: 'शाकल्य प्रातिशाख्यम् - Śākalya Prātiśākhya tradition'
      },
      
      modernExplanation: {
        grammaticalContext: 'Pragṛhya designation for vocative forms in specific contextual environment',
        phoneticReasoning: 'Prevents sandhi between vocative ओ and following इति to maintain clarity of address',
        functionalPurpose: 'Preserves vocative function and quotative marker distinctiveness',
        linguisticSignificance: 'Shows interaction between case function, phonetic environment, and textual tradition'
      },
      
      conditions: {
        grammaticalCase: 'Must be vocative (सम्बोधन) case',
        phonologicalEnding: 'Must end in ओ (short o vowel)',
        followingContext: 'Must be followed by इति (quotative marker)',
        textualTradition: 'Applies to non-Vedic (classical) literature only',
        authorityScope: 'According to Śākalya\'s grammatical tradition'
      },
      
      examples: {
        devanagari: [
          { word: 'रामो', context: 'before इति', result: 'प्रगृह्य', explanation: 'Vocative of राम before quotative' },
          { word: 'देवो', context: 'before इति', result: 'प्रगृह्य', explanation: 'Vocative of देव before quotative' },
          { word: 'गुरो', context: 'before इति', result: 'प्रगृह्य', explanation: 'Vocative of गुरु before quotative' }
        ],
        iast: [
          { word: 'rāmo', context: 'before iti', result: 'pragṛhya', explanation: 'Vocative of rāma before quotative' },
          { word: 'devo', context: 'before iti', result: 'pragṛhya', explanation: 'Vocative of deva before quotative' },
          { word: 'guro', context: 'before iti', result: 'pragṛhya', explanation: 'Vocative of guru before quotative' }
        ]
      },
      
      relatedSutras: {
        preceding: ['1.1.14 (Single vowel particles)', '1.1.15 (O-ending particles)'],
        following: ['1.1.17', '1.1.18', '1.1.19'],
        crossReferences: ['1.1.11 (General pragṛhya definition)'],
        integrationNote: 'Part of comprehensive pragṛhya system for Sanskrit sandhi exceptions'
      }
    };

    // Check base pragṛhya rules from previous sutras first
    const baseResult = basePragrhya(word, context);
    if (baseResult) {
      return {
        isPragrhya: true,
        sutraApplied: '1.1.16',
        confidence: 1.0,
        analysis: {
          ...analysis,
          result: 'प्रगृह्य by previous sutra rules',
          evidenceChain: 'Covered by earlier pragṛhya classification (1.1.14-1.1.15)',
          educationalNote: 'This word qualifies under previous pragṛhya rules before reaching 1.1.16'
        }
      };
    }
    
    // Check specific conditions for this sutra
    let isPragrhyaHere = false;
    let detailedReasoning = '';
    
    // Must be non-Vedic
    if (isVedic) {
      detailedReasoning = 'अनार्षे - This sutra applies only to non-Vedic literature';
    }
    // Must be vocative case
    else if (grammaticalCase !== 'vocative') {
      detailedReasoning = 'सम्बुद्धौ - Must be vocative case for this rule to apply';
    }
    // Must be followed by 'iti'
    else if (nextWord !== 'iti' && nextWord !== 'इति') {
      detailedReasoning = 'एतावन् - Must be followed by इति (quotative marker)';
    }
    // Check for final 'o' or 'ो'
    else {
      const hasCorrectEnding = script === 'Devanagari' ? 
        word.endsWith('ो') : word.endsWith('o');
      
      if (hasCorrectEnding) {
        isPragrhyaHere = true;
        detailedReasoning = 'शाकल्यस्य मते - All conditions satisfied according to Śākalya tradition';
      } else {
        detailedReasoning = 'Does not end in ओ - required phonological condition not met';
      }
    }

    return {
      isPragrhya: isPragrhyaHere,
      sutraApplied: '1.1.16',
      confidence: isPragrhyaHere ? 1.0 : 0.0,
      analysis: {
        ...analysis,
        result: isPragrhyaHere ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (not pragṛhya)',
        detailedReasoning: detailedReasoning,
        contextualAnalysis: {
          grammaticalCase: grammaticalCase || 'not specified',
          followingWord: nextWord || 'not specified',
          textualTradition: isVedic ? 'Vedic (excluded)' : 'Classical (applicable)',
          phoneticForm: script === 'Devanagari' ? 
            (word.endsWith('ो') ? 'Ends in ओ ✓' : 'Does not end in ओ ✗') :
            (word.endsWith('o') ? 'Ends in o ✓' : 'Does not end in o ✗')
        },
        educationalNote: isPragrhyaHere ? 
          'Śākalya tradition preserves vocative-quotative boundary through pragṛhya designation' :
          'Conditions for Śākalya vocative pragṛhya rule not satisfied'
      }
    };
    
  } catch (error) {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.16',
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
 * Checks if a vocative singular ending in 'o' before 'iti' is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including next word and case
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaVocativeO(word, context = {}) {
  const result = sutra1116(word, context);
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
  const result = sutra1116(word, context);
  return result.isPragrhya;
}

/**
 * Gets examples of vocative forms that are pragṛhya before 'iti'
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of example words
 */
export function getVocativeOExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['रामो', 'देवो', 'पुत्रो', 'गुरो'];
  } else {
    return ['rāmo', 'devo', 'putro', 'guro'];
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
