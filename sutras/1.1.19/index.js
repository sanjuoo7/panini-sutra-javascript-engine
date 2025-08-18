/**
 * Sutra 1.1.19: ईदूतौ च सप्तम्यर्थे (īdūtau ca saptamyarthe)
 * "The final ई and ऊ of words giving the sense of the locative case are pragṛhya."
 * 
 * This sutra extends pragṛhya rules to words ending in ī and ū when they 
 * express locative meaning.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.1.19
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isPragrhya as basePragrhya } from '../1.1.18/index.js';

/**
 * Main pragṛhya check function - Core sutra implementation
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {Object} - Comprehensive analysis object with pragṛhya determination
 */
export function sutra1119(word, context = {}) {
  // Input validation and normalization
  if (!word || typeof word !== 'string') {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.19',
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
    const { hasLocativeSense, meaning } = context;
    
    // Try to infer locative sense if not provided
    const inferredLocative = hasLocativeSense || meaning === 'locative' || hasLocativeMeaning(word);
    
    // Educational analysis object
    const analysis = {
      word: word,
      script: script,
      sutraApplied: '1.1.19',
      rule: 'ईदूतौ च सप्तम्यर्थे',
      meaning: 'Words ending in ई/ऊ with locative sense are pragṛhya',
      
      traditionalCommentary: {
        primary: 'ईकारान्ता ऊकारान्ताश्च ये पदा सप्तम्यर्थं गमयन्ति ते प्रगृह्याः। स्थानाधिकरणार्थे।',
        explanation: 'Words ending in ī (ईकारान्त) or ū (ऊकारान्त) that convey locative meaning (सप्तम्यर्थ) are designated as pragṛhya to preserve their adverbial function.',
        authorityReference: 'महाभाष्यम् - Mahābhāṣya commentary on locative-meaning preservation',
        functionalCategory: 'अधिकरणवाची - expressing location/circumstance'
      },
      
      modernExplanation: {
        grammaticalContext: 'Pragṛhya designation for locative-meaning adverbs ending in long ī/ū',
        phoneticReasoning: 'Prevents sandhi modifications that could obscure locative meaning',
        functionalPurpose: 'Preserves adverbial clarity in spatial/temporal expressions',
        linguisticSignificance: 'Shows interaction between morphology, semantics, and phonetic preservation',
        syntacticRole: 'Maintains distinctiveness of adverbial locative expressions'
      },
      
      conditions: {
        phonologicalEnding: 'Must end in ई (long ī) or ऊ (long ū)',
        semanticRequirement: 'Must express locative meaning (सप्तम्यर्थ)',
        functionalCategory: 'Typically adverbial expressions of place/time/circumstance',
        morphologicalStatus: 'Often frozen case forms or particle derivatives'
      },
      
      examples: {
        devanagari: [
          { word: 'अद्धी', meaning: 'on the road/path', result: 'प्रगृह्य', explanation: 'Locative adverb ending in ī' },
          { word: 'परी', meaning: 'around/about', result: 'प्रगृह्य', explanation: 'Circumferential locative particle' },
          { word: 'प्रभृती', meaning: 'beginning from', result: 'प्रगृह्य', explanation: 'Temporal-locative expression' },
          { word: 'कुत्र', meaning: 'where', result: 'related', explanation: 'Interrogative locative (different ending)' }
        ],
        iast: [
          { word: 'addhī', meaning: 'on the road/path', result: 'pragṛhya', explanation: 'Locative adverb ending in ī' },
          { word: 'parī', meaning: 'around/about', result: 'pragṛhya', explanation: 'Circumferential locative particle' },
          { word: 'prabhṛtī', meaning: 'beginning from', result: 'pragṛhya', explanation: 'Temporal-locative expression' }
        ]
      },
      
      semanticAnalysis: {
        locativeTypes: {
          spatial: 'Physical location expressions (अद्धी - on the path)',
          temporal: 'Time-related locations (प्रभृती - starting from)',
          circumstantial: 'Situational contexts (परी - around/about)',
          directional: 'Movement and orientation indicators'
        },
        adverbialFunction: 'Frozen locative case forms functioning as indeclinable adverbs',
        discourseMaintenance: 'Preserves clarity of spatial/temporal reference in complex sentences'
      },
      
      morphologicalInsight: {
        historicalDevelopment: 'Many ī/ū locatives are fossilized case endings',
        particleOrigin: 'Some derive from Vedic locative particles and prefixes',
        functionalShift: 'Original inflected forms → frozen adverbial expressions',
        crossCaseAnalogy: 'Similar to other pragṛhya cases preserving semantic function'
      },
      
      relatedSutras: {
        preceding: ['1.1.18 (Sacred Om particle)', '1.1.17 (ऊञ् particle)'],
        following: ['End of pragṛhya series - transition to next grammatical topic'],
        crossReferences: ['1.1.11 (General pragṛhya definition)', '1.1.14-1.1.18 (Specific pragṛhya rules)'],
        integrationNote: 'Completes comprehensive pragṛhya system covering all major Sanskrit particle types'
      }
    };

    // Check base pragṛhya rules from previous sutras first
    const baseResult = basePragrhya(word, context);
    if (baseResult) {
      return {
        isPragrhya: true,
        sutraApplied: '1.1.19',
        confidence: 1.0,
        analysis: {
          ...analysis,
          result: 'प्रगृह्य by previous sutra rules',
          evidenceChain: 'Covered by earlier pragṛhya classification (1.1.14-1.1.18)',
          educationalNote: 'This word qualifies under previous pragṛhya rules before reaching 1.1.19'
        }
      };
    }
    
    // Check specific conditions for ī/ū words with locative sense
    let isPragrhyaHere = false;
    let detailedReasoning = '';
    
    // Check phonological ending
    const hasCorrectEnding = script === 'Devanagari' ? 
      (word.endsWith('ी') || word.endsWith('ू')) : 
      (word.endsWith('ī') || word.endsWith('ū'));
    
    if (!hasCorrectEnding) {
      detailedReasoning = 'ईदूतौ - Must end in ई (long ī) or ऊ (long ū) for this rule to apply';
    }
    // Check locative meaning
    else if (!inferredLocative) {
      detailedReasoning = 'सप्तम्यर्थे - Must express locative meaning for pragṛhya designation';
    }
    // Both conditions satisfied
    else {
      isPragrhyaHere = true;
      detailedReasoning = 'ईदूतौ च सप्तम्यर्थे - Word ending in ī/ū with locative meaning qualifies as pragṛhya';
    }

    return {
      isPragrhya: isPragrhyaHere,
      sutraApplied: '1.1.19',
      confidence: isPragrhyaHere ? 1.0 : 0.0,
      analysis: {
        ...analysis,
        result: isPragrhyaHere ? 'प्रगृह्य (pragṛhya)' : 'अप्रगृह्य (not pragṛhya)',
        detailedReasoning: detailedReasoning,
        contextualAnalysis: {
          phoneticEnding: script === 'Devanagari' ? 
            (hasCorrectEnding ? 'Ends in ी/ू ✓' : 'Does not end in ी/ू ✗') :
            (hasCorrectEnding ? 'Ends in ī/ū ✓' : 'Does not end in ī/ū ✗'),
          locativeMeaning: inferredLocative ? 'Has locative sense ✓' : 'No locative sense ✗',
          semanticInference: hasLocativeSense || meaning === 'locative' ? 'Explicit context' : 
            (hasLocativeMeaning(word) ? 'Inferred from word' : 'Not detected'),
          adverbialFunction: isPragrhyaHere ? 'Spatial/temporal adverb' : 'Regular word'
        },
        educationalNote: isPragrhyaHere ? 
          'Locative-meaning ī/ū words preserve adverbial function through pragṛhya designation' :
          'Conditions for locative ī/ū pragṛhya rule not satisfied'
      }
    };
    
  } catch (error) {
    return {
      isPragrhya: false,
      sutraApplied: '1.1.19',
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
 * Checks if a word ending in ī or ū with locative sense is pragṛhya
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context including case meaning
 * @returns {boolean} - True if the word qualifies for this pragṛhya rule
 */
export function isPragrhyaIU(word, context = {}) {
  const result = sutra1119(word, context);
  return result.isPragrhya;
}

/**
 * Checks if a word has locative meaning based on common patterns
 * 
 * @param {string} word - The word to check
 * @returns {boolean} - True if the word likely has locative sense
 */
export function hasLocativeMeaning(word) {
  if (!word) {
    return false;
  }

  try {
    const script = detectScript(word);
    
    // Common locative-meaning words ending in ī/ū
    const locativeWords = {
      iast: [
        'addhī', 'parī', 'prabhṛtī', 'yāvat', 'tāvat',
        'kadā', 'tada', 'kutra', 'tatra', 'yatra', 'sarvatra'
      ],
      devanagari: [
        'अद्धी', 'परी', 'प्रभृती', 'यावत्', 'तावत्',
        'कदा', 'तदा', 'कुत्र', 'तत्र', 'यत्र', 'सर्वत्र'
      ]
    };
    
    if (script === 'Devanagari') {
      return locativeWords.devanagari.includes(word) ||
             (word.endsWith('ी') && (word.includes('त्र') || word.includes('दा'))) ||
             (word.endsWith('ू') && word.includes('यावत्'));
    } else {
      return locativeWords.iast.includes(word) ||
             (word.endsWith('ī') && (word.includes('tr') || word.includes('dā'))) ||
             (word.endsWith('ū') && word.includes('yāvat'));
    }
  } catch (error) {
    return false;
  }
}

/**
 * Main pragṛhya check that includes this sutra's rule
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if the word is pragṛhya
 */
export function isPragrhya(word, context = {}) {
  const result = sutra1119(word, context);
  return result.isPragrhya;
}

/**
 * Gets examples of ī/ū words with locative sense
 * 
 * @param {string} script - Script preference ('IAST' or 'Devanagari')
 * @returns {string[]} - Array of example words
 */
export function getLocativeIUExamples(script = 'IAST') {
  if (script === 'Devanagari') {
    return ['अद्धी', 'परी', 'प्रभृती', 'कुत्र', 'तत्र', 'यत्र'];
  } else {
    return ['addhī', 'parī', 'prabhṛtī', 'kutra', 'tatra', 'yatra'];
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
