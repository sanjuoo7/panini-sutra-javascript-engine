/**
 * Sutra 1.4.57: चादयोऽसत्त्वे
 * 
 * This sutra defines that च (and) etc. are called निपात (particles) when they do not 
 * signify substances (असत्त्व). It establishes the semantic criterion for classifying 
 * च-series words as particles based on their non-substantive function.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.57
 * Classifies च-series words as निपात when they don't signify substances
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Context object with analysis parameters
 * @returns {Object} Analysis result with classification and properties
 */
export function sutra1457(word, context = {}) {
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
    
    // Check if word is a च-series particle
    if (!isChaSeriesParticle(normalizedWord)) {
      return createErrorResult('not_cha_series_particle', 'Word is not a च-series particle');
    }

    // Check for semantic function clarity
    if (context.semanticFunction === 'unclear' || context.asattva === 'uncertain') {
      return createErrorResult('unclear_semantic_function', 'Semantic function must be clear for classification');
    }

    // Check if word signifies substance (असत्त्व test)
    if (context.signifiesSubstance === true || context.asattva === false) {
      return createErrorResult('signifies_substance', 'Word signifies substance, not eligible for निपात classification');
    }

    // Check if within अधिकार scope (1.4.56-1.4.97)
    const adhikaraValid = isWithinAdhikaraScope(context);

    // Analyze particle properties
    const particleAnalysis = analyzeParticleProperties(normalizedWord, context);

    // Verify non-substantive function
    const asattvaAnalysis = analyzeAsattva(normalizedWord, context);

    // Create result object
    const result = {
      applies: true,
      sutra: '1.4.57',
      sutraText: 'चादयोऽसत्त्वे',
      word: normalizedWord,
      classification: 'निपात',
      script: detectScript(normalizedWord),
      
      // Core properties
      asattva: asattvaAnalysis.asattva,
      signifiesSubstance: false,
      semanticFunction: particleAnalysis.semanticFunction,
      particleType: particleAnalysis.type,
      
      // Particle analysis
      ...particleAnalysis,
      
      // Non-substance analysis
      ...asattvaAnalysis,
      
      // Context properties
      context: context.context || '',
      adhikaraScope: adhikaraValid ? 'निपात' : undefined,
      withinAdhikara: adhikaraValid,
      
      // Integration properties
      relatedToSutra1456: context.relatedToSutra1456 || true, // अधिकार sutra
      relatedToSutra1458: context.relatedToSutra1458 || false, // प्रादयः sutra
      
      // Additional computed properties
      ...getComputedProperties(normalizedWord, context, particleAnalysis, asattvaAnalysis)
    };

    return result;

  } catch (error) {
    return createErrorResult('processing_error', `Error processing word: ${error.message}`);
  }
}

/**
 * Helper function to check if word is a च-series particle
 */
function isChaSeriesParticle(word) {
  const chaSeriesParticles = new Set([
    // Basic च-series (Devanagari)
    'च', 'वा', 'तु', 'किन्तु', 'परन्तु', 'अपि', 'हि', 'एव', 'खलु',
    
    // Basic च-series (IAST)
    'ca', 'vā', 'va', 'tu', 'kintu', 'parantu', 'api', 'hi', 'eva', 'khalu',
    
    // Extended च-series (Devanagari)
    'अथच', 'तथच', 'यदच', 'किमच', 'यावच', 'तावच',
    
    // Extended च-series (IAST)
    'athaca', 'tathaca', 'yadaca', 'kimaca', 'yāvaca', 'tāvaca',
    
    // Compound forms with च (Devanagari)
    'अपिच', 'एवच', 'हिच', 'तुच', 'खलुच',
    
    // Compound forms with च (IAST)
    'apica', 'evaca', 'hica', 'tuca', 'khaluca',
    
    // Alternative forms (Devanagari)
    'अथवा', 'किम्वा', 'उत', 'उतवा', 'वाथ',
    
    // Alternative forms (IAST)
    'athavā', 'kimvā', 'uta', 'utavā', 'vātha',
    
    // Emphatic/Modal particles (Devanagari)
    'नु', 'सु', 'अङ्ग', 'बत', 'अहो', 'हन्त',
    
    // Emphatic/Modal particles (IAST)
    'nu', 'su', 'aṅga', 'anga', 'bata', 'aho', 'hanta',
    
    // Additional particles mentioned in classical sources (Devanagari)
    'इति', 'चेत्', 'यदि', 'चेद्', 'पुनर्', 'भूयः',
    
    // Additional particles mentioned in classical sources (IAST)
    'iti', 'cet', 'yadi', 'ced', 'punar', 'bhūyaḥ', 'bhuyah',
    
    // Archaic and Vedic forms (Devanagari)
    'इद्', 'उ', 'षु', 'स्म', 'स्मै', 'ह', 'चाहम्',
    
    // Archaic and Vedic forms (IAST)
    'id', 'u', 'ṣu', 'su', 'sma', 'smai', 'ha', 'cāham'
  ]);
  
  // Direct lookup first
  if (chaSeriesParticles.has(word)) {
    return true;
  }
  
  // Check for compound forms ending in च/ca
  if (word.endsWith('च') || word.endsWith('ca')) {
    return true;
  }
  
  // Forms ending in वा/तु or vā/va/tu
  if (/^(.*)(वा|तु|vā|va|tu)$/.test(word)) {
    return true;
  }
  
  // Special handling for archaic compounds starting with च/ca
  if ((word.startsWith('च') || word.startsWith('ca')) && word.length > 1) {
    // Check if this could be an archaic compound with च as first element
    return true;
  }
  
  return false;
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
      return start <= 57 && 57 <= end;
    }
  }
  
  // Default: assume within अधिकार scope
  return true;
}

/**
 * Analyze particle properties and functions
 */
function analyzeParticleProperties(word, context) {
  const particleTypes = {
    'च': { type: 'conjunctive', meaning: 'and', function: 'coordination' },
    'वा': { type: 'disjunctive', meaning: 'or', function: 'alternation' },
    'तु': { type: 'adversative', meaning: 'but', function: 'contrast' },
    'किन्तु': { type: 'adversative', meaning: 'however', function: 'contrast' },
    'परन्तु': { type: 'adversative', meaning: 'nevertheless', function: 'contrast' },
    'अपि': { type: 'inclusive', meaning: 'also', function: 'inclusion' },
    'हि': { type: 'assertive', meaning: 'indeed', function: 'assertion' },
    'एव': { type: 'emphatic', meaning: 'only/indeed', function: 'emphasis' },
    'खलु': { type: 'confirmative', meaning: 'certainly', function: 'confirmation' }
  };
  
  const defaultType = particleTypes[word] || { 
    type: 'particle', 
    meaning: context.particleMeaning || 'particle', 
    function: 'connection' 
  };
  
  return {
    type: context.particleType || defaultType.type,
    particleMeaning: context.particleMeaning || defaultType.meaning,
    semanticFunction: context.semanticFunction || defaultType.function,
    
    // Functional analysis
    conjunctiveType: context.conjunctiveType,
    disjunctiveType: context.disjunctiveType,
    adversativeType: context.adversativeType,
    
    // Semantic nature
    semanticNature: context.semanticNature,
    coordinationFunction: context.coordinationFunction || (defaultType.function === 'coordination'),
    alternationFunction: context.alternationFunction || (defaultType.function === 'alternation'),
    contrastFunction: context.contrastFunction || (defaultType.function === 'contrast'),
    
    // Relational properties
    referential: context.referential || false,
    connective: context.connective !== undefined ? context.connective : true,
    modificational: context.modificational || false,
    
    // Extended properties
    extendedSeries: context.extendedSeries || false,
    compoundForm: context.compoundForm || word.length > 2,
    components: context.components || (word.length > 2 ? [word.slice(0, -1), word.slice(-1)] : [word])
  };
}

/**
 * Analyze असत्त्व (non-substance) properties
 */
function analyzeAsattva(word, context) {
  return {
    asattva: context.asattva !== undefined ? context.asattva : true,
    signifiesSubstance: context.signifiesSubstance || false,
    substantiveTest: context.substantiveTest || false,
    
    // Functional vs referential
    functionalUsage: context.functionalUsage !== undefined ? context.functionalUsage : true,
    referentialUsage: context.referentialUsage || false,
    
    // Semantic analysis
    semanticAnalysis: context.semanticAnalysis || 'functional',
    functionalRole: context.functionalRole || 'connective',
    contextualRole: context.contextualRole
  };
}

/**
 * Get computed properties based on analysis
 */
function getComputedProperties(word, context, particleAnalysis, asattvaAnalysis) {
  const computed = {};
  
  // Scope and positioning
  if (context.scopeType) computed.scopeType = context.scopeType;
  if (context.scopeLevel) computed.scopeLevel = context.scopeLevel;
  if (context.positionalTendency) computed.positionalTendency = context.positionalTendency;
  if (context.attachmentDirection) computed.attachmentDirection = context.attachmentDirection;
  if (context.attachmentType) computed.attachmentType = context.attachmentType;
  
  // Usage patterns and elements
  if (context.usagePattern) computed.usagePattern = context.usagePattern;
  if (context.contrastedElements) computed.contrastedElements = context.contrastedElements;
  if (context.coordinatedElements) computed.coordinatedElements = context.coordinatedElements;
  if (context.alternativeElements) computed.alternativeElements = context.alternativeElements;
  
  // Compound analysis
  if (context.compoundMember) computed.compoundMember = context.compoundMember;
  if (context.compoundPosition) computed.compoundPosition = context.compoundPosition;
  if (context.compoundType) computed.compoundType = context.compoundType;
  
  // Contextual properties
  if (context.metricalContext) computed.metricalContext = context.metricalContext;
  if (context.prosodyRequirement) computed.prosodyRequirement = context.prosodyRequirement;
  if (context.poeticUsage) computed.poeticUsage = context.poeticUsage;
  
  // Technical context
  if (context.technicalContext) computed.technicalContext = context.technicalContext;
  if (context.grammaticalExample) computed.grammaticalExample = context.grammaticalExample;
  if (context.metaLinguisticUsage) computed.metaLinguisticUsage = context.metaLinguisticUsage;
  
  // Historical context
  if (context.archaicForm) computed.archaicForm = context.archaicForm;
  if (context.vedicUsage) computed.vedicUsage = context.vedicUsage;
  if (context.historicalContext) computed.historicalContext = context.historicalContext;
  
  // Word class distinctions
  if (context.notNoun) computed.notNoun = context.notNoun;
  if (context.notVerb) computed.notVerb = context.notVerb;
  if (context.notAdjective) computed.notAdjective = context.notAdjective;
  if (context.pureParticle) computed.pureParticle = context.pureParticle;
  
  // Classification properties
  if (context.particleClassification) computed.particleClassification = context.particleClassification;
  
  return computed;
}

/**
 * Create standardized error result
 */
function createErrorResult(reason, message) {
  return {
    applies: false,
    sutra: '1.4.57',
    sutraText: 'चादयोऽसत्त्वे',
    reason: reason,
    error: message
  };
}

export default sutra1457;
