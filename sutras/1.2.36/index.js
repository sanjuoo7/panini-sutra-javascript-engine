// 1.2.36 छन्दसि वा एकश्रुतिः (chandasi vā ekaśrutiḥ) - Comprehensive Implementation
// Sanskrit Sutra: छन्दसि वा एकश्रुतिः
// Domain: Metrical Prosody and Optional Monotone Recitation
// 
// This sutra establishes optional monotone (ekashruti) recitation in metrical contexts
// (chandas). The comprehensive implementation analyzes metrical patterns, prosodic options,
// rhythmic structures, and traditional commentary to provide guidance for Vedic and
// classical Sanskrit verse recitation with flexible monotone application.
//
// Technical Implementation:
// - Multi-phase metrical analysis for verse contexts
// - Optional monotone pattern detection and recommendation
// - Traditional commentary integration with metrical theory
// - Confidence scoring for recitation flexibility
// - Support for multiple scripts (IAST/Devanagari)

import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { getAllVowels } from '../sanskrit-utils/vowel-analysis.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';

/**
 * Implements comprehensive analysis for optional monotone in metrical contexts
 * according to Panini's sutra 1.2.36 छन्दसि वा एकश्रुतिः
 * 
 * This function provides detailed analysis of when metrical contexts allow
 * optional monotone recitation versus when natural prosody is preferred
 * 
 * @param {string} text - Sanskrit text in IAST or Devanagari
 * @param {Object} context - Linguistic and metrical context
 * @param {Object} options - Analysis configuration options
 * @returns {Object} Comprehensive analysis result with recommendations
 */
export function sutra1236(text, context = {}, options = {}) {
  if (typeof text !== 'string') {
    throw new TypeError('sutra1236: text parameter must be a string');
  }
  
  if (text.trim() === '') {
    return {
      sutra: '1.2.36',
      script: 'unknown',
      analysis: { type: 'empty-input' },
      isValid: false,
      confidence: 0,
      errors: ['Empty input text']
    };
  }

  try {
    const script = detectScript(text);
    const baseResult = aggregateProsodyOptions(text, { ...context, chandas: true, _sutra: '1.2.36' }, options);
    
    // Perform comprehensive metrical monotone analysis
    const chandasAnalysis = analyzeChandasMonotone(text, context, options);
    
    return {
      sutra: '1.2.36',
      script,
      text,
      context,
      analysis: chandasAnalysis,
      isValid: true,
      confidence: chandasAnalysis.confidence,
      recommendations: chandasAnalysis.recommendations,
      traditionalCommentary: chandasAnalysis.traditionalCommentary,
      technicalNotes: chandasAnalysis.technicalNotes,
      ...baseResult
    };
  } catch (error) {
    return {
      sutra: '1.2.36',
      script: detectScript(text) || 'unknown',
      text,
      isValid: false,
      confidence: 0,
      errors: [error.message],
      analysis: { type: 'error', error: error.message }
    };
  }
}

/**
 * Core analysis function for metrical monotone patterns
 * Implements the complete logic of sutra 1.2.36
 */
function analyzeChandasMonotone(text, context, options) {
  const analysis = {
    type: 'chandas-monotone-analysis',
    phases: {
      morphological: analyzeMorphologicalForMeter(text, context),
      metricalContext: analyzeMetricalContextPatterns(text, context),
      prosodyOptions: analyzeProsodyOptionsForChandas(text, context),
      rhythmic: analyzeRhythmicFlexibility(text, context)
    },
    metricalOptions: [],
    recommendations: [],
    confidence: 0,
    traditionalCommentary: {},
    technicalNotes: []
  };

  // Phase 1: Morphological Analysis for Meter
  const morphological = analysis.phases.morphological;
  analysis.technicalNotes.push(`Morphological analysis: ${morphological.metricalSuitability} for chandas context`);

  // Phase 2: Metrical Context Analysis
  const metricalContext = analysis.phases.metricalContext;
  if (metricalContext.isChandasContext) {
    analysis.technicalNotes.push(`Metrical context confirmed: ${metricalContext.meterType}`);
  }

  // Phase 3: Prosody Options Analysis
  const prosodyOptions = analysis.phases.prosodyOptions;
  analysis.metricalOptions = prosodyOptions.availableOptions;
  analysis.technicalNotes.push(`Prosodic flexibility: ${prosodyOptions.flexibilityLevel}`);

  // Phase 4: Rhythmic Analysis
  const rhythmic = analysis.phases.rhythmic;
  analysis.technicalNotes.push(`Rhythmic pattern: ${rhythmic.recommendedApproach}`);

  // Generate comprehensive recommendations
  analysis.recommendations = generateChandasRecommendations(analysis, context);

  // Calculate confidence score
  analysis.confidence = calculateChandasConfidence(analysis);

  // Add traditional commentary
  analysis.traditionalCommentary = generateTraditionalCommentary(text, analysis, context);

  return analysis;
}

/**
 * Analyzes morphological structure for metrical contexts
 */
function analyzeMorphologicalForMeter(text, context) {
  const tokenResult = tokenizePhonemes(text);
  const tokens = tokenResult ? tokenResult.phonemes : [];
  const vowelResult = getAllVowels(text);
  const vowelCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    metricalSuitability: 'unknown',
    syllableCount: vowelCount,
    phoneticStructure: [],
    rhythmicPotential: 'unknown'
  };

  // Determine metrical suitability based on morphological patterns
  if (vowelCount >= 8) {
    analysis.metricalSuitability = 'complex-metrical';
    analysis.rhythmicPotential = 'high-flexibility';
  } else if (vowelCount >= 4) {
    analysis.metricalSuitability = 'standard-metrical';
    analysis.rhythmicPotential = 'moderate-flexibility';
  } else if (vowelCount >= 2) {
    analysis.metricalSuitability = 'simple-metrical';
    analysis.rhythmicPotential = 'limited-flexibility';
  } else {
    analysis.metricalSuitability = 'minimal-metrical';
    analysis.rhythmicPotential = 'no-flexibility';
  }

  // Analyze phonetic structure for metrical patterns
  analysis.phoneticStructure = analyzeMetricalPhoneticStructure(tokens);

  return analysis;
}

/**
 * Analyzes metrical context patterns and verse types
 */
function analyzeMetricalContextPatterns(text, context) {
  const analysis = {
    isChandasContext: false,
    meterType: 'none',
    verseStructure: 'unknown',
    contextFactors: []
  };

  // Check for specific meter types first (they have precedence)
  if (context.gayatri === true) {
    analysis.isChandasContext = true;
    analysis.meterType = 'gayatri-meter';
    analysis.verseStructure = 'tri-pada-eight-syllable';
    analysis.contextFactors.push('gayatri-meter');
  } else if (context.trishtubh === true || context.tristubh === true) {
    analysis.isChandasContext = true;
    analysis.meterType = 'trishtubh-meter';
    analysis.verseStructure = 'quad-pada-eleven-syllable';
    analysis.contextFactors.push('trishtubh-meter');
  } else if (context.jagati === true) {
    analysis.isChandasContext = true;
    analysis.meterType = 'jagati-meter';
    analysis.verseStructure = 'quad-pada-twelve-syllable';
    analysis.contextFactors.push('jagati-meter');
  } else if (context.anushtubh === true) {
    analysis.isChandasContext = true;
    analysis.meterType = 'anushtubh-meter';
    analysis.verseStructure = 'dual-pada-eight-syllable';
    analysis.contextFactors.push('anushtubh-meter');
  } else if (context.chandas === true) {
    // General chandas context (lower precedence than specific meters)
    analysis.isChandasContext = true;
    analysis.meterType = 'general-chandas';
    analysis.contextFactors.push('explicit-chandas-context');
  } else if (context.verse === true || context.poetry === true) {
    // General verse context (lowest precedence)
    analysis.isChandasContext = true;
    analysis.meterType = 'general-verse';
    analysis.contextFactors.push('verse-context');
  }

  // Detect implicit metrical markers in text
  const metricalMarkers = detectMetricalMarkers(text);
  if (metricalMarkers.length > 0) {
    analysis.isChandasContext = true;
    analysis.contextFactors.push(...metricalMarkers);
  }

  return analysis;
}

/**
 * Analyzes prosodic options available in metrical contexts
 */
function analyzeProsodyOptionsForChandas(text, context) {
  const vowelResult = getAllVowels(text);
  const syllableCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    availableOptions: [],
    flexibilityLevel: 'unknown',
    monotoneCompatibility: 'unknown',
    naturalProsodyCompatibility: 'unknown'
  };

  // Determine available prosodic options
  analysis.availableOptions.push('natural-prosody');
  
  if (syllableCount >= 2) {
    analysis.availableOptions.push('optional-monotone');
    analysis.monotoneCompatibility = 'compatible';
  } else {
    analysis.monotoneCompatibility = 'limited';
  }

  // Assess flexibility level
  if (context.chandas === true) {
    if (syllableCount >= 6) {
      analysis.flexibilityLevel = 'high-flexibility';
      analysis.availableOptions.push('mixed-prosody');
      analysis.availableOptions.push('rhythmic-variation');
    } else if (syllableCount >= 3) {
      analysis.flexibilityLevel = 'moderate-flexibility';
      analysis.availableOptions.push('rhythmic-variation');
    } else {
      analysis.flexibilityLevel = 'limited-flexibility';
    }
  } else {
    analysis.flexibilityLevel = 'minimal-flexibility';
  }

  analysis.naturalProsodyCompatibility = 'always-compatible';

  return analysis;
}

/**
 * Analyzes rhythmic flexibility for metrical recitation
 */
function analyzeRhythmicFlexibility(text, context) {
  const vowelResult = getAllVowels(text);
  const syllableCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    syllableCount,
    rhythmicPattern: 'unknown',
    recommendedApproach: 'natural',
    flexibilityFactors: [],
    rhythmicConsiderations: []
  };

  // Determine rhythmic pattern based on syllable count and context
  if (context.chandas === true) {
    if (syllableCount >= 8) {
      analysis.rhythmicPattern = 'complex-metrical';
      analysis.recommendedApproach = 'flexible-mixed';
      analysis.flexibilityFactors.push('Long verse allows variation');
    } else if (syllableCount >= 4) {
      analysis.rhythmicPattern = 'standard-metrical';
      analysis.recommendedApproach = 'optional-monotone';
      analysis.flexibilityFactors.push('Medium length suitable for options');
    } else {
      analysis.rhythmicPattern = 'simple-metrical';
      analysis.recommendedApproach = 'natural-preferred';
      analysis.flexibilityFactors.push('Short form maintains natural rhythm');
    }
  } else {
    analysis.rhythmicPattern = 'non-metrical';
    analysis.recommendedApproach = 'natural';
    analysis.flexibilityFactors.push('No metrical context detected');
  }

  // Add rhythmic considerations
  if (context.gayatri === true) {
    analysis.rhythmicConsiderations.push('Gayatri meter prefers measured rhythm');
  }
  if (context.trishtubh === true) {
    analysis.rhythmicConsiderations.push('Trishtubh allows greater rhythmic freedom');
  }
  if (syllableCount > 6) {
    analysis.rhythmicConsiderations.push('Longer forms benefit from prosodic variation');
  }

  return analysis;
}

/**
 * Generates comprehensive recommendations for metrical monotone
 */
function generateChandasRecommendations(analysis, context) {
  const recommendations = [];

  const { metricalContext, prosodyOptions, rhythmic } = analysis.phases;

  // Primary recommendation based on metrical context
  if (metricalContext.isChandasContext) {
    recommendations.push({
      type: 'optional-monotone',
      priority: 'high',
      description: 'Apply optional monotone (ekashruti) in metrical context',
      justification: `Chandas context detected: ${metricalContext.meterType}`
    });

    recommendations.push({
      type: 'prosodic-flexibility',
      priority: 'high',
      description: 'Maintain flexibility between natural and monotone prosody',
      justification: 'Metrical contexts allow prosodic variation per sutra 1.2.36'
    });
  } else {
    recommendations.push({
      type: 'natural-prosody',
      priority: 'medium',
      description: 'Use natural prosodic pattern',
      justification: 'No metrical context detected'
    });
  }

  // Specific recommendations based on meter type
  if (context.gayatri === true) {
    recommendations.push({
      type: 'gayatri-prosody',
      priority: 'medium',
      description: 'Apply Gayatri-specific rhythmic patterns',
      justification: 'Gayatri meter has traditional prosodic conventions'
    });
  }

  if (context.trishtubh === true) {
    recommendations.push({
      type: 'trishtubh-flexibility',
      priority: 'medium',
      description: 'Utilize full prosodic flexibility available in Trishtubh',
      justification: 'Trishtubh meter allows maximum rhythmic variation'
    });
  }

  // Flexibility recommendations
  if (prosodyOptions.flexibilityLevel === 'high-flexibility') {
    recommendations.push({
      type: 'mixed-prosody',
      priority: 'medium',
      description: 'Consider mixed prosodic approach within verse',
      justification: 'High flexibility allows intra-verse prosodic variation'
    });
  }

  return recommendations;
}

/**
 * Calculates confidence score for metrical monotone analysis
 */
function calculateChandasConfidence(analysis) {
  let confidence = 0.68; // Base confidence (for non-metrical contexts)

  const { morphological, metricalContext, prosodyOptions, rhythmic } = analysis.phases;

  // Adjust base confidence for metrical contexts
  if (metricalContext.isChandasContext) {
    // Specific meter types get highest confidence
    if (metricalContext.meterType.includes('meter')) {
      confidence = 0.85; // Specific meters (gayatri, trishtubh, etc.)
    } else if (metricalContext.meterType === 'general-chandas') {
      confidence = 0.82; // Explicit chandas context
    } else if (metricalContext.meterType === 'general-verse') {
      confidence = 0.77; // General verse context (moderate)
    }
    
    // Additional factors for metrical contexts
    if (metricalContext.contextFactors.length > 1) {
      confidence += 0.02;
    }
  }

  // Increase confidence for clear morphological patterns
  if (morphological.metricalSuitability !== 'unknown') {
    confidence += 0.04;
    if (morphological.rhythmicPotential === 'high-flexibility') {
      confidence += 0.02;
    }
  }

  // Adjust for prosody options clarity
  if (prosodyOptions.flexibilityLevel !== 'unknown') {
    confidence += 0.04;
    if (prosodyOptions.availableOptions.length > 2) {
      confidence += 0.02;
    }
  }

  // Adjust for rhythmic analysis
  if (rhythmic.recommendedApproach !== 'unknown') {
    confidence += 0.02;
  }

  return Math.min(confidence, 1.0);
}

/**
 * Generates traditional commentary following classical grammatical tradition
 */
function generateTraditionalCommentary(text, analysis, context) {
  const commentary = {
    sutraText: 'छन्दसि वा एकश्रुतिः',
    meaning: 'In chandas (meter), ekashruti (monotone) is optional (vā)',
    context: 'Metrical prosody and optional recitation patterns',
    traditionalInterpretation: '',
    scholasticNotes: [],
    practicalApplication: ''
  };

  // Traditional interpretation based on analysis
  if (analysis.phases.metricalContext.isChandasContext) {
    commentary.traditionalInterpretation = 
      'The sutra establishes that in metrical contexts (chandas), monotone recitation ' +
      '(ekashruti) becomes optional (vā) rather than mandatory. This optionality allows ' +
      'for prosodic flexibility in verse recitation, accommodating both natural accent ' +
      'patterns and uniform monotone delivery according to reciter preference and context.';
  } else {
    commentary.traditionalInterpretation = 
      'While this text does not occur in explicit metrical context, the sutra\'s principle ' +
      'of prosodic optionality in verse provides guidance for understanding accentual ' +
      'flexibility in rhythmic and poetic contexts.';
  }

  // Scholastic notes based on detected patterns
  if (context.gayatri === true) {
    commentary.scholasticNotes.push(
      'Gayatri-chandas-vidhi: Gayatri meter allows measured monotone or natural rhythm'
    );
  }

  if (context.trishtubh === true) {
    commentary.scholasticNotes.push(
      'Trishtubh-chandas-vidhi: Trishtubh meter offers maximum prosodic flexibility'
    );
  }

  if (analysis.phases.morphological.syllableCount >= 8) {
    commentary.scholasticNotes.push(
      'Dīrgha-chandas-vidhi: Longer verses benefit from prosodic variation within optional framework'
    );
  }

  if (analysis.phases.prosodyOptions.flexibilityLevel === 'high-flexibility') {
    commentary.scholasticNotes.push(
      'Vikalpādhikāra: High flexibility allows multiple valid prosodic approaches'
    );
  }

  // Practical application guidance
  commentary.practicalApplication = generatePracticalGuidance(analysis, context);

  return commentary;
}

/**
 * Helper functions for detailed analysis
 */

function analyzeMetricalPhoneticStructure(tokens) {
  if (!Array.isArray(tokens)) {
    return [];
  }
  
  const structure = [];
  let currentSyllable = '';
  
  for (const token of tokens) {
    if (token && token.match(/[aeiouāīūṛṝḷḹaiauṁṃḥ]/i)) {
      currentSyllable += token;
      if (currentSyllable.length > 0) {
        structure.push({
          syllable: currentSyllable,
          type: determineVowelType(token),
          metricalWeight: calculateMetricalWeight(currentSyllable)
        });
        currentSyllable = '';
      }
    } else {
      currentSyllable += token;
    }
  }
  
  if (currentSyllable) {
    structure.push({
      syllable: currentSyllable,
      type: 'consonant-cluster',
      metricalWeight: 'neutral'
    });
  }
  
  return structure;
}

function determineVowelType(vowel) {
  if (vowel.match(/[āīūṛṝḷḹ]/)) {
    return 'long';
  } else if (vowel.match(/[aeiou]/)) {
    return 'short';
  } else if (vowel.match(/[aiauṁṃḥ]/)) {
    return 'complex';
  }
  return 'unknown';
}

function calculateMetricalWeight(syllable) {
  if (syllable.match(/[āīūṛṝḷḹ]/)) {
    return 'heavy';
  } else if (syllable.match(/[aeiou]$/)) {
    return 'light';
  } else {
    return 'position-heavy'; // Consonant following makes it heavy by position
  }
}

function detectMetricalMarkers(text) {
  const markers = [];
  
  // Vedic accent marks
  if (text.match(/[॒॑]/)) {
    markers.push('vedic-accented');
  }
  
  // Long compound patterns (typical of verse)
  if (text.length > 12 && text.match(/[āīūṛṝḷḹ].*[āīūṛṝḷḹ]/)) {
    markers.push('verse-pattern');
  }
  
  // Repetitive sound patterns
  if (text.match(/(.)\1/) || text.match(/([aeiou]).*\1/)) {
    markers.push('rhythmic-repetition');
  }
  
  return markers;
}

function generatePracticalGuidance(analysis, context) {
  const guidance = [];
  
  if (analysis.phases.metricalContext.isChandasContext) {
    guidance.push('In metrical context, choose between natural and monotone prosody based on recitation purpose');
  }
  
  if (analysis.phases.prosodyOptions.flexibilityLevel === 'high-flexibility') {
    guidance.push('High flexibility allows mixing prosodic approaches within verse');
  }
  
  if (context.gayatri === true) {
    guidance.push('Gayatri meter benefits from measured, consistent prosodic approach');
  }
  
  if (context.trishtubh === true) {
    guidance.push('Trishtubh meter allows maximum rhythmic and prosodic variation');
  }
  
  if (analysis.phases.morphological.syllableCount < 3) {
    guidance.push('Short forms maintain natural prosody more effectively');
  }
  
  return guidance.join('; ');
}

export default sutra1236;
