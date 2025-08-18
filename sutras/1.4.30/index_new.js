/**
 * Sutra 1.4.30: जनिकर्तुः प्रकृतिः
 * "The source/origin of birth or generation takes अपादान (ablative case)"
 * 
 * This sutra establishes that when verbs of birth, generation, or origination are used,
 * the source from which something is born or originates is designated as अपादान कारक.
 * The entity being born/created takes कर्म कारक (accusative case).
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Birth/generation verbs that take अपादान for source
const GENERATION_VERBS_DEVA = ['जायते', 'उत्पद्यते', 'निर्गच्छति', 'जनयति', 'उत्पादयति', 'प्रसूते', 'सृजति', 'निष्पादयति'];
const GENERATION_VERBS_IAST = ['jāyate', 'utpadyate', 'nirgacchati', 'janayati', 'utpādayati', 'prasūte', 'sṛjati', 'niṣpādayati'];

/**
 * Main function implementing Sutra 1.4.30
 * @param {string} word - The word being analyzed for कारक designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Detailed analysis result with कारक designation
 */
export function sutra1430(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.30',
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
    generation_type = null,
    birth_source = null,
    created_entity = null,
    origin = null,
    case: grammaticalCase = null,
    validate_case = false
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.30',
    sutraText: 'जनिकर्तुः प्रकृतिः',
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
      generationType: generation_type,
      birthSource: birth_source,
      createdEntity: created_entity,
      origin: origin,
      semanticRole: element_role
    },
    
    // Syntactic Properties
    syntactic: {
      verbCompatibility: false,
      generationContext: false,
      roleAlignment: false
    },
    
    // Context Validation
    contextValidation: {
      hasGenerationVerb: false,
      hasGenerationContext: false,
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

  // Step 2: Check for generation/birth verbs
  const hasGenerationVerb = verb && (
    GENERATION_VERBS_DEVA.includes(verb) || 
    GENERATION_VERBS_IAST.includes(verb)
  );
  
  // Step 3: Check for generation action type
  const generationActionTypes = ['birth', 'generation', 'origination', 'creation', 'production'];
  const hasGenerationActionType = action_type && generationActionTypes.includes(action_type);
  
  // Step 4: Check for natural generation type
  const isNaturalGeneration = generation_type === 'natural';
  
  // Update context validation
  analysis.contextValidation.hasGenerationVerb = hasGenerationVerb;
  analysis.contextValidation.hasGenerationContext = hasGenerationActionType || isNaturalGeneration;
  analysis.syntactic.verbCompatibility = hasGenerationVerb;
  analysis.syntactic.generationContext = hasGenerationVerb || hasGenerationActionType || isNaturalGeneration;

  // Step 5: Determine role - could be source (अपादान) or created entity (कर्म)
  if ((hasGenerationVerb || hasGenerationActionType || isNaturalGeneration)) {
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
    const isCreatedEntity = element_role === 'created_entity' || element_role === 'offspring' || 
                           created_entity || accusativeMarkers.length > 0;
    const isSource = element_role === 'source' || element_role === 'birth_source' || element_role === 'origin' ||
                    birth_source || origin || ablativeMarkers.length > 0;
    
    if (isCreatedEntity && !isSource) {
      // Entity being created - takes कर्म कारक
      analysis.applies = true;
      analysis.karaka = 'कर्म';
      analysis.case = 'accusative';
      analysis.morphological.expectedCase = 'accusative';
      analysis.morphological.caseMarkers = accusativeMarkers;
      analysis.semantic.semanticRole = 'created_entity';
    } else if (isSource || (!isCreatedEntity && !element_role)) {
      // Source of birth/generation - takes अपादान कारक
      analysis.applies = true;
      analysis.karaka = 'अपादान';
      analysis.case = 'ablative';
      analysis.morphological.expectedCase = 'ablative';
      analysis.morphological.caseMarkers = ablativeMarkers;
      analysis.semantic.semanticRole = 'birth_source';
    }
    
    if (analysis.applies) {
      analysis.semantic.actionType = action_type || 'generation';
      analysis.syntactic.roleAlignment = true;
      
      // Build confidence and reasons
      let confidence = 0.7; // Base confidence for generation context
      const reasons = [];
      
      if (hasGenerationVerb) {
        confidence += 0.2;
        reasons.push('generation_verb_present');
        analysis.semantic.generationType = 'explicit_verb';
      }
      
      if (hasGenerationActionType) {
        confidence += 0.15;
        reasons.push('generation_action_type');
      }
      
      if (isNaturalGeneration) {
        confidence += 0.1;
        reasons.push('natural_generation_context');
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
export function identifyBirthSourceAblative(word, context = {}) {
  const result = sutra1430(word, context);
  return {
    applies: result.applies,
    karaka: result.karaka,
    case_required: result.case,
    sutra: result.sutra,
    script: result.script,
    word_iast: result.normalizedWord,
    case_valid: result.morphological.validation?.isValid,
    error: result.error
  };
}

export default sutra1430;
