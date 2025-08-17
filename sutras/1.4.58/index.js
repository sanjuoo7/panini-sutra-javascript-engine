/**
 * Sutra 1.4.58: प्रादयः
 * 
 * This sutra defines that प्र (forth/forward) etc. are called निपात (particles) when 
 * they function independently and do not signify substances (असत्त्व). It extends the 
 * classification of निपात to include प्र-series prefixal elements in their independent usage.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.58
 * Classifies प्र-series elements as निपात when used independently and don't signify substances
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Context object with analysis parameters
 * @returns {Object} Analysis result with classification and properties
 */
export function sutra1458(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string' || word.trim() === '') {
      return createErrorResult('empty_input', 'empty_input');
    }

    // Validate Sanskrit word
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return createErrorResult('invalid_sanskrit', validation.error || 'Invalid Sanskrit word format');
    }

    // Normalize the input word
    const normalizedWord = word.trim();
    
    // Check if word is a प्र-series element
    if (!isPraSeriesElement(normalizedWord)) {
      return createErrorResult('not_pra_series_element', 'Word is not a प्र-series element');
    }

    // Check if bound to root (not independent)
    if (context.boundToRoot === true || context.independentUsage === false) {
      return createErrorResult('bound_prefix_usage', 'Element is bound to root, not used independently');
    }

    // Check if word signifies substance (असत्त्व test)
    if (context.signifiesSubstance === true || context.asattva === false) {
      return createErrorResult('signifies_substance', 'Word signifies substance, not eligible for निपात classification');
    }

    // Check if within अधिकार scope (1.4.56-1.4.97)
    const adhikaraValid = isWithinAdhikaraScope(context);

    // Analyze prefix properties
    const prefixAnalysis = analyzePrefixProperties(normalizedWord, context);

    // Verify independent usage
    const independenceAnalysis = analyzeIndependentUsage(normalizedWord, context);

    // Verify non-substantive function
    const asattvaAnalysis = analyzeAsattva(normalizedWord, context);

    // Create result object
    const result = {
      applies: true,
      sutra: '1.4.58',
      sutraText: 'प्रादयः',
      word: normalizedWord,
      classification: 'निपात',
      script: detectScript(normalizedWord),
      
      // Core properties
      asattva: asattvaAnalysis.asattva,
      signifiesSubstance: false,
      independentUsage: independenceAnalysis.independent,
      prefixalOrigin: true,
      
      // Prefix analysis
      ...prefixAnalysis,
      
      // Independence analysis
      ...independenceAnalysis,
      
      // Non-substance analysis
      ...asattvaAnalysis,
      
      // Context properties
      context: context.context || '',
      adhikaraScope: adhikaraValid ? 'निपात' : undefined,
      withinAdhikara: adhikaraValid,
      
      // Integration properties
      relatedToSutra1456: context.relatedToSutra1456 || true, // अधिकार sutra
      relatedToSutra1457: context.relatedToSutra1457 || false, // चादयोऽसत्त्वे sutra
      
      // Additional computed properties
      ...getComputedProperties(normalizedWord, context, prefixAnalysis, independenceAnalysis, asattvaAnalysis)
    };

    return result;

  } catch (error) {
    return createErrorResult('processing_error', `Error processing word: ${error.message}`);
  }
}

/**
 * Helper function to check if word is a प्र-series element
 */
function isPraSeriesElement(word) {
  const praSeriesElements = new Set([
    // Basic प्र-series (Devanagari)
    'प्र', 'परा', 'अप', 'सम्', 'वि', 'अति', 'अधि', 'अनु', 'उप', 'निर्',
    'निस्', 'दुर्', 'दुस्', 'सु', 'आ', 'उत्', 'उद्', 'अव', 'अभि', 'प्रति',
    'स्व', 'स्वा', 'सह', 'अन्तर्', // Added for modal/ritual contexts
    
    // Basic प्र-series (IAST)
    'pra', 'parā', 'para', 'apa', 'sam', 'vi', 'ati', 'adhi', 'anu', 'upa', 'nir',
    'nis', 'dur', 'dus', 'su', 'ā', 'a', 'ut', 'ud', 'ava', 'abhi', 'prati',
    'sva', 'svā', 'saha', 'antar',
    
    // Extended series (Devanagari)
    'अन्तर्', 'उपरि', 'अन्ति', 'परि', 'अभि', 'प्रति', 'अधस्',
    
    // Extended series (IAST)
    'antar', 'upari', 'anti', 'pari', 'abhi', 'prati', 'adhas',
    
    // Compound prefixal particles (Devanagari)
    'अधिप्र', 'उपसम्', 'निरप', 'अत्यति', 'अभिप्र', 'प्रत्यप',
    
    // Compound prefixal particles (IAST)
    'adhipra', 'upasam', 'nirapa', 'atyati', 'abhipra', 'pratyapa',
    
    // Alternative forms
    'प्राक्', 'परस्', 'अपर', 'समान', 'विशेष', 'अतिरिक्त'
  ]);
  
  return praSeriesElements.has(word) || 
         isCompoundPrefixalElement(word) ||
         isPrefixallyDerived(word);
}

/**
 * Check if word is a compound prefixal element
 */
function isCompoundPrefixalElement(word) {
  const commonPrefixes = ['प्र', 'परा', 'अप', 'सम्', 'वि', 'अति', 'अधि', 'अनु', 'उप', 'निर्'];
  
  for (const prefix of commonPrefixes) {
    if (word.startsWith(prefix) && word.length > prefix.length) {
      const remainder = word.substring(prefix.length);
      if (commonPrefixes.includes(remainder)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Check if word is prefixally derived
 */
function isPrefixallyDerived(word) {
  // Words that historically derive from prefixes but function as particles
  const derivedElements = ['प्राक्', 'परस्', 'अपर', 'समान', 'विशेष'];
  return derivedElements.includes(word);
}

/**
 * Check if within अधिकार scope established by 1.4.56
 */
function isWithinAdhikaraScope(context) {
  if (context.withinAdhikara !== undefined) {
    return context.withinAdhikara;
  }
  
  if (context.adhikaraScope === 'निपात') {
    return true;
  }
  
  if (context.sutraRange) {
    const match = context.sutraRange.match(/1\.4\.(\d+)-1\.4\.(\d+)/);
    if (match) {
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      return start <= 58 && 58 <= end;
    }
  }
  
  // Default: assume within अधिकार scope
  return true;
}

/**
 * Analyze prefix properties and meanings
 */
function analyzePrefixProperties(word, context) {
  const prefixMeanings = {
    'प्र': { meaning: 'forth/forward', direction: 'forward', type: 'directional' },
    'परा': { meaning: 'away/back', direction: 'backward', type: 'directional' },
    'अप': { meaning: 'away/off', direction: 'removal', type: 'separative' },
    'सम्': { meaning: 'together/with', direction: 'convergence', type: 'collective' },
    'वि': { meaning: 'apart/separate', direction: 'divergence', type: 'distributive' },
    'अति': { meaning: 'beyond/over', direction: 'excessive', type: 'intensifying' },
    'अधि': { meaning: 'over/above', direction: 'superior', type: 'positional' },
    'अनु': { meaning: 'after/along', direction: 'sequential', type: 'temporal' },
    'उप': { meaning: 'near/under', direction: 'proximate', type: 'relational' },
    'निर्': { meaning: 'out/without', direction: 'privative', type: 'negative' }
  };
  
  const defaultPrefix = prefixMeanings[word] || { 
    meaning: context.prefixMeaning || 'prefix_particle', 
    direction: context.directionalSense || 'neutral',
    type: 'general'
  };
  
  return {
    prefixMeaning: context.prefixMeaning || defaultPrefix.meaning,
    directionalSense: context.directionalSense || defaultPrefix.direction,
    prefixType: context.prefixType || defaultPrefix.type,
    
    // Functional properties
    directionalFunction: context.directionalFunction,
    intensityType: context.intensityType,
    scopeType: context.scopeType,
    modalType: context.modalType,
    
    // Semantic properties
    semanticNature: context.semanticNature,
    spatialParticle: context.spatialParticle || (defaultPrefix.type === 'directional'),
    intensifyingParticle: context.intensifyingParticle || (defaultPrefix.type === 'intensifying'),
    relationalParticle: context.relationalParticle || (defaultPrefix.type === 'relational'),
    modalParticle: context.modalParticle || false,
    
    // Series properties
    extendedSeries: context.extendedSeries || false,
    compoundPrefix: context.compoundPrefix || isCompoundPrefixalElement(word),
    components: context.components || (isCompoundPrefixalElement(word) ? decomposePrefix(word) : [word])
  };
}

/**
 * Analyze independent usage properties
 */
function analyzeIndependentUsage(word, context) {
  return {
    independent: context.independentUsage !== undefined ? context.independentUsage : true,
    boundToRoot: context.boundToRoot || false,
    independentFunction: context.independentFunction !== undefined ? context.independentFunction : true,
    standaloneUsage: context.standaloneUsage || false,
    
    // Independence types
    independenceType: context.independenceType || 'semantic',
    contextuallyIndependent: context.contextuallyIndependent || false,
    
    // Usage analysis
    usageType: context.usageType || 'particle',
    semanticFunction: context.semanticFunction,
    functionalShift: context.semanticShift === 'prefix_to_particle'
  };
}

/**
 * Analyze असत्त्व (non-substance) properties
 */
function analyzeAsattva(word, context) {
  return {
    asattva: context.asattva !== undefined ? context.asattva : true,
    signifiesSubstance: context.signifiesSubstance || false,
    
    // Functional vs referential
    functionalUsage: context.functionalUsage !== undefined ? context.functionalUsage : true,
    referentialUsage: context.referentialUsage || false,
    
    // Prefix-specific analysis
    prefixalUsage: context.prefixalUsage || false,
    particleUsage: context.particleUsage !== undefined ? context.particleUsage : true
  };
}

/**
 * Decompose compound prefix
 */
function decomposePrefix(word) {
  const commonPrefixes = ['प्र', 'परा', 'अप', 'सम्', 'वि', 'अति', 'अधि', 'अनु', 'उप', 'निर्'];
  
  for (const prefix of commonPrefixes) {
    if (word.startsWith(prefix) && word.length > prefix.length) {
      const remainder = word.substring(prefix.length);
      if (commonPrefixes.includes(remainder)) {
        return [prefix, remainder];
      }
    }
  }
  
  return [word];
}

/**
 * Get computed properties based on analysis
 */
function getComputedProperties(word, context, prefixAnalysis, independenceAnalysis, asattvaAnalysis) {
  const computed = {};
  
  // Usage patterns
  if (context.usagePattern) computed.usagePattern = context.usagePattern;
  if (context.functionalElements) computed.functionalElements = context.functionalElements;
  
  // Semantic shifts
  if (context.semanticShift) computed.semanticShift = context.semanticShift;
  if (context.prefixalOrigin) computed.prefixalOrigin = context.prefixalOrigin;
  
  // Discourse and pragmatic properties
  if (context.discourseFunction) computed.discourseFunction = context.discourseFunction;
  if (context.pragmaticRole) computed.pragmaticRole = context.pragmaticRole;
  if (context.textualFunction) computed.textualFunction = context.textualFunction;
  
  // Exclamatory properties
  if (context.exclamatoryType) computed.exclamatoryType = context.exclamatoryType;
  if (context.emotionalTone) computed.emotionalTone = context.emotionalTone;
  if (context.exclamatoryParticle) computed.exclamatoryParticle = context.exclamatoryParticle;
  
  // Ritual and ceremonial properties
  if (context.ritualFunction) computed.ritualFunction = context.ritualFunction;
  if (context.ceremonialRole) computed.ceremonialRole = context.ceremonialRole;
  if (context.sacredContext) computed.sacredContext = context.sacredContext;
  if (context.liturgicalParticle) computed.liturgicalParticle = context.liturgicalParticle;
  
  // Contextual properties
  if (context.metricalUsage) computed.metricalUsage = context.metricalUsage;
  if (context.metricalContext) computed.metricalContext = context.metricalContext;
  if (context.poeticFunction) computed.poeticFunction = context.poeticFunction;
  if (context.prosodicFunction) computed.prosodicFunction = context.prosodicFunction;
  if (context.rhythmicParticle) computed.rhythmicParticle = context.rhythmicParticle;
  if (context.rhetoricalUsage) computed.rhetoricalUsage = context.rhetoricalUsage;
  
  // Technical and philosophical context
  if (context.technicalContext) computed.technicalContext = context.technicalContext;
  if (context.philosophicalContext) computed.philosophicalContext = context.philosophicalContext;
  if (context.technicalDiscourse) computed.technicalDiscourse = context.technicalDiscourse;
  if (context.conceptualParticle) computed.conceptualParticle = context.conceptualParticle;
  if (context.grammaticalExample) computed.grammaticalExample = context.grammaticalExample;
  if (context.linguisticAnalysis) computed.linguisticAnalysis = context.linguisticAnalysis;
  
  // Historical context
  if (context.historicalEvolution) computed.historicalEvolution = context.historicalEvolution;
  if (context.diachronicChange) computed.diachronicChange = context.diachronicChange;
  if (context.etymologicalOrigin) computed.etymologicalOrigin = context.etymologicalOrigin;
  if (context.archaicForm) computed.archaicForm = context.archaicForm;
  if (context.vedicUsage) computed.vedicUsage = context.vedicUsage;
  if (context.historicalContext) computed.historicalContext = context.historicalContext;
  
  // Mantra and hymnic context
  if (context.mantricContext) computed.mantricContext = context.mantricContext;
  if (context.hymnicUsage) computed.hymnicUsage = context.hymnicUsage;
  if (context.ritualParticle) computed.ritualParticle = context.ritualParticle;
  
  // Word class distinctions
  if (context.notPrefix) computed.notPrefix = context.notPrefix;
  if (context.notAdverb) computed.notAdverb = context.notAdverb;
  if (context.notVerbalPrefix) computed.notVerbalPrefix = context.notVerbalPrefix;
  if (context.notBoundMorpheme) computed.notBoundMorpheme = context.notBoundMorpheme;
  if (context.independentParticle) computed.independentParticle = context.independentParticle;
  if (context.pureParticle) computed.pureParticle = context.pureParticle;
  
  // Classification properties
  if (context.particleClassification) computed.particleClassification = context.particleClassification;
  if (context.morphologicalStatus) computed.morphologicalStatus = context.morphologicalStatus;
  
  return computed;
}

/**
 * Create standardized error result
 */
function createErrorResult(reason, message) {
  return {
    applies: false,
    sutra: '1.4.58',
    sutraText: 'प्रादयः',
    reason: reason,
    error: message
  };
}

export default sutra1458;
