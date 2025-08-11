/**
 * Sutra 1.2.28: अचश्च (acaśaca)
 * 
 * Sanskrit: अचश्च
 * Transliteration: acaśaca  
 * Translation: "And of vowels (also)"
 * 
 * This is a परिभाषा (interpretive rule) that clarifies the scope of the previous 
 * sutra 1.2.27 (ऊकालोऽज्झ्रस्वदीर्घप्लुतः). It establishes that when grammatical 
 * terms like ह्रस्व (short), दीर्घ (long), and प्लुत (protracted) are used in 
 * Sanskrit grammar, they should be understood to refer specifically to vowels (अच्) only.
 * 
 * This prevents ambiguity about whether duration-based classifications apply to 
 * consonants and ensures that the temporal measurement system established in 1.2.27 
 * is properly scoped to vowels.
 * 
 * Key Principles:
 * 1. Duration terms (ह्रस्व, दीर्घ, प्लुत) apply only to vowels
 * 2. Consonants are not subject to duration-based classification
 * 3. This clarifies the semantic scope of grammatical terminology
 * 
 * Type: परिभाषा (interpretive rule)
 * Scope: Meta-grammatical - defines the scope of duration terminology
 * Dependencies: Sutra 1.2.27 (ऊकालोऽज्झ्रस्वदीर्घप्लुतः)
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.28
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { isVowel, isConsonant } from '../sanskrit-utils/classification.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';

// Import duration analysis from the related sutra 1.2.27
import { 
  isHrasvaVowel, 
  isDirghaVowel, 
  isPlutaVowel,
  getVowelDuration 
} from '../1.2.27/index.js';

/**
 * Duration terminology that applies only to vowels
 */
const DURATION_TERMS = {
  sanskrit: {
    hrasva: 'ह्रस्व',
    dirgha: 'दीर्घ', 
    pluta: 'प्लुत'
  },
  english: {
    hrasva: 'short',
    dirgha: 'long',
    pluta: 'protracted'
  },
  technical: ['ह्रस्व', 'दीर्घ', 'प्लुत', 'short', 'long', 'protracted', 'hrasva', 'dirgha', 'pluta']
};

/**
 * Checks if a phoneme is eligible for duration classification
 * According to sutra 1.2.28, only vowels can have duration properties
 * 
 * @param {string} phoneme - Phoneme to check
 * @returns {boolean} True if phoneme can have duration classification
 */
export function canHaveDurationProperty(phoneme) {
  if (!phoneme || typeof phoneme !== 'string') {
    return false;
  }

  return isVowel(phoneme);
}

/**
 * Validates if a duration term is being applied correctly
 * Ensures duration terms are only used with vowels, not consonants
 * 
 * @param {string} phoneme - The phoneme being classified
 * @param {string} durationType - Duration classification being applied
 * @returns {Object} Validation result
 */
export function validateDurationClassification(phoneme, durationType) {
  const result = {
    isValid: false,
    phoneme: phoneme,
    durationType: durationType,
    reason: '',
    correctScope: 'vowels only'
  };

  if (!phoneme || !durationType) {
    result.reason = 'Missing phoneme or duration type';
    return result;
  }

  // Check if duration term is recognized
  if (!DURATION_TERMS.technical.includes(durationType.toLowerCase())) {
    result.reason = `"${durationType}" is not a recognized duration term`;
    return result;
  }

  // Check if phoneme is a vowel (as required by sutra 1.2.28)
  if (!isVowel(phoneme)) {
    if (isConsonant(phoneme)) {
      result.reason = `Duration term "${durationType}" cannot be applied to consonant "${phoneme}" - applies to vowels only (अचश्च)`;
    } else {
      result.reason = `Duration term "${durationType}" cannot be applied to "${phoneme}" - applies to vowels only (अचश्च)`;
    }
    return result;
  }

  result.isValid = true;
  result.reason = `Valid: "${durationType}" correctly applied to vowel "${phoneme}"`;
  return result;
}

/**
 * Analyzes duration properties of phonemes in a word
 * Applies sutra 1.2.28 to ensure duration analysis is limited to vowels
 * 
 * @param {string} word - Word to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Analysis result
 */
export function analyzeDurationScope(word, options = {}) {
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.error}`);
  }

  const script = detectScript(word);
  const tokenResult = tokenizePhonemes(word);
  const phonemes = tokenResult.phonemes;
  
  const analysis = {
    word: word,
    script: script,
    totalPhonemes: phonemes.length,
    vowels: [],
    consonants: [],
    durationEligible: [],
    durationIneligible: [],
    sutraApplication: '1.2.28'
  };

  // Categorize phonemes according to sutra 1.2.28
  for (const phoneme of phonemes) {
    const phonemeAnalysis = {
      phoneme: phoneme,
      type: isVowel(phoneme) ? 'vowel' : (isConsonant(phoneme) ? 'consonant' : 'other'),
      canHaveDuration: canHaveDurationProperty(phoneme)
    };

    if (phonemeAnalysis.type === 'vowel') {
      analysis.vowels.push(phoneme);
      analysis.durationEligible.push(phoneme);
      
      // Add duration analysis for vowels
      if (isHrasvaVowel(phoneme)) {
        phonemeAnalysis.duration = 'ह्रस्व';
        phonemeAnalysis.ukalaUnits = 1;
      } else if (isDirghaVowel(phoneme)) {
        phonemeAnalysis.duration = 'दीर्घ';
        phonemeAnalysis.ukalaUnits = 2;
      } else if (isPlutaVowel && isPlutaVowel(phoneme)) {
        phonemeAnalysis.duration = 'प्लुत';
        phonemeAnalysis.ukalaUnits = 3;
      }
    } else if (phonemeAnalysis.type === 'consonant') {
      analysis.consonants.push(phoneme);
      analysis.durationIneligible.push(phoneme);
    }
  }

  // Calculate scope statistics
  analysis.scopeStatistics = {
    vowelPercentage: Math.round((analysis.vowels.length / analysis.totalPhonemes) * 100),
    consonantPercentage: Math.round((analysis.consonants.length / analysis.totalPhonemes) * 100),
    durationApplicableCount: analysis.durationEligible.length,
    durationInapplicableCount: analysis.durationIneligible.length
  };

  return analysis;
}

/**
 * Validates grammatical rule applications that involve duration terms
 * Ensures compliance with sutra 1.2.28 scope restrictions
 * 
 * @param {string} rule - Grammatical rule being applied
 * @param {string} target - Target phoneme or sequence
 * @returns {Object} Validation result
 */
export function validateGrammaticalRuleScope(rule, target) {
  const result = {
    isValid: false,
    rule: rule,
    target: target,
    compliesWithSutra1228: false,
    violations: [],
    recommendations: []
  };

  if (!rule || !target) {
    result.violations.push('Missing rule or target');
    return result;
  }

  const ruleText = rule.toLowerCase();
  const hasDurationTerm = DURATION_TERMS.technical.some(term => 
    ruleText.includes(term.toLowerCase())
  );

  if (!hasDurationTerm) {
    result.isValid = true;
    result.compliesWithSutra1228 = true;
    result.recommendations.push('No duration terms found - sutra 1.2.28 not applicable');
    return result;
  }

  // Check if rule properly scopes duration terms to vowels
  const tokenResult = tokenizePhonemes(target);
  const phonemes = tokenResult.phonemes;
  let hasVowelTargets = false;
  let hasNonVowelTargets = false;

  for (const phoneme of phonemes) {
    if (isVowel(phoneme)) {
      hasVowelTargets = true;
    } else if (isConsonant(phoneme)) {
      hasNonVowelTargets = true;
      result.violations.push(`Duration term in rule applied to consonant "${phoneme}"`);
    }
  }

  if (hasVowelTargets && !hasNonVowelTargets) {
    result.isValid = true;
    result.compliesWithSutra1228 = true;
    result.recommendations.push('Rule correctly applies duration terms to vowels only');
  } else if (hasNonVowelTargets) {
    result.compliesWithSutra1228 = false;
    result.recommendations.push('Modify rule to apply duration terms to vowels (अच्) only, as per sutra 1.2.28');
  }

  return result;
}

/**
 * Main function implementing Sutra 1.2.28
 * Provides interpretation and validation for the scope of duration terminology
 * 
 * @param {string} input - Input word, phoneme, or rule to analyze
 * @param {Object} context - Context for analysis
 * @returns {Object} Complete analysis result
 */
export function sutra1228(input, context = {}) {
  const validation = validateSanskritWord(input);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.error}`);
  }

  const script = detectScript(input);
  const analysisType = context.type || 'scope_analysis';

  const result = {
    input: input,
    script: script,
    sutra: '1.2.28',
    sutraText: 'अचश्च',
    rule: 'Duration terms (ह्रस्व, दीर्घ, प्लुत) apply to vowels only',
    analysis: null,
    compliance: null,
    interpretation: null
  };

  switch (analysisType) {
    case 'scope_analysis':
      result.analysis = analyzeDurationScope(input, context);
      result.interpretation = `Analysis shows ${result.analysis.durationEligible.length} phonemes eligible for duration classification (vowels) and ${result.analysis.durationIneligible.length} ineligible (consonants)`;
      break;

    case 'validation':
      if (context.durationType) {
        result.compliance = validateDurationClassification(input, context.durationType);
        result.interpretation = result.compliance.reason;
      } else {
        throw new Error('Duration type required for validation analysis');
      }
      break;

    case 'rule_validation':
      if (context.rule) {
        result.compliance = validateGrammaticalRuleScope(context.rule, input);
        result.interpretation = `Rule compliance: ${result.compliance.compliesWithSutra1228 ? 'PASSED' : 'FAILED'}`;
      } else {
        throw new Error('Rule text required for rule validation analysis');
      }
      break;

    default:
      result.analysis = analyzeDurationScope(input, context);
      result.interpretation = `Default scope analysis completed for "${input}"`;
  }

  // Add practical application guidance
  result.guidance = {
    principle: 'Duration terms (ह्रस्व, दीर्घ, प्लुत) apply only to vowels (अच्)',
    application: 'When interpreting Sanskrit grammatical rules, restrict duration classifications to vowels',
    examples: {
      correct: 'ह्रस्व vowel अ, दीर्घ vowel आ',
      incorrect: 'ह्रस्व consonant क् (not applicable)'
    }
  };

  return result;
}

export default sutra1228;
