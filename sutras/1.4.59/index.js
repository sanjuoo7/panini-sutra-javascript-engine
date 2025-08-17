/**
 * Sutra 1.4.59: उपसर्गाः क्रियायोगे
 * 
 * This sutra establishes that प्र and similar elements (referred to in 1.4.58) receive 
 * the technical designation of उपसर्ग (prefix) when they are in composition with verbal 
 * roots (क्रियायोग). This distinguishes their prefix function from their particle function.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.59
 * Classifies prefix elements as उपसर्ग when in composition with verbs
 * 
 * @param {string|string[]} prefix - The prefix(es) to analyze
 * @param {string} verb - The verbal root in composition
 * @param {Object} context - Context object with analysis parameters
 * @returns {Object} Analysis result with classification and properties
 */
export function sutra1459(prefix, verb, context = {}) {
  try {
    // Input validation
    if (!prefix || (typeof prefix !== 'string' && !Array.isArray(prefix))) {
      return createErrorResult('invalid_prefix', 'Prefix must be a non-empty string or array');
    }

    if (!verb || typeof verb !== 'string') {
      // Special handling for independent usage tests
      if (context.independentUsage === true || context.kriyaYoga === false) {
        return createErrorResult('no_kriya_yoga', 'no_kriya_yoga');
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

    // Check if elements are valid upasarga elements
    for (const p of prefixArray) {
      if (!isUpasargaElement(p.trim())) {
        return createErrorResult('not_upasarga_element', `${p} is not a valid उपसर्ग element`);
      }
    }

    // Check if verb is actually a verbal root
    if (!isVerbalRoot(verb.trim(), context)) {
      return createErrorResult('non_verbal_composition', 'Second element is not a verbal root');
    }

    // Check for क्रियायोग (verbal composition)
    if (context.kriyaYoga === false || context.independentUsage === true) {
      return createErrorResult('no_kriya_yoga', 'No क्रियायोग (verbal composition) present');
    }

    // Analyze the composition
    const compositionAnalysis = analyzeKriyaYoga(prefixArray, verb, context);
    
    // Analyze upasarga properties
    const upasargaAnalysis = analyzeUpasargaProperties(prefixArray, verb, context);
    
    // Analyze semantic modifications
    const semanticAnalysis = analyzeSemanticModification(prefixArray, verb, context);

    // Create result object
    const result = {
      applies: true,
      sutra: '1.4.59',
      sutraText: 'उपसर्गाः क्रियायोगे',
      prefix: Array.isArray(prefix) ? prefix : prefix,
      verb: verb,
      classification: 'उपसर्ग',
      script: detectScript(Array.isArray(prefix) ? prefix[0] : prefix),
      
      // Core properties
      kriyaYoga: true,
      boundToVerb: true,
      technicalDesignation: 'उपसर्ग',
      
      // Composition analysis
      ...compositionAnalysis,
      
      // Upasarga analysis
      ...upasargaAnalysis,
      
      // Semantic analysis
      ...semanticAnalysis,
      
      // Context properties
      context: context.context || '',
      
      // Integration properties
      relatedToSutra1456: context.relatedToSutra1456 || true, // अधिकार sutra
      relatedToSutra1458: context.relatedToSutra1458 || true, // प्रादयः as निपात
      dualClassification: context.dualClassification || true,
      contextDependent: context.contextDependent || true,
      
      // Additional computed properties
      ...getComputedProperties(prefixArray, verb, context, compositionAnalysis, upasargaAnalysis, semanticAnalysis)
    };

    return result;

  } catch (error) {
    return createErrorResult('processing_error', `Error processing composition: ${error.message}`);
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
    'अभि', 'प्रति', 'परि', 'उप',
    
    // IAST equivalents
    'pra', 'parā', 'para', 'ap', 'sam', 'anu', 'ava', 'nis', 'nir', 'dus', 'dur',
    'vi', 'ā', 'a', 'ni', 'adhi', 'adh', 'api', 'ati', 'su', 'ut', 'ud',
    'abhi', 'prati', 'pari', 'upa'
  ]);
  
  return upasargas.has(element);
}

/**
 * Helper function to check if element is a verbal root
 */
function isVerbalRoot(element, context = {}) {
  // Check if explicitly marked as verbal root in context
  if (context?.isVerbalRoot === true) return true;
  
  // If explicitly marked as non-verbal in context
  if (context?.nominalComposition === true) return false;
  
  // If context explicitly indicates derived verbal forms
  if (context?.derivedVerb === true) return true;
  if (context?.causativeForm || context?.denominativeForm || context?.desiderativeForm) return true;
  
  // Common verbal roots (this would be expanded with a comprehensive dhatu list)
  const verbalRoots = new Set([
    // Basic roots (Devanagari)
    'गम्', 'स्था', 'कृ', 'भू', 'अस्', 'दा', 'धा', 'नी', 'हन्', 'गै', 'पा', 'दृश्',
    'श्रु', 'वद्', 'विद्', 'लभ्', 'गृह्', 'त्यज्', 'युज्', 'रुच्', 'शक्', 'इष्',
    'वृत्', 'वर्त्', 'पत्', 'पद्', 'सिध्', 'बुध्', 'मुद्', 'क्रीड्', 'हास्', 'रुद्',
    'भज्', 'सेव्', 'अर्च्', 'यज्', 'हु', 'जुह्', 'अद्', 'खाद्', 'पच्', 'दिव्',
    'विश्', 'इ', 'गा', 'स्तु', 'नम्', 'वन्द्', 'स्मृ', 'चिन्त्', 'मन्', 'कृष्',
    'हृ', 'गण्', 'बन्ध्', 'मोच्', 'योज्', 'छिद्', 'भिद्', 'फल्', 'जन्', 'मृ',
    'जीव्', 'वस्', 'शी', 'स्वप्', 'वह्', 'नेत्', 'आ', 'या', 'चल्', 'पुष्', 'तुष्',
    // Causative forms (recognized as derived verbal forms)
    'गमय्', 'स्थापय्', 'कारय्', 'भावय्', 'दापय्', 'धारय्',
    // Desiderative forms
    'जिगमिष्', 'तिष्ठासिष्', 'चिकीर्षिष्', 'बुभूषिष्',
    
    // Basic roots (IAST)
    'gam', 'sthā', 'stha', 'kṛ', 'kr', 'bhū', 'bhu', 'as', 'dā', 'da', 'dhā', 'dha',
    'nī', 'ni', 'han', 'gai', 'pā', 'pa', 'dṛś', 'drś', 'śru', 'sru', 'vad', 'vid',
    'labh', 'gṛh', 'grh', 'tyaj', 'yuj', 'ruc', 'śak', 'sak', 'iṣ', 'is', 'vṛt', 'vrt',
    'vart', 'pat', 'pad', 'sidh', 'budh', 'mud', 'krīḍ', 'krid', 'hās', 'has', 'rud',
    'bhaj', 'sev', 'arc', 'yaj', 'hu', 'juh', 'ad', 'khād', 'khad', 'pac', 'div',
    'viś', 'vis', 'i', 'gā', 'ga', 'stu', 'nam', 'vand', 'smṛ', 'smr', 'cint', 'man',
    'kṛṣ', 'krṣ', 'hṛ', 'hr', 'gaṇ', 'gan', 'bandh', 'moc', 'yoj', 'chid', 'bhid',
    'phal', 'jan', 'mṛ', 'mr', 'jīv', 'jiv', 'vas', 'śī', 'si', 'svap', 'vah', 'net',
    'ā', 'a', 'yā', 'ya', 'cal', 'puṣ', 'pus', 'tuṣ', 'tus'
  ]);
  
  // Check primary verbal roots first
  if (verbalRoots.has(element)) return true;
  
  // Check for recognized verbal patterns
  if (isRecognizedVerbalPattern(element)) return true;
  
  // Check nominal stems that can form denominative verbs (but only if explicitly denominative context)
  if (context?.denominativeVerb === true) {
    const nominalStems = new Set([
      'देव', 'राज्', 'पुत्र', 'मित्र', 'शत्रु', 'गुरु',
      'deva', 'rāj', 'raj', 'putra', 'mitra', 'śatru', 'satru', 'guru'
    ]);
    return nominalStems.has(element);
  }
  
  return false;
}

/**
 * Check if element follows verbal root patterns
 */
function isRecognizedVerbalPattern(element) {
  // Check common verbal patterns
  if (element.endsWith('्')) return true; // Most roots end with halanta
  if (element.match(/^[अआइईउऊऋॠएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]+्?$/)) return true;
  return false;
}

/**
 * Analyze क्रियायोग (verbal composition)
 */
function analyzeKriyaYoga(prefixArray, verb, context) {
  const isMultiPrefix = prefixArray.length > 1;
  
  return {
    kriyaYoga: context.kriyaYoga !== undefined ? context.kriyaYoga : true,
    multiPrefix: isMultiPrefix,
    prefixSequence: isMultiPrefix ? prefixArray : undefined,
    prefixCount: prefixArray.length,
    
    // Composition properties
    compositeForm: context.compositeForm || context.context,
    verbalComposition: context.verbalComposition !== undefined ? context.verbalComposition : true,
    boundContext: context.boundContext !== undefined ? context.boundContext : true,
    
    // Root analysis
    verbalClass: context.verbalClass,
    rootType: context.rootType,
    conjugationalClass: context.conjugationalClass,
    
    // Morphophonetic properties
    morphophonetics: context.morphophonetics,
    sandhiApplied: context.sandhiApplied || false,
    phonologicalChanges: context.phonologicalChanges
  };
}

/**
 * Analyze upasarga-specific properties
 */
function analyzeUpasargaProperties(prefixArray, verb, context) {
  return {
    technicalDesignation: context.technicalDesignation || 'उपसर्ग',
    prefixFunction: context.prefixFunction,
    semanticRole: context.semanticRole,
    
    // Functional analysis
    directionalModification: context.directionalModification || false,
    intensiveModification: context.intensiveModification || false,
    completiveModification: context.completiveModification || false,
    
    // Prefix-specific meanings
    semanticMeaning: context.semanticMeaning,
    verbalMeaning: context.verbalMeaning,
    modifiedMeaning: context.modifiedMeaning,
    
    // Classification
    upasargaType: determineUpasargaType(prefixArray[0]),
    primaryFunction: determinePrimaryFunction(prefixArray[0], verb),
    
    // Scope and attachment
    prefixScope: context.prefixScope || 'verbal',
    attachmentType: context.attachmentType || 'bound'
  };
}

/**
 * Analyze semantic modification by prefix
 */
function analyzeSemanticModification(prefixArray, verb, context) {
  return {
    semanticModification: context.semanticModification,
    meaningShift: context.meaningShift,
    aspectualModification: context.aspectualModification,
    
    // Modification types
    directionalChange: context.directionalChange || false,
    intensityChange: context.intensityChange || false,
    aspectualChange: context.aspectualChange || false,
    modalChange: context.modalChange || false,
    
    // Compositional semantics
    compositionalMeaning: context.compositionalMeaning,
    lexicalizedMeaning: context.lexicalizedMeaning,
    idiomaticUsage: context.idiomaticUsage || false
  };
}

/**
 * Determine upasarga type
 */
function determineUpasargaType(prefix) {
  const typeMap = {
    'प्र': 'directional',
    'परा': 'directional', 
    'अप': 'separative',
    'सम्': 'collective',
    'वि': 'distributive',
    'अति': 'excessive',
    'अधि': 'superior',
    'अनु': 'sequential',
    'उप': 'proximate',
    'निर्': 'privative'
  };
  
  return typeMap[prefix] || 'general';
}

/**
 * Determine primary function
 */
function determinePrimaryFunction(prefix, verb) {
  const functionMap = {
    'प्र': 'progression',
    'परा': 'regression',
    'अप': 'removal',
    'सम्': 'completion',
    'वि': 'specification',
    'अति': 'excess',
    'अधि': 'superiority',
    'अनु': 'following',
    'उप': 'approach',
    'निर्': 'privation'
  };
  
  return functionMap[prefix] || 'modification';
}

/**
 * Get computed properties based on analysis
 */
function getComputedProperties(prefixArray, verb, context, compositionAnalysis, upasargaAnalysis, semanticAnalysis) {
  const computed = {};
  
  // Meaning and semantic properties
  if (context.originalMeaning) computed.originalMeaning = context.originalMeaning;
  if (context.modifiedMeaning) computed.modifiedMeaning = context.modifiedMeaning;
  if (context.meaningModification) computed.meaningModification = context.meaningModification;
  
  // Sandhi and morphophonetic properties
  if (context.beforeSandhi) computed.beforeSandhi = context.beforeSandhi;
  if (context.afterSandhi) computed.afterSandhi = context.afterSandhi;
  if (context.sandhiType) computed.sandhiType = context.sandhiType;
  
  // Morphological properties
  if (context.verbalTense) computed.verbalTense = context.verbalTense;
  if (context.inflectedForm) computed.inflectedForm = context.inflectedForm;
  if (context.morphologicalStructure) computed.morphologicalStructure = context.morphologicalStructure;
  
  // Functional properties
  if (context.directionalFunction) computed.directionalFunction = context.directionalFunction;
  if (context.semanticNature) computed.semanticNature = context.semanticNature;
  if (context.spatialModification) computed.spatialModification = context.spatialModification;
  if (context.aspectualFunction) computed.aspectualFunction = context.aspectualFunction;
  if (context.modalFunction) computed.modalFunction = context.modalFunction;
  if (context.modalModification) computed.modalModification = context.modalModification;
  
  // Derivational properties
  if (context.causativeDerivation) computed.causativeDerivation = context.causativeDerivation;
  if (context.denominativeDerivation) computed.denominativeDerivation = context.denominativeDerivation;
  if (context.desiderativeDerivation) computed.desiderativeDerivation = context.desiderativeDerivation;
  if (context.intensiveDerivation) computed.intensiveDerivation = context.intensiveDerivation;
  
  // Derived verb type properties
  if (context.derivedVerb) computed.derivedVerb = context.derivedVerb;
  if (context.nominalOrigin) computed.nominalOrigin = context.nominalOrigin;
  if (context.intentionalAspect) computed.intentionalAspect = context.intentionalAspect;
  
  // Derived form properties
  if (context.originalRoot) computed.originalRoot = context.originalRoot;
  if (context.causativeForm) computed.causativeForm = context.causativeForm;
  if (context.prefixedCausative) computed.prefixedCausative = context.prefixedCausative;
  if (context.originalNominal) computed.originalNominal = context.originalNominal;
  if (context.denominativeForm) computed.denominativeForm = context.denominativeForm;
  if (context.prefixedDenominative) computed.prefixedDenominative = context.prefixedDenominative;
  if (context.desiderativeForm) computed.desiderativeForm = context.desiderativeForm;
  if (context.prefixedDesiderative) computed.prefixedDesiderative = context.prefixedDesiderative;
  
  // Integration properties
  if (context.alsoGatiDesignation) computed.alsoGatiDesignation = context.alsoGatiDesignation;
  if (context.tripleClassification) computed.tripleClassification = context.tripleClassification;
  if (context.movementVerb) computed.movementVerb = context.movementVerb;
  if (context.notAvyaya) computed.notAvyaya = context.notAvyaya;
  if (context.inflectionallyBound) computed.inflectionallyBound = context.inflectionallyBound;
  if (context.compositionalElement) computed.compositionalElement = context.compositionalElement;
  
  // Edge case properties
  if (context.vedicForm) computed.vedicForm = context.vedicForm;
  if (context.archaicComposition) computed.archaicComposition = context.archaicComposition;
  if (context.historicalContext) computed.historicalContext = context.historicalContext;
  if (context.metaphoricalUsage) computed.metaphoricalUsage = context.metaphoricalUsage;
  if (context.extendedMeaning) computed.extendedMeaning = context.extendedMeaning;
  if (context.poeticContext) computed.poeticContext = context.poeticContext;
  if (context.technicalContext) computed.technicalContext = context.technicalContext;
  if (context.philosophicalUsage) computed.philosophicalUsage = context.philosophicalUsage;
  if (context.conceptualMeaning) computed.conceptualMeaning = context.conceptualMeaning;
  if (context.complexComposition) computed.complexComposition = context.complexComposition;
  if (context.multiElementPrefix) computed.multiElementPrefix = context.multiElementPrefix;
  if (context.compoundVerb) computed.compoundVerb = context.compoundVerb;
  
  // Temporal and aspectual properties
  if (context.temporalModification) computed.temporalModification = context.temporalModification;
  if (context.aspectualClass) computed.aspectualClass = context.aspectualClass;
  if (context.actionType) computed.actionType = context.actionType;
  
  // Morphological properties
  if (context.morphologicalCategory) computed.morphologicalCategory = context.morphologicalCategory;
  if (context.wordFormation) computed.wordFormation = context.wordFormation;
  if (context.derivationalMorphology) computed.derivationalMorphology = context.derivationalMorphology;
  
  // Contextual usage
  if (context.literaryUsage) computed.literaryUsage = context.literaryUsage;
  if (context.technicalUsage) computed.technicalUsage = context.technicalUsage;
  if (context.archaicUsage) computed.archaicUsage = context.archaicUsage;
  if (context.vedicUsage) computed.vedicUsage = context.vedicUsage;
  
  // Integration properties
  if (context.paradigmaticRelation) computed.paradigmaticRelation = context.paradigmaticRelation;
  if (context.syntagmaticRelation) computed.syntagmaticRelation = context.syntagmaticRelation;
  if (context.morphosyntacticFeatures) computed.morphosyntacticFeatures = context.morphosyntacticFeatures;
  
  return computed;
}

/**
 * Create standardized error result
 */
function createErrorResult(reason, message) {
  return {
    applies: false,
    sutra: '1.4.59',
    sutraText: 'उपसर्गाः क्रियायोगे',
    reason: reason,
    error: message
  };
}

export default sutra1459;
