/**
 * Sutra 1.4.33: रुच्यर्थानां प्रीयमाणः
 * "In the sense of verbs like रुच् (to please), the one who is pleased is सम्प्रदान"
 * 
 * This sutra defines सम्प्रदान कारक for verbs expressing pleasure, liking, or satisfaction,
 * where the experiencer of the emotion gets dative case.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Verbs of pleasure and liking that take सम्प्रदान for the experiencer
const PLEASURE_VERBS_DEVA = ['रोचते','प्रीयते','हर्षयति','आह्लादयति','तुष्यति','प्रसीदति'];
const PLEASURE_VERBS_IAST = ['rocate','prīyate','harṣayati','āhlādayati','tuṣyati','prasīdati'];

/**
 * Main function implementing Sutra 1.4.33
 * @param {string} word - The word being analyzed for सम्प्रदान designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with सम्प्रदान designation details
 */
export function sutra1433(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      sutra: '1.4.33',
      word: word
    };
  }

  const script = detectScript(word);
  const normalizedWord = normalizeScript(word);
  
  // Extract key context information
  const {
    verb = null,
    action = null,
    action_type = null,
    element_role = null,
    experiencer = null,
    emotion_type = null,
    case: grammaticalCase = null
  } = context;

  // Initialize comprehensive analysis object
  const analysis = {
    sutra: '1.4.33',
    sutraText: 'रुच्यर्थानां प्रीयमाणः',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasPleasureVerb: false,
      isExperiencer: false,
      isEmotionalContext: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isPleasureVerb: false,
      actionType: action_type,
      verbCategory: null,
      emotionalValence: null
    },
    
    experiencerAnalysis: {
      isEmotionalExperiencer: false,
      experiencerType: null,
      emotionCategory: null,
      roleInEmotion: null
    },
    
    morphologicalAnalysis: {
      caseEnding: null,
      expectedCase: 'dative',
      caseCompatible: false,
      script: script,
      normalizedForm: normalizedWord
    },
    
    semanticAnalysis: {
      role: null,
      emotionalRole: null,
      pleasureType: null,
      experienceIntensity: null
    },
    
    // Integration properties
    integration: {
      precedence: 'specific',
      conflictsWith: [],
      compatibleWith: ['1.4.32', '1.4.34'],
      extendsKaraka: true,
      emotionalKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      experiencerClear: false
    },
    
    error: null,
    reason: null
  };

  // Validate Sanskrit input
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.validationError = validationResult.error;
    return analysis;
  }

  // Check for missing verb context
  if (!verb) {
    analysis.applies = false;
    analysis.error = 'missing_verb_context';
    analysis.reason = 'Pleasure verbs require verb context for proper identification';
    return analysis;
  }

  analysis.contextValidation.verbProvided = true;

  // Analyze verb for pleasure/liking action
  const isPleasureVerb = PLEASURE_VERBS_DEVA.includes(verb) || PLEASURE_VERBS_IAST.includes(verb);
  const isPleasureAction = isPleasureVerb || 
                          action_type === 'pleasure' ||
                          ['liking', 'satisfaction', 'joy', 'happiness'].includes(emotion_type);

  analysis.verbAnalysis.isPleasureVerb = isPleasureVerb;
  analysis.conditions.hasPleasureVerb = isPleasureVerb;
  analysis.conditions.isEmotionalContext = isPleasureAction;

  if (isPleasureVerb) {
    analysis.verbAnalysis.verbCategory = 'pleasure';
    analysis.verbAnalysis.emotionalValence = 'positive';
    analysis.confidence += 0.3;
    analysis.reasons.push('pleasure_verb_detected');
  } else if (isPleasureAction) {
    analysis.verbAnalysis.verbCategory = 'emotional';
    analysis.verbAnalysis.emotionalValence = 'positive';
    analysis.confidence += 0.15;
    analysis.reasons.push('pleasure_action_inferred');
  }

  // Analyze experiencer role
  const isExperiencer = !element_role || 
                       element_role === 'experiencer' || 
                       experiencer === word ||
                       element_role === 'pleased_person';
  
  analysis.conditions.isExperiencer = isExperiencer;
  analysis.experiencerAnalysis.isEmotionalExperiencer = isExperiencer;

  if (isExperiencer) {
    analysis.experiencerAnalysis.experiencerType = 'emotional';
    analysis.experiencerAnalysis.roleInEmotion = 'subject_of_emotion';
    analysis.experiencerAnalysis.emotionCategory = 'pleasure';
    analysis.confidence += 0.2;
    analysis.reasons.push('experiencer_role_confirmed');
  }

  // Analyze case compatibility
  const dativeCasePattern = /[ाय|े|भ्यः|वे]$/;
  const hasDativeCase = dativeCasePattern.test(word);
  analysis.conditions.hasProperCase = hasDativeCase;
  analysis.morphologicalAnalysis.caseCompatible = hasDativeCase;

  if (hasDativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(dativeCasePattern)?.[0] || null;
    analysis.confidence += 0.2;
    analysis.reasons.push('dative_case_detected');
  }

  // Determine emotional intensity and pleasure type
  if (isPleasureAction) {
    if (verb === 'रोचते' || verb === 'rocate') {
      analysis.semanticAnalysis.pleasureType = 'aesthetic_pleasure';
      analysis.semanticAnalysis.experienceIntensity = 'moderate';
    } else if (verb === 'प्रीयते' || verb === 'prīyate') {
      analysis.semanticAnalysis.pleasureType = 'affectionate_pleasure';
      analysis.semanticAnalysis.experienceIntensity = 'high';
    } else if (verb === 'हर्षयति' || verb === 'harṣayati') {
      analysis.semanticAnalysis.pleasureType = 'joyful_excitement';
      analysis.semanticAnalysis.experienceIntensity = 'very_high';
    } else {
      analysis.semanticAnalysis.pleasureType = 'general_pleasure';
      analysis.semanticAnalysis.experienceIntensity = 'moderate';
    }
  }

  // Final सम्प्रदान determination
  if (isPleasureAction && isExperiencer) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    analysis.semanticAnalysis.role = 'experiencer';
    analysis.semanticAnalysis.emotionalRole = 'pleased_party';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.experiencerClear = true;
    
    // Boost confidence for clear cases
    if (hasDativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('sampradana_experiencer_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isPleasureAction) {
      analysis.reason = 'not_pleasure_action';
    } else if (!isExperiencer) {
      analysis.reason = 'not_experiencer_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyPleasureDative(word, context = {}) {
  return sutra1433(word, context);
}

export default sutra1433;
