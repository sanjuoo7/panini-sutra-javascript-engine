/**
 * Sutra 1.3.18: परिव्यवेभ्यः क्रियः
 * 
 * After the verb क्री 'to purchase', when preceded by परि, वि or अव,
 * the आत्मनेपद affix is employed, even when the fruit of the action 
 * does not accrue to the agent.
 * 
 * This function determines whether a Sanskrit verb should take ātmanepada
 * voice based on specific combinations of क्री root with particular prefixes.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines ātmanepada usage for specific क्री combinations per Sutra 1.3.18
 * @param {string} verb - Sanskrit verb to analyze
 * @param {Object} context - Additional context information
 * @param {string} [context.prefix] - Prefix information
 * @param {Array} [context.prefixes] - Array of prefixes
 * @param {string} [context.compound] - Compound analysis
 * @param {string} [context.expression] - Expression context
 * @param {boolean} [context.includeAnalysis] - Include detailed analysis
 * @param {boolean} [context.forceKriPrefix] - Force detection for testing
 * @returns {Object} Analysis result with ātmanepada determination
 */
function determineKriPrefixAtmanepada(verb, context = {}) {
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
    
    if (!isValidSanskrit && !context.forceKriPrefix) {
      return {
        success: false,
        error: `Invalid Sanskrit word: ${verb}`,
        verb: verb
      };
    }

    // Analyze for क्री + prefix combination
    const kriPrefixAnalysis = analyzeKriPrefixCombination(verb, context, script);
    
    // Determine ātmanepada usage
    const voiceAssignment = determineKriPrefixVoiceAssignment(kriPrefixAnalysis, context);
    
    return {
      success: true,
      verb: verb,
      script: script,
      isAtmanepada: voiceAssignment.useAtmanepada,
      reason: voiceAssignment.reason,
      confidence: voiceAssignment.confidence,
      combinationType: kriPrefixAnalysis.combinationType,
      kriPrefixAnalysis: context.includeAnalysis ? kriPrefixAnalysis : undefined,
      rule: '1.3.18',
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
 * Analyzes context for क्री + specific prefix combination
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} क्री + prefix combination analysis result
 */
function analyzeKriPrefixCombination(verb, context, script) {
  const analysis = {
    hasKriRoot: false,
    hasTargetPrefix: false,
    combinationType: 'none',
    kriIndicators: [],
    prefixIndicators: [],
    combinationStrength: 0,
    evidence: []
  };

  // Analyze context for क्री root
  const kriAnalysis = analyzeKriRoot(verb, context, script);
  if (kriAnalysis.hasKriRoot) {
    analysis.hasKriRoot = true;
    analysis.kriIndicators = analysis.kriIndicators.concat(kriAnalysis.indicators);
    analysis.combinationStrength += kriAnalysis.strength;
  }

  // Analyze context for target prefixes (परि, वि, अव)
  const prefixAnalysis = analyzeTargetPrefixes(verb, context, script);
  if (prefixAnalysis.hasTargetPrefix) {
    analysis.hasTargetPrefix = true;
    analysis.prefixIndicators = analysis.prefixIndicators.concat(prefixAnalysis.indicators);
    analysis.combinationStrength += prefixAnalysis.strength;
  }

  // Determine combination type
  if (analysis.hasKriRoot && analysis.hasTargetPrefix) {
    analysis.combinationType = 'kri_prefix';
  } else if (analysis.hasKriRoot) {
    analysis.combinationType = 'kri_only';
  } else if (analysis.hasTargetPrefix) {
    analysis.combinationType = 'prefix_only';
  }

  // Cap combination strength
  analysis.combinationStrength = Math.min(analysis.combinationStrength, 1.0);

  return analysis;
}

/**
 * Analyzes context for क्री root
 * @param {string} verb - Sanskrit verb  
 * @param {Object} context - Context information
 * @param {string} script - Script type
 * @returns {Object} क्री root analysis result
 */
function analyzeKriRoot(verb, context, script) {
  const analysis = {
    hasKriRoot: false,
    indicators: [],
    strength: 0
  };

  // क्री root patterns (both IAST and Devanagari)
  const kriRoots = [
    'krī', 'क्री', 'kri', 'क्रि'
  ];

  const verbLower = verb.toLowerCase();

  // Check for exact root match or with inflections
  for (const root of kriRoots) {
    const rootLower = root.toLowerCase();
    
    // Exact match (rare but possible)
    if (verbLower === rootLower) {
      analysis.hasKriRoot = true;
      analysis.indicators.push({
        type: 'kri_root_exact',
        value: root,
        strength: 1.0
      });
      analysis.strength += 1.0;
      break;
    }
    // Ends with root (e.g., parikrī, vikrī)
    else if (verbLower.endsWith(rootLower)) {
      analysis.hasKriRoot = true;
      analysis.indicators.push({
        type: 'kri_root_detected',
        value: root,
        strength: 0.9
      });
      analysis.strength += 0.9;
      break;
    }
    // Contains root with reasonable length constraints
    else if (verbLower.includes(rootLower) && 
             verbLower.length <= rootLower.length + 8) { // Allow for prefix + root + endings
      analysis.hasKriRoot = true;
      analysis.indicators.push({
        type: 'kri_root_detected',
        value: root,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break;
    }
  }

  // Check context for forced root
  if (context.forceKriPrefix) {
    analysis.hasKriRoot = true;
    analysis.indicators.push({
      type: 'forced_kri_root',
      value: 'krī',
      strength: 1.0
    });
    analysis.strength += 1.0;
  }

  return analysis;
}

/**
 * Analyzes context for target prefixes (परि, वि, अव)
 * @param {string} verb - Sanskrit verb  
 * @param {Object} context - Context information
 * @param {string} script - Script type
 * @returns {Object} Target prefix analysis result
 */
function analyzeTargetPrefixes(verb, context, script) {
  const analysis = {
    hasTargetPrefix: false,
    indicators: [],
    strength: 0
  };

  // Target prefix patterns (both IAST and Devanagari)
  const targetPrefixes = [
    'pari', 'परि', 
    'vi', 'वि',
    'ava', 'अव'
  ];

  // Check if verb starts with target prefix (case-insensitive)
  const verbLower = verb.toLowerCase();
  for (const prefix of targetPrefixes) {
    const prefixLower = prefix.toLowerCase();
    if (verbLower.startsWith(prefixLower)) {
      analysis.hasTargetPrefix = true;
      analysis.indicators.push({
        type: 'verb_target_prefix',
        value: prefix,
        strength: 0.9
      });
      analysis.strength += 0.9;
      break;
    }
  }

  // Check context.prefix field
  if (context.prefix && typeof context.prefix === 'string') {
    const prefixLower = context.prefix.toLowerCase();
    for (const prefix of targetPrefixes) {
      const targetLower = prefix.toLowerCase();
      if (prefixLower === targetLower || 
          prefixLower.startsWith(targetLower + '-') || 
          prefixLower.startsWith(targetLower + ' ')) {
        analysis.hasTargetPrefix = true;
        analysis.indicators.push({
          type: 'context_target_prefix',
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
        for (const prefix of targetPrefixes) {
          if (contextPrefix.toLowerCase().includes(prefix.toLowerCase())) {
            analysis.hasTargetPrefix = true;
            analysis.indicators.push({
              type: 'prefixes_array_target',
              value: prefix,
              strength: 0.8
            });
            analysis.strength += 0.8;
            break;
          }
        }
        if (analysis.hasTargetPrefix) break;
      }
    }
  }

  // Check context.compound field
  if (context.compound && typeof context.compound === 'string') {
    for (const prefix of targetPrefixes) {
      if (context.compound.toLowerCase().includes(prefix.toLowerCase())) {
        analysis.hasTargetPrefix = true;
        analysis.indicators.push({
          type: 'compound_target_prefix',
          value: prefix,
          strength: 0.7
        });
        analysis.strength += 0.7;
        break;
      }
    }
  }

  // Check context.expression field
  if (context.expression && typeof context.expression === 'string') {
    const prefixExpressionPatterns = [
      'pari ', 'परि ', 'with pari', 'preceded by pari',
      'vi ', 'वि ', 'with vi', 'preceded by vi',
      'ava ', 'अव ', 'with ava', 'preceded by ava'
    ];
    for (const pattern of prefixExpressionPatterns) {
      if (context.expression.toLowerCase().includes(pattern.toLowerCase())) {
        // Extract the prefix from the pattern
        const prefixMatch = pattern.trim().split(' ')[0];
        analysis.hasTargetPrefix = true;
        analysis.indicators.push({
          type: 'expression_target_prefix',
          value: prefixMatch,
          strength: 0.5
        });
        analysis.strength += 0.5;
        break;
      }
    }
  }

  // Check context for forced prefix
  if (context.forceKriPrefix) {
    analysis.hasTargetPrefix = true;
    analysis.indicators.push({
      type: 'forced_target_prefix',
      value: 'pari',
      strength: 1.0
    });
    analysis.strength += 1.0;
  }

  return analysis;
}

/**
 * Determines voice assignment based on क्री + prefix analysis
 * @param {Object} kriPrefixAnalysis - Analysis result
 * @param {Object} context - Context information
 * @returns {Object} Voice assignment result
 */
function determineKriPrefixVoiceAssignment(kriPrefixAnalysis, context) {
  const assignment = {
    useAtmanepada: false,
    reason: '',
    confidence: 0
  };

  if (kriPrefixAnalysis.hasKriRoot && kriPrefixAnalysis.hasTargetPrefix) {
    assignment.useAtmanepada = true;
    assignment.reason = 'क्री root with परि/वि/अव prefix - takes ātmanepada per Sutra 1.3.18';
    
    // Check if this was a forced combination
    const hasForced = kriPrefixAnalysis.kriIndicators.some(ind => ind.type === 'forced_kri_root') ||
                      kriPrefixAnalysis.prefixIndicators.some(ind => ind.type === 'forced_target_prefix');
    
    // Check for weaker evidence (expression-based detection)
    const hasWeakEvidence = kriPrefixAnalysis.prefixIndicators.some(ind => ind.type === 'expression_target_prefix');
    
    // Check for strong evidence (verb-level detection)
    const hasStrongEvidence = !hasWeakEvidence && (
      kriPrefixAnalysis.kriIndicators.some(ind => ind.strength >= 0.9) ||
      kriPrefixAnalysis.prefixIndicators.some(ind => 
        ind.type === 'verb_target_prefix' && ind.strength >= 0.9)
    );
    
    if (hasForced) {
      assignment.confidence = 1.0;
    } else if (hasWeakEvidence) {
      assignment.confidence = Math.min(kriPrefixAnalysis.combinationStrength * 0.85, 0.9);
    } else if (hasStrongEvidence) {
      assignment.confidence = Math.min(kriPrefixAnalysis.combinationStrength * 0.95, 1.0);
    } else {
      assignment.confidence = Math.min(kriPrefixAnalysis.combinationStrength * 0.9, 0.95);
    }
  } else if (kriPrefixAnalysis.hasKriRoot && !kriPrefixAnalysis.hasTargetPrefix) {
    assignment.useAtmanepada = false;
    assignment.reason = 'क्री root without required prefix - Sutra 1.3.18 does not apply';
    assignment.confidence = 0.8;
  } else if (kriPrefixAnalysis.hasTargetPrefix && !kriPrefixAnalysis.hasKriRoot) {
    assignment.useAtmanepada = false;
    assignment.reason = 'Target prefix without क्री root - Sutra 1.3.18 does not apply';
    assignment.confidence = 0.8;
  } else {
    assignment.useAtmanepada = false;
    assignment.reason = 'No क्री + prefix combination detected - Sutra 1.3.18 does not apply';
    assignment.confidence = 1.0 - kriPrefixAnalysis.combinationStrength;
  }

  return assignment;
}

/**
 * Simple helper function to check if expression has क्री + prefix combination
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @returns {boolean} True if क्री + prefix combination found
 */
function hasKriPrefixCombination(verb, context = {}) {
  try {
    const result = determineKriPrefixAtmanepada(verb, context);
    return result.success && result.combinationType === 'kri_prefix';
  } catch (error) {
    return false;
  }
}

export {
  determineKriPrefixAtmanepada,
  hasKriPrefixCombination
};
