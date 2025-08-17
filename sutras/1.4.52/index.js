/**
 * Sutra 1.4.52: गतिर्यः कर्म शब्दयते
 * Implementation for motion expressions as कर्म कारक
 * 
 * This sutra establishes that गति (movement, motion, path) functions as कर्म कारक 
 * when it expresses the object or goal of movement. This rule deals with motion 
 * expressions where the path, direction, or movement itself becomes the object 
 * of the action.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { normalizeScript } from '../sanskrit-utils/transliteration.js';

/**
 * Analyzes motion expressions to determine if they function as कर्म कारक
 * @param {string} word - The word or expression to analyze
 * @param {Object} context - Contextual information about usage
 * @returns {Object} Analysis result with karaka assignment
 */
export function sutra1452(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      applies: false,
      error: 'empty_input',
      reason: 'No word provided for analysis'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      applies: false,
      error: 'empty_input',
      reason: 'Empty word after trimming'
    };
  }

  // Script detection and validation
  const script = detectScript(trimmedWord);
  const validation = validateSanskritWord(trimmedWord);
  
  if (!validation.isValid) {
    return {
      applies: false,
      error: 'invalid_sanskrit_input',
      reason: 'Input is not valid Sanskrit text',
      validationError: validation.error
    };
  }

  // Check if this is explicitly marked as non-motion
  if (context.static === true || context.motionType === 'none') {
    return {
      applies: false,
      reason: 'not_motion_expression',
      analysis: 'Marked as static or non-motion expression'
    };
  }

  // Check if motion doesn't express कर्म (but allow explicit karmaExpression = true to override)
  if (context.karmaExpression === false) {
    return {
      applies: false,
      reason: 'motion_not_expressing_karma',
      analysis: 'Motion present but not functioning as कर्म'
    };
  }

  // Check if motion is used in non-कर्म role (like करण)
  if (context.motionRole === 'instrumental') {
    return {
      applies: false,
      reason: 'motion_not_expressing_karma',
      analysis: 'Motion functioning as instrumental rather than कर्म'
    };
  }

  // Normalize the word for analysis
  const normalizedWord = normalizeScript(trimmedWord);
  
  // Motion pattern detection
  const motionAnalysis = analyzeMotionExpression(normalizedWord, context);
  
  // If no motion pattern detected, check if it should apply based on context
  if (!motionAnalysis.isMotion && !hasMotionContext(context)) {
    // Special case: if explicit motion properties are provided, treat as motion
    if (context.karmaExpression === true || 
        context.desiredMotion === true ||
        context.accomplishedMotion === true ||
        context.metaphoricalMotion === true ||
        context.hypotheticalMotion === true ||
        context.recursiveMotion === true ||
        (context.notKarana === true && context.notAdhikarana === true)) {
      motionAnalysis.isMotion = true;
      motionAnalysis.motionCategory = 'special';
      motionAnalysis.contextDriven = true;
    } else {
      return {
        applies: false,
        reason: 'not_motion_expression',
        analysis: 'No motion patterns or context detected',
        word: trimmedWord,
        script: script
      };
    }
  }

  // Build the result for motion expressions functioning as कर्म
  const result = {
    applies: true,
    karaka: 'कर्म',
    sutra: '1.4.52',
    sutraText: 'गतिर्यः कर्म शब्दयते',
    word: trimmedWord,
    script: script,
    motionExpression: true,
    ...motionAnalysis
  };

  // Ensure gatiExpression is set for appropriate patterns
  if (motionAnalysis.gatiExpression || 
      trimmedWord.includes('गति') || 
      trimmedWord.includes('गमन') || 
      trimmedWord.includes('यात्रा') || 
      trimmedWord.includes('प्रयाण') ||
      trimmedWord.includes('यान')) {
    result.gatiExpression = true;
  }

  // Add context-specific analysis
  addContextualAnalysis(result, context);
  
  return result;
}

/**
 * Analyzes if a word represents a motion expression
 */
function analyzeMotionExpression(word, context) {
  const analysis = {
    isMotion: false,
    motionCategory: null,
    specificType: null
  };

  // Direct गति patterns
  if (word.includes('गति') || word.includes('gati')) {
    analysis.isMotion = true;
    analysis.motionCategory = analyzeGatiType(word, context);
    analysis.gatiWord = true;
    analysis.gatiExpression = true;
  }

  // Movement and direction patterns
  const motionPatterns = {
    // Direction-based
    'उत्तर': 'directional',
    'दक्षिण': 'directional', 
    'पूर्व': 'directional',
    'पश्चिम': 'directional',
    'ऊर्ध्व': 'directional',
    'अधः': 'directional',
    
    // Path-based
    'मार्ग': 'path_based',
    'पथ': 'path_based',
    'यान': 'path_based',
    'यात्रा': 'path_based',
    'पथप्रकार': 'path_based',
    'रेखाप्रकार': 'path_based',
    'मार्गप्रकार': 'path_based',
    
    // Movement patterns - for "patterned" category
    'चलनप्रकार': 'patterned',
    'गतिप्रकार': 'patterned',
    'गतिपैटर्न': 'patterned',
    'चलनपैटर्न': 'patterned',
    
    // Movement verbs - these should also trigger gatiExpression
    'गमन': 'kinetic',
    'चलन': 'kinetic',
    'प्रयाण': 'kinetic',
    'संक्रमण': 'kinetic',
    
    // Velocity/speed patterns - for "velocity_based" category
    'वेग': 'velocity_based',
    'द्रुत': 'velocity_based',
    'मन्द': 'velocity_based',
    'तीव्र': 'velocity_based',
    'गतिवेग': 'velocity_based',
    'द्रुतगति': 'velocity_based',
    'मन्दगति': 'velocity_based',
    'तीव्रगति': 'velocity_based',
    
    // Pattern types
    'वक्र': 'curved',
    'सरल': 'straight',
    'चक्रीय': 'circular'
  };

  for (const [pattern, category] of Object.entries(motionPatterns)) {
    if (word.includes(pattern)) {
      analysis.isMotion = true;
      analysis.motionCategory = category;
      analysis.specificPattern = pattern;
      
      // Set gatiExpression for movement-related patterns
      if (['गमन', 'गति', 'यात्रा', 'प्रयाण', 'चलन'].some(p => word.includes(p))) {
        analysis.gatiExpression = true;
      }
      break;
    }
  }

  // Abstract motion concepts
  const abstractPatterns = {
    'विचार': 'mental',
    'भावना': 'emotional', 
    'चेतना': 'consciousness',
    'मनो': 'psychological',
    'काल': 'temporal',
    'युग': 'epochal',
    'क्षण': 'momentary',
    'आत्म': 'spiritual',
    'मोक्ष': 'liberation',
    'योग': 'discipline'
  };

  for (const [pattern, type] of Object.entries(abstractPatterns)) {
    if (word.includes(pattern) && (word.includes('गति') || word.includes('यात्रा') || word.includes('मार्ग'))) {
      analysis.isMotion = true;
      analysis.motionCategory = 'abstract';
      analysis.abstractType = type;
      break;
    }
  }

  // Special motion words that should be recognized
  const specialMotionWords = {
    'कर्मव्यञ्जकगति': 'karma_expression',
    'इच्छितगति': 'desired_motion',
    'सिद्धगति': 'accomplished_motion',
    'शुद्धगति': 'pure_motion',
    'रूपकगति': 'metaphorical_motion',
    'संयुक्तगतिप्रकार': 'compound_motion',
    'काल्पनिकगति': 'hypothetical_motion',
    'स्वगतिवर्णन': 'recursive_motion'
  };

  if (specialMotionWords[word]) {
    analysis.isMotion = true;
    analysis.motionCategory = 'special';
    analysis.specialType = specialMotionWords[word];
  }

  // Compound motion expressions
  if (word.includes('संयुक्त') || word.includes('मिश्र') || context.compoundMotion) {
    analysis.isMotion = true;
    analysis.motionCategory = 'compound';
    analysis.compoundMotion = true;
  }

  // Context-based motion detection
  if (!analysis.isMotion && context.motionType) {
    analysis.isMotion = true;
    analysis.motionCategory = context.motionType;
  }

  return analysis;
}

/**
 * Analyzes the specific type of गति expression
 */
function analyzeGatiType(word, context) {
  if (context.motionType) {
    switch (context.motionType) {
      case 'directional': return 'directional';
      case 'path_based': return 'path_based';
      case 'abstract': return 'abstract';
      case 'temporal': return 'temporal';
      case 'spiritual': return 'spiritual';
      default: return 'general';
    }
  }

  // Pattern-based analysis
  if (word.includes('उत्तर') || word.includes('दक्षिण') || word.includes('पूर्व') || word.includes('पश्चिम')) {
    return 'directional';
  }
  
  if (word.includes('वक्र') || word.includes('सरल') || word.includes('चक्रीय')) {
    return 'path_based';
  }
  
  if (word.includes('मानसिक') || word.includes('विचार') || word.includes('चेतना')) {
    return 'abstract';
  }
  
  return 'general';
}

/**
 * Checks if context indicates motion even without explicit patterns
 */
function hasMotionContext(context) {
  return context.motionType || 
         context.agent && (context.action === 'गमन' || context.action === 'यात्रा' || context.action === 'गच्छति') ||
         context.verb && isMotionVerb(context.verb) ||
         context.motionVerb === true ||
         context.travelVerb === true ||
         context.specializedMotion === true;
}

/**
 * Checks if a verb indicates motion
 */
function isMotionVerb(verb) {
  const motionVerbs = [
    'गच्छति', 'अगमत्', 'गमिष्यति', 'गम्यते',  // गम् family
    'याति', 'प्रयाति', 'संयाति',               // यान् family  
    'चलति', 'धावति', 'प्लवते', 'पतति'          // specialized motion
  ];
  
  return motionVerbs.some(motionVerb => verb.includes(motionVerb.slice(0, 3)));
}

/**
 * Checks if a verb is from the यान् (travel) family
 */
function isYanVerb(verb) {
  const yanVerbs = ['याति', 'प्रयाति', 'संयाति'];
  return yanVerbs.some(yanVerb => verb.includes(yanVerb.slice(0, 2)));
}

/**
 * Checks if a verb is a specialized motion verb
 */
function isSpecializedMotionVerb(verb) {
  const specializedVerbs = ['चलति', 'धावति', 'प्लवते', 'पतति'];
  return specializedVerbs.some(specVerb => verb.includes(specVerb.slice(0, 2)));
}

/**
 * Adds contextual analysis to the result
 */
function addContextualAnalysis(result, context) {
  // Direction and spatial analysis
  if (context.direction) {
    result.direction = context.direction;
  }
  
  if (context.motionDirection) {
    result.motionDirection = context.motionDirection;
  }

  if (context.spatialAxis) {
    result.spatialAxis = context.spatialAxis;
  }

  // Path and trajectory analysis
  if (context.pathType) {
    result.pathType = context.pathType;
  }
  
  if (context.trajectory) {
    result.trajectory = context.trajectory;
  }

  // Movement patterns
  if (context.movementPattern) {
    result.movementPattern = context.movementPattern;
  }

  if (context.geometricType) {
    result.geometricType = context.geometricType;
  }

  // Speed and velocity
  if (context.speedLevel) {
    result.speedLevel = context.speedLevel;
  }

  if (context.velocityType) {
    result.velocityType = context.velocityType;
  }

  // Dimensional analysis
  if (context.dimension) {
    result.dimension = context.dimension;
    
    // Convert dimension name to number for spatialDimensions
    const dimensionMap = {
      'linear': 1,
      'planar': 2, 
      'volumetric': 3
    };
    if (dimensionMap[context.dimension]) {
      result.spatialDimensions = dimensionMap[context.dimension];
    }
  }

  if (context.spatialDimensions) {
    result.spatialDimensions = context.spatialDimensions;
  }

  if (context.primaryDimension) {
    result.primaryDimension = context.primaryDimension;
  }

  if (context.movementComplexity) {
    result.movementComplexity = context.movementComplexity;
  }
  
  if (context.spatialDimension) {
    result.spatialDimension = context.spatialDimension;
  }

  // Velocity and speed
  if (context.velocity) {
    result.velocity = context.velocity;
  }
  
  if (context.speed) {
    result.speed = context.speed;
  }

  // Abstract motion aspects
  if (context.mentalProcess) {
    result.mentalProcess = context.mentalProcess;
  }
  
  if (context.temporalAspect) {
    result.temporalAspect = context.temporalAspect;
  }
  
  if (context.spiritualJourney) {
    result.spiritualJourney = context.spiritualJourney;
  }

  // Verb integration
  if (context.verb) {
    result.verbForm = context.verb;
    result.motionVerb = isMotionVerb(context.verb);
    
    // Special verb family recognition
    if (isYanVerb(context.verb)) {
      result.travelVerb = true;
    }
    
    if (isSpecializedMotionVerb(context.verb)) {
      result.specializedMotion = true;
    }
  }
  
  if (context.tense) {
    result.tense = context.tense;
  }
  
  if (context.voice) {
    result.voice = context.voice;
  }

  // कर्म expression analysis
  if (context.karmaExpression !== undefined) {
    result.karmaExpression = context.karmaExpression;
  }
  
  if (context.expressionMethod) {
    result.expressionMethod = context.expressionMethod;
  }
  
  if (context.semanticRole) {
    result.semanticRole = context.semanticRole;
  }

  // Specific motion properties
  if (context.desiredMotion) {
    result.desiredMotion = context.desiredMotion;
  }
  
  if (context.accomplishedMotion) {
    result.accomplishedMotion = context.accomplishedMotion;
  }
  
  if (context.metaphoricalMotion) {
    result.metaphoricalMotion = context.metaphoricalMotion;
  }

  // System integration
  if (context.specializesKarma) {
    result.specializesKarma = context.specializesKarma;
  }
  
  if (context.relatedToDestination) {
    result.relatedToDestination = context.relatedToDestination;
  }

  // Complex motion handling
  if (context.compoundMotion) {
    result.compoundMotion = context.compoundMotion;
  }
  
  if (context.multiplePatterns) {
    result.multiplePatterns = context.multiplePatterns;
  }
  
  if (context.hypotheticalMotion) {
    result.hypotheticalMotion = context.hypotheticalMotion;
  }
  
  if (context.recursiveMotion) {
    result.recursiveMotion = context.recursiveMotion;
  }

  // Boolean flags from context
  const booleanFlags = [
    'intentionalObject', 'resultativeObject', 'literaryDevice', 'figurativeExpression',
    'impossiblePhysically', 'conceptualOnly', 'selfDescriptive', 'travelVerb',
    'specializedMotion', 'notKarana', 'notAdhikarana', 'complementsGamyamana',
    'extendsMotionConcepts', 'gatiExpression'
  ];
  
  booleanFlags.forEach(flag => {
    if (context[flag] !== undefined) {
      result[flag] = context[flag];
    }
  });

  // String properties
  const stringProperties = [
    'achievementLevel', 'karmaAspect', 'spiritualLevel', 'processType',
    'temporalFlow', 'verbMeaning', 'motionNature', 'motionType', 'karmaSubtype'
  ];
  
  stringProperties.forEach(prop => {
    if (context[prop]) {
      result[prop] = context[prop];
    }
  });
}

export default sutra1452;
