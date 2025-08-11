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

import { 
  isSvaRupaUsage,
  analyzeWordUsage,
  getWordInterpretation,
  requiresSvaRupaInterpretation,
  getMetalinguisticExamples
} from '../sanskrit-utils/index.js';

/**
 * Tests if a word requires metalinguistic interpretation according to Sutra 1.1.68.
 * 
 * @param {string} word - The word to test
 * @param {Object} [context={}] - Context of usage
 * @returns {Object} Test result with detailed analysis
 */
function testSvaRupaRule(word, context = {}) {
  const analysis = analyzeWordUsage(word, context);
  
  return {
    word,
    applies: analysis.isSvaRupa,
    interpretation: analysis.interpretationType,
    confidence: analysis.confidence,
    reason: analysis.reasoning.join('. '),
    linguisticNotes: analysis.linguisticNotes,
    usageContext: analysis.usageContext,
    sutraReference: '1.1.68',
    technicalSummary: `${word} should be interpreted as ${analysis.interpretationType === 'metalinguistic' ? 'अशब्दसंज्ञा (mere designation)' : 'शब्द (meaningful word)'}`
  };
}

// Export shared utility functions directly
export {
  isSvaRupaUsage,
  analyzeWordUsage,
  getWordInterpretation,
  requiresSvaRupaInterpretation,
  getMetalinguisticExamples as getSvaRupaExamples,
  testSvaRupaRule
};

// Main sutra function for default export
export default function svaRupaShabbaSamjna(word, context = {}) {
  return analyzeWordUsage(word, context);
}
