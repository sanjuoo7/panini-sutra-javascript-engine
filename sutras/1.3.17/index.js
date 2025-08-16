/**
 * Sanskrit Sutra 1.3.17: नेर्विशः
 * 
 * Rule: "nerviśaḥ" 
 * Translation: "[After] ni [prefix with verb] viś"
 * 
 * This sutra specifies that the verb विश् (viś - "to enter") when preceded 
 * by the preposition नि (ni) DOES take ātmanepada endings. This is a specific 
 * positive rule that overrides any general exceptions.
 * 
 * @author AI Sanskrit Grammar Assistant
 * @version 1.0.0
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if ni+viś combination should use ātmanepada
 * (specific application of Sutra 1.3.17)
 * @param {string} verb - Sanskrit verb to analyze (should be viś or related)
 * @param {Object} context - Context information about the verb usage
 * @param {string} [context.prefix] - Prefix/preposition used with the verb
 * @param {Array} [context.prefixes] - Array of prefixes used with the verb
 * @param {string} [context.compound] - Compound form including prefix
 * @param {string} [context.expression] - Full expression or sentence
 * @param {boolean} [context.includeAnalysis] - Include detailed analysis
 * @param {boolean} [context.forceNiVis] - Force ni+viś detection for testing
 * @returns {Object} Analysis result with ātmanepada determination
 */
function determineNiVisAtmanepada(verb, context = {}) {
  try {
    // Input validation
    if (!verb || typeof verb !== 'string' || verb.trim() === '') {
      return {
        success: false,
        error: 'Invalid verb: must be a non-empty string',
        verb: verb
      };
    }

    if (typeof context !== 'object' || context === null) {
      context = {};
    }

    // Detect script and validate
    const script = detectScript(verb);
    const isValidSanskrit = validateSanskritWord(verb) || script === 'Unknown';
    
    if (!isValidSanskrit && !context.forceNiVis) {
      return {
        success: false,
        error: `Invalid Sanskrit word: ${verb}`,
        verb: verb
      };
    }

    // Analyze for ni+viś combination
    const niVisAnalysis = analyzeNiVisCombination(verb, context, script);
    
    // Determine ātmanepada usage
    const voiceAssignment = determineNiVisVoiceAssignment(niVisAnalysis, context);
    
    return {
      success: true,
      verb: verb,
      script: script,
      isAtmanepada: voiceAssignment.useAtmanepada,
      reason: voiceAssignment.reason,
      confidence: voiceAssignment.confidence,
      combinationType: niVisAnalysis.combinationType,
      niVisAnalysis: context.includeAnalysis ? niVisAnalysis : undefined,
      rule: '1.3.17',
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
 * Analyzes context for ni+viś combination
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} Ni+viś combination analysis result
 */
function analyzeNiVisCombination(verb, context, script) {
  const analysis = {
    hasVisRoot: false,
    hasNiPrefix: false,
    combinationType: 'none',
    visIndicators: [],
    niIndicators: [],
    combinationStrength: 0,
    evidence: []
  };

  // Check for force flag (for testing)
  if (context.forceNiVis) {
    analysis.hasVisRoot = true;
    analysis.hasNiPrefix = true;
    analysis.combinationType = 'ni_vis';
    analysis.visIndicators.push({
      type: 'forced_vis_root',
      value: 'viś',
      strength: 1.0
    });
    analysis.niIndicators.push({
      type: 'forced_ni_prefix',
      value: 'ni',
      strength: 1.0
    });
    analysis.combinationStrength = 1.0;
    return analysis;
  }

  // Analyze verb for viś root
  const visAnalysis = analyzeVisRoot(verb, script);
  if (visAnalysis.hasVisRoot) {
    analysis.hasVisRoot = true;
    analysis.visIndicators = analysis.visIndicators.concat(visAnalysis.indicators);
    analysis.combinationStrength += visAnalysis.strength;
  }

  // Analyze context for ni prefix
  const niAnalysis = analyzeNiPrefix(verb, context, script);
  if (niAnalysis.hasNiPrefix) {
    analysis.hasNiPrefix = true;
    analysis.niIndicators = analysis.niIndicators.concat(niAnalysis.indicators);
    analysis.combinationStrength += niAnalysis.strength;
  }

  // Determine combination type
  if (analysis.hasVisRoot && analysis.hasNiPrefix) {
    analysis.combinationType = 'ni_vis';
  } else if (analysis.hasVisRoot) {
    analysis.combinationType = 'vis_only';
  } else if (analysis.hasNiPrefix) {
    analysis.combinationType = 'ni_only';
  }

  // Cap combination strength
  analysis.combinationStrength = Math.min(analysis.combinationStrength, 1.0);

  return analysis;
}

/**
 * Analyzes verb for viś root
 * @param {string} verb - Sanskrit verb
 * @param {string} script - Script type
 * @returns {Object} Viś root analysis result
 */
function analyzeVisRoot(verb, script) {
  const analysis = {
    hasVisRoot: false,
    indicators: [],
    strength: 0
  };

  // Viś root patterns (both IAST and Devanagari)
  const visRoots = [
    'viś', 'विश्', 'vis', 'विस्'
  ];

  // Check for exact matches or as root in compound
  for (const root of visRoots) {
    const verbLower = verb.toLowerCase();
    const rootLower = root.toLowerCase();
    
    // Exact match
    if (verbLower === rootLower) {
      analysis.hasVisRoot = true;
      analysis.indicators.push({
        type: 'vis_root_detected',
        value: root,
        strength: 1.0
      });
      analysis.strength += 1.0;
      break;
    }
    // Starts with root (e.g., viśati)
    else if (verbLower.startsWith(rootLower) && verbLower.length <= rootLower.length + 3) {
      analysis.hasVisRoot = true;
      analysis.indicators.push({
        type: 'vis_root_detected',
        value: root,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break;
    }
    // Contains root after prefix (e.g., niviś, praviś)
    else if (verbLower.includes(rootLower) && 
             verbLower.length <= rootLower.length + 6 && // Allow for prefix + root
             verbLower.indexOf(rootLower) <= 3) { // Root should appear early in word
      analysis.hasVisRoot = true;
      analysis.indicators.push({
        type: 'vis_root_detected',
        value: root,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break;
    }
  }

  return analysis;
}

/**
 * Analyzes context for ni prefix
 * @param {string} verb - Sanskrit verb  
 * @param {Object} context - Context information
 * @param {string} script - Script type
 * @returns {Object} Ni prefix analysis result
 */
function analyzeNiPrefix(verb, context, script) {
  const analysis = {
    hasNiPrefix: false,
    indicators: [],
    strength: 0
  };

  // Ni prefix patterns (both IAST and Devanagari)
  const niPrefixes = [
    'ni', 'नि'
  ];

  // Check if verb starts with ni prefix
  for (const prefix of niPrefixes) {
    if (verb.startsWith(prefix)) {
      analysis.hasNiPrefix = true;
      analysis.indicators.push({
        type: 'verb_ni_prefix',
        value: prefix,
        strength: 0.9
      });
      analysis.strength += 0.9;
      break;
    }
  }

  // Check context.prefix field - exact match or starts with ni
  if (context.prefix) {
    const prefixLower = context.prefix.toLowerCase();
    for (const prefix of niPrefixes) {
      const niLower = prefix.toLowerCase();
      if (prefixLower === niLower || prefixLower.startsWith(niLower + '-') || prefixLower.startsWith(niLower + ' ')) {
        analysis.hasNiPrefix = true;
        analysis.indicators.push({
          type: 'context_ni_prefix',
          value: prefix,
          strength: 0.8
        });
        analysis.strength += 0.8;
        break;
      }
    }
  }

  // Check context.prefixes array
  if (context.prefixes && Array.isArray(context.prefixes)) {
    for (const contextPrefix of context.prefixes) {
      if (typeof contextPrefix === 'string') {
        for (const prefix of niPrefixes) {
          if (contextPrefix.toLowerCase().includes(prefix.toLowerCase())) {
            analysis.hasNiPrefix = true;
            analysis.indicators.push({
              type: 'prefixes_array_ni',
              value: prefix,
              strength: 0.8
            });
            analysis.strength += 0.8;
            break;
          }
        }
      }
    }
  }

  // Check context.compound field
  if (context.compound) {
    for (const prefix of niPrefixes) {
      if (context.compound.toLowerCase().includes(prefix.toLowerCase())) {
        analysis.hasNiPrefix = true;
        analysis.indicators.push({
          type: 'compound_ni_prefix',
          value: prefix,
          strength: 0.7
        });
        analysis.strength += 0.7;
        break;
      }
    }
  }

  // Check context.expression field
  if (context.expression) {
    const niExpressionPatterns = [
      'ni ', 'नि ', 'with ni', 'preceded by ni'
    ];
    for (const pattern of niExpressionPatterns) {
      if (context.expression.toLowerCase().includes(pattern.toLowerCase())) {
        analysis.hasNiPrefix = true;
        analysis.indicators.push({
          type: 'expression_ni_prefix',
          value: pattern.trim(),
          strength: 0.5
        });
        analysis.strength += 0.5;
        break;
      }
    }
  }

  return analysis;
}

/**
 * Determines ātmanepada usage based on ni+viś analysis
 * @param {Object} niVisAnalysis - Results from ni+viś analysis
 * @param {Object} context - Original context
 * @returns {Object} Voice assignment determination
 */
function determineNiVisVoiceAssignment(niVisAnalysis, context) {
  const assignment = {
    useAtmanepada: false,
    reason: '',
    confidence: 0
  };

  // Check if ni+viś combination is present
  if (niVisAnalysis.combinationType === 'ni_vis') {
    assignment.useAtmanepada = true;
    assignment.reason = 'Ni+viś combination - takes ātmanepada per Sutra 1.3.17';
    
    // Check if this was a forced combination (both indicators have strength 1.0)
    const hasForced = niVisAnalysis.visIndicators.some(ind => ind.type === 'forced_vis_root') ||
                      niVisAnalysis.niIndicators.some(ind => ind.type === 'forced_ni_prefix');
    
    // Check for weaker evidence (like expression-based detection) - prioritize this
    const hasWeakEvidence = niVisAnalysis.niIndicators.some(ind => ind.type === 'expression_ni_prefix');
    
    // Check for strong evidence (verb-level detection) - only if no weak evidence
    const hasStrongEvidence = !hasWeakEvidence && (
      niVisAnalysis.niIndicators.some(ind => 
        ind.type === 'verb_ni_prefix' && ind.strength >= 0.9) ||
      niVisAnalysis.visIndicators.some(ind => ind.strength >= 0.9)
    );
    
    if (hasForced) {
      assignment.confidence = 1.0;
    } else if (hasWeakEvidence) {
      assignment.confidence = Math.min(niVisAnalysis.combinationStrength * 0.85, 0.9);
    } else if (hasStrongEvidence) {
      assignment.confidence = Math.min(niVisAnalysis.combinationStrength * 0.95, 1.0);
    } else {
      assignment.confidence = Math.min(niVisAnalysis.combinationStrength * 0.9, 0.95);
    }
  } else if (niVisAnalysis.hasVisRoot && !niVisAnalysis.hasNiPrefix) {
    assignment.useAtmanepada = false;
    assignment.reason = 'Viś root without ni prefix - Sutra 1.3.17 does not apply';
    assignment.confidence = 0.8;
  } else if (niVisAnalysis.hasNiPrefix && !niVisAnalysis.hasVisRoot) {
    assignment.useAtmanepada = false;
    assignment.reason = 'Ni prefix without viś root - Sutra 1.3.17 does not apply';
    assignment.confidence = 0.8;
  } else {
    assignment.useAtmanepada = false;
    assignment.reason = 'No ni+viś combination detected - Sutra 1.3.17 does not apply';
    assignment.confidence = 1.0 - niVisAnalysis.combinationStrength;
  }

  return assignment;
}

/**
 * Simple helper function to check if expression has ni+viś combination
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @returns {boolean} True if ni+viś combination found
 */
function hasNiVisCombination(verb, context = {}) {
  try {
    const result = determineNiVisAtmanepada(verb, context);
    return result.success && result.combinationType === 'ni_vis';
  } catch (error) {
    return false;
  }
}

export {
  determineNiVisAtmanepada,
  hasNiVisCombination
};
