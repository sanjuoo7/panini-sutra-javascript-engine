import { 
  VIDHI_TYPES,
  SCOPE_PATTERNS,
  TRADITIONAL_VIDHI_EXAMPLES,
  isWithinVidhiScope,
  analyzeVidhiScope,
  getVidhiScopeBoundary,
  getVidhiScopeExamples,
  checkSpecificationMatch,
  isSuffixSpecification,
  isPhonemeClassSpecification,
  isMorphologicalSpecification,
  isCategorySpecification
} from '../sanskrit-utils/rule-scope-analysis.js';

/**
 * Sutra 1.1.72: येन विधिस्तदन्तस्य
 * yena vidhis tadantasya
 * 
 * "The rule/operation (विधि) by which [something is prescribed] 
 * applies to that which ends with it (तदन्तस्य)."
 * 
 * This sutra establishes the principle of scope determination for 
 * grammatical rules - the domain of a rule extends to elements 
 * that end with the specified component.
 */

// Re-export shared constants for backward compatibility
export { VIDHI_TYPES, SCOPE_PATTERNS, TRADITIONAL_VIDHI_EXAMPLES };

/**
 * Main function implementing Sutra 1.1.72 using shared utilities
 * @param {string} vidhiSpecification - The rule specification
 * @param {string[]} candidateWords - Words to check against the rule
 * @param {Object} context - Additional context
 * @returns {Object} Complete scope analysis
 */
export function sutra1_1_72(vidhiSpecification, candidateWords = [], context = {}) {
  // Input validation
  if (!vidhiSpecification || typeof vidhiSpecification !== 'string') {
    throw new Error('विधि specification must be a valid string');
  }

  if (!Array.isArray(candidateWords)) {
    throw new Error('Candidate words must be an array');
  }

  // Use shared scope analysis utility
  const analysis = analyzeVidhiScope(vidhiSpecification, candidateWords, context);

  return {
    ...analysis,
    sutraReference: '1.1.72',
    principle: 'येन विधिस्तदन्तस्य - Rule applies to that which ends with the specified element',
    traditionalFormulation: 'यत् अन्तेन सह एतत् तदन्तम्',
    implementation: 'shared-utility-based'
  };
}

/**
 * Determines if a word falls within the scope of a विधि (rule) using shared utility
 * @param {string} word - The word to check
 * @param {string} vidhiSpecification - The rule specification
 * @param {Object} context - Context for analysis
 * @returns {boolean} True if word is within rule scope
 */
export function isWithinScope(word, vidhiSpecification, context = {}) {
  return isWithinVidhiScope(word, vidhiSpecification, context);
}

/**
 * Analyzes the scope of a विधि (grammatical rule) using shared utility
 * @param {string} vidhiSpecification - The rule specification
 * @param {string[]} candidateWords - Words to check against the rule
 * @param {Object} context - Context for analysis
 * @returns {Object} Analysis result with scope information
 */
export function analyzeScope(vidhiSpecification, candidateWords = [], context = {}) {
  return analyzeVidhiScope(vidhiSpecification, candidateWords, context);
}

/**
 * Determines the scope boundary for a विधि specification using shared utility
 * @param {string} specification - The विधि specification
 * @param {Object} context - Context information
 * @returns {Object} Scope boundary information
 */
export function getScopeBoundary(specification, context = {}) {
  return getVidhiScopeBoundary(specification, context);
}

/**
 * Provides traditional examples demonstrating Sutra 1.1.72 using shared utility
 * @returns {Object} Examples of विधि scope application
 */
export function getExamples() {
  return getVidhiScopeExamples();
}

/**
 * Checks if a word matches a specification pattern using shared utility
 * @param {string} word - The word to check
 * @param {string} specification - The rule specification
 * @param {Object} context - Context information
 * @returns {boolean} True if word matches specification
 */
export function matchesSpecification(word, specification, context = {}) {
  return checkSpecificationMatch(word, specification, context);
}

// Re-export shared functions for backward compatibility
export { 
  isWithinVidhiScope,
  analyzeVidhiScope,
  getVidhiScopeBoundary,
  checkSpecificationMatch,
  isSuffixSpecification,
  isPhonemeClassSpecification,
  isMorphologicalSpecification,
  isCategorySpecification,
  getVidhiScopeExamples
};

export default sutra1_1_72;
