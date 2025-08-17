/**
 * Sutra 1.4.42: साधकतमं करणम् (sādhakatamaṃ karaṇam)
 * "The most instrumental (in accomplishing an action) is called करण"
 * 
 * This sutra defines करण कारक (instrumental case) as that which is most
 * instrumental or especially auxiliary in accomplishing an action.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { analyzeKarana } from '../sanskrit-utils/karaka-analysis.js';

/**
 * Main function implementing Sutra 1.4.42
 * @param {string} word - The word being analyzed for करण designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with करण designation and details
 */
export function sutra1442(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      word: word
    };
  }

  const script = detectScript(word);
  
  // Extract key context information first
  const {
    action = null,
    verb = null,
    case: grammaticalCase = null,
    instrumentType = null,
    instrumentality = null,
    otherInstruments = [],
    compatibility = null,
    usage = 'literal',
    context: sentenceContext = null,
    primaryInstrument = null
  } = context;

  // Initialize analysis object with all required fields
  const analysis = {
    rule: '1.4.42',
    applies: false,
    karaka: null,
    confidence: 0.5,
    reasons: [],
    conditions: {},
    script: script,
    instrumentType: null,
    instrumentality: null,
    compatibility: null,
    usage: usage,
    toolCategory: null,
    methodCategory: null,
    abstractCategory: null,
    comparison: null,
    ambiguity: false,
    bodyPartInstrument: false,
    collectiveInstrument: false,
    temporalInstrument: false,
    compoundInstrument: false,
    compoundAnalysis: null,
    naturalness: null,
    literalness: usage === 'literal',
    agency: null,
    kartaRelation: null,
    integration: null,
    disambiguation: null,
    analysis: {
      actionInstrumentFit: null,
      contextParsing: null
    }
  };

  // Validate Sanskrit input and script consistency - do this first
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.validationError = validationResult.error;
    return analysis;
  }

  // Check for missing required context fields
  if (Object.keys(context).length === 0) {
    analysis.applies = false;
    analysis.error = 'insufficient_context';
    return analysis;
  }

  // Check for missing action context - required for करण analysis
  if (!action) {
    analysis.applies = false;
    analysis.error = 'missing_action_context';
    return analysis;
  }

  // Check for non-instrumental case early
  if (grammaticalCase && grammaticalCase !== 'instrumental') {
    analysis.applies = false;
    analysis.reason = 'non_instrumental_case';
    analysis.actualCase = grammaticalCase;
    return analysis;
  }

  analysis.action = action;
  analysis.verb = verb;
  analysis.instrumentType = instrumentType;
  analysis.instrumentality = instrumentality;
  analysis.compatibility = compatibility;

  // Enhanced context parsing
  analysis.analysis.contextParsing = {
    actionType: classifyAction(action),
    instrumentAnalysis: analyzeInstrumentType(word, context),
    compatibilityScore: calculateCompatibility(word, action, context)
  };

  // Step 1: Check for instrumental case (if specified)
  if (detectInstrumentalCase(word, context)) {
    analysis.conditions.hasInstrumentalCase = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('instrumental_case_detected');
  }

  // Step 2: Analyze instrumentality degree
  const instrumentalityAnalysis = analyzeInstrumentality(word, action, context);
  if (instrumentalityAnalysis.isMostInstrumental) {
    analysis.conditions.isMostInstrumental = true;
    analysis.instrumentality = instrumentalityAnalysis.degree;
    analysis.comparison = instrumentalityAnalysis.comparison;
    analysis.confidence += 0.4;
    analysis.reasons.push('most_instrumental_confirmed');
  } else {
    analysis.conditions.isMostInstrumental = false;
    analysis.instrumentality = instrumentalityAnalysis.degree;
    if (instrumentalityAnalysis.degree === 'secondary') {
      analysis.reason = 'not_most_instrumental';
      analysis.reasons.push('secondary_instrumentality_detected');
    }
  }

  // Step 3: Analyze action-instrument compatibility
  const compatibilityResult = analyzeActionInstrumentCompatibility(word, action, context);
  if (compatibilityResult.isCompatible) {
    analysis.conditions.isCompatible = true;
    analysis.compatibility = compatibilityResult.level;
    analysis.analysis.actionInstrumentFit = compatibilityResult.fit;
    analysis.confidence += 0.2;
    analysis.reasons.push('action_instrument_compatible');
  } else {
    analysis.conditions.isCompatible = false;
    analysis.compatibility = compatibilityResult.level;
    if (compatibilityResult.level === 'poor') {
      analysis.applies = false;
      analysis.reason = 'inappropriate_instrument';
      return analysis;
    }
  }

  // Step 4: Classify instrument type
  const instrumentClassification = classifyInstrument(word, context);
  analysis.instrumentType = instrumentClassification.type;
  
  switch (instrumentClassification.type) {
    case 'tool':
      analysis.toolCategory = instrumentClassification.category;
      break;
    case 'method':
      analysis.methodCategory = instrumentClassification.category;
      break;
    case 'abstract_means':
      analysis.abstractCategory = instrumentClassification.category;
      break;
  }

  // Step 5: Handle special instrument categories
  handleSpecialCategories(analysis, word, context);

  // Apply main sutra logic
  const allConditionsMet = 
    analysis.conditions.isMostInstrumental &&
    analysis.conditions.isCompatible;

  if (allConditionsMet) {
    analysis.applies = true;
    analysis.karaka = 'करण';
    analysis.confidence = Math.min(analysis.confidence, 1.0);
    analysis.reasons.push('sutra_conditions_satisfied');

    // Handle ambiguity in equal instrumentality cases
    if (analysis.instrumentality === 'equally_instrumental') {
      analysis.ambiguity = true;
    }

    // Handle integration with other कारक rules
    if (context.ambiguousRoles || context.sampradana || context.karta) {
      analysis.integration = handleKarakaIntegration(context, analysis);
    }

  } else {
    // Identify missing conditions
    const missingConditions = [];
    if (!analysis.conditions.isMostInstrumental) missingConditions.push('most_instrumental');
    if (!analysis.conditions.isCompatible) missingConditions.push('compatibility');
    
    analysis.missingConditions = missingConditions;
    
    // Set specific reason if not already set
    if (!analysis.reason) {
      if (missingConditions.includes('most_instrumental')) {
        analysis.reason = 'not_most_instrumental';
      } else if (missingConditions.includes('compatibility')) {
        analysis.reason = 'incompatible_action_instrument';
      }
    }
    
    analysis.reasons.push(`missing_conditions: ${missingConditions.join(', ')}`);
  }

  // Handle explicit semantic role override
  if (context.forceKarana || instrumentality === 'primary') {
    analysis.applies = true;
    analysis.karaka = 'करण';
    analysis.confidence = Math.max(analysis.confidence, 0.8);
    analysis.reasons.push('explicit_karana_designation');
  }

  return analysis;
}

/**
 * Classify the type of action
 * @param {string} action - Action to classify
 * @returns {string} - Action type classification
 */
function classifyAction(action) {
  const actionTypes = {
    physical: ['छेदन', 'गमन', 'ग्रहण', 'खनन', 'लेखन', 'बाणविक्षेप'],
    mental: ['चिन्तन', 'स्मरण', 'निर्णय', 'मनन'],
    spiritual: ['ध्यान', 'यज्ञ', 'तपस्', 'जप'],
    social: ['दान', 'विवाह', 'युद्ध'],
    creative: ['निर्माण', 'रचना', 'कलाकरण']
  };

  for (const [type, actions] of Object.entries(actionTypes)) {
    if (actions.some(act => action.includes(act))) {
      return type;
    }
  }
  
  return 'general';
}

/**
 * Analyze the type of instrument
 * @param {string} word - Instrument word
 * @param {Object} context - Context information
 * @returns {Object} - Instrument analysis
 */
function analyzeInstrumentType(word, context) {
  const physicalTools = ['कुठार', 'लेखनी', 'धनुष्', 'खड्ग', 'यन्त्र'];
  const bodyParts = ['हस्त', 'पाद', 'नेत्र', 'वाक्', 'मुख'];
  const methods = ['विद्या', 'यज्ञ', 'अभ्यास', 'तपस्', 'मन्त्र'];
  const abstractMeans = ['श्रद्धा', 'बुद्धि', 'धैर्य', 'भाग्य', 'काल'];

  if (physicalTools.some(tool => word.includes(tool))) {
    return { category: 'physical_tool', concrete: true };
  }
  if (bodyParts.some(part => word.includes(part))) {
    return { category: 'body_part', concrete: true, natural: true };
  }
  if (methods.some(method => word.includes(method))) {
    return { category: 'method', concrete: false };
  }
  if (abstractMeans.some(means => word.includes(means))) {
    return { category: 'abstract', concrete: false };
  }

  return { category: 'general', concrete: true };
}

/**
 * Calculate compatibility between instrument and action
 * @param {string} word - Instrument word
 * @param {string} action - Action
 * @param {Object} context - Context information
 * @returns {number} - Compatibility score (0-1)
 */
function calculateCompatibility(word, action, context) {
  // Known good combinations
  const compatibilityMatrix = {
    'कुठार': ['छेदन', 'कर्तन'],
    'लेखनी': ['लेखन', 'अङ्कन'],
    'पाद': ['गमन', 'चलन'],
    'हस्त': ['ग्रहण', 'स्पर्श'],
    'अग्नि': ['पाक', 'दाह'],
    'विद्या': ['धनलाभ', 'यश'],
    'बल': ['उत्थान', 'गमन']
  };

  for (const [instrument, actions] of Object.entries(compatibilityMatrix)) {
    if (word.includes(instrument) && actions.some(act => action.includes(act))) {
      return 0.9;
    }
  }

  // Check context hints
  if (context.compatibility) {
    switch (context.compatibility) {
      case 'natural': return 0.8;
      case 'good': return 0.7;
      case 'moderate': return 0.5;
      case 'poor': return 0.2;
      default: return 0.5;
    }
  }

  return 0.5; // Default moderate compatibility
}

/**
 * Analyze instrumentality degree
 * @param {string} word - Instrument word
 * @param {string} action - Action
 * @param {Object} context - Context information
 * @returns {Object} - Instrumentality analysis
 */
function analyzeInstrumentality(word, action, context) {
  const analysis = {
    isMostInstrumental: false,
    degree: 'unknown',
    comparison: null
  };

  // Check explicit instrumentality designation
  if (context.instrumentality) {
    switch (context.instrumentality) {
      case 'primary':
      case 'most_effective':
        analysis.isMostInstrumental = true;
        analysis.degree = 'most_instrumental';
        break;
      case 'secondary':
        analysis.isMostInstrumental = false;
        analysis.degree = 'secondary';
        break;
      case 'equal':
        analysis.isMostInstrumental = true; // Equal instruments are both "most instrumental"
        analysis.degree = 'equally_instrumental';
        analysis.comparison = {
          primary: word,
          secondary: context.otherInstruments || [],
          equality: true
        };
        break;
      case 'comparative':
        analysis.isMostInstrumental = true;
        analysis.degree = 'most_instrumental';
        if (context.otherInstruments) {
          analysis.comparison = {
            primary: word,
            secondary: context.otherInstruments
          };
        }
        break;
    }
  } else {
    // Default to most instrumental if no other instruments specified
    if (!context.otherInstruments || context.otherInstruments.length === 0) {
      analysis.isMostInstrumental = true;
      analysis.degree = 'primary';
    }
  }

  return analysis;
}

/**
 * Analyze action-instrument compatibility
 * @param {string} word - Instrument word
 * @param {string} action - Action
 * @param {Object} context - Context information
 * @returns {Object} - Compatibility analysis
 */
function analyzeActionInstrumentCompatibility(word, action, context) {
  const compatibility = calculateCompatibility(word, action, context);
  
  return {
    isCompatible: compatibility >= 0.4,
    level: compatibility >= 0.8 ? 'natural' : 
           compatibility >= 0.6 ? 'good' : 
           compatibility >= 0.4 ? 'moderate' : 'poor',
    fit: compatibility >= 0.8 ? 'optimal' : 
         compatibility >= 0.6 ? 'good' : 
         compatibility >= 0.4 ? 'acceptable' : 'poor',
    score: compatibility
  };
}

/**
 * Classify instrument into specific categories
 * @param {string} word - Instrument word
 * @param {Object} context - Context information
 * @returns {Object} - Classification result
 */
function classifyInstrument(word, context) {
  // Physical tools
  const toolCategories = {
    'कुठार': 'cutting_tool',
    'लेखनी': 'writing_tool',
    'धनुष्': 'weapon',
    'खड्ग': 'weapon',
    'फरशु': 'cutting_tool'
  };

  // Methods
  const methodCategories = {
    'यज्ञ': 'ritual_method',
    'अभ्यास': 'practice_method',
    'तपस्': 'spiritual_method',
    'विद्या': 'knowledge_method'
  };

  // Abstract means
  const abstractCategories = {
    'बुद्धि': 'cognitive',
    'धैर्य': 'emotional',
    'भाग्य': 'circumstantial',
    'श्रद्धा': 'spiritual',
    'काल': 'temporal'
  };

  // Check for tool
  for (const [tool, category] of Object.entries(toolCategories)) {
    if (word.includes(tool)) {
      return { type: 'tool', category };
    }
  }

  // Check for method
  for (const [method, category] of Object.entries(methodCategories)) {
    if (word.includes(method)) {
      return { type: 'method', category };
    }
  }

  // Check for abstract means
  for (const [abstract, category] of Object.entries(abstractCategories)) {
    if (word.includes(abstract)) {
      return { type: 'abstract_means', category };
    }
  }

  // Check context hints
  if (context.instrumentType) {
    return { type: context.instrumentType, category: 'general' };
  }

  return { type: 'general', category: 'unspecified' };
}

/**
 * Handle special instrument categories
 * @param {Object} analysis - Analysis object to modify
 * @param {string} word - Instrument word
 * @param {Object} context - Context information
 */
function handleSpecialCategories(analysis, word, context) {
  // Body parts
  const bodyParts = ['हस्त', 'पाद', 'नेत्र', 'वाक्', 'मुख', 'शिरस्'];
  if (bodyParts.some(part => word.includes(part)) || context.instrumentCategory === 'body_part') {
    analysis.bodyPartInstrument = true;
    analysis.naturalness = 'high';
  }

  // Collective instruments
  if (word.includes('सेना') || word.includes('गण') || context.collective) {
    analysis.collectiveInstrument = true;
  }

  // Temporal instruments
  if (word.includes('काल') || word.includes('समय') || context.temporal) {
    analysis.temporalInstrument = true;
  }

  // Compound instruments
  if (word.length > 6 || context.compound) {
    analysis.compoundInstrument = true;
    analysis.compoundAnalysis = {
      detected: true,
      complexity: word.length > 10 ? 'high' : 'moderate'
    };
  }
}

/**
 * Handle integration with other कारक rules
 * @param {Object} context - Context information
 * @param {Object} analysis - Current analysis
 * @returns {Object} - Integration information
 */
function handleKarakaIntegration(context, analysis) {
  const integration = {};

  // Handle सम्प्रदान integration
  if (context.sampradana) {
    integration.sampradana = context.sampradana;
    integration.relationship = 'instrument_for_beneficiary';
  }

  // Handle कर्ता-करण distinction
  if (context.karta) {
    integration.karta = context.karta;
    analysis.agency = 'instrumental';
    analysis.kartaRelation = 'enabler';
  }

  // Handle करण-कर्म disambiguation
  if (context.ambiguousRoles && context.ambiguousRoles.includes('कर्म')) {
    analysis.disambiguation = 'instrumentality_primary';
  }

  return integration;
}

/**
 * Check if input is instrumental case
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} - Whether word appears to be in instrumental case
 */
function detectInstrumentalCase(word, context) {
  // Check context hint first
  if (context.case === 'instrumental') {
    return true;
  }

  // Check for instrumental endings
  const instrumentalEndings = ['एन', 'ेण', 'ाभ्याम्', 'ैः'];
  return instrumentalEndings.some(ending => word.endsWith(ending));
}

/**
 * Simple helper function to check if word qualifies for करण under this sutra
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} Quick boolean result
 */
export function isSadhakatamaKarana(word, context = {}) {
  const result = sutra1442(word, context);
  return result.applies === true;
}

// Export for test compatibility
export { sutra1442 as default };
