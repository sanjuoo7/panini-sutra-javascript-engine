/**
 * Sutra 1.4.31: भुवः प्रभवः
 * "The source of becoming/transformation takes अपादान (ablative case)"
 * 
 * This sutra establishes that when verbs of becoming, transformation, or development are used,
 * the source from which something becomes or transforms is designated as अपादान कारक.
 * The result entity takes कर्तृ कारक (nominative case).
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Becoming/transformation verbs that take अपादान for source
const BECOMING_VERBS_DEVA = ['भवति', 'जायते', 'निर्गच्छति', 'परिणमति', 'विकसति', 'संपद्यते', 'उत्पद्यते', 'संजायते'];
const BECOMING_VERBS_IAST = ['bhavati', 'jāyate', 'nirgacchati', 'pariṇamati', 'vikasati', 'sampadyate', 'utpadyate', 'sañjāyate'];

/**
 * Main function implementing Sutra 1.4.31
 * @param {string} word - The word being analyzed for कारक designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Detailed analysis result with कारक designation
 */
export function sutra1431(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.31',
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
    transformation_source = null,
    result_entity = null,
    becoming_source = null,
    case: grammaticalCase = null,
    validate_case = false
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.31',
    sutraText: 'भुवः प्रभवः',
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
      transformationType: null,
      transformationSource: transformation_source,
      resultEntity: result_entity,
      becomingSource: becoming_source,
      semanticRole: element_role
    },
    
    // Syntactic Properties
    syntactic: {
      verbCompatibility: false,
      becomingContext: false,
      roleAlignment: false
    },
    
    // Context Validation
    contextValidation: {
      hasBecomingVerb: false,
      hasBecomingContext: false,
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

  // Step 2: Check for becoming/transformation verbs
  const hasBecomingVerb = verb && (
    BECOMING_VERBS_DEVA.includes(verb) || 
    BECOMING_VERBS_IAST.includes(verb)
  );
  
  // Step 3: Check for becoming action type
  const becomingActionTypes = ['becoming', 'transformation', 'development', 'evolving', 'changing'];
  const hasBecomingActionType = action_type && becomingActionTypes.includes(action_type);
  
  // Update context validation
  analysis.contextValidation.hasBecomingVerb = hasBecomingVerb;
  analysis.contextValidation.hasBecomingContext = hasBecomingActionType;
  analysis.syntactic.verbCompatibility = hasBecomingVerb;
  analysis.syntactic.becomingContext = hasBecomingVerb || hasBecomingActionType;

  // Step 4: Determine role - could be source (अपादान) or result entity (कर्तृ)
  if ((hasBecomingVerb || hasBecomingActionType)) {
    // Check case morphology patterns
    const nominativeMarkersDeva = ['स्', 'ः', 'म्', 'त्', 'न्'];
    const nominativeMarkersIAST = ['s', 'ḥ', 'm', 't', 'n'];
    const ablativeMarkersDeva = ['भ्यः', 'ात्', 'ोः', 'ेभ्यः', 'स्मात्', 'तः'];
    const ablativeMarkersIAST = ['bhyaḥ', 'āt', 'oḥ', 'ebhyaḥ', 'smāt', 'taḥ'];
    
    const nominativeMarkers = [...nominativeMarkersDeva.filter(m => word.endsWith(m)), 
                             ...nominativeMarkersIAST.filter(m => normalizedWord.endsWith(m))];
    const ablativeMarkers = [...ablativeMarkersDeva.filter(m => word.endsWith(m)), 
                           ...ablativeMarkersIAST.filter(m => normalizedWord.endsWith(m))];
    
    // Determine role based on context and morphology
    const isResultEntity = element_role === 'result_entity' || element_role === 'transformed_entity' || 
                          result_entity || nominativeMarkers.length > 0;
    const isSource = element_role === 'source' || element_role === 'transformation_source' || element_role === 'becoming_source' ||
                    transformation_source || becoming_source || ablativeMarkers.length > 0;
    
    if (isResultEntity && !isSource) {
      // Result entity - takes कर्तृ कारक
      analysis.applies = true;
      analysis.karaka = 'कर्तृ';
      analysis.case = 'nominative';
      analysis.morphological.expectedCase = 'nominative';
      analysis.morphological.caseMarkers = nominativeMarkers;
      analysis.semantic.semanticRole = 'result_entity';
    } else if (isSource || (!isResultEntity && !element_role)) {
      // Source of transformation - takes अपादान कारक
      analysis.applies = true;
      analysis.karaka = 'अपादान';
      analysis.case = 'ablative';
      analysis.morphological.expectedCase = 'ablative';
      analysis.morphological.caseMarkers = ablativeMarkers;
      analysis.semantic.semanticRole = 'transformation_source';
    }
    
    if (analysis.applies) {
      analysis.semantic.actionType = action_type || 'becoming';
      analysis.syntactic.roleAlignment = true;
      
      // Build confidence and reasons
      let confidence = 0.7; // Base confidence for becoming context
      const reasons = [];
      
      if (hasBecomingVerb) {
        confidence += 0.2;
        reasons.push('becoming_verb_present');
        analysis.semantic.transformationType = 'explicit_verb';
      }
      
      // Case validation if requested
      if (validate_case) {
        const expectedMarkers = analysis.case === 'nominative' ? nominativeMarkersDeva : ablativeMarkersDeva;
        const foundMarkers = analysis.morphological.caseMarkers;
        analysis.morphological.validation = {
          isValid: foundMarkers.length > 0,
          expectedMarkers: expectedMarkers,
          foundMarkers: foundMarkers,
          message: foundMarkers.length > 0 ? `correct_${analysis.case}_case` : `missing_${analysis.case}_markers`
        };
      }
      
      if (hasBecomingActionType) {
        confidence += 0.15;
        reasons.push('becoming_action_type');
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
    }
  }

  return analysis;
}

// Maintain backward compatibility
export function identifyBecomingSourceAblative(word, context = {}) {
  const result = sutra1431(word, context);
  
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

export default sutra1431;
