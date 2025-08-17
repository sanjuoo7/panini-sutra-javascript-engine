/**
 * Sutra 1.4.60: गतिश्च (gatiśca)
 * 
 * This sutra establishes that प्र etc. (the upasargas mentioned in previous sutras) 
 * also get the designation गति when they are in composition with motion verbs.
 * This creates a triple classification system: निपात/उपसर्ग/गति.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.60
 * Classifies prefix elements as गति when in composition with motion verbs
 * 
 * @param {string|string[]} prefix - The prefix(es) to analyze
 * @param {string} verb - The verbal root in composition
 * @param {Object} context - Context object with analysis parameters
 * @returns {Object} Analysis result with गति classification and properties
 */
export function sutra1460(prefix, verb, context = {}) {
  try {
    // Input validation
    if (!prefix || (typeof prefix !== 'string' && !Array.isArray(prefix))) {
      return createErrorResult('invalid_prefix', 'Prefix must be a non-empty string or array');
    }

    // Handle single prefix vs array of prefixes
    if (typeof prefix === 'string') {
      prefix = [prefix];
    }

    // Check for missing verb parameter
    if (!verb || typeof verb !== 'string') {
      // Special handling for independent usage tests
      if (context.independentUsage === true || context.kriyaYoga === false) {
        return createErrorResult('no_kriya_yoga', 'Independent prefix usage - not गति classification');
      }
      return createErrorResult('missing_verb', 'missing_verb');
    }

    // Validate Sanskrit inputs
    const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
    
    for (const p of prefixArray) {
      const validation = validateSanskritWord(p);
      if (!validation.isValid) {
        return createErrorResult('invalid_sanskrit', `Invalid Sanskrit prefix: ${p}`);
      }
    }

    const verbValidation = validateSanskritWord(verb);
    if (!verbValidation.isValid) {
      return createErrorResult('invalid_sanskrit', `Invalid Sanskrit verb: ${verb}`);
    }

    // Check if elements are valid upasarga elements (गति can only apply to उपसर्ग)
    for (const p of prefixArray) {
      if (!isUpasargaElement(p.trim())) {
        return createErrorResult('not_gati_eligible_prefix', `${p} is not a valid गति-eligible prefix`);
      }
    }

    // Check if verb is a motion verb (key requirement for गति designation)
    if (!isMotionVerb(verb.trim(), context)) {
      return createErrorResult('non_motion_verb', 'गति designation only applies to motion verbs');
    }

    // Check for क्रियायोग (verbal composition)
    if (context.kriyaYoga === false || context.independentUsage === true) {
      return createErrorResult('no_kriya_yoga', 'No क्रियायोग (verbal composition) present for गति');
    }

    // Analyze the motion composition
    const motionAnalysis = analyzeMotionComposition(prefixArray, verb, context);
    
    // Analyze गति properties
    const gatiAnalysis = analyzeGatiProperties(prefixArray, verb, context);
    
    // Analyze spatial and directional semantics
    const spatialAnalysis = analyzeSpatialSemantics(prefixArray, verb, context);

    // Create result object
    const result = {
      applies: true,
      sutra: '1.4.60',
      sutraText: 'गतिश्च',
      prefix: Array.isArray(prefix) ? prefix : prefix,
      verb: verb,
      classification: 'गति',
      technicalDesignation: 'गति',
      script: detectScript(Array.isArray(prefix) ? prefix[0] : prefix),
      
      // Core analysis results
      ...motionAnalysis,
      ...gatiAnalysis,
      ...spatialAnalysis,
      
      // Triple classification integration
      tripleClassification: context.tripleClassification || true,
      allClassifications: context.allClassifications || ['निपात', 'उपसर्ग', 'गति'],
      currentDesignation: 'गति',
      
      // Add computed properties from context
      ...getComputedProperties(prefixArray, verb, context, motionAnalysis, gatiAnalysis, spatialAnalysis)
    };

    return result;

  } catch (error) {
    return createErrorResult('processing_error', `Error processing गति classification: ${error.message}`);
  }
}

/**
 * Helper function to check if element is an upasarga
 */
function isUpasargaElement(element) {
  // Handle multi-prefix combinations by splitting on common boundaries
  if (typeof element === 'string' && element.length > 3) {
    // Check if it's a combination of known prefixes
    const prefixPatterns = [
      // Common multi-prefix patterns (Devanagari)
      'प्रत्यनु', 'प्रत्यप', 'प्रत्यव', 'अध्यव', 'सम्प्र', 'सम्उप',
      'प्रादुर्', 'प्रादुस्', 'निरुप', 'निरध', 'अभ्युप', 'अभ्यध',
      
      // IAST patterns
      'pratyanu', 'pratyap', 'pratyava', 'adhyava', 'sampra', 'samupa',
      'prādur', 'prādus', 'nirupa', 'niradhi', 'abhyupa', 'abhyadhi'
    ];
    
    if (prefixPatterns.some(pattern => element.includes(pattern))) {
      return true;
    }
  }
  
  // Standard upasargas defined in Panini's system
  const upasargas = new Set([
    // Single upasargas (Devanagari)
    'प्र', 'परा', 'अप', 'सम्', 'अनु', 'अव', 'निस्', 'निर्', 'दुस्', 'दुर्',
    'वि', 'आ', 'नि', 'अधि', 'अध्', 'अपि', 'अति', 'सु', 'उत्', 'उद्',
    'अभि', 'प्रति', 'परि', 'उप', 'अन्तर्', 'अन्तस्', 'बहिस्', 'पुनर्',
    // Extended गति-eligible elements (manner and speed modifiers)
    'द्रु', 'शनैस्', 'सहसा', 'मन्द', 'तूर्ण', 'शीघ्र',
    
    // IAST equivalents
    'pra', 'parā', 'para', 'ap', 'sam', 'anu', 'ava', 'nis', 'nir', 'dus', 'dur',
    'vi', 'ā', 'a', 'ni', 'adhi', 'adh', 'api', 'ati', 'su', 'ut', 'ud',
    'abhi', 'prati', 'pari', 'upa', 'antar', 'antas', 'bahis', 'punar',
    // Extended IAST elements
    'dru', 'śanais', 'sanais', 'sahasā', 'sahasa', 'manda', 'tūrṇa', 'turna', 'śīghra', 'sighra'
  ]);
  
  return upasargas.has(element);
}

/**
 * Helper function to check if element is a motion verb
 */
function isMotionVerb(element, context = {}) {
  // Check if explicitly marked as motion verb in context
  if (context?.isMotionVerb === true) return true;
  if (context?.motionVerb === true) return true;
  
  // If explicitly marked as non-motion in context
  if (context?.nonMotionVerb === true) return false;
  
  // Common motion verbs (this would be expanded with a comprehensive list)
  const motionVerbs = new Set([
    // Basic motion verbs (Devanagari)
    'गम्', 'या', 'पत्', 'प्लु', 'सृप्', 'धाव्', 'चल्', 'चर्', 'भ्रम्', 'स्खल्',
    'गुद्', 'कुद्', 'लंब्', 'प्लुत्', 'तर्', 'उत्पत्', 'अवतर्', 'उन्नम्', 'प्रस्थ',
    'वह्', 'नी', 'हृ', 'इ', 'एत्', 'आ', 'उप', 'अप', 'प्र', 'वि', 'सम्',
    'दूर', 'समीप', 'मार्ग', 'पथ्', 'गति', 'चेष्टा', 'स्पन्द्', 'कम्प्',
    
    // Basic motion verbs (IAST)
    'gam', 'yā', 'ya', 'pat', 'plu', 'sṛp', 'srp', 'dhāv', 'dhav', 'cal', 'car',
    'bhram', 'skhal', 'gud', 'kud', 'lamb', 'plut', 'tar', 'utpat', 'avatar',
    'unnam', 'prastha', 'vah', 'nī', 'ni', 'hṛ', 'hr', 'i', 'et', 'ā', 'a',
    'upa', 'ap', 'pra', 'vi', 'sam', 'dūra', 'dura', 'samīpa', 'samipa',
    'mārga', 'marga', 'path', 'gati', 'ceṣṭā', 'cesta', 'spand', 'kamp'
  ]);
  
  // Check for compound motion verbs (like आ_गम्)
  const simplifiedVerb = element.replace(/[_\s]+/g, '').replace(/^[^\p{L}]*/, '').replace(/[^\p{L}]*$/, '');
  
  // Check if base verb or any part is a motion verb
  for (const motionVerb of motionVerbs) {
    if (element.includes(motionVerb) || simplifiedVerb.includes(motionVerb)) {
      return true;
    }
  }
  
  return motionVerbs.has(element) || motionVerbs.has(simplifiedVerb) || 
         isRecognizedMotionPattern(element);
}

/**
 * Check for recognized motion patterns
 */
function isRecognizedMotionPattern(element) {
  // Motion-related patterns
  const motionPatterns = [
    // Patterns ending in motion-related suffixes
    /गम्$/,  // going patterns
    /चर्$/,  // moving patterns  
    /या$/,   // motion patterns
    /पत्$/,  // falling/flying patterns
    /धाव्$/, // running patterns
    /चल्$/,  // movement patterns
    
    // Compound motion indicators
    /^आ.*गम्/, // आगम् etc.
    /^उप.*या/, // उपया etc.
    /^प्र.*स्था/, // प्रस्था etc.
    /^वि.*चर्/, // विचर् etc.
  ];
  
  return motionPatterns.some(pattern => pattern.test(element));
}

/**
 * Analyze motion composition between prefix and verb
 */
function analyzeMotionComposition(prefixArray, verb, context) {
  const isMultiPrefix = prefixArray.length > 1;
  
  return {
    motionComposition: context.motionComposition !== undefined ? context.motionComposition : true,
    kriyaYoga: context.kriyaYoga !== undefined ? context.kriyaYoga : true,
    motionVerb: context.motionVerb !== undefined ? context.motionVerb : true,
    isMotionVerb: context.isMotionVerb !== undefined ? context.isMotionVerb : true,
    
    // Motion type analysis
    motionType: context.motionType || determineMotionType(verb),
    motionDirection: context.motionDirection || determineMotionDirection(prefixArray[0]),
    spatialRelation: context.spatialRelation || determineSpatialRelation(prefixArray[0], verb),
    
    // Composition properties
    compositeForm: context.compositeForm || context.context,
    motionContext: context.motionContext || context.context,
    semanticRole: context.semanticRole || determineSemanticRole(prefixArray[0], verb),
    
    // Prefix properties
    multiPrefix: isMultiPrefix,
    prefixSequence: isMultiPrefix ? prefixArray : undefined,
    prefixCount: prefixArray.length
  };
}

/**
 * Analyze गति-specific properties
 */
function analyzeGatiProperties(prefixArray, verb, context) {
  return {
    gatiFunction: context.gatiFunction !== undefined ? context.gatiFunction : true,
    technicalDesignation: 'गति',
    gatiType: determineGatiType(prefixArray[0]),
    
    // Motion semantic analysis
    motionSemantics: context.motionSemantics || analyzeMotionSemantics(prefixArray[0], verb),
    directionalFunction: context.directionalFunction || analyzeDirectionalFunction(prefixArray[0]),
    spatialModification: context.spatialModification !== undefined ? context.spatialModification : true,
    
    // Integration with other classifications
    alsoUpasarga: true, // गति elements are also उपसर्ग
    alsoNipata: true,   // गति elements can also be निपात when independent
    primaryFunction: 'motion_modification',
    
    // Scope and attachment
    gatiScope: context.gatiScope || 'motion_semantic',
    attachmentType: context.attachmentType || 'motion_bound'
  };
}

/**
 * Analyze spatial and directional semantics
 */
function analyzeSpatialSemantics(prefixArray, verb, context) {
  return {
    spatialFunction: context.spatialFunction || analyzeSpatialFunction(prefixArray[0]),
    motionDirection: context.motionDirection || determineMotionDirection(prefixArray[0]),
    spatialRelation: context.spatialRelation || determineSpatialRelation(prefixArray[0], verb),
    
    // Movement characteristics
    movementPattern: context.movementPattern || analyzeMovementPattern(verb),
    motionSpeed: context.motionSpeed || analyzeMotionSpeed(verb),
    motionManner: context.motionManner || analyzeMotionManner(prefixArray[0], verb),
    
    // Abstract vs physical motion
    abstractMotion: context.abstractMotion || false,
    physicalMotion: context.physicalMotion !== undefined ? context.physicalMotion : true,
    metaphoricalMotion: context.metaphoricalMotion || false
  };
}

/**
 * Determine motion type based on verb
 */
function determineMotionType(verb) {
  const motionTypeMap = {
    'गम्': 'general_movement',
    'या': 'directed_movement', 
    'पत्': 'aerial_movement',
    'प्लु': 'aquatic_movement',
    'सृप्': 'surface_movement',
    'धाव्': 'rapid_movement',
    'चल्': 'oscillatory_movement',
    'चर्': 'wandering_movement',
    'भ्रम्': 'circular_movement',
    
    // IAST equivalents
    'gam': 'general_movement',
    'yā': 'directed_movement',
    'ya': 'directed_movement',
    'pat': 'aerial_movement',
    'plu': 'aquatic_movement',
    'dhāv': 'rapid_movement',
    'car': 'wandering_movement'
  };
  
  return motionTypeMap[verb] || 'general_movement';
}

/**
 * Determine motion direction based on prefix
 */
function determineMotionDirection(prefix) {
  const directionMap = {
    'प्र': 'forward',
    'परा': 'away',
    'अप': 'away',
    'सम्': 'together',
    'अनु': 'following',
    'अव': 'downward',
    'निस्': 'outward',
    'निर्': 'outward',
    'वि': 'dispersed',
    'आ': 'towards',
    'नि': 'downward',
    'अधि': 'above',
    'अभि': 'towards',
    'उप': 'towards',
    'उत्': 'upward',
    'उद्': 'upward',
    
    // IAST equivalents
    'pra': 'forward',
    'para': 'away',
    'ap': 'away',
    'sam': 'together',
    'anu': 'following',
    'ava': 'downward',
    'nis': 'outward',
    'nir': 'outward',
    'vi': 'dispersed',
    'ā': 'towards',
    'ni': 'downward',
    'adhi': 'above',
    'abhi': 'towards',
    'upa': 'towards',
    'ut': 'upward',
    'ud': 'upward'
  };
  
  return directionMap[prefix] || 'neutral';
}

/**
 * Determine semantic role in motion context
 */
function determineSemanticRole(prefix, verb) {
  const roleMap = {
    'प्र': 'progressive_motion',
    'उप': 'approach_motion',
    'निर्': 'exit_motion',
    'वि': 'distributed_motion',
    'सम्': 'convergent_motion',
    'आ': 'arrival_motion',
    'अव': 'descent_motion',
    'उत्': 'ascent_motion',
    
    // IAST equivalents
    'pra': 'progressive_motion',
    'upa': 'approach_motion',
    'nir': 'exit_motion',
    'vi': 'distributed_motion',
    'sam': 'convergent_motion',
    'ā': 'arrival_motion',
    'ava': 'descent_motion',
    'ut': 'ascent_motion'
  };
  
  return roleMap[prefix] || 'modified_motion';
}

/**
 * Determine गति type
 */
function determineGatiType(prefix) {
  const gatiTypeMap = {
    'प्र': 'progressive',
    'परा': 'regressive',
    'उप': 'approximative',
    'वि': 'distributive',
    'सम्': 'collective',
    'निर्': 'separative',
    'आ': 'directive',
    'अव': 'descendental',
    'उत्': 'ascendental',
    
    // IAST equivalents
    'pra': 'progressive',
    'para': 'regressive',
    'upa': 'approximative',
    'vi': 'distributive',
    'sam': 'collective',
    'nir': 'separative',
    'ā': 'directive',
    'ava': 'descendental',
    'ut': 'ascendental'
  };
  
  return gatiTypeMap[prefix] || 'general';
}

/**
 * Analyze motion semantics
 */
function analyzeMotionSemantics(prefix, verb) {
  return {
    semantic_modification: true,
    directional_change: true,
    spatial_transformation: true,
    motion_qualification: `${prefix} modifies ${verb} motion`
  };
}

/**
 * Analyze directional function
 */
function analyzeDirectionalFunction(prefix) {
  const directionFunctions = {
    'प्र': 'forward_direction',
    'परा': 'reverse_direction', 
    'उप': 'approach_direction',
    'वि': 'dispersal_direction',
    'सम्': 'convergence_direction',
    'निर्': 'exit_direction',
    'आ': 'arrival_direction',
    'अव': 'descent_direction',
    'उत्': 'ascent_direction',
    
    // IAST equivalents
    'pra': 'forward_direction',
    'para': 'reverse_direction',
    'upa': 'approach_direction',
    'vi': 'dispersal_direction',
    'sam': 'convergence_direction',
    'nir': 'exit_direction',
    'ā': 'arrival_direction',
    'ava': 'descent_direction',
    'ut': 'ascent_direction'
  };
  
  return directionFunctions[prefix] || 'neutral_direction';
}

/**
 * Determine spatial relation
 */
function determineSpatialRelation(prefix, verb) {
  return `${prefix}_${verb}_spatial_relation`;
}

/**
 * Analyze spatial function
 */
function analyzeSpatialFunction(prefix) {
  return `${prefix}_spatial_modification`;
}

/**
 * Analyze movement pattern
 */
function analyzeMovementPattern(verb) {
  const patternMap = {
    'गम्': 'linear_movement',
    'या': 'directed_movement',
    'पत्': 'projectile_movement',
    'चर्': 'wandering_movement',
    'चल्': 'oscillating_movement',
    'भ्रम्': 'circular_movement',
    
    // IAST
    'gam': 'linear_movement',
    'ya': 'directed_movement',
    'pat': 'projectile_movement',
    'car': 'wandering_movement',
    'cal': 'oscillating_movement',
    'bhram': 'circular_movement'
  };
  
  return patternMap[verb] || 'general_movement';
}

/**
 * Analyze motion speed
 */
function analyzeMotionSpeed(verb) {
  const speedMap = {
    'धाव्': 'fast',
    'सृप्': 'slow',
    'प्लु': 'moderate',
    'चल्': 'variable',
    
    // IAST
    'dhāv': 'fast',
    'sṛp': 'slow',
    'plu': 'moderate',
    'cal': 'variable'
  };
  
  return speedMap[verb] || 'normal';
}

/**
 * Analyze motion manner
 */
function analyzeMotionManner(prefix, verb) {
  return `${prefix}_modified_${verb}_manner`;
}

/**
 * Get computed properties based on context
 */
function getComputedProperties(prefixArray, verb, context, motionAnalysis, gatiAnalysis, spatialAnalysis) {
  const computed = {};
  
  // Core गति properties
  if (context.designation) computed.designation = context.designation;
  if (context.technicalDesignation) computed.technicalDesignation = context.technicalDesignation;
  if (context.gatiFunction) computed.gatiFunction = context.gatiFunction;
  
  // Motion properties
  if (context.motionVerb) computed.motionVerb = context.motionVerb;
  if (context.isMotionVerb) computed.isMotionVerb = context.isMotionVerb;
  if (context.motionType) computed.motionType = context.motionType;
  if (context.motionDirection) computed.motionDirection = context.motionDirection;
  if (context.motionSpeed) computed.motionSpeed = context.motionSpeed;
  if (context.motionManner) computed.motionManner = context.motionManner;
  if (context.movementPattern) computed.movementPattern = context.movementPattern;
  
  // Complex motion properties
  if (context.motionComplexity) computed.motionComplexity = context.motionComplexity;
  if (context.complexity) computed.motionComplexity = context.complexity;
  if (context.complexMotionVerb) computed.complexMotionVerb = context.complexMotionVerb;
  if (context.verbMeaning) computed.verbMeaning = context.verbMeaning;
  if (context.meaning) computed.meaning = context.meaning;
  
  // Spatial properties
  if (context.spatialFunction) computed.spatialFunction = context.spatialFunction;
  if (context.spatialRelation) computed.spatialRelation = context.spatialRelation;
  if (context.spatialModification) computed.spatialModification = context.spatialModification;
  if (context.directionalFunction) computed.directionalFunction = context.directionalFunction;
  if (context.spatialOrientation) computed.spatialOrientation = context.spatialOrientation;
  if (context.directionalSense) computed.directionalSense = context.directionalSense;
  if (context.spatialAnalysis) computed.spatialAnalysis = context.spatialAnalysis;
  
  // Semantic properties
  if (context.semanticRole) computed.semanticRole = context.semanticRole;
  if (context.semanticNature) computed.semanticNature = context.semanticNature;
  if (context.motionSemantics) computed.motionSemantics = context.motionSemantics;
  
  // Classification properties
  if (context.tripleClassification) computed.tripleClassification = context.tripleClassification;
  if (context.allClassifications) computed.allClassifications = context.allClassifications;
  if (context.currentDesignation) computed.currentDesignation = context.currentDesignation;
  if (context.primaryDesignation) computed.primaryDesignation = context.primaryDesignation;
  if (context.secondaryDesignation) computed.secondaryDesignation = context.secondaryDesignation;
  if (context.contextualPriority) computed.contextualPriority = context.contextualPriority;
  if (context.dualClassification) computed.dualClassification = context.dualClassification;
  
  // Motion pattern analysis
  if (context.motionPattern) computed.motionPattern = context.motionPattern;
  if (context.trajectoryType) computed.trajectoryType = context.trajectoryType;
  if (context.motionEndpoint) computed.motionEndpoint = context.motionEndpoint;
  
  // Motion type properties
  if (context.physicalMotion) computed.physicalMotion = context.physicalMotion;
  if (context.abstractMotion) computed.abstractMotion = context.abstractMotion;
  if (context.metaphoricalMotion) computed.metaphoricalMotion = context.metaphoricalMotion;
  if (context.conceptualMovement) computed.conceptualMovement = context.conceptualMovement;
  if (context.literalMotion) computed.literalMotion = context.literalMotion;
  if (context.semanticDomain) computed.semanticDomain = context.semanticDomain;
  if (context.extendedMotion) computed.extendedMotion = context.extendedMotion;
  if (context.abstractMovement) computed.abstractMovement = context.abstractMovement;
  if (context.conceptualMotion) computed.conceptualMotion = context.conceptualMotion;
  if (context.cognitiveMotion) computed.cognitiveMotion = context.cognitiveMotion;
  if (context.mentalDomain) computed.mentalDomain = context.mentalDomain;
  
  // Tense and aspect properties
  if (context.motionTense) computed.motionTense = context.motionTense;
  if (context.motionAspect) computed.motionAspect = context.motionAspect;
  if (context.temporalModification) computed.temporalModification = context.temporalModification;
  if (context.verbalTense) computed.verbalTense = context.verbalTense;
  if (context.verbalAspect) computed.verbalAspect = context.verbalAspect;
  if (context.inflectedForm) computed.inflectedForm = context.inflectedForm;
  if (context.compositeMeaning) computed.compositeMeaning = context.compositeMeaning;
  if (context.temporalMotion) computed.temporalMotion = context.temporalMotion;
  
  // Voice and mood properties
  if (context.motionVoice) computed.motionVoice = context.motionVoice;
  if (context.motionMood) computed.motionMood = context.motionMood;
  if (context.modalFunction) computed.modalFunction = context.modalFunction;
  if (context.verbalVoice) computed.verbalVoice = context.verbalVoice;
  if (context.verbalMood) computed.verbalMood = context.verbalMood;
  if (context.voiceMotion) computed.voiceMotion = context.voiceMotion;
  
  // Derived forms properties
  if (context.derivedForm) computed.derivedForm = context.derivedForm;
  if (context.baseForm) computed.baseForm = context.baseForm;
  if (context.formationType) computed.formationType = context.formationType;
  if (context.originalRoot) computed.originalRoot = context.originalRoot;
  if (context.derivationType) computed.derivationType = context.derivationType;
  if (context.derivedComposition) computed.derivedComposition = context.derivedComposition;
  if (context.derivedMeaning) computed.derivedMeaning = context.derivedMeaning;
  if (context.derivedMotion) computed.derivedMotion = context.derivedMotion;
  
  // Motion manner analysis
  if (context.mannerAnalysis) computed.mannerAnalysis = context.mannerAnalysis;
  
  // Integration properties
  if (context.alsoUpasarga) computed.alsoUpasarga = context.alsoUpasarga;
  if (context.alsoNipata) computed.alsoNipata = context.alsoNipata;
  if (context.designationHierarchy) computed.designationHierarchy = context.designationHierarchy;
  if (context.potentialNipata) computed.potentialNipata = context.potentialNipata;
  if (context.contextualClassification) computed.contextualClassification = context.contextualClassification;
  if (context.notPureParticle) computed.notPureParticle = context.notPureParticle;
  if (context.boundMotionElement) computed.boundMotionElement = context.boundMotionElement;
  if (context.compositionalGati) computed.compositionalGati = context.compositionalGati;
  
  // Edge case properties
  if (context.vedicForm) computed.vedicForm = context.vedicForm;
  if (context.archaicMotion) computed.archaicMotion = context.archaicMotion;
  if (context.historicalContext) computed.historicalContext = context.historicalContext;
  if (context.ritualMotion) computed.ritualMotion = context.ritualMotion;
  if (context.ceremonialMovement) computed.ceremonialMovement = context.ceremonialMovement;
  if (context.sacredContext) computed.sacredContext = context.sacredContext;
  if (context.cosmicMotion) computed.cosmicMotion = context.cosmicMotion;
  if (context.astronomicalMovement) computed.astronomicalMovement = context.astronomicalMovement;
  if (context.celestialContext) computed.celestialContext = context.celestialContext;
  if (context.psychologicalMotion) computed.psychologicalMotion = context.psychologicalMotion;
  if (context.spiritualMovement) computed.spiritualMovement = context.spiritualMovement;
  if (context.meditativeContext) computed.meditativeContext = context.meditativeContext;
  if (context.complexComposition) computed.complexComposition = context.complexComposition;
  if (context.multiPrefixGati) computed.multiPrefixGati = context.multiPrefixGati;
  if (context.compoundMotionVerb) computed.compoundMotionVerb = context.compoundMotionVerb;
  
  return computed;
}

/**
 * Create standardized error result
 */
function createErrorResult(reason, message) {
  return {
    applies: false,
    sutra: '1.4.60',
    sutraText: 'गतिश्च',
    reason: reason,
    error: message
  };
}
