/**
 * Sutra 1.4.37: क्रुधहिंसयोः — anger/harm dative
 * 
 * This sutra prescribes सम्प्रदान (dative case) for the entity towards whom anger is felt
 * or who is harmed. It handles expressions of anger, harm, hostility, and enmity.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Anger/harm verbs
const ANGER_VERBS_DEVA = ['क्रुध्यति', 'हिनस्ति', 'द्रुह्यति', 'कुप्यति', 'क्रोधयति', 'रुष्यति'];
const ANGER_VERBS_IAST = ['krudhyati', 'hinasti', 'druhyati', 'kupyati', 'krodhayati', 'ruṣyati'];

// Harm verbs
const HARM_VERBS_DEVA = ['हिनस्ति', 'हन्ति', 'पीडयति', 'बाधते', 'उपहिनस्ति'];
const HARM_VERBS_IAST = ['hinasti', 'hanti', 'pīḍayati', 'bādhate', 'upahinasti'];

/**
 * Sutra 1.4.37: क्रुधहिंसयोः - Anger/Harm Dative
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {Object} context - Linguistic context
 * @returns {Object} Detailed analysis object
 */
export function sutra1437(word, context = {}) {
  const {
    verb = '',
    action_type = '',
    anger_target = '',
    harm_target = '',
    agent = '',
    element_role = '',
    emotion_type = '',
    script: inputScript = null,
    validate_case = false,
    output_script = 'same'
  } = context;

  // Detect script and normalize
  const script = inputScript || detectScript(word);
  const normalizedWord = normalizeScript(word, 'deva');

  // Initialize comprehensive analysis
  const analysis = {
    sutra: '1.4.37',
    sutraText: 'क्रुधहिंसयोः',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasAngerVerb: false,
      hasHarmVerb: false,
      isTarget: false,
      hasEmotionalContext: false,
      hasProperCase: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      isAngerAction: false,
      isHarmAction: false,
      actionType: action_type,
      verbCategory: null
    },
    
    emotionalAnalysis: {
      isAngerTarget: false,
      isHarmTarget: false,
      targetRole: null,
      emotionType: emotion_type,
      intensityLevel: null,
      relationToEmotion: null
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
      emotionalContent: null,
      agentRelation: null,
      temporality: null
    },
    
    // Integration properties
    integration: {
      precedence: 'specific',
      conflictsWith: [],
      compatibleWith: ['1.4.36'],
      extendsKaraka: true
    },
    
    // Validation
    contextValidation: {
      verbRequired: true,
      verbProvided: !!verb,
      sufficientContext: false,
      targetClear: false
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

  analysis.contextValidation.verbProvided = true;

  // Analyze verb for anger/harm action
  const isAngerVerb = ANGER_VERBS_DEVA.includes(verb) || ANGER_VERBS_IAST.includes(verb);
  const isHarmVerb = HARM_VERBS_DEVA.includes(verb) || HARM_VERBS_IAST.includes(verb);
  const isAngerAction = isAngerVerb || ['anger', 'rage', 'fury'].includes(action_type);
  const isHarmAction = isHarmVerb || ['harm', 'hurt', 'damage'].includes(action_type);

  analysis.verbAnalysis.isAngerAction = isAngerAction;
  analysis.verbAnalysis.isHarmAction = isHarmAction;
  analysis.conditions.hasAngerVerb = isAngerVerb;
  analysis.conditions.hasHarmVerb = isHarmVerb;
  analysis.conditions.hasEmotionalContext = isAngerAction || isHarmAction;

  if (isAngerVerb) {
    analysis.verbAnalysis.verbCategory = 'anger';
    analysis.confidence += 0.2;
    analysis.reasons.push('anger_verb_detected');
  } else if (isHarmVerb) {
    analysis.verbAnalysis.verbCategory = 'harm';
    analysis.confidence += 0.2;
    analysis.reasons.push('harm_verb_detected');
  } else if (isAngerAction || isHarmAction) {
    analysis.verbAnalysis.verbCategory = 'emotional_negative';
    analysis.confidence += 0.1;
    analysis.reasons.push('negative_emotion_action_inferred');
  }

  // Analyze target role
  const isAngerTarget = !element_role || element_role === 'anger_target' || anger_target === word;
  const isHarmTarget = !element_role || element_role === 'harm_target' || harm_target === word;
  const isTarget = isAngerTarget || isHarmTarget;
  
  analysis.conditions.isTarget = isTarget;
  analysis.emotionalAnalysis.isAngerTarget = isAngerTarget;
  analysis.emotionalAnalysis.isHarmTarget = isHarmTarget;

  if (isAngerTarget) {
    analysis.emotionalAnalysis.targetRole = 'anger_target';
    analysis.emotionalAnalysis.relationToEmotion = 'receives_anger';
    analysis.confidence += 0.2;
    analysis.reasons.push('anger_target_confirmed');
  } else if (isHarmTarget) {
    analysis.emotionalAnalysis.targetRole = 'harm_target';
    analysis.emotionalAnalysis.relationToEmotion = 'receives_harm';
    analysis.confidence += 0.2;
    analysis.reasons.push('harm_target_confirmed');
  }

  // Check for agent role (would not take सम्प्रदान)
  if (element_role === 'agent' || agent === word) {
    analysis.applies = false;
    analysis.emotionalAnalysis.relationToEmotion = 'expresses_emotion';
    analysis.reason = 'agent_not_sampradana';
    return analysis;
  }

  // Analyze case compatibility
  const dativeCasePattern = /(ाय|े|भ्यः|वे)$/;
  const hasDativeCase = dativeCasePattern.test(word);
  analysis.conditions.hasProperCase = hasDativeCase;
  analysis.morphologicalAnalysis.caseCompatible = hasDativeCase;

  if (hasDativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(dativeCasePattern)?.[0] || null;
    analysis.confidence += 0.2;
    analysis.reasons.push('dative_case_detected');
  }

  // Analyze emotional intensity
  if (isAngerAction || isHarmAction) {
    const intensityMarkers = ['अति', 'महा', 'परम', 'घोर'];
    const hasIntensityMarker = intensityMarkers.some(marker => 
      context.context?.includes(marker));
    
    if (hasIntensityMarker) {
      analysis.emotionalAnalysis.intensityLevel = 'high';
      analysis.confidence += 0.1;
    } else {
      analysis.emotionalAnalysis.intensityLevel = 'moderate';
    }
  }

  // Final सम्प्रदान determination
  if ((isAngerAction || isHarmAction) && isTarget) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    
    if (isAngerAction) {
      analysis.semanticAnalysis.role = 'anger_target';
      analysis.semanticAnalysis.emotionalContent = 'negative_directed';
    } else {
      analysis.semanticAnalysis.role = 'harm_target';
      analysis.semanticAnalysis.emotionalContent = 'harmful_directed';
    }
    
    analysis.semanticAnalysis.agentRelation = 'receives_from';
    analysis.semanticAnalysis.temporality = 'experiential';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.targetClear = true;
    
    // Boost confidence for clear cases
    if (hasDativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('anger_harm_sampradana_confirmed');
  } else {
    analysis.applies = false;
    
    if (!isAngerAction && !isHarmAction) {
      analysis.reason = 'not_anger_harm_action';
    } else if (!isTarget) {
      analysis.reason = 'not_target_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyAngerDative(word, context = {}) {
  return sutra1437(word, context);
}

export default sutra1437;
