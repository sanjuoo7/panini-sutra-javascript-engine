/**
 * Sutra 1.3.13: भावकर्म्मणोः (bhāvakarmaṇoḥ)
 * "Of bhāva (action/state) and karma (object)"
 * 
 * This sutra establishes that in constructions expressing bhāva (action/state) 
 * or karma (object), specific grammatical rules apply. It defines semantic 
 * categories that influence grammatical operations, particularly in the context
 * of voice, case assignment, and meaning interpretation.
 *
 * @fileoverview Implementation of Panini's Sutra 1.3.13 - Bhāva and karma semantics
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Analyzes semantic meaning of Sanskrit expressions for bhāva and karma
 * @param {string} expression - Sanskrit expression to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Semantic analysis result
 */
export function analyzeSemanticMeaning(expression, options = {}) {
  // Input validation
  if (!expression || typeof expression !== 'string') {
    return {
      success: false,
      error: 'Invalid input: expression must be a non-empty string',
      expression
    };
  }

  const script = detectScript(expression);
  if (script === 'Unknown') {
    return {
      success: false,
      error: 'Unable to detect script for semantic analysis',
      expression,
      script
    };
  }

  const { context = 'general', analysisDepth = 'basic' } = options;
  
  // Analyze for bhāva (action/state) indicators
  const bhavaAnalysis = analyzeBhavaIndicators(expression, script, context);
  
  // Analyze for karma (object) indicators  
  const karmaAnalysis = analyzeKarmaIndicators(expression, script, context);
  
  // Determine dominant semantic category
  const dominantSemantic = determineDominantSemantic(bhavaAnalysis, karmaAnalysis);
  
  // Additional semantic features
  const semanticFeatures = extractSemanticFeatures(expression, script, analysisDepth);

  return {
    success: true,
    expression,
    script,
    context,
    bhavaAnalysis,
    karmaAnalysis,
    dominantSemantic,
    semanticFeatures,
    hasBhava: bhavaAnalysis.strength > 0,
    hasKarma: karmaAnalysis.strength > 0,
    rule: '1.3.13'
  };
}

/**
 * Analyzes bhāva (action/state) indicators in expression
 * @param {string} expression - Expression to analyze
 * @param {string} script - Detected script
 * @param {string} context - Analysis context
 * @returns {Object} Bhāva analysis result
 */
function analyzeBhavaIndicators(expression, script, context) {
  const bhavaIndicators = [];
  let strength = 0;

  if (script === 'IAST' || script === 'Unknown') {
    // Abstract noun patterns indicating bhāva
    const bhavaPatterns = [
      /\b\w*tva\b/gi,    // -tva suffix (divinity, etc.)
      /\b\w*tā\b/gi,     // -tā suffix (state, quality)
      /\b\w*bhāva\b/gi,  // explicit bhāva compounds
      /\b\w*kriyā\b/gi,  // kriyā (action) compounds
      /\b\w*karma\b/gi,  // karma in bhāva sense
      /\b\w*ti\b/gi,     // -ti verbal nouns
      /\b\w*ana\b/gi,    // -ana action nouns
      /\b\w*ya\b/gi      // -ya gerundive/potential
    ];

    for (const pattern of bhavaPatterns) {
      const matches = [...expression.matchAll(pattern)];
      for (const match of matches) {
        bhavaIndicators.push({
          type: 'morphological',
          pattern: match[0],
          position: match.index,
          strength: 0.7
        });
        strength += 0.7;
      }
    }

    // Semantic bhāva terms
    const bhavaTerms = [
      /\bbhāva\b/gi,     // bhāva itself
      /\bsattva\b/gi,    // existence, being
      /\bbhāvana\b/gi,   // bringing into being
      /\bkriyā\b/gi,     // action
      /\bceṣṭā\b/gi      // activity, effort
    ];

    for (const pattern of bhavaTerms) {
      const matches = [...expression.matchAll(pattern)];
      for (const match of matches) {
        bhavaIndicators.push({
          type: 'semantic',
          term: match[0],
          position: match.index,
          strength: 0.9
        });
        strength += 0.9;
      }
    }
  }

  // Context-based bhāva analysis
  if (context === 'verbal' || context === 'action') {
    strength += 0.5;
    bhavaIndicators.push({
      type: 'contextual',
      context: context,
      strength: 0.5
    });
  }

  return {
    indicators: bhavaIndicators,
    strength: Math.min(strength, 1.0), // Cap at 1.0
    category: 'bhāva',
    confidence: bhavaIndicators.length > 0 ? 0.8 : 0.0
  };
}

/**
 * Analyzes karma (object) indicators in expression
 * @param {string} expression - Expression to analyze
 * @param {string} script - Detected script
 * @param {string} context - Analysis context
 * @returns {Object} Karma analysis result
 */
function analyzeKarmaIndicators(expression, script, context) {
  const karmaIndicators = [];
  let strength = 0;

  if (script === 'IAST' || script === 'Unknown') {
    // Object-indicating patterns
    const karmaPatterns = [
      /\b\w*karma\b/gi,  // explicit karma
      /\b\w*viṣaya\b/gi, // object/topic
      /\b\w*pada\b/gi,   // object position
      /\b\w*artha\b/gi,  // meaning/object
      /\b\w*vastu\b/gi   // thing/object
    ];

    for (const pattern of karmaPatterns) {
      const matches = [...expression.matchAll(pattern)];
      for (const match of matches) {
        karmaIndicators.push({
          type: 'morphological',
          pattern: match[0],
          position: match.index,
          strength: 0.8
        });
        strength += 0.8;
      }
    }

    // Case endings indicating object
    const objectCasePatterns = [
      /\b\w*am\b/gi,     // accusative singular
      /\b\w*ān\b/gi,     // accusative plural (masculine)
      /\b\w*āni\b/gi,    // accusative plural (neuter)
      /\b\w*ās\b/gi      // accusative plural (feminine)
    ];

    for (const pattern of objectCasePatterns) {
      const matches = [...expression.matchAll(pattern)];
      for (const match of matches) {
        karmaIndicators.push({
          type: 'grammatical',
          case: 'accusative',
          pattern: match[0],
          position: match.index,
          strength: 0.6
        });
        strength += 0.6;
      }
    }
  }

  // Context-based karma analysis
  if (context === 'transitive' || context === 'object') {
    strength += 0.5;
    karmaIndicators.push({
      type: 'contextual',
      context: context,
      strength: 0.5
    });
  }

  return {
    indicators: karmaIndicators,
    strength: Math.min(strength, 1.0), // Cap at 1.0
    category: 'karma',
    confidence: karmaIndicators.length > 0 ? 0.8 : 0.0
  };
}

/**
 * Determines dominant semantic category between bhāva and karma
 * @param {Object} bhavaAnalysis - Bhāva analysis result
 * @param {Object} karmaAnalysis - Karma analysis result
 * @returns {Object} Dominant semantic determination
 */
function determineDominantSemantic(bhavaAnalysis, karmaAnalysis) {
  const bhavaStrength = bhavaAnalysis.strength;
  const karmaStrength = karmaAnalysis.strength;
  
  let dominantCategory = 'neutral';
  let confidence = 0.0;
  let reason = [];

  if (bhavaStrength > karmaStrength) {
    dominantCategory = 'bhāva';
    confidence = bhavaStrength;
    reason.push('bhāva_indicators_stronger');
  } else if (karmaStrength > bhavaStrength) {
    dominantCategory = 'karma';
    confidence = karmaStrength;
    reason.push('karma_indicators_stronger');
  } else if (bhavaStrength === karmaStrength && bhavaStrength > 0) {
    dominantCategory = 'mixed';
    confidence = (bhavaStrength + karmaStrength) / 2;
    reason.push('equal_strength_indicators');
  } else {
    reason.push('no_clear_indicators');
  }

  return {
    category: dominantCategory,
    confidence,
    reason,
    strengthDifference: Math.abs(bhavaStrength - karmaStrength),
    bhavaStrength,
    karmaStrength
  };
}

/**
 * Extracts additional semantic features from expression
 * @param {string} expression - Expression to analyze
 * @param {string} script - Detected script
 * @param {string} analysisDepth - Depth of analysis
 * @returns {Object} Semantic features
 */
function extractSemanticFeatures(expression, script, analysisDepth) {
  const features = {
    hasVerbalNoun: false,
    hasAbstractNoun: false,
    hasConcreteNoun: false,
    hasTransitiveMarkers: false,
    hasStateMarkers: false,
    hasAgentMarkers: false
  };

  if (analysisDepth === 'detailed' && (script === 'IAST' || script === 'Unknown')) {
    // Verbal noun patterns
    if (/\w+(ti|ana|ya|tva|tā)\b/gi.test(expression)) {
      features.hasVerbalNoun = true;
    }

    // Abstract vs concrete noun indicators
    if (/\w+(tva|tā|bhāva|sattva)\b/gi.test(expression)) {
      features.hasAbstractNoun = true;
    }

    if (/\w+(grha|agni|vṛkṣa|śilā)\b/gi.test(expression)) {
      features.hasConcreteNoun = true;
    }

    // Transitivity markers
    if (/\w*(kṛ|dā|labh|grah)\w*/gi.test(expression)) {
      features.hasTransitiveMarkers = true;
    }

    // State markers
    if (/\w*(as|bhū|sthā|vṛt)\w*/gi.test(expression)) {
      features.hasStateMarkers = true;
    }

    // Agent markers
    if (/\w*(kartṛ|kāraka|agens)\w*/gi.test(expression)) {
      features.hasAgentMarkers = true;
    }
  }

  return features;
}

/**
 * Applies semantic rules based on bhāva/karma classification
 * @param {string} expression - Sanskrit expression
 * @param {Object} semanticAnalysis - Previous semantic analysis
 * @param {Object} grammaticalContext - Grammatical context
 * @returns {Object} Applied semantic rules result
 */
export function applySemanticRules(expression, semanticAnalysis, grammaticalContext = {}) {
  try {
    // Input validation
    if (!expression || typeof expression !== 'string') {
      return {
        success: false,
        error: 'Invalid expression input',
        expression
      };
    }

    if (!semanticAnalysis || typeof semanticAnalysis !== 'object') {
      return {
        success: false,
        error: 'Invalid semantic analysis input',
        semanticAnalysis
      };
    }

    const {
      voice = 'active',
      construction = 'simple',
      caseFrame = 'default'
    } = grammaticalContext;

    const rules = [];
    const applications = [];

    // Apply bhāva-specific rules
    if (semanticAnalysis.hasBhava && semanticAnalysis.dominantSemantic.category === 'bhāva') {
      rules.push({
        type: 'bhāva_construction',
        description: 'Use impersonal constructions for bhāva',
        strength: semanticAnalysis.bhavaAnalysis.strength
      });

      if (voice === 'active') {
        applications.push({
          rule: 'bhāva_voice_conversion',
          from: 'active',
          to: 'passive_impersonal',
          rationale: 'bhāva_semantics'
        });
      }
    }

    // Apply karma-specific rules
    if (semanticAnalysis.hasKarma && semanticAnalysis.dominantSemantic.category === 'karma') {
      rules.push({
        type: 'karma_object_marking',
        description: 'Mark karma with accusative case',
        strength: semanticAnalysis.karmaAnalysis.strength
      });

      if (caseFrame === 'default') {
        applications.push({
          rule: 'karma_case_assignment',
          case: 'accusative',
          element: 'karma_object',
          rationale: 'karma_semantics'
        });
      }
    }

    // Mixed bhāva-karma rules
    if (semanticAnalysis.dominantSemantic.category === 'mixed') {
      rules.push({
        type: 'mixed_semantics',
        description: 'Handle mixed bhāva-karma construction',
        strength: semanticAnalysis.dominantSemantic.confidence
      });
    }

    return {
      success: true,
      expression,
      semanticAnalysis,
      grammaticalContext,
      applicableRules: rules,
      ruleApplications: applications,
      effectiveSemantics: semanticAnalysis.dominantSemantic.category,
      rule: '1.3.13'
    };

  } catch (error) {
    return {
      success: false,
      error: `Semantic rule application error: ${error.message}`,
      expression,
      semanticAnalysis,
      grammaticalContext
    };
  }
}

/**
 * Comprehensive bhāva-karma analysis for Sanskrit expressions
 * @param {string} expression - Sanskrit expression to analyze
 * @param {Object} options - Analysis and application options
 * @returns {Object} Complete bhāva-karma analysis and rule application
 */
export function comprehensiveBhavaKarmaAnalysis(expression, options = {}) {
  try {
    const {
      analysisDepth = 'basic',
      applyRules = true,
      grammaticalContext = {}
    } = options;

    // Perform semantic analysis
    const semanticResult = analyzeSemanticMeaning(expression, {
      context: options.context,
      analysisDepth
    });

    if (!semanticResult.success) {
      return {
        success: false,
        error: semanticResult.error,
        expression
      };
    }

    let ruleApplication = null;
    if (applyRules) {
      ruleApplication = applySemanticRules(expression, semanticResult, grammaticalContext);
      
      if (!ruleApplication.success) {
        return {
          success: false,
          error: ruleApplication.error,
          expression,
          semanticResult
        };
      }
    }

    // Calculate overall classification confidence
    const overallConfidence = Math.max(
      semanticResult.bhavaAnalysis.confidence,
      semanticResult.karmaAnalysis.confidence
    );

    return {
      success: true,
      expression,
      semanticAnalysis: semanticResult,
      ruleApplication,
      overallClassification: semanticResult.dominantSemantic.category,
      confidence: overallConfidence,
      applicableRules: ruleApplication?.applicableRules || [],
      recommendations: generateRecommendations(semanticResult),
      rule: '1.3.13'
    };

  } catch (error) {
    return {
      success: false,
      error: `Comprehensive analysis error: ${error.message}`,
      expression,
      options
    };
  }
}

/**
 * Generates linguistic recommendations based on semantic analysis
 * @param {Object} semanticResult - Semantic analysis result
 * @returns {Array} Array of recommendations
 */
function generateRecommendations(semanticResult) {
  const recommendations = [];

  if (semanticResult.hasBhava) {
    recommendations.push({
      type: 'construction',
      suggestion: 'Consider using impersonal passive constructions',
      rationale: 'bhāva_semantics_favor_impersonal'
    });
  }

  if (semanticResult.hasKarma) {
    recommendations.push({
      type: 'case_marking',
      suggestion: 'Ensure proper accusative case marking for objects',
      rationale: 'karma_requires_object_marking'
    });
  }

  if (semanticResult.dominantSemantic.category === 'mixed') {
    recommendations.push({
      type: 'disambiguation',
      suggestion: 'Clarify whether focus is on action (bhāva) or object (karma)',
      rationale: 'mixed_semantics_need_clarification'
    });
  }

  return recommendations;
}

export default {
  analyzeSemanticMeaning,
  applySemanticRules,
  comprehensiveBhavaKarmaAnalysis
};
