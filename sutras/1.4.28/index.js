/**
 * Sutra 1.4.28: अन्तर्धौ येनादर्शनमिच्छति
 * "In concealment, that from which one desires non-visibility takes अपादान (ablative case)"
 * 
 * This sutra establishes that when verbs of concealment are used, the source from which
 * something is being hidden or concealed is designated as अपादान कारक. The object being 
 * hidden takes कर्म कारक (accusative case).
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Concealment verbs that take अपादान for source
const CONCEALMENT_VERBS_DEVA = ['गुप्नाति', 'जुप्नाति', 'छुप्नाति', 'रुप्नाति', 'लुप्नाति', 'शुप्नाति', 'छादयति', 'आवृणोति'];
const CONCEALMENT_VERBS_IAST = ['gupnāti', 'jupnāti', 'chupnāti', 'rupnāti', 'lupnāti', 'śupnāti', 'chādayati', 'āvṛṇoti'];

/**
 * Main function implementing Sutra 1.4.28
 * @param {string} word - The word being analyzed for कारक designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Detailed analysis result with कारक designation
 */
export function sutra1428(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.28',
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
    concealment_source = null,
    hidden_object = null,
    object_type = null,
    case: grammaticalCase = null,
    validate_case = false
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.28',
    sutraText: 'अन्तर्धौ येनादर्शनमिच्छति',
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
      expectedCase: null,
      caseMarkers: [],
      validation: null
    },
    
    // Semantic Analysis
    semantic: {
      actionType: null,
      concealmentType: null,
      concealmentSource: concealment_source,
      hiddenObject: hidden_object,
      semanticRole: element_role
    },
    
    // Syntactic Properties
    syntactic: {
      verbCompatibility: false,
      concealmentContext: false,
      roleAlignment: false
    },
    
    // Context Validation
    contextValidation: {
      hasConcealmentVerb: false,
      hasConcealmentContext: false,
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

  // Step 2: Check for concealment verbs
  const hasConcealmentVerb = verb && (
    CONCEALMENT_VERBS_DEVA.includes(verb) || 
    CONCEALMENT_VERBS_IAST.includes(verb)
  );
  
  // Step 3: Check for concealment action type
  const concealmentActionTypes = ['concealment', 'hiding', 'covering', 'obscuring'];
  const hasConcealmentActionType = action_type && concealmentActionTypes.includes(action_type);
  
  // Update context validation
  analysis.contextValidation.hasConcealmentVerb = hasConcealmentVerb;
  analysis.contextValidation.hasConcealmentContext = hasConcealmentActionType;
  analysis.syntactic.verbCompatibility = hasConcealmentVerb;
  analysis.syntactic.concealmentContext = hasConcealmentVerb || hasConcealmentActionType;

  // Step 4: Determine role - could be source (अपादान) or object (कर्म)
  if ((hasConcealmentVerb || hasConcealmentActionType)) {
    // Check case morphology patterns
    const accusativeMarkersDeva = ['म्', 'न्', 'ाम्', 'ान्', 'ीन्'];
    const accusativeMarkersIAST = ['m', 'n', 'ām', 'ān', 'īn'];
    const ablativeMarkersDeva = ['भ्यः', 'ात्', 'ोः', 'ेभ्यः', 'स्मात्', 'तः'];
    const ablativeMarkersIAST = ['bhyaḥ', 'āt', 'oḥ', 'ebhyaḥ', 'smāt', 'taḥ'];
    
    const accusativeMarkers = [...accusativeMarkersDeva.filter(m => word.endsWith(m)), 
                             ...accusativeMarkersIAST.filter(m => normalizedWord.endsWith(m))];
    const ablativeMarkers = [...ablativeMarkersDeva.filter(m => word.endsWith(m)), 
                           ...ablativeMarkersIAST.filter(m => normalizedWord.endsWith(m))];
    
    // Determine role based on context and morphology
    const isObject = element_role === 'object' || object_type || accusativeMarkers.length > 0;
    const isSource = element_role === 'source' || element_role === 'concealment_source' || ablativeMarkers.length > 0;
    
    if (isObject && !isSource) {
      // Object being hidden - takes कर्म कारक
      analysis.applies = true;
      analysis.karaka = 'कर्म';
      analysis.case = 'accusative';
      analysis.morphological.expectedCase = 'accusative';
      analysis.morphological.caseMarkers = accusativeMarkers;
      analysis.semantic.semanticRole = 'hidden_object';
    } else if (isSource || (!isObject && !element_role)) {
      // Source from which hiding - takes अपादान कारक
      analysis.applies = true;
      analysis.karaka = 'अपादान';
      analysis.case = 'ablative';
      analysis.morphological.expectedCase = 'ablative';
      analysis.morphological.caseMarkers = ablativeMarkers;
      analysis.semantic.semanticRole = 'concealment_source';
    }
    
    if (analysis.applies) {
      analysis.semantic.actionType = action_type || 'concealment';
      analysis.syntactic.roleAlignment = true;
      
      // Build confidence and reasons
      let confidence = 0.7; // Base confidence for concealment context
      const reasons = [];
      
      if (hasConcealmentVerb) {
        confidence += 0.2;
        reasons.push('concealment_verb_present');
        analysis.semantic.concealmentType = 'explicit_verb';
      }
      
      if (hasConcealmentActionType) {
        confidence += 0.15;
        reasons.push('concealment_action_type');
      }
      
      if (analysis.morphological.caseMarkers.length > 0) {
        confidence += 0.1;
        reasons.push(`${analysis.case}_case_markers`);
      }
      
      if (element_role) {
        confidence += 0.05;
        reasons.push('explicit_role_specified');
      }
      
      analysis.confidence = Math.min(confidence, 1.0);
      analysis.reasons = reasons;
      
      // Case validation if requested
      if (validate_case) {
        const expectedMarkers = analysis.case === 'accusative' ? accusativeMarkersDeva : ablativeMarkersDeva;
        const foundMarkers = analysis.morphological.caseMarkers;
        analysis.morphological.validation = {
          isValid: foundMarkers.length > 0,
          expectedMarkers: expectedMarkers,
          foundMarkers: foundMarkers,
          message: foundMarkers.length > 0 ? `correct_${analysis.case}_case` : `missing_${analysis.case}_markers`
        };
      }
    }
  }

  return analysis;
}

// Maintain backward compatibility
export function identifyConcealmentAblative(word, context = {}) {
  const result = sutra1428(word, context);
  
  // Handle case validation explicitly
  let case_valid = undefined;
  if (context.validate_case) {
    if (result.morphological?.validation?.isValid !== undefined) {
      case_valid = result.morphological.validation.isValid;
    } else {
      // If validation wasn't set but was requested, check manually
      const caseMarkers = result.morphological?.caseMarkers || [];
      case_valid = caseMarkers.length > 0;
    }
  }
  
  return {
    applies: result.applies,
    karaka: result.karaka,
    case_required: result.case,
    sutra: result.sutra,
    script: result.script,
    word_iast: result.normalizedWord,
    case_valid: case_valid,
    error: result.error
  };
}

export default sutra1428;
