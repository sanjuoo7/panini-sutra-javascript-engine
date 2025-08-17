/**
 * निपात (Nipāta) Particle Classification Utility
 * 
 * Handles particle identification, semantic analysis, and classification
 * Used by sutras 1.4.56-1.4.60 for निपात, उपसर्ग, and गति designations
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';
import { isKnownDhatu } from './dhatu-classification.js';

/**
 * Analyzes particle vs substance distinction (असत्त्व criterion)
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeAsattva(word, context = {}) {
  const analysis = {
    word: word,
    script: detectScript(word),
    asattva: false, // does not signify substance
    signifiesSubstance: false,
    confidence: 0,
    reasons: [],
    semanticType: null
  };

  // Check explicit semantic context
  if (context.signifiesSubstance === true) {
    analysis.signifiesSubstance = true;
    analysis.asattva = false;
    analysis.confidence = 0.9;
    analysis.reasons.push('explicit_substance_context');
    return analysis;
  }

  if (context.signifiesSubstance === false || context.asattva === true) {
    analysis.asattva = true;
    analysis.signifiesSubstance = false;
    analysis.confidence = 0.9;
    analysis.reasons.push('explicit_non_substance_context');
    return analysis;
  }

  // Check functional usage patterns
  const functionalIndicators = [
    'conjunction', 'disjunction', 'emphasis', 'negation', 
    'interrogation', 'exclamation', 'direction', 'intensity'
  ];

  if (context.function && functionalIndicators.includes(context.function)) {
    analysis.asattva = true;
    analysis.semanticType = context.function;
    analysis.confidence += 0.4;
    analysis.reasons.push('functional_particle_usage');
  }

  // Check referential usage (indicates substance)
  if (context.referential === true || context.metalinguistic === true) {
    analysis.signifiesSubstance = true;
    analysis.asattva = false;
    analysis.confidence += 0.5;
    analysis.reasons.push('referential_metalinguistic_usage');
  }

  // Default confidence adjustment
  if (analysis.confidence === 0) {
    // Default to particle interpretation unless strong substance indicators
    analysis.asattva = true;
    analysis.confidence = 0.3;
    analysis.reasons.push('default_particle_interpretation');
  }

  return analysis;
}

/**
 * Analyzes च-series particles for निपात classification
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeChaSeriesParticle(word, context = {}) {
  const script = detectScript(word);
  const chaSeries = script === 'Devanagari' 
    ? ['च', 'वा', 'हि', 'अथ', 'किन्तु', 'परन्तु', 'यदि', 'चेत्']
    : ['ca', 'vā', 'hi', 'atha', 'kintu', 'parantu', 'yadi', 'cet'];

  const analysis = {
    word: word,
    script: script,
    isChaSeriesParticle: false,
    particleType: null,
    function: null,
    applies: false,
    confidence: 0,
    reasons: []
  };

  // Check if word is in च-series
  const normalizedWord = word.toLowerCase();
  const matchingParticle = chaSeries.find(particle => 
    normalizedWord === particle.toLowerCase() ||
    normalizedWord.startsWith(particle.toLowerCase())
  );

  if (matchingParticle) {
    analysis.isChaSeriesParticle = true;
    analysis.confidence += 0.5;
    analysis.reasons.push('cha_series_identification');

    // Determine particle function
    const particleFunctions = {
      'च': 'conjunction',
      'ca': 'conjunction',
      'वा': 'disjunction', 
      'vā': 'disjunction',
      'हि': 'emphasis',
      'hi': 'emphasis',
      'अथ': 'sequence',
      'atha': 'sequence',
      'किन्तु': 'contrast',
      'kintu': 'contrast',
      'परन्तु': 'contrast',
      'parantu': 'contrast',
      'यदि': 'condition',
      'yadi': 'condition',
      'चेत्': 'condition',
      'cet': 'condition'
    };

    analysis.function = particleFunctions[matchingParticle] || 'general_particle';
    analysis.particleType = 'cha_series';
  }

  // Check असत्त्व criterion
  const asattvaAnalysis = analyzeAsattva(word, context);
  if (asattvaAnalysis.asattva && analysis.isChaSeriesParticle) {
    analysis.applies = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('asattva_criterion_met');
  }

  return analysis;
}

/**
 * Analyzes प्र-series particles for निपात classification  
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzePraSeriesParticle(word, context = {}) {
  const script = detectScript(word);
  const praSeries = script === 'Devanagari'
    ? ['प्र', 'परा', 'अप', 'सम्', 'वि', 'अति', 'अधि', 'अनु', 'उप', 'निर्']
    : ['pra', 'parā', 'apa', 'sam', 'vi', 'ati', 'adhi', 'anu', 'upa', 'nir'];

  const analysis = {
    word: word,
    script: script,
    isPraSeriesElement: false,
    elementType: null,
    independentUsage: false,
    boundUsage: false,
    applies: false,
    confidence: 0,
    reasons: []
  };

  // Check if word is in प्र-series
  const normalizedWord = word.toLowerCase();
  const matchingElement = praSeries.find(element => 
    normalizedWord === element.toLowerCase() ||
    normalizedWord.startsWith(element.toLowerCase())
  );

  if (matchingElement) {
    analysis.isPraSeriesElement = true;
    analysis.elementType = matchingElement;
    analysis.confidence += 0.4;
    analysis.reasons.push('pra_series_identification');
  }

  // Check independence vs bound usage
  if (context.independentUsage === true) {
    analysis.independentUsage = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('independent_usage_confirmed');
  }

  if (context.boundToVerb === true || context.kriyaYoga === true) {
    analysis.boundUsage = true;
    analysis.confidence -= 0.2; // Less likely to be निपात when bound
    analysis.reasons.push('bound_to_verb');
  }

  // Check असत्त्व criterion for independent usage
  if (analysis.independentUsage) {
    const asattvaAnalysis = analyzeAsattva(word, context);
    if (asattvaAnalysis.asattva && analysis.isPraSeriesElement) {
      analysis.applies = true;
      analysis.confidence += 0.4;
      analysis.reasons.push('independent_asattva_criterion_met');
    }
  }

  return analysis;
}

/**
 * Analyzes prefix-verb combinations for उपसर्ग classification
 * @param {string} prefix - Prefix to analyze
 * @param {string} verb - Verbal root
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeUpasargaClassification(prefix, verb, context = {}) {
  const analysis = {
    prefix: prefix,
    verb: verb,
    script: detectScript(prefix),
    kriyaYoga: false,
    isUpasarga: false,
    composition: null,
    semanticModification: null,
    applies: false,
    confidence: 0,
    reasons: []
  };

  // Validate inputs
  if (!prefix || !verb) {
    analysis.error = 'missing_prefix_or_verb';
    return analysis;
  }

  // Check for क्रियायोग (verbal composition)
  if (context.kriyaYoga === true || context.boundToVerb === true) {
    analysis.kriyaYoga = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('kriya_yoga_confirmed');
  }

  // Check if verb is a known धातु
  if (isKnownDhatu(verb)) {
    analysis.confidence += 0.3;
    analysis.reasons.push('known_dhatu_identified');
  }

  // Check for compositional form
  if (context.composition || context.compositeForm) {
    analysis.composition = context.composition || context.compositeForm;
    analysis.confidence += 0.2;
    analysis.reasons.push('composite_form_provided');
  }

  // Check semantic modification
  if (context.semanticModification || context.meaningModification) {
    analysis.semanticModification = context.semanticModification || context.meaningModification;
    analysis.confidence += 0.2;
    analysis.reasons.push('semantic_modification_detected');
  }

  // Determine उपसर्ग classification
  if (analysis.kriyaYoga && analysis.confidence > 0.5) {
    analysis.isUpasarga = true;
    analysis.applies = true;
    analysis.reasons.push('upasarga_criteria_met');
  }

  return analysis;
}

/**
 * Analyzes motion verb contexts for गति classification
 * @param {string} prefix - Prefix to analyze
 * @param {string} verb - Verbal root  
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeGatiClassification(prefix, verb, context = {}) {
  const analysis = {
    prefix: prefix,
    verb: verb,
    script: detectScript(prefix),
    isMotionVerb: false,
    isGati: false,
    motionType: null,
    spatialSemantics: null,
    applies: false,
    confidence: 0,
    reasons: []
  };

  // Define motion verbs
  const motionVerbs = {
    devanagari: ['गम्', 'या', 'पत्', 'प्लु', 'सृप्', 'धाव्', 'चल्', 'क्रम्', 'भ्रम्'],
    iast: ['gam', 'yā', 'pat', 'plu', 'sṛp', 'dhāv', 'cal', 'kram', 'bhram']
  };

  const script = detectScript(verb);
  const motionList = script === 'Devanagari' ? motionVerbs.devanagari : motionVerbs.iast;

  // Check if verb is a motion verb
  const normalizedVerb = verb.toLowerCase();
  const isMotion = motionList.some(motionVerb => 
    normalizedVerb === motionVerb.toLowerCase() ||
    normalizedVerb.startsWith(motionVerb.toLowerCase())
  );

  if (isMotion || context.motionVerb === true) {
    analysis.isMotionVerb = true;
    analysis.confidence += 0.5;
    analysis.reasons.push('motion_verb_identified');
  }

  // Check motion type
  if (context.motionType) {
    analysis.motionType = context.motionType;
    analysis.confidence += 0.2;
    analysis.reasons.push('motion_type_specified');
  }

  // Check spatial semantics
  if (context.spatialSemantics || context.directionalSense) {
    analysis.spatialSemantics = context.spatialSemantics || context.directionalSense;
    analysis.confidence += 0.2;
    analysis.reasons.push('spatial_semantics_detected');
  }

  // Check for क्रियायोग requirement
  if (context.kriyaYoga === true && analysis.isMotionVerb) {
    analysis.isGati = true;
    analysis.applies = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('gati_criteria_met');
  }

  return analysis;
}

/**
 * Analyzes अधिकार scope for particle classification
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information  
 * @returns {Object} Analysis result
 */
export function analyzeAdhikaraScope(word, context = {}) {
  const analysis = {
    word: word,
    script: detectScript(word),
    withinAdhikara: false,
    sutraRange: null,
    scopeStart: '1.4.56',
    scopeEnd: '1.4.97',
    currentSutra: null,
    applies: false,
    confidence: 0,
    reasons: []
  };

  // Check if current sutra is within अधिकार range
  if (context.sutraNumber) {
    const currentSutra = context.sutraNumber;
    analysis.currentSutra = currentSutra;

    // Simple range check (assuming format X.X.XX)
    const [, , sutraNum] = currentSutra.split('.');
    const sutraNumber = parseInt(sutraNum);

    if (sutraNumber >= 56 && sutraNumber <= 97) {
      analysis.withinAdhikara = true;
      analysis.confidence += 0.5;
      analysis.reasons.push('within_adhikara_range');
    }
  }

  // Check explicit अधिकार context
  if (context.adhikaraScope === 'निपात' || context.withinAdhikara === true) {
    analysis.withinAdhikara = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('explicit_adhikara_context');
  }

  // Check sutra range specification
  if (context.sutraRange) {
    analysis.sutraRange = context.sutraRange;
    if (context.sutraRange.includes('1.4.56') && context.sutraRange.includes('1.4.97')) {
      analysis.confidence += 0.3;
      analysis.reasons.push('correct_sutra_range_specified');
    }
  }

  analysis.applies = analysis.withinAdhikara && analysis.confidence > 0.4;
  return analysis;
}

/**
 * Comprehensive निपात analysis combining all classification methods
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Complete निपात analysis
 */
export function analyzeNipataClassification(word, context = {}) {
  if (!validateSanskritWord(word)) {
    return {
      valid: false,
      error: 'invalid_sanskrit_word',
      word: word
    };
  }

  const results = {
    word: word,
    script: detectScript(word),
    classifications: {
      adhikaraScope: analyzeAdhikaraScope(word, context),
      chaSeriesParticle: analyzeChaSeriesParticle(word, context),
      praSeriesParticle: analyzePraSeriesParticle(word, context),
      asattvaAnalysis: analyzeAsattva(word, context)
    },
    applicableClassifications: [],
    primaryClassification: null,
    confidence: 0
  };

  // Collect applicable classifications
  for (const [name, analysis] of Object.entries(results.classifications)) {
    if (analysis.applies) {
      results.applicableClassifications.push({
        type: name,
        confidence: analysis.confidence,
        analysis: analysis
      });
    }
  }

  // Find primary classification
  if (results.applicableClassifications.length > 0) {
    const primary = results.applicableClassifications.reduce((prev, current) => 
      current.confidence > prev.confidence ? current : prev
    );
    results.primaryClassification = primary.type;
    results.confidence = primary.confidence;
  }

  return results;
}

export default {
  analyzeAsattva,
  analyzeChaSeriesParticle,
  analyzePraSeriesParticle,
  analyzeUpasargaClassification,
  analyzeGatiClassification,
  analyzeAdhikaraScope,
  analyzeNipataClassification
};
