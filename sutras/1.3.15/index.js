/**
 * Sanskrit Sutra 1.3.15: न गतिहिंसार्थेभ्यः
 * 
 * Rule: "na gatihiṃsārathebhayaḥ" 
 * Translation: "Not from [verbs expressing] motion or injury"
 * 
 * This sutra provides an exception to 1.3.14 (कर्त्तरि कर्म्मव्यतिहारे).
 * Even when there is reciprocal action, verbs that primarily express
 * motion (gati) or injury/harm (hiṃsā) do NOT take ātmanepada endings.
 * 
 * @author AI Sanskrit Grammar Assistant
 * @version 1.0.0
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if a verb with motion or injury meaning should NOT use ātmanepada
 * even in reciprocal contexts (exception to Sutra 1.3.14)
 * @param {string} verb - Sanskrit verb to analyze
 * @param {Object} context - Context information about the verb usage
 * @param {string} [context.meaning] - Semantic meaning of the verb
 * @param {string} [context.action] - Description of the action
 * @param {Array} [context.agents] - Agents performing the action
 * @param {boolean} [context.includeAnalysis] - Include detailed analysis
 * @param {boolean} [context.forceMotion] - Force motion classification for testing
 * @param {boolean} [context.forceInjury] - Force injury classification for testing
 * @returns {Object} Analysis result with exception determination
 */
function determineMotionInjuryException(verb, context = {}) {
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
    
    if (!isValidSanskrit && !context.forceMotion && !context.forceInjury) {
      return {
        success: false,
        error: `Invalid Sanskrit word: ${verb}`,
        verb: verb
      };
    }

    // Analyze motion and injury semantics
    const semanticAnalysis = analyzeMotionInjurySemantics(verb, context, script);
    
    // Determine exception applicability
    const exceptionAssignment = determineExceptionApplicability(semanticAnalysis, context);
    
    return {
      success: true,
      verb: verb,
      script: script,
      appliesException: exceptionAssignment.appliesException,
      reason: exceptionAssignment.reason,
      confidence: exceptionAssignment.confidence,
      semanticCategory: semanticAnalysis.category,
      semanticAnalysis: context.includeAnalysis ? semanticAnalysis : undefined,
      rule: '1.3.15',
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
 * Analyzes verb semantics for motion or injury meanings
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} Semantic analysis result
 */
function analyzeMotionInjurySemantics(verb, context, script) {
  const analysis = {
    hasMotionMeaning: false,
    hasInjuryMeaning: false,
    category: 'neither',
    motionIndicators: [],
    injuryIndicators: [],
    semanticStrength: 0,
    evidence: []
  };

  // Check for force flags (for testing)
  if (context.forceMotion) {
    analysis.hasMotionMeaning = true;
    analysis.category = 'motion';
    analysis.motionIndicators.push({
      type: 'forced_classification',
      value: 'motion',
      strength: 1.0
    });
    analysis.semanticStrength = 1.0;
    return analysis;
  }

  if (context.forceInjury) {
    analysis.hasInjuryMeaning = true;
    analysis.category = 'injury';
    analysis.injuryIndicators.push({
      type: 'forced_classification',
      value: 'injury',
      strength: 1.0
    });
    analysis.semanticStrength = 1.0;
    return analysis;
  }

  // Analyze verb root for inherent motion meanings
  const motionAnalysis = analyzeVerbMotionSemantics(verb, script);
  if (motionAnalysis.hasMotionMeaning) {
    analysis.hasMotionMeaning = true;
    analysis.motionIndicators = analysis.motionIndicators.concat(motionAnalysis.indicators);
    analysis.semanticStrength += motionAnalysis.strength;
  }

  // Analyze verb root for inherent injury meanings
  const injuryAnalysis = analyzeVerbInjurySemantics(verb, script);
  if (injuryAnalysis.hasInjuryMeaning) {
    analysis.hasInjuryMeaning = true;
    analysis.injuryIndicators = analysis.injuryIndicators.concat(injuryAnalysis.indicators);
    analysis.semanticStrength += injuryAnalysis.strength;
  }

  // Check contextual meaning and action descriptions
  const contextualAnalysis = analyzeContextualSemantics(context);
  if (contextualAnalysis.hasMotionMeaning) {
    analysis.hasMotionMeaning = true;
    analysis.motionIndicators = analysis.motionIndicators.concat(contextualAnalysis.motionIndicators);
    analysis.semanticStrength += contextualAnalysis.motionStrength;
  }
  if (contextualAnalysis.hasInjuryMeaning) {
    analysis.hasInjuryMeaning = true;
    analysis.injuryIndicators = analysis.injuryIndicators.concat(contextualAnalysis.injuryIndicators);
    analysis.semanticStrength += contextualAnalysis.injuryStrength;
  }

  // Determine primary category
  if (analysis.hasMotionMeaning && analysis.hasInjuryMeaning) {
    // If both, determine which is stronger
    const motionStrength = analysis.motionIndicators.reduce((sum, ind) => sum + ind.strength, 0);
    const injuryStrength = analysis.injuryIndicators.reduce((sum, ind) => sum + ind.strength, 0);
    analysis.category = motionStrength >= injuryStrength ? 'motion' : 'injury';
  } else if (analysis.hasMotionMeaning) {
    analysis.category = 'motion';
  } else if (analysis.hasInjuryMeaning) {
    analysis.category = 'injury';
  }

  // Cap semantic strength
  analysis.semanticStrength = Math.min(analysis.semanticStrength, 1.0);

  return analysis;
}

/**
 * Analyzes verb root for motion semantics
 * @param {string} verb - Sanskrit verb
 * @param {string} script - Script type
 * @returns {Object} Motion analysis result
 */
function analyzeVerbMotionSemantics(verb, script) {
  const analysis = {
    hasMotionMeaning: false,
    indicators: [],
    strength: 0
  };

  // Common motion verb roots (both IAST and Devanagari)
  const motionRoots = [
    // IAST motion verbs
    'gam', 'i', 'yā', 'gā', 'car', 'cal', 'vraj', 'sṛ', 'dhāv', 'plu', 'pat',
    'gacch', 'āgam', 'vigam', 'utkram', 'avasṛ', 'prasṛ', 'sancar', 'adhyā',
    
    // Devanagari motion verbs
    'गम्', 'इ', 'या', 'गा', 'चर्', 'चल्', 'व्रज्', 'सृ', 'धाव्', 'प्लु', 'पत्',
    'गच्छ्', 'आगम्', 'विगम्', 'उत्क्रम्', 'अवसृ', 'प्रसृ', 'सञ्चर्', 'अध्या'
  ];

  for (const root of motionRoots) {
    if (verb === root || (verb.length >= 3 && verb.includes(root) && root.length >= 2)) {
      analysis.hasMotionMeaning = true;
      analysis.indicators.push({
        type: 'inherent_motion_root',
        value: root,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break; // Only count one root match to avoid over-counting
    }
  }

  return analysis;
}

/**
 * Analyzes verb root for injury/harm semantics
 * @param {string} verb - Sanskrit verb
 * @param {string} script - Script type
 * @returns {Object} Injury analysis result
 */
function analyzeVerbInjurySemantics(verb, script) {
  const analysis = {
    hasInjuryMeaning: false,
    indicators: [],
    strength: 0
  };

  // Common injury/harm verb roots (both IAST and Devanagari)
  const injuryRoots = [
    // IAST injury verbs
    'han', 'hiṃs', 'vādh', 'mṛ', 'kṣi', 'nāś', 'bādh', 'pīḍ', 'ghāt', 'tudh',
    'bhid', 'chid', 'kṛt', 'mārat', 'vadh', 'jighāṃsa', 'droha', 'upadrava',
    
    // Devanagari injury verbs
    'हन्', 'हिंस्', 'वाध्', 'मृ', 'क्षि', 'नाश्', 'बाध्', 'पीड्', 'घात्', 'तुध्',
    'भिद्', 'छिद्', 'कृत्', 'मारत्', 'वध्', 'जिघांस', 'द्रोह', 'उपद्रव'
  ];

  for (const root of injuryRoots) {
    if (verb === root || (verb.length >= 3 && verb.includes(root) && root.length >= 2)) {
      analysis.hasInjuryMeaning = true;
      analysis.indicators.push({
        type: 'inherent_injury_root',
        value: root,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break; // Only count one root match to avoid over-counting
    }
  }

  return analysis;
}

/**
 * Analyzes contextual information for motion/injury semantics
 * @param {Object} context - Context information
 * @returns {Object} Contextual analysis result
 */
function analyzeContextualSemantics(context) {
  const analysis = {
    hasMotionMeaning: false,
    hasInjuryMeaning: false,
    motionIndicators: [],
    injuryIndicators: [],
    motionStrength: 0,
    injuryStrength: 0
  };

  // Check meaning and action fields for motion/injury terms
  const textToCheck = [context.meaning, context.action].filter(Boolean);
  
  for (const text of textToCheck) {
    // Motion patterns
    const motionPatterns = [
      'go', 'move', 'travel', 'walk', 'run', 'flow', 'proceed', 'advance', 'retreat',
      'गमन', 'चलन', 'गति', 'प्रयाण', 'संचार', 'आगमन', 'निर्गमन', 'प्रस्थान'
    ];
    
    for (const pattern of motionPatterns) {
      if (text.toLowerCase().includes(pattern.toLowerCase())) {
        analysis.hasMotionMeaning = true;
        analysis.motionIndicators.push({
          type: 'contextual_motion',
          value: pattern,
          strength: 0.6
        });
        analysis.motionStrength += 0.6;
        break;
      }
    }

    // Injury patterns
    const injuryPatterns = [
      'harm', 'hurt', 'injure', 'damage', 'wound', 'strike', 'hit', 'kill', 'destroy',
      'हिंसा', 'पीड़ा', 'बाधा', 'मारण', 'वध', 'नाश', 'घात', 'क्षति', 'द्रोह'
    ];
    
    for (const pattern of injuryPatterns) {
      if (text.toLowerCase().includes(pattern.toLowerCase())) {
        analysis.hasInjuryMeaning = true;
        analysis.injuryIndicators.push({
          type: 'contextual_injury',
          value: pattern,
          strength: 0.6
        });
        analysis.injuryStrength += 0.6;
        break;
      }
    }
  }

  return analysis;
}

/**
 * Determines if the exception (1.3.15) applies based on semantic analysis
 * @param {Object} semanticAnalysis - Results from semantic analysis
 * @param {Object} context - Original context
 * @returns {Object} Exception applicability determination
 */
function determineExceptionApplicability(semanticAnalysis, context) {
  const assignment = {
    appliesException: false,
    reason: '',
    confidence: 0
  };

  // Check if motion or injury meaning is present
  if (semanticAnalysis.hasMotionMeaning || semanticAnalysis.hasInjuryMeaning) {
    assignment.appliesException = true;
    
    if (semanticAnalysis.category === 'motion') {
      assignment.reason = 'Motion verb exception - does not take ātmanepada per Sutra 1.3.15';
    } else if (semanticAnalysis.category === 'injury') {
      assignment.reason = 'Injury verb exception - does not take ātmanepada per Sutra 1.3.15';
    } else {
      assignment.reason = 'Motion/injury verb exception - does not take ātmanepada per Sutra 1.3.15';
    }
    
    assignment.confidence = semanticAnalysis.semanticStrength;
  } else {
    assignment.reason = 'No motion or injury meaning detected - exception does not apply';
    assignment.confidence = 1.0 - semanticAnalysis.semanticStrength;
  }

  return assignment;
}

/**
 * Simple helper function to check if a verb has motion meaning
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @returns {boolean} True if verb has motion meaning
 */
function hasMotionMeaning(verb, context = {}) {
  try {
    const result = determineMotionInjuryException(verb, context);
    return result.success && result.semanticCategory === 'motion';
  } catch (error) {
    return false;
  }
}

/**
 * Simple helper function to check if a verb has injury meaning
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @returns {boolean} True if verb has injury meaning
 */
function hasInjuryMeaning(verb, context = {}) {
  try {
    const result = determineMotionInjuryException(verb, context);
    return result.success && result.semanticCategory === 'injury';
  } catch (error) {
    return false;
  }
}

export {
  determineMotionInjuryException,
  hasMotionMeaning,
  hasInjuryMeaning
};
