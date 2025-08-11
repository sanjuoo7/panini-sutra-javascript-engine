/**
 * Metalinguistic Analysis Utilities
 * 
 * This module provides utilities for analyzing when Sanskrit terms are used
 * metalinguistically (स्वरूप/sva-rūpa) versus semantically (शब्द/śabda).
 * Based on Sutra 1.1.68: स्वं रूपं शब्दस्याशब्दसंज्ञा
 * 
 * Used by: Sutra 1.1.68, and potentially other sutras dealing with 
 * grammatical discussion and metalinguistic reference.
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * Traditional contexts that indicate metalinguistic usage
 */
export const METALINGUISTIC_CONTEXTS = {
  // Direct metalinguistic indicators
  grammaticalDiscussion: 'isGrammaticalDiscussion',
  phonemeReference: 'isPhonemeReference', 
  morphemeReference: 'isMorphemeReference',
  technicalTerm: 'isTechnicalTerm',
  quotedTerm: 'isQuoted',
  
  // Context-based indicators
  inGrammaticalRule: 'isInGrammaticalRule',
  inVyakaranaShastra: 'inVyakaranaShastra',
  metalinguistic: 'metalinguistic',
  
  // Alternative naming patterns
  quotedTermAlt: 'quotedTerm'
};

/**
 * Traditional markers that indicate semantic (non-metalinguistic) usage
 */
export const SEMANTIC_USAGE_MARKERS = {
  // Meaning-based usage
  withMeaning: 'withMeaning',
  semanticContext: 'semanticContext',
  narrativeUsage: 'narrativeUsage',
  
  // Functional usage
  functionalUsage: 'functionalUsage',
  practicalApplication: 'practicalApplication'
};

/**
 * Confidence levels for metalinguistic analysis
 */
export const CONFIDENCE_LEVELS = {
  VERY_HIGH: 1.0,    // Quoted/cited terms
  HIGH: 0.95,        // In grammatical treatise context
  MEDIUM_HIGH: 0.9,  // Clear metalinguistic indicators
  MEDIUM: 0.8,       // Normal semantic usage
  LOW: 0.5,          // Uncertain context
  VERY_LOW: 0.2      // Invalid or unclear input
};

/**
 * Checks if a given term is being used in its sva-rūpa (own form) context,
 * i.e., as a metalinguistic designation rather than with its semantic meaning.
 * 
 * @param {string} term - The term to analyze
 * @param {Object} [context={}] - Context indicating usage type
 * @returns {boolean} True if term is used in sva-rūpa context, false otherwise
 */
export function isSvaRupaUsage(term, context = {}) {
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
 * Determines the interpretation type for a given term
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Context of usage
 * @returns {string} 'metalinguistic' or 'semantic'
 */
export function getInterpretationType(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return 'semantic';
  }

  // Check for sva-rūpa usage
  const svaRupaUsage = isSvaRupaUsage(word, context);
  
  if (svaRupaUsage) {
    return 'metalinguistic';
  }

  // Special case: grammatical treatise context
  if (context.inVyakaranaShastra && !hasSemanticOverride(context)) {
    return 'metalinguistic';
  }

  return 'semantic';
}

/**
 * Checks if context has explicit semantic usage override
 * @param {Object} context - Context object
 * @returns {boolean} True if semantic usage is explicitly indicated
 */
function hasSemanticOverride(context) {
  return !!(
    context.withMeaning ||
    context.semanticContext ||
    context.narrativeUsage ||
    context.functionalUsage ||
    context.practicalApplication
  );
}

/**
 * Analyzes whether a word should be interpreted as śabda (meaningful word) 
 * or aśabda-saṃjñā (mere designation) according to Sutra 1.1.68.
 * 
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Context of usage
 * @returns {Object} Analysis result with interpretation details
 */
export function analyzeWordUsage(word, context = {}) {
  const result = {
    word: word,
    script: detectScript(word),
    isSvaRupa: false,
    interpretationType: 'semantic', // 'semantic' or 'metalinguistic'
    usageContext: 'normal',
    confidence: CONFIDENCE_LEVELS.MEDIUM,
    reasoning: [],
    linguisticNotes: [],
    sutraReference: '1.1.68'
  };

  if (!word || typeof word !== 'string') {
    result.reasoning.push('Invalid input: word must be a non-empty string');
    result.confidence = CONFIDENCE_LEVELS.VERY_LOW;
    return result;
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid && !context.allowTechnicalTerms) {
    result.reasoning.push(`Invalid Sanskrit word: ${validation.message}`);
    result.confidence = CONFIDENCE_LEVELS.LOW;
    return result;
  }

  // Analyze for sva-rūpa (metalinguistic) usage
  const interpretationType = getInterpretationType(word, context);
  const svaRupaUsage = interpretationType === 'metalinguistic';

  if (svaRupaUsage) {
    result.isSvaRupa = true;
    result.interpretationType = 'metalinguistic';
    result.usageContext = 'grammatical-discussion';
    result.confidence = CONFIDENCE_LEVELS.MEDIUM_HIGH;
    result.reasoning.push('Word used in metalinguistic context');
    result.reasoning.push('Refers to its own form rather than meaning');
    result.linguisticNotes.push('अशब्दसंज्ञा - used as mere designation');
    result.linguisticNotes.push('स्वरूप - refers to itself in its own form');
    
    // Adjust confidence for specific contexts
    if (context.quotedTerm || context.isQuoted) {
      result.confidence = CONFIDENCE_LEVELS.VERY_HIGH;
      result.reasoning.push('Term appears in quotes/citation');
    }
    
    if (context.inVyakaranaShastra) {
      result.confidence = CONFIDENCE_LEVELS.HIGH;
      result.reasoning.push('Context: Grammatical treatise (व्याकरणशास्त्र)');
    }
  } else {
    result.reasoning.push('Word used in normal semantic context');
    result.linguisticNotes.push('शब्द - used with its regular meaning/function');
    result.confidence = CONFIDENCE_LEVELS.MEDIUM;
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
export function getWordInterpretation(word, context = {}) {
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
export function requiresSvaRupaInterpretation(term, context = {}) {
  const analysis = analyzeWordUsage(term, context);
  return analysis.isSvaRupa;
}

/**
 * Provides examples of sva-rūpa vs semantic usage patterns.
 * 
 * @returns {Object} Examples demonstrating metalinguistic analysis
 */
export function getMetalinguisticExamples() {
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

/**
 * Analyzes metalinguistic features of a term in context
 * @param {string} term - The term to analyze
 * @param {Object} [context={}] - Context information
 * @returns {Object} Detailed metalinguistic analysis
 */
export function analyzeMetalinguisticFeatures(term, context = {}) {
  if (!term || typeof term !== 'string') {
    return {
      isValid: false,
      error: 'Invalid term input'
    };
  }

  const wordAnalysis = analyzeWordUsage(term, context);
  
  return {
    isValid: true,
    term: term,
    script: wordAnalysis.script,
    
    // Core analysis
    isMetalinguistic: wordAnalysis.isSvaRupa,
    interpretationType: wordAnalysis.interpretationType,
    confidence: wordAnalysis.confidence,
    
    // Context analysis
    contextType: wordAnalysis.usageContext,
    hasGrammaticalContext: !!(context.inVyakaranaShastra || context.isGrammaticalDiscussion),
    hasQuotationMarkers: !!(context.isQuoted || context.quotedTerm),
    
    // Detailed reasoning
    reasoning: wordAnalysis.reasoning,
    linguisticNotes: wordAnalysis.linguisticNotes,
    
    // Reference
    sutraReference: '1.1.68'
  };
}
