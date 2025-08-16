/**
 * Sanskrit Sutra 1.3.16: इतरेतरान्योन्योपपदाच्च
 * 
 * Rule: "itaretarānyonyopapadācca" 
 * Translation: "And from [verbs with] itaretara and anyonya as upapada"
 * 
 * This sutra provides another exception to 1.3.14 (कर्त्तरि कर्म्मव्यतिहारे).
 * When verbs are used with the compound words इतरेतर (itaretara - "each other")
 * or अन्योन्य (anyonya - "one another") as उपपद (qualifying/dependent words),
 * ātmanepada endings are NOT used, even though reciprocal action is expressed.
 * 
 * @author AI Sanskrit Grammar Assistant
 * @version 1.0.0
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if a verb with itaretara/anyonya compounds should NOT use ātmanepada
 * even in reciprocal contexts (exception to Sutra 1.3.14)
 * @param {string} verb - Sanskrit verb to analyze
 * @param {Object} context - Context information about the verb usage
 * @param {string} [context.upapada] - Qualifying words (upapada) used with the verb
 * @param {string} [context.compounds] - Compound expressions in the sentence
 * @param {string} [context.expression] - Full expression or sentence
 * @param {Array} [context.qualifiers] - Array of qualifying words
 * @param {boolean} [context.includeAnalysis] - Include detailed analysis
 * @param {boolean} [context.forceItaretara] - Force itaretara detection for testing
 * @param {boolean} [context.forceAnyonya] - Force anyonya detection for testing
 * @returns {Object} Analysis result with exception determination
 */
function determineItaretaraAnyonyaException(verb, context = {}) {
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
    
    if (!isValidSanskrit && !context.forceItaretara && !context.forceAnyonya) {
      return {
        success: false,
        error: `Invalid Sanskrit word: ${verb}`,
        verb: verb
      };
    }

    // Analyze for itaretara/anyonya compound usage
    const compoundAnalysis = analyzeItaretaraAnyonyaUsage(verb, context, script);
    
    // Determine exception applicability
    const exceptionAssignment = determineCompoundExceptionApplicability(compoundAnalysis, context);
    
    return {
      success: true,
      verb: verb,
      script: script,
      appliesException: exceptionAssignment.appliesException,
      reason: exceptionAssignment.reason,
      confidence: exceptionAssignment.confidence,
      compoundType: compoundAnalysis.compoundType,
      compoundAnalysis: context.includeAnalysis ? compoundAnalysis : undefined,
      rule: '1.3.16',
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
 * Analyzes context for itaretara/anyonya compound usage
 * @param {string} verb - Sanskrit verb
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} Compound usage analysis result
 */
function analyzeItaretaraAnyonyaUsage(verb, context, script) {
  const analysis = {
    hasItaretara: false,
    hasAnyonya: false,
    compoundType: 'none',
    compoundIndicators: [],
    compoundStrength: 0,
    upapadaEvidence: []
  };

  // Check for force flags (for testing)
  if (context.forceItaretara) {
    analysis.hasItaretara = true;
    analysis.compoundType = 'itaretara';
    analysis.compoundIndicators.push({
      type: 'forced_classification',
      value: 'itaretara',
      strength: 1.0
    });
    analysis.compoundStrength = 1.0;
    return analysis;
  }

  if (context.forceAnyonya) {
    analysis.hasAnyonya = true;
    analysis.compoundType = 'anyonya';
    analysis.compoundIndicators.push({
      type: 'forced_classification',
      value: 'anyonya',
      strength: 1.0
    });
    analysis.compoundStrength = 1.0;
    return analysis;
  }

  // Analyze upapada (qualifying words) field
  if (context.upapada) {
    const upapadaAnalysis = analyzeUpapadaForCompounds(context.upapada);
    if (upapadaAnalysis.hasItaretara) {
      analysis.hasItaretara = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(upapadaAnalysis.indicators);
      analysis.compoundStrength += upapadaAnalysis.strength;
    }
    if (upapadaAnalysis.hasAnyonya) {
      analysis.hasAnyonya = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(upapadaAnalysis.indicators);
      analysis.compoundStrength += upapadaAnalysis.strength;
    }
  }

  // Analyze compounds field
  if (context.compounds) {
    const compoundsAnalysis = analyzeCompoundsField(context.compounds);
    if (compoundsAnalysis.hasItaretara) {
      analysis.hasItaretara = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(compoundsAnalysis.indicators);
      analysis.compoundStrength += compoundsAnalysis.strength;
    }
    if (compoundsAnalysis.hasAnyonya) {
      analysis.hasAnyonya = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(compoundsAnalysis.indicators);
      analysis.compoundStrength += compoundsAnalysis.strength;
    }
  }

  // Analyze full expression
  if (context.expression) {
    const expressionAnalysis = analyzeExpressionForCompounds(context.expression);
    if (expressionAnalysis.hasItaretara) {
      analysis.hasItaretara = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(expressionAnalysis.indicators);
      analysis.compoundStrength += expressionAnalysis.strength;
    }
    if (expressionAnalysis.hasAnyonya) {
      analysis.hasAnyonya = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(expressionAnalysis.indicators);
      analysis.compoundStrength += expressionAnalysis.strength;
    }
  }

  // Analyze qualifiers array
  if (context.qualifiers && Array.isArray(context.qualifiers)) {
    const qualifiersAnalysis = analyzeQualifiersForCompounds(context.qualifiers);
    if (qualifiersAnalysis.hasItaretara) {
      analysis.hasItaretara = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(qualifiersAnalysis.indicators);
      analysis.compoundStrength += qualifiersAnalysis.strength;
    }
    if (qualifiersAnalysis.hasAnyonya) {
      analysis.hasAnyonya = true;
      analysis.compoundIndicators = analysis.compoundIndicators.concat(qualifiersAnalysis.indicators);
      analysis.compoundStrength += qualifiersAnalysis.strength;
    }
  }

  // Determine primary compound type
  if (analysis.hasItaretara && analysis.hasAnyonya) {
    // If both, determine which is stronger
    const itaretaraStrength = analysis.compoundIndicators
      .filter(ind => ind.value.includes('itaretara') || ind.value.includes('इतरेतर'))
      .reduce((sum, ind) => sum + ind.strength, 0);
    const anyonyaStrength = analysis.compoundIndicators
      .filter(ind => ind.value.includes('anyonya') || ind.value.includes('अन्योन्य'))
      .reduce((sum, ind) => sum + ind.strength, 0);
    analysis.compoundType = itaretaraStrength >= anyonyaStrength ? 'itaretara' : 'anyonya';
  } else if (analysis.hasItaretara) {
    analysis.compoundType = 'itaretara';
  } else if (analysis.hasAnyonya) {
    analysis.compoundType = 'anyonya';
  }

  // Cap compound strength
  analysis.compoundStrength = Math.min(analysis.compoundStrength, 1.0);

  return analysis;
}

/**
 * Analyzes upapada (qualifying words) for itaretara/anyonya compounds
 * @param {string} upapada - Upapada text to analyze
 * @returns {Object} Upapada analysis result
 */
function analyzeUpapadaForCompounds(upapada) {
  const analysis = {
    hasItaretara: false,
    hasAnyonya: false,
    indicators: [],
    strength: 0
  };

  // Itaretara patterns (both IAST and Devanagari)
  const itaretaraPatterns = [
    'itaretara', 'इतरेतर', 'itara-itara', 'each other', 'one after another'
  ];

  // Anyonya patterns (both IAST and Devanagari)
  const anyonyaPatterns = [
    'anyonya', 'अन्योन्य', 'anya-anya', 'one another', 'mutually'
  ];

  for (const pattern of itaretaraPatterns) {
    if (upapada.toLowerCase().includes(pattern.toLowerCase())) {
      analysis.hasItaretara = true;
      analysis.indicators.push({
        type: 'upapada_itaretara',
        value: pattern,
        strength: 0.9
      });
      analysis.strength += 0.9;
      break;
    }
  }

  for (const pattern of anyonyaPatterns) {
    if (upapada.toLowerCase().includes(pattern.toLowerCase())) {
      analysis.hasAnyonya = true;
      analysis.indicators.push({
        type: 'upapada_anyonya',
        value: pattern,
        strength: 0.9
      });
      analysis.strength += 0.9;
      break;
    }
  }

  return analysis;
}

/**
 * Analyzes compounds field for itaretara/anyonya
 * @param {string} compounds - Compounds text to analyze
 * @returns {Object} Compounds analysis result
 */
function analyzeCompoundsField(compounds) {
  const analysis = {
    hasItaretara: false,
    hasAnyonya: false,
    indicators: [],
    strength: 0
  };

  // Same patterns as upapada but slightly lower strength
  const itaretaraPatterns = [
    'itaretara', 'इतरेतर', 'itara-itara', 'each other'
  ];

  const anyonyaPatterns = [
    'anyonya', 'अन्योन्य', 'anya-anya', 'one another'
  ];

  for (const pattern of itaretaraPatterns) {
    if (compounds.toLowerCase().includes(pattern.toLowerCase())) {
      analysis.hasItaretara = true;
      analysis.indicators.push({
        type: 'compound_itaretara',
        value: pattern,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break;
    }
  }

  for (const pattern of anyonyaPatterns) {
    if (compounds.toLowerCase().includes(pattern.toLowerCase())) {
      analysis.hasAnyonya = true;
      analysis.indicators.push({
        type: 'compound_anyonya',
        value: pattern,
        strength: 0.8
      });
      analysis.strength += 0.8;
      break;
    }
  }

  return analysis;
}

/**
 * Analyzes full expression for itaretara/anyonya compounds
 * @param {string} expression - Expression text to analyze
 * @returns {Object} Expression analysis result
 */
function analyzeExpressionForCompounds(expression) {
  const analysis = {
    hasItaretara: false,
    hasAnyonya: false,
    indicators: [],
    strength: 0
  };

  // Extended patterns for full expressions
  const itaretaraPatterns = [
    'itaretara', 'इतरेतर', 'each other', 'one after another',
    'respectively', 'in turn', 'alternately'
  ];

  const anyonyaPatterns = [
    'anyonya', 'अन्योन्य', 'one another', 'mutually',
    'reciprocally', 'between themselves'
  ];

  for (const pattern of itaretaraPatterns) {
    if (expression.toLowerCase().includes(pattern.toLowerCase())) {
      analysis.hasItaretara = true;
      analysis.indicators.push({
        type: 'expression_itaretara',
        value: pattern,
        strength: 0.7
      });
      analysis.strength += 0.7;
      break;
    }
  }

  for (const pattern of anyonyaPatterns) {
    if (expression.toLowerCase().includes(pattern.toLowerCase())) {
      analysis.hasAnyonya = true;
      analysis.indicators.push({
        type: 'expression_anyonya',
        value: pattern,
        strength: 0.7
      });
      analysis.strength += 0.7;
      break;
    }
  }

  return analysis;
}

/**
 * Analyzes qualifiers array for itaretara/anyonya
 * @param {Array} qualifiers - Array of qualifier strings
 * @returns {Object} Qualifiers analysis result
 */
function analyzeQualifiersForCompounds(qualifiers) {
  const analysis = {
    hasItaretara: false,
    hasAnyonya: false,
    indicators: [],
    strength: 0
  };

  for (const qualifier of qualifiers) {
    if (typeof qualifier === 'string') {
      const itaretaraCheck = analyzeUpapadaForCompounds(qualifier);
      const anyonyaCheck = analyzeUpapadaForCompounds(qualifier);
      
      if (itaretaraCheck.hasItaretara) {
        analysis.hasItaretara = true;
        analysis.indicators = analysis.indicators.concat(
          itaretaraCheck.indicators.map(ind => ({
            ...ind,
            type: 'qualifier_itaretara',
            strength: ind.strength * 0.8  // Slightly reduced strength
          }))
        );
        analysis.strength += itaretaraCheck.strength * 0.8;
      }
      
      if (anyonyaCheck.hasAnyonya) {
        analysis.hasAnyonya = true;
        analysis.indicators = analysis.indicators.concat(
          anyonyaCheck.indicators.map(ind => ({
            ...ind,
            type: 'qualifier_anyonya',
            strength: ind.strength * 0.8
          }))
        );
        analysis.strength += anyonyaCheck.strength * 0.8;
      }
    }
  }

  return analysis;
}

/**
 * Determines if the exception (1.3.16) applies based on compound analysis
 * @param {Object} compoundAnalysis - Results from compound analysis
 * @param {Object} context - Original context
 * @returns {Object} Exception applicability determination
 */
function determineCompoundExceptionApplicability(compoundAnalysis, context) {
  const assignment = {
    appliesException: false,
    reason: '',
    confidence: 0
  };

  // Check if itaretara or anyonya compounds are present
  if (compoundAnalysis.hasItaretara || compoundAnalysis.hasAnyonya) {
    assignment.appliesException = true;
    
    if (compoundAnalysis.compoundType === 'itaretara') {
      assignment.reason = 'Itaretara compound exception - does not take ātmanepada per Sutra 1.3.16';
    } else if (compoundAnalysis.compoundType === 'anyonya') {
      assignment.reason = 'Anyonya compound exception - does not take ātmanepada per Sutra 1.3.16';
    } else {
      assignment.reason = 'Itaretara/anyonya compound exception - does not take ātmanepada per Sutra 1.3.16';
    }
    
    assignment.confidence = compoundAnalysis.compoundStrength;
  } else {
    assignment.reason = 'No itaretara/anyonya compounds detected - exception does not apply';
    assignment.confidence = 1.0 - compoundAnalysis.compoundStrength;
  }

  return assignment;
}

/**
 * Simple helper function to check if expression has itaretara compounds
 * @param {string} expression - Text to analyze
 * @returns {boolean} True if itaretara compounds found
 */
function hasItaretaraCompound(expression) {
  try {
    const result = determineItaretaraAnyonyaException('test', { expression });
    return result.success && result.compoundType === 'itaretara';
  } catch (error) {
    return false;
  }
}

/**
 * Simple helper function to check if expression has anyonya compounds
 * @param {string} expression - Text to analyze
 * @returns {boolean} True if anyonya compounds found
 */
function hasAnyonyaCompound(expression) {
  try {
    const result = determineItaretaraAnyonyaException('test', { expression });
    return result.success && result.compoundType === 'anyonya';
  } catch (error) {
    return false;
  }
}

export {
  determineItaretaraAnyonyaException,
  hasItaretaraCompound,
  hasAnyonyaCompound
};
