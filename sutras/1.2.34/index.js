// 1.2.34 अल्पाच्च (alpācca) - Comprehensive Implementation
// Sanskrit Sutra: अल्पाच्च
// Domain: Ritual Prosody and Recitation Rules
// 
// This sutra establishes ritual monotone (ekashruti) recitation patterns with systematic
// exceptions for specific contexts including japa (repetitive meditation), Om variants,
// and specialized ritual forms. The comprehensive implementation analyzes morphological
// structure, phonetic patterns, ritual contexts, and traditional commentary.
//
// Technical Implementation:
// - Multi-phase prosodic analysis for ritual contexts
// - Exception pattern detection and classification
// - Traditional commentary integration
// - Confidence scoring for recitation recommendations
// - Support for multiple scripts (IAST/Devanagari)

import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { getAllVowels } from '../sanskrit-utils/vowel-analysis.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';

/**
 * Implements comprehensive analysis for ritual monotone (ekashruti) recitation
 * according to Panini's sutra 1.2.34 अल्पाच्च
 * 
 * This function provides detailed analysis of when ritual contexts require
 * monotone recitation versus when exceptions apply (japa, Om variants, etc.)
 * 
 * @param {string} text - Sanskrit text in IAST or Devanagari
 * @param {Object} context - Linguistic and ritual context
 * @param {Object} options - Analysis configuration options
 * @returns {Object} Comprehensive analysis result with recommendations
 */
export function sutra1234(text, context = {}, options = {}) {
  if (typeof text !== 'string') {
    throw new TypeError('sutra1234: text parameter must be a string');
  }
  
  if (text.trim() === '') {
    return {
      sutra: '1.2.34',
      script: 'unknown',
      analysis: { type: 'empty-input' },
      isValid: false,
      confidence: 0,
      errors: ['Empty input text']
    };
  }

  try {
    const script = detectScript(text);
    const baseResult = aggregateProsodyOptions(text, { ...context, _sutra: '1.2.34' }, options);
    
    // Perform comprehensive ritual monotone analysis
    const ritualAnalysis = analyzeRitualMonotone(text, context, options);
    
    return {
      sutra: '1.2.34',
      script,
      text,
      context,
      analysis: ritualAnalysis,
      isValid: true,
      confidence: ritualAnalysis.confidence,
      recommendations: ritualAnalysis.recommendations,
      traditionalCommentary: ritualAnalysis.traditionalCommentary,
      technicalNotes: ritualAnalysis.technicalNotes,
      ...baseResult
    };
  } catch (error) {
    return {
      sutra: '1.2.34',
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
 * Core analysis function for ritual monotone patterns
 * Implements the complete logic of sutra 1.2.34
 */
function analyzeRitualMonotone(text, context, options) {
  const analysis = {
    type: 'ritual-monotone-analysis',
    phases: {
      morphological: analyzeMorphologicalContext(text, context),
      ritualContext: analyzeRitualContextPatterns(text, context),
      exceptionDetection: analyzeExceptionPatterns(text, context),
      prosodic: analyzeProsodyForRitual(text, context)
    },
    exceptions: [],
    recommendations: [],
    confidence: 0,
    traditionalCommentary: {},
    technicalNotes: []
  };

  // Phase 1: Morphological Analysis
  const morphological = analysis.phases.morphological;
  analysis.technicalNotes.push(`Morphological analysis: ${morphological.wordType} structure detected`);

  // Phase 2: Ritual Context Analysis
  const ritualContext = analysis.phases.ritualContext;
  if (ritualContext.isRitualContext) {
    analysis.technicalNotes.push(`Ritual context confirmed: ${ritualContext.ritualType}`);
  }

  // Phase 3: Exception Pattern Detection
  const exceptions = analysis.phases.exceptionDetection;
  analysis.exceptions = exceptions.detectedExceptions;
  if (exceptions.detectedExceptions.length > 0) {
    analysis.technicalNotes.push(`Exceptions detected: ${exceptions.detectedExceptions.join(', ')}`);
  }

  // Phase 4: Prosodic Analysis for Ritual
  const prosodic = analysis.phases.prosodic;
  analysis.technicalNotes.push(`Prosodic pattern: ${prosodic.recommendedPattern}`);

  // Generate comprehensive recommendations
  analysis.recommendations = generateRitualRecommendations(analysis, context);

  // Calculate confidence score
  analysis.confidence = calculateRitualConfidence(analysis);

  // Add traditional commentary
  analysis.traditionalCommentary = generateTraditionalCommentary(text, analysis, context);

  return analysis;
}

/**
 * Analyzes morphological context for ritual application
 */
function analyzeMorphologicalContext(text, context) {
  const tokenResult = tokenizePhonemes(text);
  const tokens = tokenResult ? tokenResult.phonemes : [];
  const vowelResult = getAllVowels(text);
  const vowelCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    wordType: 'unknown',
    syllableCount: vowelCount,
    morphemeStructure: [],
    ritualSuitability: 'unknown'
  };

  // Detect word type based on morphological patterns
  if (text.match(/^oṃ|^om|^ॐ/i)) {
    analysis.wordType = 'sacred-syllable';
    analysis.ritualSuitability = 'special-treatment';
  } else if (text.length <= 3 && vowelCount === 1) {
    analysis.wordType = 'monosyllabic';
    analysis.ritualSuitability = 'monotone-suitable';
  } else if (tokens.length > 6) {
    analysis.wordType = 'polysyllabic-compound';
    analysis.ritualSuitability = 'complex-analysis-required';
  } else {
    analysis.wordType = 'regular-word';
    analysis.ritualSuitability = 'monotone-suitable';
  }

  // Analyze morpheme structure
  analysis.morphemeStructure = analyzeMorphemeStructure(tokens);

  return analysis;
}

/**
 * Analyzes ritual context patterns
 */
function analyzeRitualContextPatterns(text, context) {
  const analysis = {
    isRitualContext: false,
    ritualType: 'none',
    recitationStyle: 'unknown',
    contextFactors: []
  };

  // Check for explicit ritual context
  if (context.ritual === true) {
    analysis.isRitualContext = true;
    analysis.ritualType = 'general-ritual';
    analysis.contextFactors.push('explicit-ritual-context');
  }

  // Check for specific ritual types
  if (context.japa === true) {
    analysis.ritualType = 'japa-meditation';
    analysis.recitationStyle = 'repetitive-meditation';
    analysis.contextFactors.push('japa-context');
  }

  if (context.sāma === true || context.sama === true) {
    analysis.ritualType = 'sama-chanting';
    analysis.recitationStyle = 'melodic-chanting';
    analysis.contextFactors.push('sama-context');
  }

  // Detect implicit ritual markers in text
  const ritualMarkers = detectRitualMarkers(text);
  if (ritualMarkers.length > 0) {
    analysis.isRitualContext = true;
    analysis.contextFactors.push(...ritualMarkers);
  }

  return analysis;
}

/**
 * Analyzes exception patterns for monotone recitation
 */
function analyzeExceptionPatterns(text, context) {
  const detectedExceptions = [];
  const exceptionReasons = [];

  // Exception 1: Om and its variants
  if (text.match(/^oṃ|^om|^ॐ/i)) {
    detectedExceptions.push('om-variant');
    exceptionReasons.push('Sacred syllable Om has inherent prosodic pattern');
  }

  // Exception 2: Japa context
  if (context.japa === true) {
    detectedExceptions.push('japa-context');
    exceptionReasons.push('Japa meditation requires natural rhythm, not forced monotone');
  }

  // Exception 3: Sāma chanting
  if (context.sāma === true || context.sama === true) {
    detectedExceptions.push('sama-context');
    exceptionReasons.push('Sāma requires melodic patterns incompatible with monotone');
  }

  // Exception 4: Very short words (अल्प)
  const vowelResult = getAllVowels(text);
  const vowelCount = vowelResult ? vowelResult.count : 0;
  if (vowelCount === 1 && text.length <= 2) {
    detectedExceptions.push('alpa-monosyllable');
    exceptionReasons.push('Very short words (alpa) maintain natural accent');
  }

  // Exception 5: Compound-initial stressed elements
  if (context.compoundPosition === 'initial' && context.stressed === true) {
    detectedExceptions.push('compound-initial-stress');
    exceptionReasons.push('Compound-initial elements retain prosodic prominence');
  }

  return {
    detectedExceptions,
    exceptionReasons,
    hasExceptions: detectedExceptions.length > 0
  };
}

/**
 * Analyzes prosodic patterns specifically for ritual contexts
 */
function analyzeProsodyForRitual(text, context) {
  const vowelResult = getAllVowels(text);
  const syllableCount = vowelResult ? vowelResult.count : 0;
  
  const analysis = {
    syllableCount,
    naturalPattern: 'unknown',
    recommendedPattern: 'monotone',
    prosodyModifications: [],
    rhythmicConsiderations: []
  };

  // Determine natural prosodic pattern
  if (syllableCount === 1) {
    analysis.naturalPattern = 'monosyllabic';
    analysis.rhythmicConsiderations.push('Single syllable maintains inherent tone');
  } else if (syllableCount <= 3) {
    analysis.naturalPattern = 'simple';
    analysis.rhythmicConsiderations.push('Short words suitable for monotone');
  } else {
    analysis.naturalPattern = 'complex';
    analysis.rhythmicConsiderations.push('Longer words may resist monotone forcing');
  }

  // Determine recommended pattern based on context
  if (context.japa === true) {
    analysis.recommendedPattern = 'natural-rhythm';
    analysis.prosodyModifications.push('Preserve natural accent for meditative flow');
  } else if (context.ritual === true) {
    analysis.recommendedPattern = 'monotone';
    analysis.prosodyModifications.push('Apply ritual monotone (ekashruti)');
  } else {
    analysis.recommendedPattern = 'natural';
    analysis.prosodyModifications.push('No ritual modification required');
  }

  return analysis;
}

/**
 * Generates comprehensive recommendations for ritual recitation
 */
function generateRitualRecommendations(analysis, context) {
  const recommendations = [];

  const { ritualContext, exceptionDetection, prosodic } = analysis.phases;

  // Primary recommendation based on context
  if (ritualContext.isRitualContext && !exceptionDetection.hasExceptions) {
    recommendations.push({
      type: 'monotone-application',
      priority: 'high',
      description: 'Apply ritual monotone (ekashruti) recitation',
      justification: 'Ritual context detected without blocking exceptions'
    });
  } else if (exceptionDetection.hasExceptions) {
    recommendations.push({
      type: 'exception-handling',
      priority: 'high',
      description: 'Preserve natural prosody due to detected exceptions',
      justification: `Exceptions: ${exceptionDetection.detectedExceptions.join(', ')}`
    });
  } else {
    recommendations.push({
      type: 'natural-prosody',
      priority: 'medium',
      description: 'Use natural prosodic pattern',
      justification: 'No ritual context or exceptions detected'
    });
  }

  // Secondary recommendations for specific contexts
  if (context.japa === true) {
    recommendations.push({
      type: 'japa-rhythm',
      priority: 'high',
      description: 'Maintain meditative rhythm suitable for japa practice',
      justification: 'Japa requires flowing rhythm for concentration'
    });
  }

  if (prosodic.syllableCount > 4) {
    recommendations.push({
      type: 'complex-prosody',
      priority: 'medium',
      description: 'Consider syllable-by-syllable analysis for complex words',
      justification: 'Longer words may have internal prosodic structure'
    });
  }

  return recommendations;
}

/**
 * Calculates confidence score for ritual monotone analysis
 */
function calculateRitualConfidence(analysis) {
  let confidence = 0.5; // Base confidence

  const { morphological, ritualContext, exceptionDetection, prosodic } = analysis.phases;

  // Increase confidence for clear morphological patterns
  if (morphological.wordType !== 'unknown') {
    confidence += 0.15;
  }

  // Adjust for ritual context clarity
  if (ritualContext.isRitualContext) {
    confidence += 0.2;
    if (ritualContext.contextFactors.length > 1) {
      confidence += 0.1;
    }
  }

  // Adjust for exception clarity
  if (exceptionDetection.hasExceptions) {
    confidence += 0.15;
    if (exceptionDetection.exceptionReasons.length > 0) {
      confidence += 0.1;
    }
  } else if (ritualContext.isRitualContext) {
    // Clear ritual context with no exceptions increases confidence
    confidence += 0.1;
  }

  // Adjust for prosodic pattern clarity
  if (prosodic.recommendedPattern !== 'unknown') {
    confidence += 0.1;
  }

  return Math.min(confidence, 1.0);
}

/**
 * Generates traditional commentary following classical grammatical tradition
 */
function generateTraditionalCommentary(text, analysis, context) {
  const commentary = {
    sutraText: 'अल्पाच्च',
    meaning: 'And (also in the case of) short/diminutive (forms)',
    context: 'Ritual recitation and prosodic modification',
    traditionalInterpretation: '',
    scholasticNotes: [],
    practicalApplication: ''
  };

  // Traditional interpretation based on analysis
  if (analysis.phases.exceptionDetection.hasExceptions) {
    commentary.traditionalInterpretation = 
      'The sutra establishes exceptions to monotone ritual recitation. ' +
      'Classical commentators note that certain forms maintain their natural prosody ' +
      'even in ritual contexts due to their sacred nature or meditative function.';
  } else {
    commentary.traditionalInterpretation = 
      'In ritual contexts, ordinary words adopt monotone (ekashruti) recitation ' +
      'to maintain uniformity and concentration in liturgical performance.';
  }

  // Scholastic notes based on detected patterns
  if (text.match(/^oṃ|^om|^ॐ/i)) {
    commentary.scholasticNotes.push(
      'Pranavopaasana-vidhi: Om as the primordial sound maintains its inherent prosodic pattern'
    );
  }

  if (context.japa === true) {
    commentary.scholasticNotes.push(
      'Japa-vidhi: Repetitive meditation requires natural rhythm for mental concentration'
    );
  }

  if (analysis.phases.morphological.syllableCount === 1) {
    commentary.scholasticNotes.push(
      'Alpa-pada-vidhi: Very short words preserve natural accent due to minimal structure'
    );
  }

  // Practical application guidance
  commentary.practicalApplication = generatePracticalGuidance(analysis, context);

  return commentary;
}

/**
 * Helper functions for detailed analysis
 */

function analyzeMorphemeStructure(tokens) {
  if (!Array.isArray(tokens)) {
    return [];
  }
  
  const structure = [];
  let currentMorpheme = '';
  
  for (const token of tokens) {
    if (token && token.match(/[aeiouāīūṛṝḷḹaiauṁṃḥ]/i)) {
      currentMorpheme += token;
      if (currentMorpheme.length > 1) {
        structure.push(currentMorpheme);
        currentMorpheme = '';
      }
    } else {
      currentMorpheme += token;
    }
  }
  
  if (currentMorpheme) {
    structure.push(currentMorpheme);
  }
  
  return structure;
}

function detectRitualMarkers(text) {
  const markers = [];
  
  // Sacred syllables
  if (text.match(/oṃ|svāhā|vaṣaṭ|huṃ/i)) {
    markers.push('sacred-syllable');
  }
  
  // Vedic accents (if present)
  if (text.match(/[॒॑]/)) {
    markers.push('vedic-accent');
  }
  
  // Mantra patterns
  if (text.match(/namaḥ|svāhā|huṃ phaṭ/i)) {
    markers.push('mantra-formula');
  }
  
  return markers;
}

function generatePracticalGuidance(analysis, context) {
  const guidance = [];
  
  if (analysis.phases.ritualContext.isRitualContext) {
    guidance.push('In formal ritual recitation, apply uniform monotone unless exceptions apply');
  }
  
  if (analysis.phases.exceptionDetection.hasExceptions) {
    guidance.push('Preserve natural prosodic patterns due to sacred or meditative context');
  }
  
  if (analysis.phases.prosodic.syllableCount > 3) {
    guidance.push('For longer words, consider syllable-by-syllable monotone application');
  }
  
  return guidance.join('; ');
}

export default sutra1234;
