/**
 * Sutra 1.4.27: वारणार्थानामीप्सितः
 * "In the sense of prevention/protection, the thing from which protection is desired takes अपादान (ablative case)"
 * 
 * This sutra establishes that when verbs of prevention, protection, or blocking are used,
 * the source of threat or danger (from which protection is sought) is designated as अपादान कारक.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Prevention/protection verbs that take अपादान
const PREVENTION_VERBS_DEVA = ['निवारयति', 'रक्षति', 'वारयति', 'अवरोधयति', 'पालयति', 'त्रायते', 'गोपायति'];
const PREVENTION_VERBS_IAST = ['nivārayati', 'rakṣati', 'vārayati', 'avarodhayati', 'pālayati', 'trāyate', 'gopāyati'];

/**
 * Main function implementing Sutra 1.4.27
 * @param {string} word - The word being analyzed for अपादान designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Detailed analysis result with अपादान designation
 */
export function sutra1427(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.27',
      word: word
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  
  // Extract key context information
  const {
    verb = null,
    action_type = null,
    element_role = null,
    threat_source = null,
    protection_object = null,
    case: grammaticalCase = null,
    validate_case = false
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.27',
    sutraText: 'वारणार्थानामीप्सितः',
    applies: false,
    word: word,
    script: script,
    normalizedWord: normalizedWord,
    
    // Core Analysis
    karaka: null,
    case: null,
    confidence: 0.0,
    reasons: [],
    
    // Morphological Analysis
    morphological: {
      case: grammaticalCase,
      expectedCase: 'ablative',
      caseMarkers: [],
      validation: null
    },
    
    // Semantic Analysis
    semantic: {
      actionType: null,
      preventionType: null,
      threatSource: threat_source,
      protectionObject: protection_object,
      semanticRole: element_role
    },
    
    // Syntactic Properties
    syntactic: {
      verbCompatibility: false,
      preventionContext: false,
      roleAlignment: false
    },
    
    // Context Validation
    contextValidation: {
      hasPreventionVerb: false,
      hasPreventionContext: false,
      roleSpecified: !!element_role,
      noConflicts: true
    }
  };

  // Step 1: Validate Sanskrit word
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    analysis.error = 'invalid_sanskrit_input';
    analysis.morphological.validation = validation;
    return analysis;
  }

  // Step 2: Check for prevention/protection verbs
  const hasPreventionVerb = verb && (
    PREVENTION_VERBS_DEVA.includes(verb) || 
    PREVENTION_VERBS_IAST.includes(verb)
  );
  
  // Step 3: Check for prevention action type
  const preventionActionTypes = ['prevention', 'protection', 'blocking', 'defense', 'warding_off'];
  const hasPreventionActionType = action_type && preventionActionTypes.includes(action_type);
  
  // Update context validation
  analysis.contextValidation.hasPreventionVerb = hasPreventionVerb;
  analysis.contextValidation.hasPreventionContext = hasPreventionActionType;
  analysis.syntactic.verbCompatibility = hasPreventionVerb;
  analysis.syntactic.preventionContext = hasPreventionVerb || hasPreventionActionType;

  // Step 4: Determine if this word could be the threat source (अपादान)
  const couldBeThreatSource = !element_role || element_role === 'source' || element_role === 'threat_source';
  
  // Step 5: Check case morphology for ablative markers
  const ablativeMarkersDeva = ['भ्यः', 'ात्', 'ोः', 'ेभ्यः', 'स्मात्', 'तः'];
  const ablativeMarkersIAST = ['bhyaḥ', 'āt', 'oḥ', 'ebhyaḥ', 'smāt', 'taḥ'];
  
  const devaMarkers = ablativeMarkersDeva.filter(marker => word.includes(marker));
  const iastMarkers = ablativeMarkersIAST.filter(marker => normalizedWord.includes(marker));
  
  analysis.morphological.caseMarkers = [...devaMarkers, ...iastMarkers];
  const hasCaseMarkers = analysis.morphological.caseMarkers.length > 0;

  // Step 6: Apply sutra logic
  if ((hasPreventionVerb || hasPreventionActionType) && couldBeThreatSource) {
    analysis.applies = true;
    analysis.karaka = 'अपादान';
    analysis.case = 'ablative';
    analysis.morphological.expectedCase = 'ablative';
    analysis.semantic.actionType = action_type || 'prevention';
    analysis.semantic.semanticRole = 'threat_source';
    analysis.syntactic.roleAlignment = true;
    
    // Build confidence and reasons
    let confidence = 0.7; // Base confidence for prevention context
    const reasons = [];
    
    if (hasPreventionVerb) {
      confidence += 0.2;
      reasons.push('prevention_verb_present');
      analysis.semantic.preventionType = 'explicit_verb';
    }
    
    if (hasPreventionActionType) {
      confidence += 0.15;
      reasons.push('prevention_action_type');
    }
    
    if (hasCaseMarkers) {
      confidence += 0.1;
      reasons.push('ablative_case_markers');
    }
    
    if (threat_source) {
      confidence += 0.05;
      reasons.push('explicit_threat_source');
    }
    
    analysis.confidence = Math.min(confidence, 1.0);
    analysis.reasons = reasons;
    
    // Case validation if requested
    if (validate_case) {
      analysis.morphological.validation = {
        isValid: hasCaseMarkers,
        expectedMarkers: ablativeMarkersDeva,
        foundMarkers: devaMarkers,
        message: hasCaseMarkers ? 'correct_ablative_case' : 'missing_ablative_markers'
      };
    }
  }

  return analysis;
}

// Maintain backward compatibility
export function identifyPreventionAblative(word, context = {}) {
  const result = sutra1427(word, context);
  return {
    applies: result.applies,
    karaka: result.karaka,
    case_required: result.case,
    sutra: result.sutra,
    script: result.script,
    word_iast: result.normalizedWord,
    case_valid: result.morphological?.validation?.isValid ?? false,
    error: result.error
  };
}

export default sutra1427;
