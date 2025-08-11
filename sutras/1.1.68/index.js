/**
 * Sutra 1.1.68: स्वं रूपं शब्दस्याशब्दसंज्ञा (svaṃ rūpaṃ śabdasyā-śabdasañjñā)
 * 
 * Text: स्वं रूपं शब्दस्याशब्दसंज्ञा
 * Translation: The own form of a word is the name of the word when it is not a word.
 * 
 * This fundamental sutra establishes the principle that when a linguistic element 
 * (like a phoneme, morpheme, or grammatical term) is mentioned in grammatical 
 * discussion, it refers to itself in its own form (sva-rūpa) rather than its 
 * meaning or grammatical function. This is the foundational principle of 
 * metalinguistic reference in Sanskrit grammar.
 * 
 * The sutra clarifies the distinction between:
 * 1. śabda (word) - when used with meaning/function
 * 2. aśabda-saṃjñā - when used as a mere designation/name without semantic function
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Checks if a given term is being used in its sva-rūpa (own form) context,
 * i.e., as a metalinguistic designation rather than with its semantic meaning.
 * 
 * @param {string} term - The term to analyze
 * @param {Object} [context={}] - Context indicating usage type
 * @returns {boolean} True if term is used in sva-rūpa context, false otherwise
 */
function isSvaRupaUsage(term, context = {}) {
  if (!term || typeof term !== 'string') {
    return false;
  }

  // Check various indicators of metalinguistic usage
  const metalinguisticIndicators = [
    context.isGrammaticalDiscussion,
    context.isPhonemeReference,
    context.isMorphemeReference,
    context.isTechnicalTerm,
    context.isQuoted,
    context.quotedTerm,  // Alternative naming
    context.isInGrammaticalRule,
    context.metalinguistic === true
  ];

  return metalinguisticIndicators.some(indicator => indicator === true);
}

/**
 * Analyzes whether a word should be interpreted as śabda (meaningful word) 
 * or aśabda-saṃjñā (mere designation) according to Sutra 1.1.68.
 * 
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Context of usage
 * @returns {Object} Analysis result with interpretation details
 */
function analyzeWordUsage(word, context = {}) {
  const result = {
    word: word,
    script: detectScript(word),
    isSvaRupa: false,
    interpretationType: 'semantic', // 'semantic' or 'metalinguistic'
    usageContext: 'normal',
    confidence: 0,
    reasoning: [],
    linguisticNotes: [],
    sutraReference: '1.1.68'
  };

  if (!word || typeof word !== 'string') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    return result;
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid && !context.allowTechnicalTerms) {
    result.reasoning.push(`Invalid Sanskrit word: ${validation.message}`);
    return result;
  }

  // Analyze for sva-rūpa (metalinguistic) usage
  const svaRupaUsage = isSvaRupaUsage(word, context);

  if (svaRupaUsage) {
    result.isSvaRupa = true;
    result.interpretationType = 'metalinguistic';
    result.usageContext = 'grammatical-discussion';
    result.confidence = 0.9;
    result.reasoning.push('Word used in metalinguistic context');
    result.reasoning.push('Refers to its own form rather than meaning');
    result.linguisticNotes.push('अशब्दसंज्ञा - used as mere designation');
    result.linguisticNotes.push('स्वरूप - refers to itself in its own form');
    
    // Adjust confidence for specific contexts
    if (context.quotedTerm) {
      result.confidence = 1.0;
      result.reasoning.push('Term appears in quotes/citation');
    }
  } else {
    result.reasoning.push('Word used in normal semantic context');
    result.linguisticNotes.push('शब्द - used with its regular meaning/function');
    result.confidence = 0.8;
  }

  // Additional analysis based on context
  if (context.inVyakaranaShastra && !svaRupaUsage) {
    result.reasoning.push('Context: Grammatical treatise (व्याकरणशास्त्र)');
    result.reasoning.push('In grammatical context, likely metalinguistic usage');
    result.isSvaRupa = true;
    result.interpretationType = 'metalinguistic';
    result.confidence = 0.95;
    result.linguisticNotes = ['अशब्दसंज्ञा - used as mere designation', 'स्वरूप - refers to itself in its own form'];
  }

  return result;
}

/**
 * Determines the appropriate interpretation of a word based on Sutra 1.1.68.
 * Returns whether it should be understood as śabda or aśabda-saṃjñā.
 * 
 * @param {string} word - The word to interpret
 * @param {Object} [context={}] - Context of usage
 * @returns {string} 'shabda' (semantic usage) or 'ashabda-samjna' (metalinguistic usage)
 */
function getWordInterpretation(word, context = {}) {
  const analysis = analyzeWordUsage(word, context);
  return analysis.interpretationType === 'metalinguistic' ? 'ashabda-samjna' : 'shabda';
}

/**
 * Checks if a term requires sva-rūpa interpretation according to context.
 * 
 * @param {string} term - The term to check
 * @param {Object} [context={}] - Context information
 * @returns {boolean} True if sva-rūpa interpretation is required
 */
function requiresSvaRupaInterpretation(term, context = {}) {
  const analysis = analyzeWordUsage(term, context);
  return analysis.isSvaRupa;
}

/**
 * Provides examples of sva-rūpa vs semantic usage patterns.
 * 
 * @returns {Object} Examples demonstrating the sutra's application
 */
function getSvaRupaExamples() {
  return {
    metalinguistic: {
      description: 'अशब्दसंज्ञा - Terms used in their own form as designations',
      examples: [
        {
          term: 'अ',
          context: 'In grammar: "अ इत्यस्य वृद्धिः आ"',
          interpretation: 'The letter अ itself, not the meaning',
          usage: 'metalinguistic'
        },
        {
          term: 'गो',
          context: 'In grammar: "गोरुत्तरपदमात्मनेपदे"',
          interpretation: 'The word गो as a grammatical element',
          usage: 'metalinguistic'
        },
        {
          term: 'सुप्',
          context: 'In grammar: "सुप्तिङन्तं पदम्"',
          interpretation: 'The suffix सुप् as a grammatical term',
          usage: 'metalinguistic'
        }
      ]
    },
    semantic: {
      description: 'शब्द - Terms used with their regular meaning',
      examples: [
        {
          term: 'गो',
          context: 'In sentence: "गौः दुग्धं ददाति"',
          interpretation: 'The cow (animal)',
          usage: 'semantic'
        },
        {
          term: 'राम',
          context: 'In sentence: "रामो वनं गच्छति"',
          interpretation: 'Rama (person)',
          usage: 'semantic'
        }
      ]
    }
  };
}

// Export all functions
export {
  isSvaRupaUsage,
  analyzeWordUsage,
  getWordInterpretation,
  requiresSvaRupaInterpretation,
  getSvaRupaExamples
};
