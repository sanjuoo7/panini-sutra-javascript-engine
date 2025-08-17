/**
 * Sutra 1.4.53: हृक्रोरन्यतरस्याम्
 * Implementation for optional कर्ता to कर्म transformation in हृ and कृ verbs
 * 
 * This sutra establishes an optional rule where the agent (कर्ता) of the verbs 
 * हृ (to lose, take away, remove) and कृ (to make, do, create) can optionally 
 * be treated as कर्म कारक under specific conditions. This creates grammatical 
 * flexibility reflecting semantic relationships where traditional agent-object 
 * distinction becomes blurred or inverted.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { normalizeScript } from '../sanskrit-utils/transliteration.js';

/**
 * Analyzes हृ and कृ verb constructions for optional कर्ता to कर्म transformation
 * @param {string} word - The word (agent) to analyze
 * @param {Object} context - Contextual information about the verb usage
 * @returns {Object} Analysis result with optional transformation details
 */
export function sutra1453(word, context = {}) {
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

  // Check if this rule applies to this verb context
  if (!isHriOrKriVerb(context)) {
    return {
      applies: false,
      reason: 'not_hri_or_kri_verb',
      analysis: 'Rule only applies to हृ and कृ verbs'
    };
  }

  // Check if optionality is blocked
  if (context.optionalityBlocked === true || context.mandatoryRole) {
    return {
      applies: false,
      reason: 'optionality_not_applicable',
      analysis: 'Optional transformation is blocked in this context'
    };
  }

  // Normalize the word for analysis
  const normalizedWord = normalizeScript(trimmedWord);
  
  // Analyze the verb and agent relationship
  const verbAnalysis = analyzeHriKriVerb(context);
  
  // Build the result for optional transformation
  const result = {
    applies: true,
    karaka: 'कर्म', // The optional assignment
    sutra: '1.4.53',
    sutraText: 'हृक्रोरन्यतरस्याम्',
    word: trimmedWord,
    script: script,
    optionalRule: true,
    optionalKarma: true,
    originalRole: 'कर्ता',
    alternateRole: 'कर्म',
    verbRoot: context.verbRoot,
    ...verbAnalysis
  };

  // Add contextual analysis
  addContextualAnalysis(result, context);
  
  return result;
}

/**
 * Checks if the context involves हृ or कृ verbs
 */
function isHriOrKriVerb(context) {
  if (context.verbRoot) {
    const verbRoot = context.verbRoot;
    
    // Direct root identification
    if (verbRoot === 'हृ' || verbRoot === 'कृ' || 
        verbRoot === 'hṛ' || verbRoot === 'kṛ') {
      return true;
    }
  }
  
  // Check any verb forms in context
  const verbSources = [
    context.verb,
    context.activeForm,
    context.passiveForm,
    context.middleForm
  ].filter(Boolean);
  
  if (verbSources.length > 0) {
    // हृ verb forms
    const hriVerbForms = [
      'हरति', 'जहार', 'हरिष्यति', 'अहार्षीत्', 'हृत', 'ह्रियते', 'हरते',
      'harati', 'jahāra', 'hariṣyati', 'ahārṣīt', 'hṛta', 'hriyate', 'harate'
    ];
    
    // कृ verb forms  
    const kriVerbForms = [
      'करोति', 'चकार', 'करिष्यति', 'अकार्षीत्', 'कृत', 'क्रियते', 'कुरुते',
      'karoti', 'cakāra', 'kariṣyati', 'akārṣīt', 'kṛta', 'kriyate', 'kurute'
    ];
    
    // Check compound forms
    const hriCompounds = ['उपहरति', 'अपहरति', 'आहरति', 'प्रहरति'];
    const kriCompounds = ['विकरोति', 'संकरोति', 'प्रकरोति', 'निष्करोति'];
    
    for (const verbForm of verbSources) {
      if (hriVerbForms.some(form => verbForm.includes(form.slice(0, 3))) ||
          kriVerbForms.some(form => verbForm.includes(form.slice(0, 3))) ||
          hriCompounds.some(compound => verbForm.includes(compound)) ||
          kriCompounds.some(compound => verbForm.includes(compound))) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Analyzes the specific characteristics of हृ/कृ verb usage
 */
function analyzeHriKriVerb(context) {
  const analysis = {
    verbType: null,
    verbCharacteristics: {},
    transformationType: 'कर्ता_to_कर्म'
  };

  // Determine verb type
  if (context.verbRoot === 'हृ' || context.verbRoot === 'hṛ' ||
      (context.verb && isHriVerb(context.verb))) {
    analysis.verbType = 'हृ';
    analysis.verbCharacteristics = {
      semanticField: 'taking_removing',
      agencyType: 'transitive',
      objectRelation: 'affected'
    };
  } else if (context.verbRoot === 'कृ' || context.verbRoot === 'kṛ' ||
             (context.verb && isKriVerb(context.verb))) {
    analysis.verbType = 'कृ';
    analysis.verbCharacteristics = {
      semanticField: 'making_doing',
      agencyType: 'transitive',
      objectRelation: 'created'
    };
  }

  return analysis;
}

/**
 * Checks if a verb form belongs to हृ root
 */
function isHriVerb(verb) {
  const hriPatterns = ['हर', 'हृ', 'har', 'hṛ', 'ह्रि', 'hri'];
  return hriPatterns.some(pattern => verb.includes(pattern));
}

/**
 * Checks if a verb form belongs to कृ root
 */
function isKriVerb(verb) {
  const kriPatterns = ['कर', 'कृ', 'kar', 'kṛ', 'क्रि', 'kri'];
  return kriPatterns.some(pattern => verb.includes(pattern));
}

/**
 * Adds contextual analysis to the result
 */
function addContextualAnalysis(result, context) {
  // Verb form analysis
  if (context.verb) {
    result.verb = context.verb;
  }
  
  if (context.verbForm) {
    result.verbForm = context.verbForm;
  }
  
  if (context.verbMeaning) {
    result.verbMeaning = context.verbMeaning;
  }

  // Agent role analysis
  if (context.agentRole) {
    result.agentRole = context.agentRole;
  }
  
  if (context.semanticRole) {
    result.semanticRole = context.semanticRole;
  }
  
  if (context.actionType) {
    result.actionType = context.actionType;
  }

  // Causative analysis
  if (context.causativeType) {
    result.causativeType = context.causativeType;
  }
  
  if (context.agentComplexity) {
    result.agentComplexity = context.agentComplexity;
  }

  // Transformation analysis
  if (context.transformationType) {
    result.transformationType = context.transformationType;
  }
  
  if (context.optionalTransformation) {
    result.optionalTransformation = context.optionalTransformation;
  }

  // Optionality analysis
  if (context.optionalityLevel) {
    result.optionalityLevel = context.optionalityLevel;
  }
  
  if (context.alternateAnalysis) {
    result.alternateAnalysis = context.alternateAnalysis;
  }
  
  if (context.traditionalRole) {
    result.traditionalRole = context.traditionalRole;
  }
  
  if (context.optionalRole) {
    result.optionalRole = context.optionalRole;
  }

  // Semantic flexibility
  if (context.roleAmbiguity) {
    result.roleAmbiguity = context.roleAmbiguity;
  }
  
  if (context.semanticFlexibility) {
    result.semanticFlexibility = context.semanticFlexibility;
  }

  // Agency and intentionality
  if (context.intentionality) {
    result.intentionality = context.intentionality;
  }
  
  if (context.agencyLevel) {
    result.agencyLevel = context.agencyLevel;
  }
  
  if (context.controlLevel) {
    result.controlLevel = context.controlLevel;
  }

  // Compound verb analysis
  if (context.compoundVerb) {
    result.compoundVerb = context.compoundVerb;
  }
  
  if (context.prefix) {
    result.prefix = context.prefix;
  }
  
  if (context.compoundMeaning) {
    result.compoundMeaning = context.compoundMeaning;
  }

  // Denominative analysis
  if (context.denominativeForm) {
    result.denominativeForm = context.denominativeForm;
  }
  
  if (context.denominativeBase) {
    result.denominativeBase = context.denominativeBase;
  }
  
  if (context.denominativeMeaning) {
    result.denominativeMeaning = context.denominativeMeaning;
  }

  // Voice analysis
  if (context.voice) {
    result.voice = context.voice;
  }
  
  if (context.passiveAgent) {
    result.passiveAgent = context.passiveAgent;
  }
  
  if (context.instrumentalCase) {
    result.instrumentalCase = context.instrumentalCase;
  }
  
  if (context.voiceTransformation) {
    result.voiceTransformation = context.voiceTransformation;
  }

  // Voice forms
  if (context.activeForm) {
    result.activeForm = context.activeForm;
  }
  
  if (context.passiveForm) {
    result.passiveForm = context.passiveForm;
  }
  
  if (context.middleForm) {
    result.middleForm = context.middleForm;
  }

  // System integration
  if (context.integrationWithKarma) {
    result.integrationWithKarma = context.integrationWithKarma;
  }
  
  if (context.generalKarmaRules) {
    result.generalKarmaRules = context.generalKarmaRules;
  }
  
  if (context.specializedRule) {
    result.specializedRule = context.specializedRule;
  }

  // Related sutras
  if (context.relatedToSutra1449) {
    result.relatedToSutra1449 = context.relatedToSutra1449;
  }
  
  if (context.relatedToSutra1450) {
    result.relatedToSutra1450 = context.relatedToSutra1450;
  }

  // Edge case handling
  if (context.vedicForm) {
    result.vedicForm = context.vedicForm;
  }
  
  if (context.archaicUsage) {
    result.archaicUsage = context.archaicUsage;
  }
  
  if (context.historicalContext) {
    result.historicalContext = context.historicalContext;
  }

  // Reduplication
  if (context.reduplication) {
    result.reduplication = context.reduplication;
  }
  
  if (context.desiderativeForm) {
    result.desiderativeForm = context.desiderativeForm;
  }
  
  if (context.intensiveDesire) {
    result.intensiveDesire = context.intensiveDesire;
  }

  // Multiple agents
  if (context.multipleAgents) {
    result.multipleAgents = context.multipleAgents;
  }
  
  if (context.collectiveAction) {
    result.collectiveAction = context.collectiveAction;
  }
  
  if (context.distributedAgency) {
    result.distributedAgency = context.distributedAgency;
  }

  // Meta-linguistic
  if (context.metaLinguistic) {
    result.metaLinguistic = context.metaLinguistic;
  }
  
  if (context.grammaticalExample) {
    result.grammaticalExample = context.grammaticalExample;
  }
  
  if (context.technicalUsage) {
    result.technicalUsage = context.technicalUsage;
  }

  // Boolean flags from context
  const booleanFlags = [
    'optionalKarma', 'notKarana', 'notAdhikarana', 'notSampradan'
  ];
  
  booleanFlags.forEach(flag => {
    if (context[flag] !== undefined) {
      result[flag] = context[flag];
    }
  });

  // Object and context
  if (context.object) {
    result.object = context.object;
  }
  
  if (context.context) {
    result.context = context.context;
  }
}

export default sutra1453;
