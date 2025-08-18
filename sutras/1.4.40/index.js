/**
 * Sutra 1.4.40: आधारोऽधिकरणम् — substrate/support is adhikaraṇa (locative)
 * 
 * This sutra prescribes अधिकरण (locative case) for the आधार (substrate/support/foundation)
 * upon which an action takes place or an entity exists. It establishes the fundamental
 * rule for locative case assignment in spatial and temporal contexts.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Verbs that commonly require substrate/support
const SUBSTRATE_VERBS_DEVA = ['तिष्ठति', 'वसति', 'शेते', 'स्थितः', 'आस्ते', 'निवसति'];
const SUBSTRATE_VERBS_IAST = ['tiṣṭhati', 'vasati', 'śete', 'sthitaḥ', 'āste', 'nivasati'];

// Substrate-related terms
const SUBSTRATE_TERMS_DEVA = ['आधार', 'तल', 'भूमि', 'पृष्ठ', 'उपरि', 'अधस्'];
const SUBSTRATE_TERMS_IAST = ['ādhāra', 'tala', 'bhūmi', 'pṛṣṭha', 'upari', 'adhas'];

/**
 * Sutra 1.4.40: आधारोऽधिकरणम् - Substrate/Support as Adhikarana
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {Object} context - Linguistic context
 * @returns {Object} Detailed analysis object
 */
export function sutra1440(word, context = {}) {
  const {
    verb = '',
    action_type = '',
    spatial_relationship = '',
    foundation_type = '',
    temporal_aspect = '',
    substrate = '',
    element_role = '',
    location_type = '',
    script: inputScript = null,
    validate_case = false,
    output_script = 'same'
  } = context;

  // Detect script and normalize
  const script = inputScript || detectScript(word);
  const normalizedWord = normalizeScript(word, 'deva');

  // Initialize comprehensive analysis
  const analysis = {
    sutra: '1.4.40',
    sutraText: 'आधारोऽधिकरणम्',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      isSubstrate: false,
      hasSpatialContext: false,
      hasTemporalContext: false,
      hasProperCase: false,
      providesSupport: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      requiresSubstrate: false,
      actionType: action_type,
      verbCategory: null
    },
    
    substrateAnalysis: {
      isSubstrate: false,
      substrateType: null,
      foundationType: foundation_type,
      supportFunction: null,
      relationToAction: null
    },
    
    spatialAnalysis: {
      spatialRelation: spatial_relationship,
      locationType: location_type,
      dimensionality: null,
      containment: null
    },
    
    morphologicalAnalysis: {
      caseEnding: null,
      expectedCase: 'locative',
      caseCompatible: false,
      script: script,
      normalizedForm: normalizedWord
    },
    
    semanticAnalysis: {
      role: null,
      foundationalAspect: null,
      temporalAspect: temporal_aspect,
      supportType: null
    },
    
    // Integration properties
    integration: {
      precedence: 'fundamental',
      conflictsWith: [],
      compatibleWith: ['temporal_locatives', 'spatial_locatives'],
      establishesKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: false, // आधार can exist without specific verb
      verbProvided: !!verb,
      sufficientContext: false,
      substrateClear: false
    },
    
    error: null,
    reason: null
  };

  // Validate Sanskrit input
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.reason = 'word_validation_failed';
    return analysis;
  }

  // Analyze verb for substrate requirement
  const requiresSubstrate = SUBSTRATE_VERBS_DEVA.includes(verb) || 
                           SUBSTRATE_VERBS_IAST.includes(verb) ||
                           ['standing', 'sitting', 'lying', 'residing'].includes(action_type);

  analysis.verbAnalysis.requiresSubstrate = requiresSubstrate;
  if (verb) {
    analysis.contextValidation.verbProvided = true;
    
    if (requiresSubstrate) {
      analysis.verbAnalysis.verbCategory = 'substrate_requiring';
      analysis.confidence += 0.2;
      analysis.reasons.push('substrate_requiring_verb_detected');
    }
  }

  // Analyze substrate role
  const isSubstrate = spatial_relationship === 'substrate' || 
                     foundation_type === 'spatial' ||
                     element_role === 'substrate' ||
                     substrate === word ||
                     location_type === 'support';

  analysis.conditions.isSubstrate = isSubstrate;
  analysis.substrateAnalysis.isSubstrate = isSubstrate;

  if (isSubstrate) {
    analysis.substrateAnalysis.supportFunction = 'foundational';
    analysis.substrateAnalysis.relationToAction = 'provides_substrate';
    analysis.confidence += 0.3;
    analysis.reasons.push('substrate_role_confirmed');
  }

  // Analyze spatial context
  const hasSpatialContext = spatial_relationship || location_type || foundation_type === 'spatial';
  analysis.conditions.hasSpatialContext = hasSpatialContext;

  if (hasSpatialContext) {
    analysis.spatialAnalysis.dimensionality = 'surface_contact';
    analysis.confidence += 0.1;
    analysis.reasons.push('spatial_context_detected');
    
    // Analyze specific spatial relationships
    if (spatial_relationship === 'on' || spatial_relationship === 'upon') {
      analysis.spatialAnalysis.containment = 'surface';
      analysis.substrateAnalysis.substrateType = 'surface';
    } else if (spatial_relationship === 'in' || spatial_relationship === 'within') {
      analysis.spatialAnalysis.containment = 'container';
      analysis.substrateAnalysis.substrateType = 'container';
    }
  }

  // Analyze temporal context
  const hasTemporalContext = !!temporal_aspect;
  analysis.conditions.hasTemporalContext = hasTemporalContext;

  if (hasTemporalContext) {
    analysis.confidence += 0.1;
    analysis.reasons.push('temporal_context_detected');
  }

  // Check for direct object role (would not be अधिकरण)
  if (element_role === 'object' || element_role === 'direct_object') {
    analysis.applies = false;
    analysis.reason = 'direct_object_not_adhikarana';
    return analysis;
  }

  // Analyze case compatibility
  const locativeCasePattern = /(े|स्मिन्|षु)$/;
  const hasLocativeCase = locativeCasePattern.test(word);
  analysis.conditions.hasProperCase = hasLocativeCase;
  analysis.morphologicalAnalysis.caseCompatible = hasLocativeCase;

  if (hasLocativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(locativeCasePattern)?.[0] || null;
    analysis.confidence += 0.2;
    analysis.reasons.push('locative_case_detected');
  }

  // Analyze support provision
  const providesSupport = isSubstrate || requiresSubstrate || hasSpatialContext;
  analysis.conditions.providesSupport = providesSupport;

  // Final अधिकरण determination
  if (providesSupport) {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.semanticAnalysis.role = 'substrate';
    analysis.semanticAnalysis.foundationalAspect = 'supportive';
    analysis.semanticAnalysis.supportType = 'locational';
    analysis.substrateAnalysis.substrateType = analysis.substrateAnalysis.substrateType || 'general';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.substrateClear = true;
    
    // Boost confidence for clear cases
    if (hasLocativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('adhikarana_designation_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isSubstrate && !hasSpatialContext) {
      analysis.reason = 'not_substrate_or_spatial';
    } else if (!providesSupport) {
      analysis.reason = 'does_not_provide_support';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifySubstrateAdhikarana(word, context = {}) {
  return sutra1440(word, context);
}

export default sutra1440;
