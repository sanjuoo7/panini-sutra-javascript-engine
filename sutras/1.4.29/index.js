/**
 * Sutra 1.4.29: आख्यातोपयोगे
 * "In teaching/learning contexts, the teacher/source of knowledge takes अपादान (ablative case)"
 * 
 * This sutra establishes that when verbs of teaching, learning, or instruction are used,
 * the teacher or source from whom knowledge is acquired is designated as अपादान कारक.
 * The knowledge/subject being taught takes कर्म कारक (accusative case).
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Teaching/learning verbs that take अपादान for teacher/source
const TEACHING_VERBS_DEVA = ['अध्यापयति', 'अधीते', 'उपदिशति', 'शिक्षयति', 'बोधयति', 'ग्रहति', 'पठति', 'अधिगच्छति'];
const TEACHING_VERBS_IAST = ['adhyāpayati', 'adhīte', 'upadiśati', 'śikṣayati', 'bodhayati', 'grahati', 'paṭhati', 'adhigacchati'];

/**
 * Main function implementing Sutra 1.4.29
 * @param {string} word - The word being analyzed for कारक designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Detailed analysis result with कारक designation
 */
export function sutra1429(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.29',
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
    teacher = null,
    knowledge_source = null,
    knowledge_object = null,
    subject = null,
    case: grammaticalCase = null,
    validate_case = false
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.29',
    sutraText: 'आख्यातोपयोगे',
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
      teachingType: null,
      teacher: teacher,
      knowledgeSource: knowledge_source,
      knowledgeObject: knowledge_object,
      subject: subject,
      semanticRole: element_role
    },
    
    // Syntactic Properties
    syntactic: {
      verbCompatibility: false,
      teachingContext: false,
      roleAlignment: false
    },
    
    // Context Validation
    contextValidation: {
      hasTeachingVerb: false,
      hasTeachingContext: false,
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

  // Step 2: Check for teaching/learning verbs
  const hasTeachingVerb = verb && (
    TEACHING_VERBS_DEVA.includes(verb) || 
    TEACHING_VERBS_IAST.includes(verb)
  );
  
  // Step 3: Check for teaching action type
  const teachingActionTypes = ['teaching', 'learning', 'instruction', 'studying', 'education'];
  const hasTeachingActionType = action_type && teachingActionTypes.includes(action_type);
  
  // Update context validation
  analysis.contextValidation.hasTeachingVerb = hasTeachingVerb;
  analysis.contextValidation.hasTeachingContext = hasTeachingActionType;
  analysis.syntactic.verbCompatibility = hasTeachingVerb;
  analysis.syntactic.teachingContext = hasTeachingVerb || hasTeachingActionType;

  // Step 4: Determine role - could be teacher/source (अपादान) or knowledge object (कर्म)
  if ((hasTeachingVerb || hasTeachingActionType)) {
    // Check case morphology patterns
    const accusativeMarkersDeva = ['म्', 'न्', 'ाम्', 'ान्', 'ीन्'];
    const accusativeMarkersIAST = ['m', 'n', 'ām', 'ān', 'īn'];
    const ablativeMarkersDeva = ['भ्यः', 'ात्', 'ोः', 'ेभ्यः', 'स्मात्', 'तः'];
    const ablativeMarkersIAST = ['bhyaḥ', 'āt', 'oḥ', 'ebhyaḥ', 'smāt', 'taḥ'];
    
    const accusativeMarkers = [...accusativeMarkersDeva.filter(m => word.includes(m)), 
                             ...accusativeMarkersIAST.filter(m => normalizedWord.includes(m))];
    const ablativeMarkers = [...ablativeMarkersDeva.filter(m => word.includes(m)), 
                           ...ablativeMarkersIAST.filter(m => normalizedWord.includes(m))];
    
    // Determine role based on context and morphology
    const isKnowledgeObject = element_role === 'knowledge_object' || element_role === 'subject' || 
                             knowledge_object || subject || accusativeMarkers.length > 0;
    const isTeacher = element_role === 'source' || element_role === 'teacher' || element_role === 'knowledge_source' ||
                     teacher || knowledge_source || ablativeMarkers.length > 0;
    
    if (isKnowledgeObject && !isTeacher) {
      // Knowledge/subject being taught - takes कर्म कारक
      analysis.applies = true;
      analysis.karaka = 'कर्म';
      analysis.case = 'accusative';
      analysis.morphological.expectedCase = 'accusative';
      analysis.morphological.caseMarkers = accusativeMarkers;
      analysis.semantic.semanticRole = 'knowledge_object';
    } else if (isTeacher || (!isKnowledgeObject && !element_role)) {
      // Teacher/source of knowledge - takes अपादान कारक
      analysis.applies = true;
      analysis.karaka = 'अपादान';
      analysis.case = 'ablative';
      analysis.morphological.expectedCase = 'ablative';
      analysis.morphological.caseMarkers = ablativeMarkers;
      analysis.semantic.semanticRole = 'teacher_source';
    }
    
    if (analysis.applies) {
      analysis.semantic.actionType = action_type || 'teaching';
      analysis.syntactic.roleAlignment = true;
      
      // Build confidence and reasons
      let confidence = 0.7; // Base confidence for teaching context
      const reasons = [];
      
      if (hasTeachingVerb) {
        confidence += 0.2;
        reasons.push('teaching_verb_present');
        analysis.semantic.teachingType = 'explicit_verb';
      }
      
      if (hasTeachingActionType) {
        confidence += 0.15;
        reasons.push('teaching_action_type');
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
export function identifyTeachingAblative(word, context = {}) {
  const result = sutra1429(word, context);
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

export default sutra1429;
