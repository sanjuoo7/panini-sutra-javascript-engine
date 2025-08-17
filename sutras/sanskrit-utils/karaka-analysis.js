/**
 * कारक (Kāraka) Analysis Utility
 * 
 * Centralizes grammatical relationship analysis for सम्प्रदान, करण, अधिकरण, कर्म, कर्ता, हेतु
 * Used by sutras 1.4.41-1.4.55
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';
import { getWordBase } from './case-operations.js';

/**
 * Analyzes सम्प्रदान (recipient/beneficiary) relationships
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeSampradana(word, context = {}) {
  const script = detectScript(word);
  
  const analysis = {
    karaka: 'सम्प्रदान',
    applies: false,
    confidence: 0,
    reasons: [],
    semantic: {
      isRecipient: false,
      isBeneficiary: false,
      hasDirectionalPrefix: false,
      hasEncouragementContext: false
    }
  };

  // Check for recipient indicators
  if (context.semanticRole === 'recipient' || context.recipient === true) {
    analysis.semantic.isRecipient = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('explicit_recipient_context');
  }

  // Check for beneficiary indicators
  if (context.semanticRole === 'beneficiary' || context.beneficiary === true) {
    analysis.semantic.isBeneficiary = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('beneficiary_context');
  }

  // Check for directional prefixes (relevant for several sutras)
  const directionalPrefixes = script === 'Devanagari' 
    ? ['अनु', 'प्रति', 'आ', 'प्र', 'वि', 'सम्', 'उप']
    : ['anu', 'prati', 'ā', 'pra', 'vi', 'sam', 'upa'];
  
  if (context.prefixes && Array.isArray(context.prefixes)) {
    const hasDirectional = context.prefixes.some(prefix => 
      directionalPrefixes.includes(prefix.toLowerCase())
    );
    if (hasDirectional) {
      analysis.semantic.hasDirectionalPrefix = true;
      analysis.confidence += 0.2;
      analysis.reasons.push('directional_prefix_present');
    }
  }

  // Check for encouragement context (sutra 1.4.41)
  if (context.meaning === 'encourage_by_repetition' || context.encouragement === true) {
    analysis.semantic.hasEncouragementContext = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('encouragement_by_repetition');
  }

  analysis.applies = analysis.confidence > 0.5;
  return analysis;
}

/**
 * Analyzes करण (instrument) relationships
 * @param {string} word - Word to analyze  
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeKarana(word, context = {}) {
  const script = detectScript(word);
  
  const analysis = {
    karaka: 'करण',
    applies: false,
    confidence: 0,
    reasons: [],
    semantic: {
      isInstrument: false,
      isMeans: false,
      hasInstrumentalCase: false,
      hasToolContext: false
    }
  };

  // Check for instrument indicators
  if (context.semanticRole === 'instrument' || context.instrument === true) {
    analysis.semantic.isInstrument = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('explicit_instrument_context');
  }

  // Check for means/method indicators
  if (context.semanticRole === 'means' || context.means === true) {
    analysis.semantic.isMeans = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('means_method_context');
  }

  // Check for instrumental case endings
  const instrumentalEndings = script === 'Devanagari'
    ? ['ेन', 'ैः', 'ेण']
    : ['ena', 'aiḥ', 'eṇa'];
  
  const hasInstrumental = instrumentalEndings.some(ending => 
    word.toLowerCase().endsWith(ending.toLowerCase())
  );
  if (hasInstrumental) {
    analysis.semantic.hasInstrumentalCase = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('instrumental_case_ending');
  }

  analysis.applies = analysis.confidence > 0.5;
  return analysis;
}

/**
 * Analyzes अधिकरण (locative) relationships
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information  
 * @returns {Object} Analysis result
 */
export function analyzeAdhikarana(word, context = {}) {
  const script = detectScript(word);
  
  const analysis = {
    karaka: 'अधिकरण',
    applies: false,
    confidence: 0,
    reasons: [],
    semantic: {
      isLocation: false,
      isTime: false,
      hasLocativeCase: false,
      hasSpatialContext: false
    }
  };

  // Check for location indicators
  if (context.semanticRole === 'location' || context.location === true) {
    analysis.semantic.isLocation = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('location_context');
  }

  // Check for temporal indicators
  if (context.semanticRole === 'time' || context.temporal === true) {
    analysis.semantic.isTime = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('temporal_context');
  }

  // Check for locative case endings
  const locativeEndings = script === 'Devanagari'
    ? ['े', 'ेषु', 'ि']
    : ['e', 'eṣu', 'i'];
  
  const hasLocative = locativeEndings.some(ending => 
    word.toLowerCase().endsWith(ending.toLowerCase())
  );
  if (hasLocative) {
    analysis.semantic.hasLocativeCase = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('locative_case_ending');
  }

  analysis.applies = analysis.confidence > 0.6;
  return analysis;
}

/**
 * Analyzes कर्म (object) relationships
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result  
 */
export function analyzeKarma(word, context = {}) {
  const analysis = {
    karaka: 'कर्म',
    applies: false,
    confidence: 0,
    reasons: [],
    semantic: {
      isDirectObject: false,
      isGoal: false,
      hasAccusativeCase: false,
      isTransitiveTarget: false
    }
  };

  // Check for direct object indicators
  if (context.semanticRole === 'direct_object' || context.directObject === true) {
    analysis.semantic.isDirectObject = true;
    analysis.confidence += 0.5;
    analysis.reasons.push('direct_object_context');
  }

  // Check for goal indicators
  if (context.semanticRole === 'goal' || context.goal === true) {
    analysis.semantic.isGoal = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('goal_context');
  }

  // Check for transitive verb context
  if (context.verbType === 'transitive' || context.transitive === true) {
    analysis.semantic.isTransitiveTarget = true;
    analysis.confidence += 0.2;
    analysis.reasons.push('transitive_verb_context');
  }

  analysis.applies = analysis.confidence > 0.4;
  return analysis;
}

/**
 * Analyzes कर्ता (agent) relationships
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeKarta(word, context = {}) {
  const analysis = {
    karaka: 'कर्ता',
    applies: false,
    confidence: 0,
    reasons: [],
    semantic: {
      isAgent: false,
      isDoer: false,
      hasNominativeCase: false,
      isSubject: false
    }
  };

  // Check for agent indicators
  if (context.semanticRole === 'agent' || context.agent === true) {
    analysis.semantic.isAgent = true;
    analysis.confidence += 0.5;
    analysis.reasons.push('agent_context');
  }

  // Check for doer indicators
  if (context.semanticRole === 'doer' || context.doer === true) {
    analysis.semantic.isDoer = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('doer_context');
  }

  // Check for subject indicators
  if (context.semanticRole === 'subject' || context.subject === true) {
    analysis.semantic.isSubject = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('subject_context');
  }

  analysis.applies = analysis.confidence > 0.5;
  return analysis;
}

/**
 * Analyzes हेतु (cause/purpose) relationships
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeHetu(word, context = {}) {
  const analysis = {
    karaka: 'हेतु',
    applies: false,
    confidence: 0,
    reasons: [],
    semantic: {
      isCause: false,
      isPurpose: false,
      isReason: false,
      hasCausalContext: false
    }
  };

  // Check for cause indicators
  if (context.semanticRole === 'cause' || context.cause === true) {
    analysis.semantic.isCause = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('cause_context');
  }

  // Check for purpose indicators
  if (context.semanticRole === 'purpose' || context.purpose === true) {
    analysis.semantic.isPurpose = true;
    analysis.confidence += 0.4;
    analysis.reasons.push('purpose_context');
  }

  // Check for reason indicators
  if (context.semanticRole === 'reason' || context.reason === true) {
    analysis.semantic.isReason = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('reason_context');
  }

  analysis.applies = analysis.confidence > 0.4;
  return analysis;
}

/**
 * General कारक analysis that delegates to specific analyzers
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Complete कारक analysis
 */
export function analyzeKaraka(word, context = {}) {
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
    base: getWordBase(word),
    karakas: {
      sampradana: analyzeSampradana(word, context),
      karana: analyzeKarana(word, context),
      adhikarana: analyzeAdhikarana(word, context),
      karma: analyzeKarma(word, context),
      karta: analyzeKarta(word, context),
      hetu: analyzeHetu(word, context)
    },
    bestMatch: null,
    confidence: 0
  };

  // Find the best matching कारक
  let bestKaraka = null;
  let highestConfidence = 0;

  for (const [karakaName, analysis] of Object.entries(results.karakas)) {
    if (analysis.applies && analysis.confidence > highestConfidence) {
      highestConfidence = analysis.confidence;
      bestKaraka = karakaName;
    }
  }

  if (bestKaraka) {
    results.bestMatch = bestKaraka;
    results.confidence = highestConfidence;
  }

  return results;
}

export default {
  analyzeSampradana,
  analyzeKarana,
  analyzeAdhikarana,
  analyzeKarma,
  analyzeKarta,
  analyzeHetu,
  analyzeKaraka
};
