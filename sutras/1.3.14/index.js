/**
 * Sutra 1.3.14: कर्त्तरि कर्म्मव्यतिहारे (kartari karmaṇi vyatihāre)
 * "In denoting the agent, when reciprocity of action is to be expressed, 
 * the affixes of the ātmanepada are employed."
 * 
 * This sutra establishes that when reciprocal action (vyatihāra) is expressed,
 * ātmanepada endings should be used instead of parasmaipada endings.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.14
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada should be used based on reciprocal action context
 * @param {string} verb - The Sanskrit verb form or root
 * @param {Object} context - Analysis context
 * @param {string} context.action - Type of action ('reciprocal', 'mutual', etc.)
 * @param {Array} context.agents - Multiple agents involved
 * @param {string} context.meaning - Intended meaning
 * @param {boolean} context.includeAnalysis - Include detailed analysis
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineReciprocalAtmanepada(verb, context = {}) {
  // Input validation
  if (!verb || typeof verb !== 'string') {
    return {
      success: false,
      error: 'Invalid verb input',
      verb: verb
    };
  }

  try {
    // Detect script and validate
    const script = detectScript(verb);
    if (script === 'Unknown' && verb.length > 0) {
      // For test cases, assume IAST if no clear script detected
      // but continue processing
    }

    const validationResult = validateSanskritWord(verb);
    if (!validationResult.isValid && script !== 'Unknown') {
      return {
        success: false,
        error: `Invalid Sanskrit verb: ${validationResult.error}`,
        verb: verb
      };
    }

    // Analyze reciprocal action context
    const reciprocalAnalysis = analyzeReciprocalContext(verb, context, script);
    
    // Determine ātmanepada usage
    const voiceAssignment = determineVoiceAssignment(reciprocalAnalysis, context);
    
    return {
      success: true,
      verb: verb,
      script: script,
      isAtmanepada: voiceAssignment.useAtmanepada,
      reason: voiceAssignment.reason,
      confidence: voiceAssignment.confidence,
      reciprocalAnalysis: context.includeAnalysis ? reciprocalAnalysis : undefined,
      rule: '1.3.14',
      context: context
    };

  } catch (error) {
    return {
      success: false,
      error: `Analysis failed: ${error.message}`,
      verb: verb
    };
  }
}

/**
 * Analyzes the context for reciprocal action indicators
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} Reciprocal analysis result
 */
function analyzeReciprocalContext(verb, context, script) {
  const analysis = {
    hasReciprocalAction: false,
    reciprocalIndicators: [],
    agentCount: 0,
    mutualityStrength: 0,
    contextualEvidence: []
  };

  // Check for explicit reciprocal action indication
  if (context.action) {
    const reciprocalActions = ['reciprocal', 'mutual', 'interchange', 'vyatihāra', 'व्यतिहार'];
    if (reciprocalActions.some(action => 
        context.action.toLowerCase().includes(action.toLowerCase()))) {
      analysis.hasReciprocalAction = true;
      analysis.reciprocalIndicators.push({
        type: 'explicit_context',
        value: context.action,
        strength: 0.9
      });
      analysis.mutualityStrength += 0.9;
    }
  }

  // Check for multiple agents (required for reciprocal action)
  if (context.agents && Array.isArray(context.agents)) {
    analysis.agentCount = context.agents.length;
    if (analysis.agentCount >= 2) {
      analysis.reciprocalIndicators.push({
        type: 'multiple_agents',
        value: analysis.agentCount,
        strength: 0.4  // Reduced from 0.6
      });
      analysis.mutualityStrength += 0.4;
    }
  }

  // Check for reciprocal meaning indicators in both meaning and action fields
  const textToCheck = [context.meaning, context.action].filter(Boolean);
  for (const text of textToCheck) {
    const reciprocalMeanings = [
      'each other', 'one another', 'mutually', 'together',
      'एक दूसरे', 'परस्पर', 'अन्योन्य'
    ];
    for (const meaning of reciprocalMeanings) {
      if (text.toLowerCase().includes(meaning.toLowerCase())) {
        analysis.reciprocalIndicators.push({
          type: 'meaning_based',
          value: meaning,
          strength: 0.5
        });
        analysis.mutualityStrength += 0.5;
        break;
      }
    }
  }

  // Analyze verb for inherent reciprocal potential
  const verbAnalysis = analyzeVerbReciprocality(verb, script);
  if (verbAnalysis.hasReciprocalPotential) {
    analysis.reciprocalIndicators.push({
      type: 'verb_inherent',
      value: verbAnalysis.reciprocalPatterns,
      strength: verbAnalysis.strength
    });
    analysis.mutualityStrength += verbAnalysis.strength;
  }

  // Cap mutuality strength at 1.0
  analysis.mutualityStrength = Math.min(analysis.mutualityStrength, 1.0);
  
  // Final determination: need sufficient evidence for reciprocal action
  if (analysis.mutualityStrength > 0.6 || 
      (analysis.agentCount >= 2 && analysis.mutualityStrength > 0.5)) {
    analysis.hasReciprocalAction = true;
  }
  
  return analysis;
}

/**
 * Analyzes verb for inherent reciprocal action potential
 * @param {string} verb - Sanskrit verb
 * @param {string} script - Script type
 * @returns {Object} Verb reciprocality analysis
 */
function analyzeVerbReciprocality(verb, script) {
  const analysis = {
    hasReciprocalPotential: false,
    reciprocalPatterns: [],
    strength: 0
  };

  // Common verbs that can express reciprocal action
  const reciprocalVerbs = {
    // Motion verbs
    'gam': { pattern: 'motion', strength: 0.4 }, // go (reduced from 0.6)
    'गम्': { pattern: 'motion', strength: 0.4 },
    'cal': { pattern: 'motion', strength: 0.3 }, // move (reduced from 0.5)
    'चल्': { pattern: 'motion', strength: 0.3 },
    
    // Contact/interaction verbs
    'spṛś': { pattern: 'contact', strength: 0.6 }, // touch (reduced from 0.8)
    'स्पृश्': { pattern: 'contact', strength: 0.6 },
    'grah': { pattern: 'contact', strength: 0.5 }, // grasp (reduced from 0.7)
    'ग्रह्': { pattern: 'contact', strength: 0.5 },
    
    // Communication verbs
    'vad': { pattern: 'communication', strength: 0.5 }, // speak (reduced from 0.7)
    'वद्': { pattern: 'communication', strength: 0.5 },
    'brū': { pattern: 'communication', strength: 0.4 }, // tell (reduced from 0.6)
    'ब्रू': { pattern: 'communication', strength: 0.4 },
    
    // Action verbs
    'kṛ': { pattern: 'action', strength: 0.3 }, // do (reduced from 0.5)
    'कृ': { pattern: 'action', strength: 0.3 },
    'kar': { pattern: 'action', strength: 0.3 }, // do/make (reduced from 0.5)
    'कर्': { pattern: 'action', strength: 0.3 }
  };

  // Check if the verb matches known reciprocal patterns
  for (const [verbPattern, data] of Object.entries(reciprocalVerbs)) {
    if (verb.includes(verbPattern) || verbPattern.includes(verb)) {
      analysis.hasReciprocalPotential = true;
      analysis.reciprocalPatterns.push(data.pattern);
      analysis.strength = Math.max(analysis.strength, data.strength);
    }
  }

  return analysis;
}

/**
 * Determines voice assignment based on reciprocal analysis
 * @param {Object} reciprocalAnalysis - Result of reciprocal analysis
 * @param {Object} context - Original context
 * @returns {Object} Voice assignment decision
 */
function determineVoiceAssignment(reciprocalAnalysis, context) {
  let useAtmanepada = false;
  let reason = 'No reciprocal action detected';
  let confidence = 0;

  // Main rule: If reciprocal action is detected, use ātmanepada
  if (reciprocalAnalysis.hasReciprocalAction && reciprocalAnalysis.mutualityStrength > 0.6) {
    useAtmanepada = true;
    reason = 'Reciprocal action detected - ātmanepada required per Sutra 1.3.14';
    confidence = reciprocalAnalysis.mutualityStrength;
  } else if (reciprocalAnalysis.mutualityStrength > 0.5 && reciprocalAnalysis.agentCount >= 2) {
    useAtmanepada = true;
    reason = 'Possible reciprocal action - ātmanepada recommended';
    confidence = reciprocalAnalysis.mutualityStrength;
  } else {
    useAtmanepada = false;
    reason = 'No reciprocal action detected';
    confidence = 0;
  }

  // Override based on explicit context flags
  if (context.forceAtmanepada === true) {
    useAtmanepada = true;
    reason = 'Explicitly specified as ātmanepada context';
    confidence = 1.0;
  } else if (context.forceParasmaipada === true) {
    useAtmanepada = false;
    reason = 'Explicitly specified as parasmaipada context';
    confidence = 1.0;
  }

  return {
    useAtmanepada,
    reason,
    confidence: Math.min(confidence, 1.0)
  };
}

/**
 * Checks if a given verb-context combination indicates reciprocal action
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context for analysis
 * @returns {Object} Simple boolean result with basic analysis
 */
export function hasReciprocalAction(verb, context = {}) {
  const result = determineReciprocalAtmanepada(verb, context);
  
  if (!result.success) {
    return {
      success: false,
      error: result.error,
      hasReciprocal: false
    };
  }
  
  return {
    success: true,
    hasReciprocal: result.isAtmanepada,
    confidence: result.confidence,
    reason: result.reason,
    rule: '1.3.14'
  };
}

/**
 * Analyzes reciprocal action patterns in Sanskrit expressions
 * @param {string} expression - Sanskrit expression to analyze
 * @param {Object} options - Analysis options
 * @param {boolean} options.includeDetails - Include detailed analysis
 * @param {string} options.expectedAction - Expected action type
 * @returns {Object} Comprehensive reciprocal analysis
 */
export function analyzeReciprocalExpression(expression, options = {}) {
  if (!expression || typeof expression !== 'string') {
    return {
      success: false,
      error: 'Invalid expression input',
      expression: expression
    };
  }

  try {
    const script = detectScript(expression);
    if (script === 'Unknown') {
      return {
        success: false,
        error: 'Unable to detect script',
        expression: expression
      };
    }

    // Split expression into words first, then analyze each word
    const words = expression.split(/\s+/).filter(word => word.length > 0);
    const verbs = words.filter(word => 
      word.length > 1 && // Basic word length filter
      !['और', 'अथ', 'च', 'तु', 'तत्', 'and', 'or', 'but', 'ca', 'tu', 'atha'].includes(word.toLowerCase())
    );

    const results = [];
    for (const verb of verbs) {
      const analysis = determineReciprocalAtmanepada(verb, {
        action: options.expectedAction,
        includeAnalysis: options.includeDetails
      });
      
      if (analysis.success) {
        results.push({
          verb: verb,
          isAtmanepada: analysis.isAtmanepada,
          confidence: analysis.confidence,
          reason: analysis.reason
        });
      }
    }

    return {
      success: true,
      expression: expression,
      script: script,
      verbAnalyses: results,
      overallRecommendation: results.length > 0 ? 
        (results.some(r => r.isAtmanepada) ? 'ātmanepada' : 'parasmaipada') : 
        'insufficient_data',
      rule: '1.3.14'
    };

  } catch (error) {
    return {
      success: false,
      error: `Expression analysis failed: ${error.message}`,
      expression: expression
    };
  }
}
