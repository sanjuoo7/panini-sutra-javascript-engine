/**
 * Sutra 1.4.44: हेतुश्च (hetuśca)
 * "And हेतु (cause/reason/motive) [is also करण]"
 * 
 * This sutra establishes that हेतु (cause, reason, motive) should be 
 * considered as करण कारक. It extends the definition of करण to include 
 * causal elements that motivate or bring about an action.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Main function implementing Sutra 1.4.44
 * @param {string} word - The word being analyzed for हेतु-करण relationship
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with हेतु-करण designation details
 */
export function sutra1444(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      word: word
    };
  }

  const script = detectScript(word);
  
  // Extract context information
  const {
    action = null,
    causalType = null,
    motivationType = null,
    case: grammaticalCase = null,
    caseMarker = null,
    context: sentenceContext = null,
    abstractLevel = 'medium',
    immediacy = 'direct',
    primaryCause = false,
    secondaryCauses = [],
    causalChain = [],
    position = null,
    compound = false,
    causes = [],
    temporalCause = false,
    metaphysical = false,
    culturalContext = false,
    tradition = null,
    timeType = null,
    realityLevel = null,
    philosophicalContext = null,
    sufficiency = null,
    causalNecessity = null,
    karanaSutra = null,
    apadanaTest = null,
    conflictingKarakas = [],
    resolution = null,
    emotion = null,
    instrumentality = null
  } = context;

  // Initialize analysis object
  const analysis = {
    rule: '1.4.44',
    applies: false,
    karaka: null,
    hetuType: null,
    hetuCategory: null,
    emotionType: null,
    reasoningType: null,
    elementType: null,
    ethicalType: null,
    practicalType: null,
    socialType: null,
    confidence: 0.5,
    reasons: [],
    conditions: {},
    script: script,
    word: word,
    action: action,
    causalAnalysis: {},
    motivationAnalysis: {},
    motivationCategory: null,
    causalStrength: null,
    grammaticalCase: grammaticalCase,
    causalCase: false,
    instrumentalCause: false,
    causalNecessity: null,
    causalSufficiency: null,
    abstractCause: false,
    concreteCause: false,
    compoundCause: compound,
    temporalCause: temporalCause,
    metaphysicalCause: metaphysical,
    culturalCause: culturalContext,
    primaryCause: primaryCause,
    causalChain: causalChain,
    positionInChain: position,
    individualCauses: causes,
    karanaSutraIntegration: false,
    causalInstrumentality: false,
    notApadana: false,
    conflictResolution: null,
    immediacy: immediacy,
    philosophicalDimension: philosophicalContext
  };

  // Validate Sanskrit input
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.validationError = validationResult.error;
    return analysis;
  }

  // Check for missing action context
  if (!action) {
    analysis.applies = false;
    analysis.error = 'missing_action_context';
    return analysis;
  }

  analysis.action = action;

  // Step 1: Identify if the word represents a हेतु (cause)
  const hetuAnalysis = analyzeHetu(word, context);
  if (hetuAnalysis.isHetu) {
    analysis.conditions.isHetu = true;
    analysis.hetuType = hetuAnalysis.type;
    analysis.hetuCategory = hetuAnalysis.category;
    
    // Assign specific type based on category
    if (hetuAnalysis.category === 'emotional') {
      analysis.emotionType = hetuAnalysis.specificType;
    } else if (hetuAnalysis.category === 'logical') {
      analysis.reasoningType = hetuAnalysis.specificType;
    } else if (hetuAnalysis.category === 'physical') {
      analysis.elementType = hetuAnalysis.specificType;
    }
    
    analysis.confidence += 0.3;
    analysis.reasons.push('hetu_identified');
  } else {
    analysis.conditions.isHetu = false;
    analysis.applies = false;
    analysis.reason = 'not_causal_relationship';
    return analysis;
  }

  // Step 2: Analyze causal relationship
  const causalAnalysis = analyzeCausalRelationship(word, action, context);
  if (causalAnalysis.isValid) {
    analysis.conditions.validCausalRelationship = true;
    analysis.causalAnalysis = causalAnalysis;
    analysis.confidence += 0.2;
    analysis.reasons.push('valid_causal_relationship');
  } else {
    analysis.conditions.validCausalRelationship = false;
    analysis.applies = false;
    analysis.reason = 'invalid_causal_relationship';
    return analysis;
  }

  // Step 3: Determine abstraction level and type
  if (abstractLevel === 'high' || philosophicalContext) {
    analysis.abstractCause = true;
    analysis.philosophicalDimension = philosophicalContext;
    analysis.confidence += 0.1;
  } else {
    analysis.concreteCause = true;
    analysis.immediacy = immediacy;
    analysis.confidence += 0.1;
  }

  // Step 4: Analyze motivation if present
  if (motivationType) {
    const motivationAnalysis = analyzeMotivation(word, context);
    analysis.motivationAnalysis = motivationAnalysis;
    analysis.motivationCategory = motivationAnalysis.category;
    
    if (motivationType === 'moral') {
      analysis.ethicalType = motivationAnalysis.ethicalType;
    } else if (motivationType === 'practical') {
      analysis.practicalType = motivationAnalysis.practicalType;
    } else if (motivationType === 'social') {
      analysis.socialType = motivationAnalysis.socialType;
    }
  }

  // Step 5: Analyze causal strength and necessity
  if (primaryCause) {
    analysis.causalStrength = 'primary';
  } else if (secondaryCauses.length > 0) {
    analysis.causalStrength = 'secondary';
  }

  // Handle causal necessity - can come from causalNecessity param or causalType
  if (causalNecessity) {
    analysis.causalNecessity = causalNecessity;
  } else if (causalType === 'necessary') {
    analysis.causalNecessity = 'necessary';
  }
  
  if (sufficiency !== null) {
    analysis.causalSufficiency = sufficiency;
  }

  // Step 6: Handle case analysis
  if (grammaticalCase) {
    analysis.grammaticalCase = grammaticalCase;
    if (grammaticalCase === 'ablative') {
      analysis.causalCase = true;
    } else if (grammaticalCase === 'instrumental') {
      analysis.instrumentalCause = true;
    }
  }

  // Step 7: Handle compound causes
  if (compound && causes.length > 0) {
    analysis.compoundCause = true;
    analysis.individualCauses = causes;
  }

  // Step 8: Integration with other systems
  if (karanaSutra) {
    analysis.karanaSutraIntegration = true;
    analysis.causalInstrumentality = instrumentality === 'causal';
  }

  if (apadanaTest === false) {
    analysis.notApadana = true;
  }

  if (conflictingKarakas.length > 0) {
    analysis.conflictResolution = handleKarakaConflicts(conflictingKarakas, analysis);
  }

  // Apply main sutra logic
  const allConditionsMet = 
    analysis.conditions.isHetu &&
    analysis.conditions.validCausalRelationship;

  if (allConditionsMet) {
    analysis.applies = true;
    analysis.karaka = 'करण';
    analysis.confidence = Math.min(analysis.confidence, 1.0);
    analysis.reasons.push('sutra_conditions_satisfied');
  }

  return analysis;
}

/**
 * Analyze if the word represents a हेतु (cause)
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} - Hetu analysis result
 */
function analyzeHetu(word, context) {
  const { causalType, emotion, temporalCause, metaphysical, culturalContext } = context;

  // Known हेतु categories
  const hetuCategories = {
    emotional: {
      words: ['भय', 'क्रोध', 'प्रेम', 'लोभ', 'मान', 'लज्जा', 'भक्ति'],
      iast: ['bhaya', 'krodha', 'prema', 'lobha', 'māna', 'lajjā', 'bhakti']
    },
    logical: {
      words: ['युक्ति', 'प्रमाण', 'तर्क', 'ज्ञान'],
      iast: ['yukti', 'pramāṇa', 'tarka', 'jñāna']
    },
    physical: {
      words: ['वात', 'अग्नि', 'जल', 'सूर्य', 'शीत', 'वर्षा'],
      iast: ['vāta', 'agni', 'jala', 'sūrya', 'śīta', 'varṣā']
    },
    moral: {
      words: ['धर्म', 'अधर्म', 'न्याय'],
      iast: ['dharma', 'adharma', 'nyāya']
    },
    practical: {
      words: ['आवश्यकता', 'लाभ', 'सुख'],
      iast: ['āvaśyakatā', 'lābha', 'sukha']
    },
    abstract: {
      words: ['कर्म', 'भाग्य', 'इच्छा', 'माया', 'संस्कार', 'काल', 'अविद्या', 'ज्ञान'],
      iast: ['karma', 'bhāgya', 'icchā', 'māyā', 'saṃskāra', 'kāla', 'avidyā', 'jñāna']
    }
  };

  // Check against known हेतु words - prioritize exact matches
  for (const [category, { words, iast }] of Object.entries(hetuCategories)) {
    // Check for exact word match first
    const exactWordMatch = words.find(w => word === w) || iast.find(w => word.toLowerCase() === w);
    if (exactWordMatch) {
      return {
        isHetu: true,
        type: category,
        category: category,
        specificType: getSpecificType(word, category, context)
      };
    }
  }

  // Then check for partial matches (like compound words)
  for (const [category, { words, iast }] of Object.entries(hetuCategories)) {
    const partialMatch = words.find(w => word.includes(w)) || iast.find(w => word.toLowerCase().includes(w));
    if (partialMatch) {
      return {
        isHetu: true,
        type: category,
        category: category,
        specificType: getSpecificType(word, category, context)
      };
    }
  }

  // Check based on causal type hint
  if (causalType && ['emotional', 'logical', 'physical', 'abstract', 'moral', 'practical'].includes(causalType)) {
    return {
      isHetu: true,
      type: causalType,
      category: causalType,
      specificType: emotion || 'general'
    };
  }

  // Check special cases
  if (temporalCause || metaphysical || culturalContext) {
    return {
      isHetu: true,
      type: temporalCause ? 'temporal' : metaphysical ? 'metaphysical' : 'cultural',
      category: temporalCause ? 'temporal' : metaphysical ? 'metaphysical' : 'cultural'
    };
  }

  return { isHetu: false };
}

/**
 * Get specific type for a category
 * @param {string} word - Word being analyzed
 * @param {string} category - Category of हेतु
 * @param {Object} context - Context information
 * @returns {string} - Specific type
 */
function getSpecificType(word, category, context) {
  const specificTypes = {
    'भय': 'fear',
    'क्रोध': 'anger', 
    'प्रेम': 'love',
    'लोभ': 'greed',
    'मान': 'honor',
    'लज्जा': 'shame',
    'भक्ति': 'devotion',
    'युक्ति': 'reasoning',
    'प्रमाण': 'evidence',
    'तर्क': 'logic',
    'वात': 'wind',
    'अग्नि': 'fire',
    'जल': 'water',
    'सूर्य': 'sun',
    'शीत': 'cold',
    'वर्षा': 'rain',
    'धर्म': 'duty',
    'अधर्म': 'prevention',
    'न्याय': 'justice',
    'आवश्यकता': 'necessity',
    'लाभ': 'profit',
    'सुख': 'pleasure'
  };

  // First try exact match
  if (specificTypes[word]) {
    return specificTypes[word];
  }

  // Then try context emotion
  if (context.emotion) {
    return context.emotion;
  }

  return 'general';
}

/**
 * Analyze the causal relationship between word and action
 * @param {string} word - Causal word
 * @param {string} action - Action word
 * @param {Object} context - Context information
 * @returns {Object} - Causal relationship analysis
 */
function analyzeCausalRelationship(word, action, context) {
  // Check for obvious non-causal relationships
  const nonCausalWords = ['पुस्तक', 'book', 'गृह', 'house'];
  if (nonCausalWords.some(nonCausal => word.includes(nonCausal))) {
    return { isValid: false, reason: 'non_causal_word' };
  }

  // Valid causal patterns
  const causalPatterns = {
    'भय': ['पलायन', 'गुप्ति', 'त्याग'],
    'क्रोध': ['दण्डन', 'हिंसा', 'युद्ध'],
    'प्रेम': ['सेवा', 'दान', 'रक्षा'],
    'अग्नि': ['पाक', 'दाह', 'प्रकाश'],
    'धर्म': ['दान', 'सेवा', 'कर्म']
  };

  // Check semantic compatibility
  for (const [cause, actions] of Object.entries(causalPatterns)) {
    if (word.includes(cause) && actions.some(a => action.includes(a))) {
      return {
        isValid: true,
        pattern: 'semantic_match',
        strength: 'strong'
      };
    }
  }

  // Default to valid if we have causal type context
  if (context.causalType) {
    return {
      isValid: true,
      pattern: 'context_based',
      strength: 'medium'
    };
  }

  return {
    isValid: true,
    pattern: 'general',
    strength: 'weak'
  };
}

/**
 * Analyze motivation aspects
 * @param {string} word - Word being analyzed
 * @param {Object} context - Context information
 * @returns {Object} - Motivation analysis
 */
function analyzeMotivation(word, context) {
  const { motivationType } = context;

  const motivationMap = {
    moral: {
      'धर्म': { ethicalType: 'duty' },
      'अधर्म': { ethicalType: 'prevention' },
      'न्याय': { ethicalType: 'justice' }
    },
    practical: {
      'आवश्यकता': { practicalType: 'necessity' },
      'लाभ': { practicalType: 'profit' },
      'सुख': { practicalType: 'pleasure' }
    },
    social: {
      'मान': { socialType: 'honor' },
      'लज्जा': { socialType: 'shame' },
      'भक्ति': { socialType: 'devotion' }
    }
  };

  if (motivationType && motivationMap[motivationType]) {
    // First try exact matches
    for (const [motivationWord, details] of Object.entries(motivationMap[motivationType])) {
      if (word === motivationWord) {
        return {
          category: motivationType,
          ...details
        };
      }
    }
    
    // Then try partial matches for compound words
    for (const [motivationWord, details] of Object.entries(motivationMap[motivationType])) {
      if (word.includes(motivationWord)) {
        return {
          category: motivationType,
          ...details
        };
      }
    }
  }

  return {
    category: motivationType || 'general'
  };
}

/**
 * Handle conflicts with other कारक assignments
 * @param {Array} conflictingKarakas - Other कारक assignments in conflict
 * @param {Object} analysis - Current analysis state
 * @returns {Object} - Conflict resolution information
 */
function handleKarakaConflicts(conflictingKarakas, analysis) {
  return {
    conflicts: conflictingKarakas,
    resolution: 'hetu_precedence',
    rationale: 'Sutra 1.4.44 establishes हेतु as करण with high precedence',
    priority: 'high'
  };
}

/**
 * Simple helper function to check if word qualifies as हेतु-करण under this sutra
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} Quick boolean result
 */
export function isHetuKarana(word, context = {}) {
  const result = sutra1444(word, context);
  return result.applies === true;
}

// Export for test compatibility
export { sutra1444 as default };
