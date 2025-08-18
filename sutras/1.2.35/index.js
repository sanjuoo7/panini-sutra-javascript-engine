// 1.2.35 वषट्कारे उदात्तः (vaṣaṭkāre udāttaḥ) - Comprehensive Implementation
// Sanskrit Sutra: वषट्कारे उदात्तः
// Domain: Ritual Exclamation Prosody and Vedic Accent Patterns
// 
// This sutra establishes the special prosodic treatment of vaṣaṭ (वषट्), the sacred
// exclamation used in Vedic ritual contexts. The comprehensive implementation analyzes
// morphological structure, ritual contexts, prosodic elevation patterns, and traditional
// commentary to provide accurate guidance for this specialized liturgical form.
//
// Technical Implementation:
// - Multi-phase prosodic analysis for ritual exclamations
// - Vaṣaṭ variant detection and classification
// - Traditional commentary integration with ritual context
// - Confidence scoring for elevation recommendations
// - Support for multiple scripts (IAST/Devanagari)

import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { getAllVowels } from '../sanskrit-utils/vowel-analysis.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';

/**
 * Implements comprehensive analysis for vaṣaṭ exclamation prosody
 * according to Panini's sutra 1.2.35 वषट्कारे उदात्तः
 * 
 * This function provides detailed analysis of when ritual exclamations require
 * elevated/raised prosodic treatment, specifically for vaṣaṭ and related forms
 * 
 * @param {string} text - Sanskrit text in IAST or Devanagari
 * @param {Object} context - Linguistic and ritual context
 * @param {Object} options - Analysis configuration options
 * @returns {Object} Comprehensive analysis result with recommendations
 */
export function sutra1235(text, context = {}, options = {}) {
  if (typeof text !== 'string') {
    throw new TypeError('sutra1235: text parameter must be a string');
  }
  
  if (text.trim() === '') {
    return {
      sutra: '1.2.35',
      script: 'unknown',
      analysis: { type: 'empty-input' },
      isValid: false,
      confidence: 0,
      errors: ['Empty input text']
    };
  }

  try {
    const script = detectScript(text);
    const baseResult = aggregateProsodyOptions(text, { ...context, _sutra: '1.2.35' }, options);
    
    // Perform comprehensive vaṣaṭ exclamation analysis
    const vasatAnalysis = analyzeVasatExclamation(text, context, options);
    
    return {
      sutra: '1.2.35',
      script,
      text,
      context,
      analysis: vasatAnalysis,
      isValid: true,
      confidence: vasatAnalysis.confidence,
      recommendations: vasatAnalysis.recommendations,
      traditionalCommentary: vasatAnalysis.traditionalCommentary,
      technicalNotes: vasatAnalysis.technicalNotes,
      ...baseResult
    };
  } catch (error) {
    return {
      sutra: '1.2.35',
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
 * Core analysis function for vaṣaṭ exclamation patterns
 * Implements the complete logic of sutra 1.2.35
 */
function analyzeVasatExclamation(text, context, options) {
  const analysis = {
    type: 'vasat-exclamation-analysis',
    phases: {
      morphological: analyzeMorphologicalStructure(text, context),
      vasatDetection: analyzeVasatPatterns(text, context),
      ritualContext: analyzeRitualExclamationContext(text, context),
      prosodic: analyzeProsodyForExclamation(text, context)
    },
    vasatVariants: [],
    recommendations: [],
    confidence: 0,
    traditionalCommentary: {},
    technicalNotes: []
  };

  // Phase 1: Morphological Analysis
  const morphological = analysis.phases.morphological;
  analysis.technicalNotes.push(`Morphological analysis: ${morphological.exclamationType} structure detected`);

  // Phase 2: Vaṣaṭ Pattern Detection
  const vasatDetection = analysis.phases.vasatDetection;
  analysis.vasatVariants = vasatDetection.detectedVariants;
  if (vasatDetection.isVasatForm) {
    analysis.technicalNotes.push(`Vaṣaṭ form confirmed: ${vasatDetection.vasatType}`);
  }

  // Phase 3: Ritual Context Analysis
  const ritualContext = analysis.phases.ritualContext;
  if (ritualContext.isRitualExclamation) {
    analysis.technicalNotes.push(`Ritual exclamation context: ${ritualContext.exclamationFunction}`);
  }

  // Phase 4: Prosodic Analysis for Exclamation
  const prosodic = analysis.phases.prosodic;
  analysis.technicalNotes.push(`Prosodic recommendation: ${prosodic.recommendedPattern}`);

  // Generate comprehensive recommendations
  analysis.recommendations = generateVasatRecommendations(analysis, context);

  // Calculate confidence score
  analysis.confidence = calculateVasatConfidence(analysis);

  // Add traditional commentary
  analysis.traditionalCommentary = generateTraditionalCommentary(text, analysis, context);

  return analysis;
}

/**
 * Analyzes morphological structure for exclamation forms
 */
function analyzeMorphologicalStructure(text, context) {
  const tokenResult = tokenizePhonemes(text);
  const tokens = tokenResult ? tokenResult.phonemes : [];
  const vowelResult = getAllVowels(text);
  const vowelCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    exclamationType: 'unknown',
    syllableCount: vowelCount,
    phoneticStructure: [],
    ritualSuitability: 'unknown'
  };

  // Detect exclamation type based on morphological patterns
  if (text.match(/^vaṣaṭ$/i) || text.match(/^वषट्$/)) {
    analysis.exclamationType = 'vasat-primary';
    analysis.ritualSuitability = 'ritual-exclamation';
  } else if (text.match(/vaṣaṭkāra|वषट्कार/i)) {
    analysis.exclamationType = 'vasat-compound';
    analysis.ritualSuitability = 'ritual-technical';
  } else if (text.match(/mahāvaṣaṭ|.*vaṣaṭ$/i)) {
    analysis.exclamationType = 'vasat-compound';
    analysis.ritualSuitability = 'extended-compound';
  } else if (text.match(/ṭ$|ट्$/)) {
    analysis.exclamationType = 'exclamatory-ending';
    analysis.ritualSuitability = 'potential-exclamation';
  } else if (tokens.length <= 3 && vowelCount <= 2) {
    analysis.exclamationType = 'short-exclamation';
    analysis.ritualSuitability = 'simple-form';
  } else {
    analysis.exclamationType = 'regular-word';
    analysis.ritualSuitability = 'non-exclamatory';
  }

  // Analyze phonetic structure
  analysis.phoneticStructure = analyzePhoneticStructure(tokens);

  return analysis;
}

/**
 * Analyzes vaṣaṭ pattern detection and classification
 */
function analyzeVasatPatterns(text, context) {
  const detectedVariants = [];
  const analysis = {
    isVasatForm: false,
    vasatType: 'none',
    variantFeatures: [],
    prosodyRequirements: []
  };

  // Primary vaṣaṭ detection
  if (text.match(/^vaṣaṭ$/i) || text.match(/^वषट्$/)) {
    analysis.isVasatForm = true;
    analysis.vasatType = 'canonical-vasat';
    detectedVariants.push('canonical-vasat');
    analysis.prosodyRequirements.push('elevated-pitch');
    analysis.variantFeatures.push('ritual-primary');
  }

  // Compound vaṣaṭ forms
  if (text.match(/vaṣaṭkāra/i) || text.match(/वषट्कार/)) {
    analysis.isVasatForm = true;
    analysis.vasatType = 'vasat-compound';
    detectedVariants.push('vasat-compound');
    analysis.prosodyRequirements.push('compound-elevation');
    analysis.variantFeatures.push('technical-term');
  }

  // Extended vaṣaṭ phrases
  if (text.match(/vaṣaṭ.*kṛ|वषट्.*कृ/i)) {
    analysis.isVasatForm = true;
    analysis.vasatType = 'vasat-verbal';
    detectedVariants.push('vasat-verbal');
    analysis.prosodyRequirements.push('verbal-elevation');
    analysis.variantFeatures.push('action-oriented');
  }

  // Contextual vaṣaṭ (in ritual sequences)
  if (context.ritual === true && text.match(/ṭ$/)) {
    analysis.vasatType = 'contextual-vasat';
    detectedVariants.push('contextual-exclamation');
    analysis.prosodyRequirements.push('contextual-elevation');
    analysis.variantFeatures.push('ritual-sequence');
  }

  analysis.detectedVariants = detectedVariants;
  return analysis;
}

/**
 * Analyzes ritual exclamation context patterns
 */
function analyzeRitualExclamationContext(text, context) {
  const analysis = {
    isRitualExclamation: false,
    exclamationFunction: 'none',
    ritualRole: 'unknown',
    contextFactors: []
  };

  // Check for explicit ritual context
  if (context.ritual === true) {
    analysis.isRitualExclamation = true;
    analysis.exclamationFunction = 'ritual-liturgical';
    analysis.contextFactors.push('explicit-ritual-context');
  }

  // Check for Vedic context
  if (context.vedic === true || context.yajna === true) {
    analysis.isRitualExclamation = true;
    analysis.exclamationFunction = 'vedic-yajna';
    analysis.ritualRole = 'sacrificial-exclamation';
    analysis.contextFactors.push('vedic-context');
  }

  // Check for oblation context
  if (context.oblation === true || context.havana === true) {
    analysis.isRitualExclamation = true;
    analysis.exclamationFunction = 'oblation-marker';
    analysis.ritualRole = 'offering-signal';
    analysis.contextFactors.push('oblation-context');
  }

  // Detect implicit ritual markers
  const ritualMarkers = detectExclamationMarkers(text);
  if (ritualMarkers.length > 0) {
    analysis.isRitualExclamation = true;
    analysis.contextFactors.push(...ritualMarkers);
  }

  return analysis;
}

/**
 * Analyzes prosodic patterns specifically for exclamation contexts
 */
function analyzeProsodyForExclamation(text, context) {
  const vowelResult = getAllVowels(text);
  const syllableCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    syllableCount,
    naturalPattern: 'unknown',
    recommendedPattern: 'elevated',
    elevationFeatures: [],
    rhythmicConsiderations: []
  };

  // Determine natural prosodic pattern
  if (syllableCount === 1) {
    analysis.naturalPattern = 'monosyllabic-exclamation';
    analysis.rhythmicConsiderations.push('Single syllable requires clear elevation');
  } else if (syllableCount === 2) {
    analysis.naturalPattern = 'disyllabic-exclamation';
    analysis.rhythmicConsiderations.push('Two syllables allow accent-elevation pattern');
  } else {
    analysis.naturalPattern = 'complex-exclamation';
    analysis.rhythmicConsiderations.push('Multiple syllables need structured elevation');
  }

  // Determine recommended pattern based on context and form
  if (text.match(/^vaṣaṭ$/i)) {
    analysis.recommendedPattern = 'elevated-final';
    analysis.elevationFeatures.push('Terminal elevation on ṭ');
  } else if (context.ritual === true) {
    analysis.recommendedPattern = 'ritual-elevated';
    analysis.elevationFeatures.push('Ritual context elevation');
  } else {
    analysis.recommendedPattern = 'natural';
    analysis.elevationFeatures.push('No special elevation required');
  }

  return analysis;
}

/**
 * Generates comprehensive recommendations for vaṣaṭ exclamation
 */
function generateVasatRecommendations(analysis, context) {
  const recommendations = [];

  const { vasatDetection, ritualContext, prosodic } = analysis.phases;

  // Primary recommendation based on vaṣaṭ detection
  if (vasatDetection.isVasatForm) {
    recommendations.push({
      type: 'vasat-elevation',
      priority: 'high',
      description: 'Apply elevated prosody for vaṣaṭ exclamation',
      justification: `Vaṣaṭ form detected: ${vasatDetection.vasatType}`
    });
  }

  // Ritual context recommendations
  if (ritualContext.isRitualExclamation) {
    recommendations.push({
      type: 'ritual-exclamation',
      priority: 'high',
      description: 'Use ritual exclamation prosody with appropriate elevation',
      justification: `Ritual exclamation context: ${ritualContext.exclamationFunction}`
    });
  }

  // Prosodic pattern recommendations
  if (prosodic.recommendedPattern === 'elevated-final') {
    recommendations.push({
      type: 'terminal-elevation',
      priority: 'medium',
      description: 'Apply terminal elevation to final syllable',
      justification: 'Final syllable elevation pattern for vaṣaṭ'
    });
  }

  // Non-vaṣaṭ form handling
  if (!vasatDetection.isVasatForm && !ritualContext.isRitualExclamation) {
    recommendations.push({
      type: 'natural-prosody',
      priority: 'medium',
      description: 'Use natural prosodic pattern without special elevation',
      justification: 'No vaṣaṭ form or ritual exclamation context detected'
    });
  }

  return recommendations;
}

/**
 * Calculates confidence score for vaṣaṭ exclamation analysis
 */
function calculateVasatConfidence(analysis) {
  let confidence = 0.5; // Base confidence

  const { morphological, vasatDetection, ritualContext, prosodic } = analysis.phases;

  // Increase confidence for clear morphological patterns
  if (morphological.exclamationType === 'vasat-primary') {
    confidence += 0.25; // High boost for canonical vaṣaṭ
  } else if (morphological.exclamationType === 'vasat-compound') {
    confidence += 0.15; // Moderate boost for compounds
  } else if (morphological.exclamationType !== 'unknown') {
    confidence += 0.1; // Small boost for any classification
  }

  // High confidence for clear vaṣaṭ detection
  if (vasatDetection.isVasatForm) {
    confidence += 0.15;
    if (vasatDetection.vasatType === 'canonical-vasat') {
      confidence += 0.1; // Extra for canonical
    }
  }

  // Adjust for ritual context clarity
  if (ritualContext.isRitualExclamation) {
    confidence += 0.1;
    if (ritualContext.contextFactors.length > 1) {
      confidence += 0.05;
    }
  }

  // Adjust for prosodic pattern clarity
  if (prosodic.recommendedPattern === 'elevated-final') {
    confidence += 0.1;
  } else if (prosodic.recommendedPattern !== 'unknown') {
    confidence += 0.05;
  }

  // Reduce confidence for exclamatory endings and regular words
  if (morphological.exclamationType === 'exclamatory-ending') {
    confidence = Math.min(confidence, 0.75); // Cap at 75% for potential exclamations
  } else if (morphological.exclamationType === 'regular-word') {
    confidence = Math.min(confidence, 0.65); // Cap at 65% for regular words
  }

  return Math.min(confidence, 1.0);
}

/**
 * Generates traditional commentary following classical grammatical tradition
 */
function generateTraditionalCommentary(text, analysis, context) {
  const commentary = {
    sutraText: 'वषट्कारे उदात्तः',
    meaning: 'In vaṣaṭ exclamation, (there is) udātta (elevated accent)',
    context: 'Ritual exclamation prosody and Vedic accent patterns',
    traditionalInterpretation: '',
    scholasticNotes: [],
    practicalApplication: ''
  };

  // Traditional interpretation based on analysis
  if (analysis.phases.vasatDetection.isVasatForm) {
    commentary.traditionalInterpretation = 
      'The sutra establishes that vaṣaṭ, the sacred exclamation used in Vedic rituals, ' +
      'receives elevated prosodic treatment (udātta accent). This elevation marks the ' +
      'exclamation\'s special function in liturgical contexts and ensures proper ritual efficacy.';
  } else {
    commentary.traditionalInterpretation = 
      'While this word does not contain vaṣaṭ, the sutra\'s principle of prosodic elevation ' +
      'for ritual exclamations provides guidance for understanding accentual patterns in ' +
      'sacred contexts.';
  }

  // Scholastic notes based on detected patterns
  if (text.match(/^vaṣaṭ$/i)) {
    commentary.scholasticNotes.push(
      'Vaṣaṭkāra-vidhi: The canonical vaṣaṭ receives terminal udātta for ritual efficacy'
    );
  }

  if (context.yajna === true || context.ritual === true) {
    commentary.scholasticNotes.push(
      'Yajña-prayoga: Ritual context supports elevated prosodic treatment'
    );
  }

  if (analysis.phases.prosodic.syllableCount === 2) {
    commentary.scholasticNotes.push(
      'Dvyakṣara-vidhi: Disyllabic forms allow structured accent-elevation patterns'
    );
  }

  // Practical application guidance
  commentary.practicalApplication = generatePracticalGuidance(analysis, context);

  return commentary;
}

/**
 * Helper functions for detailed analysis
 */

function analyzePhoneticStructure(tokens) {
  if (!Array.isArray(tokens)) {
    return [];
  }
  
  const structure = [];
  let currentSyllable = '';
  
  for (const token of tokens) {
    if (token && token.match(/[aeiouāīūṛṝḷḹaiauṁṃḥ]/i)) {
      currentSyllable += token;
      if (currentSyllable.length > 0) {
        structure.push(currentSyllable);
        currentSyllable = '';
      }
    } else {
      currentSyllable += token;
    }
  }
  
  if (currentSyllable) {
    structure.push(currentSyllable);
  }
  
  return structure;
}

function detectExclamationMarkers(text) {
  const markers = [];
  
  // Ritual exclamation patterns
  if (text.match(/ṭ$|ट्$/)) {
    markers.push('exclamatory-ending');
  }
  
  // Sacred exclamation syllables
  if (text.match(/vaṣaṭ|svāhā|huṃ|phaṭ/i)) {
    markers.push('ritual-exclamation');
  }
  
  // Vedic accent marks (if present)
  if (text.match(/[॒॑]/)) {
    markers.push('vedic-accent-marked');
  }
  
  return markers;
}

function generatePracticalGuidance(analysis, context) {
  const guidance = [];
  
  if (analysis.phases.vasatDetection.isVasatForm) {
    guidance.push('Apply clear elevation to emphasize ritual function of vaṣaṭ');
  }
  
  if (analysis.phases.ritualContext.isRitualExclamation) {
    guidance.push('Use appropriate ritual prosody for liturgical effectiveness');
  }
  
  if (analysis.phases.prosodic.syllableCount === 2) {
    guidance.push('Structure elevation across syllables for optimal ritual impact');
  }
  
  if (!analysis.phases.vasatDetection.isVasatForm) {
    guidance.push('Apply natural prosody as no special elevation is required');
  }
  
  return guidance.join('; ');
}

export default sutra1235;
