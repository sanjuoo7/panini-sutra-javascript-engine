/**
 * Sutra 1.4.38: क्रुधद्रुहोरुपसृष्टयोः कर्म — with prefixes, object becomes कर्म (accusative)
 * 
 * This sutra prescribes कर्म (accusative case) for the target of anger/harm when the verb
 * क्रुध् (anger) or द्रुह् (harm) is prefixed with उपसर्ग (prefixes). This overrides the normal
 * सम्प्रदान designation from sutra 1.4.37.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

// Prefixed anger/harm verbs
const PREFIXED_ANGER_VERBS_DEVA = [
  'अभिक्रुध्यति', 'अभिद्रुह्यति', 'प्रतिक्रुध्यति', 'प्रतिद्रुह्यति',
  'अधिक्रुध्यति', 'अधिद्रुह्यति', 'उपक्रुध्यति', 'उपद्रुह्यति',
  'संक्रुध्यति', 'संद्रुह्यति', 'आक्रुध्यति', 'आद्रुह्यति'
];

const PREFIXED_ANGER_VERBS_IAST = [
  'abhikrudhyati', 'abhidruhyati', 'pratikrudhyati', 'pratidruhyati',
  'adhikrudhyati', 'adhidruhyati', 'upakrudhyati', 'upadruhyati',
  'saṃkrudhyati', 'saṃdruhyati', 'ākrudhyati', 'ādruhyati'
];

// Common prefixes that affect क्रुध्/द्रुह्
const RELEVANT_PREFIXES = ['अभि', 'प्रति', 'अधि', 'उप', 'सम्', 'आ', 'वि', 'अनु'];
const RELEVANT_PREFIXES_IAST = ['abhi', 'prati', 'adhi', 'upa', 'sam', 'ā', 'vi', 'anu'];

/**
 * Sutra 1.4.38: क्रुधद्रुहोरुपसृष्टयोः कर्म - Prefixed Anger/Harm as Karma
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {Object} context - Linguistic context
 * @returns {Object} Detailed analysis object
 */
export function sutra1438(word, context = {}) {
  const {
    verb = '',
    prefix = '',
    action_type = '',
    anger_target = '',
    harm_target = '',
    element_role = '',
    script: inputScript = null,
    validate_case = false,
    output_script = 'same'
  } = context;

  // Detect script and normalize
  const script = inputScript || detectScript(word);
  const normalizedWord = normalizeScript(word, 'deva');

  // Initialize comprehensive analysis
  const analysis = {
    sutra: '1.4.38',
    sutraText: 'क्रुधद्रुहोरुपसृष्टयोः कर्म',
    applies: false,
    karaka: null,
    word: word,
    script: script,
    confidence: 0.5,
    reasons: [],
    
    // Core conditions
    conditions: {
      hasPrefixedVerb: false,
      isAngerHarmVerb: false,
      isTarget: false,
      hasProperCase: false,
      overridesSampradana: false
    },
    
    // Detailed analysis
    verbAnalysis: {
      verb: verb,
      baseVerb: null,
      prefix: prefix,
      isPrefixed: false,
      actionType: action_type,
      verbCategory: null
    },
    
    prefixAnalysis: {
      detectedPrefix: null,
      prefixEffect: null,
      semanticShift: null,
      karakaChange: null
    },
    
    morphologicalAnalysis: {
      caseEnding: null,
      expectedCase: 'accusative',
      caseCompatible: false,
      script: script,
      normalizedForm: normalizedWord
    },
    
    semanticAnalysis: {
      role: null,
      relationToAction: null,
      prefixModification: null,
      originalDesignation: 'सम्प्रदान'
    },
    
    // Integration properties
    integration: {
      precedence: 'override',
      conflictsWith: ['1.4.37'],
      compatibleWith: [],
      overridesKaraka: true
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

  // Analyze verb for prefixed anger/harm action
  const isPrefixedAngerVerb = PREFIXED_ANGER_VERBS_DEVA.includes(verb) || 
                             PREFIXED_ANGER_VERBS_IAST.includes(verb);

  // Check for base verbs क्रुध्/द्रुह् with prefixes
  const hasAngerHarmBase = verb.includes('क्रुध्') || verb.includes('द्रुह्') ||
                          verb.includes('krudh') || verb.includes('druh');

  // Detect prefix from verb structure or context
  let detectedPrefix = prefix;
  if (!detectedPrefix && hasAngerHarmBase) {
    for (const pref of RELEVANT_PREFIXES) {
      if (verb.startsWith(pref)) {
        detectedPrefix = pref;
        break;
      }
    }
    if (!detectedPrefix) {
      for (const pref of RELEVANT_PREFIXES_IAST) {
        if (verb.startsWith(pref)) {
          detectedPrefix = pref;
          break;
        }
      }
    }
  }

  const hasPrefixedVerb = isPrefixedAngerVerb || (hasAngerHarmBase && detectedPrefix);
  
  analysis.verbAnalysis.isPrefixed = hasPrefixedVerb;
  analysis.verbAnalysis.prefix = detectedPrefix;
  analysis.conditions.hasPrefixedVerb = hasPrefixedVerb;
  analysis.conditions.isAngerHarmVerb = hasAngerHarmBase;
  analysis.prefixAnalysis.detectedPrefix = detectedPrefix;

  if (hasPrefixedVerb) {
    analysis.verbAnalysis.verbCategory = 'prefixed_anger_harm';
    analysis.prefixAnalysis.prefixEffect = 'karaka_modification';
    analysis.prefixAnalysis.semanticShift = 'accusative_target';
    analysis.prefixAnalysis.karakaChange = 'sampradana_to_karma';
    analysis.conditions.overridesSampradana = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('prefixed_anger_harm_verb_detected');

    // Identify base verb
    if (verb.includes('क्रुध्') || verb.includes('krudh')) {
      analysis.verbAnalysis.baseVerb = 'क्रुध्';
    } else if (verb.includes('द्रुह्') || verb.includes('druh')) {
      analysis.verbAnalysis.baseVerb = 'द्रुह्';
    }
  }

  // Analyze target role
  const isTarget = !element_role || element_role === 'anger_target' || 
                  element_role === 'harm_target' || anger_target === word || harm_target === word;
  
  analysis.conditions.isTarget = isTarget;

  if (isTarget) {
    analysis.confidence += 0.2;
    analysis.reasons.push('target_role_confirmed');
  }

  // Analyze case compatibility
  const accusativeCasePattern = /(ं|म्|न्|त्|द्)$/;
  const hasAccusativeCase = accusativeCasePattern.test(word);
  analysis.conditions.hasProperCase = hasAccusativeCase;
  analysis.morphologicalAnalysis.caseCompatible = hasAccusativeCase;

  if (hasAccusativeCase) {
    analysis.morphologicalAnalysis.caseEnding = word.match(accusativeCasePattern)?.[0] || null;
    analysis.confidence += 0.2;
    analysis.reasons.push('accusative_case_detected');
  }

  // Final कर्म determination
  if (hasPrefixedVerb && isTarget) {
    analysis.applies = true;
    analysis.karaka = 'कर्म';
    analysis.semanticAnalysis.role = 'direct_object';
    analysis.semanticAnalysis.relationToAction = 'directly_affected';
    analysis.semanticAnalysis.prefixModification = 'changes_karaka_assignment';
    analysis.contextValidation.sufficientContext = true;
    analysis.contextValidation.targetClear = true;
    
    // Boost confidence for clear cases
    if (hasAccusativeCase) {
      analysis.confidence = Math.min(0.95, analysis.confidence + 0.2);
    } else {
      analysis.confidence = Math.min(0.85, analysis.confidence + 0.1);
    }
    
    analysis.reasons.push('prefixed_karma_designation_confirmed');
  } else {
    analysis.applies = false;
    
    if (!hasPrefixedVerb) {
      analysis.reason = 'not_prefixed_anger_harm_verb';
    } else if (!isTarget) {
      analysis.reason = 'not_target_role';
    } else {
      analysis.reason = 'insufficient_evidence';
    }
  }

  return analysis;
}

// Legacy function name for compatibility
export function identifyPrefixedAngerKarma(word, context = {}) {
  return sutra1438(word, context);
}

export default sutra1438;
